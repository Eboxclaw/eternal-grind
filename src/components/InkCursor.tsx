import { useEffect, useRef } from "react";

/**
 * Mouse-following purple ink particle trail.
 * Disabled on touch / coarse pointers for perf.
 */
export function InkCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    interface P { x: number; y: number; vx: number; vy: number; life: number; max: number; r: number; }
    const particles: P[] = [];
    let mx = w / 2;
    let my = h / 2;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: mx + (Math.random() - 0.5) * 6,
          y: my + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6 + 0.2,
          life: 0,
          max: 60 + Math.random() * 40,
          r: 6 + Math.random() * 10,
        });
      }
      if (particles.length > 220) particles.splice(0, particles.length - 220);
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        const t = 1 - p.life / p.max;
        if (t <= 0) { particles.splice(i, 1); continue; }
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grd.addColorStop(0, `rgba(181,123,255,${0.35 * t})`);
        grd.addColorStop(1, "rgba(123,44,255,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 hidden md:block"
      aria-hidden
    />
  );
}
