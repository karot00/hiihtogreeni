import { GOOGLE_MAPS_URL, leviNowEmbedUrl } from "../lib/levi-now.ts";

const STRINGS = {
  fi: { title: "Levi nyt: skibussi ja palvelut Levin Hiihtogreenin lähellä", google: "Avaa Google Mapsissa" },
  en: { title: "Levi Now: ski bus and services near Levin Hiihtogreeni", google: "Open in Google Maps" },
};

/** The Levi Now map in the cabin page's location section (see src/lib/levi-now.ts). */
export function LeviNowMap({ lang, page }: { lang: "fi" | "en"; page: string }) {
  const s = STRINGS[lang];
  return (
    <div className="mt-8">
      <iframe
        src={leviNowEmbedUrl(lang, page)}
        title={s.title}
        loading="lazy"
        allow="geolocation"
        className="block h-[560px] w-full rounded-[var(--radius-card)] border border-frost md:h-[480px]"
      />
      <p className="mt-3 text-sm">
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-fjord-dark underline underline-offset-2 hover:text-pine"
        >
          {s.google}
        </a>
      </p>
    </div>
  );
}
