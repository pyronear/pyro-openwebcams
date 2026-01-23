import { WebcamTable } from "@/components/webcams/webcam-table";

import prisma from "@/lib/prisma";

import { WebcamWithStatus } from "@/types/webcam-types";

export default async function WebcamsPage() {
  const webcams: WebcamWithStatus[] = await prisma.webcam.findMany({
    include: { integrationStatus: true },
    orderBy: { name: "asc" },
  });

  return <WebcamTable webcams={webcams} />;
}
