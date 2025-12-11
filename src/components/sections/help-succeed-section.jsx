'use client';

import * as React from 'react';
import Image from 'next/image';

export const HelpSucceedSection = () => {
  const columns = [
    {
      heading: 'Startups Accelerated',
      bullets: [
        'Techstars has invested in companies from just about every tech-related vertical, including companies like SendGrid, DigitalOcean, PillPack, and more',
        '**117** Techstars accelerator companies have a market cap greater than $100M',
      ],
    },
    {
      heading: 'Founders Supported',
      bullets: [
        'Techstars lives **Give First** – a philosophy of helping anyone, especially entrepreneurs, without any expectation of getting something back',
        'Techstars has mentors worldwide supporting **10,800+** founders',
      ],
    },
    {
      heading: 'Capital Raised',
      bullets: [
        '**74%** of Techstars companies raise capital within the first three years',
        '**$30.4B** is the total lifetime raised by Techstars accelerator companies',
        '**$1M+** is the average first raise post-program',
      ],
    },
  ];

  // Helper function to render text with bold parts
  const renderText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <section className="w-full bg-white py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-4 sm:mb-5 md:mb-6 lg:mb-8 leading-tight"
            style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
          >
            We Help You Succeed
          </h2>
          <p 
            className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto px-2 sm:px-0"
            style={{ fontFamily: 'var(--font-poppins), sans-serif', fontWeight: 400 }}
          >
            Techstars provides founders with a 3-month, mentorship-driven accelerator program, a capital investment, and access to the Techstars network.
          </p>
        </div>

        {/* Row on mobile, Grid on desktop */}
        <div 
          className="flex flex-row overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-0 md:gap-8 lg:gap-10 xl:gap-12 md:overflow-x-visible snap-x snap-mandatory md:snap-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 sm:-mx-6 md:mx-0"
        >
          {columns.map((column, index) => (
            <div key={index} className="flex flex-col w-screen min-w-screen sm:w-screen sm:min-w-screen md:w-auto md:min-w-0 snap-center md:snap-none shrink-0 px-4 sm:px-6 md:px-0">
              {/* Image Container */}
              <div className="relative w-full h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px] xl:h-[250px] overflow-hidden rounded-lg mb-4 sm:mb-5 md:mb-6 lg:mb-8">
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
                className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold text-black mb-3 sm:mb-4 md:mb-5 lg:mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
              >
                {column.heading}
              </h3>

              {/* Bullet Points */}
              <ul className="space-y-2.5 sm:space-y-3 md:space-y-3.5 lg:space-y-4">
                {column.bullets.map((bullet, bulletIndex) => (
                  <li 
                    key={bulletIndex}
                    className="flex items-start gap-2.5 sm:gap-3"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    <span className="shrink-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black mt-1.5 sm:mt-2 rounded-sm" />
                    <span className="text-black text-xs sm:text-sm md:text-base leading-relaxed flex-1">
                      {renderText(bullet)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
