import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { canManageEncounter } from "@/lib/auth/encounter-permissions";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import { orderSchema } from "@/lib/validation/encounter";

type RouteContext = { params: Promise<{ id: string }> };

async function findEncounter(id: string, hospitalId: string) {
  return prisma.encounter.findFirst({ where: { id, hospitalId }, select: { id: true, patientId: true, doctorId: true, status: true, lockedAt: true } });
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    const { id } = await context.params;
    const encounter = await findEncounter(id, user.hospitalId);
    if (!encounter) return NextResponse.json({ success: false, message: "Encounter not found" }, { status: 404 });
    const params = new URL(request.url).searchParams;
    const pageValue = Number(params.get("page") || "1");
    const limitValue = Number(params.get("limit") || "20");
    const page = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
    const limit = Number.isInteger(limitValue) && limitValue > 0 && limitValue <= 100 ? limitValue : 20;
    const where = { encounterId: encounter.id, hospitalId: user.hospitalId };
    const [items, total] = await Promise.all([
      prisma.order.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * limit, take: limit, select: { id: true, type: true, name: true, priority: true, indication: true, instructions: true, frequency: true, scheduledAt: true, status: true, createdAt: true, orderedBy: { select: { id: true, firstName: true, lastName: true, staffId: true } } } }),
      prisma.order.count({ where }),
    ]);
    return NextResponse.json({ success: true, data: { items, message: total ? undefined : "No orders found for this encounter", pagination: { page, limit, total, totalPages: total ? Math.ceil(total / limit) : 0 } } });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("List encounter orders error:", error);
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 });
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    const { id } = await context.params;
    const encounter = await findEncounter(id, user.hospitalId);
    if (!encounter) return NextResponse.json({ success: false, message: "Encounter not found" }, { status: 404 });
    if (!canManageEncounter(user, encounter)) return NextResponse.json({ success: false, message: "You are not authorized to create orders" }, { status: 403 });
    if (encounter.status !== "OPEN" || encounter.lockedAt) return NextResponse.json({ success: false, message: "This encounter is locked and cannot be modified." }, { status: 409 });
    const result = orderSchema.safeParse(await request.json());
    if (!result.success) return NextResponse.json({ success: false, message: "Invalid order data", errors: result.error.flatten().fieldErrors }, { status: 400 });
    const order = await prisma.order.create({ data: { encounterId: encounter.id, patientId: encounter.patientId, hospitalId: user.hospitalId, orderedById: user.id, ...result.data, scheduledAt: result.data.scheduledAt ? new Date(result.data.scheduledAt) : null }, select: { id: true, type: true, name: true, priority: true, indication: true, instructions: true, frequency: true, scheduledAt: true, status: true, createdAt: true, orderedBy: { select: { id: true, firstName: true, lastName: true, staffId: true } } } });
    return NextResponse.json({ success: true, message: "Order requested successfully", data: { order } }, { status: 201 });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Create encounter order error:", error);
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 });
  }
}
