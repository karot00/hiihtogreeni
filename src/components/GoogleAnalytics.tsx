"use client";

import { useEffect, useRef, useState } from "react";
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
 * GA4 integration (Phase 14), gated by the Phase 13 cookie-consent category and
 * implemented with Google Consent Mode v2:
 * - the gtag.js loader is mounted only once analytics consent has been granted
 *   (and stays mounted afterwards so revocation is honored via an update);
 * - Consent Mode defaults to denied, and `analytics_storage` follows the
 *   visitor's choice through `gtag('consent','update', ...)`;
 * - the first page_view comes from the `config` call; subsequent client-side
 *   navigations fire a manual page_view (initial render is skipped).
 */
export function GoogleAnalytics({ lang }: GoogleAnalyticsProps) {
  const { consent } = useCookieConsent();
  const analyticsAllowed = isCategoryAllowed(consent, "analytics");
  const pathname = usePathname();

  // Once gtag.js has loaded we keep the loader mounted so later consent changes
  // (including a later revocation) can be honored via gtag('consent','update')
  // without remounting the script. Adjusted during render (not in an effect) to
  // satisfy the no-setState-in-effect lint rule.
  const [hasLoaded, setHasLoaded] = useState(false);
  if (analyticsAllowed && !hasLoaded) {
    setHasLoaded(true);
  }

  const showLoader =
    Boolean(GA4_MEASUREMENT_ID) && (analyticsAllowed || hasLoaded);

  // Re-apply Consent Mode whenever the choice changes. Commands are pushed onto
  // the dataLayer so they queue correctly even if the library has not loaded
  // yet; when analytics is granted we also (re)configure the stream.
  useEffect(() => {
    if (!GA4_MEASUREMENT_ID) {
      return;
    }
    pushToDataLayer(["consent", "update", buildConsentUpdate(analyticsAllowed)]);
    if (analyticsAllowed) {
      pushToDataLayer([
        "config",
        GA4_MEASUREMENT_ID,
        { page_title: document.title, page_location: window.location.href },
      ]);
    }
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
