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
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 24, scale: 0.97 }
      }
      transition={{
        duration: 0.7,
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
      initial={{ opacity: 0, scale: 0.8 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.8 }
      }
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Bubble accent behind the stat */}
      <motion.div
        className="absolute -top-4 -left-4 rounded-full bg-lime/10"
        initial={{ width: 0, height: 0 }}
        animate={isInView ? { width: 80, height: 80 } : { width: 0, height: 0 }}
        transition={{ duration: 0.6, delay: delay + 0.1, ease: "easeOut" }}
      />
      <div className="relative">
        <div className="font-[family-name:var(--font-headline)] text-5xl sm:text-6xl lg:text-7xl font-bold text-lime leading-none mb-2">
          {value}
        </div>
        <div className="text-white/50 text-sm sm:text-base max-w-[240px]">
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Bubble pop mask */}
      <motion.div
        className="absolute inset-0 rounded-full bg-violet/5 pointer-events-none"
        initial={{ scale: 0, opacity: 0.5 }}
        animate={isInView ? { scale: 3, opacity: 0 } : { scale: 0, opacity: 0.5 }}
        transition={{ duration: 1.2, delay: delay + 0.1, ease: "easeOut" }}
        style={{ transformOrigin: "center center" }}
      />
      {children}
    </motion.div>
  );
}
