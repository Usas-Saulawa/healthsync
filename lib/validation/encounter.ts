import { z } from "zod";

const optionalText = (max: number) => z.string().trim().max(max).optional();

const dateTime = z.string().datetime({ offset: true });

export const createEncounterSchema = z.object({
  type: z.enum(["OUTPATIENT", "INPATIENT", "EMERGENCY", "FOLLOW_UP"]),
  startedAt: dateTime.optional(),
});

export const updateEncounterSchema = z.object({
  chiefComplaint: z.string().trim().min(1).max(2000).optional(),
  objective: optionalText(10000),
  subjective: optionalText(10000),
  assessmentPlan: optionalText(10000),
  clinicalNote: optionalText(10000),
  endedAt: dateTime.nullable().optional(),
});

export const lockEncounterSchema = z.object({
  confirmation: z.literal(true, {
    error: "Explicit confirmation is required to lock this encounter",
  }),
});

export const orderSchema = z.object({
  type: z.enum(["LABORATORY", "DIAGNOSTIC", "REFERRAL", "OTHER"]),
  name: z.string().trim().min(1).max(200),
  priority: z.enum(["ROUTINE", "URGENT", "STAT", "ASAP"]).default("ROUTINE"),
  indication: optionalText(2000),
  instructions: optionalText(2000),
  frequency: optionalText(100),
  scheduledAt: dateTime.nullable().optional(),
  specimenType: optionalText(100),
  fastingRequired: z.boolean().optional(),
  bodyPart: optionalText(200),
  contrastRequired: z.boolean().optional(),
  sedationRequired: z.boolean().optional(),
});

export const prescriptionSchema = z.object({
  medicationName: z.string().trim().min(1).max(200),
  dosage: z.string().trim().min(1).max(200),
  route: z.string().trim().min(1).max(100),
  frequency: z.string().trim().min(1).max(100),
  duration: z.number().int().positive().max(3650),
  durationUnit: z.string().trim().min(1).max(30),
  quantity: z.number().int().positive().max(100000),
  refills: z.number().int().min(0).max(99).default(0),
  notes: optionalText(2000),
  reason: optionalText(2000),
});

export const followUpSchema = z.object({
  type: z.string().trim().min(1).max(100),
  departmentId: z.string().uuid(),
  providerId: z.string().uuid(),
  priority: z.enum(["ROUTINE", "URGENT", "ASAP"]).default("ROUTINE"),
  preferredDate: dateTime,
  reason: z.string().trim().min(1).max(2000),
  specialInstructions: optionalText(2000),
});

export const nurseNoteSchema = z.object({
  content: z.string().trim().min(1).max(10000),
});
