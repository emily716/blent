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

export default function Problem() {
  const { problem } = content;

  return (
    <section id="problem" className="relative bg-white py-32 sm:py-40 lg:py-48 micro-circles">
      <div className="px-6 sm:px-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-8">
          {/* Left column: eyebrow + headline (cols 1-5) */}
          <div className="lg:col-span-5">
            <BubbleRevealText>
              <div className="text-xs font-semibold tracking-[0.28em] uppercase text-violet mb-5 flex items-center gap-2">
                {problem.eyebrow}
                <span className="block w-6 h-[1px] bg-violet" />
              </div>
            </BubbleRevealText>

            <BubbleRevealText delay={0.15}>
              <h2 className="font-[family-name:var(--font-headline)] text-3xl sm:text-4xl lg:text-5xl font-800 text-ink leading-tight tracking-[-0.02em]">
                <Nl text={problem.headline} />
              </h2>
            </BubbleRevealText>
          </div>

          {/* Right column: body text (cols 7-12) */}
          <div className="lg:col-start-7 lg:col-span-6">
            {problem.body.map((para, i) => {
              const isLast = i === problem.body.length - 1;
              return (
                <BubbleRevealText key={i} delay={0.2 + i * 0.12}>
                  <p
                    className={
                      isLast
                        ? "font-[family-name:var(--font-headline)] text-xl sm:text-2xl font-bold text-ink leading-snug mt-6"
                        : "text-slate text-base sm:text-lg leading-[1.8] mb-5"
                    }
                  >
                    <Nl text={para} />
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
