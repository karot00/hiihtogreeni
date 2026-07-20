import type { NavItem, PageContent, GalleryImage, UILabels, FormStrings } from "./types.ts";
import { EXTERNAL_LINKS } from "./shared.ts";

export const FI_NAV: NavItem[] = [
  { key: "home", label: "Etusivu", href: "/" },
  { key: "cabin", label: "Mökki", href: "/mokki/" },
  { key: "gallery", label: "Kuvagalleria", href: "/kuvagalleria/" },
  { key: "rates", label: "Hinnoittelu", href: "/hinnoittelu/" },
  { key: "contact", label: "Yhteystiedot", href: "/yhteystiedot/" },
];

export const FI_UI: UILabels = {
  primaryNav: "Päävalikko",
  footerNav: "Alatunnisteen valikko",
  skipToContent: "Siirry sisältöön",
  homeLinkLabel: "Hiihtogreeni – etusivu",
  openMenu: "Avaa valikko",
  closeMenu: "Sulje valikko",
  languageSwitcher: "Vaihda kieli",
  currentPage: "(nykyinen sivu)",
  opensInNewTab: "(avautuu uuteen välilehteen)",
  footerContactHeading: "Yhteystiedot",
  footerNavHeading: "Sivut",
  footerLanguageHeading: "Kieli",
  contactCta: "Ota yhteyttä",
  cookieSettings: "Evästeasetukset",
  rightsReserved: "Kaikki oikeudet pidätetään.",
  galleryClose: "Sulje",
  galleryPrevious: "Edellinen kuva",
  galleryNext: "Seuraava kuva",
};

export const fiHome: PageContent = {
  lang: "fi",
  slug: "/",
  title: "Hiihtogreeni - Vuokramökki Levillä",
  description:
    "Hiihtogreeni on viihtyisä vuokramökki Levillä, lähellä rinteitä ja latuja. Mökki sopii perheille ja ryhmille, jopa 14 henkilöä per huoneisto.",
  h1: "Hiihtogreeni",
  nav: FI_NAV,
  external: EXTERNAL_LINKS,
};

export const fiHomeSections = {
  introLead:
    "Upea, hyvin varusteltu paritalo sijaitsee Levi Golfin ja Koillisrinteiden vieressä",
  intro:
    "Mielessä mökin vuokraus Leviltä, Lapin lumoavimmilta alueilta? Hiihtogreeni on korkeatasoinen tapa majoittua Suomen johtavaan hiihtokeskukseen isommallakin porukalla, sillä tähän hirsirakenteiseen, kaksikerroksiseen paritaloon kuuluu 2 x 14 henkilön huoneistoa kaikilla mukavuuksilla.",
  location:
    "Varustelun lisäksi modernin mökkimme sijainti on sen ehdotonta valttia – Koillisrinteiden ja golfkentän kupeesta pääsee laskettelemaan, ladulle ja golfsesonkina kentälle lähes suoraan omasta pihasta. Kittilän lentoasemalta on matkaa autolla noin 16 km eli 20 minuuttia.",
  groupsLead: "Ryhmille yrityksistä ystäviin",
  groups:
    "Vuokramökki on ihanteellinen majoitusvaihtoehto isoille ryhmille, kuten yrityksille ja hiihtoseuroille, huoneistojen välistä löytyy mm. kätevä 24 hengen neuvottelutila kokoustamiseen ja muihin tilaisuuksiin. Toki myös perheet ja ystäväporukat ovat mitä lämpimin toivotuksin tervetulleita!",
  groupsCta:
    "Katso kaikki mökin ominaisuudet (/mokki), ja kurkkaa myös kuvagallerian puolelle. Ota yhteyttä ja kysy saatavuutta! Voitte vuokrata käyttöönne koko talon tai vain toisen puolen tarpeidenne mukaan.",
  leviLink: "Mökin esittely myös: levifinland.fi",
  golfLead: "Osta Levi golf peliliput kauttamme",
  golf:
    "Hiihtogreeni myy edullisia pelilippuja Levi golfiin läpi koko golfkauden, joka alkaa usein kesäkuun alkupuolella ja päättyy syys-lokakuun vaihteessa. Hiihtogreeni on täydellinen majoitus isommallekin golf-porukalle. Ykköstiille on matkaa vain 150 m.",
  golfAfter:
    "Jälkipelit voit tulla pelaamaan mökin saunaan tai terassille tai klubitalona toimivaan ravintola Draiviin, joka palvelee myös kesäisin aamusta iltaan viikon jokaisena päivänä. Levin golfkenttä tarjoilee haastetta myös kokeneemmalle golffarille, mutta toivottaa tervetulleeksi kaikki golfarit aloittelijasta lähtien. Golfkentän yhteydessä ovat myös täysimittainen range ja hyvät harjoitusalueet lähipeliin. Levillä kannattaa myös kokea keskiyön pelikierros, sillä täällä aurinko ei laske kesällä lainkaan. Kauttamme voit ostaa 7 green feetä samalle päivälle. Green feet ovat Hiihtogreenillä aina kilpailukykyisesti hinnoiteltu.",
  golfCta: "Osta Levi golfin peliliput varauslomakkeen kautta",
  viewsLead: "Maisemat",
  views:
    "Näkymät Taalojärvelle ja Levitunturille – varaa nyt talven parhaat päivät! Maisemat tarjoilevat parastaan Hiihtogreenissä majoittuville, sillä ikkunoista avautuvat näkymät Taalojärvelle, Levitunturille sekä golfkentälle ja ensilumen ladulle. Aktiivisen päivän jälkeen voi nauttia vaikka takan lämmöstä tai saunan jälkeen katetulla terassilla vilvoitellen, rauhallisia maisemia tähyillen. Alue ja mökin toteutus vastaavat varmasti vaativampaankin makuun.",
  closing:
    "Mökin vuokraus Leviltä käy kauttamme turvallisesti ja luotettavasti. Toivotamme sinut ja seurueesi tervetulleeksi nauttimaan Levin ympäri vuoden laadukkaisiin puitteisiin!",
} as const;

