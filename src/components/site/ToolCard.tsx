import type { LucideIcon } from "lucide-react";

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tag?: string;
}

export function ToolCard({ icon: Icon, title, description, tag }: ToolCardProps) {
  return (
    <article className="group relative glass rounded-3xl p-6 md:p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 overflow-hidden">
      <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ember-glow">
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
    </article>
  );
}
