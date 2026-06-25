import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { profile } from "@/content/profile";
import { pageMeta } from "@/lib/seo";
import { Linkedin } from "lucide-react";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Get in touch with Aiham AlRawashdeh about web development, dashboards, and digital marketing projects, in Amman and remotely.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main>
        <section className="mx-auto max-w-6xl px-6 pt-32 pb-4 md:pt-40 md:pb-8">
          <Reveal>
            <h1
              className="font-display italic text-text/80 leading-none"
              style={{ fontSize: "clamp(3.5rem, 8vw, 5rem)" }}
            >
              Contact
            </h1>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <div className="grid gap-16 md:grid-cols-[1fr_1.6fr]">
            {/* Contact details */}
            <Reveal className="space-y-8">
              <div className="space-y-1">
                <p className="font-mono text-xs uppercase tracking-wider text-text-muted">
                  Let's talk
                </p>
                <p className="text-text-muted leading-relaxed">
                  Whether it's a project, a question, or just a hello, send a note with the form
                  and I'll get back to you.
                </p>
              </div>

              <ul className="space-y-4">
                <li>
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center gap-3 text-sm text-text-muted transition hover:text-text"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition group-hover:border-accent">
                      <Linkedin size={14} />
                    </span>
                    LinkedIn
                  </a>
                </li>
              </ul>
            </Reveal>

            {/* Contact form */}
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
