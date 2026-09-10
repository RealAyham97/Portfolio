import Link from "next/link";

// Routes to the contact form rather than exposing a mailto: address, so no
// email is shipped to the client or committed to the repo.
export function HeroEmailButton() {
  return (
    <Link href="/contact" className="btn-hard is-primary">
      Email me →
    </Link>
  );
}
