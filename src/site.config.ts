import type { SiteConfig } from "./types";
import type { AstroExpressiveCodeOptions } from "astro-expressive-code";

export const siteConfig: SiteConfig = {
  author: "Jonathan Mwaniki",
  date: {
    locale: "en-GB",
    options: {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }
  },
  description: "The Mwaniki Reports delivers breaking news and in-depth analysis from Kenya and beyond.",
  lang: "en-GB",
  ogLocale: "en_KE",
  title: "The Mwaniki Reports",
  url: "https://news.jonathanmwaniki.co.ke",
  social: {
    twitter: "@MwanikiReports",
    facebook: "TheMwanikiReports",
    email: "news@jonathanmwaniki.co.ke"
  },
  newsletter: {
    cta: "Subscribe to our daily briefings",
    url: "/newsletter"
  }
};

export const menuLinks = [
  { path: "/", title: "Home" },
  { path: "/about", title: "About" },
  { path: "/posts", title: "Top Stories" },
  { path: "/notes", title: "Briefs" },
  { path: "/contact", title: "Contact" }
] as const;

export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
  styleOverrides: {
    borderRadius: "6px",
    codeFontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
    codeFontSize: "0.9rem",
    codeLineHeight: "1.75rem",
    codePaddingInline: "1.25rem",
    frames: {
      frameBoxShadowCssValue: "none"
    },
    uiLineHeight: "inherit",
    codeBackground: "var(--code-bg)",
    codeForeground: "var(--code-text)"
  },
  themeCssSelector(theme, { styleVariants }) {
    if (styleVariants.length >= 2) {
      const baseTheme = styleVariants[0]?.theme;
      const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme;
      if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
    }
    return `[data-theme="${theme.name}"]`;
  },
  themes: ["dracula", "github-light"],
  useThemedScrollbars: false
};