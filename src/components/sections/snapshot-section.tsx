import {
  BriefcaseBusiness,
  Building2,
  Globe2,
  Landmark,
  Network,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import type { IconName, LandingContent } from "@/data/landing";
import { LandingContainer } from "@/components/ui/landing-container";
import { LandingPicture } from "@/components/ui/landing-picture";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealItem } from "@/components/ui/reveal";

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

const snapshotIcons: Partial<Record<IconName, SvgIcon>> = {
  users: UsersRound,
  building: Building2,
  landmark: Landmark,
  briefcase: BriefcaseBusiness,
  globe: Globe2,
  workspace: Network,
  trending: TrendingUp,
};

interface SnapshotSectionProps {
  content: LandingContent["snapshot"];
}

export function SnapshotSection({ content }: SnapshotSectionProps) {
  return (
    <section className="aa-section aa-snapshot" id="ecosystem" aria-label={`${content.titleStart} ${content.titleAccent}`}>
      <LandingContainer>
        <SectionHeading label={content.label} titleStart={content.titleStart} titleAccent={content.titleAccent} />
        <div className="aa-snapshot__grid">
          <Reveal as="ol" className="aa-snapshot-list" stagger={0.07} from="left">
            {content.items.map((item, index) => {
              const Icon = snapshotIcons[item.icon] ?? UsersRound;
              return (
                <RevealItem as="li" className="aa-snapshot-list__item" from="left" key={item.title}>
                  <span className="aa-snapshot-list__number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="aa-snapshot-list__copy">
                    <strong className="aa-snapshot-list__title">
                      <Icon className="aa-snapshot-list__icon" aria-hidden="true" />
                      <span>{item.title}</span>
                    </strong>
                    <small>{item.description}</small>
                  </span>
                </RevealItem>
              );
            })}
          </Reveal>

          <Reveal className="aa-market-card__wrap" from="right" delay={0.1} stagger={0.09}>
            <article className="aa-market-card">
              <RevealItem className="aa-market-card__head" from="right">
                <span className="aa-kicker">{content.marketLabel}</span>
                <h3>{content.marketTitle}</h3>
              </RevealItem>
              <RevealItem from="scale">
                <LandingPicture
                  src={content.mapImage}
                  fallback={content.mapFallback}
                  alt={content.mapAlt}
                  width={content.mapWidth}
                  height={content.mapHeight}
                  className="aa-market-card__map"
                />
              </RevealItem>
              <RevealItem className="aa-market-card__vision" from="up">
                <h4>{content.visionTitle}</h4>
                <p>{content.visionDescription}</p>
              </RevealItem>
              <RevealItem as="ul" className="aa-sector-list" from="up" ariaLabel="Focus sectors">
                {content.sectors.map((sector) => <li key={sector}>{sector}</li>)}
              </RevealItem>
            </article>
          </Reveal>
        </div>
      </LandingContainer>
    </section>
  );
}
