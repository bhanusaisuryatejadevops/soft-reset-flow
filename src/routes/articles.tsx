import { createFileRoute, Link } from "@tanstack/react-router";
import { articles } from "@/data/articles";

const BASE = "https://www.resetflow.site";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "reset journal — articles on burnout, healing & slow living" },
      { name: "description", content: "Long-form, human-written guides on burnout recovery, emotional exhaustion, nervous system regulation, self-care, and mental reset routines." },
      { property: "og:title", content: "reset journal — articles" },
      { property: "og:description", content: "Long-form, human-written guides on burnout recovery, emotional exhaustion, self-care, and mental reset routines." },
      { property: "og:url", content: `${BASE}/articles` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${BASE}/articles` }],
  }),
  component: ArticlesIndex,
});

function ArticlesIndex() {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-20 pb-24">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">reset journal</p>
      <h1 className="mt-4 font-display text-5xl md:text-6xl text-gradient leading-tight">articles for tired humans</h1>
      <p className="mt-6 max-w-xl text-muted-foreground">
        slow reads on burnout, emotional exhaustion, nervous system regulation, and the long arc of coming back to yourself.
      </p>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {articles.map((a) => (
          <Link
            key={a.slug}
            to="/articles/$slug"
            params={{ slug: a.slug }}
            className="group glass rounded-3xl p-7 hover:bg-white/[0.04] transition-colors"
          >
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{a.topic}</p>
            <h2 className="mt-3 font-display text-2xl leading-snug group-hover:text-foreground text-foreground/90">
              {a.title}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">{a.description}</p>
            <p className="mt-5 text-xs text-muted-foreground italic">{a.readTime}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
