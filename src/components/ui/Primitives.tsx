// Direct <img> is intentional: Phase 3 preserves legacy /wp-content/uploads media
// URLs as-is so image-search and backlinks keep resolving; next/image is deferred.
import Link from "next/link";
import type { ReactNode } from "react";

/* ---------------------------------------------------------------------------
 * Shared presentational primitives for the content pages. All are server
 * components except where noted. Imported together so pages have one source.
 * ------------------------------------------------------------------------- */

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

/** Small uppercase label above headings. */
export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

interface SectionProps {
  children: ReactNode;
  /** Background tone; defaults to snow (page background). */
  tone?: "snow" | "white" | "mist" | "pine";
  className?: string;
  id?: string;
}

const TONE_CLASS: Record<NonNullable<SectionProps["tone"]>, string> = {
  snow: "bg-snow",
  white: "bg-white",
  mist: "bg-mist",
  pine: "bg-pine text-white",
};

/** Vertical rhythm wrapper for a page section. */
export function Section({ children, tone = "snow", className = "", id }: SectionProps) {
  return (
    <section id={id} className={`py-[var(--section-space)] ${TONE_CLASS[tone]} ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

interface HeroProps {
  image: { src: string; width: number; height: number; alt: string };
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  overlay?: boolean;
}

/**
 * Photography-led hero. The heading and value proposition live in initial
 * server-rendered HTML. Image is prioritized for LCP; overlay gradient keeps
 * text contrast without heavy text shadows.
 */
export function Hero({ image, eyebrow, title, lead, children, overlay = true }: HeroProps) {
  return (
    <header className="relative isolate overflow-hidden">
      <img
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      {overlay ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(17_29_33_/_0.78)_0%,rgb(17_29_33_/_0.34)_52%,transparent_78%)] max-sm:bg-[linear-gradient(0deg,rgb(17_29_33_/_0.78)_0%,rgb(17_29_33_/_0.34)_40%,transparent_72%)]"
        />
      ) : null}
      <div className="container-page flex min-h-[420px] flex-col justify-end py-16 text-white sm:min-h-[560px] md:min-h-[640px]">
        {eyebrow ? <p className="eyebrow text-white/80">{eyebrow}</p> : null}
        <h1 className="mt-3 max-w-[20ch] text-white [text-wrap:balance]">{title}</h1>
        {lead ? <p className="mt-4 max-w-[44ch] text-lead font-medium text-white/90">{lead}</p> : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </header>
  );
}

type Variant = "primary" | "secondary";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}

/**
 * Action button rendered as an ordinary crawlable link. Primary uses fjord-dark
 * with white text; secondary uses a fjord border on a transparent surface.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ButtonLinkProps) {
  const base =
    "inline-flex min-h-12 items-center justify-center rounded-[var(--radius-control)] px-5 font-display text-sm font-semibold tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
  const variantClass =
    variant === "primary"
      ? "bg-fjord-dark text-white hover:bg-pine"
      : "border border-fjord text-fjord-dark hover:bg-fjord/10";

  const shared = `${base} ${variantClass} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={shared}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={shared}>
      {children}
    </Link>
  );
}

interface FactStripProps {
  facts: readonly { value?: string; label: string }[];
}

/** High-value accommodation facts as real, crawlable text. */
export function FactStrip({ facts }: FactStripProps) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-frost bg-frost md:grid-cols-3 lg:grid-cols-5">
      {facts.map((fact, index) => (
        <div key={index} className="bg-white p-6">
          {fact.value ? (
            <dt className="font-display text-3xl font-extrabold text-fjord-dark">{fact.value}</dt>
          ) : null}
          <dd className="mt-1 text-sm text-slate">{fact.label}</dd>
        </div>
      ))}
    </dl>
  );
}

interface SplitSectionProps {
  image: { src: string; width: number; height: number; alt: string };
  imageSide?: "left" | "right";
  children: ReactNode;
}

/** Editorial split: large image paired with heading/lead/body copy. */
export function SplitSection({ image, imageSide = "right", children }: SplitSectionProps) {
  const imgFirst = imageSide === "left";
  return (
    <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
      <figure className={`md:col-span-5 ${imgFirst ? "md:order-1" : "md:order-2"}`}>
        <img
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          loading="lazy"
          className="w-full rounded-[var(--radius-card)] border border-frost object-cover"
        />
      </figure>
      <div className={`md:col-span-7 ${imgFirst ? "md:order-2" : "md:order-1"}`}>{children}</div>
    </div>
  );
}

interface FactListProps {
  title: string;
  items: readonly string[];
}

/** A titled list of factual bullet points (rooms, kitchen, facilities). */
export function FactList({ title, items }: FactListProps) {
  return (
    <div>
      <h3 className="font-display text-h3 font-bold text-fjord-dark">{title}</h3>
      <ul className="mt-4 space-y-2 text-body">
        {items.map((item, index) => (
          <li key={index} className="flex gap-3">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface ImageCardProps {
  href: string;
  image: { src: string; width: number; height: number; alt: string };
  title: string;
  description: string;
}

/** Image-led link card (homepage: cabin, rates, gallery). */
export function ImageCard({ href, image, title, description }: ImageCardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-[var(--radius-card)] border border-frost bg-white transition-colors hover:border-fjord/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fjord"
    >
      <div className="aspect-[3/2] overflow-hidden">
        <img
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 ease-[var(--ease-natural)] group-hover:scale-[1.025]"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-h3 font-bold text-ink">{title}</h3>
        <p className="mt-2 text-body text-slate">{description}</p>
        <span className="mt-4 inline-flex font-display text-sm font-semibold text-fjord-dark underline-offset-2 group-hover:underline">
          {title} &rarr;
        </span>
      </div>
    </Link>
  );
}

interface CallToActionProps {
  eyebrow: string;
  title: string;
  body?: ReactNode;
  children: ReactNode;
}

/** Closing contact/booking call-to-action band. */
export function CallToAction({ eyebrow, title, body, children }: CallToActionProps) {
  return (
    <section className="bg-pine text-white">
      <div className="container-page py-[var(--section-space)]">
        <p className="eyebrow text-white/80">{eyebrow}</p>
        <h2 className="mt-3 max-w-[20ch] text-white">{title}</h2>
        {body ? <div className="mt-4 max-w-[60ch] text-lead text-white/90">{body}</div> : null}
        <div className="mt-8 flex flex-wrap gap-4">{children}</div>
      </div>
    </section>
  );
}
