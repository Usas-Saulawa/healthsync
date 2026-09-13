import { NextRequest, NextResponse } from "next/server";

import argon2 from "argon2";

import { prisma } from "@/lib/prisma";

import { getCurrentUser, createSession } from "@/lib/auth/session";

import { changePasswordSchema } from "@/lib/validation/user";

export async function POST(request: NextRequest) {
  try {
    /*
     * The user must already have a valid authenticated session.
     *
     * This is important because changing the temporary password
     * should not be possible with only a user ID.
     */
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required",
        },
        { status: 401 },
      );
    }

    const body = await request.json();

    const result = changePasswordSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password data",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { currentPassword, newPassword } = result.data;

    /*
     * Get the complete user record so we can verify
     * the current password against the stored Argon2 hash.
     */
    const user = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User account not found",
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

    /*
     * Verify the temporary/current password.
     */
    const passwordValid = await argon2.verify(
      user.passwordHash,
      currentPassword,
    );

    if (!passwordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Current password is incorrect",
        },
        { status: 401 },
      );
    }

    /*
     * Do not allow the user to reuse the same password.
     */
    const samePassword = await argon2.verify(user.passwordHash, newPassword);

    if (samePassword) {
      return NextResponse.json(
        {
          success: false,
          message: "New password must be different from your current password",
        },
        { status: 400 },
      );
    }

    /*
     * Hash the new password with Argon2.
     */
    const newPasswordHash = await argon2.hash(newPassword);

    /*
     * Mark the first-login password requirement as completed.
     */
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordHash: newPasswordHash,
        mustChangePassword: false,
      },
    });

    /*
     * Create the normal authenticated session.
     */
    await createSession(user.id);

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
      data: {
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
    });
  } catch (error) {
    console.error("Change password error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 },
    );
  }
}
