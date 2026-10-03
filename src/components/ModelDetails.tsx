"use client";

import React from "react";

export default function ModelDetails() {
  const specs = [
    { label: "PRIMARY DISCIPLINE", value: "HAUTE COUTURE & BRIDAL" },
    { label: "MOTION CAPABILITY", value: "CINEMATIC REELS & LOOKBOOKS" },
    { label: "STYLING SPECIALIZATION", value: "TRADITIONAL & CONTEMPORARY ZARI" },
    { label: "CAMERA CHOREOGRAPHY", value: "STUDIO & RUNWAY STATUESQUE POISE" },
    { label: "PORTFOLIO ARCHIVE", value: "13 CURATED STILLS / 4 MOTION FILMS" },
    { label: "COLLABORATION STATUS", value: "OPEN FOR EDITORIAL & CAMPAIGN BOOKINGS" },
  ];

  return (
    <section className="relative w-full py-20 bg-couture-900 border-t border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="flex items-center space-x-4 mb-12">
          <span className="font-mono text-xs text-couture-gold tracking-widest">
            07 / SPECIFICATIONS
          </span>
          <div className="h-[1px] w-12 bg-couture-gold/40" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-couture-muted font-sans">
            EDITORIAL CAPABILITIES
          </span>
        </div>

        {/* Editorial Table / Typographic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-12">
          {specs.map((spec, index) => (
            <div
              key={index}
              className="flex flex-col space-y-2 border-b border-white/10 pb-6 group hover:border-couture-gold/50 transition-colors"
            >
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-couture-muted group-hover:text-couture-gold transition-colors">
                {spec.label}
              </span>
              <span className="font-display text-lg sm:text-xl text-couture-cream tracking-wider uppercase font-light">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
