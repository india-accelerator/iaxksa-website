import type { LandingContent } from "@/data/landing";
import { LandingContainer } from "@/components/ui/landing-container";
import { LandingPicture } from "@/components/ui/landing-picture";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealItem } from "@/components/ui/reveal";

interface PartnersSectionProps {
  content: LandingContent["partners"];
}

export function PartnersSection({ content }: PartnersSectionProps) {
  return (
    <section className="aa-section aa-partners" aria-label={`${content.titleStart} ${content.titleAccent}`}>
      <LandingContainer>
        <SectionHeading
          label={content.label}
          titleStart={content.titleStart}
          titleAccent={content.titleAccent}
          align="center"
        />
        <Reveal as="ul" className="aa-partners__grid" stagger={0.12} amount={0.25}>
          {content.items.map((partner) => (
            <RevealItem as="li" from="scale" key={partner.name}>
              <LandingPicture
                src={partner.image}
                fallback={partner.fallback}
                alt={partner.alt}
                width={partner.width}
                height={partner.height}
              />
            </RevealItem>
          ))}
        </Reveal>
      </LandingContainer>
    </section>
  );
}
