import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { canManageEncounter } from "@/lib/auth/encounter-permissions";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import { lockEncounterSchema } from "@/lib/validation/encounter";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    const { id } = await context.params;
    const result = lockEncounterSchema.safeParse(await request.json());
    if (!result.success) return NextResponse.json({ success: false, message: "Explicit confirmation is required to lock this encounter", errors: result.error.flatten().fieldErrors }, { status: 400 });

    const encounter = await prisma.encounter.findFirst({ where: { id, hospitalId: user.hospitalId }, select: { id: true, doctorId: true, status: true, lockedAt: true } });
    if (!encounter) return NextResponse.json({ success: false, message: "Encounter not found" }, { status: 404 });
    if (!canManageEncounter(user, encounter)) return NextResponse.json({ success: false, message: "You are not authorized to lock this encounter" }, { status: 403 });
    if (encounter.status !== "OPEN" || encounter.lockedAt) return NextResponse.json({ success: false, message: "This encounter is already locked." }, { status: 409 });

    const lockedAt = new Date();
    const locked = await prisma.$transaction(async (transaction) => {
      const changed = await transaction.encounter.updateMany({
        where: { id, hospitalId: user.hospitalId, doctorId: user.id, status: "OPEN", lockedAt: null },
        data: { status: "LOCKED", lockedAt, lockedById: user.id },
      });
      if (changed.count !== 1) return null;
      return transaction.encounter.findUnique({ where: { id }, select: { id: true, status: true, lockedAt: true, lockedBy: { select: { id: true, firstName: true, lastName: true, staffId: true } } } });
    });
    if (!locked) return NextResponse.json({ success: false, message: "This encounter is already locked." }, { status: 409 });
    return NextResponse.json({ success: true, message: "Encounter note locked successfully", data: { encounter: locked } });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Lock encounter error:", error);
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 });
  }
}
