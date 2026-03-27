"use client";

import { useEffect, useRef, useCallback, useState } from "react";

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

export default function GlobalBubbles({ count = 70 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const scrollRef = useRef(0);
  const animRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0, docH: 0 });
  const [shouldRender, setShouldRender] = useState(true);

  // Check prefers-reduced-motion and adjust count for mobile
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) {
      setShouldRender(false);
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleScroll = useCallback(() => {
    scrollRef.current = window.scrollY;
  }, []);

  useEffect(() => {
    if (!shouldRender) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reduce bubble count on mobile
    const effectiveCount = window.innerWidth < 768 ? Math.min(count, 50) : count;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = window.innerWidth;
      const h = window.innerHeight;
      const docH = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        h * 5
      );
      sizeRef.current = { w, h, docH };
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();

    // Init bubbles spread across the full page height
    const { w, docH } = sizeRef.current;
    bubblesRef.current = Array.from({ length: effectiveCount }, () => {
      const r = 4 + Math.random() * 14;
      return {
        x: Math.random() * w,
        y: Math.random() * docH,
        r,
        baseR: r,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.1 - Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.5,
        opacity: 0.3 + Math.random() * 0.7,
      };
    });

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    let time = 0;

    function draw() {
      time += 0.016;
      const { w, h, docH } = sizeRef.current;
      const scroll = scrollRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx!.clearRect(0, 0, w, h);

      for (const b of bubblesRef.current) {
        // Float
        b.x += b.vx + Math.sin(time * b.speed + b.phase) * 0.2;
        b.y += b.vy;
        b.r = b.baseR + Math.sin(time * b.speed * 1.3 + b.phase) * 2;

        // Wrap vertically across full document
        if (b.y < -b.r * 3) {
          b.y = docH + b.r * 2;
          b.x = Math.random() * w;
        }
        if (b.y > docH + b.r * 3) {
          b.y = -b.r * 2;
          b.x = Math.random() * w;
        }
        if (b.x < -b.r * 3) b.x = w + b.r;
        if (b.x > w + b.r * 3) b.x = -b.r;

        // Convert to screen space
        const screenY = b.y - scroll;

        // Skip if not in viewport
        if (screenY < -b.r * 4 || screenY > h + b.r * 4) continue;

        // Cursor interaction — repel + grow
        const dx = b.x - mx;
        const dy = screenY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 200;
        let offsetX = 0;
        let offsetY = 0;
        let scaleBoost = 1;

        if (dist < repelRadius && dist > 1) {
          const force = (1 - dist / repelRadius) * 40;
          offsetX = (dx / dist) * force;
          offsetY = (dy / dist) * force;
          scaleBoost = 1 + (1 - dist / repelRadius) * 0.5;
        }

        const drawX = b.x + offsetX;
        const drawY = screenY + offsetY;
        const drawR = Math.max(b.r * scaleBoost, 1);

        // Draw circle with gradient fill for depth
        const gradient = ctx!.createRadialGradient(
          drawX - drawR * 0.3,
          drawY - drawR * 0.3,
          0,
          drawX,
          drawY,
          drawR
        );

        // Always use a subtle but visible bubble style
        const alpha = 0.06 * b.opacity;
        const rimAlpha = 0.1 * b.opacity;

        // Use lime-green tint (matches brand)
        gradient.addColorStop(0, `rgba(200, 245, 119, ${(alpha * 1.5).toFixed(3)})`);
        gradient.addColorStop(0.7, `rgba(200, 245, 119, ${alpha.toFixed(3)})`);
        gradient.addColorStop(1, `rgba(200, 245, 119, 0)`);

        ctx!.beginPath();
        ctx!.arc(drawX, drawY, drawR, 0, Math.PI * 2);
        ctx!.fillStyle = gradient;
        ctx!.fill();

        // Rim highlight
        if (drawR > 5) {
          ctx!.beginPath();
          ctx!.arc(drawX, drawY, drawR, 0, Math.PI * 2);
          ctx!.strokeStyle = `rgba(200, 245, 119, ${rimAlpha.toFixed(3)})`;
          ctx!.lineWidth = 0.8;
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
  }, [count, shouldRender, handleMouseMove, handleScroll]);

  if (!shouldRender) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
}
