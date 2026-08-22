import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth/session";
import { checkRateLimit } from "@/lib/security/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email, password } = body;

    const rateLimit = checkRateLimit(`login:${email}`);

    if (!rateLimit.success) {
    return NextResponse.json(
        {
        success: false,
        message: "Too many login attempts. Please try again later.",
        },
        {
        status: 429,
        headers: {
            "Retry-After": String(rateLimit.retryAfter ?? 60),
        },
        },
    );
    }

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "User account is inactive",
        },
        { status: 403 },
      );
    }

    const passwordValid = await argon2.verify(
      user.passwordHash,
      password,
    );

    if (!passwordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      );
    }

    await createSession(user.id);

    return NextResponse.json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user.id,
          hospitalId: user.hospitalId,
          departmentId: user.departmentId,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 },
    );
  }
}