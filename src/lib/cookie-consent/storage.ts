import {
  CONSENT_COOKIE_MAX_AGE_SECONDS,
  CONSENT_COOKIE_NAME,
  CONSENT_SCHEMA_VERSION,
  CONSENT_UNSET_UPDATED_AT,
  DEFAULT_CONSENT_CATEGORIES,
} from "./constants.ts";
import type { ConsentCategoryPreferences, ConsentState } from "./types.ts";

type PartialConsentInput = Partial<{
  version: unknown;
  updatedAt: unknown;
  categories: Partial<Record<keyof ConsentCategoryPreferences, unknown>>;
}>;

export function createDefaultConsentState(): ConsentState {
  return {
    version: CONSENT_SCHEMA_VERSION,
    updatedAt: CONSENT_UNSET_UPDATED_AT,
    categories: { ...DEFAULT_CONSENT_CATEGORIES },
  };
}

function normalizeCategories(
  categories:
    | Partial<Record<keyof ConsentCategoryPreferences, unknown>>
    | undefined,
): ConsentCategoryPreferences {
  return {
    essential: true,
    functional:
      typeof categories?.functional === "boolean"
        ? categories.functional
        : false,
    analytics:
      typeof categories?.analytics === "boolean" ? categories.analytics : false,
    marketing:
      typeof categories?.marketing === "boolean" ? categories.marketing : false,
  };
}

function normalizeConsentRecord(
  input: PartialConsentInput,
  now = new Date(),
): ConsentState {
  const updatedAtInput = input.updatedAt;
  const parsedDate =
    typeof updatedAtInput === "string" &&
    !Number.isNaN(Date.parse(updatedAtInput))
      ? new Date(updatedAtInput)
      : now;

  return {
    version: CONSENT_SCHEMA_VERSION,
    updatedAt: parsedDate.toISOString(),
    categories: normalizeCategories(input.categories),
  };
}

export function parseConsentState(
  value: string | null | undefined,
  now = new Date(),
): ConsentState {
  if (!value) {
    return createDefaultConsentState();
  }

  try {
    const decoded = decodeURIComponent(value);
    const parsed = JSON.parse(decoded) as PartialConsentInput;

    if (!parsed || typeof parsed !== "object") {
      return createDefaultConsentState();
    }

    if (!("categories" in parsed)) {
      return createDefaultConsentState();
    }

    return normalizeConsentRecord(parsed, now);
  } catch {
    return createDefaultConsentState();
  }
}

export function serializeConsentState(state: ConsentState): string {
  return encodeURIComponent(JSON.stringify(state));
}

export function readConsentFromDocumentCookie(
  documentCookie: string,
): ConsentState {
  const cookiePairs = documentCookie
    .split(";")
    .map((entry) => entry.trim())
    .filter((entry) => entry.startsWith(`${CONSENT_COOKIE_NAME}=`));

  if (cookiePairs.length === 0) {
    return createDefaultConsentState();
  }

  let best: ConsentState | null = null;
  let bestTime = -1;

  for (const pair of cookiePairs) {
    const cookieValue = pair.slice(CONSENT_COOKIE_NAME.length + 1);
    const parsed = parseConsentState(cookieValue);
    if (parsed.updatedAt === CONSENT_UNSET_UPDATED_AT) {
      continue;
    }
    const time = Date.parse(parsed.updatedAt);
    if (!Number.isNaN(time) && time > bestTime) {
      best = parsed;
      bestTime = time;
    }
  }

  if (best) {
    return best;
  }

  const fallback = cookiePairs[cookiePairs.length - 1];
  return parseConsentState(fallback.slice(CONSENT_COOKIE_NAME.length + 1));
}

export function readConsentFromBrowser(): ConsentState {
  if (typeof document === "undefined") {
    return createDefaultConsentState();
  }

  return readConsentFromDocumentCookie(document.cookie);
}

/**
 * Writes the host-only `hg_consent` cookie. Unlike the levifinland2026
 * source, hiihtogreeni.fi has no consent-sharing sibling subdomain, so the
 * parent-domain `Domain=` branch was deliberately dropped.
 */
export function writeConsentToBrowser(state: ConsentState): void {
  if (typeof document === "undefined") {
    return;
  }

  const serialized = serializeConsentState(state);
  const securePart =
    typeof location !== "undefined" && location.protocol === "https:"
      ? "; Secure"
      : "";

  try {
    document.cookie = `${CONSENT_COOKIE_NAME}=${serialized}; Path=/; Max-Age=${CONSENT_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${securePart}`;
  } catch {
    // Intentionally ignored so UI state remains usable even if cookie write fails.
  }
}
