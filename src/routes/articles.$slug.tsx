import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { articles, getArticle } from "@/data/articles";

const BASE = "https://www.resetflow.site";

export const Route = createFileRoute("/articles/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "article" }] };
    const url = `${BASE}/articles/${params.slug}`;
    return {
      meta: [
        { title: `${loaderData.title} — reset journal` },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:title", content: loaderData.title },
        { name: "twitter:description", content: loaderData.description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: loaderData.title,
            description: loaderData.description,
            datePublished: loaderData.publishedAt,
            author: { "@type": "Organization", name: "ResetFlow" },
            mainEntityOfPage: url,
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl">article not found</h1>
      <Link to="/articles" className="mt-6 inline-block text-sm text-primary hover:underline">back to articles</Link>
    </div>
  ),
  component: ArticleView,
});

function renderParagraph(p: string, i: number) {
  if (p.startsWith("## ")) {
    return (
      <h2 key={i} className="mt-12 mb-4 font-display text-2xl md:text-3xl text-foreground/95">
        {p.slice(3)}
      </h2>
    );
  }
  // simple markdown: **bold** and [text](url)
  const nodes: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let key = 0;
  const matches = p.matchAll(regex);
  for (const m of matches) {
    const idx = m.index ?? 0;
    if (idx > lastIndex) nodes.push(p.slice(lastIndex, idx));
    const token = m[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={`b${key++}`} className="text-foreground/95 font-medium">{token.slice(2, -2)}</strong>);
    } else {
      const text = token.match(/\[([^\]]+)\]/)?.[1] ?? "";
      const href = token.match(/\(([^)]+)\)/)?.[1] ?? "#";
      nodes.push(
        <Link key={`l${key++}`} to={href} className="text-primary hover:underline">
          {text}
        </Link>,
      );
    }
    lastIndex = idx + token.length;
  }
  if (lastIndex < p.length) nodes.push(p.slice(lastIndex));
  return (
    <p key={i} className="mt-5 text-base md:text-lg leading-[1.85] text-foreground/80">
      {nodes}
    </p>
  );
}

function ArticleView() {
  const article = Route.useLoaderData();
  const related = article.related
    .map((s) => articles.find((a) => a.slug === s))
    .filter(Boolean);

  return (
    <article className="mx-auto max-w-2xl px-6 pt-20 pb-24">
      <Link to="/articles" className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground">
        ← reset journal
      </Link>
      <p className="mt-8 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{article.topic} · {article.readTime}</p>
      <h1 className="mt-4 font-display text-4xl md:text-5xl leading-tight text-gradient">{article.title}</h1>
      <p className="mt-6 text-lg text-muted-foreground italic leading-relaxed">{article.description}</p>

      <div className="mt-10">
        {article.body.map(renderParagraph)}
      </div>

      {related.length > 0 && (
        <div className="mt-20 pt-10 border-t border-white/5">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">read next</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {related.map((r) => r && (
              <Link key={r.slug} to="/articles/$slug" params={{ slug: r.slug }} className="glass rounded-2xl p-5 hover:bg-white/[0.04] transition-colors">
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{r.topic}</p>
                <h3 className="mt-2 font-display text-lg leading-snug">{r.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
