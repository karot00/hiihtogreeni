"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import type { Lang } from "../content/types.ts";
import { getCookieConsentCopy } from "../content/index.ts";
import {
  CONSENT_CATEGORY_CONFIG,
  CONSENT_INVENTORY,
} from "../lib/cookie-consent/config.ts";
import { useCookieConsent } from "../lib/cookie-consent/context.tsx";
import type { ConsentCategory } from "../lib/cookie-consent/types.ts";

interface CookieConsentPreferencesProps {
  lang: Lang;
}

const FOCUSABLE_SELECTOR =
  "a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex='-1'])";

const PRIMARY_BUTTON =
  "inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] bg-fjord-dark px-4 font-display text-sm font-semibold text-white transition-colors hover:bg-pine focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fjord";
const SECONDARY_BUTTON =
  "inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] border border-fjord px-4 font-display text-sm font-semibold text-fjord-dark transition-colors hover:bg-fjord/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fjord";
const GHOST_BUTTON =
  "inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] px-4 font-display text-sm font-semibold text-fjord-dark underline-offset-2 transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fjord";

/**
 * Cookie preferences dialog: per-category toggles plus a truthful technology
 * inventory table. Ported from levifinland2026 with next-intl replaced by the
 * content-module copy lookup and restyled with this project's tokens.
 */
export function CookieConsentPreferences({
  lang,
}: CookieConsentPreferencesProps) {
  const copy = getCookieConsentCopy(lang);
  const {
    consent,
    isSettingsOpen,
    closeSettings,
    savePreferences,
    rejectNonEssential,
    acceptAll,
  } = useCookieConsent();

  const titleId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [draftCategories, setDraftCategories] = useState(consent.categories);
  const [hasDraftChanges, setHasDraftChanges] = useState(false);

  const currentDraft = hasDraftChanges ? draftCategories : consent.categories;

  const resetDraft = useCallback(() => {
    setHasDraftChanges(false);
    setDraftCategories(consent.categories);
  }, [consent.categories]);

  const handleCloseSettings = useCallback(() => {
    resetDraft();
    closeSettings();
  }, [closeSettings, resetDraft]);

  useEffect(() => {
    if (!isSettingsOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const firstFocusable =
      panel?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    firstFocusable?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        handleCloseSettings();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableNodes = panel
        ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
        : [];

      if (focusableNodes.length === 0) {
        return;
      }

      const first = focusableNodes[0];
      const last = focusableNodes[focusableNodes.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [handleCloseSettings, isSettingsOpen]);

  const groupedInventory = useMemo(() => {
    return CONSENT_CATEGORY_CONFIG.map((categoryConfig) => ({
      category: categoryConfig.id,
      required: categoryConfig.required,
      title: copy.categories[categoryConfig.id].title,
      description: copy.categories[categoryConfig.id].description,
      items: CONSENT_INVENTORY.filter(
        (item) => item.category === categoryConfig.id,
      ),
    }));
  }, [copy]);

  if (!isSettingsOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-ink/55 p-3 sm:items-center sm:p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleCloseSettings();
        }
      }}
    >
      <section
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="my-auto flex max-h-[96svh] w-full max-w-3xl flex-col overflow-hidden rounded-[var(--radius-card)] border border-frost bg-white shadow-overlay"
      >
        <header className="border-b border-frost/80 px-5 py-4 sm:px-6">
          <p className="eyebrow">{copy.preferences.eyebrow}</p>
          <h2
            id={titleId}
            className="mt-1 font-display text-lg font-bold text-ink"
          >
            {copy.preferences.title}
          </h2>
          <p className="mt-1 text-sm text-slate">
            {copy.preferences.description}
          </p>
        </header>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-4 pb-5 sm:px-6 sm:pb-6">
          {groupedInventory.map((entry) => {
            const toggleId = `consent-toggle-${entry.category}`;
            const enabled = currentDraft[entry.category as ConsentCategory];

            return (
              <article
                key={entry.category}
                className="rounded-[var(--radius-card)] border border-frost bg-snow p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-display text-sm font-bold text-ink">
                      {entry.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate">
                      {entry.description}
                    </p>
                  </div>

                  <label
                    htmlFor={toggleId}
                    className="inline-flex min-h-11 items-center gap-3 self-start"
                  >
                    <input
                      id={toggleId}
                      type="checkbox"
                      checked={enabled}
                      disabled={entry.required}
                      onChange={(event) => {
                        const nextChecked = event.currentTarget.checked;

                        setHasDraftChanges(true);
                        setDraftCategories((previous) => ({
                          ...previous,
                          [entry.category]: entry.required ? true : nextChecked,
                        }));
                      }}
                      className="h-4 w-4 rounded border-frost accent-fjord-dark disabled:cursor-not-allowed disabled:opacity-70"
                    />
                    <span className="text-xs font-medium text-slate">
                      {entry.required
                        ? copy.categories.alwaysActive
                        : copy.categories.optional}
                    </span>
                  </label>
                </div>

                {entry.items.length > 0 ? (
                  <details className="mt-3 rounded-[var(--radius-control)] border border-frost bg-white">
                    <summary className="cursor-pointer px-3 py-2 text-xs font-medium text-slate sm:text-sm">
                      {copy.inventory.detailsLabel}
                    </summary>
                    <div className="overflow-x-auto border-t border-frost/80">
                      <table className="w-full border-collapse text-left text-xs sm:text-sm">
                        <thead className="text-slate">
                          <tr>
                            <th scope="col" className="px-3 py-2 font-medium">
                              {copy.inventory.name}
                            </th>
                            <th scope="col" className="px-3 py-2 font-medium">
                              {copy.inventory.provider}
                            </th>
                            <th scope="col" className="px-3 py-2 font-medium">
                              {copy.inventory.purpose}
                            </th>
                            <th scope="col" className="px-3 py-2 font-medium">
                              {copy.inventory.duration}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {entry.items.map((item) => (
                            <tr key={item.name} className="border-t border-frost/80">
                              <td className="px-3 py-2 text-ink">
                                {item.name}
                                {!item.active ? (
                                  <span className="block text-xs text-slate">
                                    {copy.inventory.deferredNote}
                                  </span>
                                ) : null}
                              </td>
                              <td className="px-3 py-2 text-slate">
                                {item.provider}
                              </td>
                              <td className="px-3 py-2 text-slate">
                                {copy.inventory.items[item.id].purpose}
                              </td>
                              <td className="px-3 py-2 text-slate">
                                {copy.inventory.items[item.id].duration}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </details>
                ) : (
                  <p className="mt-3 text-xs text-slate">
                    {copy.inventory.emptyCategory}
                  </p>
                )}
              </article>
            );
          })}
        </div>

        <footer className="sticky bottom-0 flex flex-wrap items-center justify-end gap-2 border-t border-frost bg-white px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
          <button
            type="button"
            className={GHOST_BUTTON}
            onClick={handleCloseSettings}
          >
            {copy.actions.cancel}
          </button>
          <button
            type="button"
            className={SECONDARY_BUTTON}
            onClick={rejectNonEssential}
          >
            {copy.actions.rejectNonEssential}
          </button>
          <button type="button" className={SECONDARY_BUTTON} onClick={acceptAll}>
            {copy.actions.acceptAll}
          </button>
          <button
            type="button"
            className={PRIMARY_BUTTON}
            onClick={() => {
              savePreferences(currentDraft);
              setHasDraftChanges(false);
            }}
          >
            {copy.actions.savePreferences}
          </button>
        </footer>
      </section>
    </div>
  );
}
