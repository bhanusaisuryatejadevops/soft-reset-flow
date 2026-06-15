import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/quote")({
  component: QuotePage,
});

const quotes = [
  "you don't have to carry everything today.",
  "rest is productive too.",
  "small progress still counts.",
  "surviving difficult days is an achievement.",
  "your worth is not your productivity.",
  "healing is not a race.",
  "take the next tiny step.",
  "slow is still moving.",
  "you are allowed to pause.",
  "today only needs one brave action.",
  "be gentle with yourself.",
  "recovery takes time and that's okay.",
  "focus on what matters now.",
  "you don't need a perfect plan.",
  "one deep breath can change a moment.",
  "growth is often invisible at first.",
  "protect your peace.",
  "your energy matters.",
  "it's okay to begin again.",
  "doing less can be the right choice.",
  "your feelings are valid.",
  "rest before you need to.",
  "you are stronger than this moment.",
  "small steps create big change.",
  "there is no rush.",
  "healing happens quietly.",
  "choose progress over perfection.",
  "give yourself permission to rest.",
  "today is a fresh start.",
  "you deserve kindness too.",
  "breathe. then continue.",
  "one thing at a time.",
  "you have survived every hard day so far.",
  "gentle is powerful.",
  "your pace is enough.",
  "take care of yourself first.",
  "peace begins with one pause.",
  "you don't need to earn rest.",
  "trust the process.",
  "keep going softly.",
  "less pressure, more presence.",
  "you are allowed to slow down.",
  "healing is happening.",
  "be proud of small wins.",
  "the next step is enough.",
  "you can start over anytime.",
  "today does not need perfection.",
  "your best is enough.",
  "choose calm where possible.",
  "everything doesn't need to happen today."
];

function QuotePage() {
  const [quote, setQuote] = useState(quotes[0]);

  const generateQuote = () => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  };

  return (
    <section className="mx-auto max-w-3xl px-6 pt-20 pb-24 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        daily reminder
      </p>

      <h1 className="mt-4 font-display text-5xl md:text-6xl text-gradient">
        today's gentle quote
      </h1>

      <div className="glass mt-12 rounded-3xl p-10">
        <p className="font-display text-2xl md:text-3xl leading-relaxed">
          "{quote}"
        </p>

        <button
          onClick={generateQuote}
          className="mt-10 rounded-full bg-primary px-6 py-3 text-primary-foreground"
        >
          give me another quote
        </button>
      </div>
    </section>
  );
}
