import { NextRequest, NextResponse } from "next/server";

import argon2 from "argon2";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { updateUserSchema } from "@/lib/validation/user";

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
    const currentUser = await requireUser();

    if (currentUser.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to view users",
        },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    const user = await prisma.user.findFirst({
      where: {
        id,
        hospitalId: currentUser.hospitalId,
      },
      select: {
        id: true,
        hospitalId: true,
        departmentId: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        department: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);

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
    const currentUser = await requireUser();

    if (currentUser.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to update users",
        },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    const body = await request.json();

    const result = updateUserSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid user data",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        id,
        hospitalId: currentUser.hospitalId,
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const data = result.data;

    if (data.departmentId) {
      const department = await prisma.department.findFirst({
        where: {
          id: data.departmentId,
          hospitalId: currentUser.hospitalId,
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
    }

    if (data.email && data.email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
        select: {
          id: true,
        },
      });

      if (emailExists) {
        return NextResponse.json(
          {
            success: false,
            message: "A user with this email already exists",
          },
          { status: 409 }
        );
      }
    }

    const passwordHash = data.password
      ? await argon2.hash(data.password)
      : undefined;

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...(data.firstName !== undefined && {
          firstName: data.firstName,
        }),

        ...(data.lastName !== undefined && {
          lastName: data.lastName,
        }),

        ...(data.email !== undefined && {
          email: data.email,
        }),

        ...(passwordHash !== undefined && {
          passwordHash,
        }),

        ...(data.role !== undefined && {
          role: data.role,
        }),

        ...(data.departmentId !== undefined && {
          departmentId: data.departmentId,
        }),

        ...(data.isActive !== undefined && {
          isActive: data.isActive,
        }),
      },
      select: {
        id: true,
        hospitalId: true,
        departmentId: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("Update user error:", error);

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
    const currentUser = await requireUser();

    if (currentUser.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to deactivate users",
        },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    if (id === currentUser.id) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot deactivate your own account",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        id,
        hospitalId: currentUser.hospitalId,
      },
      select: {
        id: true,
        isActive: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "User is already inactive",
        },
        { status: 409 }
      );
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isActive: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User deactivated successfully",
    });
  } catch (error) {
    console.error("Deactivate user error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
