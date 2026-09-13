import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import { hasRole } from "@/lib/auth/authorization";
import { dischargeSchema, uuidSchema } from "@/lib/validation/clinical-results";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    if (!hasRole(user.role, ["DOCTOR", "NURSE", "ADMIN"]))
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to discharge patients",
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
    const parsed = dischargeSchema.safeParse(await request.json());
    if (!parsed.success)
      return NextResponse.json(
        {
          success: false,
          message: "Invalid discharge",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    const input = parsed.data;
    const admission = await prisma.patientAdmission.findFirst({
      where: {
        id: input.admissionId,
        patientId,
        hospitalId: user.hospitalId,
        status: "ADMITTED",
      },
      orderBy: { admissionDate: "desc" },
      select: { id: true },
    });
    if (!admission)
      return NextResponse.json(
        { success: false, message: "Patient has no matching admitted record" },
        { status: 409 },
      );
    const prescriptions = input.prescriptionIds.length
      ? await prisma.prescription.findMany({
          where: { id: { in: input.prescriptionIds }, patientId },
          select: { id: true },
        })
      : [];
    if (prescriptions.length !== input.prescriptionIds.length)
      return NextResponse.json(
        {
          success: false,
          message: "One or more prescriptions do not belong to this patient",
        },
        { status: 400 },
      );
    const providers = [input.followUpProviderId].filter(Boolean) as string[];
    if (providers.length) {
      const count = await prisma.user.count({
        where: {
          id: { in: providers },
          hospitalId: user.hospitalId,
          isActive: true,
        },
      });
      if (count !== providers.length)
        return NextResponse.json(
          {
            success: false,
            message: "Follow-up provider not found in this hospital",
          },
          { status: 400 },
        );
    }
    if (input.followUpDepartmentId) {
      const department = await prisma.department.findFirst({
        where: { id: input.followUpDepartmentId, hospitalId: user.hospitalId },
        select: { id: true },
      });
      if (!department)
        return NextResponse.json(
          {
            success: false,
            message: "Follow-up department not found in this hospital",
          },
          { status: 400 },
        );
    }
    const discharge = await prisma.$transaction(async (transaction) => {
      const record = await transaction.discharge.create({
        data: {
          patientId,
          hospitalId: user.hospitalId,
          admissionId: admission.id,
          attendingProviderId: user.id,
          dischargedAt: new Date(input.dischargedAt),
          dischargeType: input.dischargeType,
          primaryDiagnosis: input.primaryDiagnosis,
          primaryIcd10Code: input.primaryIcd10Code,
          secondaryDiagnoses: input.secondaryDiagnoses,
          patientInstructions: input.patientInstructions,
          activityRestrictions: input.activityRestrictions,
          dietaryInstructions: input.dietaryInstructions,
          followUpAppointment: input.followUpAppointment
            ? new Date(input.followUpAppointment)
            : null,
          followUpProviderId: input.followUpProviderId,
          followUpDepartmentId: input.followUpDepartmentId,
          medications: {
            create: input.prescriptionIds.map((prescriptionId) => ({
              prescriptionId,
            })),
          },
        },
        include: { medications: true },
      });
      await transaction.patientAdmission.update({
        where: { id: admission.id },
        data: {
          status: "DISCHARGED",
          dischargeDate: new Date(input.dischargedAt),
        },
      });
      return record;
    });
    return NextResponse.json(
      { success: true, data: discharge },
      { status: 201 },
    );
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Create discharge error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
