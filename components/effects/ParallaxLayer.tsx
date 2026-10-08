"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const MAX_OFFSET = 120; // px at speed 1

type ParallaxLayerProps = {
  children: ReactNode;
  speed?: number; // positive = moves faster than the page, negative = slower
  className?: string;
};

export function ParallaxLayer({ children, speed = 0.3, className }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // 0 when the element enters at the bottom, 1 when it leaves at the top
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [MAX_OFFSET * speed, -MAX_OFFSET * speed]);

  return (
    <motion.div ref={ref} className={className} style={{ y: reduceMotion ? 0 : y }}>
      {children}
    </motion.div>
  );
}
