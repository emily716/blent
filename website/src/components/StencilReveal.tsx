"use client";

import { useEffect, useRef, useState } from "react";

/*
  Viscous Bubble Stencil Reveal

  A solid dark overlay (#0B0B0B) covers the viewport on load.
  Organic blob shapes spawn at center and expand outward,
  "eating away" the dark layer to reveal the content underneath.

  The gooey effect is achieved by applying CSS filter: blur() contrast()
  to the mask container — this makes expanding blobs merge into a
  single liquid pool as they grow, creating viscous fluid dynamics.
*/

interface RevealBlob {
  x: number;
  y: number;
  r: number;
  targetR: number;
  speed: number;
  delay: number;
  pathIndex: number;
  phase: number;
}

// Organic SVG-style blob deformations
const blobPaths = [
  // Path A offsets - organic splat
  [0, 0.12, -0.08, 0.15, -0.1, 0.05, 0.13, -0.07, 0.1, -0.12, 0.06, -0.09],
  // Path B offsets - rounder organic
  [-0.05, 0.1, 0.08, -0.06, 0.12, -0.1, -0.08, 0.14, -0.05, 0.09, 0.07, -0.11],
  // Path C offsets - elongated
  [0.15, -0.05, 0.08, 0.12, -0.14, 0.06, 0.1, -0.08, -0.12, 0.1, 0.05, -0.07],
];

export default function StencilReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = w / 2;
    const cy = h / 2;
    const maxR = Math.sqrt(w * w + h * h) * 0.7;

    // Create reveal blobs — they spawn from center and expand
    const numBlobs = 18;
    const blobs: RevealBlob[] = Array.from({ length: numBlobs }, (_, i) => {
      const angle = (i / numBlobs) * Math.PI * 2 + Math.random() * 0.3;
      const dist = 20 + Math.random() * 60;
      return {
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        r: 0,
        targetR: maxR * (0.7 + Math.random() * 0.5),
        speed: 0.8 + Math.random() * 0.6,
        delay: i * 0.04 + Math.random() * 0.1,
        pathIndex: i % blobPaths.length,
        phase: Math.random() * Math.PI * 2,
      };
    });

    let startTime: number | null = null;
    let allDone = false;

    function drawBlob(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      pathIndex: number,
      phase: number,
      time: number
    ) {
      const offsets = blobPaths[pathIndex];
      const points = offsets.length;
      ctx.beginPath();
      for (let i = 0; i <= points; i++) {
        const idx = i % points;
        const angle = (idx / points) * Math.PI * 2;
        const deform = 1 + offsets[idx] * Math.sin(time * 0.5 + phase + idx);
        const px = x + Math.cos(angle) * r * deform;
        const py = y + Math.sin(angle) * r * deform;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    }

    function animate(ts: number) {
      if (!startTime) startTime = ts;
      const elapsed = (ts - startTime) / 1000;

      // Fill entire canvas with dark void
      ctx!.fillStyle = "#0B0B0B";
      ctx!.fillRect(0, 0, w, h);

      // Cut out the reveal blobs using destination-out compositing
      ctx!.globalCompositeOperation = "destination-out";

      let completedCount = 0;

      for (const blob of blobs) {
        const t = Math.max(0, elapsed - blob.delay);
        if (t <= 0) continue;

        // Ease-out expansion
        const progress = 1 - Math.pow(1 - Math.min(t * blob.speed * 0.35, 1), 3);
        blob.r = progress * blob.targetR;

        if (progress >= 0.99) completedCount++;

        // Draw the organic blob shape that "eats" the dark overlay
        drawBlob(ctx!, blob.x, blob.y, blob.r, blob.pathIndex, blob.phase, elapsed);
        ctx!.fillStyle = "rgba(0,0,0,1)";
        ctx!.fill();
      }

      // Reset compositing
      ctx!.globalCompositeOperation = "source-over";

      // Add a subtle lime inner-glow at the edges of the reveal
      if (elapsed < 3) {
        ctx!.globalCompositeOperation = "destination-over";
        for (const blob of blobs) {
          if (blob.r < 10) continue;
          const gradient = ctx!.createRadialGradient(
            blob.x,
            blob.y,
            blob.r * 0.85,
            blob.x,
            blob.y,
            blob.r * 1.05
          );
          gradient.addColorStop(0, "rgba(200,245,119,0)");
          gradient.addColorStop(0.7, "rgba(200,245,119,0.06)");
          gradient.addColorStop(1, "rgba(200,245,119,0)");
          ctx!.fillStyle = gradient;
          ctx!.fillRect(0, 0, w, h);
        }
        ctx!.globalCompositeOperation = "source-over";
      }

      if (completedCount >= blobs.length && !allDone) {
        allDone = true;
        setRevealed(true);
        setTimeout(() => setHidden(true), 300);
        return;
      }

      requestAnimationFrame(animate);
    }

    // Start reveal after a brief delay
    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 60,
        opacity: revealed ? 0 : 1,
        transition: "opacity 0.3s ease-out",
        // Gooey filter — makes blobs merge into viscous liquid pool
        filter: "blur(12px) contrast(20)",
        background: "#0B0B0B",
      }}
    />
  );
}
