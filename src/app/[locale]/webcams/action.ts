"use server";

import { saveNewWebcam } from "@/features/webcams/api/createWebcam";
import {
  isWebcamNameUnique,
  isWebcamUrlUnique,
} from "@/features/webcams/api/newWebcamChecks";

import { CreateWebcamInputs, createWebcamSchema } from "./schema";
import { WebcamFormState } from "./types";

export async function createWebcam(
  _prevState: WebcamFormState,
  formData: FormData,
): Promise<WebcamFormState> {
  const rawData = Object.fromEntries(formData.entries());

  const parsed = createWebcamSchema.safeParse(rawData);
  const errors: Record<string, string[]> =
    parsed.error?.flatten().fieldErrors ?? {};

  if (!(await isWebcamNameUnique(formData.get("name") as string))) {
    errors.name = ["webcamCreation.errorMessage.nameNotUnique"];
  }

  if (!(await isWebcamUrlUnique(formData.get("url") as string))) {
    errors.url = ["webcamCreation.errorMessage.urlNotUnique"];
  }

  if (!parsed.success || Object.keys(errors).length > 0) {
    return {
      createWebcamForm: formData,
      errors: errors,
    };
  }

  const data: CreateWebcamInputs = {
    ...parsed.data,
  };

  await saveNewWebcam(data);

  return { success: true };
}
