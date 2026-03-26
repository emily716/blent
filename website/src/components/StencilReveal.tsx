"use client";

import { useEffect, useState } from "react";

/*
  Viscous Bubble Stencil Reveal

  Dark overlay with expanding organic circles that reveal the page.
  Uses CSS mask-image with radial gradients — no canvas compositing issues.
  The gooey filter (blur + contrast) is applied to an inner div with
  HTML-rendered circles, not canvas, so the filter works correctly.
*/

interface Blob {
  x: number;
  y: number;
  size: number;
  delay: number;
}

export default function StencilReveal() {
  const [phase, setPhase] = useState<"covering" | "revealing" | "done">("covering");

  useEffect(() => {
    // Start reveal shortly after mount
    const t1 = setTimeout(() => setPhase("revealing"), 100);
    // Remove from DOM after animation completes
    const t2 = setTimeout(() => setPhase("done"), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  // Generate blob positions — spread from center outward
  const blobs: Blob[] = [];
  const cx = 50; // percent
  const cy = 50;
  // Center blob
  blobs.push({ x: cx, y: cy, size: 180, delay: 0 });
  // Ring 1
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    blobs.push({
      x: cx + Math.cos(angle) * 25,
      y: cy + Math.sin(angle) * 25,
      size: 140,
      delay: 0.08 + i * 0.03,
    });
  }
  // Ring 2
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2 + 0.3;
    blobs.push({
      x: cx + Math.cos(angle) * 50,
      y: cy + Math.sin(angle) * 45,
      size: 120,
      delay: 0.15 + i * 0.025,
    });
  }
  // Corner fills
  const corners = [
    { x: 5, y: 5 }, { x: 95, y: 5 }, { x: 5, y: 95 }, { x: 95, y: 95 },
    { x: 50, y: 5 }, { x: 50, y: 95 }, { x: 5, y: 50 }, { x: 95, y: 50 },
  ];
  corners.forEach((c, i) => {
    blobs.push({ x: c.x, y: c.y, size: 130, delay: 0.25 + i * 0.02 });
  });

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 60,
        opacity: phase === "revealing" ? 0 : 1,
        transition: "opacity 0.6s ease-out 1.4s",
      }}
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-[#0B0B0B]" />

      {/* Gooey bubble container — blur + contrast makes circles merge */}
      <div
        className="absolute inset-0"
        style={{ filter: "blur(20px) contrast(30)" }}
      >
        {/* Base dark fill for the contrast filter to work against */}
        <div className="absolute inset-0 bg-[#0B0B0B]" />

        {/* Expanding white circles that "eat" the dark layer */}
        {blobs.map((blob, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              width: phase === "revealing" ? `${blob.size}vmax` : "0px",
              height: phase === "revealing" ? `${blob.size}vmax` : "0px",
              transform: "translate(-50%, -50%)",
              transition: `width 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${blob.delay}s, height 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${blob.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
