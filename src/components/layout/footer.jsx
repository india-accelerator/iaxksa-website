'use client';

import * as React from 'react';
import { Linkedin, Link, Instagram } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const Footer = () => {
  const socialLinks = [
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/company/india-accelerator',
      label: 'LinkedIn',
    },
    {
      icon: Link,
      href: 'https://indiaaccelerator.live/',
      label: 'IA',
    },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/indiaaccelerator',
      label: 'Instagram',
    },
  ];

  return (
    <TooltipProvider delayDuration={200}>
      <footer 
        className="w-full py-12 sm:py-16 bg-black"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 sm:gap-10">
            {/* Socials Heading */}
            <h3 
              className="text-base sm:text-lg md:text-xl font-medium text-white/90"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              Follow Us
            </h3>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4 sm:gap-6">
              {socialLinks.map((social, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <a
                      href={social.href}
                      className="group relative p-3 sm:p-4 bg-white rounded-lg hover:bg-white/90 transition-all duration-300"
                      aria-label={social.label}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <social.icon 
                        className="w-5 h-5 sm:w-6 sm:h-6 text-black"
                      />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="top" sideOffset={8}>
                    <p>{social.label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>

            {/* Copyright */}
            <p 
              className="text-sm sm:text-base text-white/70 font-light"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              2025 © All rights reserved by India Accelerator
            </p>
          </div>
        </div>
      </footer>
    </TooltipProvider>
  );
};
