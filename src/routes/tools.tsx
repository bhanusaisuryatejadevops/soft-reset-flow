import { createFileRoute } from "@tanstack/react-router";
import { Flame, Sparkles, Timer, HeartHandshake, Trophy, NotebookPen } from "lucide-react";
import { ToolCard } from "@/components/site/ToolCard";
import { Waitlist } from "@/components/site/Waitlist";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "tools — reset" },
      { name: "description", content: "a calm collection of emotional productivity tools: burnout checker, focus timer, mood mirror, tiny reset routines and more." },
      { property: "og:title", content: "tools — reset" },
      { property: "og:description", content: "a calm collection of emotional productivity tools." },
    ],
    links: [{ rel: "canonical", href: "/tools" }],
  }),
  component: ToolsPage,
});

const tools = [
  { icon: Flame, title: "Burnout Checker", description: "a short, soft self-check to name what you're carrying.", tag: "2 min" },
  { icon: Sparkles, title: "Tiny Reset Routine", description: "small achievable rituals matched to your energy today.", tag: "ritual" },
  { icon: Timer, title: "Focus Timer", description: "a minimal pomodoro built for slow, gentle focus.", tag: "timer" },
  { icon: HeartHandshake, title: "Mood Mirror", description: "track how you feel and notice the patterns underneath.", tag: "daily" },
  { icon: Trophy, title: "Small Wins Tracker", description: "tiny achievements, quiet streaks, real momentum.", tag: "streaks" },
  { icon: NotebookPen, title: "Reset Journal", description: "a calming space to write the things you don't say out loud.", tag: "journal" },
];

function ToolsPage() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-12 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground animate-fade-up">the toolkit</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl text-gradient animate-fade-up" style={{ animationDelay: "0.1s" }}>
          quiet tools for tired days
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground animate-fade-up" style={{ animationDelay: "0.2s" }}>
          choose one. that's enough. you don't have to use all of them — just the one that
          fits the day you're having.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => <ToolCard key={t.title} {...t} />)}
        </div>
      </section>

      <div className="mt-24"><Waitlist /></div>
    </>
  );
}
