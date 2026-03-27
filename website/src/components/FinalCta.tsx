"use client";

import { content } from "@/lib/content";
import { BubbleRevealText } from "./BubbleReveal";

export default function FinalCta() {
  const { finalCta } = content;

  return (
    <section className="relative bg-dark py-24 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 micro-circles-light" />

      {/* Glow */}
      <div className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-violet/[0.1] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 px-6 sm:px-10 max-w-[1400px] mx-auto text-center">
        <BubbleRevealText>
          <h2 className="font-[family-name:var(--font-headline)] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight max-w-4xl mx-auto mb-8">
            {finalCta.headline}
          </h2>
        </BubbleRevealText>

        <BubbleRevealText delay={0.15}>
          <p className="text-lavender/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-4">
            {finalCta.sub}
          </p>
        </BubbleRevealText>

        <BubbleRevealText delay={0.25}>
          <p className="text-lavender/30 text-sm max-w-md mx-auto mb-10">
            {finalCta.guarantee}
          </p>
        </BubbleRevealText>

        <BubbleRevealText delay={0.35}>
          <a
            href={finalCta.cta.href}
            className="inline-block text-sm font-semibold tracking-[0.1em] uppercase bg-lime text-ink px-8 py-4 sm:px-10 sm:py-5 btn-lift active:scale-95"
          >
            {finalCta.cta.label}
          </a>
        </BubbleRevealText>
      </div>
    </section>
  );
}
