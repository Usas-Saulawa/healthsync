import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "Authentication required",
      },
      { status: 401 },
    );
  }

  return NextResponse.json({
    success: true,
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
}