import { Link } from "@tanstack/react-router";

export function SiteNav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-border/40 bg-obsidian/60 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-[1400px] items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-pearl/90">
          <span className="inline-block h-2 w-2 rounded-full bg-ink shadow-[0_0_12px_var(--ink)]" />
          Eternity Corp <span className="text-bone/50">// EST. ∞</span>
        </Link>
        <nav className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.25em]">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-ink" }} className="text-pearl/80 hover:text-ink transition-colors">Index</Link>
          <Link to="/manifesto" activeProps={{ className: "text-ink" }} className="text-pearl/80 hover:text-ink transition-colors">Manifesto</Link>
          <Link to="/memes" activeProps={{ className: "text-ink" }} className="text-pearl/80 hover:text-ink transition-colors">Memes</Link>
          <span className="hidden md:inline-block rounded-sm border border-ink/40 bg-ink/10 px-2 py-1 text-ink">$OOO ▲ 420.69%</span>
        </nav>
      </div>
    </header>
  );
}
