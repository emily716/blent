"use client";

import { useRef, useEffect } from "react";

export default function VideoScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    /* Wait for video metadata so we know its duration */
    const onReady = () => {
      const scrub = () => {
        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight - window.innerHeight;
        if (sectionHeight <= 0) return;

        /* progress 0 → 1 as section scrolls through viewport */
        const raw = -rect.top / sectionHeight;
        const progress = Math.min(1, Math.max(0, raw));

        if (video.duration && Number.isFinite(video.duration)) {
          video.currentTime = progress * video.duration;
        }
      };

      window.addEventListener("scroll", scrub, { passive: true });
      scrub(); /* initial position */
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
      /* 3× viewport height gives room to scrub through the video */
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Mask to crop the bottom-right VEO watermark */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: "inset(0 0 40px 0)",
          }}
        >
          <video
            ref={videoRef}
            src="/videos/D_Water_Feature_Animation.mp4"
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Additional mask: cover bottom-right corner specifically */}
        <div
          className="absolute bottom-0 right-0 w-[140px] h-[50px] bg-dark z-10"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
