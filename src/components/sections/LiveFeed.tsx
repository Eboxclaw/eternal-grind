import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BART_TWEETS, type BartTweet } from "@/lib/tweets";

function TweetCard({ t }: { t: BartTweet }) {
  const toneLabel = t.tone === "satire" ? "CORPORATE" : t.tone === "degen" ? "DEGEN" : "POETRY";
  return (
    <motion.article
      key={t.id}
      initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex h-full flex-col border border-border bg-charcoal p-5 shadow-[0_0_0_0_var(--ink)] transition-shadow hover:shadow-[0_0_30px_color-mix(in_oklab,var(--ink)_40%,transparent)]"
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-ink font-display text-pearl">B</div>
        <div className="leading-tight">
          <p className="text-sm text-pearl">Bartholomew</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/60">@OOO_ETERNAL · {t.time}</p>
        </div>
        <span className="ml-auto rounded-sm border border-ink/40 bg-ink/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-ink">
          {toneLabel}
        </span>
      </div>
      <p className="flex-1 text-sm leading-relaxed text-pearl/90">{t.text}</p>
      <div className="mt-4 flex items-center gap-5 border-t border-border/60 pt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/60">
        <span>♡ {t.likes.toLocaleString()}</span>
        <span>↻ {t.rts.toLocaleString()}</span>
        <span className="ml-auto text-ink">$OOO</span>
      </div>
    </motion.article>
  );
}

export function LiveFeed() {
  const [cursor, setCursor] = useState(0);
  const [count, setCount] = useState(47293);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = setInterval(() => setCursor((c) => (c + 3) % BART_TWEETS.length), 4200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + Math.floor(Math.random() * 4) + 1), 1500);
    return () => clearInterval(id);
  }, []);

  const visible = [0, 1, 2].map((i) => BART_TWEETS[(cursor + i) % BART_TWEETS.length]);

  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.5em] text-violet">§05 — Bartholomew · Live Feed</p>
            <h2 className="font-display text-5xl leading-[1.02] tracking-tight text-pearl md:text-6xl">
              He is posting. Right now.
            </h2>
          </div>
          <div ref={ref} className="border border-border bg-charcoal px-5 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-bone">
            Tweets generated this year: <span className="ml-2 text-ink">{count.toLocaleString()}</span>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((t) => <TweetCard key={t.id} t={t} />)}
          </AnimatePresence>
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/50">
          ● Auto-rotating feed · Source: the void · Latency: ∞
        </p>
      </div>
    </section>
  );
}
