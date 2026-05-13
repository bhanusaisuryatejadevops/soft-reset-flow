import { Link, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/tools", label: "Tools" },
  { to: "/about", label: "About" },
  { to: "/journal", label: "Reset Journal" },
] as const;

export function SiteLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-[-10%] right-[-10%] h-[40rem] w-[40rem] rounded-full bg-[var(--ember)] opacity-[0.18] blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-[-15%] left-[-10%] h-[36rem] w-[36rem] rounded-full bg-[oklch(0.45_0.14_300)] opacity-[0.18] blur-[140px] animate-glow-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <header className="sticky top-0 z-40">
        <div className="mx-auto mt-4 max-w-6xl px-4">
          <div className="glass rounded-full px-5 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 ember-glow">
                <span className="h-2 w-2 rounded-full bg-primary animate-glow-pulse" />
              </span>
              <span className="font-display text-lg tracking-tight">reset</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  activeOptions={{ exact: true }}
                  className="px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground rounded-full"
                  activeProps={{ className: "text-foreground bg-white/5" }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <Link
              to="/journal"
              className="hidden md:inline-flex items-center rounded-full bg-primary/90 px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary transition-colors"
            >
              start reset
            </Link>
            <button
              className="md:hidden rounded-full p-2 hover:bg-white/5"
              onClick={() => setOpen(!open)}
              aria-label="menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          {open && (
            <div className="md:hidden glass mt-2 rounded-2xl p-2 animate-fade-up">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground rounded-xl hover:bg-white/5"
                  activeProps={{ className: "text-foreground bg-white/5" }}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="relative mt-32 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div className="max-w-md">
              <div className="flex items-center gap-2">
                <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 ember-glow">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="font-display text-lg">reset</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                quiet tools for rebuilding your routines slowly. made with care for the
                tired, the soft, the still becoming.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10 text-sm">
              <div>
                <p className="text-foreground/80 mb-3">explore</p>
                <ul className="space-y-2 text-muted-foreground">
                  {nav.map((n) => (
                    <li key={n.to}>
                      <Link to={n.to} className="hover:text-foreground transition-colors">{n.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-foreground/80 mb-3">close to us</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>instagram</li>
                  <li>pinterest</li>
                  <li>letters</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} reset. take it slow.</p>
            <p className="italic font-display">rebuilding slowly is still progress.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
