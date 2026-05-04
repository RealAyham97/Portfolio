import { profile } from "@/content/profile";
import { formatAmmanTime } from "@/lib/format";
import { ArrowDownToLine } from "lucide-react";
import { HeroEmailButton } from "./email-button";
import { LiveQueryCard } from "./LiveQueryCard";
import { LiveLocalTime } from "./live-local-time";

export function Hero() {
  const initial = formatAmmanTime();

  return (
    <section
      id="top"
      className="relative mx-auto grid max-w-6xl gap-12 px-6 pt-24 pb-12 md:grid-cols-[1.4fr_1fr] md:gap-16 md:pt-32 md:pb-16"
    >
      <div className="flex flex-col justify-center gap-8">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider text-text-muted">
          <span>{profile.role}</span>
          <span aria-hidden>·</span>
          <span>{profile.location}</span>
          <span aria-hidden>·</span>
          <LiveLocalTime initial={initial} />
        </div>
        <div className="space-y-2">
          <p className="font-mono text-sm text-text-muted">Hi, my name is</p>
          <h1
            className="font-display italic leading-[0.95] text-text"
            style={{ fontSize: "clamp(2.5rem, 12vw, 9rem)" }}
          >
            {profile.name}
          </h1>
        </div>
        <p className="max-w-xl text-lg text-text-muted md:text-xl">{profile.pitch}</p>
        <div className="flex flex-wrap items-center gap-3">
          <HeroEmailButton />
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-text transition hover:translate-y-[-1px]"
          >
            <ArrowDownToLine size={16} />
            Resume
          </a>
        </div>
      </div>
      <div className="flex items-center">
        <LiveQueryCard />
      </div>
    </section>
  );
}