export const fiCabin: PageContent = {
  lang: "fi",
  slug: "/mokki/",
  title: "Mökki - Hiihtogreeni",
  description:
    "Hiihtogreeni on hirsirakenteinen paritalo Levillä kahdella 14 hengen huoneistolla. Kaikki mukavuudet, oma kylpyhuone jokaisessa makuuhuoneessa ja huippusijainti rinteiden vieressä.",
  h1: "Vuokramökki, Levi",
  nav: FI_NAV,
  external: EXTERNAL_LINKS,
};

export const FI_FORM_STRINGS = {
  required: "Tämä kenttä on pakollinen.",
  emailInvalid: "Syötä kelvollinen sähköpostiosoite.",
  tooMany: "Liikaa lähetyksiä. Odota hetki ja yritä uudelleen.",
  serverError: "Viestin lähettäminen epäonnistui. Yritä hetken kuluttua uudelleen.",
  connectionError: "Viestin lähettäminen epäonnistui. Tarkista yhteys ja yritä uudelleen.",
  submit: "Lähetä viesti",
  sending: "Lähetetään…",
  success: "Kiitos! Viestisi on lähetetty. Olemme yhteydessä pian.",
  optional: "(valinnainen)",
} satisfies FormStrings;

export const fiCabinSections = {
  lead:
    "Hiihtogreenissä on kaikki mukavuudet täydelliseen ja tasokkaaseen loma-asumiseen Lapissa, huippusijaintia unohtamatta",
  intro:
    "Hiihtogreeni on hirsirakenteinen paritalo-vuokramökki Levillä, jossa on kaksi 14 hengen huoneistoa. Talo on rakennettu vuonna 2006, ja se sijaitsee golfkentän ja Koillisrinteiden vieressä, kauniiden järvi- ja tunturimaisemien äärellä. Tavoitat upeat ladut ja rinteet vain 200 m päästä, ja kesällä eteesi avautuu Taalojärvi ja golfkenttä klubirakennuksineen. Vain muutaman kilometrin päästä löytyy Levijärven yleinen uimaranta. Kittilän lentoasemalta on matkaa autolla noin 16 km eli 20 minuuttia. Levikeskukseen, 4 km päähän, kuljettaa SkiBussi muutamassa minuutissa. Kesällä ilmaiset kaupunkipyörät ovat tarjolla Levi Golfin pihassa parin sadan metrin päässä.",
  introAfter:
    "Vuokramökki Levillä sisältää kaikki tarvittavat varusteet astioista pyykinpesukoneeseen, talossa on myös kätevä neuvottelu-/ruokailutila esimerkiksi yritysten tai seurojen kokouksiin ja muihin tilaisuuksiin. Sisustusratkaisuissa on käytetty kauniita, uniikkeja yksityiskohtia. Katso mökin tarkemmat ominaisuudet ja varaa ryhmällesi paras majoitus – ota yhteyttä!",
  apartments: [
    "Kaksi 14 hengen huoneistoa, vuokrattavissa erikseen tai yhdessä",
    "Pinta-ala noin 150 m² / huoneisto",
    "Kahdessa tasossa",
  ],
  bedrooms: [
    "Kuusi makuuhuonetta yläkerrassa:",
    "Kahden hengen huoneita 4 kpl",
    "Yhden hengen huoneita 2 kpl",
    "Kaikilla on oma kylpyhuone",
    "Yksi makuuhuone alakerrassa (kahdelle hengelle)",
    "Ylelliset 90 x 200 cm joustinsängyt",
  ],
  livingKitchen: [
    "Tilava olohuone",
    "Televisio",
    "Saunaosasto (sähkösauna) katetulla vilvoitteluterassilla",
    "Oma kylpyhuone wc:llä ja suihkulla jokaisessa makuuhuoneessa",
    "Langaton laajakaista",
    "Tupakeittiö",
    "Jääkaappi + pakastin",
    "Astianpesukone",
    "Ruokapöytä 12 hengelle",
    "Teema-astiasto",
    "Kuivauskaappi",
    "Pyykinpesukone",
    "Kuivausrumpu",
  ],
  special: [
    "Varaava, tunturikivitakka (suunnittelija Eero Mattanen)",
    "Neuvottelu-/ruokailutila 24 hengelle – mikäli koko talo on varattu samalle ryhmälle, tila veloituksetta käyttöön. Tilassa on videotykki, valkokangas ja minikeittiö. Järjestämme tarvittaessa erilaiset tilaisuudet paikallisten palveluntarjoajien kanssa.",
    "Kellarikerroksessa erillinen n. 60 m² tila ja kaksi huonetta ryhmätyö- tms. käyttöön (kysy näiden tilojen vuokrausta erillisen sopimuksen mukaan).",
    "Varastorakennus, jossa takkapuut ja kylmä autotalli (kysy autotallin vuokrausta erikseen). Autotallissa 1- ja 3-vaihepistorasiat auton latausta varten.",
    "Autolämmityspistokkeet (3 kpl/huoneisto). Auton lataaminen pistorasioista kielletty.",
  ],
} as const;

