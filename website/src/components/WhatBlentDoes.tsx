"use client";

import { content } from "@/lib/content";
import { BubbleRevealText, BubbleRevealCard } from "./BubbleReveal";

export default function WhatBlentDoes() {
  const { what } = content;

  return (
    <section id="what" className="relative bg-fog py-24 sm:py-32 micro-circles-dense">
      <div className="px-6 sm:px-10 max-w-[1400px] mx-auto">
        <BubbleRevealText>
          <div className="text-xs font-semibold tracking-[0.28em] uppercase text-violet mb-4 flex items-center gap-2">
            {what.eyebrow}
            <span className="block w-6 h-[1px] bg-violet" />
          </div>
        </BubbleRevealText>

        <BubbleRevealText delay={0.1}>
          <h2 className="font-[family-name:var(--font-headline)] text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight tracking-tight mb-12">
            {what.headline}
          </h2>
        </BubbleRevealText>

        {/* Removal items as bubble cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-12">
          {what.items.map((item, i) => (
            <BubbleRevealCard
              key={item}
              delay={0.15 + i * 0.08}
              className="bg-white border border-violet/[0.08] p-5 text-center"
            >
              <div className="w-10 h-10 rounded-full bg-violet/[0.06] mx-auto mb-3 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-violet/20" />
              </div>
              <span className="text-sm font-medium text-ink">{item}</span>
            </BubbleRevealCard>
          ))}
        </div>

        <BubbleRevealText delay={0.5}>
          <p className="text-slate text-base sm:text-lg leading-relaxed mb-2">
            {what.body}
          </p>
        </BubbleRevealText>
        <BubbleRevealText delay={0.6}>
          <p className="font-[family-name:var(--font-headline)] text-xl sm:text-2xl font-bold text-violet mb-2">
            {what.tagline}
          </p>
        </BubbleRevealText>
        <BubbleRevealText delay={0.7}>
          <p className="text-coral font-[family-name:var(--font-headline)] text-lg font-bold">
            {what.proof}
          </p>
        </BubbleRevealText>
      </div>
    </section>
  );
}
