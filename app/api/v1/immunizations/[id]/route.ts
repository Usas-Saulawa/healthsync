import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import { uuidSchema } from "@/lib/validation/clinical-results";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    const { id } = await context.params;
    if (!uuidSchema.safeParse(id).success)
      return NextResponse.json(
        { success: false, message: "Invalid immunization ID" },
        { status: 400 },
      );
    const immunization = await prisma.immunization.findFirst({
      where: { id, hospitalId: user.hospitalId },
      include: {
        administeredBy: {
          select: { id: true, firstName: true, lastName: true, staffId: true },
        },
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            hospitalNumber: true,
          },
        },
      },
    });
    if (!immunization)
      return NextResponse.json(
        { success: false, message: "Immunization not found" },
        { status: 404 },
      );
    return NextResponse.json({ success: true, data: immunization });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Get immunization error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
