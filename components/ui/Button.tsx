import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

// primary = quote button (fills blue on hover), link = text with underline
type Variant = "primary" | "link" | "whatsapp";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-foreground text-background font-semibold tracking-[0.015em]",
  link: "w-fit text-foreground",
  whatsapp: "border border-line-strong text-foreground hover:border-[#25D366]/70 hover:bg-[#25D366]/[0.05]",
};

// a bit less padding on the right because of the arrow
const sizes: Record<Size, string> = {
  md: "h-10 pl-5 pr-[1.125rem] text-[0.8125rem] gap-3",
  lg: "h-[3.25rem] pl-7 pr-6 text-[0.875rem] gap-4",
};

// also used for the <button> in the quote form
export function buttonStyles(size: Size = "lg", className?: string, variant: Variant = "primary") {
  return cn(
    "group/button relative isolate inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-tile",
    "transition-[background-color,border-color,color,transform] duration-300 active:translate-y-px",
    "focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-60",
    variant !== "primary" && "font-medium tracking-[0.005em]",
    variants[variant],
    variant === "link" ? "h-auto gap-3 px-0 py-1.5" : sizes[size],
    className,
  );
}

export function ButtonSurface({ variant = "primary" }: { variant?: Variant }) {
  if (variant === "primary") {
    return (
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/button:scale-x-100"
      />
    );
  }
  if (variant === "link") {
    return (
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-line-strong">
        <span className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/button:scale-x-100" />
      </span>
    );
  }
  return null;
}

export function ButtonIcon({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="flex size-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/button:translate-x-1 group-focus-visible/button:translate-x-1"
    >
      {children}
    </span>
  );
}

type ButtonProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function Button({ href, variant = "primary", size = "lg", icon, children, className, onClick }: ButtonProps) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      onClick={onClick}
      className={buttonStyles(size, className, variant)}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <ButtonSurface variant={variant} />
      <span>{children}</span>
      {icon && <ButtonIcon>{icon}</ButtonIcon>}
    </a>
  );
}