export const fiRates: PageContent = {
  lang: "fi",
  slug: "/hinnoittelu/",
  title: "Hinnoittelu - Hiihtogreeni",
  description:
    "Levin Hiihtogreeni Oy:n majoitushinnoittelu kausittain. Kysy saatavuus ja tarjous. Hinnat sisältävät loppusiivouksen ja 13,5 % ALV:n.",
  h1: "Hinnoittelu",
  nav: FI_NAV,
  external: EXTERNAL_LINKS,
};

export const fiRatesSections = {
  lead: "Levin Hiihtogreeni Oy:n hinnoittelu",
  askLead: "Kysy saatavuus ja tarjous",
  askNote: "Kysy myös vuorokausi- ja viikonloppuhintoja!",
  capacityNote:
    "Hiihtogreenissä on kaksi 14 hengen huoneistoa. Vuokrataan erikseen tai yhdessä.",
  meetingNote:
    "Lisäksi huoneistojen välissä on 24 hengen neuvottelu/ruokailutila. Tilan voi varata yhden huoneiston varauksen yhteydessä erikseen. Mikäli varataan molemmat huoneistot, tila sisältyy hintaan.",
  seasons: [
    {
      title: "A - Korkeasesonki",
      note: "Hinnat sisältävät loppusiivouksen.",
      weeks: "Yleensä viikot 51-53, 01, 8-16",
      changeover: "Vaihtopäivä: lauantai, viikot 11-16 sunnuntai",
      holiday: "Juhlapyhinä saattavat vaihdella",
    },
    {
      title: "B - Lumiaika ja ruska",
      note: "Hinnat sisältävät loppusiivouksen.",
      weeks: "Viikot 17-18, 35-39, 44-50, 03-06",
      changeover: "Vaihtopäivä: lauantai",
      holiday: "Kysy myös yksittäisiä päiviä",
    },
    {
      title: "C - Alennettu hintakausi (myös golf-aika viikot 25-34)",
      note: "Hinnat sisältävät loppusiivouksen.",
      weeks: "Muu osa vuodesta",
      changeover: "Vaihtopäivä: sopimuksen mukaan",
      holiday: "",
    },
  ],
  terms: [
    "Kaikki hinnat sisältävät aina loppusiivouksen",
    "Voit varata myös liinavaatteet (sisältää kylpypyyhe ja vuodevaatteet) huoneisiin tuotuina, tai vuoteet pedattuina",
    "Mikäli vuokrataan koko talo (molemmat huoneistot), hintaan sisältyy myös 24 henkilön neuvottelu/ruokailutilan käyttö loppusiivouksineen",
    "Kaikki hinnat sisältävät majoituspalveluiden arvonlisäveron 13,5%",
    "Maksuehdot: 30% varattaessa, loput 60 pv ennen majoitusta",
  ],
  termsNote: "Kysy lisätietoja puhelimella tai s-postilla",
  greenFeeLead: "Levi Golf Green fee",
  greenFee:
    "Levin Hiihtogreeni myy pelilippuja edullisesti Levi golfiin. Alkaen 27 € / green fee. Osta peliliput kätevästi varauslomakkeella. Saat tilausvahvistuksen ja tiedot pelilipuista suoraan sähköpostiisi oston jälkeen. Voit ostaa samalle päivälle jopa 7 pelilippua.",
  greenFeeCta: "Osta pelilippusi Levi golfiin tästä",
} as const;

