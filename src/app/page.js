'use client';

import { motion } from 'framer-motion';
import { Navbar01 } from '@/components/layout/navbar-01';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutStudioSection } from '@/components/sections/about-studio-section';
import { AboutWorkSection } from '@/components/sections/about-work-section';
import { HelpSucceedSection } from '@/components/sections/help-succeed-section';
import { GoodCompanySection } from '@/components/sections/good-company-section';
import { FoundersLevelSection } from '@/components/sections/founders-level-section';
import { WorldwideNetworkSection } from '@/components/sections/worldwide-network-section';
import { SponsorsSection } from '@/components/sections/sponsors-section';
import { Footer } from '@/components/layout/footer';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: 'easeOut' }
};

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
};

export default function Home() {
  return (
    <div className="relative w-full">
      <Navbar01 />
      <HeroSection />
      <motion.div {...fadeInUp}>
        <AboutStudioSection />
      </motion.div>
      <motion.div {...fadeInUp}>
        <AboutWorkSection />
      </motion.div>
      <motion.div {...fadeInUp}>
        <HelpSucceedSection />
      </motion.div>
      {/* <motion.div {...fadeInUp}>
        <GoodCompanySection />
      </motion.div> */}
      {/* <FoundersLevelSection /> */}
      {/* <motion.div {...fadeInUp}>
        <WorldwideNetworkSection />
      </motion.div> */}
      <motion.div {...fadeInUp}>
        <SponsorsSection />
      </motion.div>
      <motion.div {...fadeIn}>
        <Footer />
      </motion.div>
    </div>
  );
}
