"use client";

import { content } from "@/lib/content";
import { BubbleRevealText, BubbleRevealStat } from "./BubbleReveal";

export default function Numbers() {
  const { numbers } = content;

  return (
    <section
      id="numbers"
      className="relative bg-dark py-24 sm:py-36 overflow-hidden"
    >
      {/* Subtle micro-circles */}
      <div className="absolute inset-0 micro-circles-light" />

      <div className="relative z-10 px-6 sm:px-10 max-w-[1400px] mx-auto">
        <BubbleRevealText>
          <div className="text-xs font-semibold tracking-[0.28em] uppercase text-lime/70 mb-4 flex items-center gap-2">
            {numbers.eyebrow}
            <span className="block w-6 h-[1px] bg-lime/30" />
          </div>
        </BubbleRevealText>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 mb-16">
          {numbers.stats.map((stat, i) => (
            <BubbleRevealStat
              key={stat.value}
              value={stat.value}
              label={stat.label}
              delay={0.2 + i * 0.12}
            />
          ))}
        </div>

        <BubbleRevealText delay={0.6}>
          <p className="text-lavender/50 text-base sm:text-lg max-w-2xl">
            {numbers.supporting}
          </p>
        </BubbleRevealText>
      </div>
    </section>
  );
}
