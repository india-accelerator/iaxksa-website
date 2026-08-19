import type { LandingContent } from "@/data/landing";
import { LandingContainer } from "@/components/ui/landing-container";
import { LandingPicture } from "@/components/ui/landing-picture";
import { SectionHeading } from "@/components/ui/section-heading";

interface BenefitsSectionProps {
  content: LandingContent["benefits"];
}

export function BenefitsSection({ content }: BenefitsSectionProps) {
  return (
    <section className="aa-section aa-benefits" id="founders" aria-label={`${content.titleStart} ${content.titleAccent}`}>
      <LandingContainer>
        <SectionHeading label={content.label} titleStart={content.titleStart} titleAccent={content.titleAccent} />
        <div className="aa-benefits__list">
          {content.items.map((item) => (
            <article className={`aa-benefit-card ${item.imageFirst ? "" : "aa-benefit-card--reverse"}`.trim()} key={item.eyebrow}>
              <LandingPicture
                src={item.image}
                fallback={item.fallback}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="aa-benefit-card__art"
              />
              <div className="aa-benefit-card__copy">
                <span className="aa-kicker">{item.eyebrow}</span>
                <h3>{item.title} <em>{item.accent}</em></h3>
                <ul>
                  {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </LandingContainer>
    </section>
  );
}
