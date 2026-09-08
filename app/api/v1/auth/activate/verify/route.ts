import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { verifyOtp } from "@/lib/auth/otp";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const userId = typeof body.userId === "string" ? body.userId.trim() : "";

    const code = typeof body.code === "string" ? body.code.trim() : "";

    if (!userId || !code) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID and activation code are required",
        },
        { status: 400 },
      );
    }

    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        {
          success: false,
          message: "Activation code must be 6 digits",
        },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
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
          message: "Invalid activation request",
        },
        { status: 401 },
      );
    }

    if (user.isActive) {
      return NextResponse.json({
        success: true,
        message: "Account is already activated",
        data: {
          activated: true,
        },
      });
    }

    const verification = await verifyOtp(user.id, "ACCOUNT_ACTIVATION", code);

    if (!verification.success) {
      return NextResponse.json(
        {
          success: false,
          message: verification.message,
        },
        { status: 401 },
      );
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Account activated successfully",
      data: {
        activated: true,
      },
    });
  } catch (error) {
    console.error("Account activation verification error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 },
    );
  }
}
