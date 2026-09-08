import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import {
  clinicalNoteSchema,
  uuidSchema,
} from "@/lib/validation/clinical-results";

type RouteContext = { params: Promise<{ id: string }> };
const viewerRoles = ["DOCTOR", "NURSE"] as const;

async function findStudy(id: string, hospitalId: string) {
  return prisma.imagingStudy.findFirst({
    where: { id, hospitalId },
    select: {
      id: true,
      patientId: true,
      studyType: true,
      modality: true,
      bodyPart: true,
      status: true,
      orderedAt: true,
      completedAt: true,
      findings: true,
      impression: true,
      notes: true,
      acknowledgedAt: true,
      acknowledgedBy: {
        select: { id: true, firstName: true, lastName: true, staffId: true },
      },
      patient: {
        select: {
          id: true,
          hospitalNumber: true,
          firstName: true,
          lastName: true,
          hospital: { select: { id: true, name: true, code: true } },
        },
      },
      encounter: {
        select: {
          id: true,
          doctor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              staffId: true,
            },
          },
        },
      },
      order: {
        select: {
          id: true,
          orderedBy: {
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
  });
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    if (!(viewerRoles as readonly string[]).includes(user.role))
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to view imaging studies",
        },
        { status: 403 },
      );
    const { id } = await context.params;
    if (!uuidSchema.safeParse(id).success)
      return NextResponse.json(
        { success: false, message: "Invalid imaging study ID" },
        { status: 400 },
      );
    const study = await findStudy(id, user.hospitalId);
    if (!study)
      return NextResponse.json(
        { success: false, message: "Imaging study not found" },
        { status: 404 },
      );
    return NextResponse.json({
      success: true,
      data: {
        study,
        dicomViewer: {
          configured: false,
          message: "DICOM viewer is not configured",
        },
        report: {
          available: false,
          message: "Report printing is not configured",
        },
      },
    });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Get imaging study error:", error);
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
        { success: false, message: "Only doctors can add clinical notes" },
        { status: 403 },
      );
    const { id } = await context.params;
    if (!uuidSchema.safeParse(id).success)
      return NextResponse.json(
        { success: false, message: "Invalid imaging study ID" },
        { status: 400 },
      );
    const study = await findStudy(id, user.hospitalId);
    if (!study)
      return NextResponse.json(
        { success: false, message: "Imaging study not found" },
        { status: 404 },
      );
    const parsed = clinicalNoteSchema.safeParse(await request.json());
    if (!parsed.success)
      return NextResponse.json(
        {
          success: false,
          message: "Invalid clinical note",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    const updated = await prisma.imagingStudy.update({
      where: { id },
      data: { notes: parsed.data.notes },
      select: { id: true, notes: true, updatedAt: true },
    });
    return NextResponse.json({
      success: true,
      message: "Clinical note saved",
      data: { study: updated },
    });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Update imaging study note error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
