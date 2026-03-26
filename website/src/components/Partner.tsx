"use client";

import { content } from "@/lib/content";
import { BubbleRevealText, BubbleRevealCard } from "./BubbleReveal";

export default function Partner() {
  const { partner } = content;

  return (
    <section id="partner" className="relative bg-fog py-24 sm:py-32 micro-circles-dense">
      <div className="px-6 sm:px-10 max-w-[1400px] mx-auto">
        <div className="max-w-3xl mb-16">
          <BubbleRevealText>
            <div className="text-xs font-semibold tracking-[0.28em] uppercase text-violet mb-4 flex items-center gap-2">
              {partner.eyebrow}
              <span className="block w-6 h-[1px] bg-violet" />
            </div>
          </BubbleRevealText>

          <BubbleRevealText delay={0.1}>
            <h2 className="font-[family-name:var(--font-headline)] text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight tracking-tight mb-8">
              {partner.headline}
            </h2>
          </BubbleRevealText>

          {partner.intro.map((para, i) => (
            <BubbleRevealText key={i} delay={0.15 + i * 0.08}>
              <p className="text-slate text-base sm:text-lg leading-relaxed mb-4">
                {para}
              </p>
            </BubbleRevealText>
          ))}

          <BubbleRevealText delay={0.3}>
            <p className="text-slate text-base sm:text-lg leading-relaxed mb-4">
              {partner.offer}
            </p>
          </BubbleRevealText>

          <BubbleRevealText delay={0.35}>
            <p className="text-slate text-sm leading-relaxed">
              {partner.credential}
            </p>
          </BubbleRevealText>
        </div>

        {/* Partner steps — horizontal scroll on mobile, grid on desktop */}
        <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-4 pb-4 lg:pb-0 -mx-6 px-6 sm:-mx-10 sm:px-10 lg:mx-0 lg:px-0 snap-x snap-mandatory">
          {partner.steps.map((step, i) => (
            <BubbleRevealCard
              key={step.title}
              delay={0.4 + i * 0.1}
              className="min-w-[260px] lg:min-w-0 snap-start bg-white border border-violet/[0.06] p-6 sm:p-8 flex-shrink-0"
            >
              {/* Step connector circle */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-violet flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {i + 1}
                </div>
                {i < partner.steps.length - 1 && (
                  <div className="hidden lg:block flex-1 h-[1px] bg-violet/20" />
                )}
              </div>
              <h3 className="font-[family-name:var(--font-headline)] font-bold text-ink text-lg mb-2">
                {step.title}
              </h3>
              <p className="text-slate text-sm leading-relaxed">
                {step.desc}
              </p>
            </BubbleRevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}
