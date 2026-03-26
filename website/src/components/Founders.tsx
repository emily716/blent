"use client";

import { content } from "@/lib/content";
import { BubbleRevealText } from "./BubbleReveal";
import Image from "next/image";

export default function Founders() {
  const { founders } = content;

  const founderImages: Record<string, string> = {
    Emily: "/images/placeholder-founder-emily.svg",
    Chris: "/images/placeholder-founder-chris.svg",
  };

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

          {/* Founder portraits — replace SVGs in /public/images/ with real photos */}
          <div className="flex gap-6 lg:justify-end lg:mt-16">
            {founders.people.map((person, i) => (
              <BubbleRevealText key={person.name} delay={0.3 + i * 0.12}>
                <div className="text-center">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden bg-violet/[0.08] border border-violet/[0.1] mb-4 mx-auto">
                    <Image
                      src={founderImages[person.name]}
                      alt={person.name}
                      width={144}
                      height={144}
                      className="w-full h-full object-cover"
                    />
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
