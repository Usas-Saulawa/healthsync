import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getCurrentUser } from "@/lib/auth/session";

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required",
        },
        { status: 401 },
      );
    }

    if (user.role !== "DOCTOR") {
      return NextResponse.json(
        {
          success: false,
          message: "Doctor dashboard access required",
        },
        { status: 403 },
      );
    }

    const hospitalId = user.hospitalId;
    const doctorId = user.id;

    const { searchParams } = new URL(request.url);

    const period = searchParams.get("period") || "monthly";

    const now = new Date();

    let periodStart: Date;
    let periodEnd: Date;

    if (period === "daily") {
      periodStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      periodEnd = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
      );
    } else if (period === "weekly") {
      periodStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - now.getDay(),
      );

      periodEnd = new Date(
        periodStart.getFullYear(),
        periodStart.getMonth(),
        periodStart.getDate() + 7,
      );
    } else {
      periodStart = new Date(now.getFullYear(), now.getMonth(), 1);

      periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    }

    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );

    const todayEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
    );

    /*
     * Patients connected to this doctor through appointments,
     * encounters, admissions, or follow-ups.
     */
    const doctorPatientRelations = await prisma.patient.findMany({
      where: {
        hospitalId,
        OR: [
          {
            appointments: {
              some: {
                doctorId,
              },
            },
          },
          {
            encounters: {
              some: {
                doctorId,
              },
            },
          },
          {
            admissions: {
              some: {
                attendingDoctorId: doctorId,
              },
            },
          },
          {
            followUps: {
              some: {
                doctorId,
              },
            },
          },
        ],
      },
      select: {
        id: true,
      },
    });

    const doctorPatientIds = doctorPatientRelations.map(
      (patient) => patient.id,
    );

    const totalPatients = doctorPatientIds.length;

    /*
     * Today's appointments for the authenticated doctor.
     */
    const todaysAppointments = await prisma.appointment.findMany({
      where: {
        hospitalId,
        doctorId,
        scheduledAt: {
          gte: todayStart,
          lt: todayEnd,
        },
      },
      orderBy: {
        scheduledAt: "asc",
      },
      take: 10,
      include: {
        patient: {
          select: {
            id: true,
            hospitalNumber: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    /*
     * Critical and abnormal alerts associated with this doctor's
     * patients. Alerts connected to an encounter are additionally
     * scoped through the encounter's doctor.
     */
    const criticalAlerts = await prisma.clinicalAlert.findMany({
      where: {
        patientId: {
          in: doctorPatientIds,
        },
        status: "ACTIVE",
        severity: {
          in: ["CRITICAL", "WARNING"],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      include: {
        patient: {
          select: {
            id: true,
            hospitalNumber: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    /*
     * Top treatment categories for the selected period.
     */
    const topTreatments = await prisma.treatment.groupBy({
      by: ["type"],
      where: {
        patientId: {
          in: doctorPatientIds,
        },
        startedAt: {
          gte: periodStart,
          lt: periodEnd,
        },
      },
      _count: {
        _all: true,
      },
      orderBy: {
        _count: {
          type: "desc",
        },
      },
      take: 5,
    });

    /*
     * Patient preview shown on the dashboard.
     */
    const patients = await prisma.patient.findMany({
      where: {
        id: {
          in: doctorPatientIds,
        },
        hospitalId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
      include: {
        admissions: {
          where: {
            status: "ADMITTED",
          },
          orderBy: {
            admissionDate: "desc",
          },
          take: 1,
          include: {
            ward: {
              select: {
                name: true,
              },
            },
            bed: {
              select: {
                bedNumber: true,
              },
            },
          },
        },
        diagnoses: {
          orderBy: {
            diagnosedAt: "desc",
          },
          take: 1,
          select: {
            name: true,
          },
        },
        insurances: {
          orderBy: {
            updatedAt: "desc",
          },
          take: 1,
          select: {
            provider: true,
            status: true,
          },
        },
      },
    });

    /*
     * Upcoming follow-ups for the authenticated doctor.
     */
    const followUps = await prisma.followUp.findMany({
      where: {
        hospitalId,
        doctorId,
        scheduledAt: {
          gte: now,
        },
        status: "SCHEDULED",
      },
      orderBy: {
        scheduledAt: "asc",
      },
      take: 10,
      include: {
        patient: {
          select: {
            id: true,
            hospitalNumber: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalPatients,
        },

        appointments: todaysAppointments.map((appointment) => ({
          id: appointment.id,
          scheduledAt: appointment.scheduledAt,
          type: appointment.type,
          status: appointment.status,
          reason: appointment.reason,
          patient: appointment.patient,
        })),

        criticalAlerts: criticalAlerts.map((alert) => ({
          id: alert.id,
          type: alert.type,
          severity: alert.severity,
          status: alert.status,
          title: alert.title,
          message: alert.message,
          createdAt: alert.createdAt,
          patient: alert.patient,
        })),

        topTreatments: topTreatments.map((treatment) => ({
          type: treatment.type ?? "OTHER",
          count: treatment._count._all,
        })),

        patients: patients.map((patient) => {
          const admission = patient.admissions[0];
          const diagnosis = patient.diagnoses[0];
          const insurance = patient.insurances[0];

          return {
            id: patient.id,
            hospitalNumber: patient.hospitalNumber,
            firstName: patient.firstName,
            lastName: patient.lastName,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender,
            status: patient.status,

            admission: admission
              ? {
                  status: admission.status,
                  ward: admission.ward?.name ?? null,
                  bed: admission.bed?.bedNumber ?? null,
                }
              : null,

            primaryDiagnosis: diagnosis?.name ?? null,

            insurance: insurance
              ? {
                  provider: insurance.provider,
                  status: insurance.status,
                }
              : null,
          };
        }),

        followUps: followUps.map((followUp) => ({
          id: followUp.id,
          scheduledAt: followUp.scheduledAt,
          reason: followUp.reason,
          status: followUp.status,
          patient: followUp.patient,
        })),
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 },
    );
  }
}
