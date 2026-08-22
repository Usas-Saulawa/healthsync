import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { createDepartmentSchema } from "@/lib/validation/department";

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser();

    if (!["ADMIN"].includes(user.role)) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to create departments",
        },
        { status: 403 }
      );
    }

    const body = await request.json();

    const result = createDepartmentSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid department data",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, code } = result.data;

    const existingDepartment = await prisma.department.findFirst({
      where: {
        hospitalId: user.hospitalId,
        code,
      },
      select: {
        id: true,
      },
    });

    if (existingDepartment) {
      return NextResponse.json(
        {
          success: false,
          message: "A department with this code already exists",
        },
        { status: 409 }
      );
    }

    const department = await prisma.department.create({
      data: {
        hospitalId: user.hospitalId,
        name,
        code,
      },
      select: {
        id: true,
        hospitalId: true,
        name: true,
        code: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Department created successfully",
        data: {
          department,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create department error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await requireUser();

    const departments = await prisma.department.findMany({
      where: {
        hospitalId: user.hospitalId,
      },
      select: {
        id: true,
        hospitalId: true,
        name: true,
        code: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        departments,
      },
    });
  } catch (error) {
    console.error("Get departments error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
