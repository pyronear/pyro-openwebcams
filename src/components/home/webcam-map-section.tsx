"use client";

import { useMemo, useState } from "react";

import dynamic from "next/dynamic";

import { useTranslations } from "next-intl";

import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  CameraType,
  HomeWebcam,
  IntegrationStatusCode,
} from "@/types/home-webcam-types";

const WebcamMapCanvas = dynamic(
  () =>
    import("@/components/home/webcam-map-canvas").then(
      (mod) => mod.WebcamMapCanvas,
    ),
  {
    ssr: false,
  },
);

const STATUS_CODES: IntegrationStatusCode[] = [
  "INTEGRATED",
  "EVALUATION",
  "REJECTED",
];
const CAMERA_TYPES: CameraType[] = ["PYRONEAR", "COMMUNAUTAIRE"];

const STATUS_LABEL_KEYS: Record<IntegrationStatusCode, string> = {
  EVALUATION: "integrationStatus.evaluation",
  INTEGRATED: "integrationStatus.integrated",
  REJECTED: "integrationStatus.rejected",
};

type WebcamMapSectionProps = {
  webcams: HomeWebcam[];
};

export const WebcamMapSection = ({ webcams }: WebcamMapSectionProps) => {
  const t = useTranslations("home");
  const t_db = useTranslations("db");
  const [selectedStatus, setSelectedStatus] = useState<
    Record<IntegrationStatusCode, boolean>
  >({
    EVALUATION: false,
    INTEGRATED: true,
    REJECTED: false,
  });
  const [selectedTypes, setSelectedTypes] = useState<
    Record<CameraType, boolean>
  >({
    COMMUNAUTAIRE: false,
    PYRONEAR: true,
  });

  const filteredWebcams = useMemo(() => {
    return webcams.filter((webcam) => {
      return (
        selectedStatus[webcam.integrationStatus.code] &&
        selectedTypes[webcam.cameraType]
      );
    });
  }, [selectedStatus, selectedTypes, webcams]);

  return (
    <Box
      sx={{
        bgcolor: "customBackground.light",
        display: "grid",
        gridTemplateColumns: { md: "3fr 1fr", xs: "1fr" },
      }}
    >
      <Paper elevation={0} square>
        <WebcamMapCanvas webcams={filteredWebcams} />
      </Paper>

      <Stack spacing={3} sx={{ p: 3 }}>
        <Typography variant="h2">{t("map.filtersTitle")}</Typography>

        <Stack spacing={1}>
          <Typography variant="h3">{t("map.statusTitle")}</Typography>

          <FormGroup>
            {STATUS_CODES.map((statusCode) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedStatus[statusCode]}
                    onChange={(event) => {
                      setSelectedStatus((prev) => ({
                        ...prev,
                        [statusCode]: event.target.checked,
                      }));
                    }}
                  />
                }
                key={statusCode}
                label={t_db(STATUS_LABEL_KEYS[statusCode])}
              />
            ))}
          </FormGroup>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h3">{t("map.typeTitle")}</Typography>

          <FormGroup>
            {CAMERA_TYPES.map((cameraType) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedTypes[cameraType]}
                    onChange={(event) => {
                      setSelectedTypes((prev) => ({
                        ...prev,
                        [cameraType]: event.target.checked,
                      }));
                    }}
                  />
                }
                key={cameraType}
                label={t(`map.type.${cameraType}`)}
              />
            ))}
          </FormGroup>
        </Stack>
      </Stack>
    </Box>
  );
};
