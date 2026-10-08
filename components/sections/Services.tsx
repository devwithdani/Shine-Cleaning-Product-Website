"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICE_CARD_HEADER_HEIGHT, ServiceCard } from "@/components/ui/ServiceCard";
import { mainServices, type Service } from "@/data/services";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

// Desktop: sticky cards that stack on top of each other, each one leaving its header visible.
// Mobile: a normal list.
const STICKY_TOP = 104; // px from the top of the screen, just below the navbar
const SCALE_STEP = 0.04; // each card further back is 4% smaller
const TILT_STEP = 3; // degrees each card further back tilts away (subtle depth)
const DIM_STEP = 0.5; // and this much darker

export function Services() {
  const stackRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  return (
    <section id="diensten" aria-labelledby="diensten-title" className="relative border-t border-line py-28 lg:py-40">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="diensten-title"
            index="01"
            eyebrow="Diensten"
            title="Onze detailing services."
            titleLight="Eén standaard: grondig."
            description="Drie behandelingen voor je auto. Kies wat je auto nodig heeft, of vraag ons om advies."
          />
          <p className="max-w-[15rem] border-l border-line pl-5 text-sm leading-relaxed text-muted lg:mb-2">
            Prijs op aanvraag. Die hangt af van het formaat en de staat van je auto.
          </p>
        </div>

        <div ref={stackRef} className="mt-14 flex flex-col gap-6 lg:mt-20 lg:gap-0">
          {mainServices.map((service, index) => (
            <StackedCard
              key={service.id}
              service={service}
              index={index}
              total={mainServices.length}
              progress={scrollYProgress}
              isDesktop={isDesktop}
              animate={isDesktop && !reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type StackedCardProps = {
  service: Service;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isDesktop: boolean;
  animate: boolean;
};

function StackedCard({ service, index, total, progress, isDesktop, animate }: StackedCardProps) {
  const cardsInFront = total - 1 - index; // the last card has 0 cards in front of it

  // shrinks and tilts back once the next card starts covering it
  const scale = useTransform(progress, [index / total, 1], [1, 1 - cardsInFront * SCALE_STEP]);
  const rotateX = useTransform(progress, [index / total, 1], [0, cardsInFront * TILT_STEP]);
  // function instead of arrays, see the comment in Hero.tsx
  const start = index / total;
  const dim = useTransform(progress, (p) => Math.max(0, (p - start) / (1 - start)) * cardsInFront * DIM_STEP);

  const stickyTop = STICKY_TOP + index * SERVICE_CARD_HEADER_HEIGHT;
  // same height for every card so the last one still fits below the stacked headers
  const stackedHeight = `min(620px, calc(100svh - ${STICKY_TOP + (total - 1) * SERVICE_CARD_HEADER_HEIGHT + 32}px))`;
  const isLast = index === total - 1;

  return (
    <div
      className="lg:sticky"
      style={isDesktop ? { top: stickyTop, marginBottom: isLast ? 0 : "14vh" } : undefined}
    >
      <motion.div
        className="relative origin-top"
        style={
          isDesktop
            ? { height: stackedHeight, minHeight: 470, ...(animate ? { scale, rotateX, transformPerspective: 1400 } : {}) }
            : undefined
        }
      >
        <ServiceCard service={service} />
        {animate && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-card bg-background"
            style={{ opacity: dim }}
          />
        )}
      </motion.div>
    </div>
  );
}
