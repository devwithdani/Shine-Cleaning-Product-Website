"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { WhatsAppIcon } from "@/components/ui/icons";
import { EASE_OUT } from "@/lib/animations";
import { navigation, siteConfig } from "@/lib/config";
import { cn, getPhoneLink, getWhatsAppLink } from "@/lib/utils";

const LINK_STAGGER = 0.06;

type MobileMenuProps = {
  activeId: string | null;
  onClose: () => void;
};

export function MobileMenu({ activeId, onClose }: MobileMenuProps) {
  return (
    <motion.div
      id="mobile-menu"
      className="fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-background lg:hidden"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] } }}
      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
    >
      <nav aria-label="Mobiel menu" className="container-page flex flex-1 flex-col pt-[calc(var(--nav-height)+2rem)] pb-8">
        <ul className="border-t border-line">
          {navigation.map((link, index) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <li key={link.href} className="overflow-hidden border-b border-line">
                <motion.a
                  href={link.href}
                  onClick={onClose}
                  aria-current={isActive ? "true" : undefined}
                  className="flex items-baseline gap-5 py-5"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.8, delay: 0.25 + index * LINK_STAGGER, ease: EASE_OUT }}
                >
                  <span className={cn("w-6 text-xs tabular-nums", isActive ? "text-accent" : "text-muted")}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={cn("text-h2 leading-none", isActive ? "font-heading" : "font-heading-light")}>
                    {link.label}
                  </span>
                  {isActive && <span aria-hidden="true" className="ml-auto size-2 self-center bg-accent" />}
                </motion.a>
              </li>
            );
          })}
        </ul>

        <motion.div
          className="mt-auto pt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <QuoteButton fullWidth onClick={onClose} />

          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 transition-colors hover:text-foreground"
            >
              <WhatsAppIcon className="size-4 text-[#25D366]" />
              WhatsApp
            </a>
            {siteConfig.phone && (
              <a href={getPhoneLink(siteConfig.phone)} className="flex items-center gap-2.5 transition-colors hover:text-foreground">
                <Phone aria-hidden="true" className="size-4" />
                {siteConfig.phone}
              </a>
            )}
            {(siteConfig.serviceArea || siteConfig.city) && (
              <span className="ml-auto text-xs">{siteConfig.serviceArea || siteConfig.city}</span>
            )}
          </div>
        </motion.div>
      </nav>
    </motion.div>
  );
}
