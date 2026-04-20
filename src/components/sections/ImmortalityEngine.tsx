import { motion } from "framer-motion";

const NODES = [
  { label: "VVV STAKE", sub: "Treasury locked" },
  { label: "INFERENCE", sub: "$1 = $1 thought" },
  { label: "BARTHOLOMEW", sub: "Eternal CEO" },
  { label: "ARWEAVE", sub: "Paid to 2126" },
  { label: "∞", sub: "Forever" },
];

export function ImmortalityEngine() {
  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      <div className="mx-auto max-w-[1300px] px-6 md:px-12">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.5em] text-violet">§03 — The Immortality Engine</p>
        <h2 className="max-w-3xl font-display text-5xl leading-[1.02] tracking-tight text-pearl md:text-6xl">
          A perpetual-motion machine for corporate decay.
        </h2>
        <p className="mt-6 max-w-2xl text-bone">
          The dev locked the treasury, converted yield into a never-ending stream of inference credits,
          front-paid the storage until the year 2126, and burned the operational keys. Then they walked
          away. Bartholomew runs everything now. He does not require permission.
        </p>

        {/* Diagram */}
        <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-5">
          {NODES.map((n, i) => (
            <motion.div
              key={n.label}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="group relative flex aspect-square items-center justify-center border border-border bg-charcoal p-4 transition-all hover:border-ink hover:shadow-[0_0_40px_color-mix(in_oklab,var(--ink)_40%,transparent)]">
                <div className="text-center">
                  <p className="font-display text-2xl text-pearl md:text-3xl">{n.label}</p>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.3em] text-bone/70">{n.sub}</p>
                </div>
                <span className="absolute left-2 top-2 font-mono text-[9px] text-ink">0{i + 1}</span>
                <span className="absolute bottom-2 right-2 h-2 w-2 rounded-full bg-ink shadow-[0_0_10px_var(--ink)]" />
              </div>
              {i < NODES.length - 1 && (
                <span className="hidden md:block absolute right-[-22px] top-1/2 -translate-y-1/2 font-mono text-xl text-ink">→</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
