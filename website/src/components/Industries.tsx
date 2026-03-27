"use client";

import { content } from "@/lib/content";
import { BubbleRevealText, BubbleRevealCard } from "./BubbleReveal";
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

const panelImages: Record<string, string> = {
  "Ink manufacturing": "/images/industry-ink.png",
  "Lithographic printing": "/images/industry-lithographic.png",
  "Resin manufacturing": "/images/industry-resins.png",
  "Paint & coatings": "/images/industry-vessel-cleaning.png",
};

export default function Industries() {
  const { industries } = content;

  return (
    <section
      id="industries"
      className="relative bg-dark min-h-screen py-20 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="absolute inset-0 micro-circles-light" />

      <div className="relative z-10 px-6 sm:px-10 max-w-[1400px] mx-auto">
        <BubbleRevealText>
          <div className="text-sm sm:text-base font-[family-name:var(--font-headline)] font-600 tracking-[0.15em] uppercase text-lime/80 mb-6">
            {industries.eyebrow}
          </div>
        </BubbleRevealText>

        <BubbleRevealText delay={0.15}>
          <h2
            className="font-[family-name:var(--font-headline)] font-800 text-white leading-tight tracking-[-0.02em] mb-12 sm:mb-16"
            style={{ fontSize: "clamp(26px, 4.5vw, 48px)" }}
          >
            <Nl text={industries.headline} />
          </h2>
        </BubbleRevealText>

        {/* Bento-style grid: first card spans 2 columns, all cards have images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-14">
          {industries.panels.map((panel, i) => (
            <BubbleRevealCard
              key={panel.number}
              delay={0.2 + i * 0.12}
              className={`card-hover bg-white/[0.04] border border-white/[0.06] group hover:bg-white/[0.07] transition-colors duration-300 overflow-hidden ${
                i === 0 ? "sm:col-span-2 lg:col-span-2" : ""
              }`}
            >
              {/* Industry image */}
              <div
                className={`relative overflow-hidden ${
                  i === 0 ? "h-40 sm:h-56" : "h-36 sm:h-48"
                }`}
              >
                <Image
                  src={panelImages[panel.title]}
                  alt={panel.title}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                />
              </div>

              {/* Card content */}
              <div className="p-6 sm:p-8">
                <div className="text-lime font-[family-name:var(--font-headline)] text-sm font-bold mb-4">
                  {panel.number}
                </div>
                <h3 className="font-[family-name:var(--font-headline)] text-white font-bold text-lg sm:text-xl mb-3">
                  {panel.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {panel.pain}
                </p>
              </div>
            </BubbleRevealCard>
          ))}
        </div>

        <BubbleRevealText delay={0.7}>
          <p className="text-lavender/50 text-base sm:text-lg max-w-2xl leading-[1.8]">
            {industries.cta}
          </p>
        </BubbleRevealText>
      </div>
    </section>
  );
}
