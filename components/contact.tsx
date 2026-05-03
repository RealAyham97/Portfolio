"use client";
import { profile } from "@/content/profile";
import { Check, Copy, Linkedin, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { Reveal } from "./reveal";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked; ignore */
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <h2
          className="font-display italic text-text"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Contact
        </h2>
      </Reveal>
      <Reveal className="mt-10 space-y-8">
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="font-display italic text-text hover:text-accent"
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
          >
            {profile.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            aria-label="Copy email address"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted transition hover:text-text"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
        <ul className="grid gap-4 font-mono text-sm text-text-muted sm:grid-cols-3">
          <li className="flex items-center gap-2">
            <Mail size={14} />
            <a href={`mailto:${profile.email}`} className="hover:text-text">
              {profile.email}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Phone size={14} />
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="hover:text-text">
              {profile.phone}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Linkedin size={14} />
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-text"
            >
              linkedin.com/in/ayham-alrawashdeh
            </a>
          </li>
        </ul>
      </Reveal>
    </section>
  );
}
