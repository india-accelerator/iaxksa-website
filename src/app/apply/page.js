import { landingContent } from "@/data/landing";
import { LandingFooter } from "@/components/layout/landing-footer";
import { LandingHeader } from "@/components/layout/landing-header";
import { WaitlistApplicationForm } from "@/components/forms/waitlist-application-form";

export const metadata = {
  title: "Apply · Arabian Accelerator",
  description: "Cohort 01 applications are closed. Join the waitlist for the next intake.",
};

// In-page anchors have to point back at the landing page from here.
const toLandingAnchor = (items) =>
  items.map((item) => ({
    ...item,
    href: item.href.startsWith("#") ? `/${item.href}` : item.href,
  }));

export default function ApplyPage() {
  return (
    <div className="aa-page" id="top">
      <LandingHeader
        brand={landingContent.brand}
        navigation={toLandingAnchor(landingContent.navigation)}
        applyLabel={landingContent.applyLabel}
        applyHref={landingContent.applyHref}
        homeHref="/"
      />
      <main>
        <WaitlistApplicationForm content={landingContent.apply} />
      </main>
      <LandingFooter
        brand={landingContent.brand}
        footer={{ ...landingContent.footer, navigation: toLandingAnchor(landingContent.footer.navigation) }}
        homeHref="/"
      />
    </div>
  );
}
