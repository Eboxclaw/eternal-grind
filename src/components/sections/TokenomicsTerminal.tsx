import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Lock, ExternalLink, LineChart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import {
  INKO_BUY_URL,
  INKO_CA,
  INKO_COMMUNITY_URL,
  INKO_BRIDGE_URL,
  INKO_DEBANK_URL,
  INKO_DEV_LOCK_TX_URL,
  INKO_DEXSCREENER_URL,
  INKO_GECKOTERMINAL_URL,
  INKO_INKYSWAP_POOL_URL,
  INKO_VELODROME_POOL_URL,
} from "@/lib/ooo";
import inkoCoin from "@/assets/inko-coin.png";

const SHORT_CA = `${INKO_CA.slice(0, 6)}…${INKO_CA.slice(-4)}`;
const CHART_EMBED_URL =
  "https://dexscreener.com/ink/0x2b6d23b85582c7bdfe1caec327af5161b220ffb2?embed=1&theme=dark&trades=0&info=0";
const BUY_EMBED_URL =
  "https://jumper.exchange/?fromChain=57073&fromToken=0x0000000000000000000000000000000000000000&toChain=57073&toToken=0x767f1e9fedff2bfa4f90a7effddfccc2970530ba";

const ROWS: { k: string; v: React.ReactNode; mono?: boolean }[] = [
  { k: "Ticker", v: "$INKO", mono: true },
  { k: "Supply", v: "1,000,000,000", mono: true },
  { k: "Network", v: "Inkchain" },
  { k: "Type", v: "Meme · Eternal Grind" },
  { k: "Tax", v: "0 / 0", mono: true },
  { k: "Utility", v: "Unlocks grind techniques" },
];

