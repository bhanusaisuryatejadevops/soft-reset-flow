import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Waitlist } from "@/components/site/Waitlist";

const BASE = "https://resetflow.site";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "reset journal — write what you don't say out loud" },
      { name: "description", content: "a calming emotional journaling space. one prompt at a time. nothing tracked, nothing shared." },
      { property: "og:title", content: "reset journal" },
      { property: "og:description", content: "a quiet space to write what you don't say out loud." },
      { property: "og:url", content: `${BASE}/journal` },
    ],
    links: [{ rel: "canonical", href: `${BASE}/journal` }],
  }),
  component: Journal,
});

const prompts = [
  "what felt heavy today, even if it looked small from the outside?",
  "name one thing you were softer with yourself about this week.",
  "if today only asked for one thing from you, what would be enough?",
  "what's a feeling you've been avoiding writing down?",
  "what would resting, without earning it, look like tonight?",
];

function Journal() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");

  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pt-20 pb-12 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground animate-fade-up">reset journal</p>
        <h1 className="mt-4 font-display text-5xl md:text-6xl text-gradient animate-fade-up" style={{ animationDelay: "0.1s" }}>
          write what you don't<br />say out loud
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-muted-foreground animate-fade-up" style={{ animationDelay: "0.2s" }}>
          one quiet prompt at a time. nothing is tracked. nothing is shared. this page
          forgets when you close it.
        </p>
      </section>

      <section className="mx-auto max-w-2xl px-6 pb-20">
        <div className="glass-strong rounded-3xl p-8 md:p-10 ember-glow">
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            tonight's prompt
          </p>
          <p className="mt-4 font-display text-2xl md:text-3xl leading-snug text-foreground/95">
            {prompts[i]}
          </p>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="start anywhere…"
            rows={10}
            className="mt-8 w-full resize-none rounded-2xl bg-white/[0.03] border border-white/10 p-5 text-base leading-relaxed placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/30 transition-colors"
          />

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground italic">
              {text.length === 0 ? "the page is listening." : `${text.split(/\s+/).filter(Boolean).length} words exhaled`}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => { setText(""); setI((i + 1) % prompts.length); }}
                className="rounded-full glass px-5 py-2 text-sm hover:bg-white/10 transition-colors"
              >
                new prompt
              </button>
              <button
                onClick={() => setText("")}
                className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                let it go
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          your words live only on this device, in this moment.
        </p>
      </section>

      <Waitlist />
    </>
  );
}
