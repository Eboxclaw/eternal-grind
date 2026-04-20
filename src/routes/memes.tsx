import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BART_TWEETS, type BartTweet } from "@/lib/tweets";

export const Route = createFileRoute("/memes")({
  head: () => ({
    meta: [
      { title: "Meme Vault — $OOO · Bartholomew's Greatest Hits" },
      { name: "description", content: "A masonry wall of Bartholomew's most cursed and most beautiful posts. Corporate satire, degen fervor, and eloquent poetry from the eternal CEO of Eternity Corp." },
      { property: "og:title", content: "Meme Vault — $OOO · Bartholomew's Greatest Hits" },
      { property: "og:description", content: "Corporate satire, degen fervor, eloquent poetry. The Bartholomew archive." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: MemesPage,
});

function ToneTag({ tone }: { tone: BartTweet["tone"] }) {
  const map = {
    satire: { l: "CORPORATE", c: "border-pearl/40 bg-pearl/5 text-pearl" },
    degen:  { l: "DEGEN",     c: "border-pink/40 bg-pink/10 text-pink" },
    poetry: { l: "POETRY",    c: "border-ink/40 bg-ink/10 text-ink" },
  } as const;
  const { l, c } = map[tone];
  return (
    <span className={`rounded-sm border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.25em] ${c}`}>
      {l}
    </span>
  );
}

function MemeCard({ t, onClick }: { t: BartTweet; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      layoutId={`tweet-${t.id}`}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="group mb-5 block w-full break-inside-avoid border border-border bg-charcoal p-5 text-left transition-shadow hover:border-ink hover:shadow-[0_0_40px_color-mix(in_oklab,var(--ink)_35%,transparent)]"
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-ink font-display text-pearl">B</div>
        <div className="leading-tight">
          <p className="text-sm text-pearl">Bartholomew</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/60">@OOO_ETERNAL · {t.time}</p>
        </div>
        <span className="ml-auto"><ToneTag tone={t.tone} /></span>
      </div>
      <p className="text-base leading-relaxed text-pearl/95">{t.text}</p>
      <div className="mt-4 flex items-center gap-5 border-t border-border/60 pt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/60">
        <span>♡ {t.likes.toLocaleString()}</span>
        <span>↻ {t.rts.toLocaleString()}</span>
        <span className="ml-auto text-ink">$OOO</span>
      </div>
    </motion.button>
  );
}

function MemesPage() {
  const [open, setOpen] = useState<BartTweet | null>(null);

  return (
    <main className="pt-24">
      <section className="border-b border-border py-24 md:py-32">
        <div className="mx-auto max-w-[1300px] px-6 md:px-12">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.5em] text-violet">— Archive · Vault 001 —</p>
          <h1 className="font-display text-6xl leading-[0.95] tracking-tight text-pearl md:text-8xl text-glow">
            Meme Vault.
          </h1>
          <p className="mt-6 max-w-2xl font-display text-xl italic text-bone md:text-2xl">
            30 posts. Three tones. One CEO. Click any artifact to view it in full corporate splendor.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1300px] px-6 py-16 md:px-12">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {BART_TWEETS.map((t) => (
            <MemeCard key={t.id} t={t} onClick={() => setOpen(t)} />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[80] grid place-items-center bg-obsidian/85 p-6 backdrop-blur-md"
          >
            <motion.div
              layoutId={`tweet-${open.id}`}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl border border-ink bg-charcoal p-8 shadow-[0_30px_80px_-20px_var(--ink)]"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-ink font-display text-2xl text-pearl">B</div>
                <div className="leading-tight">
                  <p className="text-lg text-pearl">Bartholomew</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/60">@OOO_ETERNAL · {open.time}</p>
                </div>
                <span className="ml-auto"><ToneTag tone={open.tone} /></span>
              </div>
              <p className="font-display text-2xl leading-snug text-pearl">{open.text}</p>
              <div className="mt-6 flex items-center gap-6 border-t border-border pt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/60">
                <span>♡ {open.likes.toLocaleString()}</span>
                <span>↻ {open.rts.toLocaleString()}</span>
                <button
                  onClick={() => setOpen(null)}
                  className="ml-auto border border-border px-3 py-1 text-pearl hover:border-ink hover:text-ink"
                >
                  Close ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
