"use client"

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react"
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react"

import { cn } from "@/lib/utils"

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number
  startValue?: number
  direction?: "up" | "down"
  delay?: number
  decimalPlaces?: number
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === "down" ? value : startValue)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null

    if (isInView) {
      const targetValue = direction === "down" ? startValue : value

      if (shouldReduceMotion) {
        motionValue.jump(targetValue)
        springValue.jump(targetValue)
        return
      }

      timer = setTimeout(() => {
        motionValue.set(targetValue)
      }, delay * 1000)
    }

    return () => {
      if (timer !== null) {
        clearTimeout(timer)
      }
    }
  }, [
    motionValue,
    springValue,
    isInView,
    delay,
    value,
    direction,
    startValue,
    shouldReduceMotion,
  ])

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US", {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(Number(latest.toFixed(decimalPlaces)))
        }
      }),
    [springValue, decimalPlaces]
  )

  return (
    <span
      ref={ref}
      className={cn("inline-block tabular-nums", className)}
      {...props}
    >
      {startValue}
    </span>
  )
}
