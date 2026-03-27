"use client";

import { content } from "@/lib/content";
import Image from "next/image";

export default function Footer() {
  const { footer } = content;

  return (
    <footer className="bg-ink py-12">
      <div className="px-6 sm:px-10 max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.svg"
              alt="blent"
              width={100}
              height={30}
              className="h-8 w-auto opacity-60"
            />
            <span className="text-lavender/30 text-sm">{footer.tagline}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
            <a
              href={`mailto:${footer.email}`}
              className="text-lavender/40 text-sm hover:text-lime transition-colors"
            >
              {footer.email}
            </a>
            <span className="text-lavender/20 text-xs">{footer.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
