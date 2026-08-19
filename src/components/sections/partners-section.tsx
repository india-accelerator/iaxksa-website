import type { LandingContent } from "@/data/landing";
import { LandingContainer } from "@/components/ui/landing-container";
import { LandingPicture } from "@/components/ui/landing-picture";
import { SectionHeading } from "@/components/ui/section-heading";

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
        <ul className="aa-partners__grid">
          {content.items.map((partner) => (
            <li key={partner.name}>
              <LandingPicture
                src={partner.image}
                fallback={partner.fallback}
                alt={partner.alt}
                width={partner.width}
                height={partner.height}
              />
            </li>
          ))}
        </ul>
      </LandingContainer>
    </section>
  );
}
