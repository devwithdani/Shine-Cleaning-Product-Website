"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

// Follows the "reduce motion" OS setting. Scroll-linked effects check useReducedMotion() themselves.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
