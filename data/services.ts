type ImageData = {
  src: string;
  alt: string;
};

type ProcessStep = {
  title: string;
  text: string;
};

export type Service = {
  id: string; // anchor of the details block
  number: string;
  title: string;
  category: string;
  badge?: string;
  tagline: string;
  description: string;
  image: ImageData;
  features: string[];
  cta: { label: string; href: string };
  details?: {
    title: string;
    intro: string;
    image: ImageData;
    steps: ProcessStep[];
  };
};

export const mainServices: Service[] = [
  {
    id: "full-detail",
    number: "01",
    title: "Full Detail",
    category: "Interieur + exterieur",
    badge: "Meest compleet",
    tagline: "Alles. Binnen én buiten.",
    description:
      "Onze meest complete behandeling. Je auto wordt van binnen en van buiten grondig gereinigd, tot in de naden en kieren.",
    image: {
      src: "/images/services/full-detail.jpg",
      alt: "Zwarte Volkswagen T-Roc R met diepe glans na een detailbehandeling",
    },
    features: [
      "Complete interieurbehandeling",
      "Dieptereiniging",
      "Dashboard & kunststof",
      "Ramen",
      "Veilige exterior wash",
      "Velgen",
      "Banden",
      "Finishing",
    ],
    cta: { label: "Bekijk onze aanpak", href: "#aanpak" },
  },
  {
    id: "interieur-detailing",
    number: "02",
    title: "Interieur Detail",
    category: "Interieur",
    tagline: "Dieptereiniging tot in de vezels.",
    description:
      "Met professionele extractie-apparatuur halen we vuil, vlekken en geurtjes uit stoelen, bekleding en tapijt. Niet oppervlakkig, maar diep uit de stof.",
    image: {
      src: "/images/services/interior-detail.jpg",
      alt: "Schone sportstoel met blauw-grijze stoffen bekleding",
    },
    features: [
      "Diep stofzuigen",
      "Stoelreiniging",
      "Bekleding",
      "Tapijt",
      "Matten",
      "Vlekverwijdering",
      "Kunststof",
      "Moeilijk bereikbare plekken",
    ],
    cta: { label: "Bekijk interieur detailing", href: "#interieur-detailing" },
    details: {
      title: "Vuil eruit. Niet eroverheen.",
      intro:
        "Met professionele extractie-apparatuur spoelen we reinigingsvloeistof diep in stoelen en tapijt, en zuigen we die direct weer op. Samen met het vuil, de vlekken en de geur.",
      image: {
        src: "/images/services/interior-process.jpg",
        alt: "Schoon stuur en dashboard van een Volkswagen Golf R",
      },
      steps: [
        {
          title: "Droog voorbereiden",
          text: "Diep stofzuigen van stoelen, tapijt, matten en naden. Zand, kruimels en haren gaan er eerst uit.",
        },
        {
          title: "Voorbehandelen",
          text: "Vlekken en vervuilde plekken krijgen een passende reiniger die het vuil uit de vezels losmaakt.",
        },
        {
          title: "Extractie",
          text: "We spoelen de stof met water en zuigen het in dezelfde beweging weer op. Het vuil gaat mee naar buiten.",
        },
        {
          title: "Afwerken",
          text: "Dashboard, kunststof, ramen en moeilijk bereikbare plekken. Daarna laten we alles goed drogen.",
        },
      ],
    },
  },
  {
    id: "exterieur-detailing",
    number: "03",
    title: "Exterieur Detail",
    category: "Exterieur",
    tagline: "Veilig gewassen. Diepe glans.",
    description:
      "Een zorgvuldige handwas zonder borstels, gevolgd door velgen, banden en een beschermende finish. Voor een lak die er weer strak uitziet.",
    image: {
      src: "/images/services/exterior-detail.jpg",
      alt: "Spiegelende zwarte lak met R-embleem op het spatbord",
    },
    features: [
      "Veilige handwas",
      "Velgenreiniging",
      "Banden",
      "Lakreiniging",
      "Finishing",
      "Bescherming",
    ],
    cta: { label: "Bekijk exterior detailing", href: "#exterieur-detailing" },
    details: {
      title: "Veilig gewassen. Zonder krassen.",
      intro:
        "Geen borstels, maar handwerk. We wassen in vaste stappen, zodat vuil en zand van de lak gaan zonder krassen achter te laten.",
      image: {
        src: "/images/services/exterior-process.jpg",
        alt: "Schone velg en band van een Volkswagen T-Roc R",
      },
      steps: [
        {
          title: "Voorwas",
          text: "Een schuimlaag weekt vuil en zand los, nog voordat we de lak aanraken.",
        },
        {
          title: "Handwas",
          text: "Met de twee-emmermethode en zachte washandschoenen. Paneel voor paneel.",
        },
        {
          title: "Velgen & decontaminatie",
          text: "Remstof, teer en vliegroest verwijderen we met speciale middelen. Ook achter de spaken.",
        },
        {
          title: "Drogen & beschermen",
          text: "Krasvrij drogen en afwerken met een wax of sealant, voor glans en bescherming.",
        },
      ],
    },
  },
];

type ListItem = {
  title: string;
  description: string;
};

export const addOns: ListItem[] = [
  {
    title: "Vlekverwijdering",
    description: "Gerichte behandeling van koffie-, frisdrank- en andere vlekken in stof en tapijt.",
  },
  {
    title: "Geurverwijdering",
    description: "We pakken de bron van de geur aan, in plaats van er een luchtje overheen te spuiten.",
  },
  {
    title: "Dierenhaar verwijderen",
    description: "Hardnekkig haar uit stoelen, tapijt en kofferbak. Ook het haar dat in de stof is gaan zitten.",
  },
  {
    title: "Lakdecontaminatie",
    description: "Teer, vliegroest en ingebakken vuil verwijderen, voor een lak die weer glad aanvoelt.",
  },
  {
    title: "Wax of sealant",
    description: "Een beschermlaag voor extra glans en een lak die minder snel vuil wordt.",
  },
  {
    title: "Kunststof & trim",
    description: "Reinigen en verzorgen van dashboard, deurpanelen en rubbers, zonder vettige glans.",
  },
];

// furniture / home textile
export const textileServices: ListItem[] = [
  {
    title: "Banken",
    description: "Stoffen banken en hoekbanken, inclusief kussens.",
  },
  {
    title: "Stoffen trappen",
    description: "Traptapijt en stoffen treden, tot in de hoeken.",
  },
  {
    title: "Stoelen",
    description: "Eetkamerstoelen, fauteuils en bureaustoelen.",
  },
  {
    title: "Tapijt & bekleding",
    description: "Vloerkleden, tapijt, matrassen en andere textiel.",
  },
];
