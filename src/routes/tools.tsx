import { createFileRoute } from "@tanstack/react-router";
import { Flame, Sparkles, Timer, HeartHandshake, Trophy, NotebookPen } from "lucide-react";
import { ToolCard } from "@/components/site/ToolCard";
import { Waitlist } from "@/components/site/Waitlist";

const BASE = "https://resetflow.site";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "tools — reset" },
      { name: "description", content: "a calm collection of emotional productivity tools: burnout checker, focus timer, mood mirror, tiny reset routines and more." },
      { property: "og:title", content: "tools — reset" },
      { property: "og:description", content: "a calm collection of emotional productivity tools." },
      { property: "og:url", content: `${BASE}/tools` },
    ],
    links: [{ rel: "canonical", href: `${BASE}/tools` }],
  }),
  component: ToolsPage,
});

const tools = [
  { icon: Flame, title: "Burnout Assessment", description: "check your burnout level with a quick self-assessment.", tag: "3 min", to: "/burnout" },

  { icon: Sparkles, title: "Daily Reset Generator", description: "get one small action to reset your day.", tag: "instant", to: "/daily-reset" },

  { icon: HeartHandshake, title: "Mood Check-In", description: "track your emotions and get a gentle recommendation.", tag: "daily", to: "/mood-check" },

  { icon: Timer, title: "Focus Timer", description: "a minimal pomodoro built for slow, gentle focus.", tag: "timer", to: "/focus" },

  { icon: Trophy, title: "Small Wins Tracker", description: "tiny achievements, quiet streaks, real momentum.", tag: "streaks", to: "/wins" },

  { icon: NotebookPen, title: "Reset Journal", description: "a calming space to write the things you don't say out loud.", tag: "journal", to: "/journal" },
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
