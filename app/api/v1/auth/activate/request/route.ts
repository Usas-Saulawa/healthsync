import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { createOtp } from "@/lib/auth/otp";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const userId =
      typeof body.userId === "string"
        ? body.userId.trim()
        : "";

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID is required",
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
        email: true,
        isActive: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to process account activation",
        },
        { status: 404 },
      );
    }

    if (user.isActive) {
      return NextResponse.json({
        success: true,
        message: "Account is already activated",
        data: {
          requiresVerification: false,
        },
      });
    }

    const otp = await createOtp(user.id, "ACCOUNT_ACTIVATION");

    return NextResponse.json({
      success: true,
      message: "Account activation code sent",
      data: {
        requiresVerification: true,
        expiresAt: otp.expiresAt,
      },
    });
  } catch (error) {
    console.error("Account activation request error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 },
    );
  }
}
