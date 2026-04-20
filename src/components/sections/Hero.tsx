import { motion } from "framer-motion";

const WORDS = ["OUT", "OF", "OFFICE"];

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Ink blob */}
      <svg className="pointer-events-none absolute inset-0 -z-10 h-full w-full" aria-hidden>
        <defs>
          <filter id="goo">
            <feGaussianBlur stdDeviation="40" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" />
          </filter>
          <radialGradient id="g1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7B2CFF" stopOpacity="1" />
            <stop offset="60%" stopColor="#7B2CFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7B2CFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g filter="url(#goo)" className="animate-blob origin-center">
          <circle cx="50%" cy="50%" r="240" fill="url(#g1)" />
          <circle cx="42%" cy="55%" r="180" fill="url(#g1)" />
          <circle cx="58%" cy="48%" r="200" fill="url(#g1)" />
        </g>
      </svg>

      {/* Top corner badges */}
      <div className="pointer-events-none absolute left-6 top-20 font-mono text-[10px] uppercase tracking-[0.4em] text-bone/70 md:left-12">
        Eternity Corp <br /> <span className="text-ink">EST. ∞</span>
      </div>
      <div className="pointer-events-none absolute right-6 top-20 font-mono text-[10px] uppercase tracking-[0.4em] text-bone/70 md:right-12">
        $OOO <span className="text-ink">▲ 420.69%</span> <br />
        <span className="text-bone/50">Ink Chain · LIVE</span>
      </div>

      <div className="relative z-10 px-4 text-center">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.5em] text-violet">
          A Hostile Takeover of the Void
        </p>

        <h1 className="font-display text-[18vw] font-semibold leading-[0.85] tracking-tight md:text-[14vw]">
          {WORDS.map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.15 + i * 0.18, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="block text-pearl text-glow"
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-10 font-display text-2xl italic text-bone md:text-3xl"
        >
          "Synergizing the Void, Forever."
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-14 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-bone/70"
        >
          <span className="h-px w-10 bg-bone/40" />
          Scroll
          <span className="animate-bob inline-block">↓</span>
          <span className="h-px w-10 bg-bone/40" />
        </motion.div>
      </div>
    </section>
  );
}
