import { NextRequest, NextResponse } from "next/server";

import argon2 from "argon2";

import { prisma } from "@/lib/prisma";

import { createSession } from "@/lib/auth/session";

import { checkRateLimit } from "@/lib/security/rate-limit";

import { getTrustedDevice } from "@/lib/auth/trusted-device";

import { createOtp } from "@/lib/auth/otp";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const identifier =
      typeof body.identifier === "string"
        ? body.identifier.trim()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!identifier || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email or Staff ID and password are required",
        },
        { status: 400 },
      );
    }

    const normalizedIdentifier = identifier.toLowerCase();

    const rateLimit = checkRateLimit(
      `login:${normalizedIdentifier}`,
    );

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many login attempts. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfter ?? 60),
          },
        },
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: normalizedIdentifier,
          },
          {
            staffId: identifier.toUpperCase(),
          },
        ],
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email/Staff ID or password",
        },
        { status: 401 },
      );
    }

    const passwordValid = await argon2.verify(
      user.passwordHash,
      password,
    );

    if (!user.isActive) {
      return NextResponse.json(
        {
          success: true,
          message: "Account activation required",
          data: {
            requiresAccountActivation: true,
            requiresDeviceVerification: false,
            requiresPasswordChange: false,
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
        },
        { status: 200 },
      );
    }

    if (!passwordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email/Staff ID or password",
        },
        { status: 401 },
      );
    }

    const trustedDevice = await getTrustedDevice(user.id);

    /*
     * First login.
     *
     * The user received a temporary password when the account
     * was created. They must change it before normal access.
     *
     * If the device is not trusted, send a device verification
     * OTP before allowing the password-change flow to continue.
     */
    if (user.mustChangePassword) {
      if (!trustedDevice) {
        await createOtp(
          user.id,
          "DEVICE_VERIFICATION",
        );
      }

      return NextResponse.json({
        success: true,
        message: trustedDevice
          ? "Password change required"
          : "Device verification required",
        data: {
          requiresAccountActivation: false,
          requiresPasswordChange: true,
          requiresDeviceVerification: !trustedDevice,
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
     * Existing trusted device.
     *
     * No OTP is required because this device has already
     * completed device verification.
     */
    if (trustedDevice) {
      await createSession(user.id);

      return NextResponse.json({
        success: true,
        message: "Login successful",
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
    }

    /*
     * New/untrusted device.
     *
     * Send an OTP before creating the authenticated session.
     */
    await createOtp(
      user.id,
      "DEVICE_VERIFICATION",
    );

    return NextResponse.json({
      success: true,
      message: "Device verification required",
      data: {
        requiresAccountActivation: false,
        requiresPasswordChange: false,
        requiresDeviceVerification: true,
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