export const fiGallery: PageContent = {
  lang: "fi",
  slug: "/kuvagalleria/",
  title: "Kuvagalleria - Hiihtogreeni",
  description:
    "Tutustu Hiihtogreeniin kuvagalleriassa: mökki, huoneistot, neuvottelutila, suksihuoltotilat ja Levijärven ranta Levillä.",
  h1: "Kuvagalleria",
  nav: FI_NAV,
  external: EXTERNAL_LINKS,
};

export const fiGallerySections = {
  lead: "Mökki Levillä",
  intro:
    "Tutustu, ihastu ja varaa parhaat lomapäivät Lappiin! Hiihtogreeni on mökki Levillä, johon kuuluu kaksi 14 hengen huoneistoa. Tämä tasokas paritalo sisältää kaikki mukavuudet yrityksille ja muille ryhmille. Asumisen kruunaa upea tunturi-, golfkenttä- ja järvinäkymä täydellisellä sijainnilla. Mökistä löytyy myös suuri suksien ja pyörien huoltotila, joka on erikseen varattavissa. Yleinen uimarantakin löytyy muutaman kilometrin päästä Levijärveltä.",
} as const;

export const fiGalleryImages: GalleryImage[] = [
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-1.jpg", alt: "12 hengen ruokapöytä", caption: "12 hengen ruokapöytä" },
  { src: "/wp-content/uploads/2024/07/Levi-Majoitus-suuri-olohuone-Hiihtogreeni.jpg", alt: "Iso olohuone tunturinäkymin", caption: "Iso olohuone tunturinäkymin" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-10.jpg", alt: "Jokaisella huoneella oma kylpyhuone", caption: "Jokaisella huoneella oma kylpyhuone" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-2.jpg", alt: "Hyvin varusteltu keittiö", caption: "Hyvin varusteltu keittiö" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-3.jpg", alt: "Makuuhuone" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-4.jpg", alt: "Avoin tila" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-5.jpg", alt: "Tilavat huoneet", caption: "Tilavat huoneet" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-7.jpg", alt: "Tilava huone omalla kylpyhuoneella", caption: "Tilava huone omalla kylpyhuoneella" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-6.jpg", alt: "Sauna", caption: "Sauna" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-8.jpg", alt: "Suomalaista puuta", caption: "Suomalaista puuta" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-9.jpg", alt: "Huoneet", caption: "Huoneet" },
  { src: "/wp-content/uploads/2022/10/Hgr3dalakerta.jpg", alt: "Pohjakuva alakerta", caption: "Pohjakuva alakerta" },
  { src: "/wp-content/uploads/2022/10/Hgr3dylakerta.jpg", alt: "Pohjakuva yläkerta", caption: "Pohjakuva yläkerta" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-29-of-32.jpg", alt: "Runsaasti pysäköintitilaa", caption: "Runsaasti pysäköintitilaa" },
  { src: "/wp-content/uploads/2025/07/Points-of-interest-Hiihtogreeni-summer.jpg", alt: "Kiinnostavat kohteet – kesäkartta", caption: "Kiinnostavat kohteet – kesäkartta" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-1.jpg", alt: "Ulkonäkymä" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-8.jpg", alt: "Ulkonäkymä 2" },
  { src: "/wp-content/uploads/2025/07/Points-of-interest-Hiihtogreeni-winter.jpg", alt: "Kiinnostavat kohteet – talvikartta", caption: "Kiinnostavat kohteet – talvikartta" },
  { src: "/wp-content/uploads/2024/07/Mokki-Levi-Hiihtogreeni-neuvottelutila.jpg", alt: "Suuri neuvottelutila 24 hengelle", caption: "Suuri neuvottelutila 24 hengelle" },
  { src: "/wp-content/uploads/2024/07/Large-and-warm-space-for-ski-maintenance.jpg", alt: "Suksien huoltotila kellarissa varattavissa erikseen", caption: "Suksien huoltotila kellarissa varattavissa erikseen" },
  { src: "/wp-content/uploads/2024/07/Isot-tilat-suksien-huoltoon-maajoukkueille-ja-seuroille-Levilla.jpg", alt: "Isot tilat suksien huoltoon maajoukkueille ja seuroille Levillä", caption: "Isot tilat suksien huoltoon maajoukkueille ja seuroille Levillä" },
  { src: "/wp-content/uploads/2024/07/Majoitus-Levilla-isolla-suksien-huoltotilalla.jpg", alt: "Suksien voitelutelineet kuuluvat huoltotilan varustukseen", caption: "Suksien voitelutelineet kuuluvat huoltotilan varustukseen" },
  { src: "/wp-content/uploads/2024/07/Hiihtogreeni-sopii-alppihiihto-ja-maastohiihtojoukkueille.jpg", alt: "Lämpimät suksien huoltotilat joukkueille ja isoille ryhmille", caption: "Lämpimät suksien huoltotilat joukkueille ja isoille ryhmille" },
  { src: "/wp-content/uploads/2024/07/Lahella-mokkia-on-Levijarven-uimaranta.jpg", alt: "Levijärven ranta kesällä virkistää", caption: "Levijärven ranta kesällä virkistää" },
  { src: "/wp-content/uploads/2024/07/Levijarven-hiekkaranta-lahella-mokkia.jpg", alt: "Levijärven hiekkaranta lähellä mökkiä", caption: "Levijärven hiekkaranta lähellä mökkiä" },
];

export const fiContact: PageContent = {
  lang: "fi",
  slug: "/yhteystiedot/",
  title: "Yhteystiedot - Hiihtogreeni",
  description:
    "Ota yhteyttä Hiihtogreeniin: Levin Hiihtogreeni Oy, Puttipolku 4, 99130 LEVI. Vuokraus Karo Tammela, huolto Jens Pitkänen.",
  h1: "Yhteystiedot",
  nav: FI_NAV,
  external: EXTERNAL_LINKS,
};

export const fiContactSections = {
  lead: "Vuokramökki, Levi",
  intro:
    "Saat parhaan sijainnin ja korkeatasoiset asumispuitteet. Mökki sijaitsee aivan Koillisrinteiden ja Levi Golfin kupeessa. Kittilän lentoasemalta on matkaa autolla noin 16 km eli 20 minuuttia. Paritalossa on kaksi 14 hengen huoneistoa. Katso tarkemmat mökin tiedot ja vuokraa ryhmällesi loistokas loma Lapissa!",
  formFields: [
    { id: "name", label: "Nimi", type: "text" },
    { id: "email", label: "Sähköposti", type: "email" },
    { id: "phone", label: "Puhelin", type: "tel" },
    { id: "message", label: "Viesti", type: "textarea" },
  ],
  consentLabel: "Minulle saa lähettää tarjouksia ja informaatiota tulevaisuudessa",
  contactMethodLabel: "Tyyppi",
  contactMethods: ["Sähköpostitse", "Tekstiviestillä"],
} as const;
