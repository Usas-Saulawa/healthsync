import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { createPatientSchema } from "@/lib/validation/patient";

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser();

    if (!["ADMIN", "DOCTOR", "NURSE"].includes(user.role)) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to create patients",
        },
        { status: 403 }
      );
    }

    const body = await request.json();

    const result = createPatientSchema.safeParse(body);

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

    const data = result.data;

    const existingPatient = await prisma.patient.findFirst({
      where: {
        hospitalId: user.hospitalId,
        hospitalNumber: data.hospitalNumber,
      },
      select: {
        id: true,
      },
    });

    if (existingPatient) {
      return NextResponse.json(
        {
          success: false,
          message: "A patient with this hospital number already exists",
        },
        { status: 409 }
      );
    }

    const patient = await prisma.patient.create({
      data: {
        hospitalId: user.hospitalId,
        hospitalNumber: data.hospitalNumber,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: new Date(data.dateOfBirth),
        gender: data.gender,
        phone: data.phone,
        address: data.address,
        bloodGroup: data.bloodGroup,
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
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Patient created successfully",
        data: {
          patient,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create patient error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
export async function GET(request: NextRequest) {
  try {
    const user = await requireUser();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() || "";

    const pageParam = Number(searchParams.get("page") || "1");
    const limitParam = Number(searchParams.get("limit") || "20");

    const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;
    const limit =
      Number.isInteger(limitParam) && limitParam > 0 && limitParam <= 100
        ? limitParam
        : 20;

    const skip = (page - 1) * limit;

    const where = {
      hospitalId: user.hospitalId,
      ...(search
        ? {
            OR: [
              {
                hospitalNumber: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                firstName: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                lastName: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {}),
    };

    const [patients, total] = await Promise.all([
      prisma.patient.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          hospitalNumber: true,
          firstName: true,
          lastName: true,
          dateOfBirth: true,
          gender: true,
          phone: true,
          bloodGroup: true,
          createdAt: true,
        },
      }),

      prisma.patient.count({
        where,
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        patients,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("List patients error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
