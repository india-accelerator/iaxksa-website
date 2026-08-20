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
          <ol className="aa-snapshot-list">
            {content.items.map((item, index) => {
              const Icon = snapshotIcons[item.icon] ?? UsersRound;
              return (
                <li className="aa-snapshot-list__item" key={item.title}>
                  <span className="aa-snapshot-list__number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="aa-icon-box"><Icon aria-hidden="true" /></span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </span>
                </li>
              );
            })}
          </ol>
          <article className="aa-market-card">
            <span className="aa-kicker">{content.marketLabel}</span>
            <h3>{content.marketTitle}</h3>
            <LandingPicture
              src={content.mapImage}
              fallback={content.mapFallback}
              alt={content.mapAlt}
              width={content.mapWidth}
              height={content.mapHeight}
              className="aa-market-card__map"
            />
            <h4>{content.visionTitle}</h4>
            <p>{content.visionDescription}</p>
            <ul className="aa-sector-list" aria-label="Focus sectors">
              {content.sectors.map((sector) => <li key={sector}>{sector}</li>)}
            </ul>
          </article>
        </div>
      </LandingContainer>
    </section>
  );
}
