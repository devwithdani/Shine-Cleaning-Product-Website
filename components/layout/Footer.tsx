import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { mainServices } from "@/data/services";
import { navigation, siteConfig } from "@/lib/config";
import { getPhoneLink, getWhatsAppLink } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();
  const { social } = siteConfig;

  return (
    <footer className="relative border-t border-line bg-background">

      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:py-20">
        <div>
          <Logo variant="full" className="w-[210px]" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
            Professionele auto detailing en dieptereiniging van interieur en textiel.
          </p>
          {(social.instagram || social.facebook) && (
            <div className="mt-6 flex gap-3">
              {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex size-10 items-center justify-center rounded-tile border border-line text-muted transition-colors hover:border-foreground hover:text-foreground">
                  <InstagramIcon className="size-4" />
                </a>
              )}
              {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex size-10 items-center justify-center rounded-tile border border-line text-muted transition-colors hover:border-foreground hover:text-foreground">
                  <FacebookIcon className="size-4" />
                </a>
              )}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-eyebrow text-muted">Diensten</h3>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            {mainServices.map((service) => (
              <li key={service.id}>
                <a href={service.details ? `#${service.id}` : "#diensten"} className="transition-colors hover:text-foreground">
                  {service.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#textiel" className="transition-colors hover:text-foreground">
                Interieur & Textielreiniging
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-eyebrow text-muted">Navigatie</h3>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            {navigation.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-eyebrow text-muted">Contact</h3>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            <li>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-foreground">
                <WhatsAppIcon className="size-4 text-[#25D366]" /> WhatsApp
              </a>
            </li>
            {siteConfig.phone && (
              <li>
                <a href={getPhoneLink(siteConfig.phone)} className="flex items-center gap-3 transition-colors hover:text-foreground">
                  <Phone className="size-4" /> {siteConfig.phone}
                </a>
              </li>
            )}
            {siteConfig.email && (
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 transition-colors hover:text-foreground">
                  <Mail className="size-4" /> {siteConfig.email}
                </a>
              </li>
            )}
            {siteConfig.serviceArea && (
              <li className="flex items-center gap-3">
                <MapPin className="size-4" /> {siteConfig.serviceArea}
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}
            {siteConfig.kvk && <> · KvK {siteConfig.kvk}</>}
          </p>
          {siteConfig.privacyPolicyUrl && (
            <a href={siteConfig.privacyPolicyUrl} className="transition-colors hover:text-foreground">
              Privacyverklaring
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
