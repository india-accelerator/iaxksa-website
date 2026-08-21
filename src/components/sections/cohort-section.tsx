import Image from "next/image";
import type { LandingContent } from "@/data/landing";
import { LandingContainer } from "@/components/ui/landing-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

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
      <Reveal className="aa-cohort__marquee" amount={0.2} stagger={0}>
        <RevealGroup className="aa-cohort__marquee-track" stagger={0}>
          {Array.from({ length: marqueeCopies }, (_, copyIndex) => (
            <RevealGroup
              as="ul"
              className="aa-cohort__marquee-group"
              stagger={0.09}
              ariaLabel={copyIndex === 0 ? content.alt : undefined}
              ariaHidden={copyIndex === 0 ? undefined : true}
              key={copyIndex}
            >
              {content.companies.map((company) => (
                <RevealItem as="li" className="aa-cohort__logo" from="scale" key={company.name}>
                  <Image
                    className={`aa-cohort__logo-image aa-cohort__logo-image--${company.slug}`}
                    src={company.image}
                    alt={company.name}
                    width={company.width}
                    height={company.height}
                    sizes="(min-width: 48rem) 12rem, 9rem"
                  />
                </RevealItem>
              ))}
            </RevealGroup>
          ))}
        </RevealGroup>
      </Reveal>
    </section>
  );
}
