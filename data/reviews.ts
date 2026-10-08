// Example reviews, not real customers. Reviews with isPlaceholder: true are never shown,
// so the section only appears once real reviews are added.

export type Review = {
  id: string;
  name: string;
  vehicle: string;
  service: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  isPlaceholder: boolean;
};

export const reviews: Review[] = [
  {
    id: "review-1",
    name: "Mark",
    vehicle: "Volkswagen Golf",
    service: "Interieur Detail",
    rating: 5,
    text: "Interieur zag er weer als nieuw uit. Vooral de stoffen stoelen zijn enorm opgeknapt.",
    isPlaceholder: true,
  },
  {
    id: "review-2",
    name: "Sanne",
    vehicle: "Toyota RAV4",
    service: "Full Detail",
    rating: 5,
    text: "Twee honden en een kofferbak vol haar. Alles is eruit, en de auto ruikt weer fris. Duidelijke afspraken vooraf.",
    isPlaceholder: true,
  },
  {
    id: "review-3",
    name: "Daan",
    vehicle: "BMW 3-serie",
    service: "Exterieur Detail",
    rating: 5,
    text: "De lak glanst weer zoals toen ik hem kocht. Je ziet dat er met aandacht is gewerkt, tot in de velgen.",
    isPlaceholder: true,
  },
];
