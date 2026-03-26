"use client";

import { useEffect, useState, useCallback, useRef } from "react";

/*
  Bubble Grid Reveal — inspired by disenopublico.org's PixelatedLoader
  but using circles instead of geometric squares.

  A fixed overlay of dark circles covers the viewport.
  On load, each circle fades out and shrinks with a staggered random delay,
  revealing the hero underneath. The randomised timing creates an organic,
  fluid-like dissolve effect.

  Each circle has:
  - Slight 3D depth via radial gradient (lighter center, dark edge)
  - Random size variation for organic feel
  - Scale + opacity + blur transition for a soft, fluid disappearance
  - Staggered random delay so the reveal feels like bubbles popping
*/

interface Cell {
  key: string;
  delay: number;
  size: number;
  x: number;
  y: number;
}

export default function StencilReveal() {
  const [cells, setCells] = useState<Cell[]>([]);
  const [revealing, setRevealing] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [done, setDone] = useState(false);
  const idRef = useRef(0);

  const buildGrid = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    // Circle diameter — larger circles = fewer cells = better performance
    const baseDiam = Math.max(40, Math.min(60, w / 28));
    const cols = Math.ceil(w / (baseDiam * 0.85)) + 2;
    const rows = Math.ceil(h / (baseDiam * 0.85)) + 2;
    const id = ++idRef.current;

    const result: Cell[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Hex-grid offset for tighter packing
        const offsetX = row % 2 === 0 ? 0 : baseDiam * 0.42;
        const x = col * baseDiam * 0.85 + offsetX - baseDiam;
        const y = row * baseDiam * 0.75 - baseDiam;

        // Distance from center of screen — used for delay
        const cx = w / 2;
        const cy = h / 2;
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        const maxDist = Math.sqrt(cx * cx + cy * cy);
        const distFrac = dist / maxDist;

        // Staggered delay: center reveals first, edges last
        // Plus random jitter for organic feel
        const baseDelay = distFrac * 1200;
        const jitter = Math.random() * 600;
        const delay = 200 + baseDelay + jitter;

        // Random size variation
        const size = baseDiam * (0.9 + Math.random() * 0.3);

        result.push({
          key: `${id}-${row}-${col}`,
          delay,
          size,
          x,
          y,
        });
      }
    }
    return result;
  }, []);

  useEffect(() => {
    setCells(buildGrid());

    // Start the reveal after a brief moment
    const t1 = setTimeout(() => setRevealing(true), 80);

    // Begin fading out the container after circles have mostly popped
    const t2 = setTimeout(() => setFadeOut(true), 2600);

    // Remove from DOM
    const t3 = setTimeout(() => setDone(true), 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [buildGrid]);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 60,
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.5s ease-out",
        background: "#0B0B0B",
      }}
    >
      {/* Grid of circles that pop/dissolve to reveal content */}
      {cells.map((cell) => (
        <div
          key={cell.key}
          style={{
            position: "absolute",
            left: cell.x,
            top: cell.y,
            width: cell.size,
            height: cell.size,
            borderRadius: "50%",
            // 3D depth: lighter center (like a sphere lit from above-left)
            background: revealing
              ? "transparent"
              : `radial-gradient(circle at 38% 35%, #1a1636 0%, #0B0B0B 60%, #050510 100%)`,
            // Subtle rim highlight
            boxShadow: revealing
              ? "none"
              : `inset 0 -1px 3px rgba(200,245,119,0.04), inset 0 1px 2px rgba(91,63,232,0.08)`,
            // The pop transition — scale down, fade, slight blur
            opacity: revealing ? 0 : 1,
            transform: revealing ? "scale(0.3)" : "scale(1)",
            filter: revealing ? "blur(4px)" : "blur(0px)",
            transition: `opacity 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) ${cell.delay}ms, transform 0.9s cubic-bezier(0.22, 0.61, 0.36, 1) ${cell.delay}ms, filter 0.7s ease ${cell.delay}ms, background 0.6s ease ${cell.delay}ms, box-shadow 0.5s ease ${cell.delay}ms`,
            willChange: "opacity, transform",
          }}
        />
      ))}
    </div>
  );
}
