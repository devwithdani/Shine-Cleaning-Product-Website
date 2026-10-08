"use client";

import { Fragment, type ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/animations";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index?: string; // "01", "02"...
  eyebrow?: string;
  title: string;
  titleLight?: string; // second line in the light weight
  description?: ReactNode;
  id?: string;
  className?: string;
};

const WORD_STAGGER = 0.045;
const WORD_DURATION = 1;

function Words({ text, className }: { text: string; className: string }) {
  const words = text.split(" ");
  return (
    <span className={cn("block", className)}>
      {words.map((word, index) => (
        <Fragment key={index}>
          {/* padding so the g and j don't get cut off */}
          <span aria-hidden="true" className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%" },
                visible: { y: "0%", transition: { duration: WORD_DURATION, ease: EASE_OUT } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  titleLight,
  description,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-4xl", className)}>
      {eyebrow && (
        <motion.p
          className="text-eyebrow mb-8 flex items-center gap-4 text-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.9 }}
        >
          {index && <span className="text-foreground tabular-nums">{index}</span>}
          <span aria-hidden="true" className="h-px w-10 bg-line-strong" />
          {eyebrow}
        </motion.p>
      )}

      {/* each word slides up out of its own mask, one after the other */}
      <motion.h2
        id={id}
        aria-label={titleLight ? `${title} ${titleLight}` : title}
        className="text-h2 text-balance"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{ visible: { transition: { staggerChildren: WORD_STAGGER } } }}
      >
        <Words text={title} className="font-heading" />
        {titleLight && <Words text={titleLight} className="font-heading-light text-foreground/80" />}
      </motion.h2>

      {description && (
        <motion.p
          className="text-lead mt-7 max-w-xl text-muted"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
