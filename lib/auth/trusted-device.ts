import { createHash, randomBytes } from "crypto";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

const TRUSTED_DEVICE_COOKIE = "healthsync_trusted_device";

const TRUSTED_DEVICE_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createTrustedDevice(
  userId: string,
  ipAddress: string | null,
  deviceName?: string,
) {
  const token = randomBytes(32).toString("hex");

  const tokenHash = hashToken(token);

  const expiresAt = new Date(Date.now() + TRUSTED_DEVICE_DURATION_MS);

  await prisma.trustedDevice.create({
    data: {
      userId,
      tokenHash,
      deviceName: deviceName ?? null,
      lastIp: ipAddress,
      trustedAt: new Date(),
      lastUsedAt: new Date(),
      expiresAt,
    },
  });

  const cookieStore = await cookies();

  cookieStore.set(TRUSTED_DEVICE_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  return {
    expiresAt,
  };
}

export async function getTrustedDevice(userId: string) {
  const cookieStore = await cookies();

  const token = cookieStore.get(TRUSTED_DEVICE_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const tokenHash = hashToken(token);

  const device = await prisma.trustedDevice.findFirst({
    where: {
      userId,
      tokenHash,
      revokedAt: null,
    },
  });

  if (!device) {
    return null;
  }

  if (device.expiresAt && device.expiresAt <= new Date()) {
    await prisma.trustedDevice.update({
      where: {
        id: device.id,
      },
      data: {
        revokedAt: new Date(),
      },
    });

    return null;
  }

  return device;
}

export async function touchTrustedDevice(
  deviceId: string,
  ipAddress: string | null,
) {
  await prisma.trustedDevice.update({
    where: {
      id: deviceId,
    },
    data: {
      lastUsedAt: new Date(),
      lastIp: ipAddress,
    },
  });
}

export async function revokeTrustedDevice(deviceId: string) {
  await prisma.trustedDevice.update({
    where: {
      id: deviceId,
    },
    data: {
      revokedAt: new Date(),
    },
  });
}

export async function revokeAllTrustedDevices(userId: string) {
  await prisma.trustedDevice.updateMany({
    where: {
      userId,
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });

  const cookieStore = await cookies();

  cookieStore.delete(TRUSTED_DEVICE_COOKIE);
}
