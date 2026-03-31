"use client";

import { useState, useEffect, useRef } from "react";

/*
  Bubble cursor that adapts to background luminance.
  Samples the computed background colour of the element under the cursor,
  calculates luminance, and switches between a light bubble (for dark
  backgrounds) and a dark bubble (for light backgrounds) — mirroring the
  original mix-blend-mode: difference behaviour.
  Hides on touch devices.
*/

function getBgIsDark(x: number, y: number): boolean {
  // Temporarily hide the cursor element so elementFromPoint sees what's beneath
  const el = document.elementFromPoint(x, y) as HTMLElement | null;
  if (!el) return true;

  // Walk up the DOM to find the first non-transparent background
  let current: HTMLElement | null = el;
  while (current && current !== document.body.parentElement) {
    const bg = window.getComputedStyle(current).backgroundColor;
    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
      const match = bg.match(/[\d.]+/g);
      if (match && match.length >= 3) {
        const [r, g, b] = match.map(Number);
        // Standard relative luminance
        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return lum < 0.5;
      }
    }
    current = current.parentElement;
  }
  return true; // default: treat as dark
}

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const isFinePointer =
      window.matchMedia("(pointer: fine)").matches &&
      window.matchMedia("(hover: hover)").matches;
    if (!isFinePointer) return;

    setVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setPos({ x, y });

      // Throttle luminance check to one per animation frame
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setIsDark(getBgIsDark(x, y));
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        !!(
          target.closest("a") ||
          target.closest("button") ||
          target.closest("[role='button']")
        )
      );
    };

    const onMouseLeave = () => setPos({ x: -100, y: -100 });

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!visible) return null;

  const size = hovering ? 60 : 44;

  // On dark backgrounds: light/iridescent bubble (original palette)
  // On light backgrounds: dark bubble with inverted tones
  const body = isDark
    ? { c0: "#C4B5FF", o0: 0.55, c1: "#7B5EFF", o1: 0.28, c2: "#3A1FBB", o2: 0.45 }
    : { c0: "#3A1FBB", o0: 0.8,  c1: "#2A0FA0", o1: 0.6,  c2: "#0A0050", o2: 0.9  };

  const ringStroke   = isDark ? "#7B5EFF" : "#2A0FA0";
  const bodyStroke   = isDark ? "#C4B5FF" : "#5533CC";
  const shadowColor  = isDark ? "#5533CC" : "#000033";
  const reflColor    = isDark ? "#B8F05A" : "#1A8A00";
  const specOpacity  = isDark ? 0.92 : 0.5;
  const innerOpacity = isDark ? 0.75 : 0.3;
  const rimOpacity   = isDark ? 0.22 : 0.08;

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        zIndex: 9999,
        width: size,
        height: size,
        left: pos.x - size / 2,
        top: pos.y - size / 2,
        transition: "width 0.2s ease, height 0.2s ease",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="10 10 68 68"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <defs>
          <radialGradient id="cur-body" cx="38%" cy="32%" r="65%">
            <stop offset="0%"   stopColor={body.c0} stopOpacity={body.o0}/>
            <stop offset="45%"  stopColor={body.c1} stopOpacity={body.o1}/>
            <stop offset="100%" stopColor={body.c2} stopOpacity={body.o2}/>
          </radialGradient>
          <radialGradient id="cur-spec" cx="38%" cy="22%" r="45%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity={specOpacity}/>
            <stop offset="60%"  stopColor="#ffffff" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="cur-refl" cx="50%" cy="88%" r="45%">
            <stop offset="0%"   stopColor={reflColor} stopOpacity="0.35"/>
            <stop offset="100%" stopColor={reflColor} stopOpacity="0"/>
          </radialGradient>
          <filter id="cur-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="3"
              floodColor={shadowColor} floodOpacity="0.35"/>
          </filter>
        </defs>
        {/* Outer ring */}
        <circle cx="44" cy="44" r="36"
          fill="none" stroke={ringStroke} strokeWidth="1" opacity="0.18"/>
        {/* Glass body */}
        <circle cx="44" cy="44" r="33"
          fill="url(#cur-body)"
          stroke={bodyStroke} strokeWidth="0.8" strokeOpacity="0.6"
          filter="url(#cur-shadow)"/>
        {/* Bottom reflection */}
        <circle cx="44" cy="44" r="33" fill="url(#cur-refl)"/>
        {/* Top specular highlight */}
        <ellipse cx="35" cy="30" rx="16" ry="10" fill="url(#cur-spec)"/>
        {/* Bright inner highlight */}
        <ellipse cx="31" cy="26" rx="5" ry="3" fill="white" opacity={innerOpacity}/>
        {/* Bottom rim light */}
        <path d="M 62 55 A 33 33 0 0 1 26 68"
          fill="none" stroke="white" strokeWidth="0.8"
          strokeOpacity={rimOpacity} strokeLinecap="round"/>
      </svg>
    </div>
  );
}
