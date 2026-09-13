import { NextRequest } from "next/server";

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
    const patient = await prisma.patient.findFirst({
      where: { id: patientId, hospitalId: user.hospitalId },
      select: { id: true },
    });
    if (!patient)
      return Response.json(
        { success: false, message: "Patient not found" },
        { status: 404 },
      );
    const params = new URL(request.url).searchParams;
    const dateFrom = params.get("dateFrom")
      ? new Date(params.get("dateFrom") as string)
      : null;
    const dateTo = params.get("dateTo")
      ? new Date(params.get("dateTo") as string)
      : null;
    if (
      (dateFrom && Number.isNaN(dateFrom.getTime())) ||
      (dateTo && Number.isNaN(dateTo.getTime())) ||
      (dateFrom && dateTo && dateFrom > dateTo)
    )
      return Response.json(
        { success: false, message: "Invalid date filters" },
        { status: 400 },
      );
    const recordedAt = {
      ...(dateFrom ? { gte: dateFrom } : {}),
      ...(dateTo ? { lte: dateTo } : {}),
    };
    const vitals = await prisma.vital.findMany({
      where: {
        patientId: patient.id,
        ...(Object.keys(recordedAt).length ? { recordedAt } : {}),
      },
      orderBy: { recordedAt: "desc" },
      select: {
        recordedAt: true,
        systolicBp: true,
        diastolicBp: true,
        heartRate: true,
        temperatureC: true,
        oxygenSaturation: true,
        respiratoryRate: true,
        weightKg: true,
        glucoseMgDl: true,
        nurseNotes: { select: { content: true } },
      },
    });
    const lines = [
      "Date/Time,BP (mmHg),HR (bpm),Temp (F),SpO2,RR (bpm),Weight (lb),Glucose (mg/dL),Nurses Notes",
      ...vitals.map((vital) =>
        [
          vital.recordedAt.toISOString(),
          vital.systolicBp !== null && vital.diastolicBp !== null
            ? `${vital.systolicBp}/${vital.diastolicBp}`
            : null,
          vital.heartRate,
          vital.temperatureC === null
            ? null
            : ((vital.temperatureC * 9) / 5 + 32).toFixed(1),
          vital.oxygenSaturation,
          vital.respiratoryRate,
          vital.weightKg === null
            ? null
            : (vital.weightKg * 2.2046226218).toFixed(1),
          vital.glucoseMgDl,
          vital.nurseNotes.map((note) => note.content).join("; "),
        ]
          .map(csvCell)
          .join(","),
      ),
    ];
    return new Response(lines.join("\r\n") + "\r\n", {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="patient-vitals-${patientId}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Export patient vitals error:", error);
    return Response.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
