import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { canManageEncounter } from "@/lib/auth/encounter-permissions";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import { followUpSchema } from "@/lib/validation/encounter";

type RouteContext = { params: Promise<{ id: string }> };

async function findEncounter(id: string, hospitalId: string) {
  return prisma.encounter.findFirst({ where: { id, hospitalId }, select: { id: true, patientId: true, doctorId: true, status: true, lockedAt: true } });
}

const followUpSelect = { id: true, type: true, priority: true, scheduledAt: true, reason: true, specialInstructions: true, status: true, createdAt: true, department: { select: { id: true, name: true, code: true } }, doctor: { select: { id: true, firstName: true, lastName: true, staffId: true } } };

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    const { id } = await context.params;
    const encounter = await findEncounter(id, user.hospitalId);
    if (!encounter) return NextResponse.json({ success: false, message: "Encounter not found" }, { status: 404 });
    const items = await prisma.followUp.findMany({ where: { encounterId: encounter.id, hospitalId: user.hospitalId }, orderBy: { scheduledAt: "desc" }, select: followUpSelect });
    return NextResponse.json({ success: true, data: { items, message: items.length ? undefined : "No follow-ups found for this encounter" } });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("List encounter follow-ups error:", error);
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 });
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    const { id } = await context.params;
    const encounter = await findEncounter(id, user.hospitalId);
    if (!encounter) return NextResponse.json({ success: false, message: "Encounter not found" }, { status: 404 });
    if (!canManageEncounter(user, encounter)) return NextResponse.json({ success: false, message: "You are not authorized to request follow-ups" }, { status: 403 });
    if (encounter.status !== "OPEN" || encounter.lockedAt) return NextResponse.json({ success: false, message: "This encounter is locked and cannot be modified." }, { status: 409 });
    const result = followUpSchema.safeParse(await request.json());
    if (!result.success) return NextResponse.json({ success: false, message: "Invalid follow-up data", errors: result.error.flatten().fieldErrors }, { status: 400 });
    const provider = await prisma.user.findFirst({ where: { id: result.data.providerId, hospitalId: user.hospitalId, isActive: true, role: "DOCTOR", departmentId: result.data.departmentId }, select: { id: true } });
    if (!provider) return NextResponse.json({ success: false, message: "Provider is not valid for the selected department" }, { status: 400 });
    const followUp = await prisma.followUp.create({ data: { patientId: encounter.patientId, encounterId: encounter.id, hospitalId: user.hospitalId, doctorId: provider.id, departmentId: result.data.departmentId, type: result.data.type, priority: result.data.priority, scheduledAt: new Date(result.data.preferredDate), reason: result.data.reason, specialInstructions: result.data.specialInstructions }, select: followUpSelect });
    return NextResponse.json({ success: true, message: "Follow-up requested successfully", data: { followUp } }, { status: 201 });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Create encounter follow-up error:", error);
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 });
  }
}
