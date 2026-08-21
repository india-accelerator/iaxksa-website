"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import type { ApplyField, LandingContent } from "@/data/landing";
import { LandingContainer } from "@/components/ui/landing-container";
import { SectionEyebrow, AnimatedTitle } from "@/components/ui/section-heading";

const WAITLIST_API = "/api/forward-waitlist";

type Values = Record<ApplyField["name"], string>;

const EMPTY: Values = { name: "", legalName: "", ceoEmail: "", ceoPhone: "" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Digits, spaces and the usual separators; at least 7 digits overall.
const PHONE_RE = /^[+()\d][\d\s()-]{6,}$/;

function validate(field: ApplyField, value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return `${field.label} is required`;
  if (field.type === "email" && !EMAIL_RE.test(trimmed)) {
    return "Enter a valid email address";
  }
  if (field.type === "tel" && !PHONE_RE.test(trimmed)) {
    return "Enter a valid phone number";
  }
  return "";
}

interface WaitlistApplicationFormProps {
  content: LandingContent["apply"];
}

export function WaitlistApplicationForm({ content }: WaitlistApplicationFormProps) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Values>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const setField = (name: ApplyField["name"], value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<Values> = {};
    content.fields.forEach((field) => {
      const message = validate(field, values[field.name]);
      if (message) nextErrors[field.name] = message;
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await fetch(WAITLIST_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startupName: values.name.trim(),
          legalName: values.legalName.trim(),
          email: values.ceoEmail.trim(),
          phone: values.ceoPhone.trim(),
          source: "arabian-accelerator-waitlist",
          evaluationStage: "WAITLISTED",
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch {
      // The cohort is already closed, so a failed hand-off must not block the
      // applicant from seeing the waitlist confirmation.
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <section className="aa-apply aa-apply--done" aria-labelledby="apply-result-title">
        <LandingContainer>
          <div className="aa-apply__result">
            <h1 id="apply-result-title">{content.success.title}</h1>
            <h2>{content.success.subtitle}</h2>
            <p className="aa-apply__result-body">
              {content.success.bodyLead}{" "}
              <a href={content.success.ctaHref} target="_blank" rel="noreferrer noopener">
                {content.success.bodyLink}
                <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} />
              </a>
              .
            </p>
            <p className="aa-apply__deadline">{content.success.deadlineNote}</p>
            <a className="aa-button aa-button--outline" href={content.success.backHref}>
              <span>{content.success.backLabel}</span>
            </a>
          </div>
        </LandingContainer>
      </section>
    );
  }

  return (
    <section className="aa-apply" aria-labelledby="apply-title">
      <LandingContainer>
        <header className="aa-section-heading aa-section-heading--start">
          <SectionEyebrow label={content.label} />
          <AnimatedTitle
            id="apply-title"
            titleStart={content.titleStart}
            titleAccent={content.titleAccent}
          />
        </header>
        <p className="aa-apply__intro">{content.intro}</p>
        <p className="aa-apply__closed">{content.closedNote}</p>

        <form className="aa-apply__form" onSubmit={handleSubmit} noValidate>
          {content.fields.map((field) => {
            const error = errors[field.name];
            const errorId = `${field.name}-error`;
            return (
              <label className="aa-field" key={field.name} htmlFor={field.name}>
                <span className="aa-field__label">{field.label}</span>
                <input
                  className={`aa-field__input ${error ? "aa-field__input--invalid" : ""}`.trim()}
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  value={values[field.name]}
                  onChange={(e) => setField(field.name, e.target.value)}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? errorId : undefined}
                />
                {error ? (
                  <span className="aa-field__error" id={errorId} role="alert">{error}</span>
                ) : null}
              </label>
            );
          })}

          <button className="aa-button aa-button--gold aa-apply__submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="aa-apply__spinner" aria-hidden="true" size={16} /> : null}
            <span>{isSubmitting ? content.submittingLabel : content.submitLabel}</span>
          </button>
        </form>
      </LandingContainer>
    </section>
  );
}
