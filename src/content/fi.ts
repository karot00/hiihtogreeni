import type { BrochureStrings, CompaniesSections, LastMinuteStrings, NavItem, PageContent, GalleryImage, UILabels, FormStrings, CookieConsentCopy } from "./types.ts";
import { EXTERNAL_LINKS, STAY_TIMES } from "./shared.ts";

const fiTime = (time: string) => time.replace(":", ".");

export const FI_NAV: NavItem[] = [
  { key: "home", label: "Etusivu", href: "/" },
  { key: "cabin", label: "Mökki", href: "/mokki/" },
  { key: "teams", label: "Joukkueille", href: "/joukkueille/" },
  { key: "companies", label: "Yrityksille", href: "/yrityksille/" },
  { key: "gallery", label: "Kuvagalleria", href: "/kuvagalleria/" },
  { key: "rates", label: "Varaa", href: "/hinnoittelu/" },
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
  footerBookingTerms: "Varausehdot",
  contactCta: "Ota yhteyttä",
  rightsReserved: "Kaikki oikeudet pidätetään.",
  agentsLabel: "Tekoälyavustajille",
  agentsApi: "Varausrajapinta (OpenAPI)",
  galleryClose: "Sulje",
  galleryPrevious: "Edellinen kuva",
  galleryNext: "Seuraava kuva",
  carouselLabel: "Kuvia Hiihtogreenistä ja Levistä",
  carouselSlide: "Kuva",
};

export const FI_COOKIE_CONSENT: CookieConsentCopy = {
  banner: {
    ariaLabel: "Evästeilmoitus",
    eyebrow: "Evästeet",
    title: "Evästeet tällä sivustolla",
    description:
      "Käytämme yhtä välttämätöntä evästettä evästevalintasi tallentamiseen. Valinnaisia analytiikkaevästeitä käytetään vain suostumuksellasi.",
    acceptAll: "Hyväksy kaikki",
    rejectNonEssential: "Vain välttämättömät",
    manageSettings: "Evästeasetukset",
  },
  preferences: {
    eyebrow: "Evästeet",
    title: "Evästeasetukset",
    description:
      "Valitse, mitä evästeluokkia sivusto saa käyttää. Välttämättömät evästeet ovat aina käytössä.",
    cookielessStats:
      "Lisäksi laskemme käyntejä evästeettömällä Umami-tilastoinnilla. Se ei tallenna evästeitä eikä IP-osoitteita, ei tarvitse suostumusta ja noudattaa selaimen Do Not Track -asetusta. Tilastopalvelinta (stats.experiencelevi.fi) ylläpitää sama omistaja EU:ssa.",
  },
  categories: {
    essential: {
      title: "Välttämättömät",
      description:
        "Tarvitaan sivuston perustoimintoihin, kuten evästevalintasi tallentamiseen. Näitä ei voi poistaa käytöstä.",
    },
    functional: {
      title: "Toiminnalliset",
      description:
        "Muistaisivat valintojasi, kuten kieliasetuksia. Sivusto ei tällä hetkellä käytä toiminnallisia evästeitä.",
    },
    analytics: {
      title: "Analytiikka",
      description:
        "Auttavat ymmärtämään sivuston käyttöä (Google Analytics). Käytetään vain suostumuksellasi.",
    },
    marketing: {
      title: "Markkinointi",
      description:
        "Käytettäisiin mainonnan kohdentamiseen. Sivusto ei tällä hetkellä käytä markkinointievästeitä.",
    },
    alwaysActive: "Aina käytössä",
    optional: "Valinnainen",
  },
  inventory: {
    detailsLabel: "Näytä evästeet",
    name: "Nimi",
    provider: "Palveluntarjoaja",
    purpose: "Käyttötarkoitus",
    duration: "Voimassaolo",
    emptyCategory:
      "Tässä luokassa ei ole käytössä evästeitä tai muita tekniikoita.",
    deferredNote: "(ei vielä käytössä)",
    items: {
      hg_consent: {
        purpose: "Tallentaa evästevalintasi tälle sivustolle",
        duration: "180 päivää",
      },
      ga: {
        purpose: "Google Analytics: erottaa kävijät toisistaan",
        duration: "2 vuotta",
      },
      ga_session: {
        purpose: "Google Analytics: säilyttää istunnon tilan",
        duration: "2 vuotta",
      },
    },
  },
  actions: {
    cancel: "Peruuta",
    rejectNonEssential: "Vain välttämättömät",
    acceptAll: "Hyväksy kaikki",
    savePreferences: "Tallenna valinnat",
  },
  settingsTrigger: "Evästeasetukset",
  settingsTriggerAriaLabel: "Avaa evästeasetukset",
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
    "Vuokramökki on ihanteellinen majoitusvaihtoehto isoille ryhmille, kuten yrityksille ja hiihtoseuroille, huoneistojen välistä löytyy mm. kätevä 20 hengen neuvottelutila kokoustamiseen ja muihin tilaisuuksiin. Toki myös perheet ja ystäväporukat ovat mitä lämpimin toivotuksin tervetulleita!",
  groupsCta:
    "Katso kaikki mökin ominaisuudet (/mokki), ja kurkkaa myös kuvagallerian puolelle. Ota yhteyttä ja kysy saatavuutta! Voitte vuokrata käyttöönne koko talon tai vain toisen puolen tarpeidenne mukaan.",
  leviLink: "Mökin esittely myös: levifinland.fi",
  golfLead: "Osta Levi golf peliliput kauttamme",
  golf:
    "Hiihtogreeni myy edullisia pelilippuja Levi golfiin läpi koko golfkauden, joka alkaa usein kesäkuun alkupuolella ja päättyy syys-lokakuun vaihteessa. Hiihtogreeni on täydellinen majoitus isommallekin golf-porukalle. Ykköstiille on matkaa vain 150 m.",
  golfAfter:
    "Jälkipelit voit tulla pelaamaan mökin saunaan tai terassille tai klubitalona toimivaan ravintola Draiviin, joka palvelee myös kesäisin aamusta iltaan viikon jokaisena päivänä. Levin golfkenttä tarjoilee haastetta myös kokeneemmalle golffarille, mutta toivottaa tervetulleeksi kaikki golfarit aloittelijasta lähtien. Golfkentän yhteydessä ovat myös täysimittainen range ja hyvät harjoitusalueet lähipeliin. Levillä kannattaa myös kokea keskiyön pelikierros, sillä täällä aurinko ei laske kesällä lainkaan. Kauttamme voit ostaa 10 green feetä samalle päivälle. Green feet ovat Hiihtogreenillä aina kilpailukykyisesti hinnoiteltu.",
  golfCta: "Osta Levi golfin peliliput varauslomakkeen kautta",
  viewsLead: "Maisemat",
  views:
    "Näkymät Taalojärvelle ja Levitunturille – varaa nyt talven parhaat päivät! Maisemat tarjoilevat parastaan Hiihtogreenissä majoittuville, sillä ikkunoista avautuvat näkymät Taalojärvelle, Levitunturille sekä golfkentälle ja ensilumen ladulle. Aktiivisen päivän jälkeen voi nauttia vaikka takan lämmöstä tai saunan jälkeen katetulla terassilla vilvoitellen, rauhallisia maisemia tähyillen. Alue ja mökin toteutus vastaavat varmasti vaativampaankin makuun.",
  closing:
    "Mökin vuokraus Leviltä käy kauttamme turvallisesti ja luotettavasti. Toivotamme sinut ja seurueesi tervetulleeksi nauttimaan Levin ympäri vuoden laadukkaisiin puitteisiin!",
} as const;

