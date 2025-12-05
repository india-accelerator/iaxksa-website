'use client';

import * as React from 'react';

export const Counter = ({ 
  value, 
  suffix = '', 
  prefix = '', 
  duration = 2000,
  decimals = 0,
  className = ''
}) => {
  const [count, setCount] = React.useState(0);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const counterRef = React.useRef(null);

  React.useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [hasAnimated]);

  React.useEffect(() => {
    if (!hasAnimated) return;

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = value * easeOutQuart;
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [hasAnimated, value, duration]);

  const formatNumber = (num) => {
    if (decimals > 0) {
      // Format with decimals and add commas for thousands
      const parts = num.toFixed(decimals).split('.');
      parts[0] = parseInt(parts[0]).toLocaleString('en-US');
      return parts.join('.');
    }
    return Math.floor(num).toLocaleString('en-US');
  };

  return (
    <span ref={counterRef} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};
