import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Sparkles, Timer, HeartHandshake, Trophy, NotebookPen, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import quoteImg from "@/assets/quote.jpg";
import { ToolCard } from "@/components/site/ToolCard";
import { Waitlist } from "@/components/site/Waitlist";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "reset — for the days you feel mentally exhausted" },
      { name: "description", content: "quiet tools for rebuilding your routines slowly. burnout checks, tiny rituals, focus timers, and calm journaling." },
      { property: "og:title", content: "reset — for the days you feel mentally exhausted" },
      { property: "og:description", content: "quiet tools for rebuilding your routines slowly." },
    ],
  }),
  component: Home,
});

const tools = [
  { icon: Flame, title: "Burnout Checker", description: "a short, soft self-check to name what you're carrying.", tag: "2 min" },
  { icon: Sparkles, title: "Tiny Reset Routine", description: "small achievable rituals matched to your energy today.", tag: "ritual" },
  { icon: Timer, title: "Focus Timer", description: "a minimal pomodoro built for slow, gentle focus.", tag: "timer" },
  { icon: HeartHandshake, title: "Mood Mirror", description: "track how you feel and notice the patterns underneath.", tag: "daily" },
  { icon: Trophy, title: "Small Wins Tracker", description: "tiny achievements, quiet streaks, real momentum.", tag: "streaks" },
  { icon: NotebookPen, title: "Reset Journal", description: "a calming space to write the things you don't say out loud.", tag: "journal" },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-16 md:pt-24 pb-32">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt=""
            width={1600}
            height={1200}
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>

        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="animate-fade-up inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-glow-pulse" />
            quiet productivity, in soft launch
          </div>

          <h1 className="animate-fade-up mt-8 font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-gradient" style={{ animationDelay: "0.1s" }}>
            for the days<br />you feel mentally exhausted
          </h1>

          <p className="animate-fade-up mx-auto mt-7 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed" style={{ animationDelay: "0.2s" }}>
            quiet tools for rebuilding your routines slowly.
          </p>

          <div className="animate-fade-up mt-10 flex flex-col sm:flex-row gap-3 justify-center" style={{ animationDelay: "0.3s" }}>
            <Link
              to="/journal"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all ember-glow"
            >
              start reset
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/tools"
              className="inline-flex items-center justify-center rounded-full glass px-7 py-3.5 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              explore tools
            </Link>
          </div>

          <div className="animate-fade-up mt-20 grid grid-cols-3 gap-6 max-w-md mx-auto text-center" style={{ animationDelay: "0.5s" }}>
            {[
              { n: "6", l: "soft tools" },
              { n: "∞", l: "tiny resets" },
              { n: "0", l: "pressure" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl text-foreground/90">{s.n}</div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="relative mx-auto max-w-6xl px-6 py-20" id="tools">
        <div className="mb-14 flex items-end justify-between flex-wrap gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">featured tools</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl text-gradient">a quiet little toolkit</h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            built for low-energy days. each one takes minutes — never demands more than you have.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => <ToolCard key={t.title} {...t} />)}
        </div>
      </section>

      {/* QUOTE */}
      <section className="relative my-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] glass-strong">
            <img
              src={quoteImg}
              alt=""
              width={1600}
              height={900}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
            <div className="relative px-10 md:px-20 py-24 md:py-32 max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">a reminder</p>
              <blockquote className="mt-6 font-display text-4xl md:text-6xl leading-[1.1] text-gradient">
                rebuilding slowly is still progress.
              </blockquote>
              <p className="mt-6 text-muted-foreground italic">— a note for the tired</p>
            </div>
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <Waitlist />
    </>
  );
}
