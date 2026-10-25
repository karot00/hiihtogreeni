import type { Lang } from "../content/types.ts";
import { COMPANY, CAPACITY, EXTERNAL_LINKS, RENTAL_CONTACT, STAY_TIMES, bookingPageUrl } from "../content/shared.ts";
import { enCabinSections } from "../content/en.ts";
import { fiCabinSections } from "../content/fi.ts";
import { SITE_CONFIG } from "./config.ts";

export const ORGANIZATION_ID = `${SITE_CONFIG.url}/#organization`;
export const ACCOMMODATION_ID = `${SITE_CONFIG.url}/#accommodation`;

const address = {
  "@type": "PostalAddress",
  streetAddress: COMPANY.address.street,
  postalCode: COMPANY.address.postalCode,
  addressLocality: COMPANY.address.city,
  addressCountry: "FI",
};

/** The cabin itself: both apartments, stay times, amenities and the booking action. */
export function buildLodging(lang: Lang) {
  const isFi = lang === "fi";
  const cabin = isFi ? fiCabinSections : enCabinSections;
  const apartment = (name: string, petsAllowed?: boolean) => ({
    "@type": "Apartment",
    name,
    numberOfBedrooms: CAPACITY.bedrooms,
    numberOfBathroomsTotal: CAPACITY.bathrooms,
    floorSize: { "@type": "QuantitativeValue", value: Number.parseInt(CAPACITY.area, 10), unitCode: "MTK" },
    occupancy: { "@type": "QuantitativeValue", maxValue: CAPACITY.guestsPerApartment },
    ...(petsAllowed === undefined ? {} : { petsAllowed }),
  });

  return {
    "@type": "LodgingBusiness",
    "@id": ACCOMMODATION_ID,
    name: SITE_CONFIG.name,
    description: isFi
      ? `Korkeatasoinen vuokramökki Levin rinteiden ja golfkentän vieressä, kaksi ${CAPACITY.guestsPerApartment} hengen huoneistoa.`
      : `A high-quality rental cabin by the Levi slopes and golf course, with two ${CAPACITY.guestsPerApartment}-guest apartments.`,
    url: SITE_CONFIG.url,
    telephone: RENTAL_CONTACT.phone,
    parentOrganization: { "@id": ORGANIZATION_ID },
    address,
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.geo.latitude,
      longitude: COMPANY.geo.longitude,
    },
    image: `${SITE_CONFIG.url}/og/default.jpg`,
    numberOfRooms: CAPACITY.bedrooms * CAPACITY.apartments,
    checkinTime: `${STAY_TIMES.checkIn}:00`,
    checkoutTime: `${STAY_TIMES.checkOut}:00`,
    availableLanguage: ["fi", "en"],
    amenityFeature: cabin.livingKitchen.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    // Booking terms v1.3 §9: pets welcome in apartment A; B is kept pet-free where possible.
    containsPlace: [apartment(cabin.apartmentNames[0], true), apartment(cabin.apartmentNames[1])],
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: bookingPageUrl(lang),
        inLanguage: isFi ? "fi" : "en",
        actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
      },
      result: { "@type": "LodgingReservation", name: isFi ? "Varauspyyntö" : "Booking request" },
    },
  };
}

/**
 * Truthful business + lodging structured data, built from the same content
 * the pages render. No ratings yet; prices (priceRange, AggregateOffer) are
 * added from the booking API in AGENT-VISIBILITY-PLAN.md step 4, never typed.
 * The phone is the one already shown in the page CTAs; email stays click-to-load.
 */
export function buildJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: COMPANY.name,
        url: SITE_CONFIG.url,
        telephone: RENTAL_CONTACT.phone,
        address,
        sameAs: [EXTERNAL_LINKS.leviFi, EXTERNAL_LINKS.leviEn],
        image: `${SITE_CONFIG.url}/og/default.jpg`,
      },
      buildLodging(lang),
    ],
  };
}

/** FAQPage for a visible FAQ; the questions and answers are the rendered text. */
export function buildFaqJsonLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}
