"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function VideoScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile =
      window.innerWidth < 768 ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
    setIsMobile(mobile);

    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    if (mobile) {
      video.play().catch(() => {});
      return;
    }

    /* Desktop: start scrubbing as soon as section enters viewport */
    const onReady = () => {
      const scrub = () => {
        const rect = section.getBoundingClientRect();
        const viewH = window.innerHeight;
        /* Start when section top hits bottom of viewport (rect.top === viewH)
           End when section bottom leaves top of viewport */
        const totalTravel = section.offsetHeight + viewH;
        const traveled = viewH - rect.top;
        const progress = Math.min(1, Math.max(0, traveled / totalTravel));

        if (video.duration && Number.isFinite(video.duration)) {
          video.currentTime = progress * video.duration;
        }
      };

      window.addEventListener("scroll", scrub, { passive: true });
      scrub();
      return () => window.removeEventListener("scroll", scrub);
    };

    if (video.readyState >= 1) {
      const cleanup = onReady();
      return cleanup;
    }

    let cleanup: (() => void) | undefined;
    const handler = () => {
      cleanup = onReady();
    };
    video.addEventListener("loadedmetadata", handler);
    return () => {
      video.removeEventListener("loadedmetadata", handler);
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-dark"
      style={{ height: isMobile ? "100vh" : "400vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video layer */}
        <div
          className="absolute inset-0"
          style={{ clipPath: "inset(0 0 40px 0)" }}
        >
          <video
            ref={videoRef}
            src="/videos/D_Water_Feature_Animation.mp4"
            muted
            playsInline
            preload="auto"
            loop={isMobile}
            autoPlay={isMobile}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0 bg-dark/40" />
        </div>

        {/* Cover bottom-right watermark */}
        <div
          className="absolute bottom-0 right-0 w-[140px] h-[50px] bg-dark z-10"
          aria-hidden="true"
        />

        {/* Text overlay — centered content */}
        <div
          ref={textRef}
          className="absolute inset-0 z-20 flex flex-col justify-end px-6 sm:px-10 pb-16 sm:pb-24 max-w-[1400px] mx-auto"
        >
          <motion.p
            className="text-xs font-semibold tracking-[0.28em] uppercase text-lime/80 mb-4 flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            What blent does
            <span className="block w-6 h-[1px] bg-lime/40" />
          </motion.p>

          <motion.h2
            className="font-[family-name:var(--font-headline)] font-800 text-white leading-[0.95] tracking-[-0.02em] max-w-4xl"
            style={{ fontSize: "clamp(32px, 5vw, 72px)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Removes what nothing else will.
            <br />
            Then does it again.
          </motion.h2>

          <motion.p
            className="text-lavender/60 text-sm sm:text-base max-w-lg leading-relaxed mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            No PPE. No hazardous waste collections.
            <br />
            No compromise on performance.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
