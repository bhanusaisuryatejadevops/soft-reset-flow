import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/mood-check")({
  component: MoodCheck,
});

function MoodCheck() {
  const [result, setResult] = useState("");

  return (
    <section className="mx-auto max-w-2xl px-6 pt-20 pb-24 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        mood check
      </p>

      <h1 className="mt-4 font-display text-5xl text-gradient">
        how are you feeling today?
      </h1>

      <div className="mt-10 grid gap-4">
        <button
          className="glass rounded-2xl p-4"
          onClick={() => setResult("Take things slowly today. Protect your energy.")}
        >
          😔 Tired
        </button>

        <button
          className="glass rounded-2xl p-4"
          onClick={() => setResult("Pause and take five deep breaths. You are safe right now.")}
        >
          😟 Anxious
        </button>

        <button
          className="glass rounded-2xl p-4"
          onClick={() => setResult("Choose one tiny task and ignore everything else for now.")}
        >
          😵 Overwhelmed
        </button>

        <button
          className="glass rounded-2xl p-4"
          onClick={() => setResult("That's wonderful. Use today's energy on something meaningful.")}
        >
          🙂 Calm
        </button>
      </div>

      {result && (
        <div className="glass mt-8 rounded-3xl p-6">
          <p>{result}</p>
        </div>
      )}
    </section>
  );
}
