import { z } from "zod";
 
const userRoles = [
  "ADMIN",
  "DOCTOR",
  "NURSE",
  "LAB_TECHNICIAN",
  "PHARMACIST",
] as const;

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

  role: z.enum(userRoles),

  departmentId: z
    .string()
    .uuid("Invalid department ID")
    .optional(),

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

  role: z
    .enum(userRoles)
    .optional(),

  departmentId: z
    .string()
    .uuid("Invalid department ID")
    .nullable()
    .optional(),

  isActive: z.boolean().optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, "Current password is required")
    .max(128, "Current password is too long"),

  newPassword: z
    .string()
    .min(8, "New password must be at least 8 characters")
    .max(128, "New password is too long")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*@)[A-Za-z\d@]+$/,
      "Password must contain uppercase, lowercase, number, and @ only",
    )
    .refine(
      (password) => !password.includes(" "),
      "Password cannot contain spaces",
    ),

  confirmPassword: z
    .string()
    .min(1, "Password confirmation is required"),
}).refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  },
);
