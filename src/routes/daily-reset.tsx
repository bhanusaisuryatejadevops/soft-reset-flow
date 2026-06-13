import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/daily-reset")({
  component: DailyReset,
});

const resets = [
  "Drink a glass of water.",
  "Take 5 deep breaths.",
  "Stretch for 60 seconds.",
  "Step outside for 2 minutes.",
  "Write down one thing you're grateful for.",
  "Close your eyes and rest for 1 minute.",
  "Walk around your room once.",
  "Send a kind message to someone.",
  "Put your phone away for 10 minutes.",
  "Tidy one small space around you.",
];

function DailyReset() {
  const [task, setTask] = useState(resets[0]);

  const generate = () => {
    setTask(resets[Math.floor(Math.random() * resets.length)]);
  };

  return (
    <section className="mx-auto max-w-2xl px-6 pt-20 pb-24 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        daily reset
      </p>

      <h1 className="mt-4 font-display text-5xl text-gradient">
        one small thing is enough
      </h1>

      <div className="glass mt-10 rounded-3xl p-8">
        <p className="text-xl">{task}</p>

        <button
          onClick={generate}
          className="mt-8 rounded-full bg-primary px-6 py-3 text-primary-foreground"
        >
          give me another reset
        </button>
      </div>
    </section>
  );
}
