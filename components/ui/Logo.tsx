import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "mark" | "full";
  className?: string;
  preload?: boolean;
};

// "mark" = letters only (navbar), "full" = with "CAR DETAILING" (footer)
export function Logo({ variant = "mark", className, preload = false }: LogoProps) {
  const isFull = variant === "full";

  return (
    <Image
      src={isFull ? siteConfig.logo.full : siteConfig.logo.mark}
      alt={siteConfig.name}
      width={isFull ? 900 : 600}
      height={isFull ? 313 : 177}
      preload={preload}
      sizes={isFull ? "280px" : "140px"}
      className={cn("h-auto select-none", className)}
    />
  );
}
