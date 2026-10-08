import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/icons";
import { textileServices } from "@/data/services";
import { getWhatsAppLink } from "@/lib/utils";

// No photos here yet, add them once there are own photos of furniture.
export function TextileCleaning() {
  return (
    <section id="textiel" aria-labelledby="textiel-title" className="relative border-y border-line bg-background-2 py-24 lg:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="textiel-title"
            eyebrow="Interieur & textielreiniging"
            title="Niet alleen voor auto's."
            description="Onze professionele dieptereinigingsapparatuur is ook geschikt voor stoffen meubels en andere bekleding."
          />
        </div>

        <div className="lg:col-span-7 lg:pt-16">
          <ul className="grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
            {textileServices.map((service, index) => (
              <li key={service.title} className="border-b border-line">
                <ScrollReveal delay={index * 0.05} className="py-6">
                  <h3 className="font-medium">{service.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{service.description}</p>
                </ScrollReveal>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Button
              href={getWhatsAppLink("Hallo, ik wil graag informatie over het reinigen van meubels/textiel.")}
              variant="link"
              icon={<WhatsAppIcon className="size-4 text-[#25D366]" />}
            >
              Stuur een foto via WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
