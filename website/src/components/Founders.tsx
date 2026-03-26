"use client";

import { content } from "@/lib/content";
import { BubbleRevealText } from "./BubbleReveal";

export default function Founders() {
  const { founders } = content;

  return (
    <section id="founders" className="relative bg-lavender py-24 sm:py-32 micro-circles">
      <div className="px-6 sm:px-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <BubbleRevealText>
              <div className="text-xs font-semibold tracking-[0.28em] uppercase text-violet mb-4 flex items-center gap-2">
                {founders.eyebrow}
                <span className="block w-6 h-[1px] bg-violet" />
              </div>
            </BubbleRevealText>

            <BubbleRevealText delay={0.1}>
              <h2 className="font-[family-name:var(--font-headline)] text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight tracking-tight mb-8">
                {founders.headline}
              </h2>
            </BubbleRevealText>

            {founders.body.map((para, i) => (
              <BubbleRevealText key={i} delay={0.15 + i * 0.08}>
                <p className="text-slate text-base sm:text-lg leading-relaxed mb-4 last:mb-0">
                  {para}
                </p>
              </BubbleRevealText>
            ))}
          </div>

          {/* Founder initials */}
          <div className="flex gap-6 lg:justify-end lg:mt-16">
            {founders.people.map((person, i) => (
              <BubbleRevealText key={person.name} delay={0.3 + i * 0.12}>
                <div className="text-center">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-violet/[0.08] border border-violet/[0.1] flex items-center justify-center mb-4 mx-auto">
                    <span className="font-[family-name:var(--font-headline)] text-3xl sm:text-4xl font-bold text-violet">
                      {person.name[0]}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-headline)] font-bold text-ink text-base">
                    {person.name}
                  </h3>
                  <p className="text-slate text-sm">{person.title}</p>
                </div>
              </BubbleRevealText>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
