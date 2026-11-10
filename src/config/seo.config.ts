// SEO & metadata config — update this file to manage all app-level meta.
// Per-route titles are composed as: `${page} | ${APP_NAME}`

import { env } from "@/env";
import site from "../../site.config.json";

// ---- Site identity - read from site.config.json at the repo root ----
export const APP_NAME = site.name;
export const APP_DESCRIPTION = site.description;
// -------------------------------------------------------------------

export const seo = {
	name: APP_NAME,
	description: APP_DESCRIPTION,

	// Base URL — used for canonical links and OG URLs
	url: env.VITE_BASE_URL,

	// Default OG image - file lives in /public (path set in site.config.json)
	ogImage: site.seo.ogImage,

	// og:locale, e.g. "en_US"
	locale: site.seo.locale,

	// Twitter / X card. Add `site`/`creator` (your project's or your own handle,
	// e.g. "@yourhandle") once one exists - a template has none to inherit, and a
	// wrong handle is worse than an absent one.
	twitter: {
		card: "summary_large_image" as const,
	},

	// Usage: seo.title('Dashboard') → 'Dashboard | My App'
	title: (page?: string) => (page ? `${page} | ${APP_NAME}` : APP_NAME),
} as const;
