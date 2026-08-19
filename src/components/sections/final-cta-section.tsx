import type { LandingContent } from "@/data/landing";
import { LandingButtonLink } from "@/components/ui/landing-button-link";
import { LandingContainer } from "@/components/ui/landing-container";

interface FinalCtaSectionProps {
  content: LandingContent["finalCta"];
  applyLabel: string;
  applyHref: string;
}

export function FinalCtaSection({ content, applyLabel, applyHref }: FinalCtaSectionProps) {
  return (
    <section className="aa-final-cta" aria-labelledby="final-cta-title">
      <LandingContainer>
        <span className="aa-eyebrow">{content.label}</span>
        <h2 id="final-cta-title">{content.titleStart} <em>{content.titleAccent}</em></h2>
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
