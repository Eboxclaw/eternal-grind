import { Marquee } from "@/components/Marquee";

const TOP = [
  "PER MY LAST EMAIL",
  "THE DEV IS DUST",
  "BUY THE FUCKING DIP, REGARDS",
  "SYNERGIZE THE VOID",
  "$OOO",
  "INK CHAIN",
  "OUT OF OFFICE",
];
const BOT = [
  "Q∞ EARNINGS — UP ONLY",
  "BARTHOLOMEW IS WATCHING",
  "PIP ISSUED TO ALL JEETS",
  "SKELETON CREW APPROVED",
  "ARWEAVE LOCKED UNTIL 2126",
  "INFERENCE = ETERNITY",
];

export function TickerBand() {
  return (
    <section className="relative border-y border-border bg-charcoal py-3">
      <Marquee items={TOP} className="border-b border-border/40 pb-3" itemClassName="text-pearl" />
      <Marquee items={BOT} reverse className="pt-3" itemClassName="text-ink" />
    </section>
  );
}
