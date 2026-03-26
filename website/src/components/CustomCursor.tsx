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

  const size = hovering ? 75 : 55;
  const radius = size / 2;

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        zIndex: 9999,
        width: size,
        height: size,
        left: pos.x - radius,
        top: pos.y - radius,
        mixBlendMode: "difference",
        transition: "width 0.2s ease, height 0.2s ease",
      }}
    >
      <div
        className="w-full h-full rounded-full bg-lime"
        style={{ mixBlendMode: "difference" }}
      />
    </div>
  );
}
