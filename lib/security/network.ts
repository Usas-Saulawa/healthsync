import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";

function normalizeIp(ip: string): string {
  return ip.replace(/^::ffff:/, "").trim();
}

export function getClientIp(request: NextRequest): string | null {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();

    if (firstIp) {
      return normalizeIp(firstIp);
    }
  }

  const realIp = request.headers.get("x-real-ip");

  if (realIp) {
    return normalizeIp(realIp);
  }

  return null;
}

function ipToNumber(ip: string): number | null {
  const parts = ip.split(".");

  if (parts.length !== 4) {
    return null;
  }

  const numbers = parts.map(Number);

  if (
    numbers.some(
      (part) => !Number.isInteger(part) || part < 0 || part > 255,
    )
  ) {
    return null;
  }

  return (
    numbers[0] * 256 ** 3 +
    numbers[1] * 256 ** 2 +
    numbers[2] * 256 +
    numbers[3]
  );
}

function isIpInCidr(ip: string, cidr: string): boolean {
  const [network, prefixString] = cidr.split("/");

  if (!network || !prefixString) {
    return false;
  }

  const prefix = Number(prefixString);

  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
    return false;
  }

  const ipNumber = ipToNumber(ip);
  const networkNumber = ipToNumber(network);

  if (ipNumber === null || networkNumber === null) {
    return false;
  }

  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;

  return (ipNumber & mask) === (networkNumber & mask);
}

export async function isAuthorizedNetwork(
  hospitalId: string,
  ip: string,
): Promise<boolean> {
  const networks = await prisma.authorizedNetwork.findMany({
    where: {
      hospitalId,
      isActive: true,
    },
    select: {
      cidr: true,
    },
  });

  return networks.some((network) => isIpInCidr(ip, network.cidr));
}
