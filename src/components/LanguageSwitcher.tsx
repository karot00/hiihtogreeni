import Link from "next/link";
import type { Lang, NavKey } from "../content/types.ts";
import { getUI } from "../content/index.ts";
import { LANGUAGE_OPTIONS } from "../content/shared.ts";
import { getTranslation, getHref } from "../lib/routes.ts";

interface LanguageSwitcherProps {
  lang: Lang;
  /** Current page key so each language links to its own translation, not the homepage. */
  activeKey?: NavKey;
  className?: string;
}

/** Visually-hidden suffix announcing the active language in the switcher. */
const CURRENT_LANGUAGE_SUFFIX: Record<Lang, string> = {
  fi: "(nykyinen kieli)",
  en: "(current language)",
};

/**
 * Page-aware language switcher. Each option links to the translated URL of the
 * current page (falling back to the language home when the page key is unknown).
 * Uses ordinary crawlable links and renders as a server component.
 */
export function LanguageSwitcher({ lang, activeKey, className = "" }: LanguageSwitcherProps) {
  const ui = getUI(lang);

  return (
    <nav aria-label={ui.languageSwitcher} className={`items-center gap-1 ${className}`}>
      <ul className="flex items-center gap-1">
        {LANGUAGE_OPTIONS.map((option) => {
          const isCurrent = option.key === lang;
          const href = activeKey
            ? getTranslation(lang, activeKey, option.key)
            : getHref(option.key, "home");

          return (
            <li key={option.key}>
              <Link
                href={href}
                lang={option.hrefLang}
                aria-current={isCurrent ? "true" : undefined}
                className={
                  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-control)] px-2 font-display text-sm font-semibold transition-colors " +
                  (isCurrent
                    ? "bg-mist text-fjord-dark"
                    : "text-slate hover:text-fjord-dark")
                }
              >
                <span aria-hidden="true">{option.short}</span>
                <span className="sr-only">
                  {option.name}
                  {isCurrent ? ` ${CURRENT_LANGUAGE_SUFFIX[lang]}` : ""}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
