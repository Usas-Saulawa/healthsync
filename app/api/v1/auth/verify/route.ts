import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { verifyOtp } from "@/lib/auth/otp";

import { createTrustedDevice } from "@/lib/auth/trusted-device";

import { createSession } from "@/lib/auth/session";

import { getClientIp } from "@/lib/security/network";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const userId =
      typeof body.userId === "string"
        ? body.userId.trim()
        : "";

    const code =
      typeof body.code === "string"
        ? body.code.trim()
        : "";

    if (!userId || !code) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID and verification code are required",
        },
        { status: 400 },
      );
    }

    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification code must be 6 digits",
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
        staffId: true,
        hospitalId: true,
        departmentId: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        mustChangePassword: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid verification request",
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

    const verification = await verifyOtp(
      user.id,
      "DEVICE_VERIFICATION",
      code,
    );

    if (!verification.success) {
      return NextResponse.json(
        {
          success: false,
          message: verification.message,
        },
        { status: 401 },
      );
    }

    const clientIp = getClientIp(request);

    await createTrustedDevice(
      user.id,
      clientIp,
    );

    /*
     * The device is now trusted.
     *
     * We create a session so the user can continue
     * with the first-login password change if required.
     */
    await createSession(user.id);

    /*
     * First-login users must change their temporary password
     * before accessing the EHR dashboard.
     */
    if (user.mustChangePassword) {
      return NextResponse.json({
        success: true,
        message: "Device verified. Password change required",
        data: {
          requiresAccountActivation: false,
          requiresPasswordChange: true,
          requiresDeviceVerification: false,
          user: {
            id: user.id,
            staffId: user.staffId,
            hospitalId: user.hospitalId,
            departmentId: user.departmentId,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          },
        },
      });
    }

    /*
     * Existing users who only needed device verification
     * can continue directly to the dashboard.
     */
    return NextResponse.json({
      success: true,
      message: "Device verified and login successful",
      data: {
        requiresAccountActivation: false,
        requiresPasswordChange: false,
        requiresDeviceVerification: false,
        user: {
          id: user.id,
          staffId: user.staffId,
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
    console.error("Verify device error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 },
    );
  }
}
