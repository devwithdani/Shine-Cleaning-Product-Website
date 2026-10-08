import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Service } from "@/data/services";

// The header stays visible when the next card covers this one (sticky stack in Services.tsx)
export const SERVICE_CARD_HEADER_HEIGHT = 72;

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-background-2">
      <header
        className="flex shrink-0 items-center justify-between gap-4 border-b border-line px-5 sm:px-8"
        style={{ height: SERVICE_CARD_HEADER_HEIGHT }}
      >
        <div className="flex min-w-0 items-baseline gap-4 sm:gap-6">
          <span className="text-sm text-muted tabular-nums">{service.number}</span>
          <h3 className="font-heading truncate text-xl sm:text-2xl">{service.title}</h3>
          <span className="hidden text-sm text-muted md:inline">{service.category}</span>
        </div>
        {service.badge && (
          <span className="text-eyebrow flex shrink-0 items-center gap-2.5 text-[0.62rem] text-foreground">
            <span aria-hidden="true" className="size-1.5 bg-accent" />
            <span className="hidden sm:inline">{service.badge}</span>
          </span>
        )}
      </header>

      <div className="grid min-h-0 flex-1 lg:grid-cols-[1.35fr_1fr]">
        <div className="relative aspect-[16/11] overflow-hidden bg-surface lg:aspect-auto">
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="grade object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-col p-6 sm:p-8 lg:p-11">
          <p className="font-heading text-h4 text-balance">{service.tagline}</p>
          <p className="mt-5 max-w-md leading-relaxed text-muted">{service.description}</p>

          <ul className="mt-8 grid border-t border-line text-sm sm:grid-cols-2 sm:gap-x-8">
            {service.features.map((feature) => (
              <li key={feature} className="border-b border-line py-2.5 text-foreground/85">
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-9 lg:mt-auto lg:pt-8">
            <Button
              href={service.cta.href}
              size="md"
              variant="link"
              icon={<ArrowRight className="size-4" />}
            >
              {service.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
