import { CreateWebcamInputs } from "@/app/[locale]/webcams/schema";
import "server-only";

import prisma from "@/lib/prisma";

export async function saveNewWebcam(webcam: CreateWebcamInputs) {
  await prisma.webcam.create({
    data: {
      name: webcam.name,
      angleOfView: webcam.angleOfView,
      latitude: webcam.latitude,
      longitude: webcam.longitude,
      elevation: webcam.elevation ?? null,
      refreshSeconds: webcam.refreshSeconds ?? null,
      integrationStatus: {
        connect: {
          code: "EVALUATION",
        },
      },
    },
  });

  return { success: true };
}
