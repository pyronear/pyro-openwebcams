import { CreateWebcamInputs } from "@/app/[locale]/webcams/schema";
import "server-only";

import prisma from "@/lib/prisma";

export async function saveNewWebcam(webcam: CreateWebcamInputs) {
  await prisma.webcam.create({
    data: {
      angleOfView: webcam.angleOfView,
      cameraType: "COMMUNAUTAIRE",
      elevation: webcam.elevation ?? null,
      latitude: webcam.latitude,
      longitude: webcam.longitude,
      integrationStatus: {
        connect: {
          code: "EVALUATION",
        },
      },
      name: webcam.name,
      refreshSeconds: webcam.refreshSeconds ?? null,
      url: webcam.url,
    },
  });

  return { success: true };
}
