"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PORTFOLIO_MEDIA, MediaItem } from "@/data/portfolioData";
import { Play, Sparkles } from "lucide-react";

interface GalleryProps {
  onSelectMedia: (item: MediaItem) => void;
}

type FilterCategory = "ALL" | "Bridal" | "Couture" | "Beauty" | "Motion" | "BTS";

export default function Gallery({ onSelectMedia }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("ALL");

  const filteredItems =
    activeFilter === "ALL"
      ? PORTFOLIO_MEDIA
      : PORTFOLIO_MEDIA.filter((item) => item.category === activeFilter);

  const categories: { label: string; value: FilterCategory }[] = [
    { label: "ALL WORKS", value: "ALL" },
    { label: "BRIDAL COUTURE", value: "Bridal" },
    { label: "HAUTE COUTURE", value: "Couture" },
    { label: "BEAUTY & ADORNMENT", value: "Beauty" },
    { label: "CINEMATIC MOTION", value: "Motion" },
    { label: "STUDIO & BTS", value: "BTS" },
  ];

  return (
    <section id="gallery" className="relative w-full py-28 sm:py-36 bg-couture-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8 gap-6">
          <div>
            <div className="flex items-center space-x-4 mb-3">
              <span className="font-mono text-xs text-couture-gold tracking-widest">
                05 / COLLECTION
              </span>
              <div className="h-[1px] w-12 bg-couture-gold/40" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-couture-muted font-sans">
                EDITORIAL ARCHIVE
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl text-couture-cream tracking-wide uppercase font-light">
              VISUAL <span className="text-couture-gold">INDEX</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`px-4 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-sans font-medium transition-all ${
                  activeFilter === cat.value
                    ? "bg-couture-gold text-couture-950 font-semibold shadow-lg"
                    : "border border-white/10 text-couture-muted hover:border-white/30 hover:text-couture-cream bg-couture-900/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Editorial Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {filteredItems.map((item, idx) => {
            // Apply varied editorial spans and heights
            const isTall = idx % 5 === 0 || idx % 7 === 0;
            const isWide = item.orientation === "landscape";

            return (
              <div
                key={item.id}
                onClick={() => onSelectMedia(item)}
                className={`relative group overflow-hidden rounded-sm border border-white/10 bg-couture-900/60 shadow-xl cursor-pointer ${
                  isWide ? "sm:col-span-2 lg:col-span-2 aspect-[16/10]" : isTall ? "aspect-[3/5]" : "aspect-[3/4]"
                }`}
                data-cursor="VIEW"
              >
                {/* Media Image / Poster */}
                <Image
                  src={item.type === "video" ? item.poster || item.src : item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top filter grayscale-[20%] contrast-[1.06] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Video Indicator */}
                {item.type === "video" && (
                  <div className="absolute top-4 right-4 bg-couture-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-couture-gold/40 flex items-center space-x-1.5 text-[9px] tracking-widest text-couture-gold font-mono">
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>FILM</span>
                  </div>
                )}

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-couture-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Bottom Reveal Captions */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center space-x-2 text-[9px] tracking-[0.3em] font-mono text-couture-gold uppercase">
                    <span>{item.categoryLabel}</span>
                    <span>•</span>
                    <span>ARCHIVE {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl text-couture-cream tracking-wide uppercase font-medium">
                    {item.title}
                  </h3>

                  {item.tagline && (
                    <p className="text-xs text-couture-muted font-sans font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1">
                      {item.tagline}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Editorial Callout */}
        <div className="mt-20 p-8 rounded border border-white/10 bg-couture-900/30 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-5 h-5 text-couture-gold" />
            <span className="text-xs tracking-[0.25em] uppercase text-couture-cream font-sans">
              ALL PHOTOGRAPHS AND MOTION CLIPS FEATURE KHADIJA FARHAT
            </span>
          </div>
          <span className="text-xs text-couture-muted font-mono tracking-widest">
            AUTHENTIC MEDIA ONLY — NO AI GENERATED FACES
          </span>
        </div>
      </div>
    </section>
  );
}
