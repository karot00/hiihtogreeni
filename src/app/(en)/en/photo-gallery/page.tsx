import { SiteShell } from "../../../../components/SiteShell.tsx";
import { Hero, Section, Eyebrow, ButtonLink, CallToAction } from "../../../../components/ui/Primitives.tsx";
import { GalleryGrid } from "../../../../components/GalleryGrid.tsx";
import { enGallery, enGallerySections, enGalleryImages } from "../../../../content/en.ts";
import { getUI } from "../../../../content/index.ts";
import { CAPACITY, RENTAL_CONTACT } from "../../../../content/shared.ts";
import { getHref } from "../../../../lib/routes.ts";
import { buildPageMetadata, OG_IMAGES } from "../../../../lib/seo.ts";

export const metadata = buildPageMetadata({
  lang: "en",
  key: "gallery",
  title: enGallery.title,
  description: enGallery.description,
  ogImage: OG_IMAGES.default,
});

export default function GalleryPage() {
  const ui = getUI("en");
  const s = enGallerySections;

  return (
    <SiteShell lang="en" activeKey="gallery">
      <Hero
        image={{
          avif: "/hero/gallery.avif",
          webp: "/hero/gallery.webp",
          jpg: "/hero/gallery.jpg",
          width: 1600,
          height: 1067,
          alt: "Hiihtogreeni photo gallery",
        }}
        eyebrow="Levi, Lapland"
        title={enGallery.h1}
        lead={s.lead}
      />

      <Section>
        <p className="max-w-[68ch] text-body">{s.intro}</p>
      </Section>

      <Section tone="mist">
        <Eyebrow>Photos</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">Cabin, apartments, and surroundings</h2>
        <div className="mt-8">
          <GalleryGrid
            label="Hiihtogreeni photo gallery"
            images={enGalleryImages}
            strings={{
              regionLabel: "Photo gallery",
              previous: ui.galleryPrevious,
              next: ui.galleryNext,
              close: ui.galleryClose,
            }}
          />
        </div>
      </Section>

      <Section>
        <Eyebrow>Floor plans</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">Explore the spaces in detail</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <figure>
            <img
              src="/wp-content/uploads/2022/10/Hgr3dalakerta.jpg"
              width={594}
              height={1024}
              alt="Ground floor plan"
              loading="lazy"
              className="w-full rounded-[var(--radius-card)] border border-frost object-contain"
            />
            <figcaption className="mt-3 text-sm text-slate">Ground floor plan</figcaption>
          </figure>
          <figure>
            <img
              src="/wp-content/uploads/2022/10/Hgr3dylakerta.jpg"
              width={499}
              height={1024}
              alt="First floor plan"
              loading="lazy"
              className="w-full rounded-[var(--radius-card)] border border-frost object-contain"
            />
            <figcaption className="mt-3 text-sm text-slate">First floor plan</figcaption>
          </figure>
        </div>
      </Section>

      <CallToAction
        eyebrow={`Two ${CAPACITY.guestsPerApartment}-person apartments`}
        title="Get in touch and book your best days"
        body={`Rental: ${RENTAL_CONTACT.name}, ${RENTAL_CONTACT.phoneDisplay}.`}
      >
        <ButtonLink href={getHref("en", "contact")}>Contact information</ButtonLink>
        <ButtonLink href={getHref("en", "cabin")} variant="secondary">
          Cabin details
        </ButtonLink>
      </CallToAction>
    </SiteShell>
  );
}
