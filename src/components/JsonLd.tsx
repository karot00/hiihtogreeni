import type { Lang } from "../content/types.ts";
import { COMPANY, RENTAL_CONTACT, CAPACITY, EXTERNAL_LINKS } from "../content/shared.ts";
import { SITE_CONFIG } from "../lib/config.ts";

const ENTITY_ID = `${SITE_CONFIG.url}/#organization`;

/** Truthful business + lodging structured data. No ratings, offers, or prices. */
function buildJsonLd(lang: Lang) {
  const isFi = lang === "fi";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ENTITY_ID,
        name: COMPANY.name,
        url: SITE_CONFIG.url,
        email: RENTAL_CONTACT.email,
        telephone: RENTAL_CONTACT.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: COMPANY.address.street,
          postalCode: COMPANY.address.postalCode,
          addressLocality: COMPANY.address.city,
          addressCountry: "FI",
        },
        sameAs: [EXTERNAL_LINKS.leviFi, EXTERNAL_LINKS.leviEn],
      },
      {
        "@type": "TouristAccommodation",
        "@id": `${SITE_CONFIG.url}/#accommodation`,
        name: "Hiihtogreeni",
        description: isFi
          ? "Korkeatasoinen vuokramökki Levin rinteiden ja golfkentän vieressä, kaksi 14 hengen huoneistoa."
          : "A high-quality rental cabin by the Levi slopes and golf course, with two 14-guest apartments.",
        url: SITE_CONFIG.url,
        numberOfRooms: CAPACITY.bedrooms,
        occupancy: {
          "@type": "QuantitativeValue",
          value: CAPACITY.guestsPerApartment,
          unitText: isFi ? "vierasta / huoneisto" : "guests per apartment",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: COMPANY.address.street,
          postalCode: COMPANY.address.postalCode,
          addressLocality: COMPANY.address.city,
          addressCountry: "FI",
        },
        image: `${SITE_CONFIG.url}/og/default.jpg`,
        inLanguage: isFi ? "fi-FI" : "en-GB",
      },
    ],
  };
}

/** Renders schema.org JSON-LD for the real business and accommodation facts. */
export function JsonLd({ lang }: { lang: Lang }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(lang)) }}
    />
  );
}
