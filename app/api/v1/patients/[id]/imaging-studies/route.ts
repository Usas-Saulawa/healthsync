import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import { imagingStudyFiltersSchema, uuidSchema } from "@/lib/validation/clinical-results";

type RouteContext = { params: Promise<{ id: string }> };
const viewerRoles = ["DOCTOR", "NURSE"] as const;

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    if (!(viewerRoles as readonly string[]).includes(user.role)) return NextResponse.json({ success: false, message: "You are not authorized to view imaging studies" }, { status: 403 });
    const { id: patientId } = await context.params;
    if (!uuidSchema.safeParse(patientId).success) return NextResponse.json({ success: false, message: "Invalid patient ID" }, { status: 400 });
    const patient = await prisma.patient.findFirst({ where: { id: patientId, hospitalId: user.hospitalId }, select: { id: true, hospitalId: true } });
    if (!patient) return NextResponse.json({ success: false, message: "Patient not found" }, { status: 404 });
    const params = Object.fromEntries(new URL(request.url).searchParams.entries());
    const parsed = imagingStudyFiltersSchema.safeParse(params);
    if (!parsed.success) return NextResponse.json({ success: false, message: "Invalid imaging filters", errors: parsed.error.flatten().fieldErrors }, { status: 400 });
    const filters = parsed.data;
    const orderedAt = { ...(filters.dateFrom ? { gte: new Date(filters.dateFrom) } : {}), ...(filters.dateTo ? { lte: new Date(filters.dateTo) } : {}) };
    const where = { patientId: patient.id, hospitalId: patient.hospitalId, ...(Object.keys(orderedAt).length ? { orderedAt } : {}), ...(filters.type ? { modality: { equals: filters.type, mode: "insensitive" as const } } : {}), ...(filters.status ? { status: filters.status as never } : {}), ...(filters.search ? { studyType: { contains: filters.search, mode: "insensitive" as const } } : {}) };
    const [items, total] = await Promise.all([
      prisma.imagingStudy.findMany({ where, orderBy: { orderedAt: "desc" }, skip: (filters.page - 1) * filters.limit, take: filters.limit, select: { id: true, studyType: true, modality: true, bodyPart: true, status: true, orderedAt: true, completedAt: true, impression: true, acknowledgedAt: true, order: { select: { orderedBy: { select: { id: true, firstName: true, lastName: true, staffId: true } } } } } }),
      prisma.imagingStudy.count({ where }),
    ]);
    return NextResponse.json({ success: true, data: { items, message: total ? undefined : "No imaging studies found for this patient", pagination: { page: filters.page, limit: filters.limit, total, totalPages: total ? Math.ceil(total / filters.limit) : 0 } } });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("List patient imaging studies error:", error);
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 });
  }
}