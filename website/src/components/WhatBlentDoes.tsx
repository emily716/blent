"use client";

import { content } from "@/lib/content";
import { BubbleRevealText, VisualReveal } from "./BubbleReveal";
import Image from "next/image";

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

export default function WhatBlentDoes() {
  const { what } = content;

  return (
    <section id="what" className="relative bg-fog py-32 sm:py-40 lg:py-48 micro-circles-dense">
      <div className="px-6 sm:px-10 max-w-[1400px] mx-auto">
        {/* 12-column grid: image left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-8 mb-20">
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
              <div className="text-xs font-semibold tracking-[0.28em] uppercase text-violet mb-5 flex items-center gap-2">
                {what.eyebrow}
                <span className="block w-6 h-[1px] bg-violet" />
              </div>
            </BubbleRevealText>

            <BubbleRevealText delay={0.15}>
              <h2 className="font-[family-name:var(--font-headline)] text-3xl sm:text-4xl lg:text-5xl font-800 text-ink leading-tight tracking-[-0.02em] mb-10">
                <Nl text={what.headline} />
              </h2>
            </BubbleRevealText>

            {what.body.map((para, i) => (
              <BubbleRevealText key={i} delay={0.25 + i * 0.12}>
                <p className="text-slate text-base sm:text-lg leading-[1.8] mb-5 last:mb-0">
                  <Nl text={para} />
                </p>
              </BubbleRevealText>
            ))}
          </div>
        </div>

        {/* Scrolling substrate tags */}
        <BubbleRevealText delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm sm:text-base font-medium text-ink">
            {what.items.map((item, i) => (
              <span key={item} className="flex items-center gap-5">
                <span>{item}</span>
                {i < what.items.length - 1 && (
                  <span className="text-violet/30" aria-hidden="true">
                    •
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
