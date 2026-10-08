import { WhatsAppIcon } from "@/components/ui/icons";
import { getWhatsAppLink } from "@/lib/utils";

export function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Stuur ons een bericht via WhatsApp"
      className="group fixed right-4 bottom-4 z-40 flex items-center sm:right-6 sm:bottom-6"
    >
      <span className="glass mr-3 hidden max-w-0 overflow-hidden rounded-tile py-2.5 text-sm whitespace-nowrap opacity-0 transition-all duration-500 group-hover:max-w-48 group-hover:px-4 group-hover:opacity-100 pointer-fine:inline-block">
        Stuur een bericht
      </span>
      <span className="flex size-13 items-center justify-center rounded-full border border-line-strong bg-background-2/90 text-[#25D366] shadow-[0_12px_30px_-10px_rgb(0_0_0/0.8)] backdrop-blur-md transition-colors duration-300 group-hover:border-[#25D366] group-hover:bg-[#25D366] group-hover:text-white">
        <WhatsAppIcon className="size-6" />
      </span>
    </a>
  );
}
