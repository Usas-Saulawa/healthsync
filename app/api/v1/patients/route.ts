import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/require-user";
import { createPatientSchema } from "@/lib/validation/patient";

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser();

    if (!["ADMIN", "DOCTOR", "NURSE"].includes(user.role)) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to create patients",
        },
        { status: 403 }
      );
    }

    const body = await request.json();

    const result = createPatientSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid patient data",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    const existingPatient = await prisma.patient.findFirst({
      where: {
        hospitalId: user.hospitalId,
        hospitalNumber: data.hospitalNumber,
      },
      select: {
        id: true,
      },
    });

    if (existingPatient) {
      return NextResponse.json(
        {
          success: false,
          message: "A patient with this hospital number already exists",
        },
        { status: 409 }
      );
    }

    const patient = await prisma.patient.create({
      data: {
        hospitalId: user.hospitalId,
        hospitalNumber: data.hospitalNumber,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: new Date(data.dateOfBirth),
        gender: data.gender,
        phone: data.phone,
        address: data.address,
        bloodGroup: data.bloodGroup,
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
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Patient created successfully",
        data: {
          patient,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create patient error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await requireUser();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() || "";

    const type = searchParams.get("type")?.trim().toUpperCase() || "";

    const status = searchParams.get("status")?.trim().toUpperCase() || "";

    const wardId = searchParams.get("wardId")?.trim() || "";

    const attendingDoctorId =
      searchParams.get("attendingDoctorId")?.trim() || "";

    const dateFrom = searchParams.get("dateFrom")?.trim() || "";

    const dateTo = searchParams.get("dateTo")?.trim() || "";

    const sortBy = searchParams.get("sortBy")?.trim() || "createdAt";

    const sortOrderParam =
      searchParams.get("sortOrder")?.trim().toLowerCase() || "desc";

    const pageParam = Number(searchParams.get("page") || "1");

    const limitParam = Number(searchParams.get("limit") || "20");

    const page =
      Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

    const limit =
      Number.isInteger(limitParam) &&
      limitParam > 0 &&
      limitParam <= 100
        ? limitParam
        : 20;

    const skip = (page - 1) * limit;

    /*
     * Validate patient type.
     */
    const validTypes = ["INPATIENT", "OUTPATIENT"];

    if (type && !validTypes.includes(type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid patient type",
        },
        { status: 400 },
      );
    }

    /*
     * Validate patient status.
     */
    const validStatuses = ["ACTIVE", "INACTIVE"];

    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid patient status",
        },
        { status: 400 },
      );
    }

    /*
     * Parse date range.
     *
     * The meaning depends on patient type:
     *
     * INPATIENT  -> admissionDate
     * OUTPATIENT -> patient.createdAt
     */
    let parsedDateFrom: Date | undefined;
    let parsedDateTo: Date | undefined;

    if (dateFrom) {
      parsedDateFrom = new Date(dateFrom);

      if (Number.isNaN(parsedDateFrom.getTime())) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid dateFrom",
          },
          { status: 400 },
        );
      }
    }

    if (dateTo) {
      parsedDateTo = new Date(dateTo);

      if (Number.isNaN(parsedDateTo.getTime())) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid dateTo",
          },
          { status: 400 },
        );
      }

      /*
       * If the frontend sends only YYYY-MM-DD,
       * include the entire day.
       */
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateTo)) {
        parsedDateTo.setHours(23, 59, 59, 999);
      }
    }

    if (
      parsedDateFrom &&
      parsedDateTo &&
      parsedDateFrom > parsedDateTo
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "dateFrom cannot be later than dateTo",
        },
        { status: 400 },
      );
    }

    /*
     * Only allow known fields for sorting.
     */
    const allowedSortFields = [
      "createdAt",
      "firstName",
      "lastName",
      "hospitalNumber",
      "dateOfBirth",
      "gender",
      "status",
    ] as const;

    type SortField = (typeof allowedSortFields)[number];

    const sortField: SortField = allowedSortFields.includes(
      sortBy as SortField,
    )
      ? (sortBy as SortField)
      : "createdAt";

    const sortOrder =
      sortOrderParam === "asc" || sortOrderParam === "desc"
        ? sortOrderParam
        : "desc";

    /*
     * Build the patient filters.
     */
    const conditions: Record<string, unknown>[] = [];

    /*
     * Search by hospital number, first name or last name.
     */
    if (search) {
      conditions.push({
        OR: [
          {
            hospitalNumber: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            firstName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      });
    }

    /*
     * Patient status.
     */
    if (status) {
      conditions.push({
        status,
      });
    }

    /*
     * Build the admission filters.
     *
     * These are used for:
     * - inpatient filtering
     * - ward filtering
     * - attending doctor filtering
     * - inpatient date filtering
     */
    const admissionConditions: Record<string, unknown> = {};

    /*
     * Only current admissions count as inpatient.
     */
    if (type === "INPATIENT") {
      admissionConditions.status = "ADMITTED";
    }

    /*
     * Ward filter.
     */
    if (wardId) {
      admissionConditions.wardId = wardId;
    }

    /*
     * Attending doctor filter.
     */
    if (attendingDoctorId) {
      admissionConditions.attendingDoctorId = attendingDoctorId;
    }

    /*
     * INPATIENT date filtering:
     * date range applies to admissionDate.
     */
    if (
      type === "INPATIENT" &&
      (parsedDateFrom || parsedDateTo)
    ) {
      admissionConditions.admissionDate = {
        ...(parsedDateFrom
          ? {
              gte: parsedDateFrom,
            }
          : {}),

        ...(parsedDateTo
          ? {
              lte: parsedDateTo,
            }
          : {}),
      };
    }

    /*
     * OUTPATIENT:
     *
     * A patient is considered outpatient when there
     * is no current ADMITTED admission.
     */
    if (type === "OUTPATIENT") {
      conditions.push({
        admissions: {
          none: {
            status: "ADMITTED",
          },
        },
      });

      /*
       * Outpatient date filtering uses patient.createdAt.
       */
      if (parsedDateFrom || parsedDateTo) {
        conditions.push({
          createdAt: {
            ...(parsedDateFrom
              ? {
                  gte: parsedDateFrom,
                }
              : {}),

            ...(parsedDateTo
              ? {
                  lte: parsedDateTo,
                }
              : {}),
          },
        });
      }
    }

    /*
     * If the user selected inpatient, or supplied
     * ward/doctor filters, the patient must have a
     * matching current admission.
     */
    if (
      type === "INPATIENT" ||
      wardId ||
      attendingDoctorId
    ) {
      conditions.push({
        admissions: {
          some: {
            ...admissionConditions,
            status: "ADMITTED",
          },
        },
      });
    }

    /*
     * If no patient type is selected but a date range
     * is supplied, support both workflows:
     *
     * - patients created during the range
     * - patients with an admission during the range
     *
     * This keeps the "All Patients" view useful.
     */
    if (
      !type &&
      (parsedDateFrom || parsedDateTo)
    ) {
      conditions.push({
        OR: [
          {
            createdAt: {
              ...(parsedDateFrom
                ? {
                    gte: parsedDateFrom,
                  }
                : {}),

              ...(parsedDateTo
                ? {
                    lte: parsedDateTo,
                  }
                : {}),
            },
          },

          {
            admissions: {
              some: {
                admissionDate: {
                  ...(parsedDateFrom
                    ? {
                        gte: parsedDateFrom,
                      }
                    : {}),

                  ...(parsedDateTo
                    ? {
                        lte: parsedDateTo,
                      }
                    : {}),
                },
              },
            },
          },
        ],
      });
    }

    /*
     * Hospital isolation is always applied.
     */
    const where = {
      hospitalId: user.hospitalId,
      AND: conditions,
    };

    /*
     * Fetch all matching patients with their doctor relationships
     * to enable client-side prioritization.
     * 
     * Doctor prioritization:
     * 1. Patients where the logged-in doctor is the attending doctor
     * 2. Patients where the logged-in doctor has recent encounters
     * 3. Other hospital patients
     */
    const allPatients = await prisma.patient.findMany({
      where,

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

        /*
         * Return the current admission when available.
         */
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
            status: true,
            attendingDoctorId: true,

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
                staffId: true,
                firstName: true,
                lastName: true,
                role: true,
              },
            },
          },
        },

        /*
         * Get recent encounters to determine if the logged-in doctor
         * is associated with this patient.
         */
        encounters: {
          orderBy: {
            startedAt: "desc",
          },

          take: 3,

          select: {
            id: true,
            doctorId: true,
            startedAt: true,
          },
        },

        /*
         * Get primary diagnosis for display
         */
        diagnoses: {
          where: {
            isPrimary: true,
          },

          take: 1,

          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });

    /*
     * Determine doctor priority: is this patient associated with the logged-in doctor?
     * A patient is associated if:
     * 1. They have a current admission with this doctor as attending
     * 2. They have recent encounters with this doctor (within last 30 days)
     */
    const withPriority = allPatients.map((patient) => {
      const currentAdmission = patient.admissions[0] ?? null;
      const isAssignedToLoggedInDoctor =
        currentAdmission?.attendingDoctorId === user.id ||
        patient.encounters.some((enc) => enc.doctorId === user.id);

      return {
        ...patient,
        isAssignedToLoggedInDoctor,
        currentAdmission,
      };
    });

    /*
     * Sort by priority (assigned to doctor first, then others)
     * Then apply user's requested sorting within each group.
     */
    const sortedPatients = withPriority.sort((a, b) => {
      /*
       * Priority 1: Patients assigned to logged-in doctor
       */
      if (a.isAssignedToLoggedInDoctor && !b.isAssignedToLoggedInDoctor) {
        return -1;
      }
      if (!a.isAssignedToLoggedInDoctor && b.isAssignedToLoggedInDoctor) {
        return 1;
      }

      /*
       * Within each group, apply requested sorting
       */
      if (sortField === "createdAt") {
        const timeA = a.createdAt.getTime();
        const timeB = b.createdAt.getTime();
        return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
      }

      if (sortField === "dateOfBirth") {
        const timeA = new Date(a.dateOfBirth).getTime();
        const timeB = new Date(b.dateOfBirth).getTime();
        return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
      }

      if (sortField === "firstName") {
        const cmp = a.firstName.localeCompare(b.firstName);
        return sortOrder === "asc" ? cmp : -cmp;
      }

      if (sortField === "lastName") {
        const cmp = a.lastName.localeCompare(b.lastName);
        return sortOrder === "asc" ? cmp : -cmp;
      }

      if (sortField === "hospitalNumber") {
        const cmp = a.hospitalNumber.localeCompare(b.hospitalNumber);
        return sortOrder === "asc" ? cmp : -cmp;
      }

      if (sortField === "status") {
        const cmp = a.status.localeCompare(b.status);
        return sortOrder === "asc" ? cmp : -cmp;
      }

      if (sortField === "gender") {
        const cmp = (a.gender ?? "").localeCompare(b.gender ?? "");
        return sortOrder === "asc" ? cmp : -cmp;
      }

      return 0;
    });

    /*
     * Apply pagination after sorting
     */
    const total = sortedPatients.length;
    const paginatedPatients = sortedPatients.slice(skip, skip + limit);

    /*
     * Format the response
     */
    const formattedPatients = paginatedPatients.map((patient) => {
      const currentAdmission = patient.currentAdmission;
      const primaryDiagnosis = patient.diagnoses[0] ?? null;

      return {
        id: patient.id,
        hospitalId: patient.hospitalId,
        hospitalNumber: patient.hospitalNumber,

        firstName: patient.firstName,
        lastName: patient.lastName,

        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,

        phone: patient.phone,
        address: patient.address,
        bloodGroup: patient.bloodGroup,

        status: patient.status,

        type: currentAdmission
          ? "INPATIENT"
          : "OUTPATIENT",

        primaryDiagnosis: primaryDiagnosis
          ? {
              id: primaryDiagnosis.id,
              name: primaryDiagnosis.name,
              code: primaryDiagnosis.code,
            }
          : null,

        ward: currentAdmission?.ward ?? null,

        bed: currentAdmission?.bed ?? null,

        attendingDoctor:
          currentAdmission?.attendingDoctor ?? null,

        admissionDate:
          currentAdmission?.admissionDate ?? null,

        createdAt: patient.createdAt,
        updatedAt: patient.updatedAt,
      };
    });

    return NextResponse.json({
      success: true,

      data: {
        patients: formattedPatients,

        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },

        filters: {
          search: search || null,
          type: type || null,
          status: status || null,
          wardId: wardId || null,
          attendingDoctorId:
            attendingDoctorId || null,
          dateFrom: dateFrom || null,
          dateTo: dateTo || null,
          sortBy: sortField,
          sortOrder,
        },
      },
    });
  } catch (error) {
    console.error("List patients error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 },
    );
  }
}
