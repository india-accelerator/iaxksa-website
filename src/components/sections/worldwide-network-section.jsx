'use client';

import * as React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const WorldwideNetworkSection = () => {
  const columns = [
    {
      heading: 'Mentors',
      description: 'Mentors are essential. They share wisdom, create relationships, and help you succeed. Techstars mentors come from top companies like Google, Nike, Amazon, Aetna, ESPN, and Coca-Cola.',
      linkText: 'Meet our mentors',
      linkHref: '#',
    },
    {
      heading: 'Partners',
      description: 'Techstars offers ways to engage with our network, whether you want to build a local startup community, interact with top startups, or invest.',
      linkText: 'Partner with us',
      linkHref: '#',
    },
    {
      heading: 'Investors',
      description: 'Techstars is a leading pre-seed venture capital firm, investing globally in entrepreneurs. We have been supporting founders since 2007 and delivering strong returns.',
      linkText: 'Invest in the future',
      linkHref: '#',
    },
  ];

  return (
    <section className="w-full bg-black py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8"
            style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
          >
            Join Our Worldwide Network
          </h2>
          <p 
            className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: 'var(--font-poppins), sans-serif', fontWeight: 400 }}
          >
            We help entrepreneurs succeed through accelerator programs, venture capital funds, and community building.
          </p>
        </div>

        {/* Three Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {columns.map((column, index) => (
            <div key={index} className="flex flex-col">
              {/* Image Container */}
              <div className="relative w-full h-[150px] sm:h-[180px] md:h-[200px] lg:h-[220px] overflow-hidden rounded-lg mb-6 sm:mb-8">
                <Image
                  src="/section4.jpg"
                  alt={column.heading}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  quality={100}
                />
              </div>

              {/* Column Heading */}
              <h3 
                className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6"
                style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
              >
                {column.heading}
              </h3>

              {/* Description */}
              <p 
                className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 grow"
                style={{ fontFamily: 'var(--font-poppins), sans-serif', fontWeight: 400 }}
              >
                {column.description}
              </p>

              {/* Link */}
              <Button
                asChild
                variant="link"
                effect="expandIcon"
                icon={ChevronRight}
                iconPlacement="right"
                className="text-white hover:text-gray-100 font-semibold text-base sm:text-lg p-0 h-auto w-fit justify-start underline [&_svg]:text-[#DC0000] [&_svg]:stroke-[#DC0000]"
                style={{ fontFamily: 'var(--font-poppins), sans-serif', textDecorationColor: '#DC0000' }}
              >
                <a href={column.linkHref}>
                  {column.linkText}
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
