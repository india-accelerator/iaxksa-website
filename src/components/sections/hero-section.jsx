'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export const HeroSection = () => {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax effect: background moves slower than scroll
  const parallaxOffset = scrollY * 0.5;

  return (
    <div className="relative w-full min-h-[85vh] sm:min-h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
          willChange: 'transform',
        }}
      >
        <Image
          src="/Banner1.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      {/* White Semi-Transparent Overlay Box */}
      <div className="relative z-10 h-full min-h-[85vh] sm:min-h-screen flex items-center">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl bg-white/95 backdrop-blur-sm px-5 sm:px-6 md:px-12 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12 ml-4 sm:ml-8 md:ml-12 lg:ml-16 xl:ml-20 rounded-xl">
          {/* Headline */}
          <h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight text-[#1a1a1a]"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            Techstars Helps Founders Succeed
          </h1>

          {/* Sub-headline */}
          <p 
            className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-[#1a1a1a]"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            Join the Techstars accelerator that's right for you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              asChild
              size="lg"
              effect="ringHover"
              className="w-full sm:w-auto bg-[#000000] hover:bg-[#000000]/90 text-white text-xl hover:ring-[#DC0000] hover:ring-2 hover:ring-offset-2"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              <Link href="/apply">
                Find a Program
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              effect="ringHover"
              className="w-full sm:w-auto bg-[#000000] hover:bg-[#000000]/90 text-white text-xl hover:ring-[#DC0000] hover:ring-2 hover:ring-offset-2"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              <Link href="#">
                Investment Terms
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
