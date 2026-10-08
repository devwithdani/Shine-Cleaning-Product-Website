"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { mainServices, type Service } from "@/data/services";
import { cn } from "@/lib/utils";

export function ServiceDetails() {
  const services = mainServices.filter((service) => service.details);

  return (
    <section id="aanpak" aria-labelledby="aanpak-title" className="relative bg-background-2 py-28 lg:py-40">
      <div className="container-page">
        <SectionHeading
          id="aanpak-title"
          eyebrow="Onze aanpak"
          title="Grondig, stap voor stap."
          description="Professionele apparatuur, de juiste middelen en een vaste werkwijze. Zo weet je precies wat er met je auto gebeurt."
        />

        <div className="mt-20 space-y-32 lg:mt-28 lg:space-y-44">
          {services.map((service, index) => (
            <DetailBlock key={service.id} service={service} reversed={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailBlock({ service, reversed }: { service: Service; reversed: boolean }) {
  const details = service.details!;
  const reduceMotion = useReducedMotion();

  const imageColumnRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);

  // photo opens up from a smaller crop
  const { scrollYProgress: imageProgress } = useScroll({ target: imageColumnRef, offset: ["start end", "start 0.3"] });
  const inset = useTransform(imageProgress, [0, 1], [16, 0]);
  const clipPath = useMotionTemplate`inset(${inset}% ${inset}% ${inset}% ${inset}%)`;
  const imageScale = useTransform(imageProgress, [0, 1], [1.25, 1]);

  // progress line next to the steps
  const { scrollYProgress: stepsProgress } = useScroll({ target: stepsRef, offset: ["start 0.75", "end 0.55"] });

  return (
    <div id={service.id} className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <figure ref={imageColumnRef} className={cn("lg:col-span-6", reversed && "lg:order-2")}>
        <div className="lg:sticky lg:top-[calc(var(--nav-height)+3rem)]">
          <motion.div
            className="relative aspect-[4/3] overflow-hidden rounded-card bg-surface lg:aspect-[4/5]"
            style={reduceMotion ? undefined : { clipPath }}
          >
            <motion.div className="absolute inset-0" style={reduceMotion ? undefined : { scale: imageScale }}>
              <Image
                src={details.image.src}
                alt={details.image.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="grade object-cover"
              />
            </motion.div>
          </motion.div>
          <figcaption className="mt-4 flex justify-between gap-4 text-xs text-muted">
            <span>{service.title}</span>
            <span>{details.image.alt}</span>
          </figcaption>
        </div>
      </figure>

      <div className={cn("lg:col-span-6 lg:py-10", reversed ? "lg:pr-8" : "lg:pl-8")}>
        <p className="text-eyebrow text-muted">{service.category} detailing</p>
        <h3 className="font-heading text-h3 mt-6 text-balance">{details.title}</h3>
        <p className="text-lead mt-6 max-w-xl text-muted">{details.intro}</p>

        <ol ref={stepsRef} className="relative mt-14 pl-8">
          <span aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-px bg-line" />
          <motion.span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-0 w-px origin-top bg-accent"
            style={{ scaleY: reduceMotion ? 1 : stepsProgress }}
          />
          {details.steps.map((step, index) => (
            <li key={step.title} className="border-b border-line py-6 first:pt-0 last:border-b-0">
              <ScrollReveal amount={0.6} className="grid grid-cols-[2.5rem_1fr] gap-x-4">
                <span className="pt-0.5 text-sm text-muted tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h4 className="text-lg font-medium">{step.title}</h4>
                  <p className="mt-2 max-w-lg leading-relaxed text-muted">{step.text}</p>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
