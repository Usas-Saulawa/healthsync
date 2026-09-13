import { z } from "zod";

const dateTime = z.string().datetime({ offset: true });

const baseResultFiltersSchema = z
  .object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    dateFrom: dateTime.optional(),
    dateTo: dateTime.optional(),
    search: z.string().trim().max(200).optional(),
  })
  .refine(
    (value) =>
      !value.dateFrom || !value.dateTo || value.dateFrom <= value.dateTo,
    {
      message: "dateFrom must be before dateTo",
      path: ["dateFrom"],
    },
  );

const patientHistoryFiltersSchema = z
  .object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    dateFrom: dateTime.optional(),
    dateTo: dateTime.optional(),
  })
  .refine(
    (value) =>
      !value.dateFrom || !value.dateTo || value.dateFrom <= value.dateTo,
    {
      message: "dateFrom must be before dateTo",
      path: ["dateFrom"],
    },
  );

export const labResultFiltersSchema = baseResultFiltersSchema.extend({
  type: z
    .enum([
      "HBA1C",
      "GLUCOSE",
      "BLOOD_PRESSURE",
      "CHOLESTEROL",
      "CBC",
      "METABOLIC_PANEL",
      "LIVER_FUNCTION",
      "KIDNEY_FUNCTION",
      "URINALYSIS",
      "OTHER",
    ])
    .optional(),
  status: z.string().trim().max(50).optional(),
});

export const imagingStudyFiltersSchema = baseResultFiltersSchema.extend({
  type: z.string().trim().max(50).optional(),
  status: z
    .enum(["ORDERED", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
    .optional(),
});

export const patientOrderFiltersSchema = patientHistoryFiltersSchema.extend({
  search: z.string().trim().max(200).optional(),
  type: z.enum(["LABORATORY", "DIAGNOSTIC", "REFERRAL", "OTHER"]).optional(),
  status: z
    .enum(["REQUESTED", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
    .optional(),
  priority: z.enum(["ROUTINE", "URGENT", "STAT", "ASAP"]).optional(),
  sortBy: z
    .enum(["date", "orderName", "category", "priority", "status"])
    .default("date"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const patientFollowUpFiltersSchema = patientHistoryFiltersSchema.extend({
  status: z.enum(["SCHEDULED", "COMPLETED", "CANCELLED", "MISSED"]).optional(),
  departmentId: z.string().uuid().optional(),
  providerId: z.string().uuid().optional(),
  sortBy: z
    .enum(["scheduledDate", "followUpType", "status"])
    .default("scheduledDate"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const clinicalNoteSchema = z.object({
  notes: z.string().trim().min(1).max(10000),
});

export const uuidSchema = z.string().uuid();

export const admissionEventFiltersSchema = patientHistoryFiltersSchema.extend({
  type: z.enum(["ADMISSION", "TRANSFER", "REFERRAL"]).optional(),
  status: z.string().trim().max(40).optional(),
});

export const admissionRequestSchema = z.object({
  admissionType: z.string().trim().min(1).max(80),
  requestedAt: dateTime,
  admittingProviderId: uuidSchema.optional(),
  referringProviderId: uuidSchema.optional(),
  diagnosisName: z.string().trim().min(1).max(300),
  icd10Code: z.string().trim().max(20).optional(),
  reason: z.string().trim().min(1).max(4000),
  priority: z.enum(["ROUTINE", "URGENT", "EMERGENCY"]).default("ROUTINE"),
  preferredDepartmentId: uuidSchema.optional(),
  preferredBedType: z
    .enum(["STANDARD", "ICU", "SEMI_PRIVATE", "PRIVATE"])
    .default("STANDARD"),
  specialRequirements: z.string().trim().max(4000).optional(),
});

export const immunizationFiltersSchema = patientHistoryFiltersSchema.extend({
  vaccine: z.string().trim().max(200).optional(),
  status: z.enum(["ADMINISTERED", "INVALIDATED"]).optional(),
});

export const immunizationSchema = z
  .object({
    vaccineName: z.string().trim().min(1).max(200),
    vaccineType: z.string().trim().max(100).optional(),
    manufacturer: z.string().trim().max(200).optional(),
    ndc: z.string().trim().max(30).optional(),
    doseNumber: z.number().int().positive().max(20),
    dateAdministered: dateTime,
    lotNumber: z.string().trim().min(1).max(100),
    administrationSite: z.string().trim().min(1).max(100),
    route: z.string().trim().min(1).max(100),
    expirationDate: dateTime,
    visDate: dateTime.nullable().optional(),
    visGivenDate: dateTime.nullable().optional(),
    notes: z.string().trim().max(4000).optional(),
    adverseReaction: z.string().trim().max(4000).optional(),
  })
  .superRefine((value, context) => {
    const administered = new Date(value.dateAdministered);
    const expiration = new Date(value.expirationDate);
    if (expiration < administered) {
      context.addIssue({
        code: "custom",
        path: ["expirationDate"],
        message: "Expiration date cannot precede administration date",
      });
    }
    if (value.visGivenDate && new Date(value.visGivenDate) > administered) {
      context.addIssue({
        code: "custom",
        path: ["visGivenDate"],
        message: "VIS given date cannot follow administration date",
      });
    }
  });

export const transferRequestSchema = z.object({
  currentWardId: uuidSchema.optional(),
  currentBedId: uuidSchema.optional(),
  destinationDepartmentId: uuidSchema,
  requestedAt: dateTime,
  reason: z.string().trim().min(1).max(4000),
  transferSummary: z.string().trim().max(8000).optional(),
  specialRequirements: z.string().trim().max(4000).optional(),
  preferredBedType: z
    .enum(["STANDARD", "ICU", "SEMI_PRIVATE", "PRIVATE"])
    .default("STANDARD"),
});

export const referralSchema = z.object({
  referralType: z.string().trim().min(1).max(100),
  urgency: z.enum(["ROUTINE", "URGENT", "EMERGENCY"]).default("ROUTINE"),
  referralDate: dateTime,
  destinationDepartmentId: uuidSchema.optional(),
  preferredProviderId: uuidSchema.optional(),
  facility: z.string().trim().max(300).optional(),
  reason: z.string().trim().min(1).max(4000),
  relevantHistory: z.string().trim().max(8000).optional(),
  labResultIds: z.array(uuidSchema).max(20).default([]),
  imagingStudyIds: z.array(uuidSchema).max(20).default([]),
});

export const dischargeSchema = z.object({
  admissionId: uuidSchema.optional(),
  dischargedAt: dateTime,
  dischargeType: z.enum(["HOME", "TRANSFER", "FACILITY", "DECEASED", "OTHER"]),
  primaryDiagnosis: z.string().trim().min(1).max(300),
  primaryIcd10Code: z.string().trim().max(20).optional(),
  secondaryDiagnoses: z.string().trim().max(4000).optional(),
  patientInstructions: z.string().trim().min(1).max(8000),
  activityRestrictions: z.string().trim().max(4000).optional(),
  dietaryInstructions: z.string().trim().max(4000).optional(),
  followUpAppointment: dateTime.nullable().optional(),
  followUpProviderId: uuidSchema.optional(),
  followUpDepartmentId: uuidSchema.optional(),
  prescriptionIds: z.array(uuidSchema).max(50).default([]),
});
