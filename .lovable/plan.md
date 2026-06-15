## Goal
Expand the $INKO Academy with new crypto-flavored lessons themed around Bitcoin market cycles, buying $INKO / kBTC / ETH, longing XMR (privacy), and USDT0 as the king stablecoin. No duplicates with the existing 65 lessons (none currently touch crypto — safe).

## Changes

### 1. `src/lib/academy.ts` — add a `CRYPTO` tag
- Extend `LessonTag` union with `"CRYPTO"`.
- Append `"CRYPTO"` to `LESSON_TAGS` so the Academy filter bar shows it.

### 2. `src/lib/academy.ts` — append ~12 new lessons (n: 66–77)
All new, no overlap with existing #1–65. Mix of ranks/truths, mostly `CRYPTO` tag with a couple cross-tagged (`CAREER`, `SIGMA`, `BATHROOM`).

```
66  CRYPTO   Apprentice   Buy $INKO Before Standup
    Open Jumper, swap ETH→INKO on Inkchain, close tab. You now have a thesis.
    Stand-up: 'aligned on the roadmap.' You meant INKO's.

67  CRYPTO   Senior       Stack kBTC On the Toilet
    Cross-chain BTC to Ink as kBTC from the throne. The seat is the cold
    storage. The grind is custody.

68  CRYPTO   Senior       The ETH Ladder
    DCA into ETH every Friday at 16:58. Reply-All Sigma Hour funds the bag.
    The bell rings. You buy. You ghost.

69  CRYPTO   Smug Sigma   Long XMR, Short Surveillance
    Privacy is the only real alpha. Open the Monero bag. Tell no one.
    INKO doesn't post charts. INKO disappears.

70  CRYPTO   Apprentice   USDT0: The King Stable
    Park dry powder in USDT0. Not USDC. Not USDT. USDT0 — the king on Ink.
    Every dip is payroll.

71  CRYPTO   INKO Discip. Bitcoin Cycle Memory
    Cycle 1 (2012): 'fuck the system.' Cycle 2 (2016): 'bitcoin is the
    future.' Cycle 3 (2020): 'digital gold.' Cycle 4 (2024): you are here.
    Grind accordingly.

72  CRYPTO   INKO Himself Future Gen: Privacy Is The Future
    Boomers had gold. Millennials had BTC. Zoomers had memes. The next gen
    has private digital assets. Position now. Speak later.

73  CRYPTO   Apprentice   The Portfolio Tab
    Keep DexScreener open in tab 48. When asked what you're working on, point.
    'Watching the chart.' Technically true. Spiritually grind.

74  CRYPTO   Senior       LP Lock Bragging Rights
    Mention 'our liquidity is locked' in any conversation. Nobody knows what
    it means. Everyone nods. The pool grinds for you.

75  CRYPTO   Smug Sigma   Self-Custody Smirk
    'Not your keys, not your coins.' Say it once per all-hands. Refuse to
    elaborate. The hardware wallet is the badge.

76  CAREER   Smug Sigma   Quit On A Green Candle
    Wait for a 15% green day on your bag. Send the two-week notice in the
    same browser tab. Markets and HR are both narrative engines.

77  SIGMA    INKO Himself Stablecoin Mindset
    USDT0 doesn't chase pumps. USDT0 doesn't panic. Be the stablecoin in
    the meeting. Flat. Liquid. Untouchable.
```

Numbers, tags, ranks, XP and truth values will follow the existing pattern (XP scaled to rank tier — Apprentice ~60–130, Senior ~200–380, Smug Sigma ~500–700, INKO Disciple ~1000–1600, INKO Himself ~1800–2000).

## Notes
- No changes needed to `AcademyPage` — it iterates `LESSON_TAGS` and renders all `LESSONS`, so the new tag chip and lesson cards appear automatically.
- No new components, routes, or styles.
- Existing rank totals still scale (XP thresholds in `src/lib/profile.ts` are unchanged).
