"use client";

import Image from "next/image";
// Required for interactivity
import { usePathname, useRouter } from "next/navigation";

import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const changeLanguage = (locale: string) => {
    // Redirect to the new locale while preserving the current path
    router.push(`/${locale}${pathname.replace(/^\/(en|fr)/, "")}`);
  };
  const locale = useLocale();
  const handleChange = (event: SelectChangeEvent) => {
    changeLanguage(event.target.value);
  };

  const t = useTranslations("layout");

  return (
    <FormControl size="small" sx={{ minWidth: 150 }} variant="outlined">
      <Select
        labelId="language-select-label"
        onChange={handleChange}
        sx={(theme) => ({
          ...theme.typography.button,
          height: "30px",
        })}
        value={locale}
        variant="outlined"
      >
        <MenuItem value="en">
          <StackLanguage
            iconSrc="/gb.svg"
            label={t("Topbar.languageSwitcher.english")}
          />
        </MenuItem>

        <MenuItem value="fr">
          <StackLanguage
            iconSrc="/fr.svg"
            label={t("Topbar.languageSwitcher.french")}
          />
        </MenuItem>
      </Select>
    </FormControl>
  );
}

const StackLanguage = (props: { iconSrc: string; label: string }) => {
  const { iconSrc, label } = props;

  return (
    <Stack alignItems="center" direction="row" gap={1}>
      <Image
        alt=""
        className="dark:invert"
        height={12}
        priority
        src={iconSrc}
        width={16}
      />

      {label}
    </Stack>
  );
};
