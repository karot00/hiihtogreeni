"use client";

import { useEffect } from "react";
import Script from "next/script";

import { UMAMI_DOMAINS, UMAMI_SCRIPT_URL, UMAMI_WEBSITE_ID, classifyClick, umamiTrack } from "../lib/umami.ts";

/**
 * Cookieless Umami page views (automatic, also on client-side navigation) and
 * the two click events of the plan. Not consent-gated: Umami sets no cookies
 * and stores no IP addresses. Renders nothing until the website id is set.
 */
export function UmamiAnalytics() {
  useEffect(() => {
    if (!UMAMI_WEBSITE_ID) return;
    function onClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement | null)?.closest("a");
      const href = anchor?.getAttribute("href");
      if (!anchor || !href) return;
      const where = anchor.closest("header") ? "header" : anchor.closest("footer") ? "footer" : "content";
      const tracked = classifyClick(href, window.location.origin, where);
      if (tracked) umamiTrack(tracked);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!UMAMI_WEBSITE_ID) return null;

  return (
    <Script
      src={UMAMI_SCRIPT_URL}
      data-website-id={UMAMI_WEBSITE_ID}
      data-domains={UMAMI_DOMAINS}
      data-do-not-track="true"
      strategy="afterInteractive"
    />
  );
}
