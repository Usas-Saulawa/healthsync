import { randomInt, createHash } from "crypto";

import { prisma } from "@/lib/prisma";

import { sendEmail } from "@/lib/email/mailer";

export type OtpPurpose =
  "DEVICE_VERIFICATION" | "ACCOUNT_ACTIVATION" | "PASSWORD_RESET";

const OTP_EXPIRATION_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function hashOtp(code: string) {
  return createHash("sha256").update(code).digest("hex");
}

function generateOtpCode() {
  return randomInt(100000, 1000000).toString();
}

function getOtpSubject(purpose: OtpPurpose) {
  switch (purpose) {
    case "DEVICE_VERIFICATION":
      return "HealthSync Device Verification Code";

    case "ACCOUNT_ACTIVATION":
      return "HealthSync Account Activation Code";

    case "PASSWORD_RESET":
      return "HealthSync Password Reset Code";
  }
}

function getOtpMessage(purpose: OtpPurpose, code: string) {
  switch (purpose) {
    case "DEVICE_VERIFICATION":
      return `Your HealthSync device verification code is ${code}. This code expires in 10 minutes and must not be shared with anyone.`;

    case "ACCOUNT_ACTIVATION":
      return `Your HealthSync account activation code is ${code}. This code expires in 10 minutes and must not be shared with anyone.`;

    case "PASSWORD_RESET":
      return `Your HealthSync password reset code is ${code}. This code expires in 10 minutes and must not be shared with anyone.`;
  }
}

export async function createOtp(userId: string, purpose: OtpPurpose) {
  const code = generateOtpCode();

  const expiresAt = new Date(Date.now() + OTP_EXPIRATION_MS);

  const codeHash = hashOtp(code);

  // Invalidate previous unused OTPs for the same purpose.
  await prisma.authOtp.updateMany({
    where: {
      userId,
      purpose,
      usedAt: null,
    },
    data: {
      usedAt: new Date(),
    },
  });

  const otp = await prisma.authOtp.create({
    data: {
      userId,
      purpose,
      codeHash,
      expiresAt,
      attempts: 0,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
    },
  });

  if (!user) {
    await prisma.authOtp.update({
      where: {
        id: otp.id,
      },
      data: {
        usedAt: new Date(),
      },
    });

    throw new Error("User not found");
  }

  await sendEmail({
    to: user.email,
    subject: getOtpSubject(purpose),
    text: getOtpMessage(purpose, code),
  });

  return {
    expiresAt,
  };
}

export async function verifyOtp(
  userId: string,
  purpose: OtpPurpose,
  code: string,
) {
  const otp = await prisma.authOtp.findFirst({
    where: {
      userId,
      purpose,
      usedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!otp) {
    return {
      success: false,
      message: "Verification code not found",
    };
  }

  if (otp.expiresAt <= new Date()) {
    await prisma.authOtp.update({
      where: {
        id: otp.id,
      },
      data: {
        usedAt: new Date(),
      },
    });

    return {
      success: false,
      message: "Verification code has expired",
    };
  }

  if (otp.attempts >= MAX_ATTEMPTS) {
    await prisma.authOtp.update({
      where: {
        id: otp.id,
      },
      data: {
        usedAt: new Date(),
      },
    });

    return {
      success: false,
      message: "Too many verification attempts",
    };
  }

  const codeHash = hashOtp(code);

  if (codeHash !== otp.codeHash) {
    await prisma.authOtp.update({
      where: {
        id: otp.id,
      },
      data: {
        attempts: {
          increment: 1,
        },
      },
    });

    return {
      success: false,
      message: "Invalid verification code",
    };
  }

  // Consume the OTP so it cannot be reused.
  await prisma.authOtp.update({
    where: {
      id: otp.id,
    },
    data: {
      usedAt: new Date(),
    },
  });

  return {
    success: true,
    message: "Verification successful",
  };
}

export async function invalidateOtps(userId: string, purpose: OtpPurpose) {
  await prisma.authOtp.updateMany({
    where: {
      userId,
      purpose,
      usedAt: null,
    },
    data: {
      usedAt: new Date(),
    },
  });
}
