import { siteConfig } from "./config";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function getWhatsAppLink(message: string = siteConfig.whatsapp.defaultMessage) {
  const text = encodeURIComponent(message);
  const number = siteConfig.whatsapp.number;

  if (number) {
    return `https://wa.me/${number}?text=${text}`;
  }
  // no number yet: WhatsApp lets the visitor pick a contact
  return `https://wa.me/?text=${text}`;
}

export function getPhoneLink(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
