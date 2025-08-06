import type { SiteConfig } from "./types";
import type { AstroExpressiveCodeOptions } from "astro-expressive-code";

export const siteConfig: SiteConfig = {
	// Used as both a meta property (BaseHead.astro) & the generated satori png (og-image/[slug].png.ts)
	author: "Jonathan Mwaniki",
	// Date.prototype.toLocaleDateString() parameters, found in utils/date.ts.
	date: {
		locale: "en-GB",
		options: {
			day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
	// Used as the default description meta property and webmanifest description
	description: "The Mwaniki Reports delivers the latest news and updates from Kenya and beyond.",
	// HTML lang property, found in layouts/Base.astro & astro.config.ts
	lang: "en-GB",
	// Meta property, found in components/BaseHead.astro
	ogLocale: "en_KE",
	/* 
		- Used to construct the meta title property found in components/BaseHead.astro
		- The webmanifest name found in astro.config.ts
		- The link value found in components/layout/Header.astro
		- In the footer found in components/layout/Footer.astro
	*/
	title: "The Mwaniki Reports",
	// Your domain for astro.config.ts
	url: "https://jonathanmwaniki.co.ke/",
};

// Used to generate links in both the Header & Footer.
export const menuLinks: { path: string; title: string }[] = [
	{
		path: "/",
		title: "Home",
	},
	{
		path: "/about/",
		title: "About",
	},
	{
		path: "/posts/",
		title: "Top Stories",
	},
	{
		path: "/notes/",
		title: "Briefs",
	},
];

// https://expressive-code.com/reference/configuration/
export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
	styleOverrides: {
		borderRadius: "4px",
		codeFontFamily:
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
		codeFontSize: "0.875rem",
		codeLineHeight: "1.7142857rem",
		codePaddingInline: "1rem",
		frames: {
			frameBoxShadowCssValue: "none",
		},
		uiLineHeight: "inherit",
		codeBackground: "var(--gray-50)", // Light background for code blocks
		codeForeground: "var(--gray-900)", // Dark text for readability
	},
	themeCssSelector(theme, { styleVariants }) {
		// If one dark and one light theme are available
		// generate theme CSS selectors compatible with cactus-theme dark mode switch
		if (styleVariants.length >= 2) {
			const baseTheme = styleVariants[0]?.theme;
			const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme;
			if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
		}
		// return default selector
		return `[data-theme="${theme.name}"]`;
	},
	// One dark, one light theme => https://expressive-code.com/guides/themes/#available-themes
	themes: ["dracula", "github-light"],
	useThemedScrollbars: false,
};