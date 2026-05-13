import { createFileRoute } from "@tanstack/react-router";
import { Waitlist } from "@/components/site/Waitlist";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "about — reset" },
      { name: "description", content: "reset is a quiet space for emotionally overwhelmed minds. built slowly, with care, for the days you have nothing left." },
      { property: "og:title", content: "about — reset" },
      { property: "og:description", content: "a quiet space for emotionally overwhelmed minds." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground animate-fade-up">about</p>
        <h1 className="mt-4 font-display text-5xl md:text-6xl text-gradient animate-fade-up" style={{ animationDelay: "0.1s" }}>
          a soft place to begin again
        </h1>

        <div className="mt-12 space-y-8 text-lg leading-relaxed text-muted-foreground animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <p>
            reset was made for the days where everything feels like too much — when you
            open another productivity app and it just adds to the noise.
          </p>
          <p className="text-foreground/90">
            no streaks shouting at you. no dashboards. no optimization. just quiet rooms
            with one small thing to do.
          </p>
          <p>
            it's for tired creatives, soft overachievers, students recovering from burnout,
            and anyone trying to come back to themselves — slowly.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-3 gap-4">
          {[
            { t: "soft by design", d: "no pressure, no streak guilt." },
            { t: "tiny by default", d: "every tool fits in 2–10 minutes." },
            { t: "cinematic calm", d: "interfaces that feel like rest." },
          ].map((c) => (
            <div key={c.t} className="glass rounded-2xl p-6">
              <p className="font-display text-lg">{c.t}</p>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <Waitlist />
    </>
  );
}
