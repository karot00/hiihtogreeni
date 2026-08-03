import type { NavItem, PageContent, GalleryImage, UILabels, FormStrings, CookieConsentCopy } from "./types.ts";
import { EXTERNAL_LINKS } from "./shared.ts";

export const EN_NAV: NavItem[] = [
  { key: "home", label: "Home", href: "/en/home/" },
  { key: "cabin", label: "Cabin", href: "/en/cabin/" },
  { key: "teams", label: "For Teams", href: "/en/teams/" },
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
  rightsReserved: "All rights reserved.",
  galleryClose: "Close",
  galleryPrevious: "Previous image",
  galleryNext: "Next image",
  carouselLabel: "Photos of Hiihtogreeni and Levi",
  carouselSlide: "Slide",
};

export const EN_COOKIE_CONSENT: CookieConsentCopy = {
  banner: {
    ariaLabel: "Cookie notice",
    eyebrow: "Cookies",
    title: "Cookies on this site",
    description:
      "We use one essential cookie to store your cookie choice. Optional analytics cookies are used only with your consent.",
    acceptAll: "Accept all",
    rejectNonEssential: "Essential only",
    manageSettings: "Cookie settings",
  },
  preferences: {
    eyebrow: "Cookies",
    title: "Cookie settings",
    description:
      "Choose which cookie categories this site may use. Essential cookies are always active.",
  },
  categories: {
    essential: {
      title: "Essential",
      description:
        "Required for basic site functions, such as storing your cookie choice. These cannot be turned off.",
    },
    functional: {
      title: "Functional",
      description:
        "Would remember choices such as language preferences. This site currently uses no functional cookies.",
    },
    analytics: {
      title: "Analytics",
      description:
        "Help us understand how the site is used (Google Analytics). Used only with your consent.",
    },
    marketing: {
      title: "Marketing",
      description:
        "Would be used for advertising. This site currently uses no marketing cookies.",
    },
    alwaysActive: "Always active",
    optional: "Optional",
  },
  inventory: {
    detailsLabel: "Show cookies",
    name: "Name",
    provider: "Provider",
    purpose: "Purpose",
    duration: "Duration",
    emptyCategory:
      "No cookies or other technologies are in use in this category.",
    deferredNote: "(not yet in use)",
    items: {
      hg_consent: {
        purpose: "Stores your cookie consent choice for this site",
        duration: "180 days",
      },
      ga: {
        purpose: "Google Analytics: distinguishes visitors",
        duration: "2 years",
      },
      ga_session: {
        purpose: "Google Analytics: keeps session state",
        duration: "2 years",
      },
    },
  },
  actions: {
    cancel: "Cancel",
    rejectNonEssential: "Essential only",
    acceptAll: "Accept all",
    savePreferences: "Save preferences",
  },
  settingsTrigger: "Cookie settings",
  settingsTriggerAriaLabel: "Open cookie settings",
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
    "A rental cabin is an ideal accommodation option for groups, such as corporate groups or skiing parties. Between the apartments there is a convenient 20-person conference room for meetings and other events. Naturally, families and groups of friends are also warmly welcome!",
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

export const enHomeCarousel: GalleryImage[] = [
  { src: "/wp-content/uploads/2026/07/northern_lights_levi_hiihtogreeni.jpg", alt: "Northern lights over Hiihtogreeni in Levi", width: 1814, height: 1021, caption: "Northern lights over Hiihtogreeni" },
  { src: "/wp-content/uploads/2026/07/rental_cabin_for_large_groups_levi_golf_course.jpg", alt: "Large rental cabin for groups by the golf course", width: 1440, height: 810, caption: "Large rental cabin for groups by the golf course" },
  { src: "/wp-content/uploads/2026/07/excellent_ski_maintenance_room_levi_hiihtogreeni.jpg", alt: "Excellent ski maintenance room at Hiihtogreeni", width: 1613, height: 907, caption: "Excellent ski maintenance room" },
  { src: "/wp-content/uploads/2024/07/Mokki-Levi-Hiihtogreeni-neuvottelutila.jpg", alt: "Large conference room for up to 20 people", width: 2160, height: 1216, caption: "Large conference room for up to 20 people" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-29-of-32.jpg", alt: "Plenty of parking space", width: 1024, height: 682, caption: "Plenty of parking space" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-1.jpg", alt: "Dining table for 12", width: 800, height: 533, caption: "Dining table for 12" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-4.jpg", alt: "Well equipped kitchen", width: 800, height: 533, caption: "7 bedrooms with ensuite on both apartments" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-6.jpg", alt: "Sauna", width: 800, height: 533, caption: "Sauna" },
];

export const enCabin: PageContent = {
  lang: "en",
  slug: "/en/cabin/",
  title: "Cabin - Hiihtogreeni",
  description:
    "Hiihtogreeni is a log duplex cabin in Levi with two 14-person apartments. All amenities, private bathroom in every bedroom, and a top location by the pistes.",
  h1: "Rental cabin, Levi",
  nav: EN_NAV,
  external: EXTERNAL_LINKS,
};

export const EN_FORM_STRINGS = {
  required: "This field is required.",
  emailInvalid: "Enter a valid e-mail address.",
  tooMany: "Too many attempts. Please wait a moment and try again.",
  serverError: "Sending the message failed. Please try again shortly.",
  connectionError: "Sending the message failed. Check your connection and try again.",
  submit: "Send message",
  sending: "Sending…",
  success: "Thank you! Your message has been sent. We will be in touch soon.",
  optional: "(optional)",
} satisfies FormStrings;

export const enCabinSections = {
  lead:
    "Hiihtogreeni has all the amenities you'll need for a perfect, luxurious stay in Lapland in a top location.",
  intro:
    "Hiihtogreeni is a log-framed duplex rental cabin in Levi consisting of two 14-person apartments. The house was built in 2006 and it is located next to the golf course and the northeast pistes near beautiful lake and fell landscapes. You can reach beautiful tracks and slopes just 200 m away, and in summer you have a view of the Levi Golf course and its clubhouse. You can ride a snowmobile right out of the yard of the cabin. The Kittilä airport is approximately 16 km or 20 minutes away by car. The SkiBussi bus can take you to the Levi ski center, 4 km away, in a few minutes.",
  introAfter:
    "Our rental cabin in Levi contains all the amenities you'll need, from dishes to a washing machine. The building also contains a convenient conference room/dining room, for example for club meetings or other events. Beautiful and unique details have been used in the interiors. Check out the features of the cabin in more detail and book the best accommodation for your group. Contact us!",
  apartments: [
    "Two 14-person apartments which can be booked together or separately",
    "Surface area about 150 m² / apartment",
    "On two levels",
  ],
  apartmentNames: ["Apartment A", "Apartment B"],
  apartmentFacts: [
    { value: "14", label: "Beds" },
    { value: "7", label: "Bedrooms" },
    { value: "7", label: "Bathrooms" },
    { label: "Sauna, kitchen and living room" },
  ],
  bedrooms: [
    "Six bedrooms on the upper floor:",
    "2 rooms with bunk beds",
     "4 double/twin bedrooms",
    "All with private bathrooms",
    "One double/twin bedroom downstairs",
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
    "Conference/dining room for 20 people – If the whole building is booked by the same group, this room is provided free. The room has a video projector, screen and mini-kitchen. If necessary, we can arrange special events with local service providers.",
    "Basement: separate approx. 50 m² warm ski/sports equipment maintenance room (please ask about a special lease for the rental of this space).",
    "Storage building with firewood and an unheated garage (ask about garage rental separately). The garage has 1- and 3-phase sockets for charging a car.",
    "Car-heating sockets (2/apartment). Charging an EV from the socket is prohibited.",
  ],
} as const;

export const enTeams: PageContent = {
  lang: "en",
  slug: "/en/teams/",
  title: "For Teams - Hiihtogreeni",
  description:
    "A Levi cabin built for ski teams and sports groups: sleeps 14 or 28, a private bathroom in every bedroom, a 20-seat briefing room and a 50+ m² warm ski maintenance room, steps from the slopes. Ask about availability.",
  h1: "Large semi-detached cabin for sports clubs and teams in Levi",
  nav: EN_NAV,
  external: EXTERNAL_LINKS,
};

export const enTeamsSections = {
  heroLead:
    "Space for groups of 14 or up to 28 people, private warm maintenance facilities for skis and sports equipment, and slopes and ski tracks just steps away.",
  introLead: "A track record with teams",
  intro:
    "Hiihtogreeni regularly hosts alpine and cross-country ski teams, clubs and national squads. The well-equipped duplex gives the whole team calm, high-quality surroundings for preparation, recovery and time together – all right next to the Levi slopes and tracks.",
  introParagraphs: [
    "Everything is built so your team can focus on what matters – training and team spirit. That is why accommodation, equipment care and short transfers all come together in one place. Whether it is a weekend race trip or a multi-week training camp, the setup is made for the day-to-day of elite sport.",
    "In Levi, alpine and cross-country ski training gets underway with guaranteed snow as early as the beginning of October, and the season lasts all the way until May.",
    "Book top-tier facilities for your entire team for the Levi World Cup, which takes place on November 13–15, 2026.",
    "In summer, the accommodation is perfect for golf groups or cycling teams. The first tee is only a couple of hundred meters away, and mountain biking trails run right next to the cabin.",
  ],
  useCasesLead: "Who Hiihtogreeni is for",
  useCasesTitle: "Hiihtogreeni is built for teams",
  useCases: [
    {
      title: "Alpine ski teams",
      text: "The warm, spacious ski maintenance room is right where you stay – waxing benches are ready and the whole team's gear stays indoors. The slopes are just a few minutes' walk away.",
    },
    {
      title: "Cross-country and biathlon teams",
      text: "Ski tracks start straight from the yard, and the open maintenance room suits glide waxing and drying equipment. A quiet setting supports recovery and good sleep.",
    },
    {
      title: "Clubs and national squads",
      text: "Two 14-guest apartments and a shared briefing room form a practical base for training camps, junior national squads and club coaching. The whole house can be booked exclusively for one group.",
    },
    {
      title: "Training camps and school groups",
      text: "The briefing room for video review, a private kitchen and a calm location also make Hiihtogreeni a fit for school sport, educational and corporate group camps.",
    },
    {
      title: "Mountain biking teams & cyclists",
      text: "Mountain biking trails run right next to the cabin. The warm and spacious equipment maintenance room is ideal for servicing, washing, and storing bikes between rides.",
    },
    {
      title: "Golf groups",
      text: "Located right by Levi Golf, the cabin is ideal for golf groups: the first tee is only about 200 meters away. After your rounds, there is plenty of space for socializing, sauna, and relaxation.",
    },
  ],
  whyLead: "Why Hiihtogreeni",
  whyTitle: "The whole team under one roof",
  why: [
    "7 bedrooms and 7 bathrooms per apartment.",
    "Your own 50+ m² warm ski and sports equipment maintenance room inside the cabin – not an outdoor shed or shared basement.",
    "Sleeps 14 or 28 in one place.",
    "A 20-seat briefing room with a projector – team talks, video review and sponsor meetings with no outside venue to book.",
    "Slopes about 200 m and tracks from the yard: training, maintenance and rest all in one spot.",
    "The whole house for one team – privacy and quiet, free of other guests.",
    "Only 16 km (about 20 min) from Kittilä airport; easy arrivals and departures.",
  ],
  faqLead: "Frequently asked by teams",
  faqTitle: "Questions about team accommodation",
  faq: [
    {
      q: "How many people can Hiihtogreeni accommodate as a team?",
      a: "Hiihtogreeni sleeps 14 in one apartment and 28 across the whole house, which is two apartments. Each apartment has 7 bedrooms, and every bedroom has its own bathroom.",
    },
    {
      q: "What is the ski maintenance room like?",
      a: "You get a 50+ m² warm, open maintenance room inside the cabin. It suits waxing and tuning benches and a full team's equipment at once – excellent for both alpine and cross-country preparation.",
    },
    {
      q: "How close are the slopes and tracks?",
      a: "It is about 200 m to the Koillisrinteet pistes, and ski tracks are reachable directly from the yard. Kittilä airport is roughly 16 km, or 20 minutes, by car.",
    },
    {
      q: "Can the whole house be booked exclusively for my team?",
      a: "Yes. The whole duplex can be rented for one team or group, in which case the conference and meeting room connecting the apartments is at your disposal free of charge.",
    },
    {
      q: "What should a team bring?",
      a: "You should bring your own tuning tables and waxing/maintenance supplies. The accommodation provides bed linen, a fully equipped kitchen, a sauna, and a heated maintenance space. The exact equipment details are confirmed when booking.",
    },
  ],
  capacityLead: "Team capacity",
  capacityTitle: "Space for the whole team",
  splitRoomsLead: "Bedrooms & bathrooms",
  splitRoomsTitle: "Space for the whole team",
  splitRooms:
    "Every bedroom has its own private bathroom – practical for athletes who need their own space and recovery routine, with no shared hallway showers. The two 14-person apartments rent separately or together, so you can house 14 or a full 28-person team with ease.",
  splitMeetingLead: "A briefing room built in",
  splitMeetingTitle: "Team talks happen on site",
  splitMeeting:
    "Between the apartments there is a 20-seat conference room for team talks, video review, sponsor meetings or coaches' briefings – no need to book an outside venue. The room has a video projector, screen and mini-kitchen, and it is included when the whole house is booked by one team.",
  maintenanceLead: "The best ski maintenance facilities in Levi",
  maintenanceTitle: "50+ m² of warm ski maintenance space",
  maintenance:
    "Hiihtogreeni's headline advantage for teams is a warm, open, 50+ m² ski maintenance room located inside the cabin – not an outdoor shed or a shared basement. It suits waxing and tuning benches and a full team's equipment at once, ideal for both alpine and cross-country preparation.",
  maintenanceGridTitle: "A closer look at the maintenance room",
  locationLead: "Location",
  locationTitle: "Steps from the slopes",
  location:
    "It is about 200 m to the Koillisrinteet pistes, and ski tracks are reachable directly from the yard. The Kittilä airport is roughly 16 km, or 20 minutes, away by car. Logistics are simple for a team: training, maintenance and accommodation in one place. Spacious illuminated yard for parking with spaces for 7 passenger cars and easy parking for larger vehicles as well. Car heating outlets for 4 cars.",
  privacyLead: "Privacy for your team",
  privacyTitle: "The whole house, exclusively yours",
  privacy:
    "The whole duplex can be rented exclusively by one team or group – no shared common areas with strangers, a private plot and quiet surroundings. The perfect environment for focus and recovery, away from the resort crowds.",
  exteriorLead: "The cabin from outside",
  exteriorTitle: "A large rental cabin for groups",
  ctaEyebrow: "Book accommodation for your team",
  ctaTitle: "Get in touch and ask about availability",
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
    "Between the apartments there is a 20-person conference/dining room. It can be booked separately with one apartment. If both apartments are booked, the room is included in the price.",
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
    "Bed linen and towels: 16 € / set",
    "Beds made: 25 € / set",
    "If renting the whole house (both apartments) the price also includes meeting/dining room for 20 people with end-of-stay cleaning",
    "All prices include 13.5% VAT on accommodation services",
    "Terms of payment: 30% when reserving, rest 60 days before accommodation",
  ],
  termsNote: "Ask for general accommodation conditions by e-mail.",
  greenFeeLead: "Levi Golf Green Fees",
  greenFee:
    "Hiihtogreeni offers competitively priced green fees for Levi Golf, starting from just €27 per green fee. Purchase your green fees conveniently through our booking form. After your purchase, you'll receive an order confirmation and details about your green fees directly via email. You can buy up to 7 green fees for the same day.",
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
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-1.jpg", alt: "Dining table for 12", width: 800, height: 533, caption: "Dining table for 12" },
  { src: "/wp-content/uploads/2024/07/Levi-Majoitus-suuri-olohuone-Hiihtogreeni.jpg", alt: "Large living room with fell views", width: 2160, height: 1250, caption: "Large living room with fell views" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-10.jpg", alt: "Bathroom in every room", width: 800, height: 534, caption: "Bathroom in every room" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-2.jpg", alt: "Well equipped kitchen", width: 800, height: 533, caption: "Well equipped kitchen" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-3.jpg", alt: "Bedroom", width: 800, height: 534 },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-4.jpg", alt: "Open space", width: 800, height: 533 },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-5.jpg", alt: "Spacious Rooms", width: 800, height: 533, caption: "Spacious Rooms" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-7.jpg", alt: "Spacious room w/ ensuite", width: 800, height: 533, caption: "Spacious room w/ ensuite" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-6.jpg", alt: "Sauna", width: 800, height: 533, caption: "Sauna" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-8.jpg", alt: "Finnish timber", width: 800, height: 533, caption: "Finnish timber" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-9.jpg", alt: "Rooms", width: 800, height: 533, caption: "Rooms" },
  { src: "/wp-content/uploads/2022/10/Hgr3dalakerta.jpg", alt: "Ground floor plan", width: 1024, height: 594, caption: "Ground floor plan" },
  { src: "/wp-content/uploads/2022/10/Hgr3dylakerta.jpg", alt: "First floor plan", width: 1024, height: 499, caption: "First floor plan" },
  { src: "/wp-content/uploads/2024/07/Mokki-Levi-Hiihtogreeni-neuvottelutila.jpg", alt: "Large conference room for up to 20 people", width: 2160, height: 1216, caption: "Large conference room for up to 20 people" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-29-of-32.jpg", alt: "Plenty of parking space", width: 1024, height: 682, caption: "Plenty of parking space" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-1.jpg", alt: "Exterior view", width: 1024, height: 681 },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-4Text.jpg", alt: "Location text", width: 1024, height: 681 },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-8.jpg", alt: "Exterior view 2", width: 1024, height: 570 },
  { src: "/wp-content/uploads/2026/07/view_from_hiihtogreeni_levi_rental_cabin_golf_course.jpg", alt: "View from Hiihtogreeni over the golf course", width: 1398, height: 719, caption: "View from Hiihtogreeni over the golf course" },
  { src: "/wp-content/uploads/2024/07/Hiihtogreeni-sopii-alppihiihto-ja-maastohiihtojoukkueille.jpg", alt: "Warm ski maintenance facilities for teams and large groups", width: 2160, height: 1216, caption: "Warm ski maintenance facilities for teams and large groups" },
  { src: "/wp-content/uploads/2024/07/Isot-tilat-suksien-huoltoon-maajoukkueille-ja-seuroille-Levilla.jpg", alt: "Maintenance space in warm basement for teams", width: 2160, height: 1216, caption: "Maintenance space in warm basement for teams" },
  { src: "/wp-content/uploads/2024/07/Large-and-warm-space-for-ski-maintenance.jpg", alt: "Large and warm space for ski maintenance", width: 2160, height: 1215, caption: "Large and warm space for ski maintenance" },
  { src: "/wp-content/uploads/2026/07/sport_equipment_maintenance_room_levi_hiihtogreeni.jpg", alt: "Sports equipment maintenance room", width: 1613, height: 907, caption: "Sports equipment maintenance room" },
  { src: "/wp-content/uploads/2024/07/Lahella-mokkia-on-Levijarven-uimaranta.jpg", alt: "Levijärvi beach during summertime is great for relaxing", width: 2160, height: 1216, caption: "Levijärvi beach during summertime is great for relaxing" },
  { src: "/wp-content/uploads/2024/07/Levijarven-hiekkaranta-lahella-mokkia.jpg", alt: "Beach at Levijärvi near the cabin", width: 2160, height: 1216, caption: "Beach at Levijärvi near the cabin" },
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
