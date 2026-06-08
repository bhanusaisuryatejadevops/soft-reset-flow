import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Sparkles, RefreshCw, Battery, Clock, HeartPulse, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const BASE = "https://www.resetflow.site";

export const Route = createFileRoute("/routine")({
  head: () => ({
    meta: [
      { title: "Tiny Reset Routine — reset" },
      {
        name: "description",
        content:
          "tell us how you feel and we'll hand you a tiny, gentle routine. small steps for tired days.",
      },
      { property: "og:title", content: "Tiny Reset Routine — reset" },
      {
        property: "og:description",
        content:
          "a quiet routine generator for low-energy days. tiny acts that still count.",
      },
      { property: "og:url", content: `${BASE}/routine` },
    ],
    links: [{ rel: "canonical", href: `${BASE}/routine` }],
  }),
  component: RoutinePage,
});

type Energy = "low" | "medium" | "high";
type TimeBudget = "2" | "5" | "10" | "20";
type Emotion = "tired" | "anxious" | "numb" | "sad" | "restless" | "okay";

const energyOptions: { key: Energy; label: string; hint: string }[] = [
  { key: "low", label: "barely there", hint: "running on fumes" },
  { key: "medium", label: "soft middle", hint: "slow but here" },
  { key: "high", label: "a little spark", hint: "ready to move gently" },
];

const timeOptions: { key: TimeBudget; label: string }[] = [
  { key: "2", label: "2 min" },
  { key: "5", label: "5 min" },
  { key: "10", label: "10 min" },
  { key: "20", label: "20 min" },
];

const emotionOptions: { key: Emotion; label: string }[] = [
  { key: "tired", label: "tired" },
  { key: "anxious", label: "anxious" },
  { key: "numb", label: "numb" },
  { key: "sad", label: "sad" },
  { key: "restless", label: "restless" },
  { key: "okay", label: "okay-ish" },
];

// Each step has an estimated minute weight.
type Step = { text: string; minutes: number };

const pools: Record<Emotion, Step[]> = {
  tired: [
    { text: "drink a full glass of water, slowly", minutes: 1 },
    { text: "open a window for one minute of fresh air", minutes: 1 },
    { text: "lie down and close your eyes for 60 seconds", minutes: 1 },
    { text: "stretch your arms above your head three times", minutes: 1 },
    { text: "make a warm drink and hold the cup with both hands", minutes: 5 },
    { text: "wash your face with cool water", minutes: 2 },
    { text: "change into something soft", minutes: 3 },
  ],
  anxious: [
    { text: "breathe slowly for 60 seconds — in 4, out 6", minutes: 1 },
    { text: "name 5 things you can see right now", minutes: 1 },
    { text: "press your feet into the floor for 30 seconds", minutes: 1 },
    { text: "splash cool water on your wrists", minutes: 1 },
    { text: "write down one worry, then close the notebook", minutes: 3 },
    { text: "stretch your shoulders gently for 2 minutes", minutes: 2 },
    { text: "step outside and look at the sky", minutes: 5 },
  ],
  numb: [
    { text: "place a hand on your chest and notice it rise", minutes: 1 },
    { text: "play one song you used to love", minutes: 4 },
    { text: "wash your hands with warm water, slowly", minutes: 2 },
    { text: "open a window and feel the air on your face", minutes: 1 },
    { text: "step barefoot onto the floor for a minute", minutes: 1 },
    { text: "light a candle or turn on a soft lamp", minutes: 1 },
    { text: "look out a window for 2 quiet minutes", minutes: 2 },
  ],
  sad: [
    { text: "let yourself sit still for one minute", minutes: 1 },
    { text: "wrap a blanket around your shoulders", minutes: 1 },
    { text: "drink something warm", minutes: 5 },
    { text: "write one kind sentence to yourself", minutes: 2 },
    { text: "play a song that feels like a hug", minutes: 4 },
    { text: "text someone gentle, even just a heart", minutes: 2 },
    { text: "look at one photo that made you smile", minutes: 1 },
  ],
  restless: [
    { text: "stretch slowly for 2 minutes", minutes: 2 },
    { text: "tidy one small surface near you", minutes: 5 },
    { text: "walk around your room for 3 minutes", minutes: 3 },
    { text: "take 10 deep breaths in front of a window", minutes: 2 },
    { text: "rinse a few dishes mindfully", minutes: 5 },
    { text: "step outside for 5 quiet minutes", minutes: 5 },
    { text: "put your phone in another room briefly", minutes: 1 },
  ],
  okay: [
    { text: "drink some water", minutes: 1 },
    { text: "open the curtains a little wider", minutes: 1 },
    { text: "make your bed softly", minutes: 3 },
    { text: "clean one small thing", minutes: 5 },
    { text: "write one line about today", minutes: 2 },
    { text: "stretch for 2 minutes", minutes: 2 },
    { text: "take a slow walk around the room", minutes: 3 },
  ],
};

const openings: Record<Emotion, string> = {
  tired: "no pressure. just the smallest moves.",
  anxious: "soften your shoulders. we'll go slowly.",
  numb: "tiny touches of warmth. nothing more.",
  sad: "you're allowed to take it easy tonight.",
  restless: "let's give the energy somewhere quiet to land.",
  okay: "a soft little routine to keep the calm.",
};

