"use client";

import { content } from "@/lib/content";
import { BubbleRevealText, VisualReveal } from "./BubbleReveal";
import Image from "next/image";

export default function WhatBlentDoes() {
  const { what } = content;

  return (
    <section id="what" className="relative bg-fog py-24 sm:py-32 micro-circles-dense">
      <div className="px-6 sm:px-10 max-w-[1400px] mx-auto">
        {/* 12-column grid: image left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-8 mb-16">
          {/* Left: image placeholder (col-span-5) */}
          <div className="lg:col-span-5">
            <VisualReveal>
              <div
                className="relative bg-dark overflow-hidden flex items-center justify-center"
                style={{ aspectRatio: "4/5" }}
              >
                <Image
                  src="/images/placeholder-product.svg"
                  alt="PRODUCT IMAGE — Replace with blent product photo"
                  fill
                  className="object-cover"
                />
              </div>
            </VisualReveal>
          </div>

          {/* Right: content (col 7-12) */}
          <div className="lg:col-start-7 lg:col-span-6 flex flex-col justify-center">
            <BubbleRevealText>
              <div className="text-xs font-semibold tracking-[0.28em] uppercase text-violet mb-4 flex items-center gap-2">
                {what.eyebrow}
                <span className="block w-6 h-[1px] bg-violet" />
              </div>
            </BubbleRevealText>

            <BubbleRevealText delay={0.1}>
              <h2 className="font-[family-name:var(--font-headline)] text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight tracking-tight mb-8">
                {what.headline}
              </h2>
            </BubbleRevealText>

            {what.body.map((para, i) => (
              <BubbleRevealText key={i} delay={0.2 + i * 0.1}>
                <p className="text-slate text-base sm:text-lg leading-relaxed mb-4 last:mb-0">
                  {para}
                </p>
              </BubbleRevealText>
            ))}
          </div>
        </div>

        {/* Scrolling substrate tags */}
        <BubbleRevealText delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm sm:text-base font-medium text-ink">
            {what.items.map((item, i) => (
              <span key={item} className="flex items-center gap-4">
                <span>{item}</span>
                {i < what.items.length - 1 && (
                  <span className="text-violet/30" aria-hidden="true">
                    &bull;
                  </span>
                )}
              </span>
            ))}
          </div>
        </BubbleRevealText>
      </div>
    </section>
  );
}
