"use client";

import { useEffect, useState } from "react";

// Id of the section that's in the middle of the screen (null on the hero).
// The rootMargin turns the viewport into a thin band, so only one section is active at a time.
export function useActiveSection(sectionIds: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const idsKey = sectionIds.join(",");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            setActiveId(id);
          } else {
            setActiveId((current) => (current === id ? null : current));
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    for (const id of idsKey.split(",")) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [idsKey]);

  return activeId;
}
