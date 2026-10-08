"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { detailingExplainedImages } from "@/data/gallery";

const COMPARISON = [
  { carWash: "Borstels en haast", detailing: "Handwerk, paneel voor paneel" },
  { carWash: "Alleen wat zichtbaar is", detailing: "Ook naden, kieren en hoeken" },
  { carWash: "Vuil blijft in de stof", detailing: "Vuil wordt uit de stof gezogen" },
];
const FOCUS_AREAS = ["Naden", "Bekleding", "Tapijt", "Dashboard", "Vlekken", "Dierenhaar", "Geuren", "Moeilijk bereikbare plekken"];

// The clean photo is revealed over the dirty one while scrolling.
export function DetailingExplained() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start 0.9", "center 0.45"] });

  const hiddenBottom = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clipPath = useMotionTemplate`inset(0 0 ${hiddenBottom}% 0)`;
  const lineTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.05, 0.92, 1], [0, 1, 1, 0]);

  const { before, after } = detailingExplainedImages;

  return (
    <section id="verschil" aria-labelledby="verschil-title" className="relative py-28 lg:py-44">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="verschil-title"
            index="00"
            eyebrow="Meer dan een wasbeurt"
            title="Een wasstraat maakt schoon."
            titleLight="Wij gaan verder."
            className="lg:col-span-8"
          />
          <ScrollReveal className="lg:col-span-4 lg:pb-3">
            <p className="text-lead text-muted">
              Een wasstraat pakt wat je direct ziet. Wij behandelen juist de plekken die normaal worden overgeslagen:
              met de hand, met de juiste middelen en met apparatuur die vuil uit de stof haalt.
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          <div
            ref={imageRef}
            className="relative aspect-[3/4] w-full overflow-hidden rounded-card bg-surface sm:mx-auto sm:max-w-[520px] lg:col-span-5 lg:max-w-none"
          >
            <Image src={before.src} alt={before.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="grade object-cover" />
            <span className="text-eyebrow glass absolute bottom-4 left-4 px-3 py-2 text-[0.62rem]">Voor</span>

            <motion.div className="absolute inset-0" style={{ clipPath }}>
              <Image src={after.src} alt={after.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="grade object-cover" />
              <span className="text-eyebrow glass absolute top-4 left-4 px-3 py-2 text-[0.62rem]">Na</span>
            </motion.div>

            <motion.div
              aria-hidden="true"
              className="absolute inset-x-0 h-px -translate-y-1/2 bg-foreground shadow-[0_0_12px_rgb(241_243_244/0.6)]"
              style={{ top: lineTop, opacity: lineOpacity }}
            />
          </div>

          <div className="flex flex-col justify-center lg:col-span-7 lg:pl-8">
            <ScrollReveal>
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="text-eyebrow">
                    <th scope="col" className="w-1/2 pb-5 font-medium text-muted">Wasstraat</th>
                    <th scope="col" className="w-1/2 pb-5 font-medium text-foreground">
                      <span className="flex items-center gap-3">
                        <span aria-hidden="true" className="size-1.5 bg-accent" />
                        RMD detailing
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.carWash} className="border-t border-line align-top">
                      <td className="py-5 pr-6 text-muted line-through decoration-foreground/25 sm:text-lg">{row.carWash}</td>
                      <td className="py-5 text-foreground sm:text-lg">{row.detailing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollReveal>

            <ScrollReveal className="mt-14 border-t border-line pt-6" delay={0.1}>
              <p className="text-eyebrow text-muted">Waar wij op letten</p>
              <p className="mt-4 text-lg leading-relaxed text-foreground/85 sm:text-xl">
                {FOCUS_AREAS.map((area, index) => (
                  <span key={area}>
                    {area}
                    {index < FOCUS_AREAS.length - 1 && <span className="px-2.5 text-foreground/25">/</span>}{" "}
                  </span>
                ))}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
