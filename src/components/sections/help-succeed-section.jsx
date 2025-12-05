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
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 sm:mb-8"
            style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
          >
            We Help You Succeed
          </h2>
          <p 
            className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: 'var(--font-poppins), sans-serif', fontWeight: 400 }}
          >
            Techstars provides founders with a 3-month, mentorship-driven accelerator program, a capital investment, and access to the Techstars network.
          </p>
        </div>

        {/* Three Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {columns.map((column, index) => (
            <div key={index} className="flex flex-col">
              {/* Image Container */}
              <div className="relative w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[250px] overflow-hidden rounded-lg mb-6 sm:mb-8">
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
                className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6"
                style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
              >
                {column.heading}
              </h3>

              {/* Bullet Points */}
              <ul className="space-y-3 sm:space-y-4">
                {column.bullets.map((bullet, bulletIndex) => (
                  <li 
                    key={bulletIndex}
                    className="flex items-start gap-3"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    <span className="shrink-0 w-2 h-2 bg-black mt-2 rounded-sm" />
                    <span className="text-black text-sm sm:text-base leading-relaxed">
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
