import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { canWriteNurseNote } from "@/lib/auth/encounter-permissions";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import { nurseNoteSchema } from "@/lib/validation/encounter";

type RouteContext = { params: Promise<{ id: string }> };

const nurseNoteSelect = { id: true, content: true, createdAt: true, updatedAt: true, author: { select: { id: true, firstName: true, lastName: true, staffId: true } } };

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    const { id } = await context.params;
    const encounter = await prisma.encounter.findFirst({ where: { id, hospitalId: user.hospitalId }, select: { id: true } });
    if (!encounter) return NextResponse.json({ success: false, message: "Encounter not found" }, { status: 404 });
    const items = await prisma.nurseNote.findMany({ where: { encounterId: id, hospitalId: user.hospitalId }, orderBy: { createdAt: "desc" }, select: nurseNoteSelect });
    return NextResponse.json({ success: true, data: { items, message: items.length ? undefined : "No nurse notes found for this encounter" } });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("List nurse notes error:", error);
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 });
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    if (!canWriteNurseNote(user)) return NextResponse.json({ success: false, message: "Only nurses can create nurse notes" }, { status: 403 });
    const { id } = await context.params;
    const encounter = await prisma.encounter.findFirst({ where: { id, hospitalId: user.hospitalId }, select: { id: true, patientId: true, status: true, lockedAt: true } });
    if (!encounter) return NextResponse.json({ success: false, message: "Encounter not found" }, { status: 404 });
    if (encounter.status !== "OPEN" || encounter.lockedAt) return NextResponse.json({ success: false, message: "This encounter is locked and cannot be modified." }, { status: 409 });
    const result = nurseNoteSchema.safeParse(await request.json());
    if (!result.success) return NextResponse.json({ success: false, message: "Invalid nurse note data", errors: result.error.flatten().fieldErrors }, { status: 400 });
    const nurseNote = await prisma.nurseNote.create({ data: { encounterId: encounter.id, patientId: encounter.patientId, hospitalId: user.hospitalId, authorId: user.id, content: result.data.content }, select: nurseNoteSelect });
    return NextResponse.json({ success: true, message: "Nurse note created successfully", data: { nurseNote } }, { status: 201 });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Create nurse note error:", error);
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 });
  }
}
