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

export default function FinalCta() {
  const { finalCta } = content;

  return (
    <section className="relative bg-dark py-32 sm:py-40 lg:py-48 overflow-hidden">
      <div className="absolute inset-0 micro-circles-light" />

      {/* Glow */}
      <div className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-violet/[0.1] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 px-6 sm:px-10 max-w-[1400px] mx-auto text-center">
        <BubbleRevealText>
          <h2 className="font-[family-name:var(--font-headline)] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-800 text-white leading-tight tracking-[-0.02em] max-w-4xl mx-auto mb-10">
            <Nl text={finalCta.headline} />
          </h2>
        </BubbleRevealText>

        <BubbleRevealText delay={0.2}>
          <p className="text-lavender/50 text-base sm:text-lg max-w-xl mx-auto leading-[1.8] mb-12">
            {finalCta.sub}
          </p>
        </BubbleRevealText>

        <BubbleRevealText delay={0.4}>
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
