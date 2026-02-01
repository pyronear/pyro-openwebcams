import { WebcamGetPayload } from "../../prisma/generated/prisma/models";

export type WebcamWithStatus = WebcamGetPayload<{
  include: { integrationStatus: true };
}>;
