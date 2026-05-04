import { profile } from "@/content/profile";
import { Linkedin, Mail, Phone } from "lucide-react";
import { Reveal } from "./reveal";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <Reveal>
        <h2
          className="font-display italic text-text"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Contact
        </h2>
      </Reveal>
      <Reveal className="mt-10">
        <ul className="grid gap-4 font-mono text-sm text-text-muted sm:grid-cols-3">
          <li className="flex min-w-0 items-center gap-2">
            <Mail size={14} className="shrink-0" />
            <a href={`mailto:${profile.email}`} className="truncate hover:text-text">
              {profile.email}
            </a>
          </li>
          <li className="flex min-w-0 items-center gap-2">
            <Phone size={14} className="shrink-0" />
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="truncate hover:text-text">
              {profile.phone}
            </a>
          </li>
          <li className="flex min-w-0 items-center gap-2">
            <Linkedin size={14} className="shrink-0" />
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="truncate hover:text-text"
            >
              linkedin.com/in/ayham-alrawashdeh
            </a>
          </li>
        </ul>
      </Reveal>
    </section>
  );
}
