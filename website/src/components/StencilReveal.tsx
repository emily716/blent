"use client";

import { useEffect, useState } from "react";

/*
  Viscous Bubble Stencil Reveal

  A solid dark overlay covers the viewport on load.
  White circles expand with gooey filter (blur + contrast) applied,
  making them merge into a liquid pool that "eats away" the dark layer.
  After the reveal, the whole overlay fades out and unmounts.
*/

interface Blob {
  x: number;
  y: number;
  size: number;
  delay: number;
}

export default function StencilReveal() {
  const [phase, setPhase] = useState<"covering" | "revealing" | "fading" | "done">(
    "covering"
  );

  useEffect(() => {
    // Start expanding blobs
    const t1 = setTimeout(() => setPhase("revealing"), 150);
    // After blobs have fully expanded, fade the whole thing out
    const t2 = setTimeout(() => setPhase("fading"), 1800);
    // Remove from DOM
    const t3 = setTimeout(() => setPhase("done"), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (phase === "done") return null;

  // Generate blob positions — center outward
  const blobs: Blob[] = [];
  const cx = 50;
  const cy = 50;
  // Center blob — largest, first to expand
  blobs.push({ x: cx, y: cy, size: 180, delay: 0 });
  // Ring 1
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    blobs.push({
      x: cx + Math.cos(angle) * 25,
      y: cy + Math.sin(angle) * 25,
      size: 140,
      delay: 0.06 + i * 0.03,
    });
  }
  // Ring 2
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2 + 0.3;
    blobs.push({
      x: cx + Math.cos(angle) * 50,
      y: cy + Math.sin(angle) * 45,
      size: 120,
      delay: 0.12 + i * 0.02,
    });
  }
  // Corner + edge fills
  const edges = [
    { x: 5, y: 5 },
    { x: 95, y: 5 },
    { x: 5, y: 95 },
    { x: 95, y: 95 },
    { x: 50, y: 5 },
    { x: 50, y: 95 },
    { x: 5, y: 50 },
    { x: 95, y: 50 },
  ];
  edges.forEach((c, i) => {
    blobs.push({ x: c.x, y: c.y, size: 130, delay: 0.2 + i * 0.02 });
  });

  const isExpanding = phase === "revealing" || phase === "fading";

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 60,
        opacity: phase === "fading" ? 0 : 1,
        transition: phase === "fading" ? "opacity 0.5s ease-out" : "none",
      }}
    >
      {/* Gooey container — blur + contrast makes white circles merge into liquid */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ filter: "blur(18px) contrast(25)" }}
      >
        {/* Dark base — the "void" */}
        <div className="absolute inset-0 bg-[#0B0B0B]" />

        {/* Expanding white circles — they "burn through" the dark layer */}
        {blobs.map((blob, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              width: isExpanding ? `${blob.size}vmax` : "0px",
              height: isExpanding ? `${blob.size}vmax` : "0px",
              transform: "translate(-50%, -50%)",
              transition: `width 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${blob.delay}s, height 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${blob.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
