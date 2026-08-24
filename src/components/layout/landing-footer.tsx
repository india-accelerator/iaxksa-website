import type { LandingContent } from "@/data/landing";
import { LandingBrand } from "@/components/ui/landing-brand";
import { LandingContainer } from "@/components/ui/landing-container";

interface LandingFooterProps {
  brand: LandingContent["brand"];
  footer: LandingContent["footer"];
  homeHref?: string;
}

export function LandingFooter({ brand, footer, homeHref }: LandingFooterProps) {
  return (
    <footer className="aa-footer">
      <LandingContainer className="aa-footer__inner">
        <LandingBrand {...brand} homeHref={homeHref} wordmarkOnly compact />
        <nav aria-label="Footer navigation">
          {footer.navigation.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </nav>
        <p>{footer.copyright}</p>
      </LandingContainer>
    </footer>
  );
}
