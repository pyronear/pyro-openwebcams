"use server";

import { saveNewWebcam } from "@/features/webcams/api/createWebcam";

import { CreateWebcamInputs, createWebcamSchema } from "./schema";
import { WebcamFormState } from "./types";

export async function createWebcam(
  _prevState: WebcamFormState,
  formData: FormData,
): Promise<WebcamFormState> {
  const rawData = Object.fromEntries(formData.entries());

  const parsed = createWebcamSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const data: CreateWebcamInputs = {
    ...parsed.data,
  };

  await saveNewWebcam(data);

  return { success: true };
}
