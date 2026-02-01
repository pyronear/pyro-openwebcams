import "server-only";

import prisma from "@/lib/prisma";

export async function getWebcamList() {
  return await prisma.webcam.findMany({
    include: { integrationStatus: true },
    orderBy: { name: "asc" },
  });
}
