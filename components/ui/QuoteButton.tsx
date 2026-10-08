import type { MouseEventHandler } from "react";
import { ArrowRight } from "lucide-react";
import { ButtonIcon, ButtonSurface, buttonStyles } from "@/components/ui/Button";
import { QUOTE_HREF } from "@/lib/config";
import { cn } from "@/lib/utils";

// Quote button for the navbar and mobile menu
type QuoteButtonProps = {
  label?: string;
  shortLabel?: string; // shown on small screens
  fullWidth?: boolean;
  className?: string;
  tabIndex?: number;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function QuoteButton({
  label = "Offerte aanvragen",
  shortLabel,
  fullWidth = false,
  className,
  tabIndex,
  onClick,
}: QuoteButtonProps) {
  return (
    <a
      href={QUOTE_HREF}
      onClick={onClick}
      tabIndex={tabIndex}
      className={buttonStyles(fullWidth ? "lg" : "md", cn(fullWidth && "w-full justify-between", className))}
    >
      <ButtonSurface />
      <span>
        {shortLabel ? (
          <>
            <span className="sm:hidden">{shortLabel}</span>
            <span className="hidden sm:inline">{label}</span>
          </>
        ) : (
          label
        )}
      </span>
      <ButtonIcon>
        <ArrowRight className="size-4" strokeWidth={2.5} />
      </ButtonIcon>
    </a>
  );
}
