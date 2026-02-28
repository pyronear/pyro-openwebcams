import "server-only";

import prisma from "@/lib/prisma";

import { HomeWebcam, IntegrationStatusCode } from "@/types/home-webcam-types";

const isIntegrationStatusCode = (
  statusCode: string,
): statusCode is IntegrationStatusCode => {
  return ["INTEGRATED", "EVALUATION", "REJECTED"].includes(statusCode);
};

export async function getHomeWebcamData() {
  const webcamRows = await prisma.webcam.findMany({
    orderBy: { name: "asc" },
    select: {
      cameraType: true,
      id: true,
      integrationStatus: {
        select: {
          code: true,
          labelKey: true,
        },
      },
      latitude: true,
      longitude: true,
      name: true,
      url: true,
    },
  });
  const webcams: HomeWebcam[] = webcamRows.flatMap((webcam) => {
    if (!isIntegrationStatusCode(webcam.integrationStatus.code)) {
      return [];
    }

    return [
      {
        ...webcam,
        integrationStatus: {
          ...webcam.integrationStatus,
          code: webcam.integrationStatus.code,
        },
      },
    ];
  });

  const totalWebcams = webcams.length;
  const integratedCount = webcams.filter(
    (webcam) => webcam.integrationStatus.code === "INTEGRATED",
  ).length;
  const integratedPercentage =
    totalWebcams === 0 ? 0 : Math.round((integratedCount / totalWebcams) * 100);

  return {
    integratedPercentage,
    totalWebcams,
    webcams,
  };
}
