import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import { prescriptionCreateSchema } from "@/lib/validation/prescription";

type RouteContext = { params: Promise<{ id: string }> };

const prescriptionSelect = {
  id: true,
  medicationName: true,
  dosage: true,
  frequency: true,
  route: true,
  status: true,
  startDate: true,
  endDate: true,
  duration: true,
  durationUnit: true,
  quantity: true,
  refills: true,
  reason: true,
  notes: true,
  createdAt: true,
  updatedAt: true,
  encounterId: true,
  diagnosisId: true,
  diagnosis: { select: { id: true, name: true, code: true } },
  prescriber: {
    select: { id: true, firstName: true, lastName: true, staffId: true, role: true },
  },
} as const;

function parseDate(value: string | null, name: string) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new Error(`INVALID_${name}`);
  if (/^\d{4}-\d{2}-\d{2}$/.test(value) && name === "DATE_TO") {
    date.setHours(23, 59, 59, 999);
  }
  return date;
}

async function findPatient(patientId: string, hospitalId: string) {
  return prisma.patient.findFirst({
    where: { id: patientId, hospitalId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      hospitalNumber: true,
      gender: true,
      dateOfBirth: true,
      hospital: { select: { id: true, name: true, code: true } },
    },
  });
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    const { id: patientId } = await context.params;
    const patient = await findPatient(patientId, user.hospitalId);
    if (!patient) return NextResponse.json({ success: false, message: "Patient not found" }, { status: 404 });

    const params = new URL(request.url).searchParams;
    const pageValue = Number(params.get("page") || "1");
    const limitValue = Number(params.get("limit") || "20");
    if (!Number.isInteger(pageValue) || pageValue < 1 || !Number.isInteger(limitValue) || limitValue < 1 || limitValue > 100) {
      return NextResponse.json({ success: false, message: "page must be at least 1 and limit must be between 1 and 100" }, { status: 400 });
    }

    const status = params.get("status")?.trim().toUpperCase() || null;
    const statusResult = status ? z.enum(["ACTIVE", "PAUSED", "DISCONTINUED", "COMPLETED"]).safeParse(status) : null;
    if (statusResult && !statusResult.success) return NextResponse.json({ success: false, message: "Invalid prescription status" }, { status: 400 });

    const sortBy = params.get("sortBy") || "createdAt";
    const sortFields = ["startDate", "endDate", "medicationName", "status", "createdAt"] as const;
    if (!sortFields.includes(sortBy as (typeof sortFields)[number])) return NextResponse.json({ success: false, message: "Invalid sort field" }, { status: 400 });
    const sortOrder = params.get("sortOrder") || "desc";
    if (sortOrder !== "asc" && sortOrder !== "desc") return NextResponse.json({ success: false, message: "Invalid sort order" }, { status: 400 });

    const search = params.get("search")?.trim() || "";
    const dateFrom = parseDate(params.get("dateFrom"), "DATE_FROM");
    const dateTo = parseDate(params.get("dateTo"), "DATE_TO");
    if (dateFrom && dateTo && dateFrom > dateTo) return NextResponse.json({ success: false, message: "dateFrom cannot be later than dateTo" }, { status: 400 });

    const where = {
      patientId: patient.id,
      patient: { hospitalId: user.hospitalId },
      ...(statusResult?.success ? { status: statusResult.data } : {}),
      ...(dateFrom || dateTo ? { startDate: { ...(dateFrom ? { gte: dateFrom } : {}), ...(dateTo ? { lte: dateTo } : {}) } } : {}),
      ...(search ? { OR: [
        { medicationName: { contains: search, mode: "insensitive" as const } },
        { dosage: { contains: search, mode: "insensitive" as const } },
        { frequency: { contains: search, mode: "insensitive" as const } },
        { diagnosis: { name: { contains: search, mode: "insensitive" as const } } },
      ] } : {}),
    };
    const orderBy = { [sortBy]: sortOrder } as Record<string, "asc" | "desc">;
    const [items, total] = await Promise.all([
      prisma.prescription.findMany({ where, orderBy, skip: (pageValue - 1) * limitValue, take: limitValue, select: prescriptionSelect }),
      prisma.prescription.count({ where }),
    ]);

    return NextResponse.json({ success: true, data: {
      patient,
      facility: patient.hospital,
      items,
      pagination: { page: pageValue, limit: limitValue, total, totalPages: total ? Math.ceil(total / limitValue) : 0 },
      filters: { search: search || null, status: statusResult?.success ? statusResult.data : null, dateFrom: params.get("dateFrom"), dateTo: params.get("dateTo"), sortBy, sortOrder },
    } });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    if (error instanceof Error && error.message.startsWith("INVALID_")) return NextResponse.json({ success: false, message: "Invalid date filter" }, { status: 400 });
    console.error("List patient prescriptions error:", error);
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 });
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    if (user.role !== "DOCTOR") return NextResponse.json({ success: false, message: "Only doctors can prescribe medication" }, { status: 403 });
    const { id: patientId } = await context.params;
    const patient = await findPatient(patientId, user.hospitalId);
    if (!patient) return NextResponse.json({ success: false, message: "Patient not found" }, { status: 404 });
    const result = prescriptionCreateSchema.safeParse(await request.json());
    if (!result.success) return NextResponse.json({ success: false, message: "Invalid prescription data", errors: result.error.flatten().fieldErrors }, { status: 400 });
    const data = result.data;

    if (data.encounterId) {
      const encounter = await prisma.encounter.findFirst({ where: { id: data.encounterId, patientId: patient.id, hospitalId: user.hospitalId }, select: { id: true } });
      if (!encounter) return NextResponse.json({ success: false, message: "Encounter not found for this patient" }, { status: 400 });
    }
    if (data.diagnosisId) {
      const diagnosis = await prisma.diagnosis.findFirst({ where: { id: data.diagnosisId, patientId: patient.id }, select: { id: true } });
      if (!diagnosis) return NextResponse.json({ success: false, message: "Diagnosis not found for this patient" }, { status: 400 });
    }

    const prescription = await prisma.prescription.create({
      data: {
        patientId: patient.id,
        encounterId: data.encounterId,
        diagnosisId: data.diagnosisId,
        medicationName: data.medicationName,
        dosage: data.dosage,
        route: data.route,
        frequency: data.frequency,
        duration: data.duration,
        durationUnit: data.durationUnit,
        quantity: data.quantity,
        refills: data.refills,
        reason: data.reason,
        notes: data.pharmacyNotes ?? data.notes,
        prescribedBy: user.id,
        startDate: data.startDate ? new Date(data.startDate) : new Date(),
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
      select: prescriptionSelect,
    });
    return NextResponse.json({ success: true, message: "Prescription created successfully", data: { prescription } }, { status: 201 });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Create patient prescription error:", error);
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 });
  }
}