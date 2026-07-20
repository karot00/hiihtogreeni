import { SiteShell } from "../../../components/SiteShell.tsx";
import { Hero, Section, Eyebrow, ButtonLink, FactStrip, SplitSection, FactList, ImageCard, CallToAction } from "../../../components/ui/Primitives.tsx";
import { fiCabin, fiCabinSections } from "../../../content/fi.ts";
import { COMPANY, CAPACITY, EXTERNAL_LINKS } from "../../../content/shared.ts";
import { getHref } from "../../../lib/routes.ts";
import { buildPageMetadata, OG_IMAGES } from "../../../lib/seo.ts";

export const metadata = buildPageMetadata({
  lang: "fi",
  key: "cabin",
  title: fiCabin.title,
  description: fiCabin.description,
  ogImage: OG_IMAGES.default,
});

export default function CabinPage() {
  const s = fiCabinSections;
  const cta = (
    <>
      <ButtonLink href={getHref("fi", "contact")}>Ota yhteyttä</ButtonLink>
      <ButtonLink href={getHref("fi", "gallery")} variant="secondary">
        Kuvagalleria
      </ButtonLink>
    </>
  );

  return (
    <SiteShell lang="fi" activeKey="cabin">
      <Hero
        image={{
          src: "/wp-content/uploads/2022/10/banneri_mokki.jpg",
          width: 450,
          height: 1900,
          alt: "Hiihtogreeni-mökki ulkopuolelta talvella",
        }}
        eyebrow="Levi, Lappi"
        title={fiCabin.h1}
        lead="Hirsirakenteinen paritalo kahdella 14 hengen huoneistolla – kaikki mukavuudet huippusijainnilla."
      />

      <Section>
        <Eyebrow>{s.lead}</Eyebrow>
        <h2 className="mt-3 max-w-[24ch] text-h2 font-display text-ink">Mökki Levillä, aivan rinteiden vieressä</h2>
        <p className="mt-4 max-w-[68ch] text-body">{s.intro}</p>
        <p className="mt-4 max-w-[68ch] text-body">{s.introAfter}</p>
      </Section>

      <Section tone="mist">
        <Eyebrow>Kohteen tiedot</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">Kapasiteetti ja huoneet</h2>
        <div className="mt-8">
          <FactStrip
            facts={[
              { value: String(CAPACITY.apartments), label: "14 hengen huoneistoa" },
              { value: `${CAPACITY.guestsPerApartment}`, label: "Vierasta / huoneisto" },
              { value: String(CAPACITY.bedrooms), label: "Makuuhuonetta" },
              { value: String(CAPACITY.bathrooms), label: "Kylpyhuonetta" },
              { value: CAPACITY.area, label: "Pinta-ala / huoneisto" },
            ]}
          />
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          <FactList title="Huoneistot" items={s.apartments} />
          <FactList title="Makuuhuoneet" items={s.bedrooms} />
          <FactList title="Olohuone ja keittiö" items={s.livingKitchen} />
        </div>
      </Section>

      <Section>
        <SplitSection
          imageSide="right"
          image={{
            src: "/wp-content/uploads/2022/10/Hiihtogreeni-mokki-6.jpg",
            width: 533,
            height: 800,
            alt: "Sauna ja katettu vilvoitteluterassi",
          }}
        >
          <Eyebrow>Erityispiirteet</Eyebrow>
          <h2 className="mt-3 text-h2 font-display text-ink">Takka, sauna ja neuvottelutila</h2>
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
        <Eyebrow>Sijainti</Eyebrow>
        <h2 className="mt-3 text-h2 font-display text-ink">Lähellä rinteitä, golfkenttää ja järveä</h2>
        <p className="mt-4 max-w-[68ch] text-body">
          {COMPANY.name} sijaitsee osoitteessa {COMPANY.address.street}, {COMPANY.address.postalCode}{" "}
          {COMPANY.address.city}. Kittilän lentoasemalle on matkaa autolla noin {COMPANY.airportDistance}.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <ImageCard
            href={EXTERNAL_LINKS.leviFi}
            image={{
              src: "/wp-content/uploads/2024/07/Mokki-Levi-Hiihtogreeni-neuvottelutila.jpg",
              width: 1216,
              height: 2160,
              alt: "Suuri neuvottelutila 24 hengelle",
            }}
            title="Mökin esittely"
            description="Tutustu Hiihtogreeniin myös levifinland.fi -sivustolla."
          />
          <ImageCard
            href={getHref("fi", "gallery")}
            image={{
              src: "/wp-content/uploads/2024/07/Isot-tilat-suksien-huoltoon-maajoukkueille-ja-seuroille-Levilla.jpg",
              width: 1216,
              height: 2160,
              alt: "Isot tilat suksien huoltoon",
            }}
            title="Kuvagalleria"
            description="Katso lisää kuvia mökistä, huoneistoista ja ympäristöstä."
          />
        </div>
      </Section>

      <CallToAction
        eyebrow="Varaa ryhmällesi paras majoitus"
        title="Ota yhteyttä ja kysy saatavuutta"
      >
        {cta}
      </CallToAction>
    </SiteShell>
  );
}
