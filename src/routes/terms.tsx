import { createFileRoute } from "@tanstack/react-router";

const BASE = "https://www.resetflow.site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "terms of service — reset" },
      { name: "description", content: "The terms that govern your use of ResetFlow. Plain language, no surprises." },
      { property: "og:title", content: "terms of service — reset" },
      { property: "og:description", content: "The terms that govern your use of ResetFlow." },
      { property: "og:url", content: `${BASE}/terms` },
    ],
    links: [{ rel: "canonical", href: `${BASE}/terms` }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <section className="mx-auto max-w-2xl px-6 pt-20 pb-24">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">legal</p>
      <h1 className="mt-4 font-display text-5xl text-gradient">terms of service</h1>
      <p className="mt-6 text-sm text-muted-foreground italic">last updated: June 2026</p>

      <div className="mt-10 space-y-6 text-foreground/80 leading-relaxed">
        <p>By using ResetFlow, you agree to these terms. They are written to be understood.</p>

        <h2 className="font-display text-2xl mt-10 text-foreground/95">what ResetFlow is</h2>
        <p>
          ResetFlow is a wellness website offering reading material, journaling prompts, and gentle tools for rest and recovery. It is not a medical service. Nothing on this site is a substitute for therapy, counselling, or medical care. If you are in crisis, please contact a qualified professional or your local emergency services.
        </p>

        <h2 className="font-display text-2xl mt-10 text-foreground/95">acceptable use</h2>
        <p>You agree not to misuse the site — including attempting to break it, scraping it at scale, or using it to harm others.</p>

        <h2 className="font-display text-2xl mt-10 text-foreground/95">your content</h2>
        <p>
          Anything you write in the reset journal stays on your device. We don't claim ownership of your words.
        </p>

        <h2 className="font-display text-2xl mt-10 text-foreground/95">our content</h2>
        <p>
          Articles, copy, design, and code on ResetFlow are © ResetFlow. You're welcome to share links and quote short passages with attribution. Please don't republish full articles without permission.
        </p>

        <h2 className="font-display text-2xl mt-10 text-foreground/95">third-party services</h2>
        <p>
          We use Google Analytics for usage measurement and may use Google AdSense for advertising. Use of these services is governed by their own terms.
        </p>

        <h2 className="font-display text-2xl mt-10 text-foreground/95">no warranty</h2>
        <p>
          ResetFlow is provided "as is" without warranties of any kind. We do our best to keep the site up and accurate, but we can't guarantee perfection. To the extent permitted by law, we aren't liable for indirect or consequential damages from your use of the site.
        </p>

        <h2 className="font-display text-2xl mt-10 text-foreground/95">changes</h2>
        <p>We may update these terms. If we do, we'll update the date above. Continued use of the site after a change means you accept the updated terms.</p>

        <h2 className="font-display text-2xl mt-10 text-foreground/95">contact</h2>
        <p>Questions? Email <a href="mailto:hello@resetflow.site" className="text-primary hover:underline">hello@resetflow.site</a>.</p>
      </div>
    </section>
  );
}
