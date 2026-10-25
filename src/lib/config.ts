// Site identity only. Business facts (address, contacts, capacity) live in
// src/content/shared.ts so every page, JSON-LD and llms.txt reads one source.
export const SITE_CONFIG = {
  name: "Hiihtogreeni",
  url: "https://www.hiihtogreeni.fi",
} as const;
