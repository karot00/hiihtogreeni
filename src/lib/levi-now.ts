import { COMPANY } from "../content/shared.ts";

// The Levi Now map (map.levifinland.fi, the owners' levi-map project, its docs/DESIGN.md §5.8):
// Hiihtogreeni, its nearest ski-bus stop with the walking minutes and next buses, and the
// services around it. It is first-party and cookieless, so it needs no consent and loads lazily.
// The map is in Finnish and English. UTM tags as on the other links to our sites.
export function leviNowEmbedUrl(lang: "fi" | "en", page: string): string {
  const q = new URLSearchParams({
    embed: "1",
    stay: "hiihtogreeni",
    utm_source: "hiihtogreeni.fi",
    utm_medium: "referral",
    utm_campaign: "map-embed",
    utm_content: page,
  });
  return `https://map.levifinland.fi/${lang}/?${q}`;
}

/** Google Maps stays a link, for driving directions. */
export const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${COMPANY.geo.latitude},${COMPANY.geo.longitude}`;
