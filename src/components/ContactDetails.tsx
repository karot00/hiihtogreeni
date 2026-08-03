"use client";

import { useState } from "react";

interface ObfuscatedContact {
  name: string;
  key: "rental" | "maintenance";
}

interface ContactDetailsProps {
  contact: ObfuscatedContact;
  label: string;
  revealLabel: string;
  className?: string;
}

/**
 * Keeps contact values out of the initial HTML, where basic address harvesters
 * can collect them without running JavaScript. Revealed values remain usable
 * as normal tel/mail links for people using the site.
 */
export function ContactDetails({ contact, label, revealLabel, className }: ContactDetailsProps) {
  const [revealed, setRevealed] = useState(false);
  const [details, setDetails] = useState<ContactValues | null>(null);

  async function reveal() {
    const response = await fetch(`/api/contact-details?contact=${contact.key}`, {
      credentials: "same-origin",
    });
    if (!response.ok) return;
    setDetails((await response.json()) as ContactValues);
    setRevealed(true);
  }

  if (!revealed) {
    return (
      <p className={className}>
        <span className="font-semibold">{label}:</span> {contact.name}
        <br />
        <button
          type="button"
          onClick={reveal}
          className="font-semibold text-fjord-dark underline underline-offset-2 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fjord"
        >
          {revealLabel}
        </button>
      </p>
    );
  }

  if (!details) return null;

  return (
    <p className={className}>
      <span className="font-semibold">{label}:</span> {contact.name}
      <br />
      <a
        href={`tel:${details.phone}`}
        className="font-semibold text-fjord-dark underline-offset-2 hover:underline"
      >
        {details.phoneDisplay}
      </a>
      <br />
      <a
        href={`mailto:${details.email}`}
        className="font-semibold text-fjord-dark underline-offset-2 hover:underline"
      >
        {details.email}
      </a>
    </p>
  );
}

interface ContactValues {
  phone: string;
  phoneDisplay: string;
  email: string;
}
