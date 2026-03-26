"use client";

import { useEffect, useRef } from "react";

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
}

export default function BubbleBackground({
  count = 60,
  color = "rgba(91,63,232,0.07)",
  className = "",
}: {
  count?: number;
  color?: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = canvas!.offsetWidth * dpr;
      canvas!.height = canvas!.offsetHeight * dpr;
      ctx!.scale(dpr, dpr);
    }
    resize();
    window.addEventListener("resize", resize);

    // Init bubbles
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    bubblesRef.current = Array.from({ length: count }, () => {
      const r = 2 + Math.random() * 6;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r,
        baseR: r,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.15 - Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.7,
        opacity: 0.3 + Math.random() * 0.7,
      };
    });

    let time = 0;
    function draw() {
      time += 0.016;
      const cw = canvas!.offsetWidth;
      const ch = canvas!.offsetHeight;
      ctx!.clearRect(0, 0, cw, ch);

      for (const b of bubblesRef.current) {
        b.x += b.vx + Math.sin(time * b.speed + b.phase) * 0.2;
        b.y += b.vy;
        b.r = b.baseR + Math.sin(time * b.speed * 1.5 + b.phase) * 1;

        // Wrap
        if (b.y < -b.r * 2) {
          b.y = ch + b.r * 2;
          b.x = Math.random() * cw;
        }
        if (b.x < -b.r * 2) b.x = cw + b.r;
        if (b.x > cw + b.r * 2) b.x = -b.r;

        ctx!.beginPath();
        ctx!.arc(b.x, b.y, Math.max(b.r, 0.5), 0, Math.PI * 2);
        ctx!.fillStyle = color.replace(
          /[\d.]+\)$/,
          `${(parseFloat(color.match(/[\d.]+\)$/)?.[0] || "0.07") * b.opacity).toFixed(3)})`
        );
        ctx!.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }
    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity: 1 }}
    />
  );
}
