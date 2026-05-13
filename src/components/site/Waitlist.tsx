import { useState } from "react";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="relative mx-auto max-w-4xl px-6">
      <div className="glass-strong relative overflow-hidden rounded-[2rem] p-10 md:p-16 text-center">
        <div aria-hidden className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl animate-glow-pulse" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">waitlist</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-gradient">
            stay close to the reset
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            gentle reminders, emotional reset ideas, and quiet productivity tools — sent
            only when they matter.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}
            className="mx-auto mt-8 flex w-full max-w-md flex-col sm:flex-row gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your quiet email"
              className="flex-1 rounded-full bg-white/5 border border-white/10 px-5 py-3 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/40 transition-colors"
            />
            <button
              type="submit"
              className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors ember-glow"
            >
              {done ? "you're in 🤍" : "join waitlist"}
            </button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">no noise. unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
