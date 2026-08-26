import argon2 from "argon2";

import { prisma } from "@/lib/prisma";
import { generateStaffId } from "@/lib/auth/staff-id";
import { generateTemporaryPassword } from "@/lib/auth/temporary-password";
import { sendEmail } from "@/lib/email/mailer";

type CreateUserInput = {
  hospitalId: string;
  departmentId?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "DOCTOR" | "NURSE" | "LAB_TECHNICIAN" | "PHARMACIST";
};

export async function createUser(input: CreateUserInput) {
  const email = input.email.trim().toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("A user with this email already exists");
  }

  const staffId = await generateStaffId(input.role);
  const temporaryPassword = generateTemporaryPassword();
  const passwordHash = await argon2.hash(temporaryPassword);

  const user = await prisma.user.create({
    data: {
      hospitalId: input.hospitalId,
      departmentId: input.departmentId,
      staffId,
      email,
      passwordHash,
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      role: input.role,
      isActive: true,
      mustChangePassword: true,
    },
  });

  await sendEmail({
    to: user.email,
    subject: "HealthSync Account Created",
    text: [
      `Hello ${user.firstName},`,
      "",
      "Your HealthSync staff account has been created.",
      "",
      `Staff ID: ${user.staffId}`,
      `Email: ${user.email}`,
      `Temporary password: ${temporaryPassword}`,
      "",
      "Please use these credentials to sign in to HealthSync.",
      "You will be required to change your temporary password after your first login.",
      "",
      "Please do not share your login credentials with anyone.",
      "",
      "HealthSync",
    ].join("\n"),
  });

  return {
    user: {
      id: user.id,
      staffId: user.staffId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      hospitalId: user.hospitalId,
      departmentId: user.departmentId,
      mustChangePassword: user.mustChangePassword,
    },
  };
}
