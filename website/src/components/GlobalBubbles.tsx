"use client";

import { useEffect, useRef, useCallback } from "react";

interface Bubble {
  x: number;
  y: number;
  r: number;
  baseR: number;
  vx: number;
  vy: number;
  phase: number;
  speed: number;
  opacity: number;
  // Organic shape deformation
  blobPhase: number;
  blobAmp: number;
}

export default function GlobalBubbles({ count = 80 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);
  const scrollRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleScroll = useCallback(() => {
    scrollRef.current = window.scrollY;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let docH = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      docH = document.documentElement.scrollHeight;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    // Init bubbles spread across the full document height
    bubblesRef.current = Array.from({ length: count }, () => {
      const r = 3 + Math.random() * 12;
      return {
        x: Math.random() * w,
        y: Math.random() * docH,
        r,
        baseR: r,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -0.08 - Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: 0.15 + Math.random() * 0.5,
        opacity: 0.15 + Math.random() * 0.6,
        blobPhase: Math.random() * Math.PI * 2,
        blobAmp: 0.08 + Math.random() * 0.15,
      };
    });

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    let time = 0;

    function draw() {
      time += 0.016;
      const scroll = scrollRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y + scroll;

      ctx!.clearRect(0, 0, w, h);

      for (const b of bubblesRef.current) {
        // Float motion
        b.x += b.vx + Math.sin(time * b.speed + b.phase) * 0.15;
        b.y += b.vy;
        b.r = b.baseR + Math.sin(time * b.speed * 1.3 + b.phase) * 1.5;

        // Wrap vertically across full document
        if (b.y < -b.r * 3) {
          b.y = docH + b.r * 2;
          b.x = Math.random() * w;
        }
        if (b.y > docH + b.r * 3) {
          b.y = -b.r * 2;
          b.x = Math.random() * w;
        }
        // Wrap horizontally
        if (b.x < -b.r * 3) b.x = w + b.r;
        if (b.x > w + b.r * 3) b.x = -b.r;

        // Only draw if visible in viewport
        const screenY = b.y - scroll;
        if (screenY < -b.r * 4 || screenY > h + b.r * 4) continue;

        // Cursor repulsion
        const dx = b.x - mx;
        const dy = b.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 180;
        let offsetX = 0;
        let offsetY = 0;
        let scaleBoost = 1;

        if (dist < repelRadius && dist > 0) {
          const force = (1 - dist / repelRadius) * 35;
          offsetX = (dx / dist) * force;
          offsetY = (dy / dist) * force;
          scaleBoost = 1 + (1 - dist / repelRadius) * 0.4;
        }

        const drawX = b.x + offsetX;
        const drawY = screenY + offsetY;
        const drawR = Math.max(b.r * scaleBoost, 1);

        // Draw organic blob shape
        ctx!.beginPath();
        const points = 6;
        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const deform =
            1 +
            Math.sin(angle * 3 + time * b.speed + b.blobPhase) * b.blobAmp +
            Math.sin(angle * 2 - time * 0.7 + b.phase) * b.blobAmp * 0.5;
          const px = drawX + Math.cos(angle) * drawR * deform;
          const py = drawY + Math.sin(angle) * drawR * deform;
          if (i === 0) ctx!.moveTo(px, py);
          else ctx!.lineTo(px, py);
        }
        ctx!.closePath();

        // Color based on vertical position in document
        const docFrac = b.y / docH;
        const isLightSection =
          docFrac > 0.1 && docFrac < 0.25 ||
          docFrac > 0.4 && docFrac < 0.55 ||
          docFrac > 0.65 && docFrac < 0.8;

        if (isLightSection) {
          // Violet bubbles on light backgrounds
          ctx!.fillStyle = `rgba(91,63,232,${(0.04 * b.opacity).toFixed(3)})`;
        } else {
          // Lime bubbles on dark backgrounds
          ctx!.fillStyle = `rgba(200,245,119,${(0.035 * b.opacity).toFixed(3)})`;
        }
        ctx!.fill();

        // Subtle lime rim glow on larger bubbles
        if (drawR > 6) {
          ctx!.strokeStyle = `rgba(200,245,119,${(0.03 * b.opacity).toFixed(3)})`;
          ctx!.lineWidth = 0.5;
          ctx!.stroke();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [count, handleMouseMove, handleScroll]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
}
