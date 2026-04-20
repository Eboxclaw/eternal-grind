import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/60 bg-charcoal pinstripe">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-bone/60">— Email signature —</p>
            <p className="mt-4 font-display text-2xl text-pearl">Bartholomew</p>
            <p className="mt-1 text-sm text-bone">CEO • CFO • COO • Intern</p>
            <p className="text-sm text-bone">Eternity Corp · Ink Chain</p>
            <p className="mt-3 italic text-bone/70">"Sent from my immortal ledger."</p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-bone/60">Departments</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/manifesto" className="text-pearl hover:text-ink transition-colors">→ Manifesto</Link></li>
              <li><Link to="/memes" className="text-pearl hover:text-ink transition-colors">→ Meme Vault</Link></li>
              <li><a href="#" className="text-pearl hover:text-ink transition-colors">→ X / Twitter</a></li>
              <li><a href="#" className="text-pearl hover:text-ink transition-colors">→ Ink Chain Explorer</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-bone/60">Disclaimer</p>
            <p className="mt-4 text-[11px] leading-relaxed text-bone/60">
              $OOO is a meme. Eternity Corp is a joke. Bartholomew is a skeleton. Nothing on this site
              is financial advice — it is corporate poetry. The dev is dust. The ledger is forever.
              By scrolling you agree to the synergy clause and the void.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-border/40 pt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/50 md:flex-row md:items-center">
          <span>© ∞ Eternity Corp — All rights reserved, forever.</span>
          <span>$OOO // Ink Chain // Out of Office</span>
        </div>
      </div>
    </footer>
  );
}
