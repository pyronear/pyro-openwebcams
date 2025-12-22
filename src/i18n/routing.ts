import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "fr"],

  // Used when no locale matches
  defaultLocale: "fr",

  // The `pathnames` object holds pairs of internal and
  // external paths. Based on the locale, the external
  // paths are rewritten to the shared, internal ones.
  pathnames: {
    // * Protected Pathnames
    "/": "/",
    "/user": "/user",
    "/admin": "/admin",

    // Projects
    "/projects": "/projects",
    "/projects/[projectId]": "/projects/[projectId]",

    // * Public Pathnames
    "/sign-in": "/sign-in",
    "/sign-up": "/sign-up",
  },

  localePrefix: "always",
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
