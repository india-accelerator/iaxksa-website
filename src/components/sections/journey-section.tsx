import type { LandingContent } from "@/data/landing";
import { LandingContainer } from "@/components/ui/landing-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Reveal, RevealItem } from "@/components/ui/reveal";

interface JourneySectionProps {
  content: LandingContent["journey"];
}

export function JourneySection({ content }: JourneySectionProps) {
  return (
    <section className="aa-section aa-journey" id="journey" aria-label={`${content.titleStart} ${content.titleAccent}`}>
      <LandingContainer>
        <SectionHeading label={content.label} titleStart={content.titleStart} titleAccent={content.titleAccent} />
        <p className="aa-section-intro">{content.description}</p>
        <Reveal as="ol" className="aa-journey-stepper" stagger={0.12} amount={0.25}>
          {content.steps.map((step, index) => (
            <RevealItem
              as="li"
              key={step.week}
              ariaCurrent={index === 2 ? "step" : undefined}
            >
              <div className="aa-journey-stepper__marker" aria-hidden="true">
                <Separator orientation="vertical" className="aa-journey-stepper__connector aa-journey-stepper__connector--vertical" />
                <Separator className="aa-journey-stepper__connector aa-journey-stepper__connector--horizontal" />
                <span className="aa-journey-stepper__node">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="aa-journey-stepper__copy">
                <Badge variant="outline" className="aa-journey-stepper__week">{step.week}</Badge>
                <strong>{step.title}</strong>
                <p>{step.description}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </LandingContainer>
    </section>
  );
}
