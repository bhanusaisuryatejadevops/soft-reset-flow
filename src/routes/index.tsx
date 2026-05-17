import { createFileRoute, Link } from "@tanstack/react-router";
import { Moon, Wind, Feather, Heart, Stars, Coffee } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import quoteImg from "@/assets/quote.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "reset — a quiet place for tired hearts" },
      { name: "description", content: "a soft cinematic corner of the internet for the emotionally overwhelmed. calming visuals, gentle reflections, tiny rituals." },
      { property: "og:title", content: "reset — a quiet place for tired hearts" },
      { property: "og:description", content: "a soft place to return to when the world feels loud." },
    ],
  }),
  component: Home,
});

const reflections = [
  "what felt heavier today than it needed to?",
  "where did you soften, even a little?",
  "what would you whisper to yourself, if no one was listening?",
  "what kindness can you keep for tomorrow?",
];

const rituals = [
  { icon: Wind, title: "open a window", line: "let the room breathe with you." },
  { icon: Coffee, title: "warm something", line: "hold a cup. let the warmth reach further than your hands." },
  { icon: Feather, title: "stretch slowly", line: "uncurl one small part of your body." },
  { icon: Stars, title: "name one good thing", line: "it doesn't have to be big. it just has to be true." },
];

const nightThoughts = [
  "you are allowed to rest without finishing.",
  "the day did not need to be perfect to count.",
  "softness is not the same as giving up.",
  "tomorrow doesn't need a plan tonight.",
];

function Home() {
  return (
    <>
      {/* HERO — emotional, cinematic */}
      <section className="relative pt-20 md:pt-32 pb-40 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt=""
            width={1600}
            height={1200}
            className="h-full w-full object-cover opacity-40 animate-float"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
          <div aria-hidden className="absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-primary/15 blur-3xl animate-glow-pulse" />
          <div aria-hidden className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-accent/15 blur-3xl animate-glow-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="animate-fade-up inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground">
            <Moon className="h-3 w-3 text-primary" />
            a quiet place on the internet
          </div>

          <h1 className="animate-fade-up mt-10 font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] text-gradient" style={{ animationDelay: "0.1s" }}>
            breathe.<br />you made it here.
          </h1>

          <p className="animate-fade-up mx-auto mt-8 max-w-lg text-base md:text-lg text-muted-foreground leading-relaxed italic" style={{ animationDelay: "0.2s" }}>
            nothing to fix tonight. nothing to optimize.<br />
            just a soft corner for whatever you're carrying.
          </p>

          <div className="animate-fade-up mt-12 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground" style={{ animationDelay: "0.4s" }}>
            <span className="h-px w-10 bg-border" />
            stay as long as you need
            <span className="h-px w-10 bg-border" />
          </div>
        </div>
      </section>

      {/* DAILY CALMING QUOTE */}
      <section className="relative my-20 md:my-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] glass-strong">
            <img
              src={quoteImg}
              alt=""
              width={1600}
              height={900}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-55"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
            <div className="relative px-8 md:px-20 py-20 md:py-32 max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">tonight's reminder</p>
              <blockquote className="mt-6 font-display text-3xl md:text-5xl leading-[1.15] text-gradient">
                you are not behind.<br />you are becoming.
              </blockquote>
              <p className="mt-6 text-sm text-muted-foreground italic">— a note left for the tired</p>
            </div>
          </div>
        </div>
      </section>

      {/* GENTLE REFLECTION PROMPTS */}
      <section className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">soft questions</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-gradient">things to think about, gently</h2>
          <p className="mt-5 max-w-md mx-auto text-muted-foreground">
            no right answers. no journals required. just let one of these sit with you.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {reflections.map((r, i) => (
            <div
              key={r}
              className="glass rounded-3xl p-8 md:p-10 transition-all duration-700 hover:-translate-y-1 hover:border-primary/20 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Feather className="h-5 w-5 text-primary/80 mb-5" />
              <p className="font-display text-xl md:text-2xl leading-relaxed text-foreground/90">
                {r}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SOFT FOCUS AMBIENCE */}
      <section className="relative my-24 md:my-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] glass-strong px-8 md:px-16 py-20 md:py-28 text-center">
            <div aria-hidden className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-glow-pulse" />
            <div aria-hidden className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent/15 blur-3xl animate-glow-pulse" style={{ animationDelay: "3s" }} />

            <div className="relative">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">soft focus</p>
              <h2 className="mt-5 font-display text-4xl md:text-6xl text-gradient leading-[1.1]">
                let the room get quieter<br />than your thoughts
              </h2>
              <p className="mx-auto mt-7 max-w-xl text-muted-foreground italic">
                close one tab. dim one light. nothing else needs you for the next sixty seconds.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {["low light", "slow breath", "warm sound", "still hands"].map((w) => (
                  <span key={w} className="glass rounded-full px-4 py-2">{w}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TINY EMOTIONAL RESET RITUALS */}
      <section className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">tiny rituals</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-gradient">small soft things to try</h2>
          <p className="mt-5 max-w-md mx-auto text-muted-foreground">
            tiny on purpose. choose one. or don't. either is okay.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rituals.map((r, i) => (
            <div
              key={r.title}
              className="group glass rounded-3xl p-7 transition-all duration-700 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.3)] animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ember-glow transition-transform duration-500 group-hover:scale-110">
                <r.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-display text-xl text-foreground/95">{r.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.line}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMFORTING NIGHTTIME THOUGHTS */}
      <section className="relative my-24 md:my-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Moon className="mx-auto h-6 w-6 text-primary/80 animate-float" />
          <p className="mt-5 text-xs uppercase tracking-[0.3em] text-muted-foreground">for the late hours</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-gradient">things to hold onto tonight</h2>

          <div className="mt-14 space-y-6">
            {nightThoughts.map((t, i) => (
              <p
                key={t}
                className="font-display text-2xl md:text-3xl leading-relaxed text-foreground/85 animate-fade-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {t}
              </p>
            ))}
          </div>

          <div className="mt-16 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-px w-10 bg-border" />
            close the tab gently
            <span className="h-px w-10 bg-border" />
          </div>
        </div>
      </section>

      {/* CALMING EMOTIONAL FOOTER CTA */}
      <section className="relative mx-auto max-w-4xl px-6 pb-24">
        <div className="glass-strong relative overflow-hidden rounded-[2.5rem] px-8 md:px-16 py-16 md:py-20 text-center">
          <div aria-hidden className="absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-primary/25 blur-3xl animate-glow-pulse" />
          <div className="relative">
            <Heart className="mx-auto h-5 w-5 text-primary" />
            <h3 className="mt-5 font-display text-3xl md:text-4xl text-gradient leading-tight">
              when you need somewhere<br />quiet again — we'll be here.
            </h3>
            <p className="mt-5 text-sm text-muted-foreground italic max-w-md mx-auto">
              no notifications. no streaks chasing you. just a soft place to come back to.
            </p>
            <Link
              to="/tools"
              className="mt-9 inline-flex items-center justify-center rounded-full glass px-7 py-3.5 text-sm text-foreground/90 hover:bg-white/10 transition-colors"
            >
              wander the quiet tools
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
