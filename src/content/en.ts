import type { NavItem, PageContent, GalleryImage, UILabels } from "./types.ts";
import { EXTERNAL_LINKS } from "./shared.ts";

export const EN_NAV: NavItem[] = [
  { key: "home", label: "Home", href: "/en/home/" },
  { key: "cabin", label: "Cabin", href: "/en/cabin/" },
  { key: "gallery", label: "Photo Gallery", href: "/en/photo-gallery/" },
  { key: "rates", label: "Rates", href: "/en/rates/" },
  { key: "contact", label: "Contact", href: "/en/contact-information/" },
];

export const EN_UI: UILabels = {
  primaryNav: "Main menu",
  footerNav: "Footer menu",
  skipToContent: "Skip to content",
  homeLinkLabel: "Hiihtogreeni – home",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  languageSwitcher: "Change language",
  currentPage: "(current page)",
  opensInNewTab: "(opens in a new tab)",
  footerContactHeading: "Contact",
  footerNavHeading: "Pages",
  footerLanguageHeading: "Language",
  contactCta: "Get in touch",
  cookieSettings: "Cookie settings",
  rightsReserved: "All rights reserved.",
  galleryClose: "Close",
  galleryPrevious: "Previous image",
  galleryNext: "Next image",
};

export const enHome: PageContent = {
  lang: "en",
  slug: "/en/home/",
  title: "Hiihtogreeni - Cabin for Rent in Levi",
  description:
    "Hiihtogreeni is a cozy rental cabin in Levi, close to slopes and ski trails. Perfect for families and groups, up to 14 guests per apartment.",
  h1: "Hiihtogreeni",
  nav: EN_NAV,
  external: EXTERNAL_LINKS,
};

export const enHomeSections = {
  introLead:
    "A beautiful, well-equipped duplex near Levi Golf and the northeast pistes",
  intro:
    "Thinking of renting a cabin in Levi, in the most magical area of Lapland? Hiihtogreeni is a luxurious accommodation option for a large group in Finland's leading ski center, as this log-built, two-story duplex includes two 14-person apartments equipped with everything you'll need.",
  location:
    "In addition to its facilities, our modern cabin's trump card is its location – here, from the edge of the northeast pistes and the golf course, you can go downhill and cross-country skiing, and to the golf course in the golf season, almost from your own yard. The Kittilä airport is approximately 16 km or 20 minutes away by car.",
  groupsLead: "For groups, from corporate parties to bunches of friends",
  groups:
    "A rental cabin is an ideal accommodation option for groups, such as corporate groups or skiing parties. Between the apartments there is a convenient 24-person conference room for meetings and other events. Naturally, families and groups of friends are also warmly welcome!",
  groupsCta:
    "See all the cabin features and take a peek at our photo gallery. You can see our rates here. Please contact us if you are interested in renting a cabin! You can rent the whole building or just one half of it, according to your needs.",
  leviLink: "Cabin presentation also at: levifinland.fi",
  golfLead: "We sell Levi Golf Green Fees",
  golf:
    "Looking to hit the fairways at Levi Golf? Hiihtogreeni offers competitively priced green fees throughout the entire golf season, which typically runs from early June to late September or early October. Hiihtogreeni provides ideal accommodation for larger golf groups. You'll be just 150 meters from the first tee! After your round, unwind in the cabin's sauna or on the spacious terrace. For a different vibe, Restaurant Draivi at the clubhouse is open all summer, serving golfers morning till night, every day.",
  golfAfter:
    "The Levi Golf course itself presents an engaging challenge for experienced golfers while warmly welcoming players of all skill levels, from beginners onward. The facility also provides a full-length driving range and excellent practice areas for your short game. For a truly unique experience, consider playing a midnight round under the Arctic's perpetual summer sun. You can purchase up to 7 green fees for the same day directly through Hiihtogreeni. Our green fees are always competitively priced.",
  golfCta: "Purchase your Levi Golf green fees now via our booking form",
  viewsLead: "Scenery",
  views:
    "Hiihtogreeni offers its best scenery to those staying with us, as the windows open up views of Lake Taalojärvi, Levi Fell, the golf course and the first-snow ski track. After an active day you can enjoy the warmth of the fireplace, or cool off on the covered terrace after the sauna, gazing at the peaceful scenery. The area and the implementation of the cabin are sure to satisfy even the most demanding taste.",
  closing:
    "Renting a cabin in Levi is safe and reliable through us. We welcome you and your party to enjoy high-quality surroundings in Levi all year round!",
} as const;

export const enCabin: PageContent = {
  lang: "en",
  slug: "/en/cabin/",
  title: "Cabin - Hiihtogreeni",
  description:
    "Hiihtogreeni is a log duplex cabin in Levi with two 14-person apartments. All amenities, private bathroom in every bedroom, wheelchair access downstairs, and a top location by the pistes.",
  h1: "Rental cabin, Levi",
  nav: EN_NAV,
  external: EXTERNAL_LINKS,
};

