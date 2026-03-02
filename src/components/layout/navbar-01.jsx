'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

// Simple logo component for the navbar
const Logo = (props) => {
  return (
    <svg width='1em' height='1em' viewBox='0 0 324 323' fill='currentColor' xmlns='http://www.w3.org/2000/svg' {...props}>
      <rect
        x='88.1023'
        y='144.792'
        width='151.802'
        height='36.5788'
        rx='18.2894'
        transform='rotate(-38.5799 88.1023 144.792)'
        fill='currentColor'
      />
      <rect
        x='85.3459'
        y='244.537'
        width='151.802'
        height='36.5788'
        rx='18.2894'
        transform='rotate(-38.5799 85.3459 244.537)'
        fill='currentColor'
      />
    </svg>
  );
};

// Hamburger icon component
const HamburgerIcon = ({ className, ...props }) => (
  <svg
    className={cn('pointer-events-none', className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
);

// Arrow top-right icon component
const ArrowRightIcon = ({ className, ...props }) => (
  <svg
    className={cn('pointer-events-none', className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

// Close icon component
const CloseIcon = ({ className, ...props }) => (
  <svg
    className={cn('pointer-events-none', className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

// Default navigation links
const defaultNavigationLinks = [
  { href: '#about', label: 'About' },
  { href: '#what-sets-us-apart', label: 'What Sets Us Apart' },
  { href: '#benefits', label: 'Benefits' },
  // { href: '#good-company', label: 'Good Company' },
  // { href: '#network', label: 'Network' },
];

export const Navbar01 = React.forwardRef(({
  className,
  logo = <Logo />,
  logoHref = '#',
  navigationLinks = defaultNavigationLinks,
  signInText = 'Sign In',
  signInHref = '#signin',
  ctaText = 'APPLY NOW',
  ctaHref = '#get-started',
  onSignInClick,
  onCtaClick,
  showSubNavbar = true,
  subNavbarText = "Igniting a movement to power bold ideas from India's emerging startup hubs.",
  ...props
}, ref) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSubNavbarVisible, setIsSubNavbarVisible] = useState(showSubNavbar);
  const [isSubNavbarClosing, setIsSubNavbarClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const checkWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setIsMobile(width < 768); // 768px is md breakpoint
      }
    };

    checkWidth();
    const resizeObserver = new ResizeObserver(checkWidth);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Handle scroll for glassy effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset;
      setIsScrolled(scrollPosition > 10); // Trigger glassy effect after 10px scroll
    };

    // Check initial scroll position
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle smooth scroll to section
  const handleNavClick = (e, href, isMobileClick = false) => {
    e.preventDefault();
    
    // Close mobile menu if open
    setIsMenuOpen(false);
    
    // Extract the ID from href (e.g., '#about' -> 'about')
    const targetId = href.replace('#', '');
    
    // Check if we're on the home page
    const isOnHomePage = pathname === '/';
    
    // If not on home page (especially for mobile clicks), navigate to home page first
    if (!isOnHomePage && (isMobileClick || isMobile)) {
      // Navigate to home page with hash using window.location for reliable hash navigation
      window.location.href = `/${href}`;
      return;
    }
    
    // If on home page, try to scroll to the section
    if (isOnHomePage) {
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Calculate offset for navbar height
          const navbarHeight = 80; // Approximate navbar height
          const targetPosition = targetElement.offsetTop - navbarHeight;
          
          // Smooth scroll to the target
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        } else {
          // If element not found, navigate to the hash anyway
          window.location.href = href;
        }
      }, 100);
    } else {
      // For desktop on other pages, navigate to home with hash
      router.push(`/${href}`);
    }
  };

  // Combine refs
  const combinedRef = React.useCallback((node) => {
    containerRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref]);

  return (
    <div className="sticky top-0 z-50">
      <motion.header
        ref={combinedRef}
        initial={{ opacity: 0, y: -20 }}
        animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          duration: 0.6
        }}
        className={cn(
          'w-full px-3 sm:px-4 md:px-6 [&_*]:no-underline transition-all duration-300',
          isScrolled 
            ? 'border-b border-black/10' 
            : '',
          className
        )}
        style={{
          ...(isScrolled ? {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px) saturate(180%)',
            WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          } : { backgroundColor: '#ffffff' }),
          fontFamily: 'var(--font-oswald), sans-serif'
        }}
        {...props}
      >
        <div className="container mx-auto flex h-14 sm:h-16 max-w-screen-2xl items-center gap-2 sm:gap-3 md:gap-4 relative">
        {/* Left side */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Mobile menu trigger */}
          {isMobile && (
            <Popover open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <PopoverTrigger asChild>
                <Button
                  className="group h-8 w-8 sm:h-9 sm:w-9 hover:bg-black/10 hover:text-black text-black"
                  variant="ghost"
                  size="icon"
                >
                  <HamburgerIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-56 p-2 bg-white border-black/10">
                <NavigationMenu className="max-w-none">
                  <NavigationMenuList className="flex-col items-start gap-1">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <Button
                          variant="ghost"
                          effect="hoverUnderline"
                          onClick={(e) => handleNavClick(e, link.href, true)}
                          className={cn(
                            "w-full justify-start rounded-md px-3 py-2 text-xs sm:text-sm font-medium ",
                            link.active
                              ? "bg-black/10 text-black hover:text-white hover:bg-black"
                              : "text-black/80 hover:text-white hover:bg-black"
                          )}
                          style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
                        >
                          {link.label}
                        </Button>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
          )}
          {/* Logo */}
          <button
            onClick={(e) => {
              e.preventDefault();
              router.push('/');
            }}
            className="flex items-center text-black hover:text-black/90 transition-colors cursor-pointer"
          >
            <div className="relative w-16 h-8 sm:w-20 sm:h-10 md:w-40 md:h-12">
              <Image 
                src="/India-Accelerator.png" 
                alt="Next Stop" 
                fill
                className="object-contain"
                priority
              />
            </div>
          </button>
        </div>
        
        {/* Center - Navigation menu */}
        {!isMobile && (
          <div className="flex-1 flex justify-center">
            <NavigationMenu className="flex">
              <NavigationMenuList className="gap-1">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <Button
                      variant="ghost"
                      effect="hoverUnderline"
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={cn(
                        "h-9 px-4 py-2 text-sm font-medium",
                        link.active
                          ? "text-black hover:text-black"
                          : "text-black/80 hover:text-black"
                      )}
                      style={{ fontFamily: 'var(--font-oswald), sans-serif' }}
                    >
                      {link.label}
                    </Button>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        )}
        
        {/* Right side - CTA Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
          <Button
            size="sm"
            effect="expandIcon"
            icon={ArrowRightIcon}
            iconPlacement="right"
            className="text-xs sm:text-sm font-medium px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 h-8 sm:h-9 rounded-full shadow-sm text-white hover:opacity-90 whitespace-nowrap [&_svg]:text-[#DC0000] [&_svg]:stroke-[#DC0000]"
            style={{
              backgroundColor: '#000000',
              border: 'none',
              fontFamily: 'var(--font-oswald), sans-serif'
            }}
            onClick={(e) => {
              e.preventDefault();
              if (onCtaClick) {
                onCtaClick();
              } else {
                // Preserve URL parameters when navigating to apply page
                const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
                const queryString = params.toString();
                const applyUrl = queryString ? `/apply?${queryString}` : '/apply';
                router.push(applyUrl);
              }
            }}
          >
            <span className="hidden sm:inline">{ctaText}</span>
            <span className="sm:hidden">APPLY</span>
          </Button>
        </div>
      </div>
    </motion.header>
    
    {/* Sub Navbar */}
    {/* {isSubNavbarVisible && (
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={isMounted && !isSubNavbarClosing ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
          delay: 0.2
        }}
        className={`w-full px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 overflow-hidden transition-all duration-300 ease-in-out ${
          isSubNavbarClosing ? 'opacity-0 max-h-0 py-0' : 'opacity-100 max-h-20 sm:max-h-24'
        }`}
        style={{ backgroundColor: '#F8DCD9' }}
      >
        <div className="container mx-auto flex items-center justify-between max-w-screen-2xl gap-2 sm:gap-3 md:gap-4">
          <p className="text-xs sm:text-sm md:text-base flex-1 text-left pr-2 sm:pr-0 leading-tight sm:leading-normal" style={{ color: '#782821' }}>
            {subNavbarText}
          </p>
          <button
            onClick={() => {
              setIsSubNavbarClosing(true);
              setTimeout(() => {
                setIsSubNavbarVisible(false);
              }, 300); // Match the transition duration
            }}
            className="shrink-0 p-1 hover:opacity-70 transition-opacity"
            style={{ color: '#4C231F' }}
            aria-label="Close banner"
          >
            <CloseIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </motion.div>
    )} */}
    </div>
  );
});

Navbar01.displayName = 'Navbar01';

export { Logo, HamburgerIcon };
