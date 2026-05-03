import { ArrowDownToLine, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { formatAmmanTime } from "@/lib/format";
import { LiveLocalTime } from "./live-local-time";
import { SqlChartSignature } from "./sql-chart-signature";

export function Hero() {
  const initial = formatAmmanTime();

  return (
    <section
      id="top"
      className="relative mx-auto grid max-w-6xl gap-12 px-6 pt-32 pb-24 md:grid-cols-[1.4fr_1fr] md:gap-16 md:pt-40 md:pb-32"
    >
      <div className="flex flex-col justify-center gap-8">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider text-text-muted">
          <span>{profile.role}</span>
          <span aria-hidden>·</span>
          <span>{profile.location}</span>
          <span aria-hidden>·</span>
          <LiveLocalTime initial={initial} />
        </div>
        <h1
          className="font-display italic leading-[0.95] text-text"
          style={{ fontSize: "clamp(3.5rem, 12vw, 9rem)" }}
        >
          {profile.name}
        </h1>
        <p className="max-w-xl text-lg text-text-muted md:text-xl">{profile.pitch}</p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition hover:translate-y-[-1px]"
          >
            <Mail size={16} />
            Email me
          </a>
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
        <SqlChartSignature />
      </div>
    </section>
  );
}
