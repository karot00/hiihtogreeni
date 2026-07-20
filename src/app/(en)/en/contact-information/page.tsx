import { SiteShell } from "../../../../components/SiteShell.tsx";
import { Hero, Section, Eyebrow } from "../../../../components/ui/Primitives.tsx";
import { ContactForm } from "../../../../components/ContactForm.tsx";
import { enContact, enContactSections } from "../../../../content/en.ts";
import { getFormStrings } from "../../../../content/index.ts";
import { COMPANY, RENTAL_CONTACT, MAINTENANCE_CONTACT, EXTERNAL_LINKS } from "../../../../content/shared.ts";
import { buildPageMetadata, OG_IMAGES } from "../../../../lib/seo.ts";

export const metadata = buildPageMetadata({
  lang: "en",
  key: "contact",
  title: enContact.title,
  description: enContact.description,
  ogImage: OG_IMAGES.default,
});

export default function ContactPage() {
  const s = enContactSections;
  const formStrings = getFormStrings("en");

  return (
    <SiteShell lang="en" activeKey="contact">
      <Hero
        image={{
          avif: "/hero/contact.avif",
          webp: "/hero/contact.webp",
          jpg: "/hero/contact.jpg",
          width: 1600,
          height: 1067,
          alt: "Hiihtogreeni in Levi",
        }}
        eyebrow="Levi, Lapland"
        title={enContact.h1}
        lead={s.lead}
      />

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <Eyebrow>Rental contact</Eyebrow>
            <h2 className="mt-3 text-h2 font-display text-ink">Reach us directly</h2>
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
              <p className="mt-3">
                <span className="font-semibold">Rental:</span> {RENTAL_CONTACT.name}
                <br />
                <a
                  href={`tel:${RENTAL_CONTACT.phone}`}
                  className="font-semibold text-fjord-dark underline-offset-2 hover:underline"
                >
                  {RENTAL_CONTACT.phoneDisplay}
                </a>
                <br />
                <a
                  href={`mailto:${RENTAL_CONTACT.email}`}
                  className="font-semibold text-fjord-dark underline-offset-2 hover:underline"
                >
                  {RENTAL_CONTACT.email}
                </a>
              </p>
              <p className="mt-3">
                <span className="font-semibold">Maintenance:</span> {MAINTENANCE_CONTACT.name}
                <br />
                <a
                  href={`tel:${MAINTENANCE_CONTACT.phone}`}
                  className="font-semibold text-fjord-dark underline-offset-2 hover:underline"
                >
                  {MAINTENANCE_CONTACT.phoneDisplay}
                </a>
                <br />
                <a
                  href={`mailto:${MAINTENANCE_CONTACT.email}`}
                  className="font-semibold text-fjord-dark underline-offset-2 hover:underline"
                >
                  {MAINTENANCE_CONTACT.email}
                </a>
              </p>
            </address>
            <div className="mt-6">
              <a
                href={EXTERNAL_LINKS.leviEn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-[var(--radius-control)] border border-fjord px-4 font-display text-sm font-semibold text-fjord-dark transition-colors hover:bg-fjord/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fjord"
              >
                See location (levifinland.fi)
              </a>
            </div>
          </div>

          <div>
            <Eyebrow>Contact form</Eyebrow>
            <h2 className="mt-3 text-h2 font-display text-ink">Send a message</h2>
            <ContactForm
              lang="en"
              fields={s.formFields}
              consentLabel={s.consentLabel}
              contactMethodLabel={s.contactMethodLabel}
              contactMethods={s.contactMethods}
              sourcePage={enContact.slug}
              strings={formStrings}
            />
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
