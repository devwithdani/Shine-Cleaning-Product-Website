import { siteConfig } from "./config";

type SubmitResult =
  | { status: "sent" }
  | { status: "not-configured" }
  | { status: "error"; message: string };

// No backend yet: without an endpoint in the config nothing gets sent and the form
// offers WhatsApp instead. With an endpoint (Formspree, own API route) it posts the form data.
export async function submitQuoteRequest(formData: FormData): Promise<SubmitResult> {
  const endpoint = siteConfig.quoteForm.endpoint;

  if (!endpoint) {
    return { status: "not-configured" };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return { status: "error", message: `De server antwoordde met status ${response.status}.` };
    }
    return { status: "sent" };
  } catch {
    return { status: "error", message: "Er ging iets mis met de verbinding." };
  }
}

// Form fields -> WhatsApp message (fallback while the form isn't connected)
export function buildQuoteMessage(formData: FormData): string {
  const services = formData.getAll("services").join(", ");
  const lines = [
    "Hallo, ik wil graag een offerte aanvragen.",
    "",
    `Naam: ${formData.get("name") || "-"}`,
    `Telefoon: ${formData.get("phone") || "-"}`,
    `E-mail: ${formData.get("email") || "-"}`,
    `Behandeling: ${services || "-"}`,
    `Auto / object: ${formData.get("object") || "-"}`,
  ];

  const message = formData.get("message");
  if (message) {
    lines.push("", `${message}`);
  }
  lines.push("", "Foto's stuur ik hierna in deze chat.");
  return lines.join("\n");
}
