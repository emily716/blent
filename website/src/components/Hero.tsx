"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";
import BubbleBackground from "./BubbleBackground";

export default function Hero() {
  const { hero } = content;

  return (
    <section className="relative min-h-screen bg-dark flex flex-col justify-center overflow-hidden">
      {/* Micro-circle pattern */}
      <div className="absolute inset-0 micro-circles-light" />

      {/* Radial glow */}
      <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-violet/[0.12] rounded-full blur-[120px] pointer-events-none" />

      {/* Animated bubbles */}
      <BubbleBackground
        count={45}
        color="rgba(200,245,119,0.04)"
      />

      <div className="relative z-10 px-6 sm:px-10 max-w-[1400px] mx-auto w-full pt-28 pb-16">
        <motion.div
          className="text-xs font-semibold tracking-[0.2em] uppercase text-lime mb-6 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="block w-5 h-[1px] bg-lime" />
          {hero.eyebrow}
        </motion.div>

        <motion.h1
          className="font-[family-name:var(--font-headline)] text-5xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold text-white leading-[0.95] tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-lavender/50 max-w-xl leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {hero.sub}
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          <a
            href={hero.cta.href}
            className="inline-block text-xs font-semibold tracking-[0.1em] uppercase bg-lime text-ink px-7 py-4 hover:opacity-90 transition-opacity"
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
