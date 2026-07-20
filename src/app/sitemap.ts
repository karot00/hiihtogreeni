import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/config";
import { ROUTES } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const pages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}${ROUTES.fi.home}`,
      lastModified: new Date("2026-06-15"),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: {
        languages: {
          fi: `${baseUrl}${ROUTES.fi.home}`,
          "en-GB": `${baseUrl}${ROUTES.en.home}`,
        },
      },
    },
    {
      url: `${baseUrl}${ROUTES.fi.cabin}`,
      lastModified: new Date("2023-06-13"),
      changeFrequency: "yearly",
      priority: 0.8,
      alternates: {
        languages: {
          fi: `${baseUrl}${ROUTES.fi.cabin}`,
          "en-GB": `${baseUrl}${ROUTES.en.cabin}`,
        },
      },
    },
    {
      url: `${baseUrl}${ROUTES.fi.gallery}`,
      lastModified: new Date("2025-07-29"),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          fi: `${baseUrl}${ROUTES.fi.gallery}`,
          "en-GB": `${baseUrl}${ROUTES.en.gallery}`,
        },
      },
    },
    {
      url: `${baseUrl}${ROUTES.fi.rates}`,
      lastModified: new Date("2026-04-29"),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          fi: `${baseUrl}${ROUTES.fi.rates}`,
          "en-GB": `${baseUrl}${ROUTES.en.rates}`,
        },
      },
    },
    {
      url: `${baseUrl}${ROUTES.fi.contact}`,
      lastModified: new Date("2026-03-03"),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          fi: `${baseUrl}${ROUTES.fi.contact}`,
          "en-GB": `${baseUrl}${ROUTES.en.contact}`,
        },
      },
    },
    {
      url: `${baseUrl}${ROUTES.en.home}`,
      lastModified: new Date("2026-06-15"),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: {
        languages: {
          fi: `${baseUrl}${ROUTES.fi.home}`,
          "en-GB": `${baseUrl}${ROUTES.en.home}`,
        },
      },
    },
    {
      url: `${baseUrl}${ROUTES.en.cabin}`,
      lastModified: new Date("2022-11-09"),
      changeFrequency: "yearly",
      priority: 0.8,
      alternates: {
        languages: {
          fi: `${baseUrl}${ROUTES.fi.cabin}`,
          "en-GB": `${baseUrl}${ROUTES.en.cabin}`,
        },
      },
    },
    {
      url: `${baseUrl}${ROUTES.en.gallery}`,
      lastModified: new Date("2024-07-30"),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          fi: `${baseUrl}${ROUTES.fi.gallery}`,
          "en-GB": `${baseUrl}${ROUTES.en.gallery}`,
        },
      },
    },
    {
      url: `${baseUrl}${ROUTES.en.rates}`,
      lastModified: new Date("2026-04-29"),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          fi: `${baseUrl}${ROUTES.fi.rates}`,
          "en-GB": `${baseUrl}${ROUTES.en.rates}`,
        },
      },
    },
    {
      url: `${baseUrl}${ROUTES.en.contact}`,
      lastModified: new Date("2026-03-03"),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          fi: `${baseUrl}${ROUTES.fi.contact}`,
          "en-GB": `${baseUrl}${ROUTES.en.contact}`,
        },
      },
    },
  ];

  return pages;
}
