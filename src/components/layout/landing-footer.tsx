import type { LandingContent } from "@/data/landing";
import { LandingBrand } from "@/components/ui/landing-brand";
import { LandingContainer } from "@/components/ui/landing-container";

interface LandingFooterProps {
  brand: LandingContent["brand"];
  footer: LandingContent["footer"];
}

export function LandingFooter({ brand, footer }: LandingFooterProps) {
  return (
    <footer className="aa-footer">
      <LandingContainer className="aa-footer__inner">
        <LandingBrand {...brand} poweredBy={footer.poweredBy} compact />
        <nav aria-label="Footer navigation">
          {footer.navigation.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </nav>
        <p>{footer.copyright}</p>
      </LandingContainer>
    </footer>
  );
}
