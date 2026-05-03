"use client";
import { profile } from "@/content/profile";
import { Mail } from "lucide-react";
import { useState } from "react";

export function HeroEmailButton() {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard blocked; mailto is the only path
    }
  }

  return (
    <a
      href={`mailto:${profile.email}`}
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition hover:translate-y-[-1px]"
    >
      <Mail size={16} />
      {copied ? "Copied!" : "Email me"}
    </a>
  );
}
