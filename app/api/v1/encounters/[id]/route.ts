import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { canManageEncounter } from "@/lib/auth/encounter-permissions";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import { updateEncounterSchema } from "@/lib/validation/encounter";

type RouteContext = { params: Promise<{ id: string }> };

const encounterSelect = {
  id: true,
  type: true,
  status: true,
  startedAt: true,
  endedAt: true,
  clinicalNote: true,
  chiefComplaint: true,
  objective: true,
  subjective: true,
  assessmentPlan: true,
  lockedAt: true,
  createdAt: true,
  updatedAt: true,
  patient: {
    select: {
      id: true,
      hospitalNumber: true,
      firstName: true,
      lastName: true,
      dateOfBirth: true,
      gender: true,
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
        },
      },
    },
  },
  doctor: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      staffId: true,
      role: true,
      department: { select: { id: true, name: true, code: true } },
    },
  },
  lockedBy: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      staffId: true,
      role: true,
    },
  },
  diagnoses: {
    orderBy: { diagnosedAt: "desc" as const },
    select: {
      id: true,
      name: true,
      code: true,
      status: true,
      severity: true,
      isPrimary: true,
      diagnosedAt: true,
    },
  },
  vitals: {
    orderBy: { recordedAt: "desc" as const },
    take: 20,
    select: {
      id: true,
      recordedAt: true,
      weightKg: true,
      temperatureC: true,
      heartRate: true,
      oxygenSaturation: true,
      systolicBp: true,
      diastolicBp: true,
      glucoseMgDl: true,
    },
  },
  orders: {
    orderBy: { createdAt: "desc" as const },
    take: 50,
    select: {
      id: true,
      type: true,
      name: true,
      priority: true,
      indication: true,
      instructions: true,
      frequency: true,
      scheduledAt: true,
      status: true,
      createdAt: true,
      orderedBy: {
        select: { id: true, firstName: true, lastName: true, staffId: true },
      },
    },
  },
  prescriptions: {
    orderBy: { createdAt: "desc" as const },
    take: 50,
    select: {
      id: true,
      medicationName: true,
      dosage: true,
      frequency: true,
      route: true,
      duration: true,
      durationUnit: true,
      quantity: true,
      refills: true,
      notes: true,
      reason: true,
      status: true,
      startDate: true,
      endDate: true,
      createdAt: true,
      prescriber: {
        select: { id: true, firstName: true, lastName: true, staffId: true },
      },
    },
  },
  followUps: {
    orderBy: { scheduledAt: "desc" as const },
    take: 50,
    select: {
      id: true,
      type: true,
      priority: true,
      scheduledAt: true,
      reason: true,
      specialInstructions: true,
      status: true,
      department: { select: { id: true, name: true, code: true } },
      doctor: {
        select: { id: true, firstName: true, lastName: true, staffId: true },
      },
    },
  },
  nurseNotes: {
    orderBy: { createdAt: "desc" as const },
    take: 50,
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: { id: true, firstName: true, lastName: true, staffId: true },
      },
    },
  },
};

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    const { id } = await context.params;
    const encounter = await prisma.encounter.findFirst({
      where: { id, hospitalId: user.hospitalId },
      select: encounterSelect,
    });
    if (!encounter)
      return NextResponse.json(
        { success: false, message: "Encounter not found" },
        { status: 404 },
      );
    return NextResponse.json({ success: true, data: { encounter } });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Get encounter error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    const { id } = await context.params;
    const encounter = await prisma.encounter.findFirst({
      where: { id, hospitalId: user.hospitalId },
      select: { id: true, doctorId: true, status: true, lockedAt: true },
    });
    if (!encounter)
      return NextResponse.json(
        { success: false, message: "Encounter not found" },
        { status: 404 },
      );
    if (!canManageEncounter(user, encounter))
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to modify this encounter",
        },
        { status: 403 },
      );
    if (encounter.status !== "OPEN" || encounter.lockedAt)
      return NextResponse.json(
        {
          success: false,
          message: "This encounter is locked and cannot be modified.",
        },
        { status: 409 },
      );

    const result = updateEncounterSchema.safeParse(await request.json());
    if (!result.success)
      return NextResponse.json(
        {
          success: false,
          message: "Invalid encounter data",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    const data = {
      ...result.data,
      ...(result.data.endedAt !== undefined
        ? {
            endedAt: result.data.endedAt ? new Date(result.data.endedAt) : null,
          }
        : {}),
    };
    const updated = await prisma.encounter.update({
      where: { id },
      data,
      select: {
        id: true,
        type: true,
        status: true,
        startedAt: true,
        endedAt: true,
        clinicalNote: true,
        chiefComplaint: true,
        objective: true,
        subjective: true,
        assessmentPlan: true,
        lockedAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Encounter draft saved successfully",
      data: { encounter: updated },
    });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Update encounter error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
