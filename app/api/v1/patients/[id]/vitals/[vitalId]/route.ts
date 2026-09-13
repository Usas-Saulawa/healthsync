import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { unauthorizedResponse } from "@/lib/auth/api-error";

type RouteContext = { params: Promise<{ id: string; vitalId: string }> };

function display(vital: {
  id: string;
  recordedAt: Date;
  weightKg: number | null;
  temperatureC: number | null;
  heartRate: number | null;
  oxygenSaturation: number | null;
  systolicBp: number | null;
  diastolicBp: number | null;
  respiratoryRate: number | null;
  glucoseMgDl: number | null;
  nurseNotes: { content: string }[];
}) {
  return {
    id: vital.id,
    recordedAt: vital.recordedAt,
    bloodPressure:
      vital.systolicBp !== null && vital.diastolicBp !== null
        ? `${vital.systolicBp}/${vital.diastolicBp}`
        : null,
    systolicBp: vital.systolicBp,
    diastolicBp: vital.diastolicBp,
    heartRate: vital.heartRate,
    temperatureF:
      vital.temperatureC === null
        ? null
        : Number(((vital.temperatureC * 9) / 5 + 32).toFixed(1)),
    oxygenSaturation: vital.oxygenSaturation,
    respiratoryRate: vital.respiratoryRate,
    weightLb:
      vital.weightKg === null
        ? null
        : Number((vital.weightKg * 2.2046226218).toFixed(1)),
    glucoseMgDl: vital.glucoseMgDl,
    nursesNotes: vital.nurseNotes.length
      ? vital.nurseNotes.map((note) => note.content)
      : null,
  };
}

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    const { id: patientId, vitalId } = await context.params;
    const vital = await prisma.vital.findFirst({
      where: {
        id: vitalId,
        patientId,
        patient: { hospitalId: user.hospitalId },
      },
      select: {
        id: true,
        recordedAt: true,
        weightKg: true,
        temperatureC: true,
        heartRate: true,
        oxygenSaturation: true,
        systolicBp: true,
        diastolicBp: true,
        respiratoryRate: true,
        glucoseMgDl: true,
        nurseNotes: { select: { content: true } },
      },
    });
    if (!vital)
      return NextResponse.json(
        { success: false, message: "Vital record not found" },
        { status: 404 },
      );
    return NextResponse.json({
      success: true,
      data: { vital: display(vital) },
    });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Get vital detail error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
