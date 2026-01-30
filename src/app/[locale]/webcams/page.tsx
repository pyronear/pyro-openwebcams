import { WebcamTable } from "@/components/webcams/webcam-table";

import { getWebcamList } from "@/features/webcams/api/getWebcamList";

import { WebcamWithStatus } from "@/types/webcam-types";

export default async function WebcamsPage() {
  const webcams: WebcamWithStatus[] = await getWebcamList();

  return <WebcamTable webcams={webcams} />;
}
