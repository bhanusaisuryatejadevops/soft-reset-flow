import { createFileRoute } from "@tanstack/react-router";

const BASE = "https://resetflow.site";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "faq — reset" },
      {
        name: "description",
        content: "frequently asked questions about reset and its tools.",
      },
      { property: "og:title", content: "faq — reset" },
      { property: "og:url", content: `${BASE}/faq` },
    ],
    links: [{ rel: "canonical", href: `${BASE}/faq` }],
  }),
  component: FAQ,
});

function FAQ() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-20 pb-16">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        faq
      </p>

      <h1 className="mt-4 font-display text-5xl text-gradient">
        frequently asked questions
      </h1>

      <div className="mt-12 space-y-8">
        <div>
          <h2 className="font-display text-2xl">what is reset?</h2>
          <p className="mt-2 text-muted-foreground">
            reset is a collection of gentle tools, articles, and exercises for
            emotional wellbeing and focus.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl">is this therapy?</h2>
          <p className="mt-2 text-muted-foreground">
            no. reset is not therapy and does not replace professional help.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl">is my data stored?</h2>
          <p className="mt-2 text-muted-foreground">
            reset is designed to collect as little personal information as
            possible.
          </p>
        </div>
      </div>
    </section>
  );
}
