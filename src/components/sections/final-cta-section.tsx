"use client";

import { useReducedMotion } from "motion/react";
import type { LandingContent } from "@/data/landing";
import { LandingButtonLink } from "@/components/ui/landing-button-link";
import { LandingContainer } from "@/components/ui/landing-container";
import { AnimatedTitle } from "@/components/ui/section-heading";
import { TextAnimate } from "@/components/ui/text-animate";

interface FinalCtaSectionProps {
  content: LandingContent["finalCta"];
  applyLabel: string;
  applyHref: string;
}

export function FinalCtaSection({ content, applyLabel, applyHref }: FinalCtaSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="aa-final-cta" aria-labelledby="final-cta-title">
      <LandingContainer>
        <span className="aa-eyebrow">
          {shouldReduceMotion ? (
            content.label
          ) : (
            <TextAnimate as="span" animation="blurInUp" by="text" once duration={0.45}>
              {content.label}
            </TextAnimate>
          )}
        </span>
        <AnimatedTitle
          id="final-cta-title"
          titleStart={content.titleStart}
          titleAccent={content.titleAccent}
          reduceMotion={shouldReduceMotion}
        />
        <p>{content.descriptionLines.map((line) => <span key={line}>{line}</span>)}</p>
        <div className="aa-actions aa-actions--center">
          <LandingButtonLink href={applyHref}>{applyLabel}</LandingButtonLink>
          <LandingButtonLink href={content.briefHref} variant="outline" icon="down" download>
            {content.briefLabel}
          </LandingButtonLink>
        </div>
      </LandingContainer>
    </section>
  );
}
