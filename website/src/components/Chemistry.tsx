"use client";

import { content } from "@/lib/content";
import { BubbleRevealText, BubbleRevealCard } from "./BubbleReveal";
import Image from "next/image";

const supplierLogos: Record<string, string> = {
  Honeysurf: "/images/placeholder-supplier-honeysurf.svg",
  "RE:Chemistry": "/images/placeholder-supplier-rechemistry.svg",
};

export default function Chemistry() {
  const { chemistry } = content;

  return (
    <section className="relative bg-white py-24 sm:py-32 micro-circles">
      <div className="px-6 sm:px-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <BubbleRevealText>
              <div className="text-xs font-semibold tracking-[0.28em] uppercase text-violet mb-4 flex items-center gap-2">
                {chemistry.eyebrow}
                <span className="block w-6 h-[1px] bg-violet" />
              </div>
            </BubbleRevealText>

            <BubbleRevealText delay={0.1}>
              <h2 className="font-[family-name:var(--font-headline)] text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight tracking-tight mb-8">
                {chemistry.headline}
              </h2>
            </BubbleRevealText>

            {chemistry.body.map((para, i) => (
              <BubbleRevealText key={i} delay={0.15 + i * 0.08}>
                <p className="text-slate text-base sm:text-lg leading-relaxed mb-4 last:mb-0">
                  {para}
                </p>
              </BubbleRevealText>
            ))}
          </div>

          {/* Supplier cards — replace SVGs in /public/images/ with real logos */}
          <div className="flex flex-col gap-4 lg:mt-20">
            {chemistry.suppliers.map((supplier, i) => (
              <BubbleRevealCard
                key={supplier.name}
                delay={0.3 + i * 0.12}
                className="bg-fog border border-violet/[0.06] p-8"
              >
                <div className="flex items-center gap-5 mb-3">
                  {/* Supplier logo placeholder — replace with real logo */}
                  <Image
                    src={supplierLogos[supplier.name]}
                    alt={`${supplier.name} logo`}
                    width={200}
                    height={80}
                    className="h-12 w-auto flex-shrink-0 opacity-60"
                  />
                  <div>
                    <h3 className="font-[family-name:var(--font-headline)] font-bold text-ink text-lg">
                      {supplier.name}
                    </h3>
                    <p className="text-slate text-sm">{supplier.desc}</p>
                  </div>
                </div>
              </BubbleRevealCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
