import { SiteShell } from "../../components/SiteShell.tsx";
import { HomeCarousel } from "../../components/HomeCarousel.tsx";
import { Hero, Section, Eyebrow, ButtonLink, FactStrip, SplitSection, ImageCard, CallToAction } from "../../components/ui/Primitives.tsx";
import {
  fiHome,
  fiHomeSections,
  fiHomeCarousel,
  FI_UI,
} from "../../content/fi.ts";
import { COMPANY, CAPACITY, EXTERNAL_LINKS, RENTAL_CONTACT } from "../../content/shared.ts";
import { getHref } from "../../lib/routes.ts";
import { buildPageMetadata, OG_IMAGES } from "../../lib/seo.ts";

export const metadata = buildPageMetadata({
  lang: "fi",
  key: "home",
  title: fiHome.title,
  description: fiHome.description,
  ogImage: OG_IMAGES.homeFi,
});

export default function HomePage() {
  const s = fiHomeSections;
  const ctaButtons = (
    <>
      <ButtonLink href={getHref("fi", "cabin")}>Tutustu mökkiin</ButtonLink>
      <ButtonLink href={getHref("fi", "contact")} variant="secondary">
        Ota yhteyttä
      </ButtonLink>
    </>
  );
  const heroButtons = (
    <>
      <ButtonLink href={getHref("fi", "cabin")}>Tutustu mökkiin</ButtonLink>
      <ButtonLink href={getHref("fi", "contact")} variant="light">
        Ota yhteyttä
      </ButtonLink>
    </>
  );

  return (
    <SiteShell lang="fi" activeKey="home">
      <Hero
        image={{
          avif: "/hero/home-fi.avif",
          webp: "/hero/home-fi.webp",
          jpg: "/hero/home-fi.jpg",
          width: 1600,
          height: 1067,
          alt: "Hiihtogreeni talvella Levitunturin ja järven äärellä",
        }}
        eyebrow="Levi, Lappi"
        title={fiHome.h1}
        lead="Korkeatasoinen vuokramökki Levin rinteiden ja golfkentän vieressä – aina 14 hengelle per huoneisto."
      >
        {heroButtons}
      </Hero>

      <Section>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <ImageCard
            href={getHref("fi", "cabin")}
            image={{
              src: "/wp-content/uploads/2022/10/nosto_mokki.jpg",
              width: 450,
              height: 1900,
              alt: "Hiihtogreeni-mökki",
            }}
            title="Mökki"
            description="Kaksi 14 hengen huoneistoa, oma kylpyhuone jokaisessa makuuhuoneessa."
          />
          <ImageCard
            href={getHref("fi", "teams")}
            image={{
              src: "/wp-content/uploads/2026/07/large_warm_ski_maintenance_facilities_for_alpine_skiing_teams.jpg",
              width: 1613,
              height: 907,
              alt: "Lämmin suksien huoltotila alppihiihtojoukkueille",
            }}
            title="Joukkueille"
            description="Hiihtojoukkueille: 28 hengelle, oma suksien huoltotila ja neuvottelutila."
          />
          <ImageCard
            href={getHref("fi", "rates")}
            image={{
              src: "/wp-content/uploads/2022/10/nosto_hinnasto.jpg",
              width: 450,
              height: 1900,
              alt: "Hinnoittelu",
            }}
            title="Hinnoittelu"
            description="Kausikohtaiset majoitus- ja green fee -hinnat sekä varausehdot."
          />
          <ImageCard
            href={getHref("fi", "gallery")}
            image={{
              src: "/wp-content/uploads/2022/10/nosto_vuokramokki-galleria.jpg",
              width: 450,
              height: 1900,
              alt: "Kuvagalleria",
            }}
            title="Kuvagalleria"
            description="Tutustu mökkiin, huoneistoihin, neuvottelutilaan ja ympäristöön."
          />
        </div>
      </Section>

      <Section tone="white">
        <Eyebrow>Kuvia</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">Hiihtogreeni kuvina</h2>
        <div className="mt-8">
          <HomeCarousel
            images={fiHomeCarousel}
            label={FI_UI.carouselLabel}
            strings={{
              previous: FI_UI.galleryPrevious,
              next: FI_UI.galleryNext,
              slide: FI_UI.carouselSlide,
            }}
          />
        </div>
      </Section>

      <Section tone="mist">
        <SplitSection
          imageSide="right"
          image={{
            src: "/wp-content/uploads/2024/07/Levi-Majoitus-suuri-olohuone-Hiihtogreeni.jpg",
            width: 1250,
            height: 2160,
            alt: "Iso olohuone tunturinäkymin",
          }}
        >
          <Eyebrow>{s.introLead}</Eyebrow>
          <h2 className="mt-3 text-h2 font-display text-ink">Mökki aivan rinteiden vieressä</h2>
          <p className="mt-4 text-body">{s.intro}</p>
          <p className="mt-4 text-body">{s.location}</p>
          <div className="mt-6">{ctaButtons}</div>
        </SplitSection>
      </Section>

      <Section>
        <Eyebrow>Kohteen tiedot</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">Majoitutaan isollakin porukalla</h2>
        <div className="mt-8">
          <FactStrip
            facts={[
              { value: String(CAPACITY.apartments), label: "Huoneistoa" },
              { value: `${CAPACITY.guestsPerApartment}`, label: "Vierasta / huoneisto" },
              { value: String(CAPACITY.bedrooms), label: "Makuuhuonetta" },
              { value: String(CAPACITY.bathrooms), label: "Kylpyhuonetta" },
              { value: CAPACITY.area, label: "Pinta-ala / huoneisto" },
            ]}
          />
        </div>
      </Section>

      <Section tone="mist">
        <SplitSection
          imageSide="left"
          image={{
            src: "/wp-content/uploads/2026/07/Hiihgreeni-levi-rental-cabin-for-large-groups.jpg",
            width: 1600,
            height: 900,
            alt: "Hiihtogreeni – iso vuokramökki ryhmille Levillä",
          }}
        >
          <Eyebrow>{s.groupsLead}</Eyebrow>
          <h2 className="mt-3 text-h2 font-display text-ink">Ryhmille yrityksistä ystäviin</h2>
          <p className="mt-4 text-body">{s.groups}</p>
          <p className="mt-4 text-body">{s.groupsCta}</p>
          <p className="mt-4 text-body">
            {s.leviLink}:{" "}
            <a
              href={EXTERNAL_LINKS.leviFi}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-fjord-dark underline-offset-2 hover:underline"
            >
              levifinland.fi
            </a>
          </p>
        </SplitSection>
      </Section>

      <Section>
        <SplitSection
          imageSide="right"
          image={{
            src: "/wp-content/uploads/2026/07/levi_golf_green_fee.jpg",
            width: 1767,
            height: 1330,
            alt: "Levi Golfin kenttä kesällä",
          }}
        >
          <Eyebrow>{s.golfLead}</Eyebrow>
          <h2 className="mt-3 text-h2 font-display text-ink">Levi Golf -green fee -liput</h2>
          <p className="mt-4 text-body">{s.golf}</p>
          <p className="mt-4 text-body">{s.golfAfter}</p>
          <div className="mt-6">
            <ButtonLink href={EXTERNAL_LINKS.greenFee} external>{s.golfCta}</ButtonLink>
          </div>
        </SplitSection>
      </Section>

      <Section tone="mist">
        <SplitSection
          imageSide="left"
          image={{
            src: "/wp-content/uploads/2026/07/golf_course_views_from_hiihtogreeni_terrace.jpg",
            width: 1632,
            height: 1229,
            alt: "Golfkenttänäkymä Hiihtogreenin terassilta",
          }}
        >
          <Eyebrow>{s.viewsLead}</Eyebrow>
          <h2 className="mt-3 text-h2 font-display text-ink">Maisemat</h2>
          <p className="mt-4 text-body">{s.views}</p>
          <p className="mt-4 text-body">{s.closing}</p>
        </SplitSection>
      </Section>

      <CallToAction
        eyebrow="Varaa ainutlaatuinen loma Levin"
        title="Ota yhteyttä ja kysy saatavuutta"
        body={`${COMPANY.name}, ${COMPANY.address.street}, ${COMPANY.address.postalCode} ${COMPANY.address.city}. Vuokraus: ${RENTAL_CONTACT.name}, ${RENTAL_CONTACT.phoneDisplay}.`}
      >
        <ButtonLink href={getHref("fi", "contact")} variant="light">Yhteystiedot</ButtonLink>
        <ButtonLink href={`tel:${RENTAL_CONTACT.phone}`} variant="light">
          {RENTAL_CONTACT.phoneDisplay}
        </ButtonLink>
      </CallToAction>
    </SiteShell>
  );
}
