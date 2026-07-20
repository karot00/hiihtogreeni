import { RENTAL_CONTACT } from "../content/shared.ts";
import { SITE_CONFIG } from "./config.ts";

export const CONTACT_RECIPIENT =
  process.env.CONTACT_RECIPIENT || RENTAL_CONTACT.email;

// Sender on the Resend-verified levifinland.fi domain. Replies go to the
// recipient below (hiihtogreeni@hiihtogreeni.fi) via the visitor's replyTo.
export const CONTACT_SENDER = "Hiihtogreeni website <hiihtogreeni@levifinland.fi>";

export const MAX_FIELD_LENGTH = 2000;
export const MAX_MESSAGE_LENGTH = 5000;
export const MAX_PAYLOAD_BYTES = 32 * 1024;

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  contactMethod: string;
  consent: boolean;
  honeypot: string;
  sourcePage: string;
}

export interface ValidationResult {
  ok: boolean;
  errors: Record<string, string>;
  payload?: ContactPayload;
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Validate raw form data server-side. Never trusts browser validation.
 * Returns trimmed, length-capped values suitable for the email body.
 */
export function validateContact(data: FormData): ValidationResult {
  const errors: Record<string, string> = {};

  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const phone = String(data.get("phone") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();
  const contactMethod = String(data.get("contactMethod") ?? "").trim();
  const consent = data.get("consent") === "on" || data.get("consent") === "true";
  const honeypot = String(data.get("company") ?? "").trim();
  const sourcePage = String(data.get("sourcePage") ?? "").trim() || "unknown";

  if (!name) errors.name = "name-required";
  else if (name.length > MAX_FIELD_LENGTH) errors.name = "name-too-long";

  if (!email) errors.email = "email-required";
  else if (!EMAIL_RE.test(email)) errors.email = "email-invalid";
  else if (email.length > MAX_FIELD_LENGTH) errors.email = "email-too-long";

  if (phone && phone.length > MAX_FIELD_LENGTH) errors.phone = "phone-too-long";

  if (!message) errors.message = "message-required";
  else if (message.length > MAX_MESSAGE_LENGTH) errors.message = "message-too-long";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    errors,
    payload: {
      name,
      email,
      phone,
      message,
      contactMethod,
      consent,
      honeypot,
      sourcePage,
    },
  };
}

/** Basic spam heuristic: link-heavy bodies or repeated short words. */
export function looksLikeSpam(p: ContactPayload): boolean {
  if (p.honeypot) return true;
  const linkCount = (p.message.match(/https?:\/\//gi) ?? []).length;
  if (linkCount > 3) return true;
  const phoneDigits = p.phone.replace(/\D/g, "");
  if (phoneDigits.length > 20) return true;
  return false;
}

/** Plain-text body, values escaped so they cannot forge headers or markup. */
export function buildPlainText(p: ContactPayload): string {
  const esc = (s: string) => s.replace(/\r?\n/g, " ");
  return [
    `Language: ${esc(p.sourcePage.startsWith("/en") ? "en-GB" : "fi")}`,
    `Source page: ${esc(p.sourcePage)}`,
    `Name: ${esc(p.name)}`,
    `Email: ${esc(p.email)}`,
    `Phone: ${esc(p.phone || "-")}`,
    `Preferred contact: ${esc(p.contactMethod || "-")}`,
    `Marketing consent: ${p.consent ? "yes" : "no"}`,
    "",
    "Message:",
    esc(p.message),
  ].join("\n");
}

/** Minimal HTML body for the recipient. No external resources, no scripts. */
export function buildHtml(p: ContactPayload): string {
  const row = (label: string, value: string) =>
    `<tr><th scope="row" style="text-align:left;padding:4px 12px 4px 0;color:#475569;font-weight:600">${label}</th><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`;
  return `<!doctype html><html lang="en"><body style="font-family:sans-serif;color:#0f172a"><h2 style="font-size:16px">New contact message — Hiihtogreeni</h2><table style="border-collapse:collapse;font-size:14px">${row("Language", p.sourcePage.startsWith("/en") ? "en-GB" : "fi")}${row("Source", p.sourcePage)}${row("Name", p.name)}${row("Email", p.email)}${row("Phone", p.phone || "-")}${row("Preferred contact", p.contactMethod || "-")}${row("Marketing consent", p.consent ? "yes" : "no")}</table><p style="white-space:pre-wrap;font-size:14px;line-height:1.5">${escapeHtml(p.message)}</p></body></html>`;
}

/** Confirmation copy sent to the visitor after a successful submission. */
export function buildConfirmationText(p: ContactPayload): string {
  const isEn = p.sourcePage.startsWith("/en");
  const greeting = isEn ? `Hi ${p.name},` : `Hei ${p.name},`;
  const body = isEn
    ? "Thank you for your message. We have received it and will get back to you using your preferred contact method. This is an automatic confirmation — you do not need to reply."
    : "Kiitos viestistäsi. Olemme vastaanottaneet sen ja otamme sinuun yhteyttä valitsemaasi tapaan. Tämä on automaattinen vahvistus — et tarvitse vastata tähän viestiin.";
  const summary = isEn ? "Your message:" : "Viestisi:";
  return [
    greeting,
    "",
    body,
    "",
    summary,
    p.message,
    "",
    `— ${SITE_NAME}`,
  ].join("\n");
}

/** Minimal HTML confirmation for the visitor. No external resources, no scripts. */
export function buildConfirmationHtml(p: ContactPayload): string {
  const isEn = p.sourcePage.startsWith("/en");
  const greeting = isEn ? `Hi ${escapeHtml(p.name)},` : `Hei ${escapeHtml(p.name)},`;
  const body = isEn
    ? "Thank you for your message. We have received it and will get back to you using your preferred contact method. This is an automatic confirmation &mdash; you do not need to reply."
    : "Kiitos viestistäsi. Olemme vastaanottaneet sen ja otamme sinuun yhteyttä valitsemaasi tapaan. Tämä on automaattinen vahvistus &mdash; et tarvitse vastata tähän viestiin.";
  const summary = isEn ? "Your message:" : "Viestisi:";
  return `<!doctype html><html lang="${isEn ? "en" : "fi"}"><body style="font-family:sans-serif;color:#0f172a"><h2 style="font-size:16px">${SITE_NAME}</h2><p style="font-size:14px;line-height:1.5">${greeting}</p><p style="font-size:14px;line-height:1.5">${body}</p><p style="white-space:pre-wrap;font-size:14px;line-height:1.5"><strong>${summary}</strong><br>${escapeHtml(p.message)}</p><p style="font-size:14px;line-height:1.5">— ${SITE_NAME}</p></body></html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const SITE_NAME = SITE_CONFIG.name;
