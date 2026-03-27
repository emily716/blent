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
          initial: { opacity: 0, y: 32 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 1.0,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <section className="relative min-h-screen bg-dark flex flex-col justify-end overflow-hidden">
      {/* Micro-circle pattern */}
      <div className="absolute inset-0 micro-circles-light" />

      {/* Radial glow */}
      <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-violet/[0.12] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 px-6 sm:px-10 max-w-[1400px] mx-auto w-full pb-16 sm:pb-28 lg:pb-36">
        {/* Single hero title — large editorial display */}
        <motion.h1
          className="font-[family-name:var(--font-headline)] font-800 text-white leading-[0.92] tracking-[-0.03em]"
          style={{ fontSize: "clamp(48px, 10vw, 160px)" }}
          {...animProps(0.4)}
        >
          Making clean,
          <br />
          clean.
        </motion.h1>

        <motion.p
          className="text-sm sm:text-base lg:text-xl text-lavender/50 max-w-2xl leading-relaxed mt-8 sm:mt-12"
          {...animProps(0.7)}
        >
          {hero.sub.split("\n").map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center gap-4 sm:gap-5 mt-8 sm:mt-10"
          {...animProps(1.0)}
        >
          <a
            href={hero.cta.href}
            className="inline-block text-xs font-semibold tracking-[0.12em] uppercase bg-lime text-ink px-6 py-3.5 sm:px-10 sm:py-5 btn-lift active:scale-95"
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
    </section>
  );
}
