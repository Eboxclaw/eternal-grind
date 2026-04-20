import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import bart from "@/assets/bartholomew.jpg";

const TYPED_LINES = [
  "NAME       :: Bartholomew",
  "TITLE      :: CEO / Board / Intern",
  "LIFESPAN   :: 100 years",
  "EMPLOYER   :: Eternity Corp",
  "STATUS     :: ETERNAL",
  "MOOD       :: Caffeinated, vengeful",
];

export function MeetBart() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const [typed, setTyped] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          let i = 0;
          const tick = () => {
            if (i >= TYPED_LINES.length) { setDone(true); return; }
            setTyped((prev) => [...prev, TYPED_LINES[i]]);
            i++;
            setTimeout(tick, 280);
          };
          tick();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-border bg-charcoal py-32 md:py-44">
      <div className="pointer-events-none absolute inset-0 pinstripe opacity-50" aria-hidden />
      <div className="pointer-events-none absolute -left-32 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-ink/20 blur-[120px]" aria-hidden />

      <div className="relative mx-auto grid max-w-[1300px] gap-16 px-6 md:grid-cols-2 md:items-center md:px-12">
        {/* Portrait */}
        <motion.div style={{ y }} className="group relative">
          <div className="relative aspect-square w-full overflow-hidden border border-border bg-obsidian">
            <img
              src={bart}
              alt="Bartholomew, CEO of Eternity Corp — a corporate lich in pinstripe suit"
              width={1024}
              height={1024}
              loading="lazy"
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.03] group-hover:saturate-150"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60" />
            {/* ink drips */}
            <span className="pointer-events-none absolute left-[20%] top-0 h-12 w-[2px] bg-obsidian animate-drip" style={{ animationDelay: "0s" }} />
            <span className="pointer-events-none absolute left-[55%] top-0 h-16 w-[2px] bg-obsidian animate-drip" style={{ animationDelay: "0.7s" }} />
            <span className="pointer-events-none absolute left-[78%] top-0 h-10 w-[2px] bg-obsidian animate-drip" style={{ animationDelay: "1.3s" }} />
          </div>
          <div className="absolute -bottom-4 left-4 right-4 flex items-center justify-between border border-border bg-obsidian px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-bone">
            <span>FILE / 0001 / BART.exe</span>
            <span className="text-ink">● LIVE</span>
          </div>
        </motion.div>

        {/* Bio */}
        <div>
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.5em] text-violet">§02 — Meet the CEO</p>
          <h2 className="font-display text-5xl leading-[1.02] tracking-tight text-pearl md:text-6xl">
            <span className="animate-glitch inline-block">Bartholomew.</span>
          </h2>
          <p className="mt-6 max-w-md text-bone">
            A hyper-caffeinated corporate lich. Skeleton crew of one. He inherited the company
            when the dev walked into the sea and now files quarterly earnings into the abyss.
            He does not sleep. He does not blink. He only compounds.
          </p>

          <div className="mt-10 border border-border bg-obsidian/60 p-6 font-mono text-sm text-pearl">
            {typed.map((l, i) => (
              <div key={i} className={i === typed.length - 1 && !done ? "caret" : ""}>
                <span className="text-ink">›</span> {l}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
