import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { unauthorizedResponse } from "@/lib/auth/api-error";
import { createVitalSchema } from "@/lib/validation/vital";

const clinicianRoles = ["DOCTOR", "NURSE"] as const;
type RouteContext = { params: Promise<{ id: string }> };

type VitalRecord = {
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
};

function displayVital(vital: VitalRecord) {
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

function parseFilters(request: NextRequest) {
  const params = new URL(request.url).searchParams;
  const pageValue = Number(params.get("page") || "1");
  const limitValue = Number(params.get("limit") || "20");
  const page = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : null;
  const limit =
    Number.isInteger(limitValue) && limitValue > 0 && limitValue <= 100
      ? limitValue
      : null;
  const dateFromValue = params.get("dateFrom");
  const dateToValue = params.get("dateTo");
  const dateFrom = dateFromValue ? new Date(dateFromValue) : null;
  const dateTo = dateToValue ? new Date(dateToValue) : null;
  if (
    !page ||
    !limit ||
    (dateFromValue && Number.isNaN(dateFrom?.getTime())) ||
    (dateToValue && Number.isNaN(dateTo?.getTime())) ||
    (dateFrom && dateTo && dateFrom > dateTo)
  )
    return null;
  return {
    page,
    limit,
    dateFrom,
    dateTo,
    sortOrder:
      params.get("sortOrder") === "asc" ? ("asc" as const) : ("desc" as const),
  };
}

async function getPatient(patientId: string, hospitalId: string) {
  return prisma.patient.findFirst({
    where: { id: patientId, hospitalId },
    select: { id: true, hospitalId: true },
  });
}

const vitalSelect = {
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
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    const { id: patientId } = await context.params;
    const patient = await getPatient(patientId, user.hospitalId);
    if (!patient)
      return NextResponse.json(
        { success: false, message: "Patient not found" },
        { status: 404 },
      );
    const filters = parseFilters(request);
    if (!filters)
      return NextResponse.json(
        { success: false, message: "Invalid pagination or date filters" },
        { status: 400 },
      );
    const recordedAt = {
      ...(filters.dateFrom ? { gte: filters.dateFrom } : {}),
      ...(filters.dateTo ? { lte: filters.dateTo } : {}),
    };
    const where = {
      patientId: patient.id,
      ...(Object.keys(recordedAt).length ? { recordedAt } : {}),
    };
    const [
      records,
      total,
      bloodPressure,
      heartRate,
      temperature,
      oxygenSaturation,
      respiratoryRate,
      weight,
      glucose,
    ] = await Promise.all([
      prisma.vital.findMany({
        where,
        orderBy: { recordedAt: filters.sortOrder },
        skip: (filters.page - 1) * filters.limit,
        take: filters.limit,
        select: vitalSelect,
      }),
      prisma.vital.count({ where }),
      prisma.vital.findMany({
        where: {
          ...where,
          systolicBp: { not: null },
          diastolicBp: { not: null },
        },
        orderBy: { recordedAt: "desc" },
        take: 2,
        select: { systolicBp: true, diastolicBp: true, recordedAt: true },
      }),
      prisma.vital.findMany({
        where: { ...where, heartRate: { not: null } },
        orderBy: { recordedAt: "desc" },
        take: 2,
        select: { heartRate: true, recordedAt: true },
      }),
      prisma.vital.findMany({
        where: { ...where, temperatureC: { not: null } },
        orderBy: { recordedAt: "desc" },
        take: 2,
        select: { temperatureC: true, recordedAt: true },
      }),
      prisma.vital.findMany({
        where: { ...where, oxygenSaturation: { not: null } },
        orderBy: { recordedAt: "desc" },
        take: 2,
        select: { oxygenSaturation: true, recordedAt: true },
      }),
      prisma.vital.findMany({
        where: { ...where, respiratoryRate: { not: null } },
        orderBy: { recordedAt: "desc" },
        take: 2,
        select: { respiratoryRate: true, recordedAt: true },
      }),
      prisma.vital.findMany({
        where: { ...where, weightKg: { not: null } },
        orderBy: { recordedAt: "desc" },
        take: 2,
        select: { weightKg: true, recordedAt: true },
      }),
      prisma.vital.findMany({
        where: { ...where, glucoseMgDl: { not: null } },
        orderBy: { recordedAt: "desc" },
        take: 2,
        select: { glucoseMgDl: true, recordedAt: true },
      }),
    ]);
    const pair = <T>(items: T[]) => ({
      current: items[0] ?? null,
      previous: items[1] ?? null,
    });
    const items = records.map((record) => displayVital(record as VitalRecord));
    return NextResponse.json({
      success: true,
      data: {
        items,
        summary: {
          bloodPressure: pair(bloodPressure),
          heartRate: pair(heartRate),
          temperatureF: pair(
            temperature.map((item) => ({
              ...item,
              temperatureC:
                item.temperatureC === null
                  ? null
                  : Number(((item.temperatureC * 9) / 5 + 32).toFixed(1)),
            })),
          ),
          oxygenSaturation: pair(oxygenSaturation),
          respiratoryRate: pair(respiratoryRate),
          weightLb: pair(
            weight.map((item) => ({
              ...item,
              weightKg:
                item.weightKg === null
                  ? null
                  : Number((item.weightKg * 2.2046226218).toFixed(1)),
            })),
          ),
          glucoseMgDl: pair(glucose),
        },
        trends: items.map((item) => item),
        message: total ? undefined : "No vital records found for this patient",
        pagination: {
          page: filters.page,
          limit: filters.limit,
          total,
          totalPages: total ? Math.ceil(total / filters.limit) : 0,
        },
      },
    });
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("List patient vitals error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    if (!(clinicianRoles as readonly string[]).includes(user.role))
      return NextResponse.json(
        { success: false, message: "You are not authorized to record vitals" },
        { status: 403 },
      );
    const { id: patientId } = await context.params;
    const patient = await getPatient(patientId, user.hospitalId);
    if (!patient)
      return NextResponse.json(
        { success: false, message: "Patient not found" },
        { status: 404 },
      );
    const result = createVitalSchema.safeParse(await request.json());
    if (!result.success)
      return NextResponse.json(
        {
          success: false,
          message: "Invalid vital data",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    const { encounterId, recordedAt, ...measurements } = result.data;
    if (encounterId) {
      const encounter = await prisma.encounter.findFirst({
        where: {
          id: encounterId,
          patientId: patient.id,
          hospitalId: user.hospitalId,
        },
        select: { id: true },
      });
      if (!encounter)
        return NextResponse.json(
          { success: false, message: "Encounter not found for this patient" },
          { status: 400 },
        );
    }
    const vital = await prisma.vital.create({
      data: {
        patientId: patient.id,
        encounterId,
        recordedById: user.id,
        recordedAt: recordedAt ? new Date(recordedAt) : new Date(),
        ...measurements,
      },
      select: vitalSelect,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Vital record created successfully",
        data: { vital: displayVital(vital as VitalRecord) },
      },
      { status: 201 },
    );
  } catch (error) {
    const authResponse = unauthorizedResponse(error);
    if (authResponse) return authResponse;
    console.error("Create patient vital error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
