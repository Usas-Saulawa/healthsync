import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import {
  clinicalNoteSchema,
  uuidSchema,
} from "@/lib/validation/clinical-results";

type RouteContext = { params: Promise<{ id: string }> };
const viewerRoles = ["DOCTOR", "NURSE", "LAB_TECHNICIAN"] as const;

async function findResult(id: string, hospitalId: string) {
  return prisma.labResult.findFirst({
    where: { id, hospitalId },
    select: {
      id: true,
      patientId: true,
      testType: true,
      testName: true,
      value: true,
      valueNumeric: true,
      unit: true,
      referenceRange: true,
      status: true,
      performedAt: true,
      resultedAt: true,
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
          name: true,
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
          message: "You are not authorized to view laboratory results",
        },
        { status: 403 },
      );
    const { id } = await context.params;
    if (!uuidSchema.safeParse(id).success)
      return NextResponse.json(
        { success: false, message: "Invalid laboratory result ID" },
        { status: 400 },
      );
    const result = await findResult(id, user.hospitalId);
    if (!result)
      return NextResponse.json(
        { success: false, message: "Laboratory result not found" },
        { status: 404 },
      );
    const trend = await prisma.labResult.findMany({
      where: {
        patientId: result.patientId,
        hospitalId: user.hospitalId,
        testType: "GLUCOSE",
        testName: { contains: "fasting", mode: "insensitive" },
        valueNumeric: { not: null },
      },
      orderBy: { performedAt: "desc" },
      take: 3,
      select: {
        id: true,
        performedAt: true,
        valueNumeric: true,
        unit: true,
        status: true,
      },
    });
    return NextResponse.json({
      success: true,
      data: { result, fastingGlucoseTrend: trend },
    });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Get lab result error:", error);
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
        { success: false, message: "Invalid laboratory result ID" },
        { status: 400 },
      );
    const result = await findResult(id, user.hospitalId);
    if (!result)
      return NextResponse.json(
        { success: false, message: "Laboratory result not found" },
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
    const updated = await prisma.labResult.update({
      where: { id },
      data: { notes: parsed.data.notes },
      select: { id: true, notes: true, updatedAt: true },
    });
    return NextResponse.json({
      success: true,
      message: "Clinical note saved",
      data: { result: updated },
    });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Update lab result note error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
