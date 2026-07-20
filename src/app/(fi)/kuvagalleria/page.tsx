import { SiteShell } from "../../../components/SiteShell.tsx";
import { Hero, Section, Eyebrow, ButtonLink, CallToAction } from "../../../components/ui/Primitives.tsx";
import { GalleryGrid } from "../../../components/GalleryGrid.tsx";
import { fiGallery, fiGallerySections, fiGalleryImages } from "../../../content/fi.ts";
import { getUI } from "../../../content/index.ts";
import { CAPACITY, RENTAL_CONTACT } from "../../../content/shared.ts";
import { getHref } from "../../../lib/routes.ts";
import { buildPageMetadata, OG_IMAGES } from "../../../lib/seo.ts";

export const metadata = buildPageMetadata({
  lang: "fi",
  key: "gallery",
  title: fiGallery.title,
  description: fiGallery.description,
  ogImage: OG_IMAGES.default,
});

export default function GalleryPage() {
  const ui = getUI("fi");
  const s = fiGallerySections;

  return (
    <SiteShell lang="fi" activeKey="gallery">
      <Hero
        image={{
          src: "/wp-content/uploads/2022/10/banner-kuvagalleria.jpg",
          width: 450,
          height: 1900,
          alt: "Hiihtogreeni-kuvagalleria",
        }}
        eyebrow="Levi, Lappi"
        title={fiGallery.h1}
        lead={s.lead}
      />

      <Section>
        <p className="max-w-[68ch] text-body">{s.intro}</p>
      </Section>

      <Section tone="mist">
        <Eyebrow>Kuvat</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">Mökki, huoneistot ja ympäristö</h2>
        <div className="mt-8">
          <GalleryGrid
            label="Hiihtogreenin kuvagalleria"
            images={fiGalleryImages}
            strings={{
              regionLabel: "Kuvagalleria",
              previous: ui.galleryPrevious,
              next: ui.galleryNext,
              close: ui.galleryClose,
            }}
          />
        </div>
      </Section>

      <Section>
        <Eyebrow>Pohjapiirrokset ja kartat</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">Tutustu tiloihin tarkemmin</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <figure>
            <img
              src="/wp-content/uploads/2022/10/Hgr3dalakerta.jpg"
              width={594}
              height={1024}
              alt="Pohjakuva alakerta"
              loading="lazy"
              className="w-full rounded-[var(--radius-card)] border border-frost object-contain"
            />
            <figcaption className="mt-3 text-sm text-slate">Pohjakuva alakerta</figcaption>
          </figure>
          <figure>
            <img
              src="/wp-content/uploads/2022/10/Hgr3dylakerta.jpg"
              width={499}
              height={1024}
              alt="Pohjakuva yläkerta"
              loading="lazy"
              className="w-full rounded-[var(--radius-card)] border border-frost object-contain"
            />
            <figcaption className="mt-3 text-sm text-slate">Pohjakuva yläkerta</figcaption>
          </figure>
          <figure>
            <img
              src="/wp-content/uploads/2025/07/Points-of-interest-Hiihtogreeni-summer.jpg"
              width={681}
              height={1024}
              alt="Kiinnostavat kohteet – kesäkartta"
              loading="lazy"
              className="w-full rounded-[var(--radius-card)] border border-frost object-contain"
            />
            <figcaption className="mt-3 text-sm text-slate">
              Kiinnostavat kohteet – kesäkartta
            </figcaption>
          </figure>
          <figure>
            <img
              src="/wp-content/uploads/2025/07/Points-of-interest-Hiihtogreeni-winter.jpg"
              width={681}
              height={1024}
              alt="Kiinnostavat kohteet – talvikartta"
              loading="lazy"
              className="w-full rounded-[var(--radius-card)] border border-frost object-contain"
            />
            <figcaption className="mt-3 text-sm text-slate">
              Kiinnostavat kohteet – talvikartta
            </figcaption>
          </figure>
        </div>
      </Section>

      <CallToAction
        eyebrow={`Kaksi ${CAPACITY.guestsPerApartment} hengen huoneistoa`}
        title="Ota yhteyttä ja varaa parhaat päivät"
        body={`Vuokraus: ${RENTAL_CONTACT.name}, ${RENTAL_CONTACT.phoneDisplay}.`}
      >
        <ButtonLink href={getHref("fi", "contact")}>Yhteystiedot</ButtonLink>
        <ButtonLink href={getHref("fi", "cabin")} variant="secondary">
          Mökin tiedot
        </ButtonLink>
      </CallToAction>
    </SiteShell>
  );
}
