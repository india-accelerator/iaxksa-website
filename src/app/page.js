import { Navbar01 } from '@/components/layout/navbar-01';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutStudioSection } from '@/components/sections/about-studio-section';
import { AboutWorkSection } from '@/components/sections/about-work-section';
import { HelpSucceedSection } from '@/components/sections/help-succeed-section';
import { GoodCompanySection } from '@/components/sections/good-company-section';
import { FoundersLevelSection } from '@/components/sections/founders-level-section';
import { WorldwideNetworkSection } from '@/components/sections/worldwide-network-section';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="relative w-full">
      <Navbar01 />
      <HeroSection />
      <AboutStudioSection />
      <AboutWorkSection />
      <HelpSucceedSection />
      <GoodCompanySection />
      <FoundersLevelSection />
      <WorldwideNetworkSection />
      <Footer />
    </div>
  );
}
