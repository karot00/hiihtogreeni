import Link from "next/link";
import type { Lang } from "../content/types.ts";
import { getNav, getUI, COMPANY, RENTAL_CONTACT, LANGUAGE_OPTIONS } from "../content/index.ts";
import { getHref } from "../lib/routes.ts";

interface FooterProps {
  lang: Lang;
}

/**
 * Shared site footer (server component). Surfaces company identity, address,
 * verified phone/email, concise navigation, language links, a contact action,
 * and a reserved cookie-settings boundary — per STYLE-BOOK.md:346.
 */
export function Footer({ lang }: FooterProps) {
  const ui = getUI(lang);
  const nav = getNav(lang);
  const year = new Date().getFullYear();
  const company = COMPANY;
  const contact = RENTAL_CONTACT;

  return (
    <footer className="mt-16 bg-pine text-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Identity + address */}
        <div>
          <p className="font-display text-lg font-extrabold tracking-tight">Hiihtogreeni</p>
          <p className="mt-1 text-sm text-white/70">{company.name}</p>
          <address className="mt-3 not-italic text-sm leading-relaxed text-white/90">
            {company.address.street}
            <br />
            {company.address.postalCode} {company.address.city}
            <br />
            {company.address.country}
            <br />
            <span className="text-white/70">{company.vatId}</span>
          </address>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white/70">
            {ui.footerContactHeading}
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={`tel:${contact.phone}`}
                className="rounded-[var(--radius-control)] underline-offset-2 hover:underline focus-visible:underline"
              >
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="rounded-[var(--radius-control)] underline-offset-2 hover:underline focus-visible:underline"
              >
                {contact.email}
              </a>
            </li>
          </ul>
          <Link
            href={getHref(lang, "contact")}
            className="mt-4 inline-flex min-h-11 items-center rounded-[var(--radius-control)] bg-ember px-4 font-display text-sm font-semibold text-ink transition-colors hover:bg-ember-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {ui.contactCta}
          </Link>
        </div>

        {/* Navigation */}
        <nav aria-label={ui.footerNav}>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white/70">
            {ui.footerNavHeading}
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="rounded-[var(--radius-control)] underline-offset-2 hover:underline focus-visible:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Languages + reserved cookie boundary */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white/70">
            {ui.footerLanguageHeading}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-3 text-sm">
            {LANGUAGE_OPTIONS.map((option) => (
              <li key={option.key}>
                <Link
                  href={getHref(option.key, "home")}
                  lang={option.hrefLang}
                  className="rounded-[var(--radius-control)] underline-offset-2 hover:underline focus-visible:underline"
                >
                  {option.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-4 text-xs text-white/60">
          {ui.rightsReserved} {year} {company.name}
        </div>
      </div>
    </footer>
  );
}
