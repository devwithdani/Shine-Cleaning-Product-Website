"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { QUOTE_HREF } from "@/lib/config";
import { getWhatsAppLink } from "@/lib/utils";

const START_SCALE = 0.92;
const START_TILT = 8;
const IMAGE_ZOOM = 1.25;

export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "center center"] });

  const contentScale = useTransform(scrollYProgress, [0, 1], [START_SCALE, 1]);
  const contentTilt = useTransform(scrollYProgress, [0, 1], [START_TILT, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.7], [0, 1]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [IMAGE_ZOOM, 1.02]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="cta-title"
      className="relative flex min-h-[92svh] items-end overflow-hidden py-24 lg:items-center lg:py-40"
    >
      <motion.div className="absolute inset-0" style={reduceMotion ? undefined : { scale: imageScale }}>
        <Image
          src="/images/cta/golf-r.jpg"
          alt=""
          fill
          sizes="100vw"
          className="grade object-cover object-[60%_55%]"
        />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10 lg:bg-gradient-to-r lg:from-background lg:via-background/75 lg:to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />

      <div className="container-page relative [perspective:1200px]">
        <motion.div
          className="max-w-2xl origin-left"
          style={reduceMotion ? undefined : { scale: contentScale, rotateY: contentTilt, opacity: contentOpacity }}
        >
          <h2 id="cta-title" className="text-h1 text-balance">
            <span className="font-heading-light block text-foreground/85">Klaar om je auto weer</span>
            <span className="font-heading block">
              écht schoon te krijgen<span className="text-accent">?</span>
            </span>
          </h2>
          <p className="text-lead mt-8 max-w-lg text-foreground/75">
            Stuur ons een paar foto&apos;s en vertel wat je wilt laten doen. We laten je weten welke behandeling het beste
            past.
          </p>
          <div className="mt-11 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
            <Button href={QUOTE_HREF} icon={<ArrowRight className="size-4" strokeWidth={2.5} />}>
              Vraag een offerte aan
            </Button>
            <Button
              href={getWhatsAppLink("Hallo, ik stuur een paar foto's van mijn auto. Wat zouden jullie adviseren?")}
              variant="link"
              icon={<WhatsAppIcon className="size-4 text-[#25D366]" />}
            >
              Stuur foto&apos;s via WhatsApp
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
