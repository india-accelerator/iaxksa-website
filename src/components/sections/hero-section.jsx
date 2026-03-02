'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaDollarSign, FaUsers } from 'react-icons/fa';
import { HiChevronRight } from 'react-icons/hi';

export const HeroSection = () => {
  const backgroundRef = React.useRef(null);
  const rafId = React.useRef(null);
  const [applyUrl, setApplyUrl] = React.useState('/apply');

  // Preserve URL parameters when navigating to apply page (client-side only)
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const queryString = params.toString();
      setApplyUrl(queryString ? `/apply?${queryString}` : '/apply');
    }
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      // Use requestAnimationFrame for smooth updates
      rafId.current = requestAnimationFrame(() => {
        // Direct DOM manipulation for smoother performance
        // Parallax effect: background moves slower than scroll (0.5x speed)
        if (backgroundRef.current) {
          const currentScrollY = window.scrollY;
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

  return (
    <div className="relative w-full min-h-[60vh] sm:min-h-[90vh] md:min-h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0"
        style={{
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

      {/* Main Container with Glassy Background */}
      <div className="relative z-10 h-full min-h-[60vh] sm:min-h-[90vh] md:min-h-screen flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="w-full max-w-7xl mx-auto bg-white/50 backdrop-blur-md rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 border border-white/20 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
            
            {/* Left Container - Text Content */}
            <div className="flex flex-col justify-center">
              {/* Main Headline */}
              <div className="mb-6 sm:mb-8 md:mb-10">
                <h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-3xl xl:text-3xl font-bold leading-[1.15] text-gray-900 tracking-tight mb-2 sm:mb-3"
                  style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
                >
                  <span className="bg-white p-2 rounded-full px-7">Ready to launch into . . . </span>
                  
                </h1>
                <h2 
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[1.1] text-black"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  Saudi Arabia?
                </h2>
              </div>

              {/* Sub-headline */}
              <p 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl text-gray-800 font-semibold tracking-tight"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                Apply Now to Expand
              </p>
            </div>

            {/* Right Container - Program Summary */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl">
                {/* Summary Title */}
                <h2 
                  className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-[#1a1a1a] uppercase tracking-wide"
                  style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}
                >
                  Program Summary
                </h2>

                {/* Program Details List */}
                <div className="mb-8 sm:mb-10">
                  {/* First Row - Starting on, Duration, Format, Investment */}
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-5">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <FaCalendarAlt className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1 shrink-0" />
                      <div style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        <span className="text-sm sm:text-base font-semibold text-[#1a1a1a]">8 Dec 2025 - 28 Feb 2026</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3">
                      <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1 shrink-0" />
                      <div style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        <span className="text-sm sm:text-base font-semibold text-[#1a1a1a]">6 Months</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3">
                      <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1 shrink-0" />
                      <div style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        <span className="text-xs sm:text-sm text-gray-600 block">Format:</span>
                        <span className="text-sm sm:text-base font-semibold text-[#1a1a1a]">Hybrid Model</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3">
                      <FaDollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1 shrink-0" />
                      <div style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                        <span className="text-xs sm:text-sm text-gray-600 block">Investment:</span>
                        <span className="text-sm sm:text-base font-semibold text-[#1a1a1a]">$15 million fund</span>
                      </div>
                    </div>
                  </div>

                  {/* Total Startups - Full Width */}
                  <div className="flex items-start gap-2 sm:gap-3">
                    <FaUsers className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1 shrink-0" />
                    <div style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                      <span className="text-xs sm:text-sm text-gray-600 block">Total Startups:</span>
                      <span className="text-sm sm:text-base font-semibold text-[#1a1a1a]">8 to 10 Early to Growth Stage-Startups</span>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-2.5 sm:gap-3">
                  <Button
                    asChild
                    size="lg"
                    effect="ringHover"
                    className="w-full bg-[#000000] hover:bg-[#000000]/90 text-white text-base sm:text-lg md:text-xl hover:ring-[#DC0000] hover:ring-2 hover:ring-offset-2"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    <Link href={applyUrl}>
                      Apply Now
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    effect="ringHover"
                    className="w-full bg-gray-100 hover:bg-gray-200 text-black text-base sm:text-lg md:text-xl hover:ring-[#DC0000] hover:ring-2 hover:ring-offset-2"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    <Link href="#about">
                      Know More
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
