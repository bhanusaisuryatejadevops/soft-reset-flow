import { Link, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Instagram, Facebook } from "lucide-react";

const socials = [
  { name: "Instagram", href: "https://www.instagram.com/soft_resetflow/", Icon: Instagram },
  {
    name: "Pinterest",
    href: "https://in.pinterest.com/resetflow/",
    Icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 20c.5-2 .9-3.6 1.3-5.2.2-.9 1.2-4.7 1.2-4.7-.3-.6-.4-1.4-.4-2 0-1.9 1.1-3.3 2.5-3.3 1.2 0 1.7.9 1.7 1.9 0 1.2-.7 2.9-1.1 4.5-.3 1.4.7 2.5 2 2.5 2.4 0 4.1-3.1 4.1-6.7 0-2.8-1.9-4.9-5.3-4.9-3.9 0-6.3 2.9-6.3 6.1 0 1.1.4 2.3 1 3 .1.1.1.2.1.4l-.4 1.5c0 .2-.2.3-.4.2-1.5-.7-2.4-2.9-2.4-4.6 0-3.8 2.7-7.2 7.9-7.2 4.1 0 7.3 2.9 7.3 6.9 0 4.1-2.6 7.4-6.2 7.4-1.2 0-2.4-.6-2.7-1.4l-.7 2.8c-.3 1-1 2.3-1.5 3.1 1.1.3 2.3.5 3.4.5z" />
      </svg>
    ),
  },
  { name: "Facebook", href: "https://www.facebook.com/softresetflow/", Icon: Facebook },
] as const;

const nav = [
  { to: "/", label: "Home" },
  { to: "/tools", label: "Tools" },
  { to: "/Journal", label: "Journal" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/articles", label: "Articles" },
] as const;

const legalNav = [
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
  { to: "/contact", label: "Contact" },
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

      {/* Follow section */}
      <section className="relative mt-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className="glass-strong relative overflow-hidden rounded-[2rem] px-8 md:px-14 py-14 md:py-16 text-center">
            <div aria-hidden className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-primary/20 blur-3xl animate-glow-pulse" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">stay close</p>
              <h2 className="mt-4 font-display text-3xl md:text-4xl text-gradient leading-tight">
                follow resetflow
              </h2>
              <p className="mt-4 max-w-md mx-auto text-sm md:text-base text-muted-foreground leading-relaxed italic">
                stay connected for daily emotional wellness, burnout recovery, self-care, and healing content.
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                {socials.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="group flex h-12 w-12 items-center justify-center rounded-full glass text-foreground/80 transition-all duration-500 hover:text-primary hover:-translate-y-0.5 hover:border-primary/30 ember-glow"
                  >
                    <Icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative mt-20 border-t border-white/5">
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
                <ul className="space-y-3 text-muted-foreground">
                  {socials.map(({ name, href, Icon }) => (
                    <li key={name}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 hover:text-foreground transition-colors"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="lowercase">{name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/5 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-xs text-muted-foreground">
              {legalNav.map((l) => (
                <Link key={l.to} to={l.to} className="hover:text-foreground transition-colors lowercase">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
              <p>© {new Date().getFullYear()} reset. take it slow.</p>
              <p className="italic font-display">rebuilding slowly is still progress.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
