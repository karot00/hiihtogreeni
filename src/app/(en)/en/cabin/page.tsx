import { SiteShell } from "../../../../components/SiteShell.tsx";
import { Hero, Section, Eyebrow, ButtonLink, FactStrip, SplitSection, FactList, ImageCard, CallToAction } from "../../../../components/ui/Primitives.tsx";
import { enCabin, enCabinSections } from "../../../../content/en.ts";
import { CAPACITY, EXTERNAL_LINKS } from "../../../../content/shared.ts";
import { getHref } from "../../../../lib/routes.ts";
import { buildPageMetadata, OG_IMAGES } from "../../../../lib/seo.ts";

export const metadata = buildPageMetadata({
  lang: "en",
  key: "cabin",
  title: enCabin.title,
  description: enCabin.description,
  ogImage: OG_IMAGES.default,
});

export default function CabinPage() {
  const s = enCabinSections;
  const cta = (
    <>
      <ButtonLink href={getHref("en", "contact")}>Get in touch</ButtonLink>
      <ButtonLink href={getHref("en", "gallery")} variant="secondary">
        Photo gallery
      </ButtonLink>
    </>
  );

  return (
    <SiteShell lang="en" activeKey="cabin">
      <Hero
        image={{
          src: "/wp-content/uploads/2022/10/banneri_mokki.jpg",
          width: 450,
          height: 1900,
          alt: "Hiihtogreeni cabin exterior in winter",
        }}
        eyebrow="Levi, Lapland"
        title={enCabin.h1}
        lead="A log duplex with two 14-person apartments – all amenities in a top location by the pistes."
      />

      <Section>
        <Eyebrow>{s.lead}</Eyebrow>
        <h2 className="mt-3 max-w-[24ch] text-h2 font-display text-ink">A cabin in Levi, right by the pistes</h2>
        <p className="mt-4 max-w-[68ch] text-body">{s.intro}</p>
        <p className="mt-4 max-w-[68ch] text-body">{s.introAfter}</p>
      </Section>

      <Section tone="mist">
        <Eyebrow>Accommodation facts</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">Capacity and rooms</h2>
        <div className="mt-8">
          <FactStrip
            facts={[
              { value: String(CAPACITY.apartments), label: "14-person apartments" },
              { value: `${CAPACITY.guestsPerApartment}`, label: "Guests / apartment" },
              { value: String(CAPACITY.bedrooms), label: "Bedrooms" },
              { value: String(CAPACITY.bathrooms), label: "Bathrooms" },
              { value: CAPACITY.area, label: "Area / apartment" },
            ]}
          />
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          <FactList title="Apartments" items={s.apartments} />
          <FactList title="Bedrooms" items={s.bedrooms} />
          <FactList title="Living, kitchen & sauna" items={s.livingKitchen} />
        </div>
      </Section>

      <Section>
        <SplitSection
          imageSide="right"
          image={{
            src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-6.jpg",
            width: 533,
            height: 800,
            alt: "Sauna and covered terrace",
          }}
        >
          <Eyebrow>Special features</Eyebrow>
          <h2 className="mt-3 text-h2 font-display text-ink">Fireplace, sauna and conference room</h2>
          <ul className="mt-4 space-y-3 text-body">
            {s.special.map((item, index) => (
              <li key={index} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SplitSection>
      </Section>

      <Section tone="mist">
        <Eyebrow>Location</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">Close to pistes, golf, and the lake</h2>
        <p className="mt-4 max-w-[68ch] text-body">
          The cabin is located by the northeast pistes and Levi Golf. You can reach the slopes and
          tracks just 200 m away, and in summer you have a view of the Levi Golf course and its
          clubhouse. Direct snowmobile access from the yard.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <ImageCard
            href={EXTERNAL_LINKS.leviEn}
            image={{
              src: "/wp-content/uploads/2024/07/Mokki-Levi-Hiihtogreeni-neuvottelutila.jpg",
              width: 1216,
              height: 2160,
              alt: "Large conference room for 24 people",
            }}
            title="Cabin presentation"
            description="Meet Hiihtogreeni also on levifinland.fi."
          />
          <ImageCard
            href={getHref("en", "gallery")}
            image={{
              src: "/wp-content/uploads/2024/07/Isot-tilat-suksien-huoltoon-maajoukkueille-ja-seuroille-Levilla.jpg",
              width: 1216,
              height: 2160,
              alt: "Large spaces for ski maintenance",
            }}
            title="Photo gallery"
            description="See more photos of the cabin, apartments, and surroundings."
          />
        </div>
      </Section>

      <CallToAction
        eyebrow="Book the best stay for your group"
        title="Get in touch and ask about availability"
      >
        {cta}
      </CallToAction>
    </SiteShell>
  );
}
