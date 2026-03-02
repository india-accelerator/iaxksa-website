'use client';

import * as React from 'react';

export const SponsorsSection = () => {
  return (
    <section className="w-full bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
        {/* Section Title */}
        <div className="text-center mb-8 sm:mb-2 md:mb-2">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 uppercase tracking-wide mb-4"
            style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
          >
            Thank You to Our Sponsors
          </h2>
        </div>

        {/* Sponsors Logos */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20">
          {/* Sponsor 1 - NTDP Logo with Tagline */}
          <div className="flex items-center justify-center">
            <img
              src="/Logo-Files-03.png"
              alt="NTDP - Empowering Accelerators"
              className="h-auto w-auto"
            />
          </div>

          {/* Sponsor 2 - NTDP Logo with Full Program Name */}
          <div className="flex items-center justify-center">
            <img
              src="/EMPOWERING-ACCELERATORS-02.png"
              alt="National Technology Development Program"
              className="h-auto w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
