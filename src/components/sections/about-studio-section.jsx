'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Counter } from '@/components/ui/counter';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const AboutStudioSection = () => {
  const stats = [
    { value: 1300, prefix: '', suffix: '+', headline: 'Mentors' },
    { value: 127.7, prefix: '$', suffix: 'B', decimals: 1, headline: 'Portfolio Market Cap' },
    { value: 22, prefix: '', suffix: '', headline: '$1B+ Companies' },
    { value: 100, prefix: '', suffix: '+', headline: 'SAMPLE HEADLINE' },
  ];

  return (
    <section className="w-full bg-black py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - About Studio */}
          <div className="flex flex-col justify-center">
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase mb-6 sm:mb-8 pl-4 lg:pl-0"
              style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
            >
              ABOUT STUDIO
            </h2>
            <div className='pl-4 lg:pl-10'>

            <p 
              className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              Quickly incentivize impactful action items before tactical collaboration and idea-sharing. Monotonically engage market-driven intellectual capital through wireless opportunities. Progressively network performance based services for functionalized testing procedures.
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
              <Link href="#">
                read more
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
