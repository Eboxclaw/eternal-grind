import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function CountUp({ to, duration = 1800, format }: { to: number; duration?: number; format?: (n: number) => string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const startedRef = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !startedRef.current) {
        startedRef.current = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setV(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{format ? format(v) : v.toLocaleString()}</span>;
}

const ROWS: { k: string; v: React.ReactNode; mono?: boolean }[] = [
  { k: "Total Supply", v: <><CountUp to={1_000_000_000} /> $OOO</>, mono: true },
  { k: "Liquidity",    v: <span className="text-ink">BURNED 🔥</span> },
  { k: "Team Allocation", v: <span><CountUp to={0} />% <span className="text-bone/60">(Dev is dust)</span></span> },
  { k: "CEO",          v: "Bartholomew (immortal)" },
  { k: "Arweave Storage", v: <>Paid until <CountUp to={2126} format={(n) => String(n)} /></> },
  { k: "Inference Credits", v: <span className="font-display text-3xl text-ink">∞</span> },
];

export function Tokenomics() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-charcoal py-32 md:py-44">
      <div className="pointer-events-none absolute inset-0 pinstripe-strong opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-[1300px] px-6 md:px-12">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.5em] text-violet">§04 — Tokenomics / Q∞ Filing</p>
            <h2 className="font-display text-5xl leading-[1.02] tracking-tight text-pearl md:text-6xl">
              The numbers, for HR.
            </h2>
          </div>
          <div className="hidden md:block font-mono text-[10px] uppercase tracking-[0.4em] text-bone/60">
            Form 10-K · Eternity Corp <br />
            Filed: NEVER · Audited by: SELF
          </div>
        </div>

        <div className="grid gap-0 border border-border bg-obsidian/70 md:grid-cols-2">
          {ROWS.map((r, i) => (
            <div
              key={r.k}
              className="flex items-center justify-between border-b border-border px-6 py-6 last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0 md:border-r md:[&:nth-child(2n)]:border-r-0"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">{r.k}</span>
              <span className={r.mono ? "font-mono text-xl text-pearl" : "font-display text-2xl text-pearl"}>
                {r.v}
              </span>
            </div>
          ))}
        </div>

        {/* Allocation bar */}
        <div className="mt-12">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.4em] text-bone/70">
            Allocation breakdown
          </p>
          <div className="flex h-12 w-full overflow-hidden border border-border bg-obsidian">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center bg-gradient-to-r from-ink via-violet to-ink font-mono text-[10px] uppercase tracking-[0.3em] text-obsidian"
            >
              100% LIQUIDITY · BURNED · FOREVER
            </motion.div>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/60">
            <span>Team: 0%</span>
            <span className="text-center">Marketing: 0%</span>
            <span className="text-right">Bart's coffee fund: 0%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
