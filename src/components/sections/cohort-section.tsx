import Image from "next/image";
import type { LandingContent } from "@/data/landing";
import { LandingContainer } from "@/components/ui/landing-container";
import { SectionHeading } from "@/components/ui/section-heading";

interface CohortSectionProps {
  content: LandingContent["cohort"];
}

const marqueeCopies = 6;

export function CohortSection({ content }: CohortSectionProps) {
  return (
    <section className="aa-section aa-cohort" id="cohort" aria-label={`${content.titleStart} ${content.titleAccent}`}>
      <LandingContainer>
        <SectionHeading label={content.label} titleStart={content.titleStart} titleAccent={content.titleAccent} />
        <p className="aa-section-intro">{content.description}</p>
      </LandingContainer>
      <div className="aa-cohort__marquee">
        <div className="aa-cohort__marquee-track">
          {Array.from({ length: marqueeCopies }, (_, copyIndex) => (
            <ul
              className="aa-cohort__marquee-group"
              aria-label={copyIndex === 0 ? content.alt : undefined}
              aria-hidden={copyIndex === 0 ? undefined : true}
              key={copyIndex}
            >
              {content.companies.map((company) => (
                <li className="aa-cohort__logo" key={company.name}>
                  <Image
                    className={`aa-cohort__logo-image aa-cohort__logo-image--${company.slug}`}
                    src={company.image}
                    alt={company.name}
                    width={company.width}
                    height={company.height}
                    sizes="(min-width: 48rem) 12rem, 9rem"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
