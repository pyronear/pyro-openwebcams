"use client";

import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { useTranslations } from "next-intl";

import { Box, Link, Stack, Typography } from "@mui/material";
import { Icon, latLngBounds, LatLngExpression } from "leaflet";

import { HomeWebcam } from "@/types/home-webcam-types";

const FRANCE_CENTER: LatLngExpression = [46.603354, 1.888334];
const FRANCE_ZOOM = 6;
const MAP_TILE_URL =
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const MAP_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors ' +
  '&copy; <a href="https://carto.com/attributions">CARTO</a>';

const markerIcon = new Icon({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconSize: [25, 41],
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type WebcamMapCanvasProps = {
  webcams: HomeWebcam[];
};

const WebcamMapViewportController = ({ webcams }: WebcamMapCanvasProps) => {
  const map = useMap();

  useEffect(() => {
    if (webcams.length === 0) {
      map.setView(FRANCE_CENTER, FRANCE_ZOOM);

      return;
    }

    const bounds = latLngBounds(
      webcams.map((webcam) => [webcam.latitude, webcam.longitude]),
    );

    map.fitBounds(bounds, { maxZoom: 11, padding: [40, 40] });
  }, [map, webcams]);

  return null;
};

export const WebcamMapCanvas = ({ webcams }: WebcamMapCanvasProps) => {
  const t = useTranslations("home");
  const t_db = useTranslations("db");

  return (
    <Box
      sx={{ height: { md: 600, xs: 420 }, position: "relative", width: "100%" }}
    >
      <MapContainer
        center={FRANCE_CENTER}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
        zoom={FRANCE_ZOOM}
      >
        <TileLayer attribution={MAP_ATTRIBUTION} url={MAP_TILE_URL} />

        <WebcamMapViewportController webcams={webcams} />

        <MarkerClusterGroup chunkedLoading>
          {webcams.map((webcam) => (
            <Marker
              icon={markerIcon}
              key={webcam.id}
              position={[webcam.latitude, webcam.longitude]}
            >
              <Popup>
                <Stack spacing={0.5}>
                  <Typography variant="h4">{webcam.name}</Typography>

                  <Typography variant="caption">
                    {t_db(webcam.integrationStatus.labelKey)}
                  </Typography>

                  {webcam.url && (
                    <Link
                      href={webcam.url}
                      rel="noopener noreferrer"
                      target="_blank"
                      underline="hover"
                    >
                      {t("map.popup.link")}
                    </Link>
                  )}
                </Stack>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      {webcams.length === 0 && (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            bgcolor: "rgba(0, 0, 0, 0.6)",
            inset: 0,
            pointerEvents: "none",
            position: "absolute",
          }}
        >
          <Typography color="common.white" variant="subtitle1">
            {t("map.empty")}
          </Typography>
        </Stack>
      )}
    </Box>
  );
};
