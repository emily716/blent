"use client";

import { content } from "@/lib/content";
import { BubbleRevealText } from "./BubbleReveal";

export default function Intervention() {
  const { intervention } = content;

  return (
    <section className="relative bg-lavender py-24 sm:py-32 micro-circles">
      <div className="px-6 sm:px-10 max-w-[1400px] mx-auto">
        <div className="max-w-2xl">
          <BubbleRevealText>
            <div className="text-xs font-semibold tracking-[0.28em] uppercase text-violet mb-4 flex items-center gap-2">
              {intervention.eyebrow}
              <span className="block w-6 h-[1px] bg-violet" />
            </div>
          </BubbleRevealText>

          <BubbleRevealText delay={0.1}>
            <h2 className="font-[family-name:var(--font-headline)] text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight tracking-tight mb-8">
              {intervention.headline}
            </h2>
          </BubbleRevealText>

          {intervention.body.map((para, i) => (
            <BubbleRevealText key={i} delay={0.15 + i * 0.08}>
              <p className="text-slate text-base sm:text-lg leading-relaxed mb-4 last:mb-0">
                {para}
              </p>
            </BubbleRevealText>
          ))}
        </div>
      </div>
    </section>
  );
}
