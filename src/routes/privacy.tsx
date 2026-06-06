import { createFileRoute } from "@tanstack/react-router";

const BASE = "https://www.resetflow.site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "privacy policy — reset" },
      { name: "description", content: "How ResetFlow handles your information. We collect as little as possible and never sell your data." },
      { property: "og:title", content: "privacy policy — reset" },
      { property: "og:description", content: "How ResetFlow handles your information." },
      { property: "og:url", content: `${BASE}/privacy` },
    ],
    links: [{ rel: "canonical", href: `${BASE}/privacy` }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <section className="mx-auto max-w-2xl px-6 pt-20 pb-24 prose-invert">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">legal</p>
      <h1 className="mt-4 font-display text-5xl text-gradient">privacy policy</h1>
      <p className="mt-6 text-sm text-muted-foreground italic">last updated: June 2026</p>

      <div className="mt-10 space-y-6 text-foreground/80 leading-relaxed">
        <p>
          ResetFlow ("we", "us") respects your privacy. This policy explains what we collect, why, and what you can do about it.
        </p>

        <h2 className="font-display text-2xl mt-10 text-foreground/95">what we collect</h2>
        <p>
          <strong className="text-foreground/95 font-medium">Journal entries.</strong> Anything you write in the reset journal stays on your device. It is never sent to our servers.
        </p>
        <p>
          <strong className="text-foreground/95 font-medium">Analytics.</strong> We use Google Analytics (G-LXQJB0NN3K) to understand which pages are read and how the site performs. This data is aggregated and does not personally identify you. Google may set cookies for this purpose.
        </p>
        <p>
          <strong className="text-foreground/95 font-medium">Waitlist email.</strong> If you join the waitlist, we store your email address to notify you when new tools are ready. You can ask us to remove it at any time.
        </p>
        <p>
          <strong className="text-foreground/95 font-medium">Advertising.</strong> If we display advertising in the future (such as Google AdSense), third-party vendors may use cookies to serve ads based on your prior visits. You can opt out of personalized advertising at <a href="https://www.google.com/settings/ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
        </p>

        <h2 className="font-display text-2xl mt-10 text-foreground/95">what we don't do</h2>
        <p>We don't sell your data. We don't share your journal entries. We don't build advertising profiles about you ourselves.</p>

        <h2 className="font-display text-2xl mt-10 text-foreground/95">cookies</h2>
        <p>
          We use essential cookies for site functionality and analytics cookies (via Google Analytics). You can disable cookies in your browser; some features may not work as expected.
        </p>

        <h2 className="font-display text-2xl mt-10 text-foreground/95">your rights</h2>
        <p>
          You have the right to know what data we hold about you, to ask us to delete it, and to ask us to stop processing it. Contact us at <a href="mailto:hello@resetflow.site" className="text-primary hover:underline">hello@resetflow.site</a>.
        </p>

        <h2 className="font-display text-2xl mt-10 text-foreground/95">children</h2>
        <p>ResetFlow is not directed to children under 13 and we do not knowingly collect their data.</p>

        <h2 className="font-display text-2xl mt-10 text-foreground/95">changes</h2>
        <p>If this policy changes meaningfully, we'll update the date above and note the change on this page.</p>
      </div>
    </section>
  );
}
