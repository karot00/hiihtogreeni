// No imports: the contact form (a client island) uses this, and lib/contact.ts
// must stay out of the browser bundle because it holds the recipient address.

/**
 * Answers to the optional "How did you find us?" question (GEO plan E2). Only
 * these codes are stored, so the field cannot carry free text or personal data.
 */
export const FOUND_VIA = ["search", "ai", "social", "referral", "returning", "other"] as const;
export type FoundVia = (typeof FOUND_VIA)[number];

export const FOUND_VIA_LABELS: Record<FoundVia, string> = {
  search: "Search engine",
  ai: "AI assistant",
  social: "Social media",
  referral: "Recommendation",
  returning: "Stayed before",
  other: "Other",
};

export function parseFoundVia(value: unknown): FoundVia | "" {
  return typeof value === "string" && (FOUND_VIA as readonly string[]).includes(value) ? (value as FoundVia) : "";
}
