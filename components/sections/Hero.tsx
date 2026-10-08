"use client";

import { useRef, type PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HeroScene } from "@/components/sections/HeroScene";
import { Button } from "@/components/ui/Button";
import { EASE_OUT, INTRO } from "@/lib/animations";
import { QUOTE_HREF, siteConfig } from "@/lib/config";
import { DESKTOP_POINTER_QUERY, useMediaQuery } from "@/lib/hooks/useMediaQuery";

const MOUSE_SPRING = { stiffness: 60, damping: 20, mass: 0.9 };
const LINE_SPEEDS = [-64, -40, -18]; // px each headline line moves up while the hero is pinned

// progress -> opacity: 1 before start, 0 after end
function fadeOut(start: number, end: number) {
  return (progress: number) => Math.min(1, Math.max(0, 1 - (progress - start) / (end - start)));
}

const HEADLINE = [
  { text: "Jouw auto.", className: "font-heading" },
  { text: "Tot in detail", className: "font-heading-light text-foreground/90" },
  { text: "verzorgd", className: "font-heading", accentDot: true },
];

const introFrom = { opacity: 0, y: 16 };
const introTo = { opacity: 1, y: 0 };
const introTransition = (delay: number) => ({ duration: 0.9, delay, ease: EASE_OUT });

export function Hero() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const hasMouse = useMediaQuery(DESKTOP_POINTER_QUERY);
  const mouseEnabled = hasMouse && !reduceMotion;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, MOUSE_SPRING);
  const smoothMouseY = useSpring(mouseY, MOUSE_SPRING);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (!mouseEnabled || event.pointerType !== "mouse") return;
    // -1 (left/top) to 1 (right/bottom)
    mouseX.set((event.clientX / window.innerWidth) * 2 - 1);
    mouseY.set((event.clientY / window.innerHeight) * 2 - 1);
  }

  // 0 at the top of the page, 1 when the next section fully covers the hero
  const { scrollYProgress } = useScroll({ target: runwayRef, offset: ["start start", "end end"] });
  const noMotion = useMotionValue(0);
  const progress = reduceMotion ? noMotion : scrollYProgress;

  const line1Y = useTransform(progress, [0, 1], [0, LINE_SPEEDS[0]]);
  const line2Y = useTransform(progress, [0, 1], [0, LINE_SPEEDS[1]]);
  const line3Y = useTransform(progress, [0, 1], [0, LINE_SPEEDS[2]]);
  const lineYs = [line1Y, line2Y, line3Y];
  // Opacity with a function on purpose: with [in] -> [out] arrays framer-motion uses a native
  // scroll timeline, which measured the sticky hero wrong (text started at ~87% opacity).
  const contentOpacity = useTransform(progress, fadeOut(0, 0.6));

  return (
    // Hero is sticky inside this wrapper (one extra screen high). page.tsx pulls the rest
    // of the page up with -mt-[100svh] so it slides over the hero. Keep those in sync.
    <div id="top" ref={runwayRef} className="relative h-[calc(max(100svh,620px)_+_100svh)]">
      <section
        aria-labelledby="hero-title"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
        }}
        className="sticky top-0 h-[100svh] min-h-[620px] overflow-hidden"
      >
        <HeroScene mouseX={smoothMouseX} mouseY={smoothMouseY} progress={progress} />

        <motion.div
          style={{ opacity: contentOpacity }}
          className="container-page relative z-10 flex h-full flex-col justify-end pt-28 pb-[calc(2.5rem+5svh)] lg:pb-[clamp(4rem,14svh,9rem)]"
        >
          <div className="max-w-[46rem]">
            <motion.p
              className="text-eyebrow mb-6 flex items-center gap-4 text-foreground/75"
              initial={introFrom}
              animate={introTo}
              transition={introTransition(INTRO.eyebrow)}
            >
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              <span>
                Auto detailing
                <span className="hidden sm:inline"> · {siteConfig.city || "Interieur & exterieur"}</span>
              </span>
            </motion.p>

            <h1 id="hero-title" aria-label="Jouw auto. Tot in detail verzorgd." className="text-display">
              {HEADLINE.map((line, index) => (
                <motion.span key={line.text} aria-hidden="true" style={{ y: lineYs[index] }} className="block">
                  <motion.span
                    className={`block ${line.className}`}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, delay: INTRO.headline + index * INTRO.headlineStagger, ease: EASE_OUT }}
                  >
                    {line.text}
                    {line.accentDot && <span className="text-accent">.</span>}
                  </motion.span>
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="text-lead mt-8 max-w-[33rem] text-foreground/78 lg:mt-10"
              initial={introFrom}
              animate={introTo}
              transition={introTransition(INTRO.text)}
            >
              Professionele auto detailing voor interieur en exterieur. Van dieptereiniging van stoffen bekleding tot
              een complete full detail.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10"
              initial={introFrom}
              animate={introTo}
              transition={introTransition(INTRO.buttons)}
            >
              <Button href={QUOTE_HREF} icon={<ArrowRight className="size-4" strokeWidth={2.5} />} className="w-full sm:w-auto">
                Vraag een offerte aan
              </Button>
              <Button href="#diensten" variant="link">
                Ontdek onze diensten
              </Button>
            </motion.div>
          </div>
        </motion.div>

      </section>
    </div>
  );
}
