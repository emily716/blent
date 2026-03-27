"use client";

import { content } from "@/lib/content";
import { BubbleRevealText } from "./BubbleReveal";

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

export default function Intervention() {
  const { intervention } = content;

  return (
    <section className="relative bg-lavender min-h-[85vh] flex items-center py-20 sm:py-32 lg:py-40 micro-circles">
      {/* Subtle horizontal divider at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[800px] h-[1px] bg-violet/10" />

      <div className="px-6 sm:px-10 max-w-[1400px] mx-auto w-full">
        <div className="flex flex-col items-center text-center">
          <BubbleRevealText>
            <div className="text-sm sm:text-base font-[family-name:var(--font-headline)] font-600 tracking-[0.15em] uppercase text-violet mb-6">
              {intervention.eyebrow}
            </div>
          </BubbleRevealText>

          <BubbleRevealText delay={0.15}>
            <h2
              className="font-[family-name:var(--font-headline)] font-800 text-ink leading-tight tracking-[-0.02em] mb-12"
              style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
            >
              <Nl text={intervention.headline} />
            </h2>
          </BubbleRevealText>

          <div className="max-w-2xl">
            {intervention.body.map((para, i) => (
              <BubbleRevealText key={i} delay={0.25 + i * 0.1}>
                <p className="text-slate text-base sm:text-lg leading-[1.8] mb-6 last:mb-0">
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
