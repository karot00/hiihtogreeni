"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

import type { Lang } from "../content/types.ts";
import { useCookieConsent } from "../lib/cookie-consent/context.tsx";
import { isCategoryAllowed } from "../lib/cookie-consent/gate.ts";
import {
  GA4_MEASUREMENT_ID,
  GA4_EVENTS,
  buildConsentUpdate,
  pushToDataLayer,
  safeOutboundHostname,
  trackEvent,
} from "../lib/analytics.ts";

// Initializes the dataLayer, defines gtag, and sets Consent Mode v2 defaults to
// DENIED before any config call — so no GA4 request or cookie is sent until the
// visitor explicitly grants analytics consent.
const INIT_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});`;

const GTM_SRC = "https://www.googletagmanager.com/gtag/js";

interface GoogleAnalyticsProps {
  lang: Lang;
}

/**
 * GA4 integration (Phase 14), implemented with Google Consent Mode v2.
 *
 * The gtag.js loader is mounted whenever a measurement ID is configured, so GA4
 * verification always finds the tag. Collection itself is gated by consent, not
 * by whether the script is present: the inline init script sets every Consent
 * Mode v2 signal to DENIED before any config call, and the visitor's choice is
 * applied through `gtag('consent','update', ...)` (and a `config` call only when
 * analytics is granted). This is Google's recommended Consent Mode v2 pattern —
 * the tag is present, but no request or cookie leaves the browser until the
 * analytics category is explicitly allowed; revocation is honored immediately.
 *
 * The first page_view comes from the `config` call on grant; subsequent
 * client-side navigations fire a manual page_view (initial render is skipped).
 */
export function GoogleAnalytics({ lang }: GoogleAnalyticsProps) {
  const { consent } = useCookieConsent();
  const analyticsAllowed = isCategoryAllowed(consent, "analytics");
  const pathname = usePathname();

  // The gtag.js loader is always injected when a measurement ID is configured
  // (so GA4 verification sees the tag). Consent Mode v2 defaults every signal to
  // denied in INIT_SCRIPT, so no request or cookie is sent until the visitor
  // grants the analytics category. Revocation is honored by the consent update
  // pushed from the consent handlers — the script simply stays mounted.
  const showLoader = Boolean(GA4_MEASUREMENT_ID);

  // Bind the tag to the property on every load by always (re)configuring the
  // stream. Because INIT_SCRIPT sets Consent Mode v2 to denied by default, the
  // config call sends nothing until the visitor grants analytics. When consent
  // is granted we push the consent UPDATE first and then config again, so the
  // first page_view is actually dispatched for the current page; revocation
  // pushes the update with analytics denied. Commands are pushed onto the
  // dataLayer so they queue correctly even if the library has not loaded yet.
  useEffect(() => {
    if (!GA4_MEASUREMENT_ID) {
      return;
    }
    if (analyticsAllowed) {
      pushToDataLayer(["consent", "update", buildConsentUpdate(true)]);
    } else {
      pushToDataLayer(["consent", "update", buildConsentUpdate(false)]);
    }
    pushToDataLayer([
      "config",
      GA4_MEASUREMENT_ID,
      { page_title: document.title, page_location: window.location.href },
    ]);
  }, [analyticsAllowed]);

  // Single-fire page views: the config call above already sends the first
  // page_view on load. Fire a manual page_view only on subsequent client-side
  // navigations (skip the initial render). usePathname avoids the Suspense
  // requirement that useSearchParams would impose on these static pages.
  const lastPath = useRef<string | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const current = window.location.pathname + window.location.search;
    if (lastPath.current === null) {
      lastPath.current = current;
      return;
    }
    if (lastPath.current === current || !analyticsAllowed) {
      return;
    }
    lastPath.current = current;
    trackEvent("page_view", {
      page_path: current,
      page_location: window.location.href,
      page_title: document.title,
      language: lang,
    });
  }, [pathname, lang, analyticsAllowed]);

  // Click tracking for conversion actions that are not form submissions:
  // tel:/mailto: (no PII in params) and outbound links (hostname only).
  useEffect(() => {
    if (!analyticsAllowed) {
      return;
    }
    function onClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) {
        return;
      }
      const href = anchor.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) {
        trackEvent(GA4_EVENTS.contactClick, { method: "tel" });
        return;
      }
      if (href.startsWith("mailto:")) {
        trackEvent(GA4_EVENTS.contactClick, { method: "mailto" });
        return;
      }
      const host = safeOutboundHostname(href, window.location.origin);
      if (host) {
        trackEvent(GA4_EVENTS.outboundClick, { outbound_host: host });
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [analyticsAllowed]);

  if (!showLoader) {
    return null;
  }

  return (
    <>
      <Script id="ga4-init" strategy="afterInteractive">
        {INIT_SCRIPT}
      </Script>
      <Script
        src={`${GTM_SRC}?id=${GA4_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
