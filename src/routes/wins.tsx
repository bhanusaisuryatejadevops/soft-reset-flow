import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Sparkles, Plus, Check, Trash2, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/wins")({
  head: () => ({
    meta: [
      { title: "Small Wins — reset" },
      {
        name: "description",
        content:
          "a quiet place to collect tiny wins. drank water. got out of bed. replied to a message. small progress still counts.",
      },
      { property: "og:title", content: "Small Wins — reset" },
      {
        property: "og:description",
        content:
          "track tiny achievements with a calming streak. no pressure, no productivity guilt.",
      },
    ],
  }),
  component: WinsPage,
});

type Win = { id: string; text: string; done: boolean; at: number };

const STORAGE = "reset.wins.v1";
const STREAK_KEY = "reset.wins.streak.v1";

const suggestions = [
  "drank water",
  "got out of bed",
  "replied to one message",
  "studied 10 minutes",
  "opened a window",
  "took a slow breath",
];

const reinforcements = [
  "small progress still counts.",
  "you showed up. that's the win.",
  "tiny is enough today.",
  "soft steps still move you forward.",
  "this matters more than it feels.",
];

function load(): Win[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE);
    return raw ? (JSON.parse(raw) as Win[]) : [];
  } catch {
    return [];
  }
}

function save(wins: Win[]) {
  try {
    localStorage.setItem(STORAGE, JSON.stringify(wins));
  } catch {}
}

function loadStreak(): { count: number; lastDay: string | null } {
  if (typeof window === "undefined") return { count: 0, lastDay: null };
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    return raw ? JSON.parse(raw) : { count: 0, lastDay: null };
  } catch {
    return { count: 0, lastDay: null };
  }
}

function saveStreak(s: { count: number; lastDay: string | null }) {
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(s));
  } catch {}
}

function dayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function WinsPage() {
  const [wins, setWins] = useState<Win[]>([]);
  const [text, setText] = useState("");
  const [streak, setStreak] = useState({ count: 0, lastDay: null as string | null });
  const [pulse, setPulse] = useState<string | null>(null);

  useEffect(() => {
    setWins(load());
    setStreak(loadStreak());
  }, []);

  useEffect(() => {
    save(wins);
  }, [wins]);

  const completedToday = useMemo(() => {
    const today = dayKey();
    return wins.filter((w) => w.done && dayKey(new Date(w.at)) === today).length;
  }, [wins]);

  const bumpStreak = () => {
    const today = dayKey();
    setStreak((prev) => {
      if (prev.lastDay === today) return prev;
      const yesterday = dayKey(new Date(Date.now() - 86400000));
      const next = {
        count: prev.lastDay === yesterday ? prev.count + 1 : 1,
        lastDay: today,
      };
      saveStreak(next);
      return next;
    });
  };

  const add = () => {
    const t = text.trim();
    if (!t) return;
    const w: Win = { id: crypto.randomUUID(), text: t, done: false, at: Date.now() };
    setWins((prev) => [w, ...prev]);
    setText("");
  };

  const toggle = (id: string) => {
    setWins((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        const becomingDone = !w.done;
        if (becomingDone) {
          bumpStreak();
          const msg = reinforcements[Math.floor(Math.random() * reinforcements.length)];
          setPulse(msg);
          setTimeout(() => setPulse(null), 2600);
        }
        return { ...w, done: becomingDone, at: becomingDone ? Date.now() : w.at };
      })
    );
  };

  const remove = (id: string) => setWins((prev) => prev.filter((w) => w.id !== id));

  const useSuggestion = (s: string) => {
    setText(s);
  };

  return (
    <section className="relative mx-auto max-w-3xl px-6 pt-16 pb-32">
      <div className="text-center animate-fade-up">
        <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          small wins
        </span>
        <h1 className="mt-6 font-display text-4xl md:text-5xl tracking-tight">
          collect the quiet things you did
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          this isn't a checklist. it's a soft record of how you kept going.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 animate-fade-up">
        <div className="glass-strong rounded-2xl p-6 ember-glow">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Flame className="h-5 w-5" />
            </span>
            <div>
              <div className="font-display text-2xl">{streak.count}</div>
              <div className="text-xs text-muted-foreground">gentle day streak</div>
            </div>
          </div>
        </div>
        <div className="glass-strong rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Check className="h-5 w-5" />
            </span>
            <div>
              <div className="font-display text-2xl">{completedToday}</div>
              <div className="text-xs text-muted-foreground">tiny wins today</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 glass rounded-2xl p-5 animate-fade-up">
        <div className="flex gap-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="something tiny you did, or want to do..."
            className="bg-white/[0.03] border-white/10 rounded-xl h-11"
          />
          <Button onClick={add} className="rounded-xl h-11 px-5">
            <Plus className="h-4 w-4" />
            add
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => useSuggestion(s)}
              className="text-xs rounded-full border border-white/10 px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {pulse && (
        <p className="mt-6 text-center text-sm text-primary/90 italic font-display animate-fade-up">
          {pulse}
        </p>
      )}

      <ul className="mt-8 space-y-3">
        {wins.length === 0 && (
          <li className="text-center text-sm text-muted-foreground italic font-display py-10">
            nothing here yet. add one tiny thing — even existing today counts.
          </li>
        )}
        {wins.map((w, i) => (
          <li
            key={w.id}
            className="animate-fade-up"
            style={{ animationDelay: `${Math.min(i, 6) * 60}ms` }}
          >
            <div
              className={`flex items-start gap-4 rounded-2xl border border-white/5 px-5 py-4 transition-all ${
                w.done ? "bg-primary/[0.06] opacity-80" : "bg-white/[0.02] hover:bg-white/[0.05]"
              }`}
            >
              <button
                onClick={() => toggle(w.id)}
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${
                  w.done
                    ? "bg-primary border-primary text-primary-foreground ember-glow"
                    : "border-white/15 bg-white/[0.03] hover:border-primary/40"
                }`}
                aria-label={w.done ? "uncomplete" : "complete"}
              >
                {w.done && <Check className="h-3.5 w-3.5" />}
              </button>
              <span
                className={`flex-1 text-base ${
                  w.done ? "line-through text-muted-foreground" : "text-foreground/90"
                }`}
              >
                {w.text}
              </span>
              <button
                onClick={() => remove(w.id)}
                className="text-muted-foreground hover:text-foreground/80 transition-colors"
                aria-label="remove"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-12 text-center text-sm text-muted-foreground italic font-display">
        you don't have to earn rest. but if today was hard and you're still here — that's the win.
      </p>
    </section>
  );
}
