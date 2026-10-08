"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { beforeAfterItems } from "@/data/gallery";
import { cn } from "@/lib/utils";

const START_SCALE = 0.9;
const START_TILT = 14;

export function BeforeAfter() {
  const [activeId, setActiveId] = useState(beforeAfterItems[0].id);
  const active = beforeAfterItems.find((item) => item.id === activeId) ?? beforeAfterItems[0];

  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start end", "start 0.25"] });
  const scale = useTransform(scrollYProgress, [0, 1], [START_SCALE, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [START_TILT, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 1]);

  return (
    <section id="resultaten" aria-labelledby="voor-na-title" className="relative py-28 lg:py-40">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1fr_auto] lg:gap-24">
        <div>
          <SectionHeading
            id="voor-na-title"
            index="02"
            eyebrow="Resultaten"
            title="Zie het verschil."
            description="Echte resultaten uit onze werkplaats. Sleep de schuif en zie wat een grondige behandeling doet."
          />

          {beforeAfterItems.length > 1 && (
            <div role="group" aria-label="Kies een voorbeeld" className="mt-12 flex gap-8 border-b border-line">
              {beforeAfterItems.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveId(item.id)}
                    className={cn(
                      "relative -mb-px pb-4 text-sm transition-colors duration-300",
                      isActive ? "text-foreground" : "text-muted hover:text-foreground",
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span layoutId="ba-tab" aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-foreground" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-7">
            <p className="font-medium">{active.title}</p>
            <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">{active.description}</p>
          </div>
        </div>

        {/* limit the width so the 3:4 slider fits on the screen */}
        <div
          ref={wrapperRef}
          className="mx-auto w-full max-w-[520px] [perspective:1600px] lg:w-[min(560px,calc((100svh_-_150px)*0.75))] lg:max-w-none"
        >
          <motion.div
            className="origin-bottom shadow-[0_50px_120px_-40px_rgb(0_0_0/0.9)]"
            style={reduceMotion ? undefined : { scale, rotateX, opacity }}
          >
            {/* key resets the handle when switching tabs */}
            <BeforeAfterSlider key={active.id} before={active.before} after={active.after} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
