import { about } from "@/content/about";
import { numbers } from "@/content/numbers";
import { profile } from "@/content/profile";
import { LiveQueryCard } from "./LiveQueryCard";
import { HeroEmailButton } from "./email-button";

// "Aiham" / "AlRawashdeh" — derived from the single name string so the two
// masthead lines can never drift from content/profile.ts.
const [FIRST_NAME, ...REST_NAME] = profile.name.split(" ");
const LAST_NAME = REST_NAME.join(" ");

function formatKpi(n: (typeof numbers)[number]) {
  return `${n.prefix ?? ""}${n.value}${n.suffix ?? ""} ${n.label}`;
}

export function Hero() {
  return (
    <>
      {/* Band 2 — Masthead */}
      <section id="top" className="u-gutter rule-b pt-[60px] pb-10">
        <div className="mb-[38px] flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] uppercase tracking-[0.18em] text-text-muted">
          <span>Hi, my name is</span>
          <span aria-hidden>·</span>
          <span>{profile.role}</span>
          <span aria-hidden>·</span>
          <span>{profile.location}</span>
        </div>

        <h1 className="t-display-xl anim-rise text-text">
          {FIRST_NAME}
          <br />
          <span className="italic text-accent">{LAST_NAME}</span>
        </h1>
      </section>

      {/* Band 3 — Ledger. Descenders on the 172px italic need real clearance,
          so the ledger's own top padding carries the ≥74px gap. */}
      <section className="rule-b grid grid-cols-1 lg:grid-cols-[1.35fr_1fr_0.8fr]">
        {/* Column 1 — pitch, about copy, actions */}
        <div className="border-b border-border px-5 pt-[38px] pb-[46px] lg:border-b-0 lg:border-r lg:pl-14 lg:pr-12">
          <p className="t-lead text-text">{profile.pitch}</p>
          <div className="mt-6 max-w-[450px] space-y-4">
            {about.paragraphs.map((p) => (
              <p key={p} className="t-body-l text-text-muted">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-[10px] sm:flex-row sm:gap-3">
            <HeroEmailButton />
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center justify-center border border-border px-[22px] py-[14px] font-mono text-[12px] uppercase tracking-[0.14em] text-text transition hover:bg-surface-2"
            >
              Resume ↓
            </a>
          </div>
        </div>

        {/* Column 2 — live query, de-carded into the ledger */}
        <div className="border-b border-border px-5 py-[38px] lg:border-b-0 lg:border-r lg:px-12">
          <LiveQueryCard />
        </div>

        {/* Column 3 — meta ledger, folds About + Numbers in */}
        <div className="flex flex-col gap-[22px] px-5 py-[38px] lg:pl-12 lg:pr-14">
          <MetaBlock label="Now" body={about.now} />
          <MetaBlock label="Past" body={about.past.join(" · ")} />
          <MetaBlock label="Industries" body={about.industries.join(" · ")} />
          <MetaBlock label="Numbers" body={numbers.map(formatKpi).join(" · ")} />
        </div>
      </section>
    </>
  );
}

function MetaBlock({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="t-mono-label mb-2 text-text-muted">{label}</div>
      <p className="t-mono-data text-text">{body}</p>
    </div>
  );
}
