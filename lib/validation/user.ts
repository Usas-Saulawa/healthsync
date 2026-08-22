import { z } from "zod";

export const createUserSchema = z.object({
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

  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email is too long"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password is too long"),

  role: z.enum([
    "ADMIN",
    "DOCTOR",
    "NURSE",
    "LAB_TECHNICIAN",
    "PHARMACIST",
  ]),

  departmentId: z.string().uuid("Invalid department ID").optional(),

  isActive: z.boolean().optional(),
});

export const updateUserSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(100, "First name is too long")
    .optional(),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(100, "Last name is too long")
    .optional(),

  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email is too long")
    .optional(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password is too long")
    .optional(),

  role: z
    .enum([
      "ADMIN",
      "DOCTOR",
      "NURSE",
      "LAB_TECHNICIAN",
      "PHARMACIST",
    ])
    .optional(),

  departmentId: z.string().uuid("Invalid department ID").nullable().optional(),

  isActive: z.boolean().optional(),
});
