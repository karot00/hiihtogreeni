"use client";

import { useId, useRef, useState } from "react";
import type { Lang, FormStrings } from "../content/types.ts";

export interface ContactField {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
}

interface ContactFormProps {
  lang: Lang;
  fields: readonly ContactField[];
  consentLabel: string;
  contactMethodLabel: string;
  contactMethods: readonly string[];
  sourcePage: string;
  /** Localized validation, button, and status strings. */
  strings: FormStrings;
}

type Status = "idle" | "sending" | "success" | "error";

const AUTOCOMPLETE: Record<string, string> = {
  name: "name",
  email: "email",
  phone: "tel",
  message: "off",
};

/**
 * Accessible contact form (client island). Labels are always visible, fields use
 * autocomplete attributes, errors sit below each field, and a status region
 * announces submission outcome. Submission is handled by a server route added in
 * Phase 6; this component manages validation, duplicate-send prevention, and
 * status without relying on browser-only validation.
 */
export function ContactForm({
  fields,
  consentLabel,
  contactMethodLabel,
  contactMethods,
  sourcePage,
  strings,
}: ContactFormProps) {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverMessage, setServerMessage] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  function validate(data: FormData): Record<string, string> {
    const next: Record<string, string> = {};
    for (const field of fields) {
      const value = String(data.get(field.id) ?? "").trim();
      if (!value) {
        next[field.id] = strings.required;
        continue;
      }
      if (field.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
        next[field.id] = strings.emailInvalid;
      }
    }
    return next;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const data = new FormData(event.currentTarget);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }

    setStatus("sending");
    setServerMessage("");
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        setStatus("success");
        formRef.current?.reset();
      } else if (res.status === 429) {
        setStatus("error");
        setServerMessage(strings.tooMany);
      } else {
        setStatus("error");
        setServerMessage(strings.serverError);
      }
    } catch {
      setStatus("error");
      setServerMessage(strings.connectionError);
    }
  }

  const fieldId = (id: string) => `${formId}-${id}`;
  const errorId = (id: string) => `${formId}-${id}-error`;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="mt-6 space-y-5 rounded-[var(--radius-card)] border border-frost bg-white p-6"
      aria-describedby={status === "success" || status === "error" ? `${formId}-status` : undefined}
    >
      {fields.map((field) => {
        const invalid = Boolean(errors[field.id]);
        const optional = field.id === "phone";
        const common = "min-h-12 w-full rounded-[var(--radius-control)] border bg-white px-3 py-2 text-body " +
          (invalid
            ? "border-error focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
            : "border-slate/60 hover:border-slate focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fjord");
        return (
          <div key={field.id}>
            <label htmlFor={fieldId(field.id)} className="block text-sm font-semibold text-ink">
              {field.label}
              {optional ? (
                <span className="ml-1 font-normal text-slate">{strings.optional}</span>
              ) : (
                <span className="ml-1 text-error" aria-hidden="true">*</span>
              )}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={fieldId(field.id)}
                name={field.id}
                rows={5}
                required={!optional}
                aria-required={optional ? undefined : "true"}
                aria-invalid={invalid}
                aria-describedby={invalid ? errorId(field.id) : undefined}
                className={`mt-2 ${common}`}
              />
            ) : (
              <input
                id={fieldId(field.id)}
                name={field.id}
                type={field.type}
                required={!optional}
                aria-required={optional ? undefined : "true"}
                autoComplete={AUTOCOMPLETE[field.id] ?? "on"}
                aria-invalid={invalid}
                aria-describedby={invalid ? errorId(field.id) : undefined}
                className={`mt-2 ${common}`}
              />
            )}
            {invalid ? (
              <p id={errorId(field.id)} className="mt-1 text-sm text-error">
                {errors[field.id]}
              </p>
            ) : null}
          </div>
        );
      })}

      <fieldset>
        <legend className="text-sm font-semibold text-ink">{contactMethodLabel}</legend>
        <div className="mt-2 flex flex-wrap gap-4">
          {contactMethods.map((method, index) => (
            <label key={index} className="inline-flex items-center gap-2 text-body">
              <input
                type="radio"
                name="contactMethod"
                value={method}
                defaultChecked={index === 0}
                className="h-5 w-5 accent-fjord"
              />
              {method}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex items-start gap-3 text-body">
        <input type="checkbox" name="consent" className="mt-1 h-5 w-5 accent-fjord" />
        <span>{consentLabel}</span>
      </label>

      <div className="absolute h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${formId}-company`}>Leave this field empty</label>
        <input
          id={`${formId}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
        <input type="hidden" name="sourcePage" value={sourcePage} />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
        className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-control)] bg-fjord-dark px-5 font-display text-sm font-semibold text-white transition-colors hover:bg-pine focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-60"
      >
        {status === "sending" ? strings.sending : strings.submit}
      </button>

      <div
        id={`${formId}-status`}
        role="status"
        aria-live="polite"
        className="text-sm"
      >
        {status === "success" ? (
          <p className="rounded-[var(--radius-control)] bg-success/10 p-3 text-success">
            {strings.success}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="rounded-[var(--radius-control)] bg-error/10 p-3 text-error">{serverMessage}</p>
        ) : null}
      </div>
    </form>
  );
}
