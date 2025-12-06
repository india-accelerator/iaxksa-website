'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FoundersLevelSection = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const items = [
    {
      heading: 'Techstars Founder Catalyst',
      description: 'Founder Catalyst is a 10-week, pre-accelerator program that provides participants with the training, tools, mentorship, and network to prepare them for the next level.',
      linkText: 'Learn more',
      linkHref: '#',
    },
    {
      heading: 'Techstars Startup Weekend',
      description: 'Startup Weekend is a three-day program where aspiring entrepreneurs can experience startup life by learning the ins and outs of launching their own startup.',
      linkText: 'Learn more',
      linkHref: '#',
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <section className="w-full bg-black py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8"
            style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
          >
            We Help Founders at Any Level
          </h2>
          <p 
            className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: 'var(--font-poppins), sans-serif', fontWeight: 400 }}
          >
            We believe that while people and ideas are equally distributed, opportunity and resources are not. That's why we are committed to increasing access to entrepreneurship – all over the world.
          </p>
        </div>
      </div>

      {/* Carousel - Full Width */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="relative w-full flex items-center gap-4 md:gap-8 lg:gap-12">
          {/* Navigation Arrow - Left */}
          <button
            onClick={prevSlide}
            className="shrink-0 p-2 md:p-3 transition-opacity hover:opacity-70 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white" />
          </button>

          {/* Carousel Content */}
          <div className="flex-1 relative overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="rounded-lg overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 p-6 md:p-8 lg:p-12">
                  {/* Image */}
                  <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
                    <Image
                      src="/section3img.jpg"
                      alt={items[currentIndex].heading}
                      fill
                      className="object-cover"
                      priority
                      quality={100}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center">
                    <h3 
                      className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6"
                      style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
                    >
                      {items[currentIndex].heading}
                    </h3>
                    <p 
                      className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8"
                      style={{ fontFamily: 'var(--font-poppins), sans-serif', fontWeight: 400 }}
                    >
                      {items[currentIndex].description}
                    </p>
                    <Button
                      asChild
                      variant="link"
                      effect="expandIcon"
                      icon={ChevronRight}
                      iconPlacement="right"
                      className="text-white hover:text-gray-100 font-semibold text-base sm:text-lg p-0 h-auto w-fit justify-start underline [&_svg]:text-[#DC0000] [&_svg]:stroke-[#DC0000]"
                      style={{ fontFamily: 'var(--font-poppins), sans-serif', textDecorationColor: '#DC0000' }}
                    >
                      <a href={items[currentIndex].linkHref}>
                        {items[currentIndex].linkText}
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrow - Right */}
          <button
            onClick={nextSlide}
            className="shrink-0 p-2 md:p-3 transition-opacity hover:opacity-70 z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
