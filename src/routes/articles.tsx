import { Outlet, createFileRoute } from "@tanstack/react-router";

const BASE = "https://resetflow.site";

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
  component: ArticlesLayout,
});

function ArticlesLayout() {
  return <Outlet />;
}
