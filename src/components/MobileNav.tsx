"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import type { Lang, NavItem, NavKey } from "../content/types.ts";
import { getNav, getUI } from "../content/index.ts";
import { LanguageSwitcher } from "./LanguageSwitcher.tsx";

interface MobileNavProps {
  lang: Lang;
  activeKey?: NavKey;
}

/**
 * Mobile navigation client island. Renders a disclosure button + slide/fade
 * panel for small screens; hidden from `lg` upward where the server-rendered
 * desktop nav takes over. Implements focus management and scroll locking
 * without trapping focus or scrolling unexpectedly.
 */
export function MobileNav({ lang, activeKey }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const nav = getNav(lang);
  const ui = getUI(lang);

  // Close on Escape; restore scroll lock on unmount.
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus();
    };
  }, [open]);

  // Move focus into the panel when it opens.
  useEffect(() => {
    if (open) {
      panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    }
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? ui.closeMenu : ui.openMenu}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-control)] px-2 font-display text-sm font-semibold text-ink transition-colors hover:text-fjord-dark"
      >
        <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        <span className="sr-only">{open ? ui.closeMenu : ui.openMenu}</span>
      </button>

      {open ? (
        <div
          id={panelId}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={ui.primaryNav}
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-white px-4 py-6 shadow-lg"
        >
          <nav aria-label={ui.primaryNav}>
            <ul className="flex flex-col gap-1">
              {nav.map((item: NavItem) => {
                const isActive = item.key === activeKey;
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={
                        "flex min-h-12 items-center rounded-[var(--radius-control)] px-3 font-display text-base font-semibold transition-colors " +
                        (isActive
                          ? "bg-mist text-fjord-dark"
                          : "text-ink hover:bg-mist hover:text-fjord-dark")
                      }
                    >
                      {item.label}
                      {isActive ? <span className="sr-only"> {ui.currentPage}</span> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-6 border-t border-frost/70 pt-4">
            <LanguageSwitcher lang={lang} activeKey={activeKey} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
