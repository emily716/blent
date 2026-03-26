"use client";

import { content } from "@/lib/content";
import { BubbleRevealText } from "./BubbleReveal";

export default function Problem() {
  const { problem } = content;

  return (
    <section id="problem" className="relative bg-white py-24 sm:py-32 micro-circles">
      <div className="px-6 sm:px-10 max-w-[1400px] mx-auto">
        {/* 12-column asymmetric grid: eyebrow+headline left, body right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-8">
          {/* Left column: eyebrow + headline (cols 1-5) */}
          <div className="lg:col-span-5">
            <BubbleRevealText>
              <div className="text-xs font-semibold tracking-[0.28em] uppercase text-violet mb-4 flex items-center gap-2">
                {problem.eyebrow}
                <span className="block w-6 h-[1px] bg-violet" />
              </div>
            </BubbleRevealText>

            <BubbleRevealText delay={0.1}>
              <h2 className="font-[family-name:var(--font-headline)] text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight tracking-tight">
                {problem.headline}
              </h2>
            </BubbleRevealText>
          </div>

          {/* Right column: body text (cols 7-12) */}
          <div className="lg:col-start-7 lg:col-span-6">
            {problem.body.map((para, i) => {
              const isLast = i === problem.body.length - 1;
              return (
                <BubbleRevealText key={i} delay={0.15 + i * 0.08}>
                  <p
                    className={
                      isLast
                        ? "font-[family-name:var(--font-headline)] text-xl sm:text-2xl font-bold text-ink leading-snug mt-4"
                        : "text-slate text-base sm:text-lg leading-relaxed mb-4"
                    }
                  >
                    {para}
                  </p>
                </BubbleRevealText>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
