import type { NavItem, PageContent, GalleryImage, UILabels, FormStrings, CookieConsentCopy } from "./types.ts";
import { EXTERNAL_LINKS } from "./shared.ts";

export const FI_NAV: NavItem[] = [
  { key: "home", label: "Etusivu", href: "/" },
  { key: "cabin", label: "Mökki", href: "/mokki/" },
  { key: "teams", label: "Joukkueille", href: "/joukkueille/" },
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
  rightsReserved: "Kaikki oikeudet pidätetään.",
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
    "Jälkipelit voit tulla pelaamaan mökin saunaan tai terassille tai klubitalona toimivaan ravintola Draiviin, joka palvelee myös kesäisin aamusta iltaan viikon jokaisena päivänä. Levin golfkenttä tarjoilee haastetta myös kokeneemmalle golffarille, mutta toivottaa tervetulleeksi kaikki golfarit aloittelijasta lähtien. Golfkentän yhteydessä ovat myös täysimittainen range ja hyvät harjoitusalueet lähipeliin. Levillä kannattaa myös kokea keskiyön pelikierros, sillä täällä aurinko ei laske kesällä lainkaan. Kauttamme voit ostaa 7 green feetä samalle päivälle. Green feet ovat Hiihtogreenillä aina kilpailukykyisesti hinnoiteltu.",
  golfCta: "Osta Levi golfin peliliput varauslomakkeen kautta",
  viewsLead: "Maisemat",
  views:
    "Näkymät Taalojärvelle ja Levitunturille – varaa nyt talven parhaat päivät! Maisemat tarjoilevat parastaan Hiihtogreenissä majoittuville, sillä ikkunoista avautuvat näkymät Taalojärvelle, Levitunturille sekä golfkentälle ja ensilumen ladulle. Aktiivisen päivän jälkeen voi nauttia vaikka takan lämmöstä tai saunan jälkeen katetulla terassilla vilvoitellen, rauhallisia maisemia tähyillen. Alue ja mökin toteutus vastaavat varmasti vaativampaankin makuun.",
  closing:
    "Mökin vuokraus Leviltä käy kauttamme turvallisesti ja luotettavasti. Toivotamme sinut ja seurueesi tervetulleeksi nauttimaan Levin ympäri vuoden laadukkaisiin puitteisiin!",
} as const;

export const fiHomeCarousel: GalleryImage[] = [
  { src: "/wp-content/uploads/2026/07/northern_lights_levi_hiihtogreeni.jpg", alt: "Revontulet Hiihtogreenin yllä Levillä", width: 1814, height: 1021, caption: "Revontulet Hiihtogreenin yllä" },
  { src: "/wp-content/uploads/2026/07/rental_cabin_for_large_groups_levi_golf_course.jpg", alt: "Iso vuokramökki ryhmille golfkentän laidalla", width: 1440, height: 810, caption: "Iso vuokramökki ryhmille golfkentän laidalla" },
  { src: "/wp-content/uploads/2026/07/excellent_ski_maintenance_room_levi_hiihtogreeni.jpg", alt: "Erinomainen suksien huoltotila Hiihtogreenissä", width: 1613, height: 907, caption: "Erinomainen suksien huoltotila" },
  { src: "/wp-content/uploads/2024/07/Mokki-Levi-Hiihtogreeni-neuvottelutila.jpg", alt: "Iso neuvottelutila jopa 20 hengelle", width: 2160, height: 1216, caption: "Iso neuvottelutila jopa 20 hengelle" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-29-of-32.jpg", alt: "Runsaasti pysäköintitilaa", width: 1024, height: 682, caption: "Runsaasti pysäköintitilaa" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-1.jpg", alt: "12 hengen ruokapöytä", width: 800, height: 533, caption: "12 hengen ruokapöytä" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-4.jpg", alt: "Hyvin varusteltu keittiö", width: 800, height: 533, caption: "7 makuuhuonetta omalla kylpyhuoneella, molemmissa huoneistoissa" },
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-6.jpg", alt: "Sauna", width: 800, height: 533, caption: "Sauna" },
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
    "Kellarikerroksessa erillinen noin 50 m² lämmin suksien ja urheiluvälineiden huoltotila (kysy tämän tilan vuokrausta erillisen sopimuksen mukaan).",
    "Varastorakennus, jossa takkapuut ja kylmä autotalli (kysy autotallin vuokrausta erikseen). Autotallissa 1- ja 3-vaihepistorasiat auton latausta varten.",
    "Autolämmityspistokkeet (2 kpl/huoneisto). Sähköauton lataaminen pistorasiasta on kielletty.",
  ],
} as const;