export function TokenomicsTerminal() {
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<"chart" | "buy">("chart");
  function copyCA() {
    navigator.clipboard.writeText(INKO_CA).then(
      () => {
        setCopied(true);
        toast.success("Contract address copied", { description: SHORT_CA });
        window.setTimeout(() => setCopied(false), 1500);
      },
      () => toast.error("Copy failed"),
    );
  }

  return (
    <section className="relative overflow-hidden border-y border-border bg-charcoal py-32 md:py-44">
      <div className="pointer-events-none absolute inset-0 pinstripe-strong opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-[1300px] px-6 md:px-12">
        <div className="mb-12 flex items-end justify-between gap-8">
          <div>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.5em] text-violet">Module 04 / Terminal</p>
            <h2 className="font-display text-5xl leading-[1.02] tracking-tight text-pearl md:text-6xl">
              Tokenomics Terminal.
            </h2>
            <p className="mt-6 max-w-xl font-display text-xl italic text-bone">
              "$INKO. The only asset that pumps when its holders do absolutely nothing."
            </p>
          </div>
          <img src={inkoCoin} alt="$INKO coin" className="hidden h-28 w-28 drop-shadow-[0_10px_40px_rgba(123,44,255,0.55)] md:block" draggable={false} />
        </div>

        <div className="grid gap-0 border border-border bg-obsidian/70 md:grid-cols-2">
          {ROWS.map((r) => (
            <div
              key={r.k}
              className="flex items-center justify-between border-b border-border px-6 py-6 md:border-r md:[&:nth-child(2n)]:border-r-0"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">{r.k}</span>
              <span className={r.mono ? "font-mono text-xl text-pearl" : "font-display text-2xl text-pearl"}>
                {r.v}
              </span>
            </div>
          ))}

          {/* Contract */}
          <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-6 md:border-r">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">Contract</span>
            <button
              onClick={copyCA}
              title={INKO_CA}
              aria-label={copied ? "Copied" : "Copy contract address"}
              className="group inline-flex max-w-full items-center gap-2 truncate border border-border bg-charcoal/60 px-3 py-2 font-mono text-sm text-pearl transition-all hover:border-ink hover:text-ink"
            >
              <span className="truncate">{SHORT_CA}</span>
              {copied
                ? <Check className="h-3.5 w-3.5 text-necro" />
                : <Copy className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100" />}
            </button>
          </div>

          {/* Dev supply lock — links to on-chain lock tx */}
          <div className="flex items-center justify-between border-b border-border px-6 py-6 md:[&:nth-child(2n)]:border-r-0">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">Dev supply</span>
            <a
              href={INKO_DEV_LOCK_TX_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="View 12-month lock tx on Inkchain explorer"
              className="inline-flex items-center gap-2 font-mono text-lg text-pearl underline decoration-ink/40 underline-offset-4 hover:text-ink"
            >
              <Lock className="h-4 w-4 text-ink" /> 25% · locked 12 months
              <ExternalLink className="h-3.5 w-3.5 opacity-70" />
            </a>
          </div>

          {/* Price (Dexscreener) */}
          <div className="flex items-center justify-between border-b border-border px-6 py-6 md:border-r">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">Price chart</span>
            <a href={INKO_DEXSCREENER_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-pearl underline decoration-ink/50 underline-offset-4 hover:text-ink">
              Dexscreener <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* GeckoTerminal */}
          <div className="flex items-center justify-between border-b border-border px-6 py-6 md:[&:nth-child(2n)]:border-r-0">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">Pool</span>
            <a href={INKO_GECKOTERMINAL_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-pearl underline decoration-ink/50 underline-offset-4 hover:text-ink">
              GeckoTerminal <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Velodrome pool */}
          <div className="flex items-center justify-between border-b border-border px-6 py-6 md:border-r">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">Velodrome</span>
            <a href={INKO_VELODROME_POOL_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-pearl underline decoration-ink/50 underline-offset-4 hover:text-ink">
              33% · USDT0-INKO · CL 200 · 0.3% <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* InkySwap locked pool */}
          <div className="flex items-center justify-between border-b border-border px-6 py-6 md:[&:nth-child(2n)]:border-r-0">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">InkySwap</span>
            <a href={INKO_INKYSWAP_POOL_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-pearl underline decoration-ink/50 underline-offset-4 hover:text-ink">
              23% · INKO-ETH · Uni V2 · locked · 0.3% <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* DeBank */}
          <div className="flex items-center justify-between border-b border-border px-6 py-6 md:border-r">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">Holdings</span>
            <a href={INKO_DEBANK_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-pearl underline decoration-ink/50 underline-offset-4 hover:text-ink">
              DeBank <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Bridge */}
          <div className="flex items-center justify-between border-b border-border px-6 py-6 md:[&:nth-child(2n)]:border-r-0">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">Bridge to Ink</span>
            <a href={INKO_BRIDGE_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-pearl underline decoration-ink/50 underline-offset-4 hover:text-ink">
              Jumper.xyz <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Community */}
          <div className="flex items-center justify-between px-6 py-6 md:border-r md:[&:nth-child(2n)]:border-r-0">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">Community</span>
            <a href={INKO_COMMUNITY_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-pearl underline decoration-ink/50 underline-offset-4 hover:text-ink">
              inkypump.com/join/INKO <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 flex flex-col items-start justify-between gap-6 border border-ink/50 bg-gradient-to-r from-ink/15 via-violet/10 to-ink/15 p-8 md:flex-row md:items-center md:p-10"
        >
          <div>
            <p className="font-display text-4xl text-pearl text-glow md:text-5xl">Grind Eternally.</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">
              Live on Inkchain · 1B supply · zero deliverables
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={INKO_BRIDGE_URL} target="_blank" rel="noopener noreferrer"
              className="border border-border bg-charcoal/60 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-pearl transition-all hover:border-ink hover:text-ink">
              Bridge to Ink →
            </a>
            <a href={INKO_BUY_URL} target="_blank" rel="noopener noreferrer"
              className="border border-ink bg-ink/30 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-pearl transition-all hover:bg-ink/50 hover:shadow-[0_0_40px_var(--ink)]"
            >
              Buy $INKO →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
