"use client";

import { content } from "@/lib/content";
import { BubbleRevealText, BubbleRevealStat } from "./BubbleReveal";

function Nl({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i, arr) => (
        <span key={i}>
          {line}
          {i < arr.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

export default function Numbers() {
  const { numbers } = content;

  return (
    <section
      id="numbers"
      className="relative bg-dark min-h-screen flex items-center py-20 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="absolute inset-0 micro-circles-light" />

      <div className="relative z-10 px-6 sm:px-10 max-w-[1400px] mx-auto">
        <BubbleRevealText>
          <div className="text-sm sm:text-base font-[family-name:var(--font-headline)] font-600 tracking-[0.15em] uppercase text-lime/80 mb-6">
            {numbers.eyebrow}
          </div>
        </BubbleRevealText>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-8 mb-14 sm:mb-20">
          {numbers.stats.map((stat, i) => (
            <BubbleRevealStat
              key={stat.value}
              value={stat.value}
              label={stat.label}
              delay={0.25 + i * 0.15}
            />
          ))}
        </div>

        <BubbleRevealText delay={0.8}>
          <p className="text-lavender/50 text-lg sm:text-xl max-w-2xl font-[family-name:var(--font-headline)] font-500 leading-snug">
            <Nl text={numbers.supporting} />
          </p>
        </BubbleRevealText>
      </div>
    </section>
  );
}
