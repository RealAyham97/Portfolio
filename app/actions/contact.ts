"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactResult =
  | { status: "success" }
  | { status: "error"; message: string };

export async function sendContactEmail(
  formData: FormData,
): Promise<ContactResult> {
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

  try {
    await resend.emails.send({
      from: "Portfolio Contact <noreply@send.aihamalrawashdeh.com>",
      to: "Ayham19@icloud.com",
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr />
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return { status: "success" };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[contact] Resend error:", msg);
    return { status: "error", message: `Failed to send: ${msg}` };
  }
}
