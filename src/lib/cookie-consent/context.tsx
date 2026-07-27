"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import { CONSENT_SCHEMA_VERSION } from "./constants.ts";
import { isBannerRequired } from "./gate.ts";
import {
  createDefaultConsentState,
  readConsentFromBrowser,
  writeConsentToBrowser,
} from "./storage.ts";
import type { ConsentCategoryPreferences, ConsentState } from "./types.ts";

type CookieConsentProviderProps = PropsWithChildren<{
  initialConsent?: ConsentState;
}>;

type CookieConsentContextValue = {
  consent: ConsentState;
  isSettingsOpen: boolean;
  isBannerVisible: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (categories: Partial<ConsentCategoryPreferences>) => void;
  openSettings: () => void;
  closeSettings: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
);

function buildConsentState(
  categories: Partial<ConsentCategoryPreferences>,
): ConsentState {
  return {
    version: CONSENT_SCHEMA_VERSION,
    updatedAt: new Date().toISOString(),
    categories: {
      essential: true,
      functional: categories.functional === true,
      analytics: categories.analytics === true,
      marketing: categories.marketing === true,
    },
  };
}

export function CookieConsentProvider({
  children,
  initialConsent,
}: CookieConsentProviderProps) {
  const [consent, setConsent] = useState<ConsentState>(
    () => initialConsent ?? createDefaultConsentState(),
  );
  const [hasHydrated, setHasHydrated] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    // Read the cookie only on the client so SSR and hydrated HTML match.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(readConsentFromBrowser());
    setHasHydrated(true);
  }, []);

  const persistConsent = useCallback((nextState: ConsentState) => {
    setConsent(nextState);
    writeConsentToBrowser(nextState);
  }, []);

  const acceptAll = useCallback(() => {
    persistConsent({
      version: CONSENT_SCHEMA_VERSION,
      updatedAt: new Date().toISOString(),
      categories: {
        essential: true,
        functional: true,
        analytics: true,
        marketing: true,
      },
    });
    setIsSettingsOpen(false);
  }, [persistConsent]);

  const rejectNonEssential = useCallback(() => {
    persistConsent({
      version: CONSENT_SCHEMA_VERSION,
      updatedAt: new Date().toISOString(),
      categories: {
        essential: true,
        functional: false,
        analytics: false,
        marketing: false,
      },
    });
    setIsSettingsOpen(false);
  }, [persistConsent]);

  const savePreferences = useCallback(
    (categories: Partial<ConsentCategoryPreferences>) => {
      persistConsent(
        buildConsentState({
          ...consent.categories,
          ...categories,
          essential: true,
        }),
      );
      setIsSettingsOpen(false);
    },
    [consent.categories, persistConsent],
  );

  const openSettings = useCallback(() => {
    setIsSettingsOpen(true);
  }, []);

  const closeSettings = useCallback(() => {
    setIsSettingsOpen(false);
  }, []);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      isSettingsOpen,
      // Only expose the banner once the real cookie has been read on the
      // client, so a returning visitor never sees a flash of the banner.
      isBannerVisible: hasHydrated && isBannerRequired(consent),
      acceptAll,
      rejectNonEssential,
      savePreferences,
      openSettings,
      closeSettings,
    }),
    [
      acceptAll,
      closeSettings,
      consent,
      hasHydrated,
      isSettingsOpen,
      openSettings,
      rejectNonEssential,
      savePreferences,
    ],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): CookieConsentContextValue {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error(
      "useCookieConsent must be used within CookieConsentProvider",
    );
  }

  return context;
}
