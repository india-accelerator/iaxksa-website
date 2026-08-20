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
      <span className="aa-eyebrow">
        {shouldReduceMotion ? (
          label
        ) : (
          <TextAnimate as="span" animation="blurInUp" by="text" once duration={0.45}>
            {label}
          </TextAnimate>
        )}
      </span>
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
  reduceMotion?: boolean;
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
