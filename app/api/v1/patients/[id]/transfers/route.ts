import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import { hasRole } from "@/lib/auth/authorization";
import {
  transferRequestSchema,
  uuidSchema,
} from "@/lib/validation/clinical-results";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    if (!hasRole(user.role, ["DOCTOR", "NURSE", "ADMIN"]))
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to request transfers",
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
    const parsed = transferRequestSchema.safeParse(await request.json());
    if (!parsed.success)
      return NextResponse.json(
        {
          success: false,
          message: "Invalid transfer request",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    const input = parsed.data;
    const department = await prisma.department.findFirst({
      where: { id: input.destinationDepartmentId, hospitalId: user.hospitalId },
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
    const locations = await Promise.all([
      input.currentWardId
        ? prisma.ward.findFirst({
            where: { id: input.currentWardId, hospitalId: user.hospitalId },
            select: { id: true },
          })
        : null,
      input.currentBedId
        ? prisma.bed.findFirst({
            where: {
              id: input.currentBedId,
              ward: { hospitalId: user.hospitalId },
            },
            select: { id: true },
          })
        : null,
    ]);
    if (
      (input.currentWardId && !locations[0]) ||
      (input.currentBedId && !locations[1])
    )
      return NextResponse.json(
        { success: false, message: "Current location is not in this hospital" },
        { status: 400 },
      );
    const transfer = await prisma.transferRequest.create({
      data: {
        ...input,
        patientId,
        hospitalId: user.hospitalId,
        requesterId: user.id,
        requestedAt: new Date(input.requestedAt),
        status: "PENDING_APPROVAL",
      },
    });
    return NextResponse.json(
      { success: true, data: transfer },
      { status: 201 },
    );
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Create transfer request error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
