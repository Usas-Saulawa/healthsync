import { z } from "zod";

const dateTime = z.string().datetime({ offset: true });

const baseResultFiltersSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  dateFrom: dateTime.optional(),
  dateTo: dateTime.optional(),
  search: z.string().trim().max(200).optional(),
}).refine((value) => !value.dateFrom || !value.dateTo || value.dateFrom <= value.dateTo, {
  message: "dateFrom must be before dateTo",
  path: ["dateFrom"],
});

export const labResultFiltersSchema = baseResultFiltersSchema.extend({
  type: z.enum(["HBA1C", "GLUCOSE", "BLOOD_PRESSURE", "CHOLESTEROL", "CBC", "METABOLIC_PANEL", "LIVER_FUNCTION", "KIDNEY_FUNCTION", "URINALYSIS", "OTHER"]).optional(),
  status: z.string().trim().max(50).optional(),
});

export const imagingStudyFiltersSchema = baseResultFiltersSchema.extend({
  type: z.string().trim().max(50).optional(),
  status: z.enum(["ORDERED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).optional(),
});

export const clinicalNoteSchema = z.object({
  notes: z.string().trim().min(1).max(10000),
});

export const uuidSchema = z.string().uuid();