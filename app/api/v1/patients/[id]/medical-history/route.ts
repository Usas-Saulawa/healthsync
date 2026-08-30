import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type HistoryItem = {
  id: string;
  date: Date;
  type: "DIAGNOSIS" | "TREATMENT";
  condition: string;
  provider: {
    id: string;
    name: string;
  } | null;
  facility: string;
  notes: string | null;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const user = await requireUser();
    const { id } = await context.params;

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() || "";

    const pageParam = Number(searchParams.get("page") || "1");
    const limitParam = Number(searchParams.get("limit") || "20");

    const page =
      Number.isInteger(pageParam) && pageParam > 0
        ? pageParam
        : 1;

    const limit =
      Number.isInteger(limitParam) &&
      limitParam > 0 &&
      limitParam <= 100
        ? limitParam
        : 20;

    const dateFromParam = searchParams.get("dateFrom");
    const dateToParam = searchParams.get("dateTo");

    const sortOrderParam = searchParams.get("sortOrder");

    const sortOrder =
      sortOrderParam === "asc" ? "asc" : "desc";

    // Verify that the patient belongs to the logged-in user's hospital.
    const patient = await prisma.patient.findFirst({
      where: {
        id,
        hospitalId: user.hospitalId,
      },
      select: {
        id: true,
        hospitalId: true,
      },
    });

    if (!patient) {
      return NextResponse.json(
        {
          success: false,
          message: "Patient not found",
        },
        { status: 404 }
      );
    }

    const dateFrom = dateFromParam
      ? new Date(dateFromParam)
      : null;

    const dateTo = dateToParam
      ? new Date(dateToParam)
      : null;

    if (
      (dateFromParam &&
        Number.isNaN(dateFrom!.getTime())) ||
      (dateToParam &&
        Number.isNaN(dateTo!.getTime()))
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid date filter",
        },
        { status: 400 }
      );
    }

    const diagnosisWhere = {
      patientId: patient.id,

      ...(dateFrom || dateTo
        ? {
            diagnosedAt: {
              ...(dateFrom ? { gte: dateFrom } : {}),
              ...(dateTo ? { lte: dateTo } : {}),
            },
          }
        : {}),

      ...(search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                code: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {}),
    };

    const treatmentWhere = {
      patientId: patient.id,

      ...(dateFrom || dateTo
        ? {
            startedAt: {
              ...(dateFrom ? { gte: dateFrom } : {}),
              ...(dateTo ? { lte: dateTo } : {}),
            },
          }
        : {}),

      ...(search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                type: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {}),
    };

    const [diagnoses, treatments, hospital] =
      await Promise.all([
        prisma.diagnosis.findMany({
          where: diagnosisWhere,

          orderBy: {
            diagnosedAt: sortOrder,
          },

          select: {
            id: true,
            name: true,
            code: true,
            diagnosedAt: true,

            encounter: {
              select: {
                clinicalNote: true,

                doctor: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        }),

        prisma.treatment.findMany({
          where: treatmentWhere,

          orderBy: {
            startedAt: sortOrder,
          },

          select: {
            id: true,
            name: true,
            type: true,
            startedAt: true,

            encounter: {
              select: {
                clinicalNote: true,

                doctor: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        }),

        prisma.hospital.findUnique({
          where: {
            id: patient.hospitalId,
          },
          select: {
            id: true,
            name: true,
          },
        }),
      ]);

    const history: HistoryItem[] = [
      ...diagnoses.map((diagnosis) => ({
        id: diagnosis.id,
        date: diagnosis.diagnosedAt,
        type: "DIAGNOSIS" as const,

        condition: diagnosis.name,

        provider: diagnosis.encounter?.doctor
          ? {
              id: diagnosis.encounter.doctor.id,
              name: `Dr. ${diagnosis.encounter.doctor.firstName} ${diagnosis.encounter.doctor.lastName}`,
            }
          : null,

        facility: hospital?.name || "Unknown",

        notes:
          diagnosis.encounter?.clinicalNote || null,
      })),

      ...treatments.map((treatment) => ({
        id: treatment.id,
        date: treatment.startedAt,
        type: "TREATMENT" as const,

        condition: treatment.name,

        provider: treatment.encounter?.doctor
          ? {
              id: treatment.encounter.doctor.id,
              name: `Dr. ${treatment.encounter.doctor.firstName} ${treatment.encounter.doctor.lastName}`,
            }
          : null,

        facility: hospital?.name || "Unknown",

        notes:
          treatment.encounter?.clinicalNote || null,
      })),
    ];

    // The history contains records from two clinical sources,
    // so the final chronological ordering happens after merging.
    history.sort((a, b) => {
      const difference =
        a.date.getTime() - b.date.getTime();

      return sortOrder === "asc"
        ? difference
        : -difference;
    });

    const total = history.length;

    const totalPages =
      total === 0
        ? 0
        : Math.ceil(total / limit);

    const skip = (page - 1) * limit;

    const paginatedHistory = history.slice(
      skip,
      skip + limit
    );

    return NextResponse.json({
      success: true,

      data: {
        history: paginatedHistory,

        pagination: {
          page,
          limit,
          total,
          totalPages,
        },

        filters: {
          search: search || null,
          dateFrom: dateFromParam || null,
          dateTo: dateToParam || null,
          sortOrder,
        },
      },
    });
  } catch (error) {
    console.error(
      "Get medical history error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}