import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validateContact,
  looksLikeSpam,
  buildPlainText,
  buildHtml,
  CONTACT_RECIPIENT,
} from "../src/lib/contact.ts";

function formData(values: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(values)) fd.append(k, v);
  return fd;
}

const valid = {
  name: "Matti Meikäläinen",
  email: "matti@example.com",
  phone: "+358 40 123 4567",
  message: "Hei, kysyisin mökin saatavuudesta helmikuulle.",
  contactMethod: "Sähköpostitse",
  consent: "on",
  sourcePage: "/yhteystiedot/",
};

test("accepts a well-formed Finnish submission", () => {
  const r = validateContact(formData(valid));
  assert.equal(r.ok, true);
  assert.equal(r.payload?.name, "Matti Meikäläinen");
  assert.equal(r.payload?.consent, true);
});

test("rejects missing required fields with per-field errors", () => {
  const r = validateContact(formData({ ...valid, name: "", email: "", message: "" }));
  assert.equal(r.ok, false);
  assert.equal(r.errors.name, "name-required");
  assert.equal(r.errors.email, "email-required");
  assert.equal(r.errors.message, "message-required");
});

test("rejects an invalid email address", () => {
  const r = validateContact(formData({ ...valid, email: "not-an-email" }));
  assert.equal(r.ok, false);
  assert.equal(r.errors.email, "email-invalid");
});

test("honeypot filled marks submission as spam", () => {
  assert.equal(looksLikeSpam({ ...valid, honeypot: "spam" } as never), true);
});

test("link-heavy message is flagged as spam", () => {
  const spam = validateContact(
    formData({ ...valid, message: "http://a.com http://b.com http://c.com http://d.com" }),
  );
  assert.equal(spam.ok, true);
  assert.equal(looksLikeSpam(spam.payload!), true);
});

test("plain-text body collapses newlines and contains the message", () => {
  const r = validateContact(formData({ ...valid, message: "line1\nline2" }));
  const text = buildPlainText(r.payload!);
  assert.ok(text.includes("Matti Meikäläinen"));
  assert.ok(text.includes("line1 line2"));
  assert.ok(text.includes("matti@example.com"));
});

test("html body escapes user input", () => {
  const r = validateContact(formData({ ...valid, name: "<b>x</b>", message: "<img src=x>" }));
  const html = buildHtml(r.payload!);
  assert.ok(!html.includes("<b>x</b>"));
  assert.ok(html.includes("&lt;b&gt;x&lt;/b&gt;"));
});

test("recipient defaults to the owner-approved mailbox", () => {
  assert.equal(CONTACT_RECIPIENT, "hiihtogreeni@hiihtogreeni.fi");
});
