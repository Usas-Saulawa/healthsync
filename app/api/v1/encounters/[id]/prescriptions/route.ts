import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { canManageEncounter } from "@/lib/auth/encounter-permissions";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import { prescriptionSchema } from "@/lib/validation/encounter";

type RouteContext = { params: Promise<{ id: string }> };

async function findEncounter(id: string, hospitalId: string) {
  return prisma.encounter.findFirst({
    where: { id, hospitalId },
    select: {
      id: true,
      patientId: true,
      doctorId: true,
      status: true,
      lockedAt: true,
    },
  });
}

const prescriptionSelect = {
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
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    const { id } = await context.params;
    const encounter = await findEncounter(id, user.hospitalId);
    if (!encounter)
      return NextResponse.json(
        { success: false, message: "Encounter not found" },
        { status: 404 },
      );
    const params = new URL(request.url).searchParams;
    const pageValue = Number(params.get("page") || "1");
    const limitValue = Number(params.get("limit") || "20");
    const page = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
    const limit =
      Number.isInteger(limitValue) && limitValue > 0 && limitValue <= 100
        ? limitValue
        : 20;
    const where = {
      encounterId: encounter.id,
      encounter: { hospitalId: user.hospitalId },
    };
    const [items, total] = await Promise.all([
      prisma.prescription.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: prescriptionSelect,
      }),
      prisma.prescription.count({ where }),
    ]);
    return NextResponse.json({
      success: true,
      data: {
        items,
        message: total
          ? undefined
          : "No prescriptions found for this encounter",
        pagination: {
          page,
          limit,
          total,
          totalPages: total ? Math.ceil(total / limit) : 0,
        },
      },
    });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("List encounter prescriptions error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    const { id } = await context.params;
    const encounter = await findEncounter(id, user.hospitalId);
    if (!encounter)
      return NextResponse.json(
        { success: false, message: "Encounter not found" },
        { status: 404 },
      );
    if (!canManageEncounter(user, encounter))
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to prescribe medication",
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
    const result = prescriptionSchema.safeParse(await request.json());
    if (!result.success)
      return NextResponse.json(
        {
          success: false,
          message: "Invalid prescription data",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    const prescription = await prisma.prescription.create({
      data: {
        patientId: encounter.patientId,
        encounterId: encounter.id,
        prescribedBy: user.id,
        startDate: new Date(),
        ...result.data,
      },
      select: prescriptionSelect,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Prescription submitted successfully",
        data: { prescription },
      },
      { status: 201 },
    );
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Create encounter prescription error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
