import { Mail } from "lucide-react";
import Link from "next/link";

// Routes to the contact form rather than exposing a mailto: address, so no
// email is shipped to the client or committed to the repo.
export function HeroEmailButton() {
  return (
    <Link
      href="/contact"
      className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition hover:translate-y-[-1px]"
    >
      <Mail size={16} />
      Email me
    </Link>
  );
}
