import { SiteShell } from "../../../../components/SiteShell.tsx";
import { Hero, Section, Eyebrow, ButtonLink, FactStrip, SplitSection, ImageCard, CallToAction } from "../../../../components/ui/Primitives.tsx";
import { enHome, enHomeSections } from "../../../../content/en.ts";
import { CAPACITY, EXTERNAL_LINKS, RENTAL_CONTACT } from "../../../../content/shared.ts";
import { getHref } from "../../../../lib/routes.ts";
import { buildPageMetadata, OG_IMAGES } from "../../../../lib/seo.ts";

export const metadata = buildPageMetadata({
  lang: "en",
  key: "home",
  title: enHome.title,
  description: enHome.description,
  ogImage: OG_IMAGES.homeEn,
});

export default function EnglishHomePage() {
  const s = enHomeSections;
  const cta = (
    <>
      <ButtonLink href={getHref("en", "cabin")}>Explore the cabin</ButtonLink>
      <ButtonLink href={getHref("en", "contact")} variant="secondary">
        Get in touch
      </ButtonLink>
    </>
  );

  return (
    <SiteShell lang="en" activeKey="home">
      <Hero
        image={{
          src: "/wp-content/uploads/2022/10/banner-levin-hiihtogreeni.jpg",
          width: 750,
          height: 1900,
          alt: "Hiihtogreeni in winter by Levi fell and lake",
        }}
        eyebrow="Levi, Lapland"
        title={enHome.h1}
        lead="A high-quality rental cabin next to the Levi pistes and golf course – up to 14 guests per apartment."
      >
        {cta}
      </Hero>

      <Section>
        <div className="grid gap-8 md:grid-cols-3">
          <ImageCard
            href={getHref("en", "cabin")}
            image={{
              src: "/wp-content/uploads/2022/10/nosto_mokki.jpg",
              width: 450,
              height: 1900,
              alt: "Hiihtogreeni cabin",
            }}
            title="Cabin"
            description="Two 14-person apartments, private bathroom in every bedroom."
          />
          <ImageCard
            href={getHref("en", "rates")}
            image={{
              src: "/wp-content/uploads/2022/10/nosto_hinnasto.jpg",
              width: 450,
              height: 1900,
              alt: "Rates",
            }}
            title="Rates"
            description="Seasonal accommodation and green-fee pricing and booking terms."
          />
          <ImageCard
            href={getHref("en", "gallery")}
            image={{
              src: "/wp-content/uploads/2022/10/nosto_vuokramokki-galleria.jpg",
              width: 450,
              height: 1900,
              alt: "Photo gallery",
            }}
            title="Photo Gallery"
            description="See the cabin, apartments, conference room, and surroundings."
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
            alt: "Large living room with fell views",
          }}
        >
          <Eyebrow>{s.introLead}</Eyebrow>
          <h2 className="mt-3 text-h2 font-display text-ink">A cabin right by the pistes</h2>
          <p className="mt-4 text-body">{s.intro}</p>
          <p className="mt-4 text-body">{s.location}</p>
          <div className="mt-6">{cta}</div>
        </SplitSection>
      </Section>

      <Section>
        <Eyebrow>Accommodation facts</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">Comfortable for larger groups too</h2>
        <div className="mt-8">
          <FactStrip
            facts={[
              { value: String(CAPACITY.apartments), label: "Apartments" },
              { value: `${CAPACITY.guestsPerApartment}`, label: "Guests / apartment" },
              { value: String(CAPACITY.bedrooms), label: "Bedrooms" },
              { value: String(CAPACITY.bathrooms), label: "Bathrooms" },
              { value: CAPACITY.area, label: "Area / apartment" },
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
            alt: "Hiihtogreeni cabin exterior in winter",
          }}
        >
          <Eyebrow>{s.groupsLead}</Eyebrow>
          <h2 className="mt-3 text-h2 font-display text-ink">For groups, from corporate to friends</h2>
          <p className="mt-4 text-body">{s.groups}</p>
          <p className="mt-4 text-body">{s.groupsCta}</p>
          <p className="mt-4 text-body">
            {s.leviLink}:{" "}
            <a
              href={EXTERNAL_LINKS.leviEn}
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
            alt: "Ski maintenance space in the basement",
          }}
        >
          <Eyebrow>{s.golfLead}</Eyebrow>
          <h2 className="mt-3 text-h2 font-display text-ink">Levi Golf green fees</h2>
          <p className="mt-4 text-body">{s.golf}</p>
          <p className="mt-4 text-body">{s.golfAfter}</p>
          <div className="mt-6">
            <ButtonLink href={getHref("en", "rates")}>{s.golfCta}</ButtonLink>
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
            alt: "Levijärvi beach in summer",
          }}
        >
          <Eyebrow>{s.viewsLead}</Eyebrow>
          <h2 className="mt-3 text-h2 font-display text-ink">Scenery</h2>
          <p className="mt-4 text-body">{s.views}</p>
          <p className="mt-4 text-body">{s.closing}</p>
        </SplitSection>
      </Section>

      <CallToAction
        eyebrow="Book a unique Lapland stay"
        title="Get in touch and ask about availability"
        body={`${CAPACITY.guestsPerApartment} guests per apartment. Rental: ${RENTAL_CONTACT.name}, ${RENTAL_CONTACT.phoneDisplay}.`}
      >
        <ButtonLink href={getHref("en", "contact")}>Contact information</ButtonLink>
        <ButtonLink href={`tel:${RENTAL_CONTACT.phone}`} variant="secondary">
          {RENTAL_CONTACT.phoneDisplay}
        </ButtonLink>
      </CallToAction>
    </SiteShell>
  );
}
