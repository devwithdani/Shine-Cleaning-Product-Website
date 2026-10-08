"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion, useTransform, type MotionValue } from "framer-motion";

// Background video of the hero, with gradients only where the text is.

const HERO_VIDEO = "/videos/hero-detailing.mp4";
const HERO_VIDEO_MOBILE = "/videos/hero-detailing-mobile.mp4";
const HERO_POSTER = "/images/hero/hero-poster.jpg";

const VIDEO_FADE_IN = 1.4;
const MOUSE_DEPTH = 12;
const BASE_SCALE = 1.05; // slightly bigger than the screen so the edges never show
const SCROLL_SCALE = 1.15;

type HeroSceneProps = {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  progress: MotionValue<number>;
};

export function HeroScene({ mouseX, mouseY, progress }: HeroSceneProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoInView = useInView(videoRef);
  const reduceMotion = useReducedMotion();

  // no autoPlay attribute: this way reduced motion and data saver are respected
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduceMotion || connection?.saveData || !videoInView) {
      video.pause();
      return;
    }
    // muted has to be set here as well, otherwise iOS won't autoplay
    video.muted = true;
    video.play().catch(() => {
      // autoplay blocked (low power mode): the poster stays visible
    });
  }, [reduceMotion, videoInView]);

  // mouse -1..1 -> small offset in the opposite direction
  const videoX = useTransform(mouseX, (v) => v * -MOUSE_DEPTH);
  const videoY = useTransform(mouseY, (v) => v * -MOUSE_DEPTH);

  const videoScale = useTransform(progress, [0, 1], [BASE_SCALE, BASE_SCALE * SCROLL_SCALE]);
  // function instead of arrays, see the comment in Hero.tsx
  const darkness = useTransform(progress, (p) => Math.min(p / 0.9, 1) * 0.8);

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-background">
      <motion.div
        className="absolute inset-0"
        style={{ x: videoX, y: videoY, scale: videoScale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: VIDEO_FADE_IN, ease: "easeOut" }}
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_POSTER}
          className="grade-video absolute inset-0 size-full object-cover object-[74%_50%] md:object-[66%_50%] lg:object-[60%_50%]"
        >
          <source src={HERO_VIDEO_MOBILE} type="video/mp4" media="(max-width: 767px)" />
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      </motion.div>

      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgb(8_10_12/0.65),rgb(8_10_12/0))]" />

      {/* shade behind the text (desktop) */}
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgb(8_10_12/0.86)_0%,rgb(8_10_12/0.66)_26%,rgb(8_10_12/0.28)_46%,rgb(8_10_12/0)_64%)] lg:block" />

      {/* fade to the next section, taller on mobile where the text is at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[72%] bg-[linear-gradient(0deg,var(--background)_0%,rgb(8_10_12/0.86)_26%,rgb(8_10_12/0.45)_52%,rgb(8_10_12/0)_100%)] lg:h-[45%] lg:bg-[linear-gradient(0deg,var(--background)_0%,rgb(8_10_12/0.6)_30%,rgb(8_10_12/0)_100%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(130%_100%_at_65%_45%,rgb(8_10_12/0)_55%,rgb(8_10_12/0.4)_100%)]" />

      <motion.div className="absolute inset-0 bg-background" style={{ opacity: darkness }} />
    </div>
  );
}
