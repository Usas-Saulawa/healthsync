import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";

type RouteContext = {
  params: Promise<{
    id: string;
    historyId: string;
  }>;
};

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const user = await requireUser();

    const { id: patientId, historyId } =
      await context.params;

    /*
     * First verify the patient belongs to the
     * authenticated user's hospital.
     */
    const patient = await prisma.patient.findFirst({
      where: {
        id: patientId,
        hospitalId: user.hospitalId,
      },

      select: {
        id: true,
        hospitalId: true,
        hospitalNumber: true,
        firstName: true,
        lastName: true,
        dateOfBirth: true,
        gender: true,
        bloodGroup: true,
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

    /*
     * Medical History currently consists of
     * Diagnosis and Treatment records.
     *
     * We first look for a diagnosis.
     */
    const diagnosis = await prisma.diagnosis.findFirst({
      where: {
        id: historyId,
        patientId: patient.id,
      },

      select: {
        id: true,
        name: true,
        code: true,

        status: true,
        severity: true,
        onsetType: true,
        bodySystem: true,

        isPrimary: true,

        diagnosedAt: true,
        resolvedAt: true,

        encounter: {
          select: {
            id: true,
            type: true,
            status: true,
            startedAt: true,
            endedAt: true,
            clinicalNote: true,

            doctor: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                staffId: true,
              },
            },
          },
        },
      },
    });

    if (diagnosis) {
      const [
        hospital,
        relatedTreatments,
        encounterHistory,
        latestVitals,
      ] = await Promise.all([
        prisma.hospital.findUnique({
          where: {
            id: patient.hospitalId,
          },

          select: {
            id: true,
            name: true,
            code: true,
            address: true,
          },
        }),

        prisma.treatment.findMany({
          where: {
            patientId: patient.id,

            ...(diagnosis.encounter?.id
              ? {
                  encounterId:
                    diagnosis.encounter.id,
                }
              : {}),
          },

          orderBy: {
            startedAt: "desc",
          },

          select: {
            id: true,
            name: true,
            type: true,
            status: true,
            startedAt: true,
            endedAt: true,

            encounter: {
              select: {
                id: true,
                type: true,
                status: true,
                startedAt: true,
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

        prisma.encounter.findMany({
          where: {
            patientId: patient.id,
          },

          orderBy: {
            startedAt: "desc",
          },

          select: {
            id: true,
            type: true,
            status: true,
            startedAt: true,
            endedAt: true,
            clinicalNote: true,

            doctor: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },

            treatments: {
              select: {
                id: true,
                name: true,
                type: true,
                status: true,
                startedAt: true,
                endedAt: true,
              },
            },
          },

          take: 20,
        }),

        prisma.vital.findFirst({
          where: {
            patientId: patient.id,
          },

          orderBy: {
            recordedAt: "desc",
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
            glucoseMgDl: true,
          },
        }),
      ]);

      return NextResponse.json({
        success: true,

        data: {
          patient,

          history: {
            id: diagnosis.id,
            type: "DIAGNOSIS",

            condition: diagnosis.name,
            code: diagnosis.code,

            status: diagnosis.status,
            severity: diagnosis.severity,
            onsetType: diagnosis.onsetType,
            bodySystem: diagnosis.bodySystem,

            isPrimary: diagnosis.isPrimary,

            diagnosedAt: diagnosis.diagnosedAt,
            resolvedAt: diagnosis.resolvedAt,

            provider: diagnosis.encounter?.doctor
              ? {
                  id: diagnosis.encounter.doctor.id,
                  staffId:
                    diagnosis.encounter.doctor.staffId,
                  name: `Dr. ${diagnosis.encounter.doctor.firstName} ${diagnosis.encounter.doctor.lastName}`,
                }
              : null,

            facility: hospital
              ? {
                  id: hospital.id,
                  name: hospital.name,
                  code: hospital.code,
                  address: hospital.address,
                }
              : null,

            clinicalNotes:
              diagnosis.encounter?.clinicalNote ||
              null,
          },

          encounter: diagnosis.encounter
            ? {
                id: diagnosis.encounter.id,
                type: diagnosis.encounter.type,
                status: diagnosis.encounter.status,
                startedAt:
                  diagnosis.encounter.startedAt,
                endedAt:
                  diagnosis.encounter.endedAt,

                doctor:
                  diagnosis.encounter.doctor
                    ? {
                        id: diagnosis.encounter.doctor.id,
                        name: `Dr. ${diagnosis.encounter.doctor.firstName} ${diagnosis.encounter.doctor.lastName}`,
                      }
                    : null,
              }
            : null,

          treatmentHistory: relatedTreatments,

          encounterHistory,

          latestVitals,

          /*
           * These sections are intentionally not returned yet.
           * Their database models belong to their respective modules.
           */
          relatedOrders: [],
          medications: [],
          keyDocuments: [],
        },
      });
    }

    /*
     * If the history ID is not a diagnosis,
     * check whether it is a treatment.
     */
    const treatment = await prisma.treatment.findFirst({
      where: {
        id: historyId,
        patientId: patient.id,
      },

      select: {
        id: true,
        name: true,
        type: true,
        status: true,
        startedAt: true,
        endedAt: true,

        encounter: {
          select: {
            id: true,
            type: true,
            status: true,
            startedAt: true,
            endedAt: true,
            clinicalNote: true,

            doctor: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                staffId: true,
              },
            },
          },
        },
      },
    });

    if (!treatment) {
      return NextResponse.json(
        {
          success: false,
          message: "Medical history record not found",
        },
        { status: 404 }
      );
    }

    const hospital = await prisma.hospital.findUnique({
      where: {
        id: patient.hospitalId,
      },

      select: {
        id: true,
        name: true,
        code: true,
        address: true,
      },
    });

    return NextResponse.json({
      success: true,

      data: {
        patient,

        history: {
          id: treatment.id,
          type: "TREATMENT",

          condition: treatment.name,
          procedureType: treatment.type,

          status: treatment.status,

          startedAt: treatment.startedAt,
          endedAt: treatment.endedAt,

          provider: treatment.encounter?.doctor
            ? {
                id: treatment.encounter.doctor.id,
                staffId:
                  treatment.encounter.doctor.staffId,
                name: `Dr. ${treatment.encounter.doctor.firstName} ${treatment.encounter.doctor.lastName}`,
              }
            : null,

          facility: hospital
            ? {
                id: hospital.id,
                name: hospital.name,
                code: hospital.code,
                address: hospital.address,
              }
            : null,

          clinicalNotes:
            treatment.encounter?.clinicalNote ||
            null,
        },

        encounter: treatment.encounter
          ? {
              id: treatment.encounter.id,
              type: treatment.encounter.type,
              status: treatment.encounter.status,
              startedAt: treatment.encounter.startedAt,
              endedAt: treatment.encounter.endedAt,

              doctor:
                treatment.encounter.doctor
                  ? {
                      id: treatment.encounter.doctor.id,
                      name: `Dr. ${treatment.encounter.doctor.firstName} ${treatment.encounter.doctor.lastName}`,
                    }
                  : null,
            }
          : null,

        treatmentHistory: [treatment],

        relatedOrders: [],
        medications: [],
        keyDocuments: [],
      },
    });
  } catch (error) {
    console.error(
      "Get medical history detail error:",
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