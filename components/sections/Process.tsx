"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/icons";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { getWhatsAppLink } from "@/lib/utils";

const STEPS = [
  {
    title: "Stuur je aanvraag",
    text: "Vertel wat je wilt laten reinigen en stuur eventueel foto's.",
  },
  {
    title: "Ontvang een voorstel",
    text: "We bekijken de werkzaamheden en geven vooraf duidelijkheid.",
  },
  {
    title: "Wij gaan aan de slag",
    text: "Je voertuig of interieur wordt professioneel gereinigd en gedetailleerd.",
  },
];

export function Process() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ["start 0.8", "end 0.55"] });

  const progress = reduceMotion ? 1 : scrollYProgress;

  return (
    <section id="werkwijze" aria-labelledby="werkwijze-title" className="relative bg-background-2 py-28 lg:py-40">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="werkwijze-title"
            index="03"
            eyebrow="Werkwijze"
            title="Zo werkt het."
            titleLight="Helder vanaf het eerste bericht."
            className="lg:col-span-8"
          />
          <p className="leading-relaxed text-muted lg:col-span-4 lg:pb-3">
            Je weet vooraf wat we doen en wat het kost. Geen verrassingen achteraf.
          </p>
        </div>

        <div ref={stepsRef} className="relative mt-20 lg:mt-28">
          {/* progress line: vertical on mobile, horizontal on desktop */}
          <div aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-px bg-line lg:right-0 lg:bottom-auto lg:h-px lg:w-auto" />
          <motion.div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-0 w-px origin-top bg-accent lg:right-0 lg:bottom-auto lg:h-px lg:w-auto lg:origin-left"
            style={isDesktop ? { scaleX: progress } : { scaleY: progress }}
          />

          <ol className="grid gap-14 pl-8 lg:grid-cols-3 lg:gap-12 lg:pt-10 lg:pl-0">
            {STEPS.map((step, index) => (
              <li key={step.title}>
                <ScrollReveal delay={index * 0.12}>
                  <span className="font-heading-light block text-[4.5rem] text-foreground/20 tabular-nums lg:text-[6.5rem]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-h4 mt-6">{step.title}</h3>
                  <p className="mt-3 max-w-xs leading-relaxed text-muted">{step.text}</p>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-20 border-t border-line pt-10 lg:mt-28">
          <Button href={getWhatsAppLink()} variant="link" icon={<WhatsAppIcon className="size-4 text-[#25D366]" />}>
            Vraag het via WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
