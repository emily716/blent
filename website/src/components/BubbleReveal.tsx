"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function BubbleRevealText({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 32 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 32 }
      }
      transition={{
        duration: 1.0,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function BubbleRevealStat({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 40 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 40 }
      }
      transition={{
        duration: 1.1,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Bubble accent behind the stat */}
      <motion.div
        className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 rounded-full bg-lime/10"
        initial={{ width: 0, height: 0 }}
        animate={isInView ? { width: 56, height: 56 } : { width: 0, height: 0 }}
        transition={{ duration: 0.9, delay: delay + 0.15, ease: "easeOut" }}
      />
      <div className="relative">
        <div className="font-[family-name:var(--font-headline)] text-3xl sm:text-5xl lg:text-7xl font-800 text-lime leading-none mb-2 sm:mb-3">
          {value}
        </div>
        <div className="text-white/50 text-xs sm:text-sm lg:text-base max-w-[240px] leading-relaxed">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export function BubbleRevealCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 1.0,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* Clip-path vertical reveal for images */
export function VisualReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={
        isInView
          ? { clipPath: "inset(0 0 0% 0)" }
          : { clipPath: "inset(0 0 100% 0)" }
      }
      transition={{
        duration: 1.4,
        delay,
        ease: [0.22, 0.61, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
