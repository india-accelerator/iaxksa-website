'use client';

import * as React from 'react';
import { ArrowRight } from 'lucide-react';

export const AboutWorkSection = () => {
  const phases = [
    {
      number: 'Phase 1',
      title: 'Readiness',
      activities: 'Blueprint workshops, compliance and procurement sessions, virtual sessions with IA and NTDP',
    },
    {
      number: 'Phase 2',
      title: 'Market Exposure',
      activities: 'Booth presence at LEAP, curated enterprises, sector walkthroughs, follow-ups, and thought leadership exposure',
    },
    {
      number: 'Phase 3',
      title: 'Business Development',
      activities: 'Weekly GTM, follow-ups with LEAP leads, drafting pilot proposals, and legal compliance evaluation.',
    },
    {
      number: 'Phase 4',
      title: 'Pilot Activation',
      activities: 'Deep-dive meetings with corporates, integration support, procurement documentation, entity setup assistance, and investor introductions.',
    },
  ];

  return (
    <section id="what-sets-us-apart" className="w-full bg-white py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
        {/* Main Heading */}
        <h2 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-12 sm:mb-16 md:mb-20 text-center lg:text-left"
          style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
        >
          What Sets Us Apart
        </h2>

        {/* Four Phase Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {phases.map((phase, index) => (
            <div 
              key={index}
              className="group border-l-4 border-black pl-6 sm:pl-8 transition-all duration-300 hover:border-l-8 hover:-ml-1 cursor-pointer"
            >
              {/* Phase Number and Title */}
              <div className="mb-4 sm:mb-6 transition-transform duration-300 group-hover:translate-x-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 text-[#DC0000]" strokeWidth={3} />
                  </div>
                  <span 
                    className="text-sm sm:text-base font-semibold text-[#DC0000] uppercase tracking-wide"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    {phase.number}
                  </span>
                </div>
                <h3 
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-black"
                  style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
                >
                  {phase.title}
                </h3>
              </div>

              {/* Activities */}
              <div>
                <p 
                  className="text-sm sm:text-base font-semibold text-gray-600 mb-2"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  Activities:
                </p>
                <p 
                  className="text-gray-700 text-base sm:text-lg leading-relaxed"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  {phase.activities}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
