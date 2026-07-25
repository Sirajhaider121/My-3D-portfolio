"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface StationWrapperProps {
  scrollProgress: number;
  range: [number, number, number, number]; // [fadeInStart, peakStart, peakEnd, fadeOutEnd]
  isLastStation?: boolean;
  isFirstStation?: boolean;
  children: React.ReactNode;
  id?: string;
}

export default function StationWrapper({
  scrollProgress,
  range,
  isLastStation = false,
  isFirstStation = false,
  children,
  id,
}: StationWrapperProps) {
  const [fadeInStart, peakStart, peakEnd, fadeOutEnd] = range;

  const { opacity, translateY, pointerEvents } = useMemo(() => {
    let op = 0;

    if (isFirstStation && scrollProgress <= peakEnd) {
      if (scrollProgress <= peakStart) {
        op = 1;
      } else {
        op = 1 - (scrollProgress - peakStart) / (fadeOutEnd - peakStart);
      }
    } else if (isLastStation && scrollProgress >= fadeInStart) {
      if (scrollProgress >= peakStart) {
        op = 1;
      } else {
        op = (scrollProgress - fadeInStart) / (peakStart - fadeInStart);
      }
    } else {
      if (scrollProgress < fadeInStart || scrollProgress > fadeOutEnd) {
        op = 0;
      } else if (scrollProgress >= fadeInStart && scrollProgress < peakStart) {
        op = (scrollProgress - fadeInStart) / (peakStart - fadeInStart);
      } else if (scrollProgress >= peakStart && scrollProgress <= peakEnd) {
        op = 1;
      } else if (scrollProgress > peakEnd && scrollProgress <= fadeOutEnd) {
        op = 1 - (scrollProgress - peakEnd) / (fadeOutEnd - peakEnd);
      }
    }

    const clampedOp = Math.max(0, Math.min(1, op));
    const ty = (1 - clampedOp) * 40;
    const pe = clampedOp > 0.1 ? "auto" : "none";

    return { opacity: clampedOp, translateY: ty, pointerEvents: pe as "auto" | "none" };
  }, [scrollProgress, fadeInStart, peakStart, peakEnd, fadeOutEnd, isFirstStation, isLastStation]);

  return (
    <section
      id={id}
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
        pointerEvents,
        transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      className="w-full min-h-screen flex flex-col justify-center py-16"
    >
      {children}
    </section>
  );
}
