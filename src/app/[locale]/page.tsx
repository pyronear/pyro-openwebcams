import { useTranslations } from "next-intl";

import { Typography } from "@mui/material";

export default function Home() {
  const t = useTranslations("home");

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <Typography variant="h1">{t("title")}</Typography>

      <Typography variant="subtitle1">{t("subtitle")}</Typography>
    </main>
  );
}
