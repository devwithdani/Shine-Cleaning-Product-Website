# RMD Car Detailing

Website van RMD Car Detailing. Gemaakt met Next.js, TypeScript, Tailwind CSS en Framer Motion.

## Starten

```bash
npm install
npm run dev
```

De site draait dan op http://localhost:3000.

## Structuur

```
app/          layout, homepage en globale css
components/
  layout/     navbar, mobiel menu, footer, whatsapp-knop
  sections/   de secties van de homepage
  ui/         knoppen, koppen, kaarten, slider
  effects/    scroll-animaties
  forms/      offerteformulier
data/         teksten en foto's van diensten, galerij en reviews
lib/          config, helpers en hooks
public/       afbeeldingen, logo en video
```

## Aanpassen

- Contactgegevens, WhatsApp-nummer en socials: `lib/config.ts` (lege velden worden niet getoond)
- Diensten en teksten: `data/services.ts`
- Galerij en voor/na-foto's: `data/gallery.ts`
- Kleuren en lettergroottes: `app/globals.css`

## Offerteformulier

Het formulier verstuurt nog niets. Zolang `quoteForm.endpoint` in `lib/config.ts` leeg is, krijgt de bezoeker een WhatsApp-bericht met de ingevulde gegevens.
Om het te koppelen: maak bijvoorbeeld een formulier aan op Formspree en zet de url bij `quoteForm.endpoint`.

## Nog te doen

- Contactgegevens en domein invullen in `lib/config.ts`
- Formulier koppelen
- Privacyverklaring
- Eigen verhaal bij "Over ons" (`components/sections/WhyUs.tsx`)
- Echte reviews toevoegen (`data/reviews.ts`)
