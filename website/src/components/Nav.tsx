"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { content } from "@/lib/content";
import Image from "next/image";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark/95 backdrop-blur-md border-b border-lime/[0.07]"
          : "bg-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between px-6 sm:px-10 py-4 max-w-[1400px] mx-auto">
        <a href="#" className="flex-shrink-0">
          <Image
            src="/logo.svg"
            alt="blent"
            width={36}
            height={44}
            className="h-9 w-auto"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {content.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium tracking-wider uppercase text-lavender/40 hover:text-lime transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href={content.nav.cta.href}
            className="text-xs font-semibold tracking-widest uppercase bg-lime text-ink px-5 py-3 hover:opacity-90 transition-opacity"
          >
            {content.nav.cta.label}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className={`block w-5 h-[1.5px] bg-white transition-transform duration-200 ${
              menuOpen ? "translate-y-[5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-white transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-white transition-transform duration-200 ${
              menuOpen ? "-translate-y-[5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          className="md:hidden bg-dark border-t border-lime/[0.07] px-6 py-6 flex flex-col gap-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {content.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-wider uppercase text-lavender/50 hover:text-lime transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={content.nav.cta.href}
            className="text-xs font-semibold tracking-widest uppercase bg-lime text-ink px-5 py-3 text-center mt-2"
            onClick={() => setMenuOpen(false)}
          >
            {content.nav.cta.label}
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