function generate(energy: Energy, time: TimeBudget, emotion: Emotion, seed: number): Step[] {
  const budget = parseInt(time, 10);
  const pool = [...pools[emotion]];
  // shuffle deterministically with seed
  const shuffled = pool
    .map((s, i) => ({ s, k: Math.sin(seed + i) }))
    .sort((a, b) => a.k - b.k)
    .map((x) => x.s);

  const maxSteps = energy === "low" ? 3 : energy === "medium" ? 4 : 5;
  const picked: Step[] = [];
  let used = 0;
  for (const step of shuffled) {
    if (picked.length >= maxSteps) break;
    if (used + step.minutes <= budget) {
      picked.push(step);
      used += step.minutes;
    }
  }
  if (picked.length === 0 && shuffled.length > 0) picked.push(shuffled[0]);
  return picked;
}

function RoutinePage() {
  const [energy, setEnergy] = useState<Energy | null>(null);
  const [time, setTime] = useState<TimeBudget | null>(null);
  const [emotion, setEmotion] = useState<Emotion | null>(null);
  const [seed, setSeed] = useState(1);
  const [done, setDone] = useState<Set<number>>(new Set());

  const ready = energy && time && emotion;
  const steps = useMemo(
    () => (ready ? generate(energy!, time!, emotion!, seed) : []),
    [energy, time, emotion, seed, ready]
  );

  const regenerate = () => {
    setSeed((s) => s + Math.floor(Math.random() * 100) + 1);
    setDone(new Set());
  };

  const reset = () => {
    setEnergy(null);
    setTime(null);
    setEmotion(null);
    setDone(new Set());
    setSeed(1);
  };

  const toggle = (i: number) => {
    setDone((d) => {
      const n = new Set(d);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });
  };

  return (
    <section className="relative mx-auto max-w-3xl px-6 pt-16 pb-32">
      <div className="text-center animate-fade-up">
        <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          tiny reset routine
        </span>
        <h1 className="mt-6 font-display text-4xl md:text-5xl tracking-tight">
          a small routine, made for right now
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          tell us how today feels. we'll hand back something small, soft, and doable.
        </p>
      </div>

      {!ready && (
        <div className="mt-14 space-y-10 animate-fade-up">
          <Group icon={<Battery className="h-4 w-4" />} title="how's your energy?">
            <div className="grid sm:grid-cols-3 gap-3">
              {energyOptions.map((o) => (
                <Choice
                  key={o.key}
                  selected={energy === o.key}
                  onClick={() => setEnergy(o.key)}
                  label={o.label}
                  hint={o.hint}
                />
              ))}
            </div>
          </Group>

          <Group icon={<Clock className="h-4 w-4" />} title="how much time do you have?">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {timeOptions.map((o) => (
                <Choice
                  key={o.key}
                  selected={time === o.key}
                  onClick={() => setTime(o.key)}
                  label={o.label}
                />
              ))}
            </div>
          </Group>

          <Group icon={<HeartPulse className="h-4 w-4" />} title="and emotionally?">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {emotionOptions.map((o) => (
                <Choice
                  key={o.key}
                  selected={emotion === o.key}
                  onClick={() => setEmotion(o.key)}
                  label={o.label}
                />
              ))}
            </div>
          </Group>
        </div>
      )}

      {ready && (
        <div className="mt-14 animate-fade-up">
          <div className="glass-strong rounded-3xl p-8 md:p-10 ember-glow">
            <p className="font-display text-lg text-muted-foreground italic">
              {openings[emotion!]}
            </p>
            <ul className="mt-6 space-y-3">
              {steps.map((s, i) => {
                const isDone = done.has(i);
                return (
                  <li
                    key={`${seed}-${i}`}
                    className="animate-fade-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <button
                      onClick={() => toggle(i)}
                      className={`w-full text-left flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] px-5 py-4 transition-all ${
                        isDone ? "opacity-60" : ""
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${
                          isDone
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-white/15 bg-white/[0.03]"
                        }`}
                      >
                        {isDone && <Check className="h-3.5 w-3.5" />}
                      </span>
                      <span
                        className={`text-base md:text-lg ${
                          isDone ? "line-through text-muted-foreground" : "text-foreground/90"
                        }`}
                      >
                        {s.text}
                      </span>
                      <span className="ml-auto text-xs text-muted-foreground shrink-0 pt-1">
                        {s.minutes}m
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={regenerate} className="rounded-full">
                <RefreshCw className="h-4 w-4" />
                give me another
              </Button>
              <Button variant="ghost" onClick={reset} className="rounded-full">
                start over
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground italic font-display">
            doing one is enough. doing none is also okay.
          </p>
        </div>
      )}
    </section>
  );
}

function Group({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary">
          {icon}
        </span>
        {title}
      </div>
      {children}
    </div>
  );
}

function Choice({
  selected,
  onClick,
  label,
  hint,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  hint?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative rounded-2xl px-5 py-4 text-left transition-all border ${
        selected
          ? "border-primary/40 bg-primary/10 ember-glow"
          : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10"
      }`}
    >
      <div className="font-display text-base">{label}</div>
      {hint && <div className="text-xs text-muted-foreground mt-0.5">{hint}</div>}
    </button>
  );
}
