import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  CONTACT_RECIPIENT,
  CONTACT_SENDER,
  MAX_PAYLOAD_BYTES,
  SITE_NAME,
  buildConfirmationHtml,
  buildConfirmationText,
  buildHtml,
  buildPlainText,
  looksLikeSpam,
  validateContact,
} from "../../../lib/contact.ts";

export const runtime = "nodejs";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const inFlight = new Map<string, number>();
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function clientKey(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  const ip = fwd ? fwd.split(",")[0].trim() : "unknown";
  return ip;
}

function rateLimited(key: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    rateBuckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > MAX_REQUESTS;
}

function fingerprint(body: string): string {
  let h = 0;
  for (let i = 0; i < body.length; i += 1) {
    h = (Math.imul(31, h) + body.charCodeAt(i)) | 0;
  }
  return `${h}:${body.length}`;
}

export async function POST(req: NextRequest) {
  if (req.headers.get("content-length") && Number(req.headers.get("content-length")) > MAX_PAYLOAD_BYTES) {
    return NextResponse.json({ ok: false, error: "payload-too-large" }, { status: 413 });
  }

  const key = clientKey(req);
  if (rateLimited(key)) {
    return NextResponse.json({ ok: false, error: "rate-limited" }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-form" }, { status: 400 });
  }

  const raw = Array.from(form.entries())
    .map(([k, v]) => `${k}=${typeof v === "string" ? v : "[file]"}`)
    .join("&");
  const fp = fingerprint(raw);

  if (inFlight.has(fp)) {
    return NextResponse.json({ ok: true, duplicate: true });
  }
  inFlight.set(fp, Date.now());
  const release = () => inFlight.delete(fp);

  const result = validateContact(form);
  if (!result.ok || !result.payload) {
    release();
    return NextResponse.json(
      { ok: false, error: "validation", fields: result.errors },
      { status: 400 },
    );
  }

  if (looksLikeSpam(result.payload)) {
    release();
    return NextResponse.json({ ok: true, spam: true });
  }

  if (!resend) {
    release();
    return NextResponse.json(
      { ok: false, error: "mail-unavailable" },
      { status: 503 },
    );
  }

  const p = result.payload;
  try {
    const { data, error } = await resend.emails.send({
      from: CONTACT_SENDER,
      to: [CONTACT_RECIPIENT],
      replyTo: p.email,
      subject: `[${SITE_NAME}] Uusi yhteydenotto: ${p.name}`,
      text: buildPlainText(p),
      html: buildHtml(p),
    });

    if (error || !data) {
      release();
      return NextResponse.json({ ok: false, error: "mail-failed" }, { status: 502 });
    }

    // Send a confirmation copy to the visitor. Failure here must not void the
    // primary delivery; log it and still report success to the browser.
    try {
      await resend.emails.send({
        from: CONTACT_SENDER,
        to: [p.email],
        replyTo: CONTACT_RECIPIENT,
        subject: `[${SITE_NAME}] ${p.sourcePage.startsWith("/en") ? "We received your message" : "Viestisi vastaanotettu"}`,
        text: buildConfirmationText(p),
        html: buildConfirmationHtml(p),
      });
    } catch {
      // Confirmation is best-effort; do not surface to the visitor.
    }

    release();
    return NextResponse.json({ ok: true, id: data.id });
  } catch {
    release();
    return NextResponse.json({ ok: false, error: "mail-failed" }, { status: 502 });
  }
}
