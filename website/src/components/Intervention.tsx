"use client";

import { content } from "@/lib/content";
import { BubbleRevealText } from "./BubbleReveal";

export default function Intervention() {
  const { intervention } = content;

  return (
    <section className="relative bg-lavender py-24 sm:py-32 micro-circles">
      {/* Subtle horizontal divider at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[800px] h-[1px] bg-violet/10" />

      <div className="px-6 sm:px-10 max-w-[1400px] mx-auto">
        {/* Full-width centered, no grid split */}
        <div className="flex flex-col items-center text-center">
          <BubbleRevealText>
            <div className="text-xs font-semibold tracking-[0.28em] uppercase text-violet mb-4 flex items-center gap-2 justify-center">
              {intervention.eyebrow}
              <span className="block w-6 h-[1px] bg-violet" />
            </div>
          </BubbleRevealText>

          <BubbleRevealText delay={0.1}>
            <h2
              className="font-[family-name:var(--font-headline)] font-bold text-ink leading-tight tracking-tight mb-10"
              style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
            >
              {intervention.headline}
            </h2>
          </BubbleRevealText>

          <div className="max-w-2xl">
            {intervention.body.map((para, i) => (
              <BubbleRevealText key={i} delay={0.15 + i * 0.08}>
                <p className="text-slate text-base sm:text-lg leading-relaxed mb-6 last:mb-0">
                  {para}
                </p>
              </BubbleRevealText>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
