"use client";

import { useState } from "react";

interface ObfuscatedContact {
  name: string;
  phone: string;
  phoneDisplay: string;
  email: string;
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
  const decodedPhone = revealed ? decode(contact.phone) : "";
  const decodedPhoneDisplay = revealed ? decode(contact.phoneDisplay) : "";
  const decodedEmail = revealed ? decode(contact.email) : "";

  if (!revealed) {
    return (
      <p className={className}>
        <span className="font-semibold">{label}:</span> {contact.name}
        <br />
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="font-semibold text-fjord-dark underline underline-offset-2 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fjord"
        >
          {revealLabel}
        </button>
      </p>
    );
  }

  return (
    <p className={className}>
      <span className="font-semibold">{label}:</span> {contact.name}
      <br />
      <a
        href={`tel:${decodedPhone}`}
        className="font-semibold text-fjord-dark underline-offset-2 hover:underline"
      >
        {decodedPhoneDisplay}
      </a>
      <br />
      <a
        href={`mailto:${decodedEmail}`}
        className="font-semibold text-fjord-dark underline-offset-2 hover:underline"
      >
        {decodedEmail}
      </a>
    </p>
  );
}

function decode(value: string) {
  return atob(value);
}
