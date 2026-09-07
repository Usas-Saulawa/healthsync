import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import { labResultFiltersSchema, uuidSchema } from "@/lib/validation/clinical-results";

type RouteContext = { params: Promise<{ id: string }> };
const viewerRoles = ["DOCTOR", "NURSE", "LAB_TECHNICIAN"] as const;

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    if (!(viewerRoles as readonly string[]).includes(user.role)) return NextResponse.json({ success: false, message: "You are not authorized to view laboratory results" }, { status: 403 });
    const { id: patientId } = await context.params;
    if (!uuidSchema.safeParse(patientId).success) return NextResponse.json({ success: false, message: "Invalid patient ID" }, { status: 400 });
    const patient = await prisma.patient.findFirst({ where: { id: patientId, hospitalId: user.hospitalId }, select: { id: true, hospitalId: true } });
    if (!patient) return NextResponse.json({ success: false, message: "Patient not found" }, { status: 404 });
    const params = Object.fromEntries(new URL(request.url).searchParams.entries());
    const parsed = labResultFiltersSchema.safeParse(params);
    if (!parsed.success) return NextResponse.json({ success: false, message: "Invalid laboratory result filters", errors: parsed.error.flatten().fieldErrors }, { status: 400 });
    const filters = parsed.data;
    const performedAt = { ...(filters.dateFrom ? { gte: new Date(filters.dateFrom) } : {}), ...(filters.dateTo ? { lte: new Date(filters.dateTo) } : {}) };
    const where = { patientId: patient.id, hospitalId: patient.hospitalId, ...(Object.keys(performedAt).length ? { performedAt } : {}), ...(filters.type ? { testType: filters.type as never } : {}), ...(filters.status ? { status: filters.status } : {}), ...(filters.search ? { testName: { contains: filters.search, mode: "insensitive" as const } } : {}) };
    const [items, total] = await Promise.all([
      prisma.labResult.findMany({ where, orderBy: { performedAt: "desc" }, skip: (filters.page - 1) * filters.limit, take: filters.limit, select: { id: true, testType: true, testName: true, value: true, valueNumeric: true, unit: true, referenceRange: true, status: true, performedAt: true, resultedAt: true, notes: true, acknowledgedAt: true } }),
      prisma.labResult.count({ where }),
    ]);
    return NextResponse.json({ success: true, data: { items, message: total ? undefined : "No laboratory results found for this patient", pagination: { page: filters.page, limit: filters.limit, total, totalPages: total ? Math.ceil(total / filters.limit) : 0 } } });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("List patient lab results error:", error);
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 });
  }
}