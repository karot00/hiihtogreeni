import { SiteShell } from "../../../components/SiteShell.tsx";
import { Hero, Section, Eyebrow } from "../../../components/ui/Primitives.tsx";
import { ContactForm } from "../../../components/ContactForm.tsx";
import { ContactDetails } from "../../../components/ContactDetails.tsx";
import { fiContact, fiContactSections } from "../../../content/fi.ts";
import { getFormStrings } from "../../../content/index.ts";
import { COMPANY, OBFUSCATED_CONTACTS, EXTERNAL_LINKS } from "../../../content/shared.ts";
import { buildPageMetadata, OG_IMAGES } from "../../../lib/seo.ts";

export const metadata = buildPageMetadata({
  lang: "fi",
  key: "contact",
  title: fiContact.title,
  description: fiContact.description,
  ogImage: OG_IMAGES.default,
});

export default function ContactPage() {
  const s = fiContactSections;
  const formStrings = getFormStrings("fi");

  return (
    <SiteShell lang="fi" activeKey="contact">
      <Hero
        image={{
          avif: "/hero/contact.avif",
          webp: "/hero/contact.webp",
          jpg: "/hero/contact.jpg",
          width: 1600,
          height: 1067,
          alt: "Hiihtogreeni Levillä",
        }}
        eyebrow="Levi, Lappi"
        title={fiContact.h1}
        lead={s.lead}
      />

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <Eyebrow>Vuokrausyhteys</Eyebrow>
            <h2 className="mt-3 text-h2 font-display text-ink">Ota suoraan yhteyttä</h2>
            <p className="mt-4 max-w-[60ch] text-body">{s.intro}</p>
            <address className="mt-6 not-italic text-body">
              <p className="font-display text-h3 font-bold text-fjord-dark">{COMPANY.name}</p>
              <p className="mt-1">
                {COMPANY.address.street}
                <br />
                {COMPANY.address.postalCode} {COMPANY.address.city}
                <br />
                {COMPANY.address.country}
              </p>
              <ContactDetails
                contact={OBFUSCATED_CONTACTS.rental}
                label="Vuokraus"
                revealLabel="Näytä puhelin ja sähköposti"
                className="mt-3"
              />
              <ContactDetails
                contact={OBFUSCATED_CONTACTS.maintenance}
                label="Huolto"
                revealLabel="Näytä puhelin ja sähköposti"
                className="mt-3"
              />
            </address>
            <div className="mt-6">
              <a
                href={EXTERNAL_LINKS.leviFi}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-[var(--radius-control)] border border-fjord px-4 font-display text-sm font-semibold text-fjord-dark transition-colors hover:bg-fjord/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fjord"
              >
                Katso sijainti (levifinland.fi)
              </a>
            </div>
          </div>

          <div>
            <Eyebrow>Yhteydenottolomake</Eyebrow>
            <h2 className="mt-3 text-h2 font-display text-ink">Lähetä viesti</h2>
            <ContactForm
              lang="fi"
              fields={s.formFields}
              consentLabel={s.consentLabel}
              contactMethodLabel={s.contactMethodLabel}
              contactMethods={s.contactMethods}
              sourcePage={fiContact.slug}
              strings={formStrings}
            />
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
