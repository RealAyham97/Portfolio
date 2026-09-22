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
      <section id="top" className="u-gutter rule-b pt-8 pb-7">
        {/* Greeting, name, then the credentials — in that order, so the
            sentence the greeting opens is answered by the name directly
            below it rather than after the role and location. */}
        <p className="mb-3 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-muted">
          Hi, my name is
        </p>

        <h1 className="t-display-xl text-text">
          {FIRST_NAME}
          <br />
          <span className="text-outline">{LAST_NAME}</span>
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-text-muted">
          <span>{profile.role}</span>
          <span aria-hidden>·</span>
          <span>{profile.location}</span>
        </div>
      </section>

      {/* Band 3 — Ledger */}
      <section className="rule-b grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_0.85fr]">
        {/* Column 1 — pitch, about copy, actions */}
        <div className="border-b-[3px] border-border px-5 py-6 lg:border-b-0 lg:border-r-[3px] lg:pl-10 lg:pr-9 lg:py-7">
          <p className="t-lead text-text">{profile.pitch}</p>
          <div className="mt-5 max-w-[46ch] space-y-3.5">
            {about.paragraphs.map((p) => (
              <p key={p} className="t-body-m text-text-muted">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <HeroEmailButton />
            <a href={profile.resumeUrl} download className="btn-hard">
              Resume ↓
            </a>
          </div>
        </div>

        {/* Column 2 — live query, framed as a hard-edged instrument */}
        <div className="border-b-[3px] border-border px-5 py-6 lg:border-b-0 lg:border-r-[3px] lg:px-9 lg:py-7">
          <LiveQueryCard />
        </div>

        {/* Column 3 — meta ledger, folds About + Numbers in */}
        <div className="flex flex-col gap-4 px-5 py-6 lg:pl-9 lg:pr-10 lg:py-7">
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
      <div className="block-second t-mono-label mb-2 inline-block px-2 py-0.5">{label}</div>
      <p className="t-mono-data text-text-muted">{body}</p>
    </div>
  );
}
