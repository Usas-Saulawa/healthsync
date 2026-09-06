import { z } from "zod";

const optionalText = (max: number) => z.string().trim().max(max).optional();

const dateTime = z.string().datetime({ offset: true });

export const prescriptionStatusSchema = z.enum([
  "ACTIVE",
  "PAUSED",
  "DISCONTINUED",
  "COMPLETED",
]);

export const prescriptionCreateSchema = z
  .object({
    medicationName: z.string().trim().min(1).max(200),
    dosage: z.string().trim().min(1).max(200),
    route: z.string().trim().min(1).max(100),
    frequency: z.string().trim().min(1).max(100),
    duration: z.number().int().positive().max(3650),
    durationUnit: z
      .string()
      .trim()
      .toUpperCase()
      .pipe(z.enum(["DAY", "DAYS", "WEEK", "WEEKS", "MONTH", "MONTHS"])),
    quantity: z.number().int().positive().max(100000),
    refills: z.number().int().min(0).max(99).default(0),
    pharmacyNotes: optionalText(2000),
    notes: optionalText(2000),
    reason: optionalText(2000),
    encounterId: z.string().uuid().optional(),
    diagnosisId: z.string().uuid().optional(),
    startDate: dateTime.optional(),
    endDate: dateTime.nullable().optional(),
  })
  .superRefine((data, context) => {
    if (data.startDate && data.endDate && new Date(data.endDate) < new Date(data.startDate)) {
      context.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "End date cannot be before start date",
      });
    }
  });

export const prescriptionUpdateSchema = z
  .object({
    dosage: z.string().trim().min(1).max(200).optional(),
    route: z.string().trim().min(1).max(100).optional(),
    frequency: z.string().trim().min(1).max(100).optional(),
    duration: z.number().int().positive().max(3650).optional(),
    durationUnit: z
      .string()
      .trim()
      .toUpperCase()
      .pipe(z.enum(["DAY", "DAYS", "WEEK", "WEEKS", "MONTH", "MONTHS"]))
      .optional(),
    quantity: z.number().int().positive().max(100000).optional(),
    notes: optionalText(2000),
    pharmacyNotes: optionalText(2000),
    reason: optionalText(2000),
  })
  .refine((data) => Object.keys(data).length > 0, "At least one editable field is required");

export const prescriptionDiscontinueSchema = z.object({
  reason: z.string().trim().min(1).max(2000).optional(),
});