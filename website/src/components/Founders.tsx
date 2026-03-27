"use client";

import { content } from "@/lib/content";
import { BubbleRevealText } from "./BubbleReveal";
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

export default function Founders() {
  const { founders } = content;

  const founderImages: Record<string, string> = {
    Emily: "/images/founder-emily.jpeg",
    Chris: "/images/founder-chris.jpg",
  };

  return (
    <section id="founders" className="relative bg-lavender min-h-screen flex items-center py-20 sm:py-32 lg:py-40 micro-circles">
      <div className="px-6 sm:px-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <BubbleRevealText>
              <div className="text-sm sm:text-base font-[family-name:var(--font-headline)] font-600 tracking-[0.15em] uppercase text-violet mb-6">
                {founders.eyebrow}
              </div>
            </BubbleRevealText>

            <BubbleRevealText delay={0.15}>
              <h2 className="font-[family-name:var(--font-headline)] text-3xl sm:text-4xl lg:text-5xl font-800 text-ink leading-tight tracking-[-0.02em] mb-3">
                {founders.headline}
              </h2>
            </BubbleRevealText>

            <BubbleRevealText delay={0.2}>
              <p className="font-[family-name:var(--font-headline)] text-xl sm:text-2xl font-600 text-violet leading-snug mb-10">
                <Nl text={founders.subheadline} />
              </p>
            </BubbleRevealText>

            {founders.body.map((para, i) => (
              <BubbleRevealText key={i} delay={0.3 + i * 0.1}>
                <p className="text-slate text-base sm:text-lg leading-[1.8] mb-5 last:mb-0">
                  {para}
                </p>
              </BubbleRevealText>
            ))}
          </div>

          {/* Founder portraits */}
          <div className="flex gap-4 sm:gap-6 lg:justify-end lg:mt-16">
            {founders.people.map((person, i) => (
              <BubbleRevealText key={person.name} delay={0.4 + i * 0.15}>
                <div className="text-center">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden bg-violet/[0.08] border border-violet/[0.1] mb-4 mx-auto">
                    <Image
                      src={founderImages[person.name]}
                      alt={person.name}
                      width={144}
                      height={144}
                      className={`w-full h-full object-cover ${
                        person.name === "Chris" ? "grayscale" : ""
                      }`}
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
