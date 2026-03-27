"use client";

import { useRef, useEffect, useState } from "react";

export default function VideoScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    /* Detect mobile: touch device or narrow viewport */
    const mobile =
      window.innerWidth < 768 ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
    setIsMobile(mobile);

    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    if (mobile) {
      /* Mobile: simple autoplay loop — scroll scrub is unreliable on iOS */
      video.play().catch(() => {
        /* Autoplay blocked — that's ok, user will see first frame */
      });
      return;
    }

    /* Desktop: scroll-scrub playback */
    const onReady = () => {
      const scrub = () => {
        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight - window.innerHeight;
        if (sectionHeight <= 0) return;

        const raw = -rect.top / sectionHeight;
        const progress = Math.min(1, Math.max(0, raw));

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
      /* Desktop: 300vh for scroll-scrub room. Mobile: single viewport */
      style={{ height: isMobile ? "100vh" : "300vh" }}
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
            loop={isMobile}
            autoPlay={isMobile}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Cover bottom-right corner where watermark sits */}
        <div
          className="absolute bottom-0 right-0 w-[140px] h-[50px] bg-dark z-10"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
