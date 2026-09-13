import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import {
  admissionRequestSchema,
  uuidSchema,
} from "@/lib/validation/clinical-results";
import { hasRole } from "@/lib/auth/authorization";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    if (!hasRole(user.role, ["DOCTOR", "NURSE", "ADMIN"])) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to request admissions",
        },
        { status: 403 },
      );
    }
    const { id: patientId } = await context.params;
    if (!uuidSchema.safeParse(patientId).success)
      return NextResponse.json(
        { success: false, message: "Invalid patient ID" },
        { status: 400 },
      );
    const patient = await prisma.patient.findFirst({
      where: { id: patientId, hospitalId: user.hospitalId },
      select: { id: true },
    });
    if (!patient)
      return NextResponse.json(
        { success: false, message: "Patient not found" },
        { status: 404 },
      );
    const parsed = admissionRequestSchema.safeParse(await request.json());
    if (!parsed.success)
      return NextResponse.json(
        {
          success: false,
          message: "Invalid admission request",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    const input = parsed.data;
    const providerIds = [
      input.admittingProviderId,
      input.referringProviderId,
    ].filter(Boolean) as string[];
    const providers = providerIds.length
      ? await prisma.user.findMany({
          where: {
            id: { in: providerIds },
            hospitalId: user.hospitalId,
            isActive: true,
          },
          select: { id: true },
        })
      : [];
    if (providers.length !== providerIds.length)
      return NextResponse.json(
        { success: false, message: "Provider not found in this hospital" },
        { status: 400 },
      );
    if (input.preferredDepartmentId) {
      const department = await prisma.department.findFirst({
        where: { id: input.preferredDepartmentId, hospitalId: user.hospitalId },
        select: { id: true },
      });
      if (!department)
        return NextResponse.json(
          { success: false, message: "Department not found in this hospital" },
          { status: 400 },
        );
    }
    const admission = await prisma.admissionRequest.create({
      data: {
        ...input,
        patientId,
        hospitalId: user.hospitalId,
        requesterId: user.id,
        status: "PENDING_APPROVAL",
        requestedAt: new Date(input.requestedAt),
      },
      include: {
        requester: {
          select: { id: true, firstName: true, lastName: true, staffId: true },
        },
        preferredDepartment: { select: { id: true, name: true, code: true } },
      },
    });
    return NextResponse.json(
      { success: true, data: admission },
      { status: 201 },
    );
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Create admission request error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
