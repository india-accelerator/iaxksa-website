'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export const HeroSection = () => {
  const [scrollY, setScrollY] = React.useState(0);
  const backgroundRef = React.useRef(null);
  const rafId = React.useRef(null);

  React.useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      // Use requestAnimationFrame for smooth updates
      rafId.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY);
        
        // Direct DOM manipulation for smoother performance
        if (backgroundRef.current) {
          const parallaxOffset = currentScrollY * 0.5;
          backgroundRef.current.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  // Parallax effect: background moves slower than scroll
  const parallaxOffset = scrollY * 0.5;

  return (
    <div className="relative w-full min-h-[60vh] sm:min-h-[90vh] md:min-h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0"
        style={{
          transform: `translate3d(0, ${parallaxOffset}px, 0)`,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          perspective: 1000,
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
      <div className="relative z-10 h-full min-h-[60vh] sm:min-h-[90vh] md:min-h-screen flex items-center px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="w-full max-w-[calc(100%-2rem)] sm:max-w-sm md:max-w-md lg:max-w-xl bg-white/95 backdrop-blur-sm px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-5 sm:py-6 md:py-8 lg:py-10 xl:py-12 mx-auto sm:mx-0 sm:ml-4 md:ml-8 lg:ml-12 xl:ml-16 rounded-lg sm:rounded-xl">
          {/* Headline */}
          <h1 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight text-[#1a1a1a]"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            Techstars Helps Founders Succeed
          </h1>

          {/* Sub-headline */}
          <p 
            className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-5 md:mb-6 lg:mb-8 text-[#1a1a1a] leading-relaxed"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            Join the Techstars accelerator that's right for you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4">
            <Button
              asChild
              size="lg"
              effect="ringHover"
              className="w-full sm:w-auto bg-[#000000] hover:bg-[#000000]/90 text-white text-base sm:text-lg md:text-xl hover:ring-[#DC0000] hover:ring-2 hover:ring-offset-2"
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
              className="w-full sm:w-auto bg-[#000000] hover:bg-[#000000]/90 text-white text-base sm:text-lg md:text-xl hover:ring-[#DC0000] hover:ring-2 hover:ring-offset-2"
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
