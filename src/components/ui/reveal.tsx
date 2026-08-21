"use client";

import type { ElementType, ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

type RevealAs = "div" | "ul" | "ol" | "li" | "section" | "article" | "aside" | "span";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Element to render. Defaults to a div. */
  as?: RevealAs;
  /** Seconds to wait after the element is in view. */
  delay?: number;
  /** Stagger applied to direct Reveal.Item children. */
  stagger?: number;
  /** Fraction of the element that must be visible before it animates. */
  amount?: number;
  /** Direction the content travels in from. */
  from?: "up" | "left" | "right" | "scale";
  ariaLabel?: string;
}

const OFFSET = 28;

function itemVariants(from: NonNullable<RevealProps["from"]>): Variants {
  const hidden =
    from === "left"
      ? { opacity: 0, x: -OFFSET }
      : from === "right"
        ? { opacity: 0, x: OFFSET }
        : from === "scale"
          ? { opacity: 0, scale: 0.92 }
          : { opacity: 0, y: OFFSET };

  return {
    hidden,
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };
}

/**
 * Scroll-triggered entrance wrapper. Nothing moves until the element is
 * genuinely on screen, matching how the section headings already behave.
 */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  stagger = 0.08,
  amount = 0.3,
  from = "up",
  ariaLabel,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[as] as ElementType;

  if (shouldReduceMotion) {
    const Tag = as as ElementType;
    return (
      <Tag className={className} aria-label={ariaLabel}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      aria-label={ariaLabel}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { delayChildren: delay, staggerChildren: stagger } },
      }}
    >
      {children}
    </MotionTag>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  as?: RevealAs;
  from?: NonNullable<RevealProps["from"]>;
  ariaHidden?: boolean;
  ariaCurrent?: "step" | undefined;
  ariaLabel?: string;
}

/** A single staggered child of a <Reveal>. */
export function RevealItem({
  children,
  className,
  as = "div",
  from = "up",
  ariaHidden,
  ariaCurrent,
  ariaLabel,
}: RevealItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Tag = as as ElementType;
    return (
      <Tag className={className} aria-hidden={ariaHidden} aria-current={ariaCurrent} aria-label={ariaLabel}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as] as ElementType;
  return (
    <MotionTag
      className={className}
      aria-hidden={ariaHidden}
      aria-current={ariaCurrent}
      aria-label={ariaLabel}
      variants={itemVariants(from)}
    >
      {children}
    </MotionTag>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  as?: RevealAs;
  stagger?: number;
  ariaLabel?: string;
  ariaHidden?: boolean;
}

/**
 * Pass-through container that forwards a <Reveal>'s variant state to nested
 * items. Declares no transform of its own, so an element already driven by a
 * CSS animation (the cohort marquee track) keeps running untouched.
 */
export function RevealGroup({
  children,
  className,
  as = "div",
  stagger = 0.08,
  ariaLabel,
  ariaHidden,
}: RevealGroupProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Tag = as as ElementType;
    return (
      <Tag className={className} aria-label={ariaLabel} aria-hidden={ariaHidden}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as] as ElementType;
  return (
    <MotionTag
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </MotionTag>
  );
}
