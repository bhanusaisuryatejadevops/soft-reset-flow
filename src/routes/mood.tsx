import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Battery,
  Wind,
  CloudOff,
  Leaf,
  Sunrise,
  Waves,
  Sparkles,
} from "lucide-react";

const BASE = "https://www.resetflow.site";

export const Route = createFileRoute("/mood")({
  head: () => ({
    meta: [
      { title: "Mood Mirror — reset" },
      {
        name: "description",
        content:
          "a soft mirror for whatever you are feeling tonight. choose a mood, receive a quiet reflection, and write it down if you need to.",
      },
      { property: "og:title", content: "Mood Mirror — reset" },
      {
        property: "og:description",
        content:
          "quiet emotional reflections for tired hearts. mood-based prompts and a private space to write.",
      },
      { property: "og:url", content: `${BASE}/mood` },
    ],
    links: [{ rel: "canonical", href: `${BASE}/mood` }],
  }),
  component: MoodPage,
});

type MoodKey =
  | "tired"
  | "anxious"
  | "numb"
  | "calm"
  | "hopeful"
  | "overwhelmed";

const moods: {
  key: MoodKey;
  label: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
  glow: string;
  reflections: string[];
}[] = [
  {
    key: "tired",
    label: "tired",
    hint: "soft and heavy",
    icon: Battery,
    glow: "oklch(0.55 0.12 60)",
    reflections: [
      "rest is productive too.",
      "you do not need to solve your whole life tonight.",
      "closing your eyes is a kind of bravery.",
    ],
  },
  {
    key: "anxious",
    label: "anxious",
    hint: "fast and tight",
    icon: Wind,
    glow: "oklch(0.6 0.12 280)",
    reflections: [
      "your nervous system is doing its best. so are you.",
      "you are allowed to slow down before you understand why.",
      "breathe. nothing has to be decided in this minute.",
    ],
  },
  {
    key: "numb",
    label: "numb",
    hint: "quiet and far",
    icon: CloudOff,
    glow: "oklch(0.5 0.04 240)",
    reflections: [
      "feeling nothing is still feeling something.",
      "you do not have to perform an emotion you do not have.",
      "softness will come back. it always does.",
    ],
  },
  {
    key: "calm",
    label: "calm",
    hint: "still and warm",
    icon: Leaf,
    glow: "oklch(0.65 0.1 160)",
    reflections: [
      "stay here a little longer. you have earned this quiet.",
      "this is what your future self was hoping for.",
      "calm is not boring. calm is healing.",
    ],
  },
  {
    key: "hopeful",
    label: "hopeful",
    hint: "small and bright",
    icon: Sunrise,
    glow: "oklch(0.7 0.13 70)",
    reflections: [
      "small steps still count.",
      "this little spark is real. protect it.",
      "you are allowed to want more for yourself.",
    ],
  },
  {
    key: "overwhelmed",
    label: "overwhelmed",
    hint: "loud and full",
    icon: Waves,
    glow: "oklch(0.55 0.14 320)",
    reflections: [
      "you do not have to carry all of it tonight.",
      "one thing. just one. the rest can wait.",
      "your feelings are not too much. they are just very real.",
    ],
  },
];

type Entry = {
  mood: MoodKey;
  reflection: string;
  note: string;
  at: number;
};

const STORAGE_KEY = "reset.mood.history.v1";

function loadHistory(): Entry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Entry[];
    return Array.isArray(parsed) ? parsed.slice(0, 12) : [];
  } catch {
    return [];
  }
}

function saveHistory(entries: Entry[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, 12)));
  } catch {
    /* ignore */
  }
}

