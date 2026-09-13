import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import {
  patientFollowUpFiltersSchema,
  uuidSchema,
} from "@/lib/validation/clinical-results";
import type { Prisma } from "@/generated/prisma/client";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    const { id: patientId } = await context.params;
    if (!uuidSchema.safeParse(patientId).success) {
      return NextResponse.json(
        { success: false, message: "Invalid patient ID" },
        { status: 400 },
      );
    }

    const patient = await prisma.patient.findFirst({
      where: { id: patientId, hospitalId: user.hospitalId },
      select: { id: true },
    });
    if (!patient) {
      return NextResponse.json(
        { success: false, message: "Patient not found" },
        { status: 404 },
      );
    }

    const parsed = patientFollowUpFiltersSchema.safeParse(
      Object.fromEntries(new URL(request.url).searchParams.entries()),
    );
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid follow-up filters",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const filters = parsed.data;
    const scheduledAt = {
      ...(filters.dateFrom ? { gte: new Date(filters.dateFrom) } : {}),
      ...(filters.dateTo ? { lte: new Date(filters.dateTo) } : {}),
    };
    const where: Prisma.FollowUpWhereInput = {
      patientId: patient.id,
      hospitalId: user.hospitalId,
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.departmentId ? { departmentId: filters.departmentId } : {}),
      ...(filters.providerId ? { doctorId: filters.providerId } : {}),
      ...(Object.keys(scheduledAt).length ? { scheduledAt } : {}),
    };
    const orderBy: Prisma.FollowUpOrderByWithRelationInput =
      filters.sortBy === "followUpType"
        ? { type: filters.sortOrder }
        : filters.sortBy === "status"
          ? { status: filters.sortOrder }
          : { scheduledAt: filters.sortOrder };

    const [followUps, total] = await Promise.all([
      prisma.followUp.findMany({
        where,
        orderBy,
        skip: (filters.page - 1) * filters.limit,
        take: filters.limit,
        select: {
          id: true,
          type: true,
          scheduledAt: true,
          status: true,
          reason: true,
          specialInstructions: true,
          priority: true,
          doctor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              staffId: true,
            },
          },
          department: { select: { id: true, name: true, code: true } },
          encounter: { select: { id: true, type: true } },
        },
      }),
      prisma.followUp.count({ where }),
    ]);

    const items = followUps.map((followUp) => ({
      id: followUp.id,
      followUpType: followUp.type,
      scheduledDate: followUp.scheduledAt,
      provider: followUp.doctor,
      department: followUp.department,
      status: followUp.status,
      notes: followUp.reason,
      specialInstructions: followUp.specialInstructions,
      priority: followUp.priority,
      encounter: followUp.encounter,
    }));

    return NextResponse.json({
      success: true,
      data: {
        items,
        message: total
          ? undefined
          : "No follow-up records found for this patient",
        pagination: {
          page: filters.page,
          limit: filters.limit,
          total,
          totalPages: total ? Math.ceil(total / filters.limit) : 0,
        },
      },
    });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("List patient follow-ups error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
