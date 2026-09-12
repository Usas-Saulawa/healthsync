import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import {
  admissionEventFiltersSchema,
  uuidSchema,
} from "@/lib/validation/clinical-results";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
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
    const parsed = admissionEventFiltersSchema.safeParse(
      Object.fromEntries(new URL(request.url).searchParams.entries()),
    );
    if (!parsed.success)
      return NextResponse.json(
        {
          success: false,
          message: "Invalid admission event filters",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    const filters = parsed.data;
    const dateFilter = {
      ...(filters.dateFrom ? { gte: new Date(filters.dateFrom) } : {}),
      ...(filters.dateTo ? { lte: new Date(filters.dateTo) } : {}),
    };
    const [admissions, requests] = await Promise.all([
      prisma.patientAdmission.findMany({
        where: {
          patientId,
          hospitalId: user.hospitalId,
          ...(filters.status
            ? {
                status: filters.status as
                  | "ADMITTED"
                  | "DISCHARGED"
                  | "CANCELLED",
              }
            : {}),
          ...(Object.keys(dateFilter).length
            ? { admissionDate: dateFilter }
            : {}),
        },
        orderBy: { admissionDate: "desc" },
        include: {
          ward: { select: { id: true, name: true, code: true } },
          attendingDoctor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              staffId: true,
            },
          },
        },
      }),
      prisma.admissionRequest.findMany({
        where: {
          patientId,
          hospitalId: user.hospitalId,
          ...(filters.status
            ? {
                status: filters.status as
                  | "REQUESTED"
                  | "PENDING_APPROVAL"
                  | "APPROVED"
                  | "DECLINED"
                  | "CANCELLED",
              }
            : {}),
          ...(Object.keys(dateFilter).length
            ? { requestedAt: dateFilter }
            : {}),
        },
        orderBy: { requestedAt: "desc" },
        include: {
          preferredDepartment: { select: { id: true, name: true, code: true } },
          requester: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              staffId: true,
            },
          },
        },
      }),
    ]);
    const items = [
      ...admissions.map((event) => ({
        id: event.id,
        type: "ADMISSION",
        date: event.admissionDate,
        status: event.status,
        ward: event.ward,
        provider: event.attendingDoctor,
        reason: event.reason,
      })),
      ...requests.map((event) => ({
        id: event.id,
        type: "ADMISSION",
        date: event.requestedAt,
        status: event.status,
        ward: event.preferredDepartment,
        provider: event.requester,
        reason: event.reason,
      })),
    ]
      .filter((event) => !filters.type || event.type === filters.type)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
    const start = (filters.page - 1) * filters.limit;
    const pageItems = items.slice(start, start + filters.limit);
    return NextResponse.json({
      success: true,
      data: {
        items: pageItems,
        pagination: {
          page: filters.page,
          limit: filters.limit,
          total: items.length,
          totalPages: items.length
            ? Math.ceil(items.length / filters.limit)
            : 0,
        },
      },
    });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("List admission events error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
