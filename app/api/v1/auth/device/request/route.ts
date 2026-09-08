import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { createOtp } from "@/lib/auth/otp";

import { getTrustedDevice } from "@/lib/auth/trusted-device";

import { getClientIp, isAuthorizedNetwork } from "@/lib/security/network";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const userId = typeof body.userId === "string" ? body.userId.trim() : "";

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
        hospitalId: true,
        email: true,
        isActive: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to process device verification",
        },
        { status: 404 },
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

    const trustedDevice = await getTrustedDevice(user.id);

    if (trustedDevice) {
      return NextResponse.json({
        success: true,
        message: "This device is already trusted",
        data: {
          requiresVerification: false,
        },
      });
    }

    const clientIp = getClientIp(request);

    const authorizedNetwork = clientIp
      ? await isAuthorizedNetwork(user.hospitalId, clientIp)
      : false;

    const otp = await createOtp(user.id, "DEVICE_VERIFICATION");

    return NextResponse.json({
      success: true,
      message: "Device verification code sent",
      data: {
        requiresVerification: true,
        networkAuthorized: authorizedNetwork,
        expiresAt: otp.expiresAt,
      },
    });
  } catch (error) {
    console.error("Device verification request error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 },
    );
  }
}
