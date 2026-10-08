"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

const START_POSITION = 50;
const KEYBOARD_STEP = 5;
const LABEL_FADE_ZONE = 22; // % from the edge where the labels start fading

type Photo = { src: string; alt: string };

type BeforeAfterSliderProps = {
  before: Photo;
  after: Photo;
};

// position = handle position in % from the left. The before photo is clipped at that point.
export function BeforeAfterSlider({ before, after }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(START_POSITION);
  const [dragging, setDragging] = useState(false);

  function moveTo(clientX: number) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, percent)));
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    // on touch only move while dragging, otherwise scrolling the page would move the handle
    if (event.pointerType !== "touch") moveTo(event.clientX);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (dragging) moveTo(event.clientX);
  }

  function stopDragging() {
    setDragging(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const keyMoves: Record<string, number> = {
      ArrowLeft: position - KEYBOARD_STEP,
      ArrowDown: position - KEYBOARD_STEP,
      ArrowRight: position + KEYBOARD_STEP,
      ArrowUp: position + KEYBOARD_STEP,
      Home: 0,
      End: 100,
    };
    if (!(event.key in keyMoves)) return;
    event.preventDefault();
    setPosition(Math.min(100, Math.max(0, keyMoves[event.key])));
  }

  const beforeVisibility = Math.min(1, position / LABEL_FADE_ZONE);
  const afterVisibility = Math.min(1, (100 - position) / LABEL_FADE_ZONE);

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      // touch-pan-y: vertical swipes still scroll the page
      className="relative aspect-[3/4] cursor-ew-resize touch-pan-y overflow-hidden rounded-card bg-surface select-none"
    >
      <div className={cn("absolute inset-0 transition-transform duration-700", dragging && "scale-[1.02]")}>
        <Image src={after.src} alt={after.alt} fill draggable={false} sizes="(min-width: 1024px) 560px, 100vw" className="grade object-cover" />
      </div>
      <div
        className={cn("absolute inset-0 transition-transform duration-700", dragging && "scale-[1.02]")}
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image src={before.src} alt={before.alt} fill draggable={false} sizes="(min-width: 1024px) 560px, 100vw" className="grade object-cover" />
      </div>

      <span
        aria-hidden="true"
        className="text-eyebrow glass pointer-events-none absolute top-4 left-4 px-3 py-2 text-[0.62rem] sm:top-5 sm:left-5"
        style={{ opacity: beforeVisibility, transform: `translateX(${(beforeVisibility - 1) * 12}px)` }}
      >
        Voor
      </span>
      <span
        aria-hidden="true"
        className="text-eyebrow glass pointer-events-none absolute top-4 right-4 px-3 py-2 text-[0.62rem] sm:top-5 sm:right-5"
        style={{ opacity: afterVisibility, transform: `translateX(${(1 - afterVisibility) * 12}px)` }}
      >
        Na
      </span>

      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${position}%` }}>
        <div className="absolute inset-y-0 w-px -translate-x-1/2 bg-foreground shadow-[0_0_10px_rgb(0_0_0/0.5)]" />
        <div
          role="slider"
          tabIndex={0}
          aria-label="Schuif om voor en na te vergelijken"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)}% voor-foto zichtbaar`}
          onKeyDown={handleKeyDown}
          className={cn(
            "pointer-events-auto absolute top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-tile bg-foreground text-background shadow-[0_10px_30px_rgb(0_0_0/0.45)] transition-transform duration-300",
            dragging ? "scale-110" : "hover:scale-105",
          )}
        >
          <ChevronsLeftRight aria-hidden="true" className="size-5" />
        </div>
      </div>
    </div>
  );
}
