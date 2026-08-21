import { Menu, X } from "lucide-react";
import type { LandingContent } from "@/data/landing";
import { LandingBrand } from "@/components/ui/landing-brand";
import { LandingButtonLink } from "@/components/ui/landing-button-link";
import { LandingContainer } from "@/components/ui/landing-container";

interface LandingHeaderProps {
  brand: LandingContent["brand"];
  navigation: LandingContent["navigation"];
  applyLabel: string;
  applyHref: string;
  homeHref?: string;
}

export function LandingHeader({
  brand,
  navigation,
  applyLabel,
  applyHref,
  homeHref,
}: LandingHeaderProps) {
  return (
    <header className="aa-header">
      <LandingContainer className="aa-header__inner">
        <LandingBrand {...brand} homeHref={homeHref} />
        <nav className="aa-nav aa-nav--desktop" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <LandingButtonLink href={applyHref} className="aa-header__cta">{applyLabel}</LandingButtonLink>
        <a
          className="aa-menu-button"
          href="#landing-mobile-menu"
          aria-controls="landing-mobile-menu"
          aria-label="Open navigation menu"
        >
          <Menu aria-hidden="true" />
        </a>
      </LandingContainer>
      <nav
        id="landing-mobile-menu"
        className="aa-nav aa-nav--mobile"
        aria-label="Mobile navigation"
      >
        <a className="aa-menu-close" href="#top" aria-label="Close navigation menu">
          <X aria-hidden="true" />
        </a>
        {navigation.map((item) => (
          <a key={item.href} href={item.href}>{item.label}</a>
        ))}
        <LandingButtonLink href={applyHref}>{applyLabel}</LandingButtonLink>
      </nav>
    </header>
  );
}
