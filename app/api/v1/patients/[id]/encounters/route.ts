import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { canCreateEncounter } from "@/lib/auth/encounter-permissions";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import { createEncounterSchema } from "@/lib/validation/encounter";
import { z } from "zod";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    if (!canCreateEncounter(user)) return NextResponse.json({ success: false, message: "You are not authorized to create encounters" }, { status: 403 });
    const { id: patientId } = await context.params;
    const patient = await prisma.patient.findFirst({ where: { id: patientId, hospitalId: user.hospitalId }, select: { id: true } });
    if (!patient) return NextResponse.json({ success: false, message: "Patient not found" }, { status: 404 });
    const result = createEncounterSchema.safeParse(await request.json());
    if (!result.success) return NextResponse.json({ success: false, message: "Invalid encounter data", errors: result.error.flatten().fieldErrors }, { status: 400 });
    const encounter = await prisma.encounter.create({ data: { patientId: patient.id, hospitalId: user.hospitalId, doctorId: user.id, type: result.data.type, startedAt: result.data.startedAt ? new Date(result.data.startedAt) : new Date() }, select: { id: true, patientId: true, type: true, status: true, startedAt: true, doctor: { select: { id: true, firstName: true, lastName: true, staffId: true } } } });
    return NextResponse.json({ success: true, message: "Encounter created successfully", data: { encounter } }, { status: 201 });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Create encounter error:", error);
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 });
  }
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    const { id: patientId } = await context.params;
    const patient = await prisma.patient.findFirst({ where: { id: patientId, hospitalId: user.hospitalId }, select: { id: true } });
    if (!patient) return NextResponse.json({ success: false, message: "Patient not found" }, { status: 404 });
    const searchParams = new URL(request.url).searchParams;
    const pageValue = Number(searchParams.get("page") || "1");
    const limitValue = Number(searchParams.get("limit") || "20");
    const page = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
    const limit = Number.isInteger(limitValue) && limitValue > 0 && limitValue <= 100 ? limitValue : 20;
    const search = searchParams.get("search")?.trim() || "";
    const typeResult = searchParams.get("type") ? z.enum(["OUTPATIENT", "INPATIENT", "EMERGENCY", "FOLLOW_UP"]).safeParse(searchParams.get("type")) : null;
    const statusResult = searchParams.get("status") ? z.enum(["OPEN", "LOCKED", "COMPLETED", "CANCELLED"]).safeParse(searchParams.get("status")) : null;
    const dateFromValue = searchParams.get("dateFrom");
    const dateToValue = searchParams.get("dateTo");
    const dateFrom = dateFromValue ? new Date(dateFromValue) : null;
    const dateTo = dateToValue ? new Date(dateToValue) : null;
    if (typeResult && !typeResult.success || statusResult && !statusResult.success || dateFromValue && (!dateFrom || Number.isNaN(dateFrom.getTime())) || dateToValue && (!dateTo || Number.isNaN(dateTo.getTime())) || dateFrom && dateTo && dateFrom > dateTo) {
      return NextResponse.json({ success: false, message: "Invalid encounter filters" }, { status: 400 });
    }
    const where = {
      patientId: patient.id,
      hospitalId: user.hospitalId,
      ...(typeResult?.success ? { type: typeResult.data } : {}),
      ...(statusResult?.success ? { status: statusResult.data } : {}),
      ...(dateFrom || dateTo ? { startedAt: { ...(dateFrom ? { gte: dateFrom } : {}), ...(dateTo ? { lte: dateTo } : {}) } } : {}),
      ...(search ? { OR: [{ clinicalNote: { contains: search, mode: "insensitive" as const } }, { chiefComplaint: { contains: search, mode: "insensitive" as const } }, { subjective: { contains: search, mode: "insensitive" as const } }, { doctor: { OR: [{ firstName: { contains: search, mode: "insensitive" as const } }, { lastName: { contains: search, mode: "insensitive" as const } }] } }] } : {}),
    };
    const [items, total] = await Promise.all([
      prisma.encounter.findMany({ where, orderBy: { startedAt: "desc" }, skip: (page - 1) * limit, take: limit, select: { id: true, type: true, status: true, startedAt: true, endedAt: true, chiefComplaint: true, clinicalNote: true, doctor: { select: { id: true, firstName: true, lastName: true, staffId: true, role: true } } } }),
      prisma.encounter.count({ where }),
    ]);
    const history = items.map((item) => ({ id: item.id, dateTime: item.startedAt, encounterType: item.type, titleOrSubject: item.chiefComplaint || item.clinicalNote || null, provider: item.doctor, status: item.status }));
    return NextResponse.json({ success: true, data: { items: history, message: total ? undefined : "No encounters found for this patient", pagination: { page, limit, total, totalPages: total ? Math.ceil(total / limit) : 0 }, filters: { search: search || null, type: typeResult?.success ? typeResult.data : null, status: statusResult?.success ? statusResult.data : null, dateFrom: dateFromValue || null, dateTo: dateToValue || null } } });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("List encounters error:", error);
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 });
  }
}
