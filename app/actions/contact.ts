"use server";

import { Resend } from "resend";

export type ContactResult = { status: "success" } | { status: "error"; message: string };

const UNAVAILABLE: ContactResult = {
  status: "error",
  message: "Contact is temporarily unavailable. Please try again later.",
};

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendContactEmail(formData: FormData): Promise<ContactResult> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!name || !email || !message) {
    return { status: "error", message: "All fields are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  // Recipient and API key live in env vars so nothing sensitive is committed.
  // The Resend client is created here, not at module level: constructing it
  // without a key throws, which would crash the action before it could
  // respond and leave the form stuck in its loading state.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY or CONTACT_EMAIL is not set");
    return UNAVAILABLE;
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <contact@aihamalrawashdeh.com>",
      to,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <hr />
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return UNAVAILABLE;
    }

    return { status: "success" };
  } catch (err) {
    console.error("[contact] Resend error:", err instanceof Error ? err.message : String(err));
    return UNAVAILABLE;
  }
}