export const enCabinSections = {
  lead:
    "Hiihtogreeni has all the amenities you'll need for a perfect, luxurious stay in Lapland in a top location.",
  intro:
    "Hiihtogreeni is a log-framed duplex rental cabin in Levi consisting of two 14-person apartments. The house was built in 2006 and it is located next to the golf course and the northeast pistes near beautiful lake and fell landscapes. You can reach beautiful tracks and slopes just 200 m away, and in summer you have a view of the Levi Golf course and its clubhouse. You can ride a snowmobile right out of the yard of the cabin. The Kittilä airport is approximately 16 km or 20 minutes away by car. The SkiBussi bus can take you to the Levi ski center, 4 km away, in a few minutes. In summer, free city bikes are available in the yard of Levi Golf, just a couple of hundred meters away.",
  introAfter:
    "Our rental cabin in Levi contains all the amenities you'll need, from dishes to a washing machine. The building also contains a convenient conference room/dining room, for example for club meetings or other events. Beautiful and unique details have been used in the interiors. Check out the features of the cabin in more detail and book the best accommodation for your group. Contact us!",
  apartments: [
    "Two 14-person apartments which can be booked together or separately",
    "Surface area about 150 m² / apartment",
    "On two levels",
  ],
  bedrooms: [
    "Six bedrooms on the upper floor:",
    "4 double/twin rooms",
    "2 single rooms",
    "All with private bathrooms",
    "One double/twin bedroom downstairs",
    "The downstairs rooms are also wheelchair accessible",
    "Luxurious 90 x 200 cm beds with spring mattresses",
  ],
  livingKitchen: [
    "Spacious living room",
    "Television",
    "Sauna (electric) with covered terrace for breaks",
    "Private bathrooms with toilet and shower in each bedroom",
    "Wireless broadband",
    "Spacious kitchen off living room",
    "Refrigerator and freezer",
    "Dishwasher",
    "Dining table for 12 people",
    "Teema dishware",
    "Dish-drying cabinet",
    "Washing machine",
    "Tumble dryer",
  ],
  special: [
    "Heat-storing fireplace of fell stone designed by Eero Mattanen",
    "Conference/dining room for 24 people – If the whole building is booked by the same group, this room is provided free. The room has a video projector, screen and mini-kitchen. If necessary, we can arrange special events with local service providers.",
    "Basement: separate approx. 60 m² room and two rooms for group work, etc. (please ask about a special lease for the rental of these spaces).",
    "Storage building with firewood and an unheated garage (ask about garage rental separately). The garage has 1- and 3-phase sockets for charging a car.",
    "Car-heating sockets (3/apartment). Charging a car from the sockets is prohibited.",
  ],
} as const;

export const enRates: PageContent = {
  lang: "en",
  slug: "/en/rates/",
  title: "Rates - Hiihtogreeni",
  description:
    "Levin Hiihtogreeni Oy's accommodation rates by season. Ask for availability and prices. Rates include end-of-stay cleaning and 13.5% VAT.",
  h1: "Rates",
  nav: EN_NAV,
  external: EXTERNAL_LINKS,
};

export const enRatesSections = {
  lead: "Levin Hiihtogreeni Oy's accommodation pricing",
  askLead: "Ask for availability and prices",
  askNote: "Please ask daily and weekend rates.",
  capacityNote:
    "Prices are for one apartment for 14 (max 14) people. The house has 2 similar apartments.",
  meetingNote:
    "Between the apartments there is a 24-person conference/dining room. It can be booked separately with one apartment. If both apartments are booked, the room is included in the price.",
  seasons: [
    {
      title: "A - High Season",
      note: "Prices include cleaning at the end of the stay.",
      weeks: "Weeks 51-53, 01, 8-16 (varies slightly year to year)",
      changeover: "Changeover day: Saturday; weeks 11-16 Sunday",
      holiday: "May vary on public holidays",
    },
    {
      title: "B - Snow time and autumn",
      note: "Prices include cleaning at the end of the stay.",
      weeks: "Weeks 17-18, 35-39, 44-50, 3-6",
      changeover: "Changeover day: Saturday",
      holiday: "Please also ask about individual days",
    },
    {
      title: "C - Reduced price period",
      note: "Prices include cleaning at the end of the stay.",
      weeks: "Rest of the Year (including golfing season weeks 25-34)",
      changeover: "Changeover day: by agreement",
      holiday: "",
    },
  ],
  terms: [
    "Prices always include cleaning at the end of the stay",
    "Bed linen: 10 € / set",
    "Beds made: 25 € / set",
    "If renting the whole house (both apartments) the price also includes meeting/dining room for 24 people with end-of-stay cleaning",
    "All prices include 13.5% VAT on accommodation services",
    "Terms of payment: 30% when reserving, rest 60 days before accommodation",
  ],
  termsNote: "Ask for general accommodation conditions by e-mail.",
  greenFeeLead: "Levi Golf Green Fees",
  greenFee:
    "Hiihtogreeni offers competitively priced green fees for Levi Golf, starting from just €26 per green fee. Purchase your green fees conveniently through our booking form. After your purchase, you'll receive an order confirmation and details about your green fees directly via email. You can buy up to 7 green fees for the same day.",
  greenFeeCta: "Buy your Levi Golf green fees here",
} as const;

