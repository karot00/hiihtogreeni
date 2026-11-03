import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "../lib/config.ts";
import { ROUTES, type RouteKey } from "../lib/routes.ts";

type PageEntry = {
  /**
   * Date of the last change to the page's visible content, in both languages.
   * Update it by hand in the same commit as the content change; layout,
   * footer and analytics changes do not count. Never generate it per build.
   */
  lastModified: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

export const PAGES: Record<RouteKey, PageEntry> = {
  home: { lastModified: "2026-11-03", changeFrequency: "monthly", priority: 1.0 },
  cabin: { lastModified: "2026-11-03", changeFrequency: "yearly", priority: 0.8 },
  gallery: { lastModified: "2026-10-29", changeFrequency: "monthly", priority: 0.7 },
  teams: { lastModified: "2026-11-03", changeFrequency: "yearly", priority: 0.8 },
  companies: { lastModified: "2026-11-03", changeFrequency: "monthly", priority: 0.8 },
  rates: { lastModified: "2026-11-03", changeFrequency: "monthly", priority: 0.9 },
  contact: { lastModified: "2026-08-03", changeFrequency: "monthly", priority: 0.8 },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const keys = Object.keys(PAGES) as RouteKey[];

  return (["fi", "en"] as const).flatMap((lang) =>
    keys.map((key) => ({
      url: `${baseUrl}${ROUTES[lang][key]}`,
      lastModified: new Date(PAGES[key].lastModified),
      changeFrequency: PAGES[key].changeFrequency,
      priority: PAGES[key].priority,
      alternates: {
        languages: {
          fi: `${baseUrl}${ROUTES.fi[key]}`,
          "en-GB": `${baseUrl}${ROUTES.en[key]}`,
        },
      },
    })),
  );
}
