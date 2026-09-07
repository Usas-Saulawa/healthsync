import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import { uuidSchema } from "@/lib/validation/clinical-results";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(_request: Request, context: RouteContext) {
  try {
    const user = await requireUser();
    if (user.role !== "DOCTOR") return NextResponse.json({ success: false, message: "Only doctors can acknowledge imaging results" }, { status: 403 });
    const { id } = await context.params;
    if (!uuidSchema.safeParse(id).success) return NextResponse.json({ success: false, message: "Invalid imaging study ID" }, { status: 400 });
    const study = await prisma.imagingStudy.findFirst({ where: { id, hospitalId: user.hospitalId }, select: { id: true, acknowledgedAt: true } });
    if (!study) return NextResponse.json({ success: false, message: "Imaging study not found" }, { status: 404 });
    if (study.acknowledgedAt) return NextResponse.json({ success: true, message: "Imaging result was already acknowledged", data: { acknowledgedAt: study.acknowledgedAt } });
    const updated = await prisma.imagingStudy.update({ where: { id }, data: { acknowledgedAt: new Date(), acknowledgedById: user.id }, select: { id: true, acknowledgedAt: true, acknowledgedById: true } });
    return NextResponse.json({ success: true, message: "Imaging result acknowledged", data: { study: updated } });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Acknowledge imaging study error:", error);
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 });
  }
}