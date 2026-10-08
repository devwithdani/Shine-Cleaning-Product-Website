"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, ImagePlus, Loader2 } from "lucide-react";
import { Button, ButtonSurface, buttonStyles } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/config";
import { buildQuoteMessage, submitQuoteRequest } from "@/lib/quote";
import { cn, getWhatsAppLink } from "@/lib/utils";

const SERVICE_OPTIONS = [
  "Full Detail",
  "Interieur Detail",
  "Exterieur Detail",
  "Stoffen stoelen",
  "Bank",
  "Trap",
  "Tapijt",
  "Anders",
];
const MAX_PHOTOS = 5;

type Status = "idle" | "submitting" | "sent" | "not-configured" | "error";

const inputClasses =
  "w-full border-0 border-b border-line-strong bg-transparent px-0 py-3 text-foreground placeholder:text-muted/50 " +
  "transition-colors focus:border-foreground focus:ring-0 focus:outline-none";
const labelClasses = "block text-xs text-muted";

export function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [serviceError, setServiceError] = useState(false);
  const [photoNames, setPhotoNames] = useState<string[]>([]);
  const [photoError, setPhotoError] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // "required" doesn't work for a group of checkboxes
    if (formData.getAll("services").length === 0) {
      setServiceError(true);
      form.querySelector<HTMLInputElement>('input[name="services"]')?.focus();
      return;
    }
    setServiceError(false);

    setStatus("submitting");
    const result = await submitQuoteRequest(formData);

    if (result.status === "sent") {
      form.reset();
      setPhotoNames([]);
    }
    if (result.status === "not-configured") {
      setWhatsappMessage(buildQuoteMessage(formData));
    }
    if (result.status === "error") {
      setErrorMessage(result.message);
    }
    setStatus(result.status);
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length > MAX_PHOTOS) {
      event.target.value = "";
      setPhotoNames([]);
      setPhotoError(`Je kunt maximaal ${MAX_PHOTOS} foto's kiezen.`);
      return;
    }
    setPhotoError("");
    setPhotoNames(files.map((file) => file.name));
  }

  return (
    <form
      id="offerte"
      onSubmit={handleSubmit}
      className="panel relative rounded-card bg-background p-6 sm:p-10 lg:p-12"
    >
      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Naam
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Telefoonnummer
          </label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            E-mailadres <span className="font-normal text-muted">(optioneel)</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="object" className={labelClasses}>
            Auto of object
          </label>
          <input
            id="object"
            name="object"
            type="text"
            placeholder="Bijv. VW Golf 2018 of 3-zitsbank"
            className={inputClasses}
          />
        </div>
      </div>

      <fieldset className="mt-10" aria-describedby={serviceError ? "services-error" : undefined}>
        <legend className={labelClasses}>Wat wil je laten reinigen?</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {SERVICE_OPTIONS.map((option) => (
            <label key={option} className="cursor-pointer">
              <input
                type="checkbox"
                name="services"
                value={option}
                onChange={() => setServiceError(false)}
                className="peer sr-only"
              />
              <span className="inline-flex items-center rounded-tile border border-line-strong px-4 py-2 text-sm text-muted transition-colors peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:border-foreground hover:text-foreground">
                {option}
              </span>
            </label>
          ))}
        </div>
        {serviceError && (
          <p id="services-error" role="alert" className="mt-3 flex items-center gap-2 text-sm text-red-300">
            <AlertCircle className="size-4" /> Kies minimaal één optie.
          </p>
        )}
      </fieldset>

      <div className="mt-10">
        <label htmlFor="message" className={labelClasses}>
          Bericht
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Wat valt je op? Denk aan vlekken, geuren, dierenhaar of doffe lak."
          className={cn(inputClasses, "resize-y")}
        />
      </div>

      <div className="mt-10">
        <span className={cn(labelClasses, "mb-3")}>
          Foto&apos;s <span className="font-normal text-muted">(optioneel, max. {MAX_PHOTOS})</span>
        </span>
        <label
          htmlFor="photos"
          className="flex cursor-pointer items-center gap-4 rounded-tile border border-dashed border-line-strong px-5 py-5 transition-colors hover:border-foreground"
        >
          <ImagePlus aria-hidden="true" className="size-5 shrink-0 text-muted" />
          <span className="text-sm">
            {photoNames.length > 0 ? `${photoNames.length} foto('s) gekozen` : "Klik om foto's te kiezen"}
          </span>
          {photoNames.length > 0 && (
            <span className="max-w-full truncate text-xs text-muted">{photoNames.join(", ")}</span>
          )}
        </label>
        <input
          id="photos"
          name="photos"
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoChange}
          className="sr-only"
        />
        {photoError && (
          <p role="alert" className="mt-2 text-sm text-red-300">
            {photoError}
          </p>
        )}
      </div>

      <label className="mt-10 flex cursor-pointer items-start gap-3 text-sm text-muted">
        <input type="checkbox" name="privacy" required className="mt-0.5 size-4 shrink-0 accent-[var(--accent)]" />
        <span>
          Ik ga akkoord dat mijn gegevens worden gebruikt om mijn aanvraag te beantwoorden.
          {siteConfig.privacyPolicyUrl && (
            <>
              {" "}
              Lees de{" "}
              <a href={siteConfig.privacyPolicyUrl} className="text-foreground underline underline-offset-2">
                privacyverklaring
              </a>
              .
            </>
          )}
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={buttonStyles("lg", "mt-10 w-full sm:w-auto")}
      >
        <ButtonSurface />
        <span className="flex items-center gap-3">
          {status === "submitting" && <Loader2 aria-hidden="true" className="size-4 animate-spin" />}
          {status === "submitting" ? "Bezig met versturen…" : "Offerte aanvragen"}
        </span>
      </button>

      {/* aria-live so screen readers read the result */}
      <div aria-live="polite" className="empty:hidden">
        {status === "sent" && (
          <div className="mt-6 flex gap-3 rounded-tile border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm">
            <CheckCircle2 aria-hidden="true" className="size-5 shrink-0 text-emerald-300" />
            <p>Bedankt! Je aanvraag is verzonden. We nemen zo snel mogelijk contact met je op.</p>
          </div>
        )}

        {status === "not-configured" && (
          <div className="mt-6 rounded-tile border border-amber-300/30 bg-amber-300/10 p-4 text-sm">
            <p className="flex gap-3">
              <AlertCircle aria-hidden="true" className="size-5 shrink-0 text-amber-200" />
              <span>
                <strong className="font-medium">Je aanvraag is nog niet verzonden.</strong> Het online formulier wordt
                binnenkort gekoppeld. Stuur je aanvraag via WhatsApp: we hebben je gegevens alvast in een bericht gezet.
              </span>
            </p>
            <Button
              href={getWhatsAppLink(whatsappMessage)}
              variant="whatsapp"
              size="md"
              className="mt-5"
              icon={<WhatsAppIcon className="size-4 text-[#25D366]" />}
            >
              Verstuur via WhatsApp
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="mt-6 flex gap-3 rounded-tile border border-red-400/30 bg-red-400/10 p-4 text-sm">
            <AlertCircle aria-hidden="true" className="size-5 shrink-0 text-red-300" />
            <p>
              Versturen is niet gelukt. {errorMessage} Probeer het opnieuw of stuur ons een bericht via{" "}
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="underline">
                WhatsApp
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
