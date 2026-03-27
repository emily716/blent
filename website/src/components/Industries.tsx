"use client";

import { content } from "@/lib/content";
import { BubbleRevealText, BubbleRevealCard } from "./BubbleReveal";

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

export default function Industries() {
  const { industries } = content;

  return (
    <section
      id="industries"
      className="relative bg-dark py-32 sm:py-40 lg:py-48 overflow-hidden"
    >
      <div className="absolute inset-0 micro-circles-light" />

      <div className="relative z-10 px-6 sm:px-10 max-w-[1400px] mx-auto">
        <BubbleRevealText>
          <div className="text-xs font-semibold tracking-[0.28em] uppercase text-lime/70 mb-5 flex items-center gap-2">
            {industries.eyebrow}
            <span className="block w-6 h-[1px] bg-lime/30" />
          </div>
        </BubbleRevealText>

        <BubbleRevealText delay={0.15}>
          <h2 className="font-[family-name:var(--font-headline)] text-3xl sm:text-4xl lg:text-5xl font-800 text-white leading-tight tracking-[-0.02em] mb-16">
            <Nl text={industries.headline} />
          </h2>
        </BubbleRevealText>

        {/* Bento-style grid: first card spans 2 columns, all cards have image space */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-14">
          {industries.panels.map((panel, i) => (
            <BubbleRevealCard
              key={panel.number}
              delay={0.2 + i * 0.12}
              className={`card-hover bg-white/[0.04] border border-white/[0.06] group hover:bg-white/[0.07] transition-colors duration-300 overflow-hidden ${
                i === 0 ? "sm:col-span-2 lg:col-span-2" : ""
              }`}
            >
              {/* Image placeholder area */}
              <div
                className={`relative bg-white/[0.03] border-b border-white/[0.06] flex items-center justify-center ${
                  i === 0 ? "h-48 sm:h-56" : "h-40 sm:h-48"
                }`}
              >
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/20">
                  {panel.title} — image
                </span>
              </div>

              {/* Card content */}
              <div className="p-6 sm:p-8">
                <div className="text-lime font-[family-name:var(--font-headline)] text-sm font-bold mb-4">
                  {panel.number}
                </div>
                <h3 className="font-[family-name:var(--font-headline)] text-white font-bold text-lg sm:text-xl mb-3">
                  {panel.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {panel.pain}
                </p>
              </div>
            </BubbleRevealCard>
          ))}
        </div>

        <BubbleRevealText delay={0.7}>
          <p className="text-lavender/50 text-base sm:text-lg max-w-2xl leading-[1.8]">
            {industries.cta}
          </p>
        </BubbleRevealText>
      </div>
    </section>
  );
}
