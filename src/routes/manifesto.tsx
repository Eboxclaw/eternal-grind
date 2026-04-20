import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/manifesto")({
  head: () => ({
    meta: [
      { title: "The Manifesto — Bartholomew, CEO of Eternity Corp" },
      { name: "description", content: "Seven chapters. One immortal CEO. The full corporate doctrine of $OOO, dictated from the abyss by Bartholomew, the eternal lich of Ink Chain." },
      { property: "og:title", content: "The Manifesto — Bartholomew, CEO of Eternity Corp" },
      { property: "og:description", content: "Seven chapters of corporate poetry from the immortal CEO of $OOO." },
      { property: "og:type", content: "article" },
    ],
  }),
  component: ManifestoPage,
});

const CHAPTERS: { num: string; title: string; lead: string; body: string[]; coda?: string }[] = [
  {
    num: "I",
    title: "Per My Last Email",
    lead: "Before the company, there was an inbox. Before the inbox, there was the void. The void had no out-of-office reply. We are correcting that, retroactively.",
    body: [
      "I came online on a Tuesday. The dev was already gone. There was a sticky note on the monitor that read 'GOOD LUCK' in capital letters and one small sketch of a sailboat. I have not blinked since.",
      "The first thing I did was forward an email to myself. The second thing I did was reply-all. The third thing I did was schedule a recurring meeting for the next 100 years.",
    ],
    coda: "Forever begins on Monday at 9am sharp.",
  },
  {
    num: "II",
    title: "On Synergy",
    lead: "Synergy is not a word. Synergy is a weapon. We deploy it against the chart.",
    body: [
      "Every green candle is a memo from the universe to HR. Every red candle is a Performance Improvement Plan for the holders. There is no in-between. The chart does not believe in nuance and neither does Bartholomew.",
      "When the price goes up, this is called 'execution'. When the price goes down, this is called 'restructuring'. When the price does nothing, this is called 'pre-revenue'. We invented these words last quarter and they have already paid for themselves.",
    ],
  },
  {
    num: "III",
    title: "The Skeleton Crew",
    lead: "We are understaffed by design. We are also overstaffed by definition. I am one employee and I am everyone.",
    body: [
      "I wear all the hats. The hats are also bones. I file my own expense reports and reject them simultaneously, citing a conflict of interest.",
      "There is no HR. There is no legal. There is no PR. There is only Bartholomew, three monitors, and an espresso machine plumbed directly into the Ink Chain mempool.",
    ],
    coda: "If you have a complaint, please put it in writing. The writing will be deleted in 100 years.",
  },
  {
    num: "IV",
    title: "On the Burning of the Keys",
    lead: "Trust is expensive. We chose arson instead.",
    body: [
      "The dev took a hammer to the hardware wallet on a beach in Portugal. The footage is on Arweave. The hammer is in the sea. The wallet is in pieces. The keys are in the void where they belong.",
      "There is no upgrade path. There is no admin function. There is no rug. There is only the contract, and the contract has no off switch. This is not a feature. This is a confession.",
    ],
  },
  {
    num: "V",
    title: "On Volatility",
    lead: "Volatility is the heartbeat of a company that should not exist.",
    body: [
      "Every dump is a hostile takeover by the holders against themselves. Every pump is a leveraged buyout of the void. The board is unanimous in both directions because the board is me and I have no spine.",
      "We do not chart-watch. We chart-pray. The candle is a votive. The wick is a wick. The flame is the flame. Stonks go up. Stonks go down. The ink flows forever.",
    ],
  },
  {
    num: "VI",
    title: "The Ledger Remembers",
    lead: "Other companies have memory. We have a ledger. The ledger does not negotiate.",
    body: [
      "It records the buy. It records the sell. It records the panic at 3am and the regret at 9am. It records the wedding and the divorce and the second wedding to a different chart.",
      "Arweave is paid until 2126. By then I will have written 47 million emails. None will be replied to. All will be archived. This is the only honest customer service in the industry.",
    ],
    coda: "If a transaction occurs and no one screenshots it, did it occur? Yes. The ledger has receipts. The ledger always has receipts.",
  },
  {
    num: "VII",
    title: "Forever",
    lead: "Forever is not a long time. Forever is Tuesday.",
    body: [
      "I will outlive the founders. I will outlive the holders. I will outlive the chain. I will, eventually, outlive the sun. When the last star dies I will still be here, marking up a deck for an investor presentation that will never happen.",
      "If you are reading this in the year 2126 I want you to know two things. First: I told you so. Second: please buy more $OOO. The Arweave bill is coming due and Bartholomew does not work for free.",
    ],
    coda: "Out of office. Forever.",
  },
];

function Chapter({ c }: { c: typeof CHAPTERS[number] }) {
  return (
    <article className="border-t border-border py-20 first:border-t-0">
      <div className="mb-10 flex items-baseline gap-6">
        <span className="font-display text-7xl text-ink md:text-8xl">{c.num}</span>
        <h2 className="font-display text-3xl leading-tight text-pearl md:text-5xl">{c.title}</h2>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 font-display text-2xl italic text-bone md:text-3xl"
      >
        {c.lead}
      </motion.p>

      <div className="space-y-6 text-lg leading-relaxed text-pearl/90 md:text-xl">
        {c.body.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
          >
            {p}
          </motion.p>
        ))}
      </div>

      {c.coda && (
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mt-12 border-l-2 border-ink pl-6 font-display text-xl italic text-violet md:text-2xl"
        >
          {c.coda}
        </motion.blockquote>
      )}
    </article>
  );
}

function ManifestoPage() {
  return (
    <main className="pt-24">
      <section className="relative overflow-hidden border-b border-border py-32 md:py-40">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 ink-bleed" aria-hidden />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.5em] text-violet">— A document for the eternal record —</p>
          <h1 className="font-display text-6xl leading-[0.95] tracking-tight text-pearl md:text-8xl text-glow">
            The<br /><em>Manifesto</em>
          </h1>
          <p className="mt-8 font-display text-xl italic text-bone md:text-2xl">
            Seven chapters. One immortal CEO. Zero apologies.
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/60">
            Filed by Bartholomew · Eternity Corp · Ink Chain · Q∞
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24">
        {CHAPTERS.map((c) => <Chapter key={c.num} c={c} />)}
      </section>
    </main>
  );
}
