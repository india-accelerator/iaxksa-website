'use client';

import * as React from 'react';
import { Network, DollarSign, Shield, Presentation } from 'lucide-react';

// Floating animation variants for each box
const floatingAnimations = [
  'animate-[float_6s_ease-in-out_infinite]', // Box 1: up and down
  'animate-[float_7s_ease-in-out_infinite_1s]', // Box 2: delayed, different timing
  'animate-[float_6.5s_ease-in-out_infinite_0.5s]', // Box 3: different timing
  'animate-[float_7.5s_ease-in-out_infinite_1.5s]', // Box 4: different timing
];

export const HelpSucceedSection = () => {
  const benefits = [
    {
      icon: Network,
      text: "Access to IA's ecosystem and industry leaders in the respective space.",
    },
    {
      icon: DollarSign,
      text: 'Investment support according to your startup plan.',
    },
    {
      icon: Shield,
      text: '360+ support from legal to product.',
    },
    {
      icon: Presentation,
      text: 'Opportunity to showcase your idea on a wider platform.',
    },
  ];

  return (
    <section id="benefits" className="w-full bg-white py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 sm:mb-8 leading-tight"
            style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
          >
            What will startups get?
          </h2>
        </div>

        {/* Icon Boxes in 2x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            // Different animation delays for each box
            const animationDelays = ['0s', '1.5s', '0.75s', '2.25s'];
            const animationDurations = ['6s', '7s', '6.5s', '7.5s'];
            return (
              <div 
                key={index}
                className="flex items-center gap-4 sm:gap-6 p-6 sm:p-8"
                style={{
                  animation: `float ${animationDurations[index]} ease-in-out infinite`,
                  animationDelay: animationDelays[index],
                }}
              >
                {/* Icon Box */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-black rounded-xl flex items-center justify-center shrink-0">
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2} />
                </div>

                {/* Text Content */}
                <p 
                  className="text-black text-sm sm:text-base md:text-lg leading-relaxed flex-1"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  {benefit.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
