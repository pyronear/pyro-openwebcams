import { useTranslations } from "next-intl";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { WebcamWithStatus } from "@/types/webcam-types";

type WebcamTableProps = {
  webcams: WebcamWithStatus[];
};

export const WebcamTable = ({ webcams }: WebcamTableProps) => {
  const t = useTranslations("webcams");
  const t_db = useTranslations("db");

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ marginBottom: "16px" }}>Webcams</h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("tableHeader.name")}</TableCell>

              <TableCell>{t("tableHeader.angleOfView")}</TableCell>

              <TableCell>{t("tableHeader.latitude")}</TableCell>

              <TableCell>{t("tableHeader.longitude")}</TableCell>

              <TableCell>{t("tableHeader.elevation")}</TableCell>

              <TableCell>{t("tableHeader.refreshSeconds")}</TableCell>

              <TableCell>{t("tableHeader.integrationStatus")}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {webcams.map((webcam) => (
              <TableRow key={webcam.id}>
                <TableCell>{webcam.name}</TableCell>

                <TableCell>{webcam.angleOfView}</TableCell>

                <TableCell>{webcam.latitude}</TableCell>

                <TableCell>{webcam.longitude}</TableCell>

                <TableCell>{webcam.elevation ?? "—"}</TableCell>

                <TableCell>{webcam.refreshSeconds ?? "—"}</TableCell>

                <TableCell>{t_db(webcam.integrationStatus.labelKey)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
