import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { updateDepartmentSchema } from "@/lib/validation/department";

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

    const department = await prisma.department.findFirst({
      where: {
        id,
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
    });

    if (!department) {
      return NextResponse.json(
        {
          success: false,
          message: "Department not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        department,
      },
    });
  } catch (error) {
    console.error("Get department error:", error);

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

    if (!["ADMIN"].includes(user.role)) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to update departments",
        },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    const body = await request.json();

    const result = updateDepartmentSchema.safeParse(body);

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

    const existingDepartment = await prisma.department.findFirst({
      where: {
        id,
        hospitalId: user.hospitalId,
      },
      select: {
        id: true,
      },
    });

    if (!existingDepartment) {
      return NextResponse.json(
        {
          success: false,
          message: "Department not found",
        },
        { status: 404 }
      );
    }

    const { name, code } = result.data;

    if (code !== undefined) {
      const duplicateDepartment = await prisma.department.findFirst({
        where: {
          hospitalId: user.hospitalId,
          code,
          NOT: {
            id,
          },
        },
        select: {
          id: true,
        },
      });

      if (duplicateDepartment) {
        return NextResponse.json(
          {
            success: false,
            message: "A department with this code already exists",
          },
          { status: 409 }
        );
      }
    }

    const department = await prisma.department.update({
      where: {
        id,
      },
      data: {
        ...(name !== undefined && {
          name,
        }),

        ...(code !== undefined && {
          code,
        }),
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

    return NextResponse.json({
      success: true,
      message: "Department updated successfully",
      data: {
        department,
      },
    });
  } catch (error) {
    console.error("Update department error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const user = await requireUser();

    if (!["ADMIN"].includes(user.role)) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to delete departments",
        },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    const department = await prisma.department.findFirst({
      where: {
        id,
        hospitalId: user.hospitalId,
      },
      select: {
        id: true,
      },
    });

    if (!department) {
      return NextResponse.json(
        {
          success: false,
          message: "Department not found",
        },
        { status: 404 }
      );
    }

    await prisma.department.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    console.error("Delete department error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Department could not be deleted. It may still contain users.",
      },
      { status: 409 }
    );
  }
}
