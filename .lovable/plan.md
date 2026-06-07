# Audit & Polish — Priorities

Focused on **UX polish + code quality**, with the **paycheck calculator** as the #1 fix. Light, surgical changes — no architectural rewrites.

---

## 1. Smug Paycheck Calculator (priority) — `src/components/sections/BathroomROI.tsx`

### Bugs found
- **Hydration race**: the mount-time write effect fires with default state (`seconds=0, running=false, startedAt=null`) on the same tick as the restore effect, briefly clobbering storage. Visible if the user reloads mid-session and the page is killed before the next render.
- **Drifting timer**: `setInterval(…, 1000)` is throttled by the browser when the tab is backgrounded → "earned" undercounts. The displayed timer also drifts vs wall clock for long sessions.
- **No flush on close**: closing the tab while running loses up to ~5s (the unflushed chunk) from lifetime totals.
- **No per-activity visibility**: profile stores `activityTotals` per activity but the UI only shows one combined number, so the user can't see whether "Toilet Grind" or "Coffee Walk" is winning.

### Fixes
- Switch to **wall-clock model**: state = `{ activeId, baseSeconds, startedAt | null }`. Displayed seconds = `baseSeconds + (running ? (now - startedAt)/1000 : 0)`. A 250ms `requestAnimationFrame`/interval just re-renders; the source of truth is timestamps, so backgrounded tabs stay accurate.
- **Hydration guard**: add `hydrated` flag; the persistence effect no-ops until restore has run. Eliminates the race.
- **Flush on unload**: `visibilitychange` + `pagehide` listeners call `addActivitySeconds(...)` for the unflushed delta. Also flush every 10s while running (cheaper than every 5s now that ticks aren't the source of truth).
- **Per-activity breakdown**: under the "Lifetime grind" card, render a compact 2-column grid: icon · label · `mm:ss` · `$x.xx`, sorted descending. Adds a tiny `Clear lifetime` ghost button (with confirm) that calls the existing `clearActivityTotals()`.
- **Correctness pass on rate math**: keep `salary / (hpw * 52 * 3600)` but clamp hpw with `Math.min(80, Math.max(1, …))` (already partial). Add a defensive `Number.isFinite` check so a cleared salary field doesn't render `$NaN`.
- **A11y / tap target**: bump activity buttons to `min-h-11` for mobile thumbs, add `aria-pressed` on the selected one, add `aria-live="polite"` on the earned-this-session figure.

### Storage shape (migration-safe)
New key `inko.calc.session.v2` (read v1 once for back-compat, then drop). Shape:
```ts
{ activeId: ActivityId; baseSeconds: number; startedAt: number | null }
```

---

## 2. Calendar — small UX wins — `src/routes/calendar.tsx`

The selection model + row/col chevrons + right-click submenu already shipped. Remaining polish:
- **Discoverability hint**: first-load one-time toast (`localStorage` flag `inko.cal.hint.v1`) explaining "Click to select · Shift-click for range · Right-click for options".
- **Selection toolbar**: make the count + `$ / hour` figure update with a subtle pulse on change so the user notices it; add a `Esc to clear` micro-hint.
- **Keyboard**: `Esc` already clears — add `Cmd/Ctrl+A` to select all editable cells when the grid has focus.
- **Mobile**: replace right-click with long-press (350ms) — currently right-click is desktop-only.
- **Perf**: memoize the per-cell derived `BusyMap` / external-event lookup so dragging across the grid doesn't re-walk all events each cell.

## 3. Tokenomics Terminal — `src/components/sections/TokenomicsTerminal.tsx`

- Truncate the CA display (`0x767F…30Ba`) on mobile so the row doesn't horizontally scroll; full address on hover/title.
- Add tiny green dot + "verified" tooltip on the Dev-lock row that opens the explorer tx.
- `Copy CA` button gets an "✓ Copied" state for 1.5s (currently just a toast).

## 4. Cross-cutting polish

- **`src/lib/ooo.ts`**: drop the unused `_unused = Droplet` export and unused `Droplet` import.
- **Nav**: add `aria-current="page"` to active link (Radix link already adds class — also expose to AT).
- **SEO**: every route already has its own `head()`; verify `og:image` exists at root and add per-route `description` if missing on `/missions` and `/academy`.
- **Bundle**: confirm `framer-motion` only imported in sections that use it; remove dead imports flagged by grep.

---

## Out of scope
- No backend / Cloud changes.
- No new dependencies.
- No design-system / color overhaul.
- No new routes.

## Files touched
- `src/components/sections/BathroomROI.tsx` (main rewrite of timer + persistence + per-activity panel)
- `src/lib/profile.ts` (no schema change; just expose a small `ACTIVITY_META` map if needed for the breakdown — optional)
- `src/routes/calendar.tsx` (hint toast, Cmd+A, long-press, memo)
- `src/components/sections/TokenomicsTerminal.tsx` (CA truncate, copied state)
- `src/lib/ooo.ts` (cleanup)
