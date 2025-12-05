'use client';

import * as React from 'react';
import Image from 'next/image';
import { Smartphone, MapPin } from 'lucide-react';

export const AboutWorkSection = () => {
  const [parallaxOffset, setParallaxOffset] = React.useState(0);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionTop = rect.top;
        const sectionCenter = sectionTop + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        
        // Calculate distance from viewport center
        // When section center is at viewport center, offset is 0
        // As section moves down (scroll down), image moves up (negative)
        const distanceFromCenter = sectionCenter - viewportCenter;
        
        // Slow parallax effect (0.1 = 10% of distance)
        // Negative value makes it move opposite direction (up when scrolling down)
        const offset = distanceFromCenter * -0.1;
        
        // Clamp the offset to prevent excessive movement
        const clampedOffset = Math.max(-80, Math.min(80, offset));
        setParallaxOffset(clampedOffset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
        {/* Top Row - Heading, Text, and Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-8 sm:mb-10 md:mb-12">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center">
            {/* Main Heading */}
            <h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 sm:mb-8"
              style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
            >
              About Work
            </h2>

            {/* Primary Paragraph */}
            <p 
              className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8"
              style={{ fontFamily: 'var(--font-poppins), sans-serif', fontWeight: 400 }}
            >
              Oh feel if up to till like. He an thing rapid these after going drawn or. Timed she his law the spoil round defer. In surprise concerns informed betrayed he learning is ye. Ignorant formerly so ye blessing.
            </p>

            {/* Secondary Paragraph */}
            <p 
              className="text-black text-base sm:text-lg md:text-xl leading-relaxed font-bold"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              He as spoke avoid given downs money on we. Of properly carriage shutters ye as wandered up repeated moreover.
            </p>
          </div>

          {/* Right Column - Image (Reduced Size, Full Length) with Parallax */}
          <div className="relative w-full max-w-md mx-auto lg:mx-0 h-[300px] sm:h-[300px] md:h-[350px] lg:h-[600px] overflow-hidden rounded-lg">
            <div
              className="absolute inset-0"
              style={{
                transform: `translateY(${parallaxOffset}px)`,
                willChange: 'transform',
              }}
            >
              <Image
                src="/section3img.jpg"
                alt="About Work"
                fill
                className="object-contain"
                priority
                quality={100}
              />
            </div>
          </div>
        </div>

        {/* Bottom Row - Feature Blocks */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
          {/* Left Feature Block */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-black rounded-full flex items-center justify-center">
              <Smartphone className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2} />
            </div>
            <p 
              className="text-black text-sm sm:text-base leading-relaxed"
              style={{ fontFamily: 'var(--font-poppins), sans-serif', fontWeight: 400 }}
            >
              Sample text. Click to select the text box. Click again or double click to start editing the text.
            </p>
          </div>

          {/* Right Feature Block */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-black rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2} />
            </div>
            <p 
              className="text-black text-sm sm:text-base leading-relaxed"
              style={{ fontFamily: 'var(--font-poppins), sans-serif', fontWeight: 400 }}
            >
              Sample text. Click to select the text box. Click again or double click to start editing the text.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
