export const SITE_CONFIG = {
  name: "Hiihtogreeni",
  url: "https://www.hiihtogreeni.fi",
  address: {
    street: "Puttipolku 4",
    postalCode: "99130",
    city: "LEVI",
    country: "Finland",
  },
  contact: {
    phone: "+358500633744",
    phoneDisplay: "+358 500 633 744",
    email: "hiihtogreeni@hiihtogreeni.fi",
  },
  maintenance: {
    name: "Jens Pitkänen",
    phone: "+358443456001",
    phoneDisplay: "+358 44 345 6001",
    email: "jens.pitkanen@aavalevi.fi",
  },
  capacity: {
    apartments: 2,
    guestsPerApartment: 14,
    bedrooms: 7,
    bathrooms: 7,
    area: "150 m²",
  },
  booking: {
    url: "https://www.hiihtogreeni.fi",
  },
  languages: {
    fi: {
      code: "fi",
      name: "Suomi",
      locale: "fi_FI",
    },
    en: {
      code: "en-GB",
      name: "English",
      locale: "en_GB",
    },
  },
} as const;
