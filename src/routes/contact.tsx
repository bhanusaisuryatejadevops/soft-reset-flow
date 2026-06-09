import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Facebook, Mail } from "lucide-react";

const BASE = "https://resetflow.site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "contact reset — get in touch" },
      { name: "description", content: "Reach the ResetFlow team. Slow replies, real ones. For questions, feedback, partnerships, or just to say hello." },
      { property: "og:title", content: "contact reset" },
      { property: "og:description", content: "Reach the ResetFlow team. Slow replies, real ones." },
      { property: "og:url", content: `${BASE}/contact` },
    ],
    links: [{ rel: "canonical", href: `${BASE}/contact` }],
  }),
  component: Contact,
});

const links = [
  { label: "email", value: "hello@resetflow.site", href: "mailto:hello@resetflow.site", Icon: Mail },
  { label: "instagram", value: "@soft_resetflow", href: "https://www.instagram.com/soft_resetflow/", Icon: Instagram },
  { label: "facebook", value: "softresetflow", href: "https://www.facebook.com/softresetflow/", Icon: Facebook },
] as const;

function Contact() {
  return (
    <section className="mx-auto max-w-2xl px-6 pt-20 pb-24">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">say hello</p>
      <h1 className="mt-4 font-display text-5xl md:text-6xl text-gradient leading-tight">let's stay in touch</h1>
      <p className="mt-6 text-muted-foreground leading-relaxed">
        we read everything. replies are slow but real. for questions, partnerships, accessibility feedback, or just to share what a reset article meant to you — we're here.
      </p>

      <div className="mt-12 space-y-3">
        {links.map(({ label, value, href, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group glass flex items-center gap-4 rounded-2xl p-5 hover:bg-white/[0.04] transition-colors"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{label}</p>
              <p className="font-display text-lg text-foreground/95 group-hover:text-foreground">{value}</p>
            </div>
          </a>
        ))}
      </div>

      <p className="mt-12 text-sm text-muted-foreground italic">
        for press or partnerships, mention "press" in the subject so we can prioritize.
      </p>
    </section>
  );
}
