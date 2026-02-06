import { z } from "zod";

export const createWebcamSchema = z.object({
  name: z.string().min(1, "webcamCreation.errorMessage.fieldRequired"),

  url: z.url("webcamCreation.errorMessage.urlInvalid"),

  angleOfView: z.coerce
    .number()
    .positive("webcamCreation.errorMessage.angleOfViewPositive"),

  latitude: z.coerce.number().min(-180).max(180),

  longitude: z.coerce.number().min(-180).max(180),

  elevation: z.coerce.number().optional().nullable(),

  refreshSeconds: z.coerce.number().optional().nullable(),
});

export type CreateWebcamInputs = z.infer<typeof createWebcamSchema>;
