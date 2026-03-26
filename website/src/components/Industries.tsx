"use client";

import { content } from "@/lib/content";
import { BubbleRevealText, BubbleRevealCard } from "./BubbleReveal";

export default function Industries() {
  const { industries } = content;

  return (
    <section
      id="industries"
      className="relative bg-dark py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 micro-circles-light" />

      <div className="relative z-10 px-6 sm:px-10 max-w-[1400px] mx-auto">
        <BubbleRevealText>
          <div className="text-xs font-semibold tracking-[0.28em] uppercase text-lime/70 mb-4 flex items-center gap-2">
            {industries.eyebrow}
            <span className="block w-6 h-[1px] bg-lime/30" />
          </div>
        </BubbleRevealText>

        <BubbleRevealText delay={0.1}>
          <h2 className="font-[family-name:var(--font-headline)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-14">
            {industries.headline}
          </h2>
        </BubbleRevealText>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {industries.panels.map((panel, i) => (
            <BubbleRevealCard
              key={panel.number}
              delay={0.15 + i * 0.1}
              className="bg-white/[0.04] border border-white/[0.06] p-6 sm:p-8 group hover:bg-white/[0.07] transition-colors duration-300"
            >
              <div className="text-lime/40 font-[family-name:var(--font-headline)] text-sm font-bold mb-4">
                {panel.number}
              </div>
              <h3 className="font-[family-name:var(--font-headline)] text-white font-bold text-lg mb-3">
                {panel.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {panel.pain}
              </p>
            </BubbleRevealCard>
          ))}
        </div>

        <BubbleRevealText delay={0.6}>
          <p className="text-lavender/50 text-base sm:text-lg max-w-2xl">
            {industries.cta}
          </p>
        </BubbleRevealText>
      </div>
    </section>
  );
}
