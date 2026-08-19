import {
  Banknote,
  CalendarDays,
  Clock3,
  MapPin,
  UsersRound,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import type { IconName, LandingContent } from "@/data/landing";
import { LandingButtonLink } from "@/components/ui/landing-button-link";
import { LandingContainer } from "@/components/ui/landing-container";

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
  return (
    <section className="aa-hero" aria-labelledby="landing-title">
      <LandingContainer>
        <div className="aa-hero__grid">
          <div className="aa-hero__copy">
            <span className="aa-kicker">{content.eyebrow}</span>
            <h1 id="landing-title">
              <span>{content.titleStart}</span>
              <em>{content.titleAccent}</em>
            </h1>
            <p>{content.description}</p>
            <div className="aa-actions">
              <LandingButtonLink href={applyHref}>{applyLabel}</LandingButtonLink>
              <LandingButtonLink href={content.storyHref} variant="outline" icon="external">
                {content.storyLabel}
              </LandingButtonLink>
            </div>
            <dl className="aa-metrics">
              {content.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt>{metric.value}</dt>
                  <dd>{metric.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="aa-summary-card" aria-label={content.summaryTitle}>
            <div className="aa-summary-card__heading">
              <div>
                <h2>{content.summaryTitle}</h2>
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
