'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef(
  ({ className, sideOffset = 4, children, ...props }, ref) => {
    const contentRef = React.useRef(null);
    const combinedRef = React.useCallback(
      (node) => {
        contentRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    return (
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={combinedRef}
          sideOffset={sideOffset}
          className={cn(
            'z-50 overflow-hidden rounded-md bg-white px-3 py-1.5 text-sm text-black shadow-md',
            className
          )}
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          {...props}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25
            }}
          >
            {children}
          </motion.div>
          <TooltipPrimitive.Arrow className="fill-gray-900" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    );
  }
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
