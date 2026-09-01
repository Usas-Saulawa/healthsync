import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { updatePatientSchema } from "@/lib/validation/patient";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const user = await requireUser();
    const { id } = await context.params;

    const patient = await prisma.patient.findFirst({
      where: {
        id,
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
        phone: true,
        address: true,
        bloodGroup: true,
        status: true,
        createdAt: true,
        updatedAt: true,

        admissions: {
          where: {
            status: "ADMITTED",
          },
          orderBy: {
            admissionDate: "desc",
          },
          take: 1,
          select: {
            id: true,
            admissionDate: true,
            dischargeDate: true,
            status: true,
            reason: true,

            ward: {
              select: {
                id: true,
                name: true,
                code: true,
              },
            },

            bed: {
              select: {
                id: true,
                bedNumber: true,
              },
            },

            attendingDoctor: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                staffId: true,
                role: true,
              },
            },
          },
        },

        diagnoses: {
          orderBy: {
            diagnosedAt: "desc",
          },
          take: 10,
          select: {
            id: true,
            name: true,
            code: true,
            isPrimary: true,
            diagnosedAt: true,

            encounter: {
              select: {
                id: true,
                type: true,
                startedAt: true,
              },
            },
          },
        },

        treatments: {
          where: {
            status: "ACTIVE",
          },
          orderBy: {
            startedAt: "desc",
          },
          take: 10,
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
                startedAt: true,
              },
            },
          },
        },

        vitals: {
          orderBy: {
            recordedAt: "desc",
          },
          take: 10,
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
        },

        alerts: {
          where: {
            status: {
              in: ["ACTIVE", "ACKNOWLEDGED"],
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
          select: {
            id: true,
            type: true,
            severity: true,
            status: true,
            title: true,
            message: true,
            createdAt: true,
            resolvedAt: true,
          },
        },

        encounters: {
          orderBy: {
            startedAt: "desc",
          },
          take: 20,
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

        allergies: {
          where: {
            status: {
              in: ["ACTIVE", "INACTIVE"],
            },
          },
          orderBy: {
            recordedAt: "desc",
          },
          select: {
            id: true,
            substance: true,
            reaction: true,
            severity: true,
            status: true,
            recordedAt: true,
            notes: true,
          },
        },

        prescriptions: {
          where: {
            status: "ACTIVE",
          },
          orderBy: {
            startDate: "desc",
          },
          take: 10,
          select: {
            id: true,
            medicationName: true,
            dosage: true,
            frequency: true,
            route: true,
            startDate: true,
            endDate: true,
            status: true,
            reason: true,
          },
        },

        labResults: {
          where: {
            testType: {
              in: ["HBA1C", "GLUCOSE", "CHOLESTEROL"],
            },
          },
          orderBy: {
            performedAt: "desc",
          },
          take: 10,
          select: {
            id: true,
            testType: true,
            testName: true,
            value: true,
            valueNumeric: true,
            unit: true,
            performedAt: true,
          },
        },
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

    const currentAdmission = patient.admissions[0] ?? null;

    const currentDiagnosis =
      patient.diagnoses.find((diagnosis) => diagnosis.isPrimary) ??
      patient.diagnoses[0] ??
      null;

    const latestVitals = patient.vitals[0] ?? null;

    const activeCriticalAlerts = patient.alerts.filter(
      (alert) => alert.severity === "CRITICAL"
    );

    const patientType = currentAdmission
      ? "INPATIENT"
      : "OUTPATIENT";

    const riskLevel =
      activeCriticalAlerts.length > 0
        ? "HIGH"
        : patient.status === "ACTIVE"
          ? "NORMAL"
          : "INACTIVE";

    const timeline = [
      ...patient.encounters.map((encounter) => ({
        id: `encounter-${encounter.id}`,
        type: "ENCOUNTER",
        date: encounter.startedAt,
        title: "Clinical Encounter",
        description: encounter.clinicalNote,
        status: encounter.status,
        encounterType: encounter.type,
        doctor: encounter.doctor
          ? {
              id: encounter.doctor.id,
              name: `${encounter.doctor.firstName} ${encounter.doctor.lastName}`,
              staffId: encounter.doctor.staffId,
            }
          : null,
      })),

      ...patient.diagnoses.map((diagnosis) => ({
        id: `diagnosis-${diagnosis.id}`,
        type: "DIAGNOSIS",
        date: diagnosis.diagnosedAt,
        title: diagnosis.isPrimary
          ? "Primary Diagnosis"
          : "Diagnosis",
        description: diagnosis.name,
        code: diagnosis.code,
        isPrimary: diagnosis.isPrimary,
      })),

      ...patient.treatments.map((treatment) => ({
        id: `treatment-${treatment.id}`,
        type: "TREATMENT",
        date: treatment.startedAt,
        title: "Treatment",
        description: treatment.name,
        treatmentType: treatment.type,
        status: treatment.status,
      })),

      ...patient.vitals.map((vital) => ({
        id: `vital-${vital.id}`,
        type: "VITAL",
        date: vital.recordedAt,
        title: "Vitals Recorded",
        description: "Patient vital signs recorded",
        vitals: {
          weightKg: vital.weightKg,
          temperatureC: vital.temperatureC,
          heartRate: vital.heartRate,
          oxygenSaturation: vital.oxygenSaturation,
          systolicBp: vital.systolicBp,
          diastolicBp: vital.diastolicBp,
          glucoseMgDl: vital.glucoseMgDl,
        },
      })),

      ...patient.alerts.map((alert) => ({
        id: `alert-${alert.id}`,
        type: "ALERT",
        date: alert.createdAt,
        title: alert.title,
        description: alert.message,
        severity: alert.severity,
        status: alert.status,
      })),
    ].sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

    return NextResponse.json({
      success: true,
      data: {
        patient: {
          id: patient.id,
          hospitalId: patient.hospitalId,
          hospitalNumber: patient.hospitalNumber,
          firstName: patient.firstName,
          lastName: patient.lastName,
          fullName: `${patient.firstName} ${patient.lastName}`,
          dateOfBirth: patient.dateOfBirth,
          gender: patient.gender,
          phone: patient.phone,
          address: patient.address,
          bloodGroup: patient.bloodGroup,
          status: patient.status,
          type: patientType,
          riskLevel,
          createdAt: patient.createdAt,
          updatedAt: patient.updatedAt,
        },

        currentAdmission,

        currentDiagnosis,

        currentTreatments: patient.treatments,

        latestVitals,

        alerts: patient.alerts,

        primaryDoctor: currentAdmission?.attendingDoctor
          ? {
              id: currentAdmission.attendingDoctor.id,
              staffId: currentAdmission.attendingDoctor.staffId,
              name: `${currentAdmission.attendingDoctor.firstName} ${currentAdmission.attendingDoctor.lastName}`,
              role: currentAdmission.attendingDoctor.role,
            }
          : null,

        allergies: {
          items: patient.allergies.map((allergy) => ({
            id: allergy.id,
            substance: allergy.substance,
            reaction: allergy.reaction,
            severity: allergy.severity,
            status: allergy.status,
            recordedAt: allergy.recordedAt,
            notes: allergy.notes,
          })),
          message:
            patient.allergies.length === 0
              ? "No known allergies"
              : undefined,
        },

        activeMedications: {
          items: patient.prescriptions.map((prescription) => ({
            id: prescription.id,
            medicationName: prescription.medicationName,
            dosage: prescription.dosage,
            frequency: prescription.frequency,
            route: prescription.route,
            startDate: prescription.startDate,
            endDate: prescription.endDate,
            status: prescription.status,
            reason: prescription.reason,
          })),
          message:
            patient.prescriptions.length === 0
              ? "No active medications"
              : undefined,
        },

        latestLabResults: patient.labResults.slice(0, 5),

        timeline,
      },
    });
  } catch (error) {
    console.error("Get patient detail error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}