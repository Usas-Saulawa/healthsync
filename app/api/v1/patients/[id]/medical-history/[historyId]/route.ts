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
        hba1cTrends,
        conditionMedications,
        keyDocuments,
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

        /*
         * HbA1c trend data for diabetes-related diagnoses
         */
        prisma.labResult.findMany({
          where: {
            patientId: patient.id,
            testType: "HBA1C",
          },

          orderBy: {
            performedAt: "asc",
          },

          take: 12,

          select: {
            id: true,
            testName: true,
            value: true,
            valueNumeric: true,
            unit: true,
            performedAt: true,
          },
        }),

        /*
         * Active medications related to this diagnosis
         */
        prisma.prescription.findMany({
          where: {
            patientId: patient.id,
            status: "ACTIVE",
            diagnosisId: diagnosis.id,
          },

          orderBy: {
            startDate: "desc",
          },

          select: {
            id: true,
            medicationName: true,
            dosage: true,
            frequency: true,
            route: true,
            startDate: true,
            endDate: true,
            reason: true,
          },
        }),

        /*
         * Key documents related to this patient
         */
        prisma.document.findMany({
          where: {
            patientId: patient.id,
          },

          orderBy: {
            uploadedAt: "desc",
          },

          take: 5,

          select: {
            id: true,
            fileName: true,
            documentType: true,
            description: true,
            uploadedAt: true,
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

          hba1cTrend: {
            items: hba1cTrends.map((result) => ({
              id: result.id,
              testName: result.testName,
              value: result.value,
              valueNumeric: result.valueNumeric,
              unit: result.unit,
              performedAt: result.performedAt,
            })),
            message:
              hba1cTrends.length === 0
                ? "No HbA1c results available"
                : undefined,
          },

          conditionMedications: {
            items: conditionMedications.map((med) => ({
              id: med.id,
              medicationName: med.medicationName,
              dosage: med.dosage,
              frequency: med.frequency,
              route: med.route,
              startDate: med.startDate,
              endDate: med.endDate,
              reason: med.reason,
            })),
            message:
              conditionMedications.length === 0
                ? "No active medications for this condition"
                : undefined,
          },

          relatedOrders: [],

          keyDocuments: {
            items: keyDocuments.map((doc) => ({
              id: doc.id,
              fileName: doc.fileName,
              documentType: doc.documentType,
              description: doc.description,
              uploadedAt: doc.uploadedAt,
            })),
            message:
              keyDocuments.length === 0
                ? "No documents available"
                : undefined,
          },
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

        hba1cTrend: {
          items: [],
          message: "No HbA1c results available",
        },

        conditionMedications: {
          items: [],
          message: "No active medications for this condition",
        },

        relatedOrders: [],

        keyDocuments: {
          items: [],
          message: "No documents available",
        },
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