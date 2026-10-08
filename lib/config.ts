// Business info. Empty values are hidden on the site.
export const siteConfig = {
  name: "RMD Car Detailing",
  tagline: "Professionele auto detailing",
  description:
    "Professionele auto detailing voor interieur en exterieur. Van dieptereiniging van stoffen bekleding tot een complete full detail.",

  // TODO: change to the real domain
  url: "https://www.example.nl",

  phone: "", // "06 12 34 56 78"
  email: "",
  city: "",
  serviceArea: "", // "Eindhoven en omgeving"
  kvk: "",

  social: {
    instagram: "",
    facebook: "",
  },

  whatsapp: {
    number: "", // international, digits only: 0612345678 -> "31612345678"
    defaultMessage: "Hallo, ik wil graag informatie over een detailing/reiniging.",
  },

  quoteForm: {
    // e.g. a Formspree url. Empty = form doesn't send anything (see lib/quote.ts)
    endpoint: "",
  },

  privacyPolicyUrl: "",

  logo: {
    full: "/images/brand/rmd-logo.png",
    mark: "/images/brand/rmd-mark.png",
  },
};

export const navigation = [
  { label: "Diensten", href: "#diensten" },
  { label: "Resultaten", href: "#resultaten" },
  { label: "Werkwijze", href: "#werkwijze" },
  { label: "Over ons", href: "#over-ons" },
  { label: "Contact", href: "#contact" },
];

export const QUOTE_HREF = "#offerte";
