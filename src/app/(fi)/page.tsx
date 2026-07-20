import { SiteShell } from "../../components/SiteShell.tsx";
import { Hero, Section, Eyebrow, ButtonLink, FactStrip, SplitSection, ImageCard, CallToAction } from "../../components/ui/Primitives.tsx";
import {
  fiHome,
  fiHomeSections,
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
          src: "/wp-content/uploads/2022/10/banner-levin-hiihtogreeni.jpg",
          width: 750,
          height: 1900,
          alt: "Hiihtogreeni talvella Levitunturin ja järven äärellä",
        }}
        eyebrow="Levi, Lappi"
        title={fiHome.h1}
        lead="Korkeatasoinen vuokramökki Levin rinteiden ja golfkentän vieressä – aina 14 hengelle per huoneisto."
      >
        {heroButtons}
      </Hero>

      <Section>
        <div className="grid gap-8 md:grid-cols-3">
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
            src: "/wp-content/uploads/2022/10/banner_mokki-levilla.jpg",
            width: 450,
            height: 1900,
            alt: "Hiihtogreeni ulkopuolelta talvella",
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
            src: "/wp-content/uploads/2024/07/Large-and-warm-space-for-ski-maintenance.jpg",
            width: 1215,
            height: 2160,
            alt: "Suksien huoltotila kellarissa",
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
            src: "/wp-content/uploads/2024/07/Lahella-mokkia-on-Levijarven-uimaranta.jpg",
            width: 1216,
            height: 2160,
            alt: "Levijärven ranta kesällä",
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