function formatWhen(at: number) {
  const d = new Date(at);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function MoodPage() {
  const [selected, setSelected] = useState<MoodKey | null>(null);
  const [reflection, setReflection] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [history, setHistory] = useState<Entry[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const current = useMemo(
    () => moods.find((m) => m.key === selected) ?? null,
    [selected],
  );

  function pick(mood: MoodKey) {
    const m = moods.find((x) => x.key === mood)!;
    const r = m.reflections[Math.floor(Math.random() * m.reflections.length)];
    setSelected(mood);
    setReflection(r);
    setNote("");
    setSaved(false);
  }

  function save() {
    if (!selected) return;
    const entry: Entry = {
      mood: selected,
      reflection,
      note: note.trim(),
      at: Date.now(),
    };
    const next = [entry, ...history].slice(0, 12);
    setHistory(next);
    saveHistory(next);
    setSaved(true);
  }

  function clearHistory() {
    setHistory([]);
    saveHistory([]);
  }

  return (
    <div className="relative">
      <section className="mx-auto max-w-5xl px-6 pt-16 md:pt-24 pb-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground animate-fade-up">
          mood mirror
        </p>
        <h1 className="mt-5 font-display text-4xl md:text-6xl leading-[1.05] tracking-tight animate-fade-up">
          how are you,
          <br />
          <span className="italic text-primary/90">really</span>?
        </h1>
        <p
          className="mt-6 text-muted-foreground max-w-xl mx-auto leading-relaxed animate-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          choose what is closest to true tonight. there are no right answers, only
          honest ones. your mood stays on this device.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {moods.map((m, i) => {
            const Icon = m.icon;
            const active = selected === m.key;
            return (
              <button
                key={m.key}
                onClick={() => pick(m.key)}
                className={`group relative text-left rounded-2xl glass p-5 md:p-6 transition-all duration-500 hover:-translate-y-1 animate-fade-up ${
                  active ? "ring-1 ring-primary/40" : ""
                }`}
                style={{
                  animationDelay: `${i * 60}ms`,
                  boxShadow: active
                    ? `0 0 60px -10px ${m.glow}`
                    : undefined,
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(120% 80% at 50% 0%, ${m.glow}22, transparent 70%)`,
                  }}
                />
                <div
                  className="relative flex h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    background: `${m.glow}26`,
                    boxShadow: `0 0 24px -6px ${m.glow}`,
                  }}
                >
                  <Icon className="h-5 w-5 text-foreground/90" />
                </div>
                <div className="mt-4 font-display text-xl">{m.label}</div>
                <div className="text-sm text-muted-foreground">{m.hint}</div>
              </button>
            );
          })}
        </div>
      </section>

      {current && (
        <section
          key={current.key + reflection}
          className="mx-auto max-w-3xl px-6 mt-14 animate-fade-up"
        >
          <div
            className="glass-strong rounded-3xl p-8 md:p-12 relative overflow-hidden"
            style={{
              boxShadow: `0 30px 120px -40px ${current.glow}`,
            }}
          >
            <div
              aria-hidden
              className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-[100px] opacity-40"
              style={{ background: current.glow }}
            />
            <div className="relative">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                a soft reflection
              </div>
              <p className="mt-5 font-display text-2xl md:text-4xl leading-snug">
                “{reflection}”
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                for when you feel{" "}
                <span className="text-foreground/80">{current.label}</span>.
              </p>

              <div className="mt-8">
                <label
                  htmlFor="note"
                  className="block text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3"
                >
                  optional · write it down
                </label>
                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="one sentence is enough. nobody is reading."
                  rows={4}
                  className="w-full resize-none rounded-2xl bg-white/5 border border-white/10 focus:border-primary/40 focus:outline-none p-4 text-sm leading-relaxed placeholder:text-muted-foreground/60 transition-colors"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => pick(current.key)}
                  className="rounded-full px-5 py-2.5 text-sm border border-white/10 hover:bg-white/5 transition-colors"
                >
                  another reflection
                </button>
                <button
                  onClick={save}
                  className="rounded-full px-5 py-2.5 text-sm bg-primary/90 text-primary-foreground hover:bg-primary transition-colors"
                >
                  {saved ? "saved softly" : "save this moment"}
                </button>
                <button
                  onClick={() => {
                    setSelected(null);
                    setReflection("");
                    setNote("");
                    setSaved(false);
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto"
                >
                  let it go
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-3xl px-6 mt-20 mb-32">
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              quiet history
            </p>
            <h2 className="font-display text-2xl mt-2">moods you have visited</h2>
          </div>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              clear
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="glass rounded-2xl p-8 text-center text-muted-foreground text-sm">
            nothing yet. whatever you choose tonight will live here, gently.
          </div>
        ) : (
          <ul className="space-y-3">
            {history.map((e, i) => {
              const m = moods.find((x) => x.key === e.mood);
              return (
                <li
                  key={e.at}
                  className="glass rounded-2xl p-5 animate-fade-up"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          background: m?.glow,
                          boxShadow: `0 0 16px ${m?.glow}`,
                        }}
                      />
                      <span className="font-display">{e.mood}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatWhen(e.at)}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-foreground/80 italic">
                    “{e.reflection}”
                  </p>
                  {e.note && (
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {e.note}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
