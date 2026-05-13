import type { LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tag?: string;
  to: string;
}

export function ToolCard({ icon: Icon, title, description, tag, to }: ToolCardProps) {
  return (
    <Link
      to={to}
      aria-label={`open ${title}`}
      className="group relative block glass rounded-3xl p-6 md:p-7 cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-0 group-hover:ring-1 group-hover:ring-primary/20 transition-all duration-500" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ember-glow transition-transform duration-500 group-hover:scale-110">
            <Icon className="h-5 w-5" />
          </div>
          {tag && (
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {tag}
            </span>
          )}
        </div>
        <h3 className="mt-6 font-display text-xl text-foreground/95">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
        <div className="mt-6 flex items-center text-xs text-primary/90">
          <span className="opacity-80 group-hover:opacity-100 transition-opacity">open softly</span>
          <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}
