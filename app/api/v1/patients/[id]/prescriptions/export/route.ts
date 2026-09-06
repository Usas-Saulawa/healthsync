import { NextRequest } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { unauthorizedResponse } from "@/lib/auth/api-error";

type RouteContext = { params: Promise<{ id: string }> };

function csvCell(value: unknown) {
  const text = value === null || value === undefined ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    const { id: patientId } = await context.params;
    const patient = await prisma.patient.findFirst({ where: { id: patientId, hospitalId: user.hospitalId }, select: { id: true, hospitalNumber: true } });
    if (!patient) return Response.json({ success: false, message: "Patient not found" }, { status: 404 });

    const params = new URL(request.url).searchParams;
    const status = params.get("status")?.trim().toUpperCase() || null;
    const statusResult = status ? z.enum(["ACTIVE", "PAUSED", "DISCONTINUED", "COMPLETED"]).safeParse(status) : null;
    if (statusResult && !statusResult.success) return Response.json({ success: false, message: "Invalid prescription status" }, { status: 400 });
    const dateFrom = params.get("dateFrom") ? new Date(params.get("dateFrom") as string) : null;
    const dateTo = params.get("dateTo") ? new Date(params.get("dateTo") as string) : null;
    if ((dateFrom && Number.isNaN(dateFrom.getTime())) || (dateTo && Number.isNaN(dateTo.getTime())) || (dateFrom && dateTo && dateFrom > dateTo)) return Response.json({ success: false, message: "Invalid date filters" }, { status: 400 });
    if (dateTo && /^\d{4}-\d{2}-\d{2}$/.test(params.get("dateTo") as string)) dateTo.setHours(23, 59, 59, 999);
    const search = params.get("search")?.trim() || "";
    const prescriptions = await prisma.prescription.findMany({
      where: {
        patientId: patient.id,
        patient: { hospitalId: user.hospitalId },
        ...(statusResult?.success ? { status: statusResult.data } : {}),
        ...(dateFrom || dateTo ? { startDate: { ...(dateFrom ? { gte: dateFrom } : {}), ...(dateTo ? { lte: dateTo } : {}) } } : {}),
        ...(search ? { OR: [{ medicationName: { contains: search, mode: "insensitive" as const } }, { diagnosis: { name: { contains: search, mode: "insensitive" as const } } }] } : {}),
      },
      orderBy: { createdAt: "desc" },
      select: {
        medicationName: true,
        dosage: true,
        route: true,
        frequency: true,
        status: true,
        startDate: true,
        endDate: true,
        duration: true,
        durationUnit: true,
        quantity: true,
        refills: true,
        diagnosis: { select: { name: true, code: true } },
        prescriber: { select: { firstName: true, lastName: true, staffId: true } },
      },
    });
    const lines = [
      ["Medication Name", "Dosage", "Route", "Frequency", "Status", "Start Date", "End Date", "Duration", "Duration Unit", "Quantity", "Refills", "Diagnosis", "Diagnosis Code", "Prescriber", "Staff ID"].map(csvCell).join(","),
      ...prescriptions.map((prescription) => [
        prescription.medicationName,
        prescription.dosage,
        prescription.route,
        prescription.frequency,
        prescription.status,
        prescription.startDate.toISOString(),
        prescription.endDate?.toISOString() ?? null,
        prescription.duration,
        prescription.durationUnit,
        prescription.quantity,
        prescription.refills,
        prescription.diagnosis?.name,
        prescription.diagnosis?.code,
        prescription.prescriber ? `${prescription.prescriber.firstName} ${prescription.prescriber.lastName}` : null,
        prescription.prescriber?.staffId,
      ].map(csvCell).join(",")),
    ];
    return new Response(`${lines.join("\r\n")}\r\n`, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="patient-${patient.hospitalNumber}-prescriptions.csv"`, "Cache-Control": "no-store" } });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Export patient prescriptions error:", error);
    return Response.json({ success: false, message: "An unexpected error occurred" }, { status: 500 });
  }
}