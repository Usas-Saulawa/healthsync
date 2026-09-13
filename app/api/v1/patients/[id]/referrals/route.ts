import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import { hasRole } from "@/lib/auth/authorization";
import { referralSchema, uuidSchema } from "@/lib/validation/clinical-results";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    if (!hasRole(user.role, ["DOCTOR", "NURSE", "ADMIN"]))
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to create referrals",
        },
        { status: 403 },
      );
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
    const parsed = referralSchema.safeParse(await request.json());
    if (!parsed.success)
      return NextResponse.json(
        {
          success: false,
          message: "Invalid referral",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    const input = parsed.data;
    if (input.destinationDepartmentId) {
      const department = await prisma.department.findFirst({
        where: {
          id: input.destinationDepartmentId,
          hospitalId: user.hospitalId,
        },
        select: { id: true },
      });
      if (!department)
        return NextResponse.json(
          {
            success: false,
            message: "Destination department not found in this hospital",
          },
          { status: 400 },
        );
    }
    if (input.preferredProviderId) {
      const provider = await prisma.user.findFirst({
        where: {
          id: input.preferredProviderId,
          hospitalId: user.hospitalId,
          isActive: true,
        },
        select: { id: true },
      });
      if (!provider)
        return NextResponse.json(
          {
            success: false,
            message: "Preferred provider not found in this hospital",
          },
          { status: 400 },
        );
    }
    const [labs, imaging] = await Promise.all([
      input.labResultIds.length
        ? prisma.labResult.findMany({
            where: {
              id: { in: input.labResultIds },
              patientId,
              hospitalId: user.hospitalId,
            },
            select: { id: true },
          })
        : [],
      input.imagingStudyIds.length
        ? prisma.imagingStudy.findMany({
            where: {
              id: { in: input.imagingStudyIds },
              patientId,
              hospitalId: user.hospitalId,
            },
            select: { id: true },
          })
        : [],
    ]);
    if (
      labs.length !== input.labResultIds.length ||
      imaging.length !== input.imagingStudyIds.length
    )
      return NextResponse.json(
        {
          success: false,
          message:
            "One or more attachments do not belong to this patient and hospital",
        },
        { status: 400 },
      );
    const referral = await prisma.referral.create({
      data: {
        referralType: input.referralType,
        urgency: input.urgency,
        referralDate: new Date(input.referralDate),
        destinationDepartmentId: input.destinationDepartmentId,
        preferredProviderId: input.preferredProviderId,
        facility: input.facility,
        reason: input.reason,
        relevantHistory: input.relevantHistory,
        patientId,
        hospitalId: user.hospitalId,
        referringProviderId: user.id,
        attachments: {
          create: [
            ...input.labResultIds.map((labResultId) => ({ labResultId })),
            ...input.imagingStudyIds.map((imagingStudyId) => ({
              imagingStudyId,
            })),
          ],
        },
      },
      include: {
        attachments: true,
        destinationDepartment: { select: { id: true, name: true, code: true } },
      },
    });
    return NextResponse.json(
      { success: true, data: referral },
      { status: 201 },
    );
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Create referral error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