export const enGallery: PageContent = {
  lang: "en",
  slug: "/en/photo-gallery/",
  title: "Photo Gallery - Hiihtogreeni",
  description:
    "Browse the Hiihtogreeni photo gallery: cabin, apartments, conference room, ski maintenance facilities and the beach at Levijärvi in Levi.",
  h1: "Photo Gallery",
  nav: EN_NAV,
  external: EXTERNAL_LINKS,
};

export const enGallerySections = {
  lead: "Cabin in Levi",
  intro:
    "Check it out, fall in love with it and book your perfect vacation in Lapland! Hiihtogreeni is a cabin in Levi with two 14-person apartments. This high-quality duplex has all that corporate groups and other groups need. The icing on the cake of your stay will be the gorgeous fell, golf course and lake view in a perfect location.",
} as const;

export const enGalleryImages: GalleryImage[] = [
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-1.jpg", alt: "Dining table for 12", caption: "Dining table for 12" },
  { src: "/wp-content/uploads/2024/07/Levi-Majoitus-suuri-olohuone-Hiihtogreeni.jpg", alt: "Large living room with fell views", caption: "Large living room with fell views" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-10.jpg", alt: "Bathroom in every room", caption: "Bathroom in every room" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-2.jpg", alt: "Well equipped kitchen", caption: "Well equipped kitchen" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-3.jpg", alt: "Bedroom" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-4.jpg", alt: "Open space" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-5.jpg", alt: "Spacious Rooms", caption: "Spacious Rooms" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-7.jpg", alt: "Spacious room w/ ensuite", caption: "Spacious room w/ ensuite" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-6.jpg", alt: "Sauna", caption: "Sauna" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-8.jpg", alt: "Finnish timber", caption: "Finnish timber" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-9.jpg", alt: "Rooms", caption: "Rooms" },
  { src: "/wp-content/uploads/2022/10/Hgr3dalakerta.jpg", alt: "Ground floor plan", caption: "Ground floor plan" },
  { src: "/wp-content/uploads/2022/10/Hgr3dylakerta.jpg", alt: "First floor plan", caption: "First floor plan" },
  { src: "/wp-content/uploads/2024/07/Mokki-Levi-Hiihtogreeni-neuvottelutila.jpg", alt: "Large conference room for 24 people", caption: "Large conference room for 24 people" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-29-of-32.jpg", alt: "Plenty of parking space", caption: "Plenty of parking space" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-1.jpg", alt: "Exterior view" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-4Text.jpg", alt: "Location text" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-8.jpg", alt: "Exterior view 2" },
  { src: "/wp-content/uploads/2024/07/Hiihtogreeni-sopii-alppihiihto-ja-maastohiihtojoukkueille.jpg", alt: "Warm ski maintenance facilities for teams and large groups", caption: "Warm ski maintenance facilities for teams and large groups" },
  { src: "/wp-content/uploads/2024/07/Isot-tilat-suksien-huoltoon-maajoukkueille-ja-seuroille-Levilla.jpg", alt: "Maintenance space in warm basement for teams", caption: "Maintenance space in warm basement for teams" },
  { src: "/wp-content/uploads/2024/07/Large-and-warm-space-for-ski-maintenance.jpg", alt: "Large and warm space for ski maintenance", caption: "Large and warm space for ski maintenance" },
  { src: "/wp-content/uploads/2024/07/Lahella-mokkia-on-Levijarven-uimaranta.jpg", alt: "Levijärvi beach during summertime is great for relaxing", caption: "Levijärvi beach during summertime is great for relaxing" },
  { src: "/wp-content/uploads/2024/07/Levijarven-hiekkaranta-lahella-mokkia.jpg", alt: "Beach at Levijärvi near the cabin", caption: "Beach at Levijärvi near the cabin" },
];

export const enContact: PageContent = {
  lang: "en",
  slug: "/en/contact-information/",
  title: "Contact Information - Hiihtogreeni",
  description:
    "Contact Hiihtogreeni: Levin Hiihtogreeni Oy, Puttipolku 4, 99130 LEVI, Finland. Cabin rental Karo Tammela, maintenance Jens Pitkänen.",
  h1: "Contact Information",
  nav: EN_NAV,
  external: EXTERNAL_LINKS,
};

export const enContactSections = {
  lead: "Stay in Hiihtogreeni",
  intro:
    "You'll get the best location and high-level accommodation. The cabin is located right by the northeast pistes and Levi Golf. The Kittilä airport is approximately 16 km or 20 minutes away by car. The duplex cabin has two 14-person apartments. Read about the cabin in full and book a great vacation for your group in Lapland!",
  formFields: [
    { id: "name", label: "Name", type: "text" },
    { id: "email", label: "E-mail", type: "email" },
    { id: "phone", label: "Phone", type: "tel" },
    { id: "message", label: "Message", type: "textarea" },
  ],
  consentLabel: "I agree to be sent offers and information in the future",
  contactMethodLabel: "Type",
  contactMethods: ["By e-mail", "By text message"],
} as const;
