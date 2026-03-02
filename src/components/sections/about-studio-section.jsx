'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Counter } from '@/components/ui/counter';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const AboutStudioSection = () => {
  const [applyUrl, setApplyUrl] = React.useState('/apply');

  // Preserve URL parameters when navigating to apply page (client-side only)
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const queryString = params.toString();
      setApplyUrl(queryString ? `/apply?${queryString}` : '/apply');
    }
  }, []);

  const stats = [
    { value: 150, prefix: '', suffix: '+', headline: 'Global Mentors' },
    { value: 250, prefix: '', suffix: '', headline: 'Portfolio Startups' },
    { value: 5, prefix: '', suffix: '', headline: 'Global Programs' },
    { value: 4, prefix: '', suffix: '+', headline: 'Active Funds' },
  ];

  return (
    <section id="about" className="w-full bg-black py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - About Studio */}
          <div className="flex flex-col justify-center">
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase mb-6 sm:mb-8 pl-4 lg:pl-0"
              style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
            >
              About the Initiative
            </h2>
            <div className='pl-4 lg:pl-10'>

            <p 
              className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              Arabian Accelerator, powered by India Accelerator and NTDP, a national program that contributes to developing the technology ecosystem in the Kingdom, empowers Indian startup founders, building in Artificial Intelligence (AI), Sustainability, Electric Mobility (EV), PropTech, and DeepTech sectors with funding, mentorship and market access to scale beyond borders.
            </p>
            <Button
              asChild
              variant="outline"
              effect="expandIcon"
              icon={ChevronRight}
              iconPlacement="right"
              className="w-fit border-white hover:bg-white hover:text-black transition-colors"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
              <Link href={applyUrl}>
                Apply now
              </Link>
            </Button>
              </div>
          </div>

          {/* Right Column - Statistics Grid */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="flex flex-col items-center justify-center text-center"
              >
                <div 
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-2 sm:mb-4"
                  style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
                >
                  <Counter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                  />
                </div>
                <div 
                  className="text-sm sm:text-base md:text-lg text-gray-400 uppercase"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  {stat.headline}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
