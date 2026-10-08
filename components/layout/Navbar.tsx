"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Logo } from "@/components/ui/Logo";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { EASE_OUT, INTRO } from "@/lib/animations";
import { navigation, siteConfig } from "@/lib/config";
import { useActiveSection } from "@/lib/hooks/useActiveSection";
import { cn } from "@/lib/utils";

// Transparent over the hero, dark bar after scrolling. The navbar is fixed, so the
// height change doesn't move the page.
const SCROLL_THRESHOLD = 40;
const SECTION_IDS = navigation.map((link) => link.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const activeId = useActiveSection(SECTION_IDS);
  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > SCROLL_THRESHOLD));

  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = "hidden";

    document.querySelector<HTMLElement>("#mobile-menu a")?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      // keep focus inside the menu while it's open
      if (event.key === "Tab" && headerRef.current) {
        const focusable = headerRef.current.querySelectorAll<HTMLElement>('a[href]:not([tabindex="-1"]), button');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const solid = scrolled && !menuOpen;

  return (
    <motion.header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50"
      // only opacity: a transform here would break the fixed mobile menu
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, delay: INTRO.chrome, ease: EASE_OUT }}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 border-b bg-background/80 backdrop-blur-[14px] backdrop-saturate-150 transition-[opacity,border-color] duration-500",
          solid ? "border-line opacity-100" : "border-transparent opacity-0",
        )}
      >
        <motion.div className="absolute inset-x-0 -bottom-px h-px origin-left bg-accent" style={{ scaleX: scrollYProgress }} />
      </div>

      <nav
        aria-label="Hoofdmenu"
        className={cn(
          "container-page relative flex items-center gap-6 transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          solid ? "h-16" : "h-[76px]",
        )}
      >
        <a
          href="#top"
          onClick={closeMenu}
          className="flex h-full shrink-0 items-center transition-opacity duration-300 hover:opacity-75"
          aria-label={`${siteConfig.name}, naar boven`}
        >
          <Logo variant="mark" preload className="w-[80px] sm:w-[86px]" />
        </a>

        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-5 bottom-0 h-px bg-foreground/12 transition-opacity duration-500 sm:inset-x-10 lg:inset-x-16",
            solid || menuOpen ? "opacity-0" : "opacity-100",
          )}
        />

        <ul className="ml-auto hidden h-full items-center lg:flex">
          {navigation.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <li key={link.href} className="h-full">
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group flex h-full items-center px-4 text-[0.8125rem] tracking-[0.01em] transition-colors duration-300 xl:px-5",
                    isActive ? "text-foreground" : "text-foreground/68 hover:text-foreground",
                  )}
                >
                  <span className="relative py-1.5">
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-foreground/45 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100"
                    />
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-px bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 36 }}
                      />
                    )}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <span aria-hidden="true" className="hidden h-4 w-px bg-line-strong lg:block" />

        <div className="ml-auto flex items-center gap-2 sm:gap-4 lg:ml-0">
          {/* hidden while the mobile menu is open, it has its own button */}
          <QuoteButton
            shortLabel="Offerte"
            onClick={closeMenu}
            tabIndex={menuOpen ? -1 : undefined}
            className={cn("transition-opacity duration-300", menuOpen && "pointer-events-none opacity-0")}
          />

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
            className="flex size-11 items-center justify-center gap-3 text-[0.8125rem] text-foreground sm:w-auto sm:pl-2 lg:hidden"
          >
            <span aria-hidden="true" className="hidden sm:inline">
              {menuOpen ? "Sluiten" : "Menu"}
            </span>
            <span aria-hidden="true" className="relative flex size-5 items-center justify-center">
              <span
                className={cn(
                  "absolute h-px w-5 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  menuOpen ? "rotate-45" : "-translate-y-[3.5px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-5 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  menuOpen ? "-rotate-45" : "translate-y-[3.5px]",
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>{menuOpen && <MobileMenu activeId={activeId} onClose={closeMenu} />}</AnimatePresence>
    </motion.header>
  );
}
