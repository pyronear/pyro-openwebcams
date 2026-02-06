import "server-only";

import prisma from "@/lib/prisma";

export async function isWebcamNameUnique(webcamName: string): Promise<boolean> {
  const existingWebcam = await prisma.webcam.findUnique({
    where: {
      name: webcamName,
    },
  });

  return existingWebcam === null;
}

export async function isWebcamUrlUnique(webcamUrl: string): Promise<boolean> {
  const existingWebcam = await prisma.webcam.findUnique({
    where: {
      url: webcamUrl,
    },
  });

  return existingWebcam === null;
}
