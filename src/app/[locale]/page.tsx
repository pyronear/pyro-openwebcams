import { ReactNode } from "react";

import Link from "next/link";

import { getTranslations } from "next-intl/server";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import {
  Box,
  Button,
  Link as MuiLink,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { WebcamMapSection } from "@/components/home/webcam-map-section";

import { getHomeWebcamData } from "@/features/webcams/api/getHomeWebcamData";

type HomeActionCardProps = {
  description: string;
  href: "/webcams" | "/webcams/new";
  icon: ReactNode;
  title: string;
  ctaLabel: string;
};

const HomeActionCard = ({
  ctaLabel,
  description,
  href,
  icon,
  title,
}: HomeActionCardProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "secondaryText.main",
        borderRadius: 2,
        color: "common.white",
        p: 3,
      }}
    >
      <Stack alignItems="center" spacing={2} textAlign="center">
        <Typography variant="h3">{title}</Typography>

        <Typography variant="subtitle2">{description}</Typography>

        <Link href={href} style={{ textDecoration: "none" }}>
          <Button
            startIcon={icon}
            sx={{ minWidth: 230, mt: 1 }}
            variant="contained"
          >
            {ctaLabel}
          </Button>
        </Link>
      </Stack>
    </Paper>
  );
};

export default async function Home() {
  const t = await getTranslations("home");
  const { integratedPercentage, totalWebcams, webcams } =
    await getHomeWebcamData();

  return (
    <main className="flex flex-1 flex-col">
      <Stack
        spacing={8}
        sx={{ mx: "auto", p: { md: 5, xs: 2 }, width: "100%" }}
      >
        <Stack spacing={3}>
          <Typography sx={{ textAlign: "center" }} variant="h1">
            {t("title")}
          </Typography>

          <Typography sx={{ maxWidth: 1050, mx: "auto" }} variant="subtitle1">
            {t("description")}
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: { md: "1fr 1fr", xs: "1fr" },
            maxWidth: 1050,
            mx: "auto",
            width: "100%",
          }}
        >
          <HomeActionCard
            ctaLabel={t("cta.proposeButton")}
            description={t("cta.proposeDescription")}
            href="/webcams/new"
            icon={<AddCircleOutlineIcon />}
            title={t("cta.proposeTitle")}
          />

          <HomeActionCard
            ctaLabel={t("cta.evaluateButton")}
            description={t("cta.evaluateDescription")}
            href="/webcams"
            icon={<TravelExploreIcon />}
            title={t("cta.evaluateTitle")}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: { md: "1fr 1fr", xs: "1fr" },
            maxWidth: 860,
            mx: "auto",
            width: "100%",
          }}
        >
          <Paper elevation={0} sx={{ bgcolor: "secondaryText.main", p: 3 }}>
            <Typography sx={{ textAlign: "center" }} variant="h2">
              {`${totalWebcams} ${t("kpis.proposed")}`}
            </Typography>
          </Paper>

          <Paper elevation={0} sx={{ bgcolor: "secondaryText.main", p: 3 }}>
            <Typography sx={{ textAlign: "center" }} variant="h2">
              {`${integratedPercentage}% ${t("kpis.connected")}`}
            </Typography>
          </Paper>
        </Box>

        <WebcamMapSection webcams={webcams} />

        <Stack spacing={2} sx={{ px: { md: 8, xs: 2 }, py: 2 }}>
          <Typography variant="h2">{t("extraLinks.title")}</Typography>

          <MuiLink href="#" underline="hover">
            {t("extraLinks.aboutProject")}
          </MuiLink>

          <MuiLink href="#" underline="hover">
            {t("extraLinks.methodology")}
          </MuiLink>

          <MuiLink href="#" underline="hover">
            {t("extraLinks.github")}
          </MuiLink>

          <Typography sx={{ fontStyle: "italic" }} variant="subtitle1">
            {t("extraLinks.extra")}
          </Typography>
        </Stack>
      </Stack>
    </main>
  );
}
