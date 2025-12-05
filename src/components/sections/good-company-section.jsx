'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const GoodCompanySection = () => {
  // Create multiple copies of the image for seamless infinite loop
  const imageCount = 8;
  const images = Array.from({ length: imageCount }, (_, i) => i);

  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 sm:mb-8"
            style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
          >
            You'll Be in Good Company
          </h2>
        </div>

        {/* Infinite Carousel with Framer Motion */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear',
              },
            }}
          >
            {/* First set of images */}
            {images.map((index) => (
              <div
                key={`first-${index}`}
                className="shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] px-4"
              >
                <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-lg">
                  <Image
                    src="/section4.jpg"
                    alt="Good Company"
                    fill
                    className="object-cover"
                    quality={100}
                  />
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {images.map((index) => (
              <div
                key={`second-${index}`}
                className="shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] px-4"
              >
                <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-lg">
                  <Image
                    src="/section4.jpg"
                    alt="Good Company"
                    fill
                    className="object-cover"
                    quality={100}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
