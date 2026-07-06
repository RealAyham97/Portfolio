"use client";

import { sendContactEmail } from "@/app/actions/contact";
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);

    // The action can throw (network drop, server crash) — without a catch the
    // form would stay stuck on "Sending…" forever.
    try {
      const result = await sendContactEmail(formData);

      if (result.status === "success") {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setErrorMsg(result.message);
        setStatus("error");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again later.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="font-mono text-xs uppercase tracking-wider text-text-muted"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className="w-full rounded-xl border border-border bg-surface-1 px-4 py-3 text-sm text-text placeholder:text-text-muted/50 outline-none transition focus:border-accent"
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="font-mono text-xs uppercase tracking-wider text-text-muted"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full rounded-xl border border-border bg-surface-1 px-4 py-3 text-sm text-text placeholder:text-text-muted/50 outline-none transition focus:border-accent"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="message"
          className="font-mono text-xs uppercase tracking-wider text-text-muted"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="What's on your mind?"
          className="w-full resize-none rounded-xl border border-border bg-surface-1 px-4 py-3 text-sm text-text placeholder:text-text-muted/50 outline-none transition focus:border-accent"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-accent-fg transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Sending…" : status === "success" ? "Sent!" : "Send message"}
        </button>

        {status === "success" && (
          <p className="font-mono text-xs text-text-muted">
            Message received. I'll get back to you soon.
          </p>
        )}
        {status === "error" && <p className="font-mono text-xs text-red-500">{errorMsg}</p>}
      </div>
    </form>
  );
}
