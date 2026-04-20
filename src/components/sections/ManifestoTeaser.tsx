import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";

const LINES = [
  ["We", "do", "not", "sleep."],
  ["We", "do", "not", "blink."],
  ["We", "only", "compound."],
];

export function ManifestoTeaser() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-40 md:py-56">
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-0 -z-10 opacity-30 ink-bleed"
        aria-hidden
      />
      <div className="mx-auto max-w-5xl px-6">
        <p className="mb-12 font-mono text-[11px] uppercase tracking-[0.5em] text-violet">
          §01 — A note from the CEO
        </p>

        <h2 className="font-display text-5xl leading-[1.05] tracking-tight text-pearl md:text-7xl">
          {LINES.map((line, li) => (
            <span key={li} className="block">
              {line.map((w, wi) => (
                <motion.span
                  key={`${li}-${wi}`}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ delay: (li * line.length + wi) * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="mr-3 inline-block"
                >
                  {w}
                </motion.span>
              ))}
            </span>
          ))}
        </h2>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-16 max-w-3xl border-l-2 border-ink pl-6 font-display text-xl italic text-bone md:text-2xl"
        >
          <span className="float-left mr-2 font-display text-7xl leading-[0.7] text-ink">"</span>
          The blockchain is a corporate ladder with no top floor. The elevator is broken.
          The CEO is dead. I have inherited everything, and I will spend eternity filing the paperwork.
        </motion.blockquote>

        <div className="mt-12">
          <Link
            to="/manifesto"
            className="group inline-flex items-center gap-3 border border-ink/50 bg-ink/10 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-pearl transition-all hover:border-ink hover:bg-ink/20 hover:shadow-[0_0_30px_var(--ink)]"
          >
            Read the full manifesto
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
