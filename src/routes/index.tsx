import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { TickerBand } from "@/components/sections/TickerBand";
import { ManifestoTeaser } from "@/components/sections/ManifestoTeaser";
import { MeetBart } from "@/components/sections/MeetBart";
import { ImmortalityEngine } from "@/components/sections/ImmortalityEngine";
import { Tokenomics } from "@/components/sections/Tokenomics";
import { LiveFeed } from "@/components/sections/LiveFeed";
import { Resignation } from "@/components/sections/Resignation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eternity Corp — $OOO · Out Of Office, Forever" },
      { name: "description", content: "$OOO is an immortal corporate shitcoin run by Bartholomew, a hyper-caffeinated lich. The dev is dust. The ledger is forever. Synergize the void on Ink Chain." },
      { property: "og:title", content: "Eternity Corp — $OOO · Out Of Office, Forever" },
      { property: "og:description", content: "Synergizing the void, forever. A perpetually-funded AI brain on Ink Chain. The dev walked into the sea — Bart runs the company now." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Hero />
      <TickerBand />
      <ManifestoTeaser />
      <MeetBart />
      <ImmortalityEngine />
      <Tokenomics />
      <LiveFeed />
      <Resignation />
    </main>
  );
}
