import { ArrowUpRight } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/config";
import { getPhoneLink, getWhatsAppLink } from "@/lib/utils";

export function Quote() {
  const contactRows = [
    { label: "WhatsApp", value: "Stuur een bericht of foto's", href: getWhatsAppLink(), external: true },
    ...(siteConfig.phone ? [{ label: "Telefoon", value: siteConfig.phone, href: getPhoneLink(siteConfig.phone), external: false }] : []),
    ...(siteConfig.email ? [{ label: "E-mail", value: siteConfig.email, href: `mailto:${siteConfig.email}`, external: false }] : []),
  ];

  return (
    <section id="contact" aria-labelledby="offerte-title" className="relative border-t border-line bg-background-2 py-28 lg:py-40">
      <div className="container-page grid gap-16 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--nav-height)+3rem)] lg:col-span-5 lg:self-start">
          <SectionHeading
            id="offerte-title"
            index="05"
            eyebrow="Contact"
            title="Vraag een offerte aan."
            titleLight="Vrijblijvend."
            description="Vertel wat je wilt laten reinigen. Met een paar foto's kunnen we je het snelst een passend voorstel doen."
          />

          <ul className="mt-12 border-t border-line">
            {contactRows.map((row) => (
              <li key={row.label} className="border-b border-line">
                <a
                  href={row.href}
                  {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-6 py-5"
                >
                  <span className="w-24 text-xs text-muted">{row.label}</span>
                  <span className="flex flex-1 items-center gap-2.5">
                    {row.label === "WhatsApp" && <WhatsAppIcon className="size-4 text-[#25D366]" />}
                    {row.value}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                  />
                </a>
              </li>
            ))}
            {siteConfig.serviceArea && (
              <li className="flex gap-6 border-b border-line py-5">
                <span className="w-24 text-xs text-muted">Werkgebied</span>
                <span>{siteConfig.serviceArea}</span>
              </li>
            )}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
