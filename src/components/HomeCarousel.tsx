// Direct <img> is intentional: Phase 3 preserves legacy /wp-content/uploads
// media URLs as-is so image-search and backlinks keep resolving.
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryImage } from "../content/types.ts";

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
    </svg>
  );
}

export interface CarouselStrings {
  /** Accessible label for the previous-slide control. */
  previous: string;
  /** Accessible label for the next-slide control. */
  next: string;
  /** Prefix for dot indicator labels, e.g. "Kuva" -> "Kuva 2 / 6". */
  slide: string;
}

interface HomeCarouselProps {
  images: GalleryImage[];
  /** Accessible name for the carousel region. */
  label: string;
  /** Localized control labels. */
  strings: CarouselStrings;
}

/**
 * Accessible, swipeable image carousel for the homepage. The slides are plain,
 * crawlable <img> markup inside a scroll-snap track, so swipe and trackpad
 * scrolling work natively; buttons, dots and arrow keys are enhancements.
 * Respects prefers-reduced-motion by switching to instant scrolling.
 */
export function HomeCarousel({ images, label, strings }: HomeCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, images.length - 1));
    const slide = track.children[clamped] as HTMLElement | undefined;
    if (!slide) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: slide.offsetLeft, behavior: reduceMotion ? "auto" : "smooth" });
  }, [images.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const index = Math.round(track.scrollLeft / track.clientWidth);
        setActive(Math.max(0, Math.min(index, images.length - 1)));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, [images.length]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollToIndex(active + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollToIndex(active - 1);
      }
    },
    [active, scrollToIndex],
  );

  const controlClass =
    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/70 font-display text-fjord-dark shadow-sm backdrop-blur-sm transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fjord";

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
      className="relative"
    >
      <div className="relative">
        <ul
          ref={trackRef}
          className="relative flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-[var(--radius-card)] border border-frost bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, index) => (
          <li
            key={image.src}
            className="w-full shrink-0 snap-center"
            aria-label={`${strings.slide} ${index + 1} / ${images.length}`}
            aria-hidden={index === active ? undefined : true}
          >
            <figure>
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              {image.caption ? (
                <figcaption className="border-t border-frost p-3 text-sm text-slate">
                  {image.caption}
                </figcaption>
              ) : null}
            </figure>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => scrollToIndex(active - 1)}
        disabled={active === 0}
        aria-label={strings.previous}
        className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 ${controlClass}`}
      >
        <Arrow dir="left" />
      </button>

      <button
        type="button"
        onClick={() => scrollToIndex(active + 1)}
        disabled={active === images.length - 1}
        aria-label={strings.next}
        className={`absolute right-3 top-1/2 -translate-y-1/2 z-10 ${controlClass}`}
      >
        <Arrow dir="right" />
      </button>

      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-current={index === active ? "true" : undefined}
            aria-label={`${strings.slide} ${index + 1} / ${images.length}`}
            onClick={() => scrollToIndex(index)}
            className={`h-3 w-3 rounded-full border border-fjord transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fjord ${
              index === active ? "bg-fjord-dark" : "bg-white hover:bg-fjord/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
