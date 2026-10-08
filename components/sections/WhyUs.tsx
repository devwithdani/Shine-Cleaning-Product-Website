import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { siteConfig } from "@/lib/config";

// TODO: write our own story here
const STORY = [
  "Een auto is meer dan vervoer. Het is iets waar je elke dag in zit, waar je zuinig op bent, of waar je gewoon trots op wilt kunnen zijn.",
  "Daarom werken we niet volgens de klok, maar volgens het resultaat. We nemen de tijd, gebruiken professionele apparatuur en kijken naar de plekken die anderen overslaan.",
];

const PRINCIPLES = [
  {
    title: "Tijd voor elke auto",
    text: "Geen lopende band. We plannen ruim, zodat niets wordt overgeslagen.",
  },
  {
    title: "Eerlijk advies",
    text: "We adviseren wat jouw auto echt nodig heeft. Ook als dat minder is dan je dacht.",
  },
  {
    title: "Eén aanspreekpunt",
    text: "Je spreekt direct met degene die aan je auto werkt.",
  },
  {
    title: "Het juiste materiaal",
    text: "Middelen die passen bij elk oppervlak en apparatuur voor echte dieptereiniging.",
  },
];

export function WhyUs() {
  return (
    <section id="over-ons" aria-labelledby="over-ons-title" className="relative py-28 lg:py-44">
      <div className="container-page">
        <ScrollReveal>
          <p className="text-eyebrow mb-8 flex items-center gap-4 text-muted">
            <span className="text-foreground tabular-nums">04</span>
            <span aria-hidden="true" className="h-px w-10 bg-line-strong" />
            Over {siteConfig.name}
          </p>
          <h2 id="over-ons-title" className="text-h1 max-w-5xl text-balance">
            <span className="font-heading-light text-foreground/80">Detailing is voor ons geen wasbeurt, maar </span>
            <span className="font-heading">vakwerk</span>
            <span className="font-heading-light text-foreground/80">. Met tijd, aandacht en oog voor elk </span>
            <span className="font-heading">detail</span>
            <span className="font-heading text-accent">.</span>
          </h2>
        </ScrollReveal>

        <div className="mt-20 grid gap-14 border-t border-line pt-14 lg:mt-28 lg:grid-cols-12 lg:gap-16">
          <ScrollReveal className="space-y-6 text-lg leading-relaxed text-foreground/80 lg:col-span-5">
            {STORY.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </ScrollReveal>

          <ol className="grid sm:grid-cols-2 sm:gap-x-10 lg:col-span-6 lg:col-start-7">
            {PRINCIPLES.map((principle, index) => (
              <li key={principle.title} className="border-b border-line py-6 first:pt-0 sm:[&:nth-child(2)]:pt-0">
                <ScrollReveal delay={index * 0.06}>
                  <span className="text-xs text-muted tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-lg font-medium">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{principle.text}</p>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
