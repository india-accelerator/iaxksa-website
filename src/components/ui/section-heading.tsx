"use client";

import { useReducedMotion } from "motion/react";
import { TextAnimate } from "@/components/ui/text-animate";

interface SectionHeadingProps {
  label: string;
  titleStart: string;
  titleAccent: string;
  align?: "start" | "center";
  headingId?: string;
}

export function SectionHeading({
  label,
  titleStart,
  titleAccent,
  align = "start",
  headingId,
}: SectionHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className={`aa-section-heading aa-section-heading--${align}`}>
      <SectionEyebrow label={label} reduceMotion={shouldReduceMotion} />
      <AnimatedTitle
        id={headingId}
        titleStart={titleStart}
        titleAccent={titleAccent}
        reduceMotion={shouldReduceMotion}
      />
    </header>
  );
}

interface AnimatedTitleProps {
  titleStart: string;
  titleAccent: string;
  id?: string;
  reduceMotion?: boolean | null;
}

export function AnimatedTitle({
  titleStart,
  titleAccent,
  id,
  reduceMotion,
}: AnimatedTitleProps) {
  if (reduceMotion) {
    return (
      <h2 id={id}>
        {titleStart} <em>{titleAccent}</em>
      </h2>
    );
  }

  return (
    <h2 id={id}>
      <TextAnimate as="span" animation="blurInUp" by="word" once duration={0.5} accessible={false}>
        {titleStart}
      </TextAnimate>{" "}
      <em>
        <TextAnimate
          as="span"
          animation="blurInUp"
          by="word"
          once
          delay={0.14}
          duration={0.5}
          accessible={false}
        >
          {titleAccent}
        </TextAnimate>
      </em>
    </h2>
  );
}


interface SectionEyebrowProps {
  label: string;
  reduceMotion?: boolean | null;
}

/**
 * Section kicker label ("Start of the journey", "The roadmap"). Slides in from
 * the left one word at a time, so it reads distinctly from the blur-up used on
 * the titles it introduces.
 */
export function SectionEyebrow({ label, reduceMotion }: SectionEyebrowProps) {
  return (
    <span className="aa-eyebrow">
      {reduceMotion ? (
        label
      ) : (
        <TextAnimate
          as="span"
          animation="slideRight"
          by="word"
          once
          duration={0.55}
        >
          {label}
        </TextAnimate>
      )}
    </span>
  );
}
