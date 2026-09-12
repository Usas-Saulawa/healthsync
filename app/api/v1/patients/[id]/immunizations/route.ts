import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import { hasRole } from "@/lib/auth/authorization";
import {
  immunizationFiltersSchema,
  immunizationSchema,
  uuidSchema,
} from "@/lib/validation/clinical-results";
import type { Prisma } from "@/generated/prisma/client";

type RouteContext = { params: Promise<{ id: string }> };

async function getPatient(patientId: string, hospitalId: string) {
  return prisma.patient.findFirst({
    where: { id: patientId, hospitalId },
    select: { id: true },
  });
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    const { id: patientId } = await context.params;
    if (!uuidSchema.safeParse(patientId).success)
      return NextResponse.json(
        { success: false, message: "Invalid patient ID" },
        { status: 400 },
      );
    if (!(await getPatient(patientId, user.hospitalId)))
      return NextResponse.json(
        { success: false, message: "Patient not found" },
        { status: 404 },
      );
    const parsed = immunizationFiltersSchema.safeParse(
      Object.fromEntries(new URL(request.url).searchParams.entries()),
    );
    if (!parsed.success)
      return NextResponse.json(
        {
          success: false,
          message: "Invalid immunization filters",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    const filters = parsed.data;
    const dateAdministered = {
      ...(filters.dateFrom ? { gte: new Date(filters.dateFrom) } : {}),
      ...(filters.dateTo ? { lte: new Date(filters.dateTo) } : {}),
    };
    const where: Prisma.ImmunizationWhereInput = {
      patientId,
      hospitalId: user.hospitalId,
      ...(filters.vaccine
        ? { vaccineName: { contains: filters.vaccine, mode: "insensitive" } }
        : {}),
      ...(filters.status ? { status: filters.status } : {}),
      ...(Object.keys(dateAdministered).length ? { dateAdministered } : {}),
    };
    const [items, total] = await Promise.all([
      prisma.immunization.findMany({
        where,
        orderBy: { dateAdministered: "desc" },
        skip: (filters.page - 1) * filters.limit,
        take: filters.limit,
        include: {
          administeredBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              staffId: true,
            },
          },
        },
      }),
      prisma.immunization.count({ where }),
    ]);
    return NextResponse.json({
      success: true,
      data: {
        items,
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
    console.error("List immunizations error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    if (!hasRole(user.role, ["DOCTOR", "NURSE", "ADMIN"]))
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to record vaccinations",
        },
        { status: 403 },
      );
    const { id: patientId } = await context.params;
    if (!uuidSchema.safeParse(patientId).success)
      return NextResponse.json(
        { success: false, message: "Invalid patient ID" },
        { status: 400 },
      );
    if (!(await getPatient(patientId, user.hospitalId)))
      return NextResponse.json(
        { success: false, message: "Patient not found" },
        { status: 404 },
      );
    const parsed = immunizationSchema.safeParse(await request.json());
    if (!parsed.success)
      return NextResponse.json(
        {
          success: false,
          message: "Invalid immunization",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    const input = parsed.data;
    const immunization = await prisma.immunization.create({
      data: {
        ...input,
        patientId,
        hospitalId: user.hospitalId,
        administeredById: user.id,
        dateAdministered: new Date(input.dateAdministered),
        expirationDate: new Date(input.expirationDate),
        visDate: input.visDate ? new Date(input.visDate) : null,
        visGivenDate: input.visGivenDate ? new Date(input.visGivenDate) : null,
      },
      include: {
        administeredBy: {
          select: { id: true, firstName: true, lastName: true, staffId: true },
        },
      },
    });
    return NextResponse.json(
      { success: true, data: immunization },
      { status: 201 },
    );
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Create immunization error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
