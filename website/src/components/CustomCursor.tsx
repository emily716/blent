"use client";

import { useState, useEffect } from "react";

/*
  Custom circle cursor — adapted from disenopublico.org pattern.
  55px circle with mix-blend-mode: difference.
  On dark backgrounds it appears light, on light backgrounds it appears dark.
  Hides on touch devices.
*/

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Only show on devices with fine pointer (no touch)
    const isFinePointer =
      window.matchMedia("(pointer: fine)").matches &&
      window.matchMedia("(hover: hover)").matches;
    if (!isFinePointer) return;

    setVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']")
      ) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    const onMouseLeave = () => {
      setPos({ x: -100, y: -100 });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  if (!visible) return null;

  // Glass bubble — cropped to the sphere portion of logo.svg (cx=44 cy=44 r=33)
  const size = hovering ? 60 : 44;

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
            <stop offset="0%"   stopColor="#C4B5FF" stopOpacity="0.55"/>
            <stop offset="45%"  stopColor="#7B5EFF" stopOpacity="0.28"/>
            <stop offset="100%" stopColor="#3A1FBB" stopOpacity="0.45"/>
          </radialGradient>
          <radialGradient id="cur-spec" cx="38%" cy="22%" r="45%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.92"/>
            <stop offset="60%"  stopColor="#ffffff" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="cur-refl" cx="50%" cy="88%" r="45%">
            <stop offset="0%"   stopColor="#B8F05A" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#B8F05A" stopOpacity="0"/>
          </radialGradient>
          <filter id="cur-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="3"
              floodColor="#5533CC" floodOpacity="0.35"/>
          </filter>
        </defs>
        {/* Outer ring */}
        <circle cx="44" cy="44" r="36"
          fill="none" stroke="#7B5EFF" strokeWidth="1" opacity="0.18"/>
        {/* Glass body */}
        <circle cx="44" cy="44" r="33"
          fill="url(#cur-body)"
          stroke="#C4B5FF" strokeWidth="0.8" strokeOpacity="0.6"
          filter="url(#cur-shadow)"/>
        {/* Green bottom reflection */}
        <circle cx="44" cy="44" r="33" fill="url(#cur-refl)"/>
        {/* Top specular highlight */}
        <ellipse cx="35" cy="30" rx="16" ry="10" fill="url(#cur-spec)"/>
        {/* Bright inner highlight */}
        <ellipse cx="31" cy="26" rx="5" ry="3" fill="white" opacity="0.75"/>
        {/* Bottom rim light */}
        <path d="M 62 55 A 33 33 0 0 1 26 68"
          fill="none" stroke="white" strokeWidth="0.8"
          strokeOpacity="0.22" strokeLinecap="round"/>
      </svg>
    </div>
  );
}
