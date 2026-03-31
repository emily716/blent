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

  // Bubble shape: 201×247 aspect ratio → maintain proportions
  const h = hovering ? 74 : 54;
  const w = Math.round(h * (201 / 247));

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        zIndex: 9999,
        width: w,
        height: h,
        left: pos.x - w / 2,
        top: pos.y - h / 2,
        transition: "width 0.2s ease, height 0.2s ease",
      }}
    >
      <svg
        width={w}
        height={h}
        viewBox="0 0 201 247"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <path
          d="M11.3958 226.5C8.13021 225.135 5.41667 222.833 3.25 219.583C1.08333 216.333 0 212.948 0 209.417V18.2917C0 13.4167 1.82292 9.15625 5.47917 5.5C9.14583 1.83333 13.4167 0 18.2917 0H61C64.7917 0 68.1771 1.15625 71.1667 3.45833C74.151 5.76563 76.3177 8.54167 77.6667 11.7917L93.125 26.8333C96.651 30.3646 98.4167 34.2917 98.4167 38.625V40.6667H118.333C129.443 40.6667 139.609 43.3125 148.833 48.6042C158.052 53.8854 165.375 60.8646 170.792 69.5417L181.771 80.1042C187.464 85.8021 191.938 92.375 195.188 99.8333C198.438 107.292 200.062 115.354 200.062 124.021V185.021C200.062 196.411 197.354 206.781 191.938 216.125C186.521 225.484 179.13 232.943 169.771 238.5C160.422 244.052 150.052 246.833 138.667 246.833H115.479C107.354 246.833 99.6302 245.339 92.3125 242.354C90.9479 243.438 89.3177 244.448 87.4167 245.396C85.526 246.354 83.5 246.833 81.3333 246.833H38.625C34.2917 246.833 30.3594 245.068 26.8333 241.542L11.3958 226.5Z"
          fill="#5E4ADA"
          fillOpacity={0.85}
        />
      </svg>
    </div>
  );
}
