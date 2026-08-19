import { landingContent } from "@/data/landing";
import { LandingFooter } from "@/components/layout/landing-footer";
import { LandingHeader } from "@/components/layout/landing-header";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { CohortSection } from "@/components/sections/cohort-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { JourneySection } from "@/components/sections/journey-section";
import { OriginSection } from "@/components/sections/origin-section";
import { PartnersSection } from "@/components/sections/partners-section";
import { SnapshotSection } from "@/components/sections/snapshot-section";

export default function HomePage() {
  return (
    <div className="aa-page" id="top">
      <LandingHeader
        brand={landingContent.brand}
        navigation={landingContent.navigation}
        applyLabel={landingContent.applyLabel}
        applyHref={landingContent.applyHref}
      />
      <main>
        <HeroSection
          content={landingContent.hero}
          applyLabel={landingContent.applyLabel}
          applyHref={landingContent.applyHref}
        />
        <OriginSection content={landingContent.origin} />
        <SnapshotSection content={landingContent.snapshot} />
        <JourneySection content={landingContent.journey} />
        <BenefitsSection content={landingContent.benefits} />
        <CohortSection content={landingContent.cohort} />
        <PartnersSection content={landingContent.partners} />
        <FinalCtaSection
          content={landingContent.finalCta}
          applyLabel={landingContent.applyLabel}
          applyHref={landingContent.applyHref}
        />
      </main>
      <LandingFooter
        brand={landingContent.brand}
        footer={landingContent.footer}
      />
    </div>
  );
}
