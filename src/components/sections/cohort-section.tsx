import type { LandingContent } from "@/data/landing";
import { LandingContainer } from "@/components/ui/landing-container";
import { LandingPicture } from "@/components/ui/landing-picture";
import { SectionHeading } from "@/components/ui/section-heading";

interface CohortSectionProps {
  content: LandingContent["cohort"];
}

export function CohortSection({ content }: CohortSectionProps) {
  return (
    <section className="aa-section aa-cohort" aria-label={`${content.titleStart} ${content.titleAccent}`}>
      <LandingContainer>
        <SectionHeading label={content.label} titleStart={content.titleStart} titleAccent={content.titleAccent} />
        <p className="aa-section-intro">{content.description}</p>
      </LandingContainer>
      <LandingPicture
        src={content.image}
        fallback={content.fallback}
        alt={content.alt}
        width={content.width}
        height={content.height}
        className="aa-cohort__art"
      />
      <LandingContainer>
        <ul className="aa-cohort__mobile-list" aria-label={content.alt}>
          {content.names.map((name) => <li key={name}>{name}</li>)}
        </ul>
      </LandingContainer>
    </section>
  );
}
