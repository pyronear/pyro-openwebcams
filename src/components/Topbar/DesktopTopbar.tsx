import Image from "next/image";
import Link from "next/link";

import { useTranslations } from "next-intl";

import { AppBar, Stack, Toolbar } from "@mui/material";

import LanguageSwitcher from "./LanguageSwitcher";

export const DesktopTopbar = () => {
  const t = useTranslations("layout");

  return (
    <>
      <AppBar>
        <Toolbar disableGutters>
          <Stack
            alignItems="center"
            direction="row"
            flexGrow={1}
            justifyContent="space-between"
            px={2}
          >
            <Stack alignItems="center" direction="row" spacing={5}>
              <Link href="/">
                <Image
                  alt=""
                  height={80}
                  src="/logos/logo-pyronear.svg"
                  width={200}
                />
              </Link>

              <Stack direction="row" spacing={2}>
                <Link href="/webcams">{t("Topbar.evaluate")}</Link>

                <Link href="/webcams/new">{t("Topbar.addWebcams")}</Link>
              </Stack>
            </Stack>

            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-around"
              spacing={2}
            >
              <LanguageSwitcher />
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Empty toolbar to account for the above one with fixed position */}
      {/* See https://mui.com/material-ui/react-app-bar/#fixed-placement */}
      <Toolbar />
    </>
  );
};
