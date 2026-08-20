import { z } from "zod";

export const createDepartmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Department name is required")
    .max(100, "Department name is too long"),

  code: z
    .string()
    .trim()
    .min(1, "Department code is required")
    .max(30, "Department code is too long")
    .toUpperCase(),
});

export const updateDepartmentSchema = createDepartmentSchema.partial();
