import { z } from "zod";
import { PatientStatus } from "@/generated/prisma/client";

export const createPatientSchema = z.object({
  hospitalNumber: z
    .string()
    .trim()
    .min(1, "Hospital number is required")
    .max(50, "Hospital number is too long"),

  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(100, "First name is too long"),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(100, "Last name is too long"),

  dateOfBirth: z
    .string()
    .datetime({ offset: true }),

  gender: z
    .string()
    .trim()
    .min(1, "Gender is required")
    .max(30, "Gender is too long"),

  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long")
    .optional(),

  address: z
    .string()
    .trim()
    .max(500, "Address is too long")
    .optional(),

  bloodGroup: z
    .string()
    .trim()
    .max(10, "Blood group is too long")
    .optional(),
});

export const updatePatientSchema = createPatientSchema
  .extend({
    status: z.enum(PatientStatus).optional(),
  })
  .partial();