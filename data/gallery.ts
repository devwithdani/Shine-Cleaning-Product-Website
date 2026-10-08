export type GalleryLayout = "large" | "tall" | "wide" | "small";

export type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  category: string;
  // desktop grid of 12 columns: large 6x2, tall 3x2, wide 6x1, small 3x1
  layout: GalleryLayout;
  position?: string; // object-position for the crop
};

export const galleryItems: GalleryItem[] = [
  {
    src: "/images/gallery/golf-r-voorkant.jpg",
    alt: "Zwarte Volkswagen Golf R met glanzende lak op een zonnige oprit",
    title: "Volkswagen Golf R",
    category: "Exterieur",
    layout: "large",
  },
  {
    src: "/images/gallery/golf-r-velg.jpg",
    alt: "Schone zwarte velg met groene remklauw van een Golf R",
    title: "Velgen & remklauwen",
    category: "Exterieur",
    layout: "tall",
    position: "42% 50%",
  },
  {
    src: "/images/gallery/golf-r-koplamp.jpg",
    alt: "Close-up van de koplamp en grille van een zwarte Golf R",
    title: "Strakke finish",
    category: "Exterieur",
    layout: "small",
  },
  {
    src: "/images/gallery/stuur-beschermd.jpg",
    alt: "Stuur ingepakt in beschermfolie na een interieurbehandeling",
    title: "Schoon en beschermd",
    category: "Interieur",
    layout: "small",
  },
  {
    src: "/images/gallery/t-roc-r-achterkant.jpg",
    alt: "Achterkant van een zwarte Volkswagen T-Roc R met diepe glans",
    title: "Volkswagen T-Roc R",
    category: "Exterieur",
    layout: "wide",
    position: "50% 68%",
  },
  {
    src: "/images/gallery/uitlaat.jpg",
    alt: "Spiegelende zwarte bumper en schone uitlaatsierstukken",
    title: "Tot in de details",
    category: "Exterieur",
    layout: "wide",
    position: "50% 62%",
  },
];

// before/after slider (more than one pair = tabs). Portrait 3:4 photos work best.
type BeforeAfterItem = {
  id: string;
  label: string;
  title: string;
  description: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
};

export const beforeAfterItems: BeforeAfterItem[] = [
  {
    id: "interieur",
    label: "Interieur",
    title: "Interieur detail van een Volkswagen Golf",
    description: "Zand en vuil uit tapijt en matten, stoelen en dashboard weer fris.",
    before: {
      src: "/images/before-after/interieur-voor.jpg",
      alt: "Interieur van een Volkswagen Golf vóór de behandeling, met vuil tapijt",
    },
    after: {
      src: "/images/before-after/interieur-na.jpg",
      alt: "Hetzelfde interieur na de behandeling, met schoon tapijt en schone stoelen",
    },
  },
  {
    id: "stoel",
    label: "Stoffen stoel",
    title: "Dieptereiniging van een stoffen stoel",
    description: "Vlekken en ingetrapt vuil, diep uit de stof gehaald.",
    before: {
      src: "/images/before-after/stoel-voor.jpg",
      alt: "Vervuilde stoffen autostoel met vlekken",
    },
    after: {
      src: "/images/before-after/stoel-na.jpg",
      alt: "Dezelfde autostoel na dieptereiniging, schoon en fris",
    },
  },
];

// used for the scroll reveal in DetailingExplained
export const detailingExplainedImages = {
  before: {
    src: "/images/before-after/stoel-voor.jpg",
    alt: "Vervuilde stoffen autostoel vóór de dieptereiniging",
  },
  after: {
    src: "/images/before-after/stoel-na.jpg",
    alt: "Dezelfde stoel na de dieptereiniging",
  },
};
