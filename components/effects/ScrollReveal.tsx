"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, revealTransition } from "@/lib/animations";

type ScrollRevealProps = {
  children: ReactNode;
  delay?: number;
  amount?: number; // part of the element that has to be visible (0-1)
  className?: string;
};

// Fades its children up the first time they scroll into view
export function ScrollReveal({ children, delay = 0, amount = 0.3, className }: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={fadeUp.hidden}
      whileInView={fadeUp.visible}
      viewport={{ once: true, amount }}
      transition={{ ...revealTransition, delay }}
      style={{ transformPerspective: 1200 }}
    >
      {children}
    </motion.div>
  );
}
