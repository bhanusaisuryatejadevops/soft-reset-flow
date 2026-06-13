import { createFileRoute } from "@tanstack/react-router";

const BASE = "https://resetflow.site";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "disclaimer — reset" },
      {
        name: "description",
        content: "Important information about using ResetFlow.",
      },
      { property: "og:title", content: "disclaimer — reset" },
      { property: "og:url", content: `${BASE}/disclaimer` },
    ],
    links: [{ rel: "canonical", href: `${BASE}/disclaimer` }],
  }),
  component: Disclaimer,
});

function Disclaimer() {
  return (
    <section className="mx-auto max-w-2xl px-6 pt-20 pb-24">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        legal
      </p>

      <h1 className="mt-4 font-display text-5xl text-gradient">
        disclaimer
      </h1>

      <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
        <p>
          The content on ResetFlow is provided for educational and informational
          purposes only.
        </p>

        <h2 className="font-display text-2xl text-foreground">
          not medical advice
        </h2>

        <p>
          ResetFlow is not a medical service and does not provide medical,
          psychiatric, psychological, or therapeutic advice.
        </p>

        <h2 className="font-display text-2xl text-foreground">
          not emergency support
        </h2>

        <p>
          If you are experiencing a crisis or emergency, contact local emergency
          services or a qualified professional immediately.
        </p>

        <h2 className="font-display text-2xl text-foreground">
          use at your own discretion
        </h2>

        <p>
          Any actions you take based on information found on this website are at
          your own risk.
        </p>
      </div>
    </section>
  );
}