export const fiTeams: PageContent = {
  lang: "fi",
  slug: "/joukkueille/",
  title: "Joukkueille - Hiihtogreeni",
  description:
    "Mökki joukkueille ja hiihtojoukkueille Levillä: majoitus 14–28 hengelle, oma kylpyhuone jokaisessa huoneessa, 20 hengen neuvottelutila ja yli 50 m² lämmin suksien huoltotila aivan rinteiden vieressä. Kysy saatavuutta.",
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
    "Oma, yli 50 m² lämmin suksien ja urheiluvälineiden huoltotila mökin sisällä – ei ulkovajaa tai jaettua kellaria.",
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
      a: "Käytössänne on yli 50 m² lämmin ja avara huoltotila mökin sisällä. Tila soveltuu voitelu- ja huoltopöydille sekä koko joukkueen välineille yhtä aikaa – erinomainen niin alppi- kuin maastohiihtoon.",
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
  maintenanceTitle: "Yli 50 m² lämmintä suksien huoltotilaa",
  maintenance:
    "Hiihtogreenin ehdoton valtti joukkueille on tilava, lämmin ja avara suksien huoltotila – yli 50 m² ja sijaitsee mökin sisällä, ei ulkovajassa tai jaetussa kellarissa. Tila sopii voitelu- ja huoltopöydille sekä koko joukkueen välineille yhtä aikaa. Alppihiihtoon ja maastohiihtoon soveltuvat puitteet tekevät valmistautumisesta vaivatonta.",
  maintenanceGridTitle: "Katso huoltotila lähemmin",
  locationLead: "Sijainti",
  locationTitle: "Askelten päässä rinteistä",
  location:
    "Koillisrinteille on matkaa vain noin 200 m, ja ladulle pääsee suoraan mökin pihasta. Kittilän lentoasemalta on autolla noin 16 km eli 20 minuuttia. Logistiikka on joukkueelle helppoa: harjoitukset, huolto ja majoitus samassa pisteessä. Tilava valaistu piha pysäköinnille. Pihalla pysäköintitilat 7 henkilöautolle ja myös isommalla kalustolla mahtuu pysäköimään helposti. Lämmitystolpat 4 autolle.",
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
    "Lisäksi huoneistojen välissä on 20 hengen neuvottelu/ruokailutila. Tilan voi varata yhden huoneiston varauksen yhteydessä erikseen. Mikäli varataan molemmat huoneistot, tila sisältyy hintaan.",
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
    "Liinavaatteet ja pyyhkeet: 16 € / setti",
    "Mikäli vuokrataan koko talo (molemmat huoneistot), hintaan sisältyy myös 20 henkilön neuvottelu/ruokailutilan käyttö loppusiivouksineen",
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
  { src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-1.jpg", alt: "12 hengen ruokapöytä", width: 800, height: 533, caption: "12 hengen ruokapöytä" },
  { src: "/wp-content/uploads/2024/07/Levi-Majoitus-suuri-olohuone-Hiihtogreeni.jpg", alt: "Iso olohuone tunturinäkymin", width: 2160, height: 1250, caption: "Iso olohuone tunturinäkymin" },
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
} as const;
