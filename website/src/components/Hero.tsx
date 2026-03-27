"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { content } from "@/lib/content";

export default function Hero() {
  const { hero } = content;
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
  }, []);

  const animProps = (delay: number) =>
    reducedMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.7,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <section className="relative min-h-screen bg-dark flex flex-col justify-center overflow-hidden">
      {/* Micro-circle pattern */}
      <div className="absolute inset-0 micro-circles-light" />

      {/* Radial glow */}
      <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-violet/[0.12] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 px-6 sm:px-10 max-w-[1400px] mx-auto w-full pt-28 pb-16">
        <motion.div
          className="text-xs font-semibold tracking-[0.2em] uppercase text-lime mb-6 flex items-center gap-3"
          {...animProps(0.3)}
        >
          <span className="block w-5 h-[1px] bg-lime" />
          {hero.eyebrow}
        </motion.div>

        <motion.h1
          className="font-[family-name:var(--font-headline)] font-bold text-white leading-[0.95] tracking-tight mb-6"
          style={{ fontSize: "clamp(56px, 7vw, 96px)" }}
          {...animProps(0.5)}
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-lavender/50 max-w-xl leading-relaxed mb-10"
          {...animProps(0.7)}
        >
          {hero.sub}
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center gap-4"
          {...animProps(0.9)}
        >
          <a
            href={hero.cta.href}
            className="inline-block text-xs font-semibold tracking-[0.1em] uppercase bg-lime text-ink px-7 py-4 btn-lift active:scale-95"
          >
            {hero.cta.label}
          </a>
          <a
            href={hero.ctaSecondary.href}
            className="inline-block text-xs font-medium tracking-wider uppercase text-lavender/50 border-b border-lavender/20 pb-1 hover:text-white hover:border-lavender/50 transition-colors"
          >
            {hero.ctaSecondary.label}
          </a>
        </motion.div>
      </div>

      {/* Bottom edge gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-fog to-transparent" />
    </section>
  );
}
