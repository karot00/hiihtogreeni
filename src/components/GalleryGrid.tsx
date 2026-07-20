/* eslint-disable @next/next/no-img-element */
/* Direct <img> is intentional: Phase 3 preserves legacy /wp-content/uploads
 * media URLs as-is so image-search and backlinks keep resolving. */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryImage } from "../content/types.ts";

export interface GalleryStrings {
  regionLabel: string;
  previous: string;
  next: string;
  close: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  /** Accessible name for the gallery region. */
  label: string;
  /** Localized lightbox control labels. */
  strings: GalleryStrings;
}

/**
 * Accessible gallery grid with an optional lightbox. The grid itself is plain,
 * crawlable markup; the lightbox is a progressive enhancement that activates on
 * button click. Supports keyboard navigation, Escape, focus restoration, and an
 * image counter with visible previous/next/close labels.
 */
export function GalleryGrid({ images, label, strings }: GalleryGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpenIndex(null);
  }, []);

  const go = useCallback(
    (delta: number) => {
      setOpenIndex((current) => {
        if (current === null) return null;
        const next = (current + delta + images.length) % images.length;
        return next;
      });
    },
    [images.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused.current?.focus();
    };
  }, [openIndex, close, go]);

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label={label}>
        {images.map((image, index) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group block w-full overflow-hidden rounded-[var(--radius-card)] border border-frost bg-white text-left transition-colors hover:border-fjord/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fjord"
              aria-haspopup="dialog"
            >
              <span className="aspect-[4/3] block overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 ease-[var(--ease-natural)] group-hover:scale-[1.025]"
                />
              </span>
              {image.caption ? (
                <span className="block p-3 text-sm text-slate">{image.caption}</span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${images[openIndex].alt} – ${openIndex + 1} / ${images.length}`}
          className="fixed inset-0 z-50 flex flex-col bg-ink/95 p-4 backdrop-blur"
        >
          <div className="flex items-center justify-between text-white">
            <p className="text-sm text-white/80" aria-live="polite">
              {openIndex + 1} / {images.length}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-control)] px-3 font-display text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span aria-hidden="true">✕</span>
              <span className="sr-only">{strings.close}</span>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center gap-2 py-4">
            <button
              type="button"
              onClick={() => go(-1)}
              className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-[var(--radius-control)] px-3 font-display text-lg font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label={strings.previous}
            >
              <span aria-hidden="true">&#8592;</span>
            </button>

            <figure className="flex max-h-full max-w-5xl flex-col items-center">
              <img
                src={images[openIndex].src}
                alt={images[openIndex].alt}
                className="max-h-[70vh] w-auto max-w-full rounded-[var(--radius-card)] object-contain"
              />
              {images[openIndex].caption ? (
                <figcaption className="mt-3 text-center text-sm text-white/90">
                  {images[openIndex].caption}
                </figcaption>
              ) : null}
            </figure>

            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-[var(--radius-control)] px-3 font-display text-lg font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label={strings.next}
            >
              <span aria-hidden="true">&#8594;</span>
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
