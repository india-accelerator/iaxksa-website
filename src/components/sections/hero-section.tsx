"use client";

import {
  Banknote,
  CalendarDays,
  Clock3,
  MapPin,
  UsersRound,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { useReducedMotion } from "motion/react";
import type { IconName, LandingContent } from "@/data/landing";
import { LandingButtonLink } from "@/components/ui/landing-button-link";
import { LandingContainer } from "@/components/ui/landing-container";
import { NumberTicker } from "@/components/ui/number-ticker";
import { TextAnimate } from "@/components/ui/text-animate";

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

const summaryIcons: Partial<Record<IconName, SvgIcon>> = {
  calendar: CalendarDays,
  clock: Clock3,
  location: MapPin,
  investment: Banknote,
  users: UsersRound,
};

interface HeroSectionProps {
  content: LandingContent["hero"];
  applyLabel: string;
  applyHref: string;
}

export function HeroSection({ content, applyLabel, applyHref }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="aa-hero" aria-labelledby="landing-title">
      <LandingContainer>
        <div className="aa-hero__grid">
          <div className="aa-hero__copy">
            <span className="aa-kicker">
              {shouldReduceMotion ? (
                content.eyebrow
              ) : (
                <TextAnimate as="span" animation="blurInUp" by="text" once duration={0.45}>
                  {content.eyebrow}
                </TextAnimate>
              )}
            </span>
            <h1 id="landing-title">
              {shouldReduceMotion ? (
                <>
                  <span>{content.titleStart}</span>
                  <em>{content.titleAccent}</em>
                </>
              ) : (
                <>
                  <TextAnimate
                    as="span"
                    animation="blurInUp"
                    by="word"
                    once
                    duration={0.5}
                    accessible={false}
                  >
                    {content.titleStart}
                  </TextAnimate>
                  <em>
                    <TextAnimate
                      as="span"
                      animation="blurInUp"
                      by="word"
                      once
                      delay={0.14}
                      duration={0.5}
                      accessible={false}
                    >
                      {content.titleAccent}
                    </TextAnimate>
                  </em>
                </>
              )}
            </h1>
            {shouldReduceMotion ? (
              <p>{content.description}</p>
            ) : (
              <TextAnimate
                as="p"
                animation="blurInUp"
                by="word"
                once
                delay={0.28}
                duration={0.55}
              >
                {content.description}
              </TextAnimate>
            )}
            <div className="aa-actions">
              <LandingButtonLink href={applyHref}>{applyLabel}</LandingButtonLink>
              <LandingButtonLink href={content.storyHref} variant="outline" icon="external">
                {content.storyLabel}
              </LandingButtonLink>
            </div>
            <dl className="aa-metrics">
              {content.metrics.map((metric, index) => {
                const displayValue = `${metric.prefix ?? ""}${metric.value}${metric.suffix ?? ""}`;

                return (
                  <div key={metric.label}>
                    <dt aria-label={displayValue}>
                      {metric.prefix}
                      <NumberTicker
                        aria-hidden="true"
                        delay={index * 0.08}
                        value={metric.value}
                      />
                      {metric.suffix}
                    </dt>
                    <dd>{metric.label}</dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <aside className="aa-summary-card" aria-label={content.summaryTitle}>
            <div className="aa-summary-card__heading">
              <div>
                <h2>
                  {shouldReduceMotion ? (
                    content.summaryTitle
                  ) : (
                    <TextAnimate
                      as="span"
                      animation="blurInUp"
                      by="word"
                      once
                      delay={0.18}
                      duration={0.5}
                      accessible={false}
                    >
                      {content.summaryTitle}
                    </TextAnimate>
                  )}
                </h2>
                <span>{content.summaryMeta}</span>
              </div>
              <span className="aa-chip">{content.version}</span>
            </div>
            <ul className="aa-summary-grid">
              {content.summaryItems.map((item) => {
                const Icon = summaryIcons[item.icon] ?? UsersRound;
                return (
                  <li key={item.label}>
                    <Icon aria-hidden="true" />
                    <span>
                      <span className="aa-summary-grid__label">{item.label}</span>
                      <span className="aa-summary-grid__value">{item.value}</span>
                    </span>
                  </li>
                );
              })}
              <li className="aa-summary-grid__wide">
                <UsersRound aria-hidden="true" />
                <span>
                  <span className="aa-summary-grid__label">{content.cohortLabel}</span>
                  <span className="aa-summary-grid__value">{content.cohortValue}</span>
                </span>
              </li>
            </ul>
            <div className="aa-summary-card__actions">
              <LandingButtonLink href={applyHref}>{applyLabel}</LandingButtonLink>
              <LandingButtonLink href={content.knowMoreHref} variant="outline">
                {content.knowMoreLabel}
              </LandingButtonLink>
            </div>
          </aside>
        </div>
      </LandingContainer>
    </section>
  );
}
