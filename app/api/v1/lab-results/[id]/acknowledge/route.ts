import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import { uuidSchema } from "@/lib/validation/clinical-results";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(_request: Request, context: RouteContext) {
  try {
    const user = await requireUser();
    if (user.role !== "DOCTOR") return NextResponse.json({ success: false, message: "Only doctors can acknowledge laboratory results" }, { status: 403 });
    const { id } = await context.params;
    if (!uuidSchema.safeParse(id).success) return NextResponse.json({ success: false, message: "Invalid laboratory result ID" }, { status: 400 });
    const result = await prisma.labResult.findFirst({ where: { id, hospitalId: user.hospitalId }, select: { id: true, acknowledgedAt: true } });
    if (!result) return NextResponse.json({ success: false, message: "Laboratory result not found" }, { status: 404 });
    if (result.acknowledgedAt) return NextResponse.json({ success: true, message: "Laboratory result was already acknowledged", data: { acknowledgedAt: result.acknowledgedAt } });
    const updated = await prisma.labResult.update({ where: { id }, data: { acknowledgedAt: new Date(), acknowledgedById: user.id }, select: { id: true, acknowledgedAt: true, acknowledgedById: true } });
    return NextResponse.json({ success: true, message: "Laboratory result acknowledged", data: { result: updated } });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Acknowledge lab result error:", error);
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 });
  }
}