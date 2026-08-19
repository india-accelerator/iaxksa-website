import type { LandingContent } from "@/data/landing";
import { LandingContainer } from "@/components/ui/landing-container";
import { SectionHeading } from "@/components/ui/section-heading";

interface JourneySectionProps {
  content: LandingContent["journey"];
}

export function JourneySection({ content }: JourneySectionProps) {
  return (
    <section className="aa-section aa-journey" id="journey" aria-label={`${content.titleStart} ${content.titleAccent}`}>
      <LandingContainer>
        <SectionHeading label={content.label} titleStart={content.titleStart} titleAccent={content.titleAccent} />
        <p className="aa-section-intro">{content.description}</p>
        <ol className="aa-journey-list">
          {content.steps.map((step) => (
            <li key={step.week}>
              <span>{step.week}</span>
              <strong>{step.title}</strong>
              <p>{step.description}</p>
              <i aria-hidden="true" />
            </li>
          ))}
        </ol>
      </LandingContainer>
    </section>
  );
}