export const fiHomeCarousel: GalleryImage[] = [
  { src: "/wp-content/uploads/2026/07/northern_lights_levi_hiihtogreeni.jpg", alt: "Revontulet Hiihtogreenin yllä Levillä", width: 1814, height: 1021, caption: "Revontulet Hiihtogreenin yllä" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-29-of-32.jpg", alt: "Runsaasti pysäköintitilaa", width: 1024, height: 682, caption: "Runsaasti pysäköintitilaa" },
  { src: "/wp-content/uploads/2026/07/rental_cabin_for_large_groups_levi_golf_course.jpg", alt: "Iso vuokramökki ryhmille golfkentän laidalla", width: 1440, height: 810, caption: "Iso vuokramökki ryhmille golfkentän laidalla" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-1.jpg", alt: "12 hengen ruokapöytä", width: 800, height: 533, caption: "12 hengen ruokapöytä" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-4.jpg", alt: "Hyvin varusteltu keittiö", width: 800, height: 533, caption: "7 makuuhuonetta omalla kylpyhuoneella, molemmissa huoneistoissa" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-6.jpg", alt: "Sauna", width: 800, height: 533, caption: "Sauna" },
  { src: "/wp-content/uploads/2024/07/Mokki-Levi-Hiihtogreeni-neuvottelutila.jpg", alt: "Iso neuvottelutila jopa 20 hengelle", width: 2160, height: 1216, caption: "Iso neuvottelutila jopa 20 hengelle" },
  { src: "/wp-content/uploads/2026/07/excellent_ski_maintenance_room_levi_hiihtogreeni.jpg", alt: "Erinomainen suksien huoltotila Hiihtogreenissä", width: 1613, height: 907, caption: "Erinomainen suksien huoltotila" },
];

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
    "Hiihtogreeni on hirsirakenteinen paritalo-vuokramökki Levillä, jossa on kaksi 14 hengen huoneistoa. Talo on rakennettu vuonna 2006, ja se sijaitsee golfkentän ja Koillisrinteiden vieressä, kauniiden järvi- ja tunturimaisemien äärellä. Tavoitat upeat ladut ja rinteet vain 200 m päästä, ja kesällä eteesi avautuu Taalojärvi ja golfkenttä klubirakennuksineen. Vain muutaman kilometrin päästä löytyy Levijärven yleinen uimaranta. Kittilän lentoasemalta on matkaa autolla noin 16 km eli 20 minuuttia. Levikeskukseen, 4 km päähän, kuljettaa SkiBussi muutamassa minuutissa.",
  introAfter:
    "Vuokramökki Levillä sisältää kaikki tarvittavat varusteet astioista pyykinpesukoneeseen, talossa on myös kätevä neuvottelu-/ruokailutila esimerkiksi yritysten tai seurojen kokouksiin ja muihin tilaisuuksiin. Sisustusratkaisuissa on käytetty kauniita, uniikkeja yksityiskohtia. Katso mökin tarkemmat ominaisuudet ja varaa ryhmällesi paras majoitus – ota yhteyttä!",
  apartments: [
    "Kaksi 14 hengen huoneistoa, vuokrattavissa erikseen tai yhdessä",
    "Pinta-ala noin 150 m² / huoneisto",
    "Kahdessa tasossa",
  ],
  apartmentNames: ["Huoneisto A", "Huoneisto B"],
  apartmentFacts: [
    { value: "14", label: "Vuodepaikkaa" },
    { value: "7", label: "Makuuhuonetta" },
    { value: "7", label: "Kylpyhuonetta" },
    { label: "Sauna, keittiö ja olohuone" },
  ],
  bedrooms: [
    {
      text: "Kuusi makuuhuonetta yläkerrassa:",
      children: ["2 kerrossänkyhuonetta", "4 kahden hengen makuuhuonetta"],
    },
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
    "Neuvottelu-/ruokailutila 20 hengelle – mikäli koko talo on varattu samalle ryhmälle, tila veloituksetta käyttöön. Tilassa on videotykki, valkokangas ja minikeittiö. Järjestämme tarvittaessa erilaiset tilaisuudet paikallisten palveluntarjoajien kanssa.",
    "Kellarikerroksessa erillinen noin 50 m² lämmin suksien ja urheiluvälineiden huoltotila. Tila on kerrallaan vain yhden ryhmän käytössä, ja sen voi varata huoneiston A tai B varauksen lisäpalveluna. Ilman majoitusta tilaa ei vuokrata.",
    "Varastorakennus, jossa takkapuut.",
    "Autolämmityspistokkeet (2 kpl/huoneisto). Sähköauton lataaminen lämmitystolpista ja ulkopistorasioista on kielletty.",
  ],
} as const;

export const fiTeams: PageContent = {
  lang: "fi",
  slug: "/joukkueille/",
  title: "Joukkueille - Hiihtogreeni",
  description:
    "Mökki joukkueille ja hiihtojoukkueille Levillä: majoitus 14–28 hengelle, oma kylpyhuone jokaisessa huoneessa, 20 hengen neuvottelutila ja noin 50 m² lämmin suksien huoltotila aivan rinteiden vieressä. Kysy saatavuutta.",
  h1: "Iso parimökki urheiluseuroille ja joukkueille Levillä",
  nav: FI_NAV,
  external: EXTERNAL_LINKS,
};

export const fiTeamsSections = {
  heroLead:
    "Tilaa 14 tai jopa 28 hengen seurueille, oma lämmin suksien ja muiden urheiluvälineiden huoltotila sekä rinteet ja hiihtolatu askelten päässä.",
  introLead: "Kokemusta joukkueiden majoittamisesta",
  intro:
    "Hiihtogreeni majoittaa säännöllisesti alppihiihto- ja maastohiihtojoukkueita, seuroja ja maajoukkueita. Hyvin varusteltu paritalo tarjoaa koko joukkueelle rauhalliset ja tasokkaat puitteet valmistautumiseen, palautumiseen ja yhteiseen aikaan – kaikki aivan Levin rinteiden ja latujen vieressä.",
  introParagraphs: [
    "Haluamme, että joukkueenne voi keskistyä olennaiseen – harjoitteluun ja hyvään mieleen. Siksi kokoamme majoituksen, välinehuollon ja lyhyet siirtymät saman katon alle. Olipa kyse viikonlopun kilpailumatkasta tai useamman viikon valmennusleiristä, puitteet on tehty huippu-urheilun arkeen.",
    "Levillä alppi- ja murtomaahiihtoharjoitukset pääsevät lumivarmasti käyntiin jo lokakuun alussa ja kausi kestää aina toukokuulle saakka.",
    "Varaa huippuolosuhteet Levin maailmancupia varten koko joukkueelle, joka tänä vuonna kisataan 13.11.–15.11.2026.",
    "Kesäisin majoitus on kuin tehty golfporukoille tai pyöräilytiimeille. Ykköstiille on matkaa vain parisataa metriä ja maastopyöräreitit kulkevat aivan mökin vieressä.",
  ],
  useCasesLead: "Kenelle Hiihtogreeni sopii",
  useCasesTitle: "Hiihtogreeni on tehty joukkueille",
  useCases: [
    {
      title: "Alppihiihtojoukkueet",
      text: "Lämmitetty, tilava suksien huoltotila on suoraan majoituksen yhteydessä – voitelupöydät ovat valmiina ja koko joukkueen välineet pysyvät sisällä. Rinteelle on vain muutaman minuutin kävelymatka.",
    },
    {
      title: "Maastohiihto- ja ampumahiihtojoukkueet",
      text: "Ladulle pääset suoraan pihasta, ja avara huoltotila soveltuu pitovoiteluun ja välineiden kuivaamiseen. Rauhallinen ympäristö tukee palautumista ja laadukasta unta.",
    },
    {
      title: "Seurat ja maajoukkueet",
      text: "Kaksi 14 hengen huoneistoa ja yhteinen neuvottelutila muodostavat toimivan kokonaisuuden harjoitusleireille, nuorten maajoukkueille ja seuravalmennukselle. Koko talo vuokrataan tarvittaessa yksinomaan yhdelle ryhmälle.",
    },
    {
      title: "Valmennusleirit ja kouluryhmät",
      text: "Neuvottelutila videoanalyysiin, oma keittiö ja rauhallinen sijainti tekevät Hiihtogreenistä sopivan myös koululiikunnan, oppilaitosten ja yritysryhmien leireille.",
    },
    {
      title: "Maastopyöräilytiimit ja pyöräilijät",
      text: "Maastopyöräreitit kulkevat aivan mökin vieressä. Lämmin ja tilava välinehuoltotila sopii erinomaisesti pyörien huoltoon, pesuun ja säilytykseen ajopäivien välillä.",
    },
    {
      title: "Golfporukat",
      text: "Sijainti Levi Golfin kupeessa on ihanteellinen golfryhmille: ykköstiille on matkaa vain noin 200 metriä. Kierrosten jälkeen tilaa riittää seurusteluun, saunomiseen ja rentoutumiseen.",
    },
  ],
  whyLead: "Miksi juuri Hiihtogreeni",
  whyTitle: "Koko joukkue yhden katon alla",
  why: [
    "7 makuuhuonetta ja 7 kylpyhuonetta per asunto.",
    "Oma, noin 50 m² lämmin suksien ja urheiluvälineiden huoltotila mökin kellarikerroksessa – vain teidän joukkueenne käytössä, ei ulkovajassa.",
    "14 tai 28 hengen majoitus samassa paikassa.",
    "20 hengen neuvottelutila videotykillä – palaverit, videoanalyysi ja sponsoritapaamiset ilman ulkopuolista tilavarausta.",
    "Rinteet noin 200 m ja ladut pihasta: harjoitus, huolto ja lepo samassa pisteessä.",
    "Koko talo yhdelle joukkueelle – yksityisyyttä ja oma rauha ilman vieraita.",
    "Kittilän lentoasemalle vain 16 km (n. 20 min); helpot saapumiset ja lähdöt.",
  ],
  faqLead: "Usein kysyttyä joukkueilta",
  faqTitle: "Kysymyksiä joukkueen majoituksesta",
  faq: [
    {
      q: "Kuinka monta henkeä Hiihtogreeniin mahtuu joukkueena?",
      a: "Hiihtogreeni majoittaa 14 henkeä yhdessä huoneistossa ja 28 henkeä koko talon eli kahden huoneiston kokonaisuudessa. Jokaisessa huoneistossa on 7 makuuhuonetta, joissa kussakin on oma kylpyhuone.",
    },
    {
      q: "Millainen suksien huoltotila on?",
      a: "Käytössänne on noin 50 m² lämmin ja avara huoltotila mökin kellarikerroksessa, vain teidän joukkueenne käytössä. Tila varataan majoituksen lisäpalveluna, ja hinta näkyy varauskalenterin laskelmassa. Tila soveltuu voitelu- ja huoltopöydille sekä koko joukkueen välineille yhtä aikaa – erinomainen niin alppi- kuin maastohiihtoon.",
    },
    {
      q: "Kuinka lähellä rinteet ja ladut ovat?",
      a: "Koillisrinteille on matkaa noin 200 metriä ja hiihtoladulle pääsee suoraan mökin pihasta. Kittilän lentoasemalle on autolla noin 16 km eli noin 20 minuuttia.",
    },
    {
      q: "Voiko koko talon vuokrata yksinomaan omalle joukkueelle?",
      a: "Kyllä. Koko paritalo voidaan vuokrata yhdelle joukkueelle tai ryhmälle, jolloin myös asunnot yhdistävä neuvottelu- ja kokoustila on käytössänne veloituksetta.",
    },
    {
      q: "Mitä joukkueen kannattaa ottaa mukaan?",
      a: "Mukaan kannattaa ottaa omat huoltopöydät ja voitelu-/huoltotarvikkeet. Majoituksessa on vuodevaatteet, keittiövarustus, sauna ja lämmitetty huoltotila. Tarkka varustelutaso vahvistetaan varauksen yhteydessä.",
    },
  ],
  capacityLead: "Joukkueen kapasiteetti",
  capacityTitle: "Tilaa koko joukkueelle",
  splitRoomsLead: "Makuuhuoneet ja kylpyhuoneet",
  splitRoomsTitle: "Tilaa koko joukkueelle",
  splitRooms:
    "Jokaisessa makuuhuoneessa on oma kylpyhuone – käytännöllistä urheilijoille, jotka tarvitsevat omaa rauhaa ja palautumisrutiininsa. Ei jaettuja käytäväsuihkuja, vaan jokaiselle oma tila. Kaksi 14 hengen huoneistoa vuokrataan erikseen tai yhdessä, joten majoitat joustavasti 14 tai koko 28 hengen joukkueen.",
  splitMeetingLead: "Oma neuvottelutila",
  splitMeetingTitle: "Palaverit hoituvat paikan päällä",
  splitMeeting:
    "Huoneistojen välissä on 20 hengen neuvottelutila joukkuepalavereihin, videoanalyysiin, sponsoritapaamisiin ja valmentajien briiffeihin. Ei tarvetta varata erillistä tilaa muualta – tilassa on videotykki, valkokangas ja minikeittiö. Kun koko talo on varattu samalle joukkueelle, neuvottelutila sisältyy hintaan.",
  maintenanceLead: "Levin parhaat suksien huoltotilat",
  maintenanceTitle: "Noin 50 m² lämmintä suksien huoltotilaa",
  maintenance:
    "Hiihtogreenin ehdoton valtti joukkueille on tilava, lämmin ja avara suksien huoltotila – noin 50 m² mökin kellarikerroksessa, ei ulkovajassa, ja kerrallaan vain yhden joukkueen käytössä. Tila sopii voitelu- ja huoltopöydille sekä koko joukkueen välineille yhtä aikaa. Alppihiihtoon ja maastohiihtoon soveltuvat puitteet tekevät valmistautumisesta vaivatonta.",
  maintenanceGridTitle: "Katso huoltotila lähemmin",
  locationLead: "Sijainti",
  locationTitle: "Askelten päässä rinteistä",
  location:
    "Koillisrinteille on matkaa vain noin 200 m, ja ladulle pääsee suoraan mökin pihasta. Kittilän lentoasemalta on autolla noin 16 km eli 20 minuuttia. Logistiikka on joukkueelle helppoa: harjoitukset, huolto ja majoitus samassa pisteessä. Tilava valaistu piha pysäköinnille. Pihalla pysäköintitilat 6 henkilöautolle ja myös isommalla kalustolla mahtuu pysäköimään helposti. Lämmitystolpat 4 autolle.",
  privacyLead: "Yksityisyyttä joukkueelle",
  privacyTitle: "Koko talo vain teidän käyttöönne",
  privacy:
    "Koko paritalon voi vuokrata yhdelle joukkueelle tai ryhmälle – ei jaettuja yleisiä tiloja vieraiden kanssa, oma piha ja rauhalliset maisemat. Täydellinen ympäristö keskittymiseen ja palautumiseen ilman hiihtokeskuksen ruuhkaa.",
  exteriorLead: "Mökki ulkoa",
  exteriorTitle: "Iso vuokramökki ryhmille",
  ctaEyebrow: "Varaa majoitus joukkueellesi",
  ctaTitle: "Ota yhteyttä ja kysy saatavuutta",
} as const;

export const fiRates: PageContent = {
  lang: "fi",
  slug: "/hinnoittelu/",
  title: "Hinnoittelu - Hiihtogreeni",
  description:
    "Hiihtogreenin majoitushinnat Levillä: varauskalenteri, yö- ja viikkohinnat sekä varausehdot. Hinnat sisältävät arvonlisäveron.",
  h1: "Hinnoittelu",
  nav: FI_NAV,
  external: EXTERNAL_LINKS,
};

export const fiRatesSections = {
  lead: "Levin Hiihtogreeni Oy:n hinnoittelu",
  capacityNote:
    "Hiihtogreenissä on kaksi 14 hengen huoneistoa. Vuokrataan erikseen tai yhdessä.",
  meetingNote:
    "Lisäksi huoneistojen välissä on 20 hengen neuvottelu/ruokailutila. Tilan voi varata yhden huoneiston varauksen yhteydessä erikseen. Mikäli varataan molemmat huoneistot, tila sisältyy hintaan.",
  calendarLead: "Saatavuus ja hinnat",
  calendarTitle: "Varauskalenteri",
  calendarBody:
    "Valitse tulo- ja lähtöpäivä, niin näet vapaat huoneistot ja hinnan heti. Edullisin on lauantaista lauantaihin viikko. Varauspyyntö tulee suoraan meille, ja vastaamme siihen sähköpostilla.",
  calendar: {
    frameTitle: "Hiihtogreenin varauskalenteri",
    loading: "Ladataan kalenteria…",
    openInNewTab: "Avaa kalenteri uudessa välilehdessä",
  },
  terms: [
    "Hinnat ovat huoneistokohtaisia. Lauantaista lauantaihin viikko on edullisin, muuten hinta lasketaan öiden mukaan.",
    "Loppusiivous lisätään jokaiseen varattuun huoneistoon.",
    "Liinavaatteet ja pyyhkeet sekä valmiiksi pedatut vuoteet voi lisätä varaukseen henkilöä kohden, tai voitte tuoda omat.",
    "Kun vuokraatte koko talon (molemmat huoneistot), 20 hengen neuvottelu- ja ruokailutila sisältyy hintaan. Yhden huoneiston kanssa tilan voi varata lisähintaan.",
    "Hinnat sisältävät arvonlisäveron. Majoituksen, loppusiivouksen ja liinavaatteiden arvonlisävero on 13,5 %. Erikseen veloitettavan kokoustilan ja suksihuoltotilan arvonlisävero on 25,5 %. Koko talon varauksessa kokoustila on maksuton.",
    "Maksuehdot: 30 % varattaessa, loput 60 päivää ennen saapumista.",
    `Huoneisto on käytettävissä saapumispäivänä klo ${fiTime(STAY_TIMES.checkIn)} alkaen ja luovutetaan lähtöpäivänä viimeistään klo ${fiTime(STAY_TIMES.checkOut)}. Aikaisempaa saapumista voi pyytää, mutta sitä ei voida taata. Myöhäisempi lähtö ei ole mahdollinen.`,
  ],
  termsNote: "Lisäpalveluiden hinnat näet varauskalenterin laskelmasta. Varausehdot hyväksytään varauspyynnön yhteydessä.",
  termsLink: "Lue varausehdot",
  // Prices and free periods come live from the booking system (src/lib/booking-api.ts).
  live: {
    pricesLead: "Ajantasaiset hinnat",
    pricesTitle: "Kausihinnat huoneistoa kohden",
    pricesIntro:
      "Hinnat tulevat suoraan varausjärjestelmästä ja sisältävät arvonlisäveron. Lauantaista lauantaihin viikko on edullisin, muut yöt hinnoitellaan yöhinnalla. Koko talo on kaksi huoneistoa.",
    season: "Kausi",
    week: "Viikko la–la",
    night: "Yö",
    otherTimes: "Muina aikoina",
    apartmentPrices: "A {a} · B {b}",
    extrasTitle: "Lisät",
    cleaning: "Loppusiivous {price} / huoneisto",
    linen: "Liinavaatteet ja pyyhkeet {price} / henkilö",
    bedsMade: "Pedatut vuoteet {price} / henkilö liinavaatteiden lisäksi",
    conferenceRoom: "Neuvottelutila {price} / varaus, koko talon varauksessa veloituksetta",
    maintenanceRoom: "Suksien ja varusteiden huoltotila {price} / varaus",
    minNights: "Vähimmäisvaraus on {nights}.",
    minCharge: "Alle {charged} yön varaus veloitetaan {charged} yön hinnalla.",
    lastMinute: "Last minute: −{percent} % majoitushinnasta, kun saavut viimeistään {date}. Alennus näkyy varauskalenterin hinnassa.",
    pricesUnavailable: "Hintoja ei juuri nyt saatu varausjärjestelmästä. Näet ajantasaiset hinnat alla olevasta varauskalenterista.",
    freeLead: "Vapaat ajat",
    freeTitle: "Vapaana seuraavan puolen vuoden aikana",
    freeIntro: "Yhtenäiset vapaat jaksot, joihin vähimmäisvaraus mahtuu. Valitse päivät varauskalenterista.",
    wholeHouse: "Koko talo, 28 henkeä",
    apartment: "Huoneisto {apartment}, 14 henkeä",
    stay: "{range} ({nights} yötä)",
    openEnded: "{date} alkaen",
    noFree: "Ei vapaita jaksoja.",
    freeUnavailable: "Vapaita aikoja ei juuri nyt saatu varausjärjestelmästä. Katso tilanne varauskalenterista.",
  },
  // Answers follow the booking terms v1.3 (cabins.levifinland.fi).
  faqLead: "Usein kysyttyä",
  faqTitle: "Kysymyksiä varaamisesta",
  faq: [
    {
      q: "Pitääkö varata kokonainen viikko?",
      a: "Ei tarvitse. Lauantaista lauantaihin viikko on edullisin, muuten hinta lasketaan öiden mukaan. Varauskalenteri näyttää valitsemiesi päivien hinnan ja kertoo, jos ajanjaksoa ei voi varata.",
    },
    {
      q: "Mitä hintaan sisältyy?",
      a: "Vesi, sähkö, lämmitys, sauna, tyynyt ja peitot, astiat ja keittiövarustus, wc-paperi, siivousvälineet sekä loppusiivous. Koko talon varauksessa myös 20 hengen neuvottelu- ja ruokailutila. Hinnat sisältävät arvonlisäveron.",
    },
    {
      q: "Sisältyvätkö liinavaatteet ja pyyhkeet?",
      a: "Eivät automaattisesti. Liinavaatteet ja pyyhkeet sekä pedatut vuoteet voi lisätä varaukseen henkilöä kohden, tai voitte tuoda omat. Saapumispäivänä tilatuista liinavaatteista veloitetaan lisäksi 50 € toimitusmaksu. Makuupussien käyttö vuoteissa ei ole sallittu.",
    },
    {
      q: "Miten maksu tapahtuu?",
      a: "Laskulla tilisiirtona: ennakkomaksu 30 % varattaessa ja loput viimeistään 60 päivää ennen saapumista. Jos varaat alle 60 päivää ennen saapumista, koko hinta laskutetaan kerralla.",
    },
    {
      q: "Mitä jos joudun perumaan?",
      a: "Peruutus tehdään kirjallisesti sähköpostilla. Yli 60 päivää ennen saapumista peruutusmaksu on ennakkomaksu (30 %), ja muu maksettu osuus palautetaan. Myöhemmin peruttaessa veloitetaan koko hinta. Suosittelemme matkavakuutusta.",
    },
    {
      q: "Milloin pääsee sisään ja milloin pitää lähteä?",
      a: `Huoneisto on käytettävissä klo ${fiTime(STAY_TIMES.checkIn)} alkaen ja luovutetaan viimeistään klo ${fiTime(STAY_TIMES.checkOut)}. Sisään pääsee itsenäisesti ovikoodeilla. Varattujen tilojen koodit tulevat näkyviin varaussivullenne 24 tuntia ennen saapumista, kun koko hinta on maksettu ja lain edellyttämä matkustajailmoitus on tehty. Pyydämme ilmoituksen sähköpostilla ennen saapumista.`,
    },
    {
      q: "Saako lemmikin tuoda?",
      a: "Lemmikit ovat tervetulleita huoneistoon A. Huoneisto B pyritään pitämään lemmikeistä vapaana. Tupakointi sisätiloissa on kielletty.",
    },
  ],
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
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-1.jpg", alt: "12 hengen ruokapöytä", width: 800, height: 533, caption: "12 hengen ruokapöytä" },
  { src: "/wp-content/uploads/2026/10/hiihtogreeni-levi-cabin-large-groups-livingroom.jpg", alt: "Iso olohuone tunturinäkymin", width: 1920, height: 1080, caption: "Iso olohuone tunturinäkymin" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-10.jpg", alt: "Jokaisella huoneella oma kylpyhuone", width: 800, height: 534, caption: "Jokaisella huoneella oma kylpyhuone" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-2.jpg", alt: "Hyvin varusteltu keittiö", width: 800, height: 533, caption: "Hyvin varusteltu keittiö" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-3.jpg", alt: "Makuuhuone", width: 800, height: 534 },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-4.jpg", alt: "Avoin tila", width: 800, height: 533 },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-5.jpg", alt: "Tilavat huoneet", width: 800, height: 533, caption: "Tilavat huoneet" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-7.jpg", alt: "Tilava huone omalla kylpyhuoneella", width: 800, height: 533, caption: "Tilava huone omalla kylpyhuoneella" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-6.jpg", alt: "Sauna", width: 800, height: 533, caption: "Sauna" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-8.jpg", alt: "Suomalaista puuta", width: 800, height: 533, caption: "Suomalaista puuta" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-9.jpg", alt: "Huoneet", width: 800, height: 533, caption: "Huoneet" },
  { src: "/wp-content/uploads/2022/10/Hgr3dalakerta.jpg", alt: "Pohjakuva alakerta", width: 1024, height: 594, caption: "Pohjakuva alakerta" },
  { src: "/wp-content/uploads/2022/10/Hgr3dylakerta.jpg", alt: "Pohjakuva yläkerta", width: 1024, height: 499, caption: "Pohjakuva yläkerta" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-29-of-32.jpg", alt: "Runsaasti pysäköintitilaa", width: 1024, height: 682, caption: "Runsaasti pysäköintitilaa" },
  { src: "/wp-content/uploads/2025/07/Points-of-interest-Hiihtogreeni-summer.jpg", alt: "Kiinnostavat kohteet – kesäkartta", width: 1024, height: 681, caption: "Kiinnostavat kohteet – kesäkartta" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-1.jpg", alt: "Ulkonäkymä", width: 1024, height: 681 },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-8.jpg", alt: "Ulkonäkymä 2", width: 1024, height: 570 },
  { src: "/wp-content/uploads/2026/07/view_from_hiihtogreeni_levi_rental_cabin_golf_course.jpg", alt: "Näkymä Hiihtogreenistä golfkentälle", width: 1398, height: 719, caption: "Näkymä Hiihtogreenistä golfkentälle" },
  { src: "/wp-content/uploads/2025/07/Points-of-interest-Hiihtogreeni-winter.jpg", alt: "Kiinnostavat kohteet – talvikartta", width: 1024, height: 681, caption: "Kiinnostavat kohteet – talvikartta" },
  { src: "/wp-content/uploads/2024/07/Mokki-Levi-Hiihtogreeni-neuvottelutila.jpg", alt: "Iso neuvottelutila jopa 20 hengelle", width: 2160, height: 1216, caption: "Iso neuvottelutila jopa 20 hengelle" },
  { src: "/wp-content/uploads/2024/07/Large-and-warm-space-for-ski-maintenance.jpg", alt: "Suksien huoltotila kellarissa varattavissa erikseen", width: 2160, height: 1215, caption: "Suksien huoltotila kellarissa varattavissa erikseen" },
  { src: "/wp-content/uploads/2024/07/Isot-tilat-suksien-huoltoon-maajoukkueille-ja-seuroille-Levilla.jpg", alt: "Isot tilat suksien huoltoon maajoukkueille ja seuroille Levillä", width: 2160, height: 1216, caption: "Isot tilat suksien huoltoon maajoukkueille ja seuroille Levillä" },
  { src: "/wp-content/uploads/2024/07/Majoitus-Levilla-isolla-suksien-huoltotilalla.jpg", alt: "Suksien voitelutelineet kuuluvat huoltotilan varustukseen", width: 2160, height: 1216, caption: "Suksien voitelutelineet kuuluvat huoltotilan varustukseen" },
  { src: "/wp-content/uploads/2024/07/Hiihtogreeni-sopii-alppihiihto-ja-maastohiihtojoukkueille.jpg", alt: "Lämpimät suksien huoltotilat joukkueille ja isoille ryhmille", width: 2160, height: 1216, caption: "Lämpimät suksien huoltotilat joukkueille ja isoille ryhmille" },
  { src: "/wp-content/uploads/2026/07/sport_equipment_maintenance_room_levi_hiihtogreeni.jpg", alt: "Urheiluvälineiden huoltotila", width: 1613, height: 907, caption: "Urheiluvälineiden huoltotila" },
  { src: "/wp-content/uploads/2024/07/Lahella-mokkia-on-Levijarven-uimaranta.jpg", alt: "Levijärven ranta kesällä virkistää", width: 2160, height: 1216, caption: "Levijärven ranta kesällä virkistää" },
  { src: "/wp-content/uploads/2024/07/Levijarven-hiekkaranta-lahella-mokkia.jpg", alt: "Levijärven hiekkaranta lähellä mökkiä", width: 2160, height: 1216, caption: "Levijärven hiekkaranta lähellä mökkiä" },
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
  foundVia: {
    label: "Mistä löysit meidät?",
    placeholder: "Valitse",
    options: {
      search: "Hakukoneesta (esim. Google)",
      ai: "Tekoälyavustajalta (esim. ChatGPT, Claude, Perplexity)",
      social: "Sosiaalisesta mediasta",
      referral: "Tuttavan suosittelemana",
      returning: "Olen majoittunut täällä aiemmin",
      other: "Muualta",
    },
  },
} as const;

/** Front-page last-minute banner (shown only while the owner's offer is on). */
export const fiLastMinute: LastMinuteStrings = {
  eyebrow: "Äkkilähtö · {dates}",
  title: "Nyt äkkilähtö Leville isollakin porukalla −{percent}\u00a0% majoitushinnasta",
  wholeHouseFree: "Koko talo vapaana – jopa 28 hengelle.",
  apartmentFree: "Huoneisto {apartment} vapaana – jopa 14 hengelle.",
  priceNote: "/ huoneisto · {nights} yötä · sis. loppusiivouksen",
  normally: "Normaalisti {price}",
  badge: "−{percent}\u00a0% majoituksesta",
  cta: "Katso vapaat päivät ja varaa",
  metaDescription: "Äkkilähtö {dates}: huoneisto {price}, −{percent}\u00a0% majoitushinnasta.",
  seasons: {
    firstSnow: { name: "Ensilumen ladut ja ensimmäiset laskut", text: "Tule ensilumen ladulle ja nauti syksyn ensimmäisistä laskuista." },
    earlyWinter: { name: "Alkutalvi", text: "Rinteet ja ladut aukeavat, ja kaamoksen sininen hetki tekee illoista taianomaisia." },
    christmas: { name: "Joulu ja uusi vuosi", text: "Vietä joulu tai uusi vuosi Levillä koko porukan kanssa." },
    midwinter: { name: "Upea ja luminen keskitalvi", text: "Pakkaspäivät, revontulet ja hiljaiset ladut – Lapin talvi parhaimmillaan." },
    peak: { name: "Huippusesonki", text: "Parhaat laskut ja aurinko: Levin rinteet ovat nyt parhaimmillaan." },
    spring: { name: "Kevään aurinkoisin laskettelukausi", text: "Pitkät valoisat päivät, hyvä lumi ja aurinkoiset rinteet." },
    quiet: { name: "Edullinen Lapin-reissu", text: "Hiljaisuutta ja rauhaa etsivälle: Lappi on nyt rauhallisimmillaan." },
    summer: { name: "Kesä Levillä", text: "Kesän golf, retkeily ja maastopyöräily yöttömän yön valossa." },
    ruska: { name: "Ruska", text: "Ruska ja syksyn upeat värit tuntureilla." },
  },
};

export const fiCompanies: PageContent = {
  lang: "fi",
  slug: "/yrityksille/",
  title: "Yrityksille - Hiihtogreeni",
  description:
    "Strategiapäivät, offsitet ja kick-offit Levillä: koko talo omalle ryhmälle, yksityinen 20 hengen kokoustila saman katon alla, oma kylpyhuone jokaisessa makuuhuoneessa ja 20 minuuttia Kittilän lentoasemalle.",
  h1: "Strategiapäivät ja yritysryhmät Levillä",
  nav: FI_NAV,
  external: EXTERNAL_LINKS,
};

export const fiCompaniesSections: CompaniesSections = {
  heroEyebrow: "Levi, Lappi — yrityksille",
  heroLead:
    "Koko talo omalle ryhmälle: yksityinen 20 hengen kokoustila saman katon alla, jokaisessa makuuhuoneessa oma kylpyhuone, illaksi omat saunat ja Kittilän lentoasemalle 20 minuuttia.",
  heroCalendar: "Katso vapaat päivät",
  heroContact: "Kysy ryhmällenne",
  factsLead: "Faktat lyhyesti",
  factsTitle: "Tilat ja varustus",
  facts: [
    { label: "Majoitus", value: "Koko talossa 28 vuodepaikkaa, kaksi 14 hengen huoneistoa. Huoneistot voi varata erikseen tai yhdessä." },
    { label: "Makuuhuoneet", value: "7 makuuhuonetta / huoneisto, koko talossa 14. Jokaisessa makuuhuoneessa oma kylpyhuone (wc ja suihku)." },
    { label: "Kokoustila", value: "20 hengen neuvottelu- ja ruokailutila huoneistojen välissä. Tila on vain teidän käytössänne, ja siihen on oma sisäänkäynti, myös suoraan ulkoa." },
    { label: "Kokoustilan varustus", value: "Videotykki, valkokangas, pöytäfläppitaulu ja minikeittiö. Videoneuvottelukameraa tai -kaiutinta ei ole." },
    { label: "Kokoustilan hinta", value: "Sisältyy koko talon varaukseen. Yhden huoneiston varaukseen tilan voi lisätä erikseen." },
    { label: "Saunat ja keittiöt", value: "Kummassakin huoneistossa sähkösauna katetulla vilvoitteluterassilla, tupakeittiö ja ruokapöytä 12 hengelle." },
    { label: "Netti", value: "Langaton laajakaista." },
    { label: "Sijainti", value: "Kittilän lentoasemalle noin 16 km (20 min autolla), Levin keskustaan 4 km (SkiBussi), Koillisrinteille noin 200 m. Latu alkaa pihasta, golfkenttä on vieressä." },
    { label: "Pysäköinti", value: "Valaistu piha, pysäköintitilaa 6 henkilöautolle, lämmitystolpat 4 autolle." },
  ],
  useCasesLead: "Käyttötarpeet",
  useCasesTitle: "Mihin Hiihtogreeni sopii",
  useCases: [
    { title: "Strategiapäivät", text: "Johtoryhmä työskentelee päivällä kokoustilassa ja jatkaa illalla saunan ja yhteisen illallisen äärellä samassa talossa." },
    { title: "Tiimin offsite tai kick-off", text: "Koko tiimi saman katon alle: 28 vuodepaikkaa ja 20 hengen kokoustila, eikä siirtymiä hotellin ja kokouspaikan välillä." },
    { title: "Hallituksen kokous", text: "Rauhallinen ja yksityinen tila, jossa ei ole ulkopuolisia vieraita." },
    { title: "Asiakas- tai kumppanitilaisuus", text: "Pienelle ryhmälle tunturimaisemat, saunat ja oma rauha." },
    { title: "Fasilitoitu työpaja", text: "Videotykki, valkokangas ja pöytäfläppitaulu, ja tauolla pääsee suoraan ulos ladulle tai golfkentän laidalle." },
  ],
  configsLead: "Kokoonpanot",
  configsTitle: "Kolme tapaa varata",
  configs: [
    { title: "Koko talo, enintään 14 henkeä", text: "Jokaiselle oma makuuhuone ja kylpyhuone. Kokoustila sisältyy hintaan. Suositus johtoryhmälle.", example: "mayHouse" },
    { title: "Koko talo, 15–28 henkeä", text: "Kokoustila sisältyy hintaan. Osa makuuhuoneista jaetaan: huoneissa on kaksi vuodetta, kahdessa niistä kerrossänky.", example: "autumnHouse" },
    { title: "Yksi huoneisto ja kokoustila, enintään 14 henkeä", text: "Edullisin vaihtoehto. Huoneistossa on 7 makuuhuonetta, joten oma huone riittää enintään 7 hengelle. Kokoustila on vain teidän käytössänne, vaikka toisessa huoneistossa olisi muita vieraita.", example: "mayApartment" },
  ],
  pricesLead: "Hintaesimerkit",
  pricesTitle: "Mitä päivät maksavat",
  pricesIntro:
    "Esimerkit on laskettu varausjärjestelmässä {date}. Hinta kattaa majoituksen, pedatut vuoteet liinavaatteineen, loppusiivouksen ja kokoustilan käytön, ja se sisältää arvonlisäveron. Ruokailu, kuljetukset ja ohjelma eivät sisälly. Tarkista hinta omille päivillenne varauskalenterista.",
  pricesUnavailable:
    "Hintaesimerkit eivät juuri nyt latautuneet varausjärjestelmästä. Varauskalenteri näyttää tarkan hinnan omille päivillenne.",
  examples: {
    mayApartment: "Toukokuu, ma–to: yksi huoneisto ja kokoustila, 12 henkeä",
    mayHouse: "Toukokuu, ma–to: koko talo, 14 henkeä, jokaiselle oma huone",
    autumnHouse: "Syyskuu ja ruska, ti–pe: koko talo, 18 henkeä",
  },
  perPerson: "noin {price} / henkilö / yö",
  total: "Yhteensä {price}",
  breakdown: "Erittely",
  lineLabels: {
    apartment_a: "Huoneisto A",
    apartment_b: "Huoneisto B",
    conference_room: "Kokoustila",
    maintenance_room: "Suksihuoltotila",
    linen_delivered: "Liinavaatteet ja pyyhkeet",
    beds_made: "Pedatut vuoteet",
    cleaning: "Loppusiivous",
    last_minute_discount: "Äkkilähtöalennus",
  },
  minimumCharge: "vähimmäisveloitus",
  openCalendar: "Avaa päivät varauskalenterissa",
  programLead: "Esimerkkiohjelma",
  programTitle: "Kaksi työpäivää Levillä",
  programIntro:
    "Näin päivät voivat rakentua eri vuodenaikoina. Ruokailun ja ohjelman järjestätte itse: molemmissa huoneistoissa on täysin varusteltu keittiö, ja Levin keskustan ravintolat ovat 4 km päässä.",
  programs: [
    {
      season: "Talvi",
      days: [
        { when: "Saapumisilta", text: "Sisään klo 17 alkaen. Sauna ja yhteinen illallinen." },
        { when: "Päivä 1", text: "Aamupäivä työpajassa. Iltapäivällä hiihtolenkki pihasta alkavalla ladulla tai laskettelua Koillisrinteillä 200 metrin päässä. Illalla toinen työskentelyjakso." },
        { when: "Päivä 2", text: "Aamupäivällä päätökset ja jatkotoimet. Iltapäivällä ulkoilua, illalla sauna." },
        { when: "Lähtöaamu", text: "Ulos klo 11 mennessä, lentoasemalle 20 minuuttia." },
      ],
    },
    {
      season: "Kesä ja golf",
      days: [
        { when: "Saapumisilta", text: "Sisään klo 17 alkaen. Illallinen terassilla yöttömän yön valossa." },
        { when: "Päivä 1", text: "Aamupäivä työpajassa. Iltapäivällä kierros Levi Golfissa, jonka ykköstiille on noin 150 metriä." },
        { when: "Päivä 2", text: "Aamupäivällä päätökset ja jatkotoimet. Iltapäivällä retki Levijärven rannalle tai maastopyöräreiteille." },
        { when: "Lähtöaamu", text: "Ulos klo 11 mennessä, lentoasemalle 20 minuuttia." },
      ],
      note: {
        text: "Peliliput voi ostaa valmiiksi mökkivarauksen yhteydessä: jopa 10 pelilippua päivässä edulliseen hintaan (alk. 27 € / green fee).",
        linkText: "greenfee.levifinland.fi",
        href: EXTERNAL_LINKS.greenFee,
      },
    },
    {
      season: "Ruska",
      days: [
        { when: "Saapumisilta", text: "Sisään klo 17 alkaen. Sauna ja yhteinen illallinen." },
        { when: "Päivä 1", text: "Aamupäivä työpajassa. Iltapäivällä ruskaretki tunturiin." },
        { when: "Päivä 2", text: "Aamupäivällä päätökset ja jatkotoimet. Iltapäivällä golfkierros tai kävely golfkentän laidalla, illalla sauna." },
        { when: "Lähtöaamu", text: "Ulos klo 11 mennessä, lentoasemalle 20 minuuttia." },
      ],
    },
  ],
  practicalLead: "Käytännön asiat",
  practicalTitle: "Ennen varausta",
  practical: [
    { title: "Kuljetus", text: "Kittilän lentoasemalta on 16 km eli noin 20 minuuttia. Asemalta pääsee taksilla tai vuokra-autolla, ja pihassa on tilaa kuudelle autolle." },
    { title: "Ruokailu", text: "Molemmissa huoneistoissa on tupakeittiö ja ruokapöytä 12 hengelle, kokoustilassa minikeittiö. Ruokailun järjestätte itse tai syötte Levin ravintoloissa." },
    { title: "Lasku yritykselle", text: "Onnistuu: Levin Hiihtogreeni Oy laskuttaa yritystä. Ennakkomaksu laskutetaan, kun varaus on vahvistettu, ja loppumaksu ennen saapumista varausehtojen mukaisesti." },
    { title: "Arvonlisävero", text: "Majoituksen, loppusiivouksen ja liinavaatteiden arvonlisävero on 13,5 %. Erikseen veloitettavan kokoustilan arvonlisävero on 25,5 %." },
    { title: "Peruutusehdot", text: "Samat kuin muissakin varauksissa." },
    { title: "Saapuminen ja lähtö", text: `Sisään klo ${fiTime(STAY_TIMES.checkIn)} alkaen, ulos klo ${fiTime(STAY_TIMES.checkOut)} mennessä.` },
  ],
  termsLink: "Lue varausehdot",
  faqLead: "Usein kysyttyä",
  faqTitle: "Kysymyksiä yritysryhmiltä",
  faq: [
    { q: "Saako jokainen oman huoneen?", a: "Koko talossa on 14 makuuhuonetta, joten enintään 14 hengen ryhmässä jokaisella on oma huone ja kylpyhuone. Yhdessä huoneistossa on 7 makuuhuonetta. Suuremmat ryhmät, enintään 28 henkeä, jakavat huoneita." },
    { q: "Mitä kokoustilassa on?", a: "Tila on 20 hengen neuvottelu- ja ruokailutila huoneistojen välissä. Siellä on videotykki, valkokangas, pöytäfläppitaulu ja minikeittiö." },
    { q: "Onko kokoustila yksityinen?", a: "Kyllä. Kokoustila on vain teidän ryhmänne käytössä, eikä sitä jaeta muiden vieraiden kanssa, vaikka toisessa huoneistossa olisi muita vieraita. Tilaan on oma sisäänkäynti, myös suoraan ulkoa." },
    { q: "Voiko kokoustilassa pitää videopalavereja?", a: "Talossa on langaton laajakaista. Videoneuvottelukameraa tai -kaiutinta ei ole, joten ottakaa tarvittaessa omat mukaan." },
    { q: "Paljonko kokoustila maksaa?", a: "Koko talon varauksessa kokoustila sisältyy hintaan. Yhden huoneiston varaukseen tilan voi lisätä erikseen, ja hinta näkyy varauskalenterin laskelmassa." },
    { q: "Sopiiko talo arkipäiville?", a: "Kyllä. Yksittäiset yöt hinnoitellaan yöhinnalla, joten esimerkiksi maanantaista torstaihin onnistuu siinä missä viikonloppukin. Lauantaista lauantaihin viikko on edullisin." },
    { q: "Järjestättekö ruokailun tai ohjelman?", a: "Emme. Molemmissa huoneistoissa on täysin varusteltu keittiö ja kokoustilassa minikeittiö, ja Levin keskustan ravintolat ovat 4 km päässä. Ladut, rinteet ja golfkenttä ovat talon vieressä." },
    { q: "Miten lentoasemalta pääsee perille?", a: "Kittilän lentoasemalta on 16 km eli noin 20 minuuttia taksilla tai vuokra-autolla." },
    { q: "Saako laskun yritykselle?", a: "Kyllä. Levin Hiihtogreeni Oy laskuttaa yritystä, ja laskulla arvonlisävero eritellään verokannoittain." },
    { q: "Poikkeavatko yritysvarausten peruutusehdot tavallisista?", a: "Eivät. Yritysvarauksiin pätevät samat varausehdot kuin muihinkin varauksiin." },
  ],
  shortStay: {
    q: "Mikä on lyhin varaus?",
    withMinimumCharge: "Lyhin varaus on {min}. Alle {charged} yön varaus veloitetaan {charged} yön hinnalla, joten lyhyetkin strategiapäivät onnistuvat.",
    minimumOnly: "Lyhin varaus on {min}.",
    unknown: "Varauskalenteri kertoo lyhimmän varauksen ja hinnan omille päivillenne.",
  },
  ctaEyebrow: "Koko talo omalle ryhmälle",
  ctaTitle: "Kysy päiviä ryhmällenne",
  ctaBody: "Valitse päivät varauskalenterista tai kerro ryhmästänne, niin vastaamme.",
  images: {
    hero: "Hiihtogreenin 20 hengen kokoustila Levillä",
    living: "Iso olohuone tunturinäkymin",
    bedroom: "Makuuhuone omalla kylpyhuoneella",
  },
};

export const fiBrochure: BrochureStrings = {
  docTitle: "Hiihtogreeni – strategiapäivät ja yritysryhmät Levillä",
  subject: "Esite yrityksille: tilat, kokoonpanot, hinnat ja esimerkkiohjelma",
  keywords: "strategiapäivät, johtoryhmä, offsite, kick-off, kokoustila, Levi, Lappi",
  coverEyebrow: "Levi, Lappi — yrityksille",
  coverTitle: "Koko talo johtoryhmälle Levillä",
  coverLead: "Yksityinen 20 hengen kokoustila saman katon alla, oma kylpyhuone jokaisessa makuuhuoneessa, illaksi omat saunat ja Kittilän lentoasemalle 20 minuuttia.",
  whyTitle: "Miksi Hiihtogreeni",
  why: [
    "Koko talo omalle ryhmälle: kun varaatte molemmat huoneistot, talossa ei ole muita vieraita.",
    "Yksityinen 20 hengen kokoustila saman katon alla, oma sisäänkäynti myös ulkoa.",
    "Jokaisessa makuuhuoneessa oma kylpyhuone. Enintään 14 hengen ryhmässä jokaiselle oma huone.",
    "Kaksi saunaa katetuin vilvoitteluterassein illaksi omaan käyttöön.",
    "Kittilän lentoasemalle 20 minuuttia. Latu alkaa pihasta, ja golfkenttä on vieressä.",
  ],
  factsTitle: "Tilat faktoina",
  useCasesTitle: "Mihin talo sopii",
  programTitle: "Esimerkkiohjelma: kaksi työpäivää",
  pricesTitle: "Kokoonpanot ja hinnat",
  fromPrice: "alkaen {price} / henkilö / yö (kokoonpano {n})",
  exampleLabel: "Esimerkki {dates}, {guests} henkeä",
  pricesNote: "Hinnat laskettu varausjärjestelmässä {date}, sis. alv. Hinta kattaa majoituksen, pedatut vuoteet liinavaatteineen, loppusiivouksen ja kokoustilan käytön. Ruokailu, kuljetukset ja ohjelma eivät sisälly.",
  pricesUnavailable: "Ajantasaiset hinnat omille päivillenne näet varauskalenterista.",
  locationTitle: "Sijainti",
  locationLead: "Koillisrinteille noin 200 m, latu pihasta, Levi Golf vieressä, Levin keskustaan 4 km ja Kittilän lentoasemalle noin 16 km eli 20 minuuttia.",
  mapSummer: "Kesä",
  mapWinter: "Talvi",
  practicalTitle: "Käytännön asiat",
  bookTitle: "Näin varaatte",
  bookSteps: [
    "Valitse päivät ja huoneistot varauskalenterista ja lähetä varauspyyntö. Pyyntö ei maksa mitään.",
    "Vahvistamme varauksen sähköpostilla. Ennakkomaksu laskutetaan yritykseltä vahvistuksen jälkeen.",
    "Kysyttävää? Soita tai kirjoita yhteydenottolomakkeella.",
  ],
  qrCaption: "Varauskalenteri",
  agentNote: "Saatavuuden ja hinnan voi tarkistaa myös tekoälyavustajalla: hiihtogreeni.fi/llms.txt.",
  phoneLabel: "Puhelin",
  webLabel: "Yrityssivu",
  aiLabel: "Kuvituskuva: henkilöt on luotu tekoälyllä",
  footer: "Levin Hiihtogreeni Oy · hiihtogreeni.fi · päivitetty {date}",
  downloadLink: "Lataa esite (PDF)",
  downloadNote: "Esite johtoryhmälle välitettäväksi, ei vaadi yhteystietoja.",
};
