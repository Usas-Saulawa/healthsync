import { randomBytes, createHash } from "crypto";

import { prisma } from "@/lib/prisma";

export type ChallengePurpose =
  | "DEVICE_VERIFICATION"
  | "PASSWORD_CHANGE";

const CHALLENGE_EXPIRATION_MS = 10 * 60 * 1000;

function hashChallenge(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createAuthChallenge(
  userId: string,
  purpose: ChallengePurpose,
) {
  const token = randomBytes(32).toString("hex");

  const tokenHash = hashChallenge(token);

  const expiresAt = new Date(
    Date.now() + CHALLENGE_EXPIRATION_MS,
  );

  await prisma.authChallenge.updateMany({
    where: {
      userId,
      purpose,
      completedAt: null,
    },
    data: {
      completedAt: new Date(),
    },
  });

  const challenge = await prisma.authChallenge.create({
    data: {
      userId,
      purpose,
      tokenHash,
      expiresAt,
    },
  });

  return {
    challengeId: challenge.id,
    token,
    expiresAt,
  };
}

export async function getAuthChallenge(
  userId: string,
  purpose: ChallengePurpose,
) {
  return prisma.authChallenge.findFirst({
    where: {
      userId,
      purpose,
      completedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function completeAuthChallenge(
  challengeId: string,
) {
  return prisma.authChallenge.update({
    where: {
      id: challengeId,
    },
    data: {
      completedAt: new Date(),
    },
  });
}

export async function invalidateAuthChallenges(
  userId: string,
  purpose: ChallengePurpose,
) {
  await prisma.authChallenge.updateMany({
    where: {
      userId,
      purpose,
      completedAt: null,
    },
    data: {
      completedAt: new Date(),
    },
  });
}

export { hashChallenge };