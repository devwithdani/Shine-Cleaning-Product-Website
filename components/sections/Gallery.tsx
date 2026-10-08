"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ParallaxLayer } from "@/components/effects/ParallaxLayer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryItems, type GalleryItem, type GalleryLayout } from "@/data/gallery";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const START_SCALE = 0.95;
const TILE_SPEEDS = [0.12, -0.1, 0.2, -0.04, 0.08, -0.14]; // per tile, see ParallaxLayer

const LAYOUT_CLASSES: Record<GalleryLayout, string> = {
  large: "lg:col-span-6 lg:row-span-2",
  tall: "lg:col-span-3 lg:row-span-2",
  wide: "lg:col-span-6",
  small: "lg:col-span-3",
};

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ["start end", "start 0.3"] });
  const scale = useTransform(scrollYProgress, [0, 1], [START_SCALE, 1]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openIndex !== null && !dialog.open) dialog.showModal();
    if (openIndex === null && dialog.open) dialog.close();
  }, [openIndex]);

  function showNext(step: number) {
    if (openIndex === null) return;
    // wraps around at the end
    setOpenIndex((openIndex + step + galleryItems.length) % galleryItems.length);
  }

  const openItem = openIndex !== null ? galleryItems[openIndex] : null;

  return (
    <section id="galerij" aria-labelledby="galerij-title" className="relative overflow-x-clip pb-28 lg:pb-40">
      <div className="container-page">
        <div className="flex flex-col gap-6 border-t border-line pt-20 lg:flex-row lg:items-end lg:justify-between lg:pt-28">
          <SectionHeading
            id="galerij-title"
            eyebrow="Uit de werkplaats"
            title="Elke auto."
            titleLight="Dezelfde aandacht."
          />
          <p className="max-w-xs text-sm leading-relaxed text-muted lg:mb-2">
            Een selectie van ons werk, van de lak tot de naden van de stoelen.
            <span className="lg:hidden"> Swipe voor meer.</span>
          </p>
        </div>

        <motion.div ref={gridRef} className="mt-14 lg:mt-20" style={isDesktop && !reduceMotion ? { scale } : undefined}>
          <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-10 sm:px-10 lg:mx-0 lg:grid lg:auto-rows-[300px] lg:grid-flow-dense lg:grid-cols-12 lg:gap-x-6 lg:gap-y-10 lg:overflow-visible lg:px-0 lg:pb-0 xl:auto-rows-[360px]">
            {galleryItems.map((item, index) => (
              <li
                key={item.src}
                className={cn("w-[80%] shrink-0 snap-start sm:w-[46%] lg:w-auto", LAYOUT_CLASSES[item.layout])}
              >
                {/* no parallax in the mobile swipe row */}
                <ParallaxLayer speed={isDesktop ? TILE_SPEEDS[index % TILE_SPEEDS.length] : 0} className="h-full">
                  <GalleryTile item={item} number={index + 1} onOpen={() => setOpenIndex(index)} />
                </ParallaxLayer>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpenIndex(null)}
        // click on the backdrop closes it
        onClick={(event) => event.target === event.currentTarget && setOpenIndex(null)}
        aria-label={openItem ? openItem.title : "Foto"}
        className="m-auto w-[min(1200px,94vw)] bg-transparent p-0 text-foreground backdrop:bg-background/95"
      >
        {openItem && (
          <figure>
            <div className="relative h-[74vh] w-full">
              <Image src={openItem.src} alt={openItem.alt} fill sizes="94vw" className="object-contain" />
            </div>
            <figcaption className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-5">
              <div>
                <p className="text-xs text-muted">{openItem.category}</p>
                <p className="mt-1 font-medium">{openItem.title}</p>
              </div>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => showNext(-1)} aria-label="Vorige foto" className="flex size-11 items-center justify-center rounded-tile text-muted transition-colors hover:bg-foreground/5 hover:text-foreground">
                  <ChevronLeft className="size-5" />
                </button>
                <button type="button" onClick={() => showNext(1)} aria-label="Volgende foto" className="flex size-11 items-center justify-center rounded-tile text-muted transition-colors hover:bg-foreground/5 hover:text-foreground">
                  <ChevronRight className="size-5" />
                </button>
                <button type="button" onClick={() => setOpenIndex(null)} aria-label="Sluiten" className="ml-3 flex size-11 items-center justify-center rounded-tile bg-foreground text-background">
                  <X className="size-5" />
                </button>
              </div>
            </figcaption>
          </figure>
        )}
      </dialog>
    </section>
  );
}

function GalleryTile({ item, number, onOpen }: { item: GalleryItem; number: number; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Bekijk foto: ${item.title}`}
      className="group flex h-full w-full flex-col text-left"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-surface lg:aspect-auto lg:min-h-0 lg:flex-1">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 80vw"
          className="grade object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
          style={{ objectPosition: item.position }}
        />
      </div>
      <div className="flex items-baseline gap-4 pt-3.5 text-sm">
        <span className="text-xs text-muted tabular-nums">{String(number).padStart(2, "0")}</span>
        <span className="text-foreground/90 transition-colors group-hover:text-foreground">{item.title}</span>
        <span className="ml-auto text-xs text-muted">{item.category}</span>
      </div>
    </button>
  );
}
