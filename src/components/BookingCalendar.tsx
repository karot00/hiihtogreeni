"use client";

import { useEffect, useRef, useState } from "react";
import { BOOKING_ORIGIN, bookingEmbedUrl, bookingPageUrl } from "../content/shared.ts";
import type { Lang } from "../content/types.ts";
import { inquiryEvent, umamiTrack } from "../lib/umami.ts";

/** A stay in this page's link that is passed on to the calendar. */
const STAY_PARAMS = ["checkIn", "checkOut", "units"] as const;
const INITIAL_HEIGHT = 760;
const MIN_HEIGHT = 480;
const MAX_HEIGHT = 4000;

export interface BookingCalendarStrings {
  frameTitle: string;
  loading: string;
  openInNewTab: string;
}

/**
 * The cabins.levifinland.fi booking widget in an iframe. The iframe reports
 * its content height (message "hiihtogreeni-embed:height"), so it grows with
 * the widget instead of scrolling inside itself, and a sent booking request
 * ("hiihtogreeni-embed:inquiry"), which becomes the Umami event inquiry_submitted. A stay in this page's link
 * (?checkIn=…&checkOut=…&units=…, e.g. from the offer banner) is passed on and
 * preselected. Read after mount, so the page itself stays static.
 */
export function BookingCalendar({ lang, strings }: { lang: Lang; strings: BookingCalendarStrings }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [query, setQuery] = useState<string | null>(null);
  const [height, setHeight] = useState(INITIAL_HEIGHT);

  useEffect(() => {
    const own = new URLSearchParams(window.location.search);
    const stay = new URLSearchParams();
    for (const key of STAY_PARAMS) {
      const value = own.get(key);
      if (value) stay.set(key, value);
    }
    const qs = stay.toString();
    const frame = requestAnimationFrame(() => setQuery(qs ? `?${qs}` : ""));

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== BOOKING_ORIGIN || event.source !== frameRef.current?.contentWindow) return;
      // A booking request was sent in the widget: count it (no personal data).
      const inquiry = inquiryEvent(event.data);
      if (inquiry) {
        umamiTrack(inquiry);
        return;
      }
      const data = event.data as { type?: unknown; height?: unknown } | null;
      if (data?.type !== "hiihtogreeni-embed:height" || typeof data.height !== "number") return;
      setHeight(Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, Math.ceil(data.height))));
    };
    window.addEventListener("message", onMessage);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return (
    <div>
      {query === null ? (
        <div
          style={{ height }}
          className="flex items-center justify-center rounded-[var(--radius-card)] border border-frost bg-white text-sm text-slate"
        >
          {strings.loading}
        </div>
      ) : (
        <iframe
          ref={frameRef}
          src={`${bookingEmbedUrl(lang)}${query}`}
          title={strings.frameTitle}
          style={{ height }}
          className="block w-full border-0"
        />
      )}
      <p className="mt-3 text-sm">
        <a
          href={`${bookingPageUrl(lang)}${query ?? ""}#booking`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-fjord-dark underline underline-offset-2 hover:text-pine"
        >
          {strings.openInNewTab}
        </a>
      </p>
    </div>
  );
}
