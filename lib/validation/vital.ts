import { z } from "zod";

const finiteNumber = (min: number, max: number) =>
  z.number().finite().min(min).max(max);

export const createVitalSchema = z
  .object({
    encounterId: z.string().uuid().optional(),
    recordedAt: z.string().datetime({ offset: true }).optional(),
    weightKg: finiteNumber(0.1, 500).optional(),
    temperatureC: finiteNumber(25, 45).optional(),
    heartRate: z.number().int().min(20).max(300).optional(),
    oxygenSaturation: finiteNumber(50, 100).optional(),
    systolicBp: z.number().int().min(40).max(300).optional(),
    diastolicBp: z.number().int().min(20).max(200).optional(),
    respiratoryRate: z.number().int().min(4).max(80).optional(),
    glucoseMgDl: finiteNumber(10, 2000).optional(),
  })
  .superRefine((value, context) => {
    if (
      value.systolicBp !== undefined &&
      value.diastolicBp !== undefined &&
      value.diastolicBp >= value.systolicBp
    ) {
      context.addIssue({
        code: "custom",
        path: ["diastolicBp"],
        message:
          "Diastolic blood pressure must be lower than systolic blood pressure",
      });
    }

    if (
      Object.keys(value).filter(
        (key) => key !== "encounterId" && key !== "recordedAt",
      ).length === 0
    ) {
      context.addIssue({
        code: "custom",
        path: [],
        message: "At least one vital measurement is required",
      });
    }
  });
