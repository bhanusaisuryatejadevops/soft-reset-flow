import { createFileRoute } from "@tanstack/react-router";

const BASE = "https://resetflow.site";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "cookie policy — reset" },
      {
        name: "description",
        content: "Learn how ResetFlow uses cookies and similar technologies.",
      },
      { property: "og:title", content: "cookie policy — reset" },
      { property: "og:url", content: `${BASE}/cookies` },
    ],
    links: [{ rel: "canonical", href: `${BASE}/cookies` }],
  }),
  component: Cookies,
});

function Cookies() {
  return (
    <section className="mx-auto max-w-2xl px-6 pt-20 pb-24">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        legal
      </p>

      <h1 className="mt-4 font-display text-5xl text-gradient">
        cookie policy
      </h1>

      <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
        <p>
          This Cookie Policy explains how ResetFlow uses cookies and similar
          technologies when you visit our website.
        </p>

        <h2 className="font-display text-2xl text-foreground">
          what are cookies?
        </h2>

        <p>
          Cookies are small text files stored on your device that help websites
          function properly and improve user experience.
        </p>

        <h2 className="font-display text-2xl text-foreground">
          cookies we use
        </h2>

        <p>
          We may use essential cookies required for website functionality and
          analytics cookies to understand how visitors use our site.
        </p>

        <h2 className="font-display text-2xl text-foreground">
          google analytics
        </h2>

        <p>
          ResetFlow uses Google Analytics to understand website traffic and
          improve content. Google may store cookies for analytics purposes.
        </p>

        <h2 className="font-display text-2xl text-foreground">
          advertising cookies
        </h2>

        <p>
          In the future, we may use advertising services such as Google AdSense.
          These services may use cookies to display relevant advertisements.
        </p>

        <h2 className="font-display text-2xl text-foreground">
          managing cookies
        </h2>

        <p>
          You can control or disable cookies through your browser settings.
          Disabling cookies may affect some website features.
        </p>

        <h2 className="font-display text-2xl text-foreground">
          changes to this policy
        </h2>

        <p>
          We may update this Cookie Policy from time to time. Changes will be
          posted on this page.
        </p>
      </div>
    </section>
  );
}
