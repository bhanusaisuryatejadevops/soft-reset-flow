import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const BASE = "https://www.resetflow.site";

export const Route = createFileRoute("/focus")({
  head: () => ({
    meta: [
      { title: "focus timer — reset" },
      { name: "description", content: "a 25 minute pomodoro timer for slow, gentle focus. minimal, calm, made for tired days." },
      { property: "og:title", content: "focus timer — reset" },
      { property: "og:description", content: "a calm 25 minute pomodoro for slow focus." },
      { property: "og:url", content: `${BASE}/focus` },
    ],
    links: [{ rel: "canonical", href: `${BASE}/focus` }],
  }),
  component: FocusPage,
});

const TOTAL = 25 * 60;

function format(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

function FocusPage() {
  const [remaining, setRemaining] = useState(TOTAL);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setRunning(false);
          setDone(true);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const start = () => {
    if (done) {
      setDone(false);
      setRemaining(TOTAL);
    }
    setRunning(true);
  };
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setDone(false);
    setRemaining(TOTAL);
  };

  const progress = 1 - remaining / TOTAL;
  const size = 320;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <section className="mx-auto max-w-3xl px-6 pt-20 pb-32 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground animate-fade-up">
        focus timer
      </p>
      <h1
        className="mt-4 font-display text-5xl md:text-6xl text-gradient animate-fade-up"
        style={{ animationDelay: "0.1s" }}
      >
        slow focus, soft pace
      </h1>
      <p
        className="mx-auto mt-5 max-w-md text-muted-foreground animate-fade-up"
        style={{ animationDelay: "0.2s" }}
      >
        twenty-five quiet minutes. no pressure, no streaks. just you, gently
        returning to one small thing.
      </p>

      <div className="mt-16 flex flex-col items-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <div className="relative">
          {/* ambient pulse */}
          <div
            className={`absolute inset-0 rounded-full bg-primary/10 blur-3xl transition-opacity duration-1000 ${
              running ? "opacity-100 animate-glow-pulse" : "opacity-40"
            }`}
            aria-hidden
          />
          <svg
            width={size}
            height={size}
            className="relative -rotate-90"
            role="img"
            aria-label={`${format(remaining)} remaining`}
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={stroke}
              fill="none"
              className="text-white/5"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="url(#focusGrad)"
              strokeWidth={stroke}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
            <defs>
              <linearGradient id="focusGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.78 0.14 60)" />
                <stop offset="100%" stopColor="oklch(0.55 0.18 300)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-7xl tracking-tight tabular-nums">
              {format(remaining)}
            </span>
            <span className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {done ? "complete" : running ? "in focus" : "ready when you are"}
            </span>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-3">
          {!running ? (
            <button
              onClick={start}
              className="inline-flex items-center gap-2 rounded-full bg-primary/90 px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary transition-colors ember-glow"
            >
              <Play className="h-4 w-4" /> {done ? "begin again" : remaining < TOTAL ? "resume" : "start"}
            </button>
          ) : (
            <button
              onClick={pause}
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              <Pause className="h-4 w-4" /> pause
            </button>
          )}
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
          >
            <RotateCcw className="h-4 w-4" /> reset
          </button>
        </div>

        {done && (
          <div className="mt-14 max-w-lg glass-strong rounded-3xl px-8 py-10 animate-fade-up">
            <p className="font-display text-2xl md:text-3xl leading-relaxed text-gradient">
              you stayed with yourself.
              <br />
              that's enough for today.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              close the laptop. drink some water. the rest can wait.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
