import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { updatePatientSchema } from "@/lib/validation/patient";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const user = await requireUser();
    const { id } = await context.params;

    const patient = await prisma.patient.findFirst({
      where: {
        id,
        hospitalId: user.hospitalId,
      },
      select: {
        id: true,
        hospitalId: true,
        hospitalNumber: true,
        firstName: true,
        lastName: true,
        dateOfBirth: true,
        gender: true,
        phone: true,
        address: true,
        bloodGroup: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!patient) {
      return NextResponse.json(
        {
          success: false,
          message: "Patient not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        patient,
      },
    });
  } catch (error) {
    console.error("Get patient error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const user = await requireUser();

    if (!["ADMIN", "DOCTOR", "NURSE"].includes(user.role)) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to update patients",
        },
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const body = await request.json();

    const result = updatePatientSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid patient data",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const existingPatient = await prisma.patient.findFirst({
      where: {
        id,
        hospitalId: user.hospitalId,
      },
      select: {
        id: true,
      },
    });

    if (!existingPatient) {
      return NextResponse.json(
        {
          success: false,
          message: "Patient not found",
        },
        { status: 404 }
      );
    }

    const data = result.data;

    const patient = await prisma.patient.update({
      where: {
        id,
      },
     data: {
          ...(data.hospitalNumber !== undefined && {
            hospitalNumber: data.hospitalNumber,
          }),

          ...(data.firstName !== undefined && {
            firstName: data.firstName,
          }),

          ...(data.lastName !== undefined && {
            lastName: data.lastName,
          }),

          ...(data.dateOfBirth !== undefined && {
            dateOfBirth: new Date(data.dateOfBirth),
          }),

          ...(data.gender !== undefined && {
            gender: data.gender,
          }),

          ...(data.phone !== undefined && {
            phone: data.phone,
          }),

          ...(data.address !== undefined && {
            address: data.address,
          }),

          ...(data.bloodGroup !== undefined && {
            bloodGroup: data.bloodGroup,
          }),

          ...(data.status !== undefined && {
            status: data.status,
          }),
        },
      select: {
        id: true,
        hospitalId: true,
        hospitalNumber: true,
        firstName: true,
        lastName: true,
        dateOfBirth: true,
        gender: true,
        phone: true,
        address: true,
        bloodGroup: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Patient updated successfully",
      data: {
        patient,
      },
    });
  } catch (error) {
    console.error("Update patient error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}