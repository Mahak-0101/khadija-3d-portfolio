"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-couture-950 py-16 px-6 sm:px-12 border-t border-white/5 select-none">
      <div className="max-w-7xl mx-auto flex flex-col space-y-12">
        {/* Top Tier: Back to Top & Quick Nav */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-couture-gold" />
            <span className="font-display text-base tracking-[0.25em] text-couture-cream uppercase">
              KHADIJA FARHAT
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] tracking-[0.25em] font-sans text-couture-muted uppercase">
            <a href="#work" className="hover:text-couture-gold transition-colors">
              WORK
            </a>
            <a href="#experience" className="hover:text-couture-gold transition-colors">
              3D EXPERIENCE
            </a>
            <a href="#motion" className="hover:text-couture-gold transition-colors">
              MOTION
            </a>
            <a href="#gallery" className="hover:text-couture-gold transition-colors">
              GALLERY
            </a>
            <a href="#about" className="hover:text-couture-gold transition-colors">
              ABOUT
            </a>
            <a href="#contact" className="hover:text-couture-gold transition-colors">
              CONTACT
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase font-sans text-couture-cream hover:text-couture-gold transition-colors p-2"
            data-cursor="TOP"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center: Oversized Editorial Signature Banner */}
        <div className="py-8 border-t border-b border-white/5 text-center overflow-hidden">
          <h2 className="font-display text-4xl sm:text-7xl lg:text-9xl tracking-[0.2em] sm:tracking-[0.25em] text-stroke uppercase font-light select-none transition-all duration-700">
            KHADIJA FARHAT
          </h2>
        </div>

        {/* Bottom Tier: Copyright & Disclaimers */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono tracking-widest text-couture-muted/70 gap-4 text-center sm:text-left">
          <span>© 2026 KHADIJA FARHAT. ALL RIGHTS RESERVED.</span>
          <span>HAUTE COUTURE • EDITORIAL • MOTION REELS</span>
        </div>
      </div>
    </footer>
  );
}
