import { NextRequest, NextResponse } from "next/server";

import argon2 from "argon2";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { createUserSchema } from "@/lib/validation/user";

export async function POST(request: NextRequest) {
  try {
    const currentUser = await requireUser();

    // Only administrators can create users.
    if (currentUser.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to create users",
        },
        { status: 403 }
      );
    }

    const body = await request.json();

    const result = createUserSchema.safeParse(body);

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

    const data = result.data;

    // Check that the department belongs to the administrator's hospital.
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

    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "A user with this email already exists",
        },
        { status: 409 }
      );
    }

    const passwordHash = await argon2.hash(data.password);

    const user = await prisma.user.create({
      data: {
        hospitalId: currentUser.hospitalId,
        departmentId: data.departmentId,
        email: data.email,
        passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        isActive: data.isActive ?? true,
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

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        data: {
          user,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create user error:", error);

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

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() || "";
    const page = Math.max(
      Number.parseInt(searchParams.get("page") || "1", 10),
      1
    );
    const limit = Math.min(
      Math.max(
        Number.parseInt(searchParams.get("limit") || "20", 10),
        1
      ),
      100
    );

    const where = {
      hospitalId: currentUser.hospitalId,
      ...(search
        ? {
            OR: [
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
              {
                email: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {}),
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
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
        orderBy: {
          createdAt: "desc",
        },
        skip: (page - 1) * limit,
        take: limit,
      }),

      prisma.user.count({
        where,
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Get users error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
