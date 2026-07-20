import Link from "next/link";
import type { Lang, NavItem, NavKey } from "../content/types.ts";
import { getNav, getUI } from "../content/index.ts";
import { LanguageSwitcher } from "./LanguageSwitcher.tsx";
import { MobileNav } from "./MobileNav.tsx";

interface HeaderProps {
  lang: Lang;
  /** The nav key of the current page, used to mark the active link. */
  activeKey?: NavKey;
}

export function Header({ lang, activeKey }: HeaderProps) {
  const nav = getNav(lang);
  const ui = getUI(lang);
  const homeHref = lang === "fi" ? "/" : "/en/home/";

  return (
    <header className="sticky top-0 z-50 border-b border-frost/70 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        {/* Text-based wordmark */}
        <Link
          href={homeHref}
          aria-label={ui.homeLinkLabel}
          className="font-display text-xl font-extrabold tracking-tight text-ink md:text-2xl"
        >
          Hiihtogreeni
        </Link>

        {/* Desktop navigation */}
        <nav aria-label={ui.primaryNav} className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {nav.map((item) => (
              <li key={item.key}>
                <DesktopNavLink
                  item={item}
                  isActive={item.key === activeKey}
                  currentPageLabel={ui.currentPage}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher lang={lang} activeKey={activeKey} className="hidden lg:flex" />
          {/* Mobile menu (client island); desktop nav stays server-rendered */}
          <MobileNav lang={lang} activeKey={activeKey} />
        </div>
      </div>
    </header>
  );
}

function DesktopNavLink({
  item,
  isActive,
  currentPageLabel,
}: {
  item: NavItem;
  isActive: boolean;
  currentPageLabel: string;
}) {
  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={
        "relative inline-flex min-h-11 items-center font-display text-sm font-semibold transition-colors " +
        (isActive
          ? "text-fjord-dark after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-ember-dark"
          : "text-ink hover:text-fjord-dark")
      }
    >
      {item.label}
      {isActive ? <span className="sr-only"> {currentPageLabel}</span> : null}
    </Link>
  );
}
