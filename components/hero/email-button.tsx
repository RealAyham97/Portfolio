import Link from "next/link";

// Routes to the contact form rather than exposing a mailto: address, so no
// email is shipped to the client or committed to the repo.
export function HeroEmailButton() {
  return (
    <Link
      href="/contact"
      className="inline-flex items-center justify-center bg-accent px-[22px] py-[14px] font-mono text-[12px] uppercase tracking-[0.14em] text-accent-fg transition hover:opacity-90"
    >
      Email me →
    </Link>
  );
}
