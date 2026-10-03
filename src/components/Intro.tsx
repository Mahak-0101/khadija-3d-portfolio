"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function Intro() {
  return (
    <section
      id="intro"
      className="relative w-full py-28 sm:py-36 px-6 sm:px-12 bg-couture-950 border-t border-b border-white/5 overflow-hidden"
    >
      {/* Background Subtle Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 bg-couture-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center space-x-4 mb-12 sm:mb-16">
          <span className="font-mono text-xs text-couture-gold tracking-widest">01 / DISCIPLINE</span>
          <div className="h-[1px] w-12 bg-couture-gold/40" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-couture-muted font-sans">
            EDITORIAL STATEMENT
          </span>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Big Typographic Statement */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-couture-cream font-light tracking-wide leading-[1.15]">
              An evolving visual identity shaped through{" "}
              <span className="text-couture-gold italic font-serif">fashion</span>,{" "}
              <span className="text-couture-champagne">movement</span>, and architectural{" "}
              <span className="italic font-serif">expression</span>.
            </h2>

            <p className="text-sm sm:text-base text-couture-muted font-sans font-light leading-relaxed max-w-xl">
              Specializing in high-fashion bridal couture, ceremonial attire, and dynamic video
              reels. Defined by statuesque composure, nuanced grace, and a natural affinity for
              camera choreography.
            </p>

            {/* Core Competencies Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/5">
              {[
                { title: "HAUTE COUTURE", sub: "Silk & Drapes" },
                { title: "BRIDAL EDITORIAL", sub: "Zardozi & Velvet" },
                { title: "MOTION & FILM", sub: "Cinematic Reels" },
                { title: "RUNWAY & POISE", sub: "Form & Stance" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col space-y-1">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-couture-champagne font-semibold font-sans">
                    {item.title}
                  </span>
                  <span className="text-xs text-couture-muted font-serif italic">
                    {item.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Editorial Visual Teaser */}
          <div className="lg:col-span-5 relative group" data-cursor="VIEW">
            <div className="relative w-full aspect-[3/4] max-w-md mx-auto overflow-hidden rounded-sm border border-white/10 bg-couture-900 shadow-2xl">
              <Image
                src="/images/khadija/khadija-bridal-red-veil.jpg"
                alt="Khadija Farhat Editorial Portrait"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-couture-950/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] font-sans tracking-[0.25em] text-couture-champagne uppercase">
                <span>SCARLET VEIL STUDY</span>
                <span className="text-couture-gold">ARCHIVE 01</span>
              </div>
            </div>

            {/* Floating Decorative Label */}
            <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-couture-950/90 border border-couture-gold/30 px-4 py-2 backdrop-blur-md rounded shadow-xl hidden sm:flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-couture-gold" />
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-couture-cream">
                AUTHENTIC PORTFOLIO
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
