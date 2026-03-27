"use client";

import { content } from "@/lib/content";
import { BubbleRevealText } from "./BubbleReveal";

export default function Partner() {
  const { partner } = content;

  return (
    <section id="partner" className="relative bg-fog py-24 sm:py-32 micro-circles-dense">
      <div className="px-6 sm:px-10 max-w-[1400px] mx-auto">
        {/* Intro text */}
        <div className="max-w-3xl mb-20">
          <BubbleRevealText>
            <div className="text-xs font-semibold tracking-[0.28em] uppercase text-violet mb-4 flex items-center gap-2">
              {partner.eyebrow}
              <span className="block w-6 h-[1px] bg-violet" />
            </div>
          </BubbleRevealText>

          <BubbleRevealText delay={0.1}>
            <h2 className="font-[family-name:var(--font-headline)] text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight tracking-tight mb-8">
              {partner.headline}
            </h2>
          </BubbleRevealText>

          {partner.intro.map((para, i) => (
            <BubbleRevealText key={i} delay={0.15 + i * 0.08}>
              <p className="text-slate text-base sm:text-lg leading-relaxed mb-4">
                {para}
              </p>
            </BubbleRevealText>
          ))}

          <BubbleRevealText delay={0.3}>
            <p className="text-slate text-base sm:text-lg leading-relaxed mb-4">
              {partner.offer}
            </p>
          </BubbleRevealText>

          <BubbleRevealText delay={0.35}>
            <p className="text-slate text-sm leading-relaxed">
              {partner.credential}
            </p>
          </BubbleRevealText>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Center vertical line */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-violet/20 hidden lg:block"
            aria-hidden="true"
          />

          {/* Mobile: left-aligned line */}
          <div
            className="absolute left-4 top-0 bottom-0 w-[1px] bg-violet/20 lg:hidden"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-16 lg:gap-20">
            {partner.steps.map((step, i) => {
              const isOdd = i % 2 === 0; // odd steps (0-indexed even) = title LEFT, desc RIGHT
              return (
                <BubbleRevealText key={step.title} delay={0.4 + i * 0.12}>
                  <div className="relative">
                    {/* Dot on center line — desktop */}
                    <div
                      className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-lime z-10"
                      aria-hidden="true"
                    />

                    {/* Dot on left line — mobile */}
                    <div
                      className="lg:hidden absolute left-4 -translate-x-1/2 top-3 w-2 h-2 rounded-full bg-lime z-10"
                      aria-hidden="true"
                    />

                    {/* Desktop layout */}
                    <div className="hidden lg:grid lg:grid-cols-2 lg:gap-0 items-center">
                      {isOdd ? (
                        <>
                          {/* Title on LEFT */}
                          <div className="flex items-center justify-end pr-8">
                            <div className="border border-violet/30 px-4 py-2">
                              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-ink">
                                {step.title}
                              </span>
                            </div>
                            {/* Dashed connector */}
                            <div
                              className="w-8 h-[1px] flex-shrink-0"
                              style={{
                                backgroundImage:
                                  "repeating-linear-gradient(to right, rgba(91,63,232,0.3) 0px, rgba(91,63,232,0.3) 4px, transparent 4px, transparent 8px)",
                              }}
                              aria-hidden="true"
                            />
                          </div>
                          {/* Description on RIGHT */}
                          <div className="pl-8">
                            <div
                              className="flex items-center"
                            >
                              <div
                                className="w-8 h-[1px] flex-shrink-0"
                                style={{
                                  backgroundImage:
                                    "repeating-linear-gradient(to right, rgba(91,63,232,0.3) 0px, rgba(91,63,232,0.3) 4px, transparent 4px, transparent 8px)",
                                }}
                                aria-hidden="true"
                              />
                              <p className="text-slate text-sm sm:text-base leading-relaxed ml-4 max-w-sm">
                                {step.desc}
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Description on LEFT */}
                          <div className="flex items-center justify-end pr-8">
                            <p className="text-slate text-sm sm:text-base leading-relaxed mr-4 max-w-sm text-right">
                              {step.desc}
                            </p>
                            <div
                              className="w-8 h-[1px] flex-shrink-0"
                              style={{
                                backgroundImage:
                                  "repeating-linear-gradient(to right, rgba(91,63,232,0.3) 0px, rgba(91,63,232,0.3) 4px, transparent 4px, transparent 8px)",
                              }}
                              aria-hidden="true"
                            />
                          </div>
                          {/* Title on RIGHT */}
                          <div className="pl-8">
                            <div className="flex items-center">
                              <div
                                className="w-8 h-[1px] flex-shrink-0"
                                style={{
                                  backgroundImage:
                                    "repeating-linear-gradient(to right, rgba(91,63,232,0.3) 0px, rgba(91,63,232,0.3) 4px, transparent 4px, transparent 8px)",
                                }}
                                aria-hidden="true"
                              />
                              <div className="border border-violet/30 px-4 py-2 ml-4">
                                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-ink">
                                  {step.title}
                                </span>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Mobile layout — always left-aligned */}
                    <div className="lg:hidden pl-10">
                      <div className="border border-violet/30 px-4 py-2 inline-block mb-2">
                        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-ink">
                          {step.title}
                        </span>
                      </div>
                      <p className="text-slate text-sm leading-relaxed max-w-md">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </BubbleRevealText>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
