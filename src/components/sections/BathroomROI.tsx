import { useEffect, useMemo, useRef, useState } from "react";
import {
  Play, Square, RotateCcw, Circle, Armchair, Coffee, Wind,
  UtensilsCrossed, EyeOff, Users, Trash2, type LucideIcon,
} from "lucide-react";
import {
  useProfile, setProfile, addActivitySeconds, clearActivityTotals, type ActivityId,
} from "@/lib/profile";

interface Activity { id: ActivityId; label: string; icon: LucideIcon; tagline: string; }
const ACTIVITIES: Activity[] = [
  { id: "toilet", label: "Toilet Grind",   icon: Armchair,         tagline: "Spiritual ROI. Per second." },
  { id: "coffee", label: "Coffee Walk",    icon: Coffee,           tagline: "The mug is the badge." },
  { id: "smoke",  label: "Smoke Break",    icon: Wind,             tagline: "Outside. Untouchable." },
  { id: "lunch",  label: "Eating Lunch",   icon: UtensilsCrossed,  tagline: "Crumbs are receipts." },
  { id: "busy",   label: "Looking Busy",   icon: EyeOff,           tagline: "Two monitors. Zero output." },
  { id: "nod",    label: "Strategic Nod",  icon: Users,            tagline: "'Good point.' Meeting moves on." },
];
const ACTIVITY_BY_ID: Record<ActivityId, Activity> = Object.fromEntries(
  ACTIVITIES.map((a) => [a.id, a]),
) as Record<ActivityId, Activity>;

// v2 session — wall-clock based. baseSeconds = banked time before current run;
// when running, displayed = base + (now - startedAt) / 1000.
const SESSION_KEY = "inko.calc.session.v2";
const LEGACY_KEY = "inko.calc.session.v1";
type Session = { activeId: ActivityId; baseSeconds: number; startedAt: number | null };

function readSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) return JSON.parse(raw);
    // one-time migrate v1 → v2
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (!legacy) return null;
    const p = JSON.parse(legacy) as {
      activeId: ActivityId; seconds: number; running: boolean; startedAt: number | null;
    };
    const elapsed = p.running && p.startedAt ? Math.floor((Date.now() - p.startedAt) / 1000) : 0;
    const migrated: Session = {
      activeId: p.activeId ?? "toilet",
      baseSeconds: Math.max(0, (p.seconds ?? 0) + elapsed),
      startedAt: null,
    };
    localStorage.removeItem(LEGACY_KEY);
    return migrated;
  } catch { return null; }
}
function writeSession(s: Session) {
  try { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch {}
}

export function BathroomROI() {
  const [profile, hydrated] = useProfile();
  const [activeId, setActiveId] = useState<ActivityId>("toilet");
  const [baseSeconds, setBaseSeconds] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [, force] = useState(0);
  const restoredRef = useRef(false);
  const lastFlushRef = useRef(0); // total seconds already banked into profile

  // Restore from storage exactly once before any persistence writes happen.
  useEffect(() => {
    const s = readSession();
    if (s) {
      setActiveId(s.activeId);
      setBaseSeconds(s.baseSeconds);
      setStartedAt(s.startedAt ?? null);
      lastFlushRef.current = s.baseSeconds;
    }
    restoredRef.current = true;
    force((n) => n + 1);
  }, []);

  // Persist (no-op until restore has run, so we never clobber storage).
  useEffect(() => {
    if (!restoredRef.current) return;
    writeSession({ activeId, baseSeconds, startedAt });
  }, [activeId, baseSeconds, startedAt]);

  const running = startedAt !== null;

  // Re-render driver while running. Tab-throttled, but the displayed value is
  // derived from wall-clock, so accuracy is preserved.
  useEffect(() => {
    if (!running) return;
    const t = window.setInterval(() => force((n) => n + 1), 250);
    return () => window.clearInterval(t);
  }, [running]);

  const currentSeconds = useMemo(() => {
    if (!running) return baseSeconds;
    return baseSeconds + Math.floor((Date.now() - (startedAt as number)) / 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseSeconds, startedAt, running, /* tick */ ]);

  // Flush helper — banks the delta since last flush into profile totals.
  function flush(now = currentSeconds) {
    const delta = now - lastFlushRef.current;
    if (delta > 0) {
      addActivitySeconds(activeId, delta);
      lastFlushRef.current = now;
    }
  }

  // Periodic flush while running.
  useEffect(() => {
    if (!running) return;
    const t = window.setInterval(() => {
      const now = baseSeconds + Math.floor((Date.now() - (startedAt as number)) / 1000);
      const delta = now - lastFlushRef.current;
      if (delta >= 10) {
        addActivitySeconds(activeId, delta);
        lastFlushRef.current = now;
      }
    }, 5000);
    return () => window.clearInterval(t);
  }, [running, baseSeconds, startedAt, activeId]);

  // Flush on tab hide / close so we don't lose the unflushed tail.
  useEffect(() => {
    function flushTail() {
      if (startedAt === null) return;
      const now = baseSeconds + Math.floor((Date.now() - startedAt) / 1000);
      const delta = now - lastFlushRef.current;
      if (delta > 0) {
        addActivitySeconds(activeId, delta);
        lastFlushRef.current = now;
        // also fold elapsed time into baseSeconds so reload shows the same value
        writeSession({ activeId, baseSeconds: now, startedAt: Date.now() });
      }
    }
    window.addEventListener("visibilitychange", flushTail);
    window.addEventListener("pagehide", flushTail);
    return () => {
      window.removeEventListener("visibilitychange", flushTail);
      window.removeEventListener("pagehide", flushTail);
    };
  }, [activeId, baseSeconds, startedAt]);

  function start() {
    if (running) return;
    setStartedAt(Date.now());
  }
  function stop() {
    if (!running) return;
    const now = baseSeconds + Math.floor((Date.now() - (startedAt as number)) / 1000);
    flush(now);
    setBaseSeconds(now);
    setStartedAt(null);
  }
  function reset() {
    setStartedAt(null);
    setBaseSeconds(0);
    lastFlushRef.current = 0;
  }
  function pickActivity(id: ActivityId) {
    if (id === activeId) return;
    if (running) stop();
    setActiveId(id);
    setBaseSeconds(0);
    lastFlushRef.current = 0;
  }
  function clearLifetime() {
    if (!confirm("Clear all lifetime grind totals? This cannot be undone.")) return;
    clearActivityTotals();
  }

  const salaryRaw = Number(profile.salary);
  const salary = Number.isFinite(salaryRaw) && salaryRaw > 0 ? salaryRaw : 0;
  const hpw = Math.min(80, Math.max(1, Number(profile.hoursPerWeek) || 40));
  const ratePerSec = salary / (hpw * 52 * 3600);
  const earned = currentSeconds * ratePerSec;
  const perMin = ratePerSec * 60;
  const perDay = ratePerSec * 3600 * 8;
  const active = ACTIVITY_BY_ID[activeId];

  const min = Math.floor(currentSeconds / 60).toString().padStart(2, "0");
  const sec = (currentSeconds % 60).toString().padStart(2, "0");

  const lifetimeBreakdown = useMemo(() => {
    if (!hydrated) return [];
    return ACTIVITIES
      .map((a) => ({ ...a, sec: profile.activityTotals[a.id] ?? 0 }))
      .filter((a) => a.sec > 0)
      .sort((a, b) => b.sec - a.sec);
  }, [hydrated, profile.activityTotals]);
  const lifetimeSec = lifetimeBreakdown.reduce((s, a) => s + a.sec, 0);
  const lifetimeEarned = lifetimeSec * ratePerSec;

  return (
    <section className="relative overflow-hidden border-y border-border bg-charcoal py-32 md:py-44">
      <div className="pointer-events-none absolute inset-0 pinstripe opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-[1300px] px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.5em] text-violet">Module 02 / Tool</p>
            <h2 className="font-display text-5xl leading-[1.02] tracking-tight text-pearl md:text-6xl">
              Smug Paycheck Calculator.
            </h2>
            <p className="mt-6 max-w-md text-bone">
              Every second you do nothing is paid. Pick your weapon, start the timer,
              and watch the dollars accrue. INKO does this for a living.
            </p>
            <ul className="mt-8 space-y-3 text-pearl">
              <li className="flex items-start gap-3"><span className="text-ink">→</span> Wall-clock accurate — keeps counting in background tabs</li>
              <li className="flex items-start gap-3"><span className="text-ink">→</span> Six certified smug activities</li>
              <li className="flex items-start gap-3"><span className="text-ink">→</span> Lifetime totals saved on this device</li>
            </ul>

            {hydrated && lifetimeSec > 0 && (
              <div className="mt-8 border border-ink/40 bg-obsidian p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/60">Lifetime grind</p>
                    <p className="mt-2 font-display text-3xl text-necro">${lifetimeEarned.toFixed(2)}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/60">
                      {Math.floor(lifetimeSec / 60)} minutes of smug, all stacked
                    </p>
                  </div>
                  <button
                    onClick={clearLifetime}
                    title="Clear lifetime totals"
                    aria-label="Clear lifetime totals"
                    className="inline-flex h-9 w-9 items-center justify-center border border-border bg-charcoal text-bone/70 transition-colors hover:border-pink hover:text-pink"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                <ul className="mt-4 grid gap-1.5 border-t border-border/60 pt-4">
                  {lifetimeBreakdown.map((a) => {
                    const Icon = a.icon;
                    const m = Math.floor(a.sec / 60);
                    const s = a.sec % 60;
                    const mm = m.toString().padStart(2, "0");
                    const ss = s.toString().padStart(2, "0");
                    return (
                      <li key={a.id} className="flex items-center justify-between gap-3 font-mono text-[11px] text-pearl">
                        <span className="flex items-center gap-2 text-bone">
                          <Icon className="h-3.5 w-3.5 text-ink" />
                          <span className="uppercase tracking-[0.2em]">{a.label}</span>
                        </span>
                        <span className="flex items-center gap-3">
                          <span className="text-bone/60">{mm}:{ss}</span>
                          <span className="w-20 text-right text-necro">${(a.sec * ratePerSec).toFixed(2)}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          <div className="border border-ink/40 bg-obsidian shadow-[0_0_60px_-20px_var(--ink)]">
            <div className="flex items-center justify-between border-b border-border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">
              <span className="flex items-center gap-2"><Circle className="h-2 w-2 fill-necro text-necro" /> Smug Paycheck Calculator</span>
              <span className="text-ink">v2.001</span>
            </div>

            <div className="space-y-6 p-6 md:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="calc-salary" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">Annual salary (USD)</label>
                  <div className="flex items-center border border-border bg-charcoal">
                    <span className="border-r border-border px-3 py-3 font-mono text-pearl">$</span>
                    <input
                      id="calc-salary"
                      type="number" min={0} step={1000} value={salary}
                      onChange={(e) => setProfile({ salary: Math.max(0, Number(e.target.value) || 0) })}
                      className="w-full bg-transparent px-3 py-3 font-mono text-lg text-pearl outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="calc-hours" className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">
                    <span>Working hours / week</span><span className="text-ink">{hpw}h</span>
                  </label>
                  <input
                    id="calc-hours"
                    type="range" min={10} max={80} step={1} value={hpw}
                    onChange={(e) => setProfile({ hoursPerWeek: Number(e.target.value) })}
                    className="w-full accent-[var(--ink)]"
                  />
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.3em] text-bone/50">
                    Less hours = higher $/sec. INKO recommends as few as legally tolerated.
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">Pick an activity</p>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  {ACTIVITIES.map((a) => {
                    const Icon = a.icon;
                    const sel = a.id === activeId;
                    return (
                      <button
                        key={a.id} onClick={() => pickActivity(a.id)}
                        aria-pressed={sel}
                        className={`flex min-h-11 items-center gap-2 border px-3 py-3 text-left transition-all ${
                          sel ? "border-ink bg-ink/15 text-pearl" : "border-border bg-charcoal text-bone hover:border-pearl"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0 text-ink" strokeWidth={2} />
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{a.label}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-violet">
                  {active.label} — {active.tagline}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="border border-border bg-charcoal p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">Timer</p>
                  <p className="mt-2 font-mono text-3xl text-pearl tabular-nums">{min}:{sec}</p>
                </div>
                <div className="border border-ink/40 bg-charcoal p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">Earned this session</p>
                  <p className="mt-2 font-display text-3xl text-necro tabular-nums" aria-live="polite">
                    ${earned.toFixed(4)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button onClick={start} disabled={running}
                  className="inline-flex min-h-11 items-center justify-center gap-2 border border-necro/60 bg-necro/10 px-3 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-necro transition-all hover:bg-necro/20 disabled:opacity-40">
                  <Play className="h-3.5 w-3.5" /> Start Grind
                </button>
                <button onClick={stop} disabled={!running}
                  className="inline-flex min-h-11 items-center justify-center gap-2 border border-pink/60 bg-pink/10 px-3 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-pink transition-all hover:bg-pink/20 disabled:opacity-40">
                  <Square className="h-3.5 w-3.5" /> Pause & Bank
                </button>
                <button onClick={reset}
                  className="inline-flex min-h-11 items-center justify-center gap-2 border border-border bg-charcoal px-3 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-pearl transition-all hover:border-pearl">
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 border-t border-border/60 pt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">
                <div><p>$ / sec</p><p className="mt-1 text-pearl tabular-nums">${ratePerSec.toFixed(6)}</p></div>
                <div><p>$ / min</p><p className="mt-1 text-pearl tabular-nums">${perMin.toFixed(4)}</p></div>
                <div><p>$ / 8h day</p><p className="mt-1 text-pearl tabular-nums">${perDay.toFixed(2)}</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
