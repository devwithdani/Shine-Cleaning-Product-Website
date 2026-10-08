"use client";

import { useSyncExternalStore } from "react";

// false on the server, so the lighter mobile version renders first
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const DESKTOP_POINTER_QUERY = "(min-width: 1024px) and (pointer: fine)";
