import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import { prescriptionUpdateSchema } from "@/lib/validation/prescription";

type RouteContext = { params: Promise<{ id: string }> };

const prescriptionSelect = {
  id: true,
  medicationName: true,
  dosage: true,
  frequency: true,
  route: true,
  status: true,
  startDate: true,
  endDate: true,
  duration: true,
  durationUnit: true,
  quantity: true,
  refills: true,
  reason: true,
  notes: true,
  createdAt: true,
  updatedAt: true,
  encounterId: true,
  diagnosisId: true,
  diagnosis: { select: { id: true, name: true, code: true } },
  prescriber: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      staffId: true,
      role: true,
      department: { select: { id: true, name: true, code: true } },
    },
  },
  patient: {
    select: {
      id: true,
      hospitalNumber: true,
      firstName: true,
      lastName: true,
      gender: true,
      dateOfBirth: true,
      status: true,
      hospital: { select: { id: true, name: true, code: true } },
      admissions: {
        where: { status: "ADMITTED" as const },
        orderBy: { admissionDate: "desc" as const },
        take: 1,
        select: {
          id: true,
          admissionDate: true,
          ward: { select: { id: true, name: true, code: true } },
          bed: { select: { id: true, bedNumber: true } },
          attendingDoctor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              staffId: true,
            },
          },
        },
      },
    },
  },
} as const;

async function findPrescription(id: string, hospitalId: string) {
  return prisma.prescription.findFirst({
    where: { id, patient: { hospitalId } },
    select: prescriptionSelect,
  });
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    const { id } = await context.params;
    const prescription = await findPrescription(id, user.hospitalId);
    if (!prescription)
      return NextResponse.json(
        { success: false, message: "Prescription not found" },
        { status: 404 },
      );
    return NextResponse.json({ success: true, data: { prescription } });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Get prescription error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    if (user.role !== "DOCTOR")
      return NextResponse.json(
        { success: false, message: "Only doctors can update prescriptions" },
        { status: 403 },
      );
    const { id } = await context.params;
    const existing = await findPrescription(id, user.hospitalId);
    if (!existing)
      return NextResponse.json(
        { success: false, message: "Prescription not found" },
        { status: 404 },
      );
    if (existing.status === "DISCONTINUED" || existing.status === "COMPLETED")
      return NextResponse.json(
        {
          success: false,
          message: "This prescription can no longer be edited",
        },
        { status: 409 },
      );
    const result = prescriptionUpdateSchema.safeParse(await request.json());
    if (!result.success)
      return NextResponse.json(
        {
          success: false,
          message: "Invalid prescription update",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    const data = result.data;
    const updated = await prisma.prescription.update({
      where: { id },
      data: {
        dosage: data.dosage,
        route: data.route,
        frequency: data.frequency,
        duration: data.duration,
        durationUnit: data.durationUnit,
        quantity: data.quantity,
        reason: data.reason,
        ...(data.notes !== undefined || data.pharmacyNotes !== undefined
          ? { notes: data.pharmacyNotes ?? data.notes }
          : {}),
      },
      select: prescriptionSelect,
    });
    return NextResponse.json({
      success: true,
      message: "Prescription updated successfully",
      data: { prescription: updated },
    });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Update prescription error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
