"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/*
  Canvas-based Bubble Grid Reveal
  A single <canvas> replaces 800+ DOM nodes.
  Dark circles are drawn, then erased with staggered timing
  (center first, edges last, random jitter).
  Each circle has 3D depth via radial gradient.
  Total reveal ~2.5s, then fade container and unmount.
*/

interface Cell {
  x: number;
  y: number;
  size: number;
  delay: number;
  startTime: number;
  progress: number; // 0 = fully visible, 1 = fully erased
}

export default function StencilReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [done, setDone] = useState(false);
  const prefersReducedMotion = useRef(false);

  const buildCells = useCallback((): Cell[] => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const baseDiam = Math.max(40, Math.min(60, w / 28));
    const cols = Math.ceil(w / (baseDiam * 0.85)) + 2;
    const rows = Math.ceil(h / (baseDiam * 0.75)) + 2;
    const cx = w / 2;
    const cy = h / 2;
    const maxDist = Math.sqrt(cx * cx + cy * cy);

    const cells: Cell[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const offsetX = row % 2 === 0 ? 0 : baseDiam * 0.42;
        const x = col * baseDiam * 0.85 + offsetX - baseDiam;
        const y = row * baseDiam * 0.75 - baseDiam;

        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        const distFrac = dist / maxDist;

        // Center reveals first, edges last, with random jitter
        const baseDelay = distFrac * 1000;
        const jitter = Math.random() * 500;
        const delay = 100 + baseDelay + jitter;

        const size = baseDiam * (0.9 + Math.random() * 0.3);

        cells.push({ x, y, size, delay, startTime: 0, progress: 0 });
      }
    }
    return cells;
  }, []);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== "undefined") {
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mql.matches) {
        prefersReducedMotion.current = true;
        setDone(true);
        return;
      }
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cells = buildCells();
    const animDuration = 700; // ms per circle erase animation
    let startTimestamp: number | null = null;
    let animId = 0;

    function easeOutCubic(t: number): number {
      return 1 - Math.pow(1 - t, 3);
    }

    function draw(timestamp: number) {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;

      ctx!.clearRect(0, 0, w, h);

      // Fill background
      ctx!.fillStyle = "#0B0B0B";
      ctx!.fillRect(0, 0, w, h);

      let allDone = true;

      for (const cell of cells) {
        const timeSinceDelay = elapsed - cell.delay;

        if (timeSinceDelay < 0) {
          // Not started yet — draw full circle
          allDone = false;
          drawCircle(ctx!, cell.x, cell.y, cell.size, 1);
        } else if (timeSinceDelay < animDuration) {
          // Animating — erase progressively
          allDone = false;
          const raw = timeSinceDelay / animDuration;
          const progress = easeOutCubic(raw);
          drawCircle(ctx!, cell.x, cell.y, cell.size, 1 - progress);
        }
        // else: fully erased, don't draw anything (hole in the background)
      }

      // Now "cut out" the erased areas by drawing with destination-out
      // Actually, we need a different approach: draw the background, then
      // punch holes where circles have been erased.

      // Let's redo: use compositing
      // Clear and redraw properly
      ctx!.clearRect(0, 0, w, h);

      // Draw dark background
      ctx!.globalCompositeOperation = "source-over";
      ctx!.fillStyle = "#0B0B0B";
      ctx!.fillRect(0, 0, w, h);

      // For each cell, draw a circle that will either be part of the overlay
      // or be "punched out" based on progress
      for (const cell of cells) {
        const timeSinceDelay = elapsed - cell.delay;

        if (timeSinceDelay <= 0) {
          // Draw 3D depth circle on top of dark bg
          drawDepthCircle(ctx!, cell.x, cell.y, cell.size);
        } else if (timeSinceDelay < animDuration) {
          const raw = timeSinceDelay / animDuration;
          const progress = easeOutCubic(raw);
          // Shrinking circle with fading opacity
          const scale = 1 - progress * 0.7;
          const alpha = 1 - progress;
          drawDepthCircle(ctx!, cell.x, cell.y, cell.size * scale, alpha);
        } else {
          // Fully erased — punch a hole
          ctx!.globalCompositeOperation = "destination-out";
          ctx!.beginPath();
          ctx!.arc(cell.x, cell.y, cell.size * 0.55, 0, Math.PI * 2);
          ctx!.fillStyle = "rgba(0,0,0,1)";
          ctx!.fill();
          ctx!.globalCompositeOperation = "source-over";
        }
      }

      if (!allDone) {
        animId = requestAnimationFrame(draw);
      }
    }

    function drawDepthCircle(
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      alpha: number = 1
    ) {
      const r = size * 0.55;
      if (r <= 0) return;

      c.save();
      c.globalAlpha = alpha;

      // Radial gradient for 3D depth: lighter center, dark edges
      const grad = c.createRadialGradient(
        x - r * 0.2,
        y - r * 0.25,
        0,
        x,
        y,
        r
      );
      grad.addColorStop(0, "#1a1636");
      grad.addColorStop(0.6, "#0B0B0B");
      grad.addColorStop(1, "#050510");

      c.beginPath();
      c.arc(x, y, r, 0, Math.PI * 2);
      c.fillStyle = grad;
      c.fill();

      // Subtle rim highlights
      c.beginPath();
      c.arc(x, y, r, 0, Math.PI * 2);
      c.strokeStyle = `rgba(200,245,119,${0.04 * alpha})`;
      c.lineWidth = 0.5;
      c.stroke();

      c.beginPath();
      c.arc(x, y, r * 0.95, Math.PI * 0.8, Math.PI * 1.8);
      c.strokeStyle = `rgba(91,63,232,${0.06 * alpha})`;
      c.lineWidth = 0.5;
      c.stroke();

      c.restore();
    }

    function drawCircle(
      _c: CanvasRenderingContext2D,
      _x: number,
      _y: number,
      _size: number,
      _alpha: number
    ) {
      // Placeholder — replaced by drawDepthCircle
    }

    animId = requestAnimationFrame(draw);

    // Fade out after 2.2s
    const t1 = setTimeout(() => setFadeOut(true), 2200);
    // Unmount after 2.7s
    const t2 = setTimeout(() => setDone(true), 2700);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [buildCells]);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 60,
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.5s ease-out",
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
