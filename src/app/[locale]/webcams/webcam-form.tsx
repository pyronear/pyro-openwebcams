"use client";

import { useActionState } from "react";

import { useTranslations } from "next-intl";

import {
  Alert,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { WebcamFormState } from "./types";

const initialState: WebcamFormState = {
  errors: {},
};

type Props = {
  action: unknown;
};

export default function WebcamForm({ action }: Props) {
  const [state, formAction] = useActionState(
    action as (
      prevState: WebcamFormState,
      formData: FormData,
    ) => Promise<WebcamFormState>,
    initialState,
  );
  const t = useTranslations("webcams");

  return (
    <>
      <Typography variant="h1">{t("webcamCreation.title")}</Typography>

      <Paper sx={{ p: 3, mt: 2, minWidth: 700 }}>
        <form action={formAction}>
          <Stack spacing={2}>
            {state.success && (
              <Alert severity="success">
                {t("webcamCreation.successMessage")}
              </Alert>
            )}

            <TextField
              defaultValue={state.createWebcamForm?.get("name") ?? ""}
              error={!!state.errors?.name}
              helperText={
                state.errors?.name?.[0] ? t(state.errors.name[0]) : undefined
              }
              label={t("webcamCreation.nameLabel")}
              name="name"
            />

            <TextField
              defaultValue={state.createWebcamForm?.get("url") ?? ""}
              error={!!state.errors?.url}
              helperText={
                state.errors?.url?.[0] ? t(state.errors.url[0]) : undefined
              }
              label={t("webcamCreation.urlLabel")}
              name="url"
            />

            <TextField
              defaultValue={state.createWebcamForm?.get("angleOfView") ?? ""}
              error={!!state.errors?.angleOfView}
              helperText={
                state.errors?.angleOfView?.[0]
                  ? t(state.errors.angleOfView[0])
                  : undefined
              }
              label={t("webcamCreation.angleOfViewLabel")}
              name="angleOfView"
              type="number"
            />

            <TextField
              defaultValue={state.createWebcamForm?.get("latitude") ?? ""}
              error={!!state.errors?.latitude}
              helperText={state.errors?.latitude?.[0]}
              label={t("webcamCreation.latitudeLabel")}
              name="latitude"
              type="number"
            />

            <TextField
              defaultValue={state.createWebcamForm?.get("longitude") ?? ""}
              error={!!state.errors?.longitude}
              helperText={state.errors?.longitude?.[0]}
              label={t("webcamCreation.longitudeLabel")}
              name="longitude"
              type="number"
            />

            <TextField
              defaultValue={state.createWebcamForm?.get("elevation") ?? ""}
              error={!!state.errors?.elevation}
              helperText={state.errors?.elevation?.[0]}
              label={t("webcamCreation.elevationLabel")}
              name="elevation"
              type="number"
            />

            <TextField
              defaultValue={state.createWebcamForm?.get("refreshSeconds") ?? ""}
              error={!!state.errors?.refreshSeconds}
              helperText={state.errors?.refreshSeconds?.[0]}
              label={t("webcamCreation.refreshSecondsLabel")}
              name="refreshSeconds"
              type="number"
            />

            <Button type="submit" variant="contained">
              {t("webcamCreation.submitButton")}
            </Button>
          </Stack>
        </form>
      </Paper>
    </>
  );
}
