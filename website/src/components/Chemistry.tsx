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

export default function Chemistry() {
  const { chemistry } = content;

  return (
    <section className="relative bg-white min-h-screen flex items-center py-20 sm:py-32 lg:py-40 micro-circles">
      <div className="px-6 sm:px-10 max-w-[1400px] mx-auto">
        <div className="max-w-3xl">
          <BubbleRevealText>
            <div className="text-sm sm:text-base font-[family-name:var(--font-headline)] font-600 tracking-[0.15em] uppercase text-violet mb-6">
              {chemistry.eyebrow}
            </div>
          </BubbleRevealText>

          <BubbleRevealText delay={0.15}>
            <h2 className="font-[family-name:var(--font-headline)] text-3xl sm:text-4xl lg:text-5xl font-800 text-ink leading-tight tracking-[-0.02em] mb-10">
              {chemistry.headline}
            </h2>
          </BubbleRevealText>

          {chemistry.body.map((para, i) => (
            <BubbleRevealText key={i} delay={0.2 + i * 0.12}>
              <p className="text-slate text-base sm:text-lg leading-[1.8] mb-5 last:mb-0">
                <Nl text={para} />
              </p>
            </BubbleRevealText>
          ))}
        </div>
      </div>
    </section>
  );
}
