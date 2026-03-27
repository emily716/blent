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

export default function Partner() {
  const { partner } = content;

  return (
    <section id="partner" className="relative bg-fog min-h-screen py-20 sm:py-32 lg:py-40 micro-circles-dense">
      <div className="px-6 sm:px-10 max-w-[1400px] mx-auto">
        {/* Intro text */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <BubbleRevealText>
            <div className="text-sm sm:text-base font-[family-name:var(--font-headline)] font-600 tracking-[0.15em] uppercase text-violet mb-6">
              {partner.eyebrow}
            </div>
          </BubbleRevealText>

          <BubbleRevealText delay={0.15}>
            <h2 className="font-[family-name:var(--font-headline)] text-3xl sm:text-4xl lg:text-5xl font-800 text-ink leading-tight tracking-[-0.02em] mb-10">
              <Nl text={partner.headline} />
            </h2>
          </BubbleRevealText>

          {partner.intro.map((para, i) => (
            <BubbleRevealText key={i} delay={0.2 + i * 0.12}>
              <p className="text-slate text-base sm:text-lg leading-[1.8] mb-5">
                {para}
              </p>
            </BubbleRevealText>
          ))}

          <BubbleRevealText delay={0.4}>
            <p className="text-slate text-base sm:text-lg leading-[1.8]">
              {partner.offer}
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

          <div className="flex flex-col gap-20 lg:gap-24">
            {partner.steps.map((step, i) => {
              const isOdd = i % 2 === 0;
              return (
                <BubbleRevealText key={step.title} delay={0.5 + i * 0.15}>
                  <div className="relative">
                    {/* Dot on center line — desktop */}
                    <div
                      className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-lime z-10"
                      aria-hidden="true"
                    />

                    {/* Dot on left line — mobile */}
                    <div
                      className="lg:hidden absolute left-4 -translate-x-1/2 top-3 w-3 h-3 rounded-full bg-lime z-10"
                      aria-hidden="true"
                    />

                    {/* Desktop layout */}
                    <div className="hidden lg:grid lg:grid-cols-2 lg:gap-0 items-center">
                      {isOdd ? (
                        <>
                          <div className="flex items-center justify-end pr-8">
                            <div className="border border-violet/30 px-5 py-3">
                              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-ink">
                                {step.title}
                              </span>
                            </div>
                            <div
                              className="w-8 h-[1px] flex-shrink-0"
                              style={{
                                backgroundImage:
                                  "repeating-linear-gradient(to right, rgba(91,63,232,0.3) 0px, rgba(91,63,232,0.3) 4px, transparent 4px, transparent 8px)",
                              }}
                              aria-hidden="true"
                            />
                          </div>
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
                              <p className="text-slate text-sm sm:text-base leading-relaxed ml-4 max-w-sm">
                                {step.desc}
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
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
                              <div className="border border-violet/30 px-5 py-3 ml-4">
                                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-ink">
                                  {step.title}
                                </span>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Mobile layout */}
                    <div className="lg:hidden pl-10">
                      <div className="border border-violet/30 px-5 py-3 inline-block mb-3">
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
