import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { articles } from "@/data/articles";

const BASE_URL = "https://resetflow.site";

interface Entry { path: string; priority?: string; changefreq?: string; lastmod?: string; }

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().slice(0, 10);
        const entries: Entry[] = [
          { path: "/", priority: "1.0", changefreq: "weekly", lastmod: today },
          { path: "/tools", priority: "0.8", changefreq: "monthly", lastmod: today },
          { path: "/about", priority: "0.6", changefreq: "monthly", lastmod: today },
          { path: "/journal", priority: "0.8", changefreq: "monthly", lastmod: today },
          { path: "/articles", priority: "0.9", changefreq: "weekly", lastmod: today },
          { path: "/contact", priority: "0.5", changefreq: "yearly", lastmod: today },
          { path: "/privacy", priority: "0.3", changefreq: "yearly", lastmod: today },
          { path: "/terms", priority: "0.3", changefreq: "yearly", lastmod: today },
          ...articles.map<Entry>((a) => ({
            path: `/articles/${a.slug}`,
            priority: "0.7",
            changefreq: "monthly",
            lastmod: a.publishedAt,
          })),
        ];
        const urls = entries
          .map(
            (e) =>
              `  <url><loc>${BASE_URL}${e.path}</loc>` +
              (e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : "") +
              (e.changefreq ? `<changefreq>${e.changefreq}</changefreq>` : "") +
              (e.priority ? `<priority>${e.priority}</priority>` : "") +
              `</url>`,
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
