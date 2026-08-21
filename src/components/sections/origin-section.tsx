import type { LandingContent } from "@/data/landing";
import { LandingContainer } from "@/components/ui/landing-container";
import { LandingPicture } from "@/components/ui/landing-picture";
import { SectionHeading } from "@/components/ui/section-heading";

interface OriginSectionProps {
  content: LandingContent["origin"];
}

export function OriginSection({ content }: OriginSectionProps) {
  return (
    <section className="aa-section aa-origin" id="about" aria-label={`${content.titleStart} ${content.titleAccent}`}>
      <LandingContainer>
        <SectionHeading
          label={content.label}
          titleStart={content.titleStart}
          titleAccent={content.titleAccent}
        />
        <div className="aa-origin-card">
          <LandingPicture
            src={content.image}
            fallback={content.fallback}
            alt={content.alt}
            width={content.width}
            height={content.height}
            className="aa-origin-card__art"
          />
          <div className="aa-origin-card__copy">
            <LandingPicture
              src={content.partnerWordmark}
              fallback={content.partnerWordmarkFallback}
              alt={content.partnerName}
              width={2744}
              height={313}
              className="aa-origin-card__credit"
            />
            <span className="aa-kicker">{content.meta}</span>
            <p>
              <em>{content.paragraphs[0].split(", powered")[0]}</em>
              {`, powered${content.paragraphs[0].split(", powered")[1]} `}
              {content.emphasized.map((item, index) => (
                <strong key={item}>{item}{index < content.emphasized.length - 1 ? ", " : " "}</strong>
              ))}
              {content.paragraphs[1]}
            </p>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
