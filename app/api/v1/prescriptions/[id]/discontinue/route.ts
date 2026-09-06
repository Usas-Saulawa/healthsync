import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import { prescriptionDiscontinueSchema } from "@/lib/validation/prescription";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    if (user.role !== "DOCTOR") return NextResponse.json({ success: false, message: "Only doctors can discontinue prescriptions" }, { status: 403 });
    const { id } = await context.params;
    const prescription = await prisma.prescription.findFirst({ where: { id, patient: { hospitalId: user.hospitalId } }, select: { id: true, status: true, notes: true } });
    if (!prescription) return NextResponse.json({ success: false, message: "Prescription not found" }, { status: 404 });
    if (prescription.status !== "ACTIVE" && prescription.status !== "PAUSED") return NextResponse.json({ success: false, message: "Only active or paused prescriptions can be discontinued" }, { status: 409 });
    const result = prescriptionDiscontinueSchema.safeParse(await request.json());
    if (!result.success) return NextResponse.json({ success: false, message: "Invalid discontinuation data", errors: result.error.flatten().fieldErrors }, { status: 400 });
    const updated = await prisma.prescription.update({
      where: { id },
      data: { status: "DISCONTINUED", endDate: new Date(), notes: result.data.reason ? `${prescription.notes ? `${prescription.notes}\n` : ""}Discontinued: ${result.data.reason}` : prescription.notes },
      select: { id: true, status: true, endDate: true, notes: true, updatedAt: true },
    });
    return NextResponse.json({ success: true, message: "Prescription discontinued successfully", data: { prescription: updated } });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Discontinue prescription error:", error);
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 });
  }
}