import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import {
  patientOrderFiltersSchema,
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

    const parsed = patientOrderFiltersSchema.safeParse(
      Object.fromEntries(new URL(request.url).searchParams.entries()),
    );
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order filters",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const filters = parsed.data;
    const createdAt = {
      ...(filters.dateFrom ? { gte: new Date(filters.dateFrom) } : {}),
      ...(filters.dateTo ? { lte: new Date(filters.dateTo) } : {}),
    };
    const where: Prisma.OrderWhereInput = {
      patientId: patient.id,
      hospitalId: user.hospitalId,
      ...(filters.type ? { type: filters.type } : {}),
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.priority ? { priority: filters.priority } : {}),
      ...(Object.keys(createdAt).length ? { createdAt } : {}),
      ...(filters.search
        ? {
            OR: [
              { name: { contains: filters.search, mode: "insensitive" } },
              {
                orderedBy: {
                  OR: [
                    {
                      firstName: {
                        contains: filters.search,
                        mode: "insensitive",
                      },
                    },
                    {
                      lastName: {
                        contains: filters.search,
                        mode: "insensitive",
                      },
                    },
                  ],
                },
              },
            ],
          }
        : {}),
    };

    const orderBy: Prisma.OrderOrderByWithRelationInput =
      filters.sortBy === "orderName"
        ? { name: filters.sortOrder }
        : filters.sortBy === "category"
          ? { type: filters.sortOrder }
          : filters.sortBy === "priority"
            ? { priority: filters.sortOrder }
            : filters.sortBy === "status"
              ? { status: filters.sortOrder }
              : { createdAt: filters.sortOrder };

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy,
        skip: (filters.page - 1) * filters.limit,
        take: filters.limit,
        select: {
          id: true,
          name: true,
          type: true,
          createdAt: true,
          priority: true,
          status: true,
          orderedBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              staffId: true,
            },
          },
          encounter: { select: { id: true, type: true } },
        },
      }),
      prisma.order.count({ where }),
    ]);

    const items = orders.map((order) => ({
      id: order.id,
      orderName: order.name,
      category: order.type,
      orderedBy: order.orderedBy,
      date: order.createdAt,
      priority: order.priority,
      status: order.status,
      encounter: order.encounter,
    }));

    return NextResponse.json({
      success: true,
      data: {
        items,
        message: total ? undefined : "No orders found for this patient",
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
    console.error("List patient orders error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
