// lib/validations/dashboard.ts
import { z } from "zod";

// 1. Total Patients Schema
export const patientBreakdownSchema = z.object({
  inPatients: z.number().int().nonnegative(),
  discharged: z.number().int().nonnegative(),
  outPatients: z.number().int().nonnegative(),
});

export const totalPatientsMetricSchema = z.object({
  count: z.number().int().nonnegative(),
  growth: z.string(),
  breakdown: patientBreakdownSchema,
});

// 2. Today's Appointment Schema
export const appointmentItemSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  time: z.string(),
  type: z.string(),
  hospNo: z.string(),
  status: z.string(),
});

export const todaysAppointmentsMetricSchema = z.object({
  count: z.number().int().nonnegative(),
  nextAppointmentTime: z.string(),
  queue: z.array(appointmentItemSchema),
});

// 3. Critical Alerts Schema
export const alertDetailSchema = z.object({
  patient: z.string(),
  detail: z.string(),
});

export const criticalAlertsMetricSchema = z.object({
  count: z.number().int().nonnegative(),
  vitals: alertDetailSchema,
  labs: alertDetailSchema,
});

// 4. Top Treatments Schema
export const treatmentStatSchema = z.object({
  name: z.string(),
  value: z.number(),
  color: z.string(),
});

export const topTreatmentsMetricSchema = z.object({
  count: z.number().int().nonnegative(),
  stats: z.array(treatmentStatSchema),
});

// List schemas for tables/queues matching your mock data
export const patientListItemSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  hospNo: z.string(),
  ageSex: z.string(),
  wardBed: z.string(),
  diagnosis: z.string(),
  status: z.string(),
  insurance: z.string(),
});

export const followUpItemSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  time: z.string(),
  description: z.string(),
  status: z.string(),
});

// Master Dashboard Metrics Schema
export const dashboardMetricsSchema = z.object({
  totalPatients: totalPatientsMetricSchema,
  todaysAppointments: todaysAppointmentsMetricSchema,
  criticalAlerts: criticalAlertsMetricSchema,
  topTreatments: topTreatmentsMetricSchema,
});

// Inferred TypeScript Types
export type DashboardMetrics = z.infer<typeof dashboardMetricsSchema>;
export type PatientListItem = z.infer<typeof patientListItemSchema>;
export type FollowUpItem = z.infer<typeof followUpItemSchema>;
