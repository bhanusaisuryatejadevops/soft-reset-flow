import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, ArrowRight, Sparkles, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/burnout")({
  head: () => ({
    meta: [
      { title: "Burnout Checker — RESET" },
      {
        name: "description",
        content:
          "A soft, emotional burnout check-in. Seven gentle questions to understand how heavy things feel right now.",
      },
      { property: "og:title", content: "Burnout Checker — RESET" },
      {
        property: "og:description",
        content:
          "Quietly check in with yourself. Seven emotional questions, calming suggestions, no judgment.",
      },
    ],
  }),
  component: BurnoutPage,
});

type Question = { id: string; prompt: string; hint: string; low: string; high: string };

const QUESTIONS: Question[] = [
  {
    id: "tired",
    prompt: "how tired do you feel — not just in your body, but underneath everything?",
    hint: "the kind of tired sleep doesn't always reach.",
    low: "rested",
    high: "deeply tired",
  },
  {
    id: "motivation",
    prompt: "how hard has it been to care about the things you usually care about?",
    hint: "no shame either way. just notice.",
    low: "still lit up",
    high: "barely flickering",
  },
  {
    id: "overwhelm",
    prompt: "how often does small stuff feel suddenly too much?",
    hint: "the email. the dishes. the text you can't answer.",
    low: "rarely",
    high: "almost daily",
  },
  {
    id: "numb",
    prompt: "how distant do you feel from your own emotions lately?",
    hint: "not sad, not happy — just somewhere far.",
    low: "fully present",
    high: "very far away",
  },
  {
    id: "rest",
    prompt: "how guilty do you feel when you try to rest?",
    hint: "you're allowed to soften without earning it.",
    low: "no guilt",
    high: "constant guilt",
  },
  {
    id: "sleep",
    prompt: "how restless have your nights been?",
    hint: "the racing thoughts, the late scrolling, the early waking.",
    low: "calm sleep",
    high: "restless nights",
  },
  {
    id: "hope",
    prompt: "how far away does a softer week feel right now?",
    hint: "honesty here is a form of care.",
    low: "close enough",
    high: "very far",
  },
];

type Category = {
  key: string;
  title: string;
  range: [number, number];
  message: string;
  suggestions: string[];
};

const CATEGORIES: Category[] = [
  {
    key: "recovering",
    title: "slowly recovering",
    range: [0, 25],
    message:
      "something in you is already mending. keep choosing the slow, soft things.",
    suggestions: [
      "protect one quiet hour tomorrow morning",
      "write down two things that felt gentle this week",
      "let a small joy stay small — don't analyze it",
    ],
  },
  {
    key: "quiet",
    title: "quietly overwhelmed",
    range: [26, 50],
    message:
      "you're carrying more than it looks like from the outside. nothing about you is broken.",
    suggestions: [
      "shrink your to-do list by half — on purpose",
      "step outside for five unhurried minutes today",
      "put your phone in another room for one hour tonight",
    ],
  },
  {
    key: "exhausted",
    title: "mentally exhausted",
    range: [51, 75],
    message:
      "your mind has been working overtime for a long time. it deserves a softer week.",
    suggestions: [
      "cancel one thing this week without explaining why",
      "try the focus timer for a single 25-minute reset",
      "let tonight be a no-decisions night — soup, silence, sleep",
    ],
  },
  {
    key: "overloaded",
    title: "emotionally overloaded",
    range: [76, 100],
    message:
      "you're not lazy. you're not failing. you're full. please be very kind to yourself.",
    suggestions: [
      "tell one safe person, in one sentence, how heavy it feels",
      "lower the bar to: water, light, a meal, sleep",
      "consider talking with a professional — softness is also strategy",
    ],
  },
];

function categoryFor(score: number): Category {
  return (
    CATEGORIES.find((c) => score >= c.range[0] && score <= c.range[1]) ??
    CATEGORIES[CATEGORIES.length - 1]
  );
}

function BurnoutPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(() => QUESTIONS.map(() => 50));
  const [done, setDone] = useState(false);

  const total = QUESTIONS.length;
  const progress = done ? 100 : Math.round((step / total) * 100);
  const score = useMemo(
    () => Math.round(answers.reduce((a, b) => a + b, 0) / answers.length),
    [answers]
  );
  const result = useMemo(() => categoryFor(score), [score]);

  const current = QUESTIONS[step];

  function setValue(v: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = v;
      return next;
    });
  }

  function next() {
    if (step < total - 1) setStep(step + 1);
    else setDone(true);
  }
  function prev() {
    if (step > 0) setStep(step - 1);
  }
  function reset() {
    setAnswers(QUESTIONS.map(() => 50));
    setStep(0);
    setDone(false);
  }

  return (
    <section className="relative mx-auto max-w-3xl px-4 pt-12 pb-32">
      <div className="text-center animate-fade-up">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          burnout checker
        </p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl leading-tight">
          a soft check-in with yourself
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          seven quiet questions. no right answers. just notice what's true today.
        </p>
      </div>

      {/* Progress */}
      <div className="mt-12">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>{done ? "complete" : `question ${step + 1} of ${total}`}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary/70 to-[var(--ember)] transition-[width] duration-700 ease-out ember-glow"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {!done ? (
        <article
          key={current.id}
          className="glass-strong mt-10 rounded-3xl p-8 md:p-12 animate-fade-up"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-primary/80">
            {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <h2 className="mt-4 font-display text-2xl md:text-3xl leading-snug text-foreground/95">
            {current.prompt}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground italic">{current.hint}</p>

          <div className="mt-12">
            <Slider
              value={[answers[step]]}
              onValueChange={(v) => setValue(v[0] ?? 50)}
              min={0}
              max={100}
              step={1}
              aria-label={current.prompt}
            />
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>{current.low}</span>
              <span className="font-display text-base text-foreground/80">
                {answers[step]}
              </span>
              <span>{current.high}</span>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={prev}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> back
            </button>
            <button
              onClick={next}
              className="inline-flex items-center gap-2 rounded-full bg-primary/90 hover:bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors"
            >
              {step === total - 1 ? "see your reflection" : "next"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </article>
      ) : (
        <article className="glass-strong mt-10 rounded-3xl p-8 md:p-12 animate-fade-up overflow-hidden relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
          />
          <div className="relative">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary/80">
              <Sparkles className="h-3.5 w-3.5" /> your soft reflection
            </div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
              {result.title}
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed text-lg max-w-xl">
              {result.message}
            </p>

            <div className="mt-10 flex items-end gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  weight today
                </p>
                <p className="font-display text-5xl mt-2">{score}</p>
              </div>
              <div className="flex-1 pb-2">
                <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary/70 to-[var(--ember)] transition-all duration-1000"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
                gentle suggestions
              </p>
              <ul className="space-y-3">
                {result.suggestions.map((s, i) => (
                  <li
                    key={i}
                    className="glass rounded-2xl px-5 py-4 text-foreground/90 text-[15px] leading-relaxed animate-fade-up"
                    style={{ animationDelay: `${i * 120}ms` }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-3">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-full bg-white/5 hover:bg-white/10 px-5 py-2.5 text-sm transition-colors"
              >
                <RotateCcw className="h-4 w-4" /> check in again
              </button>
              <Link
                to="/focus"
                className="inline-flex items-center gap-2 rounded-full bg-primary/90 hover:bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors"
              >
                try a 25-minute reset <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/journal"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                write it out instead
              </Link>
            </div>
          </div>
        </article>
      )}

      <p className="mt-10 text-center text-xs text-muted-foreground italic font-display">
        this isn't a diagnosis. it's a small, kind mirror.
      </p>
    </section>
  );
}
