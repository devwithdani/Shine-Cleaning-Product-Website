import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { addOns } from "@/data/services";

export function AddOns() {
  return (
    <section aria-labelledby="extras-title" className="relative py-28 lg:py-40">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--nav-height)+3rem)] lg:col-span-5 lg:self-start">
          <SectionHeading
            id="extras-title"
            eyebrow="Aanvullend"
            title="Maak het compleet."
            description="Extra's die je kunt combineren met elke behandeling. De prijs hangt af van de staat van je auto; dat bespreken we vooraf."
          />
        </div>

        <ol className="border-t border-line lg:col-span-7">
          {addOns.map((addOn, index) => (
            <li key={addOn.title} className="group border-b border-line">
              <ScrollReveal delay={index * 0.04} className="grid gap-2 py-7 sm:grid-cols-[3rem_14rem_1fr] sm:gap-6">
                <span className="text-sm text-muted tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-medium transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
                  {addOn.title}
                </h3>
                <p className="leading-relaxed text-muted">{addOn.description}</p>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
