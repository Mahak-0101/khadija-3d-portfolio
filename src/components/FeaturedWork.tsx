"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { FEATURED_CAMPAIGNS, MediaItem } from "@/data/portfolioData";
import { ArrowUpRight, Play } from "lucide-react";

interface FeaturedWorkProps {
  onSelectMedia?: (media: MediaItem) => void;
}

export default function FeaturedWork({ onSelectMedia }: FeaturedWorkProps) {
  return (
    <section id="work" className="relative w-full py-28 sm:py-36 bg-couture-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-20 sm:mb-28 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center space-x-4 mb-3">
              <span className="font-mono text-xs text-couture-gold tracking-widest">
                03 / EDITORIAL
              </span>
              <div className="h-[1px] w-12 bg-couture-gold/40" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-couture-muted font-sans">
                SELECTED CAMPAIGNS
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl text-couture-cream tracking-wide uppercase font-light">
              CURATED <span className="text-couture-gold">SERIES</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-couture-muted max-w-sm mt-4 sm:mt-0 font-sans tracking-wider leading-relaxed">
            Signature editorial appearances, bridal couture masterpieces, and dynamic cinematic motion studies.
          </p>
        </div>

        {/* Campaigns List (Asymmetrical Editorial Layouts) */}
        <div className="space-y-36 sm:space-y-48">
          {FEATURED_CAMPAIGNS.map((campaign, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={campaign.id}
                className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
              >
                {/* Visual Media Column */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  } relative group`}
                >
                  <div
                    onClick={() => onSelectMedia && onSelectMedia(campaign.media)}
                    className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-sm border border-white/10 bg-couture-900 shadow-2xl cursor-pointer"
                    data-cursor="VIEW"
                  >
                    {campaign.media.type === "video" ? (
                      <div className="relative w-full h-full">
                        <video
                          src={campaign.media.src}
                          poster={campaign.media.poster}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-4 right-4 bg-couture-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center space-x-1.5 text-[10px] tracking-widest text-couture-champagne font-mono">
                          <Play className="w-2.5 h-2.5 fill-current" />
                          <span>MOTION</span>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={campaign.media.src}
                        alt={campaign.media.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover object-top filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-couture-950/70 via-transparent to-transparent pointer-events-none" />

                    {/* Bottom overlay title */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs tracking-[0.2em] font-sans text-couture-cream uppercase">
                      <span>{campaign.media.title}</span>
                      <span className="text-couture-gold flex items-center space-x-1">
                        <span>EXPLORE</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Secondary Inset Visual (Editorial layered depth) */}
                  {campaign.secondaryMedia && (
                    <div
                      onClick={() => onSelectMedia && onSelectMedia(campaign.secondaryMedia!)}
                      className={`absolute -bottom-8 ${
                        isEven ? "-right-4 sm:-right-8" : "-left-4 sm:-left-8"
                      } w-36 sm:w-52 aspect-[3/4] rounded-sm overflow-hidden border border-couture-gold/30 shadow-2xl hidden sm:block bg-couture-950 group/secondary cursor-pointer`}
                      data-cursor="INSET"
                    >
                      <Image
                        src={
                          campaign.secondaryMedia.type === "video"
                            ? campaign.secondaryMedia.poster || campaign.secondaryMedia.src
                            : campaign.secondaryMedia.src
                        }
                        alt={campaign.secondaryMedia.title}
                        fill
                        sizes="200px"
                        className="object-cover object-top group-hover/secondary:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover/secondary:bg-transparent transition-colors" />
                    </div>
                  )}
                </div>

                {/* Typography / Information Column */}
                <div
                  className={`lg:col-span-5 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  } flex flex-col space-y-6`}
                >
                  <div className="flex items-center space-x-3 text-couture-gold font-mono text-sm tracking-widest">
                    <span>{campaign.number}</span>
                    <span className="w-8 h-[1px] bg-couture-gold/50" />
                    <span className="text-xs uppercase font-sans tracking-[0.25em] text-couture-champagne">
                      {campaign.category}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-5xl text-couture-cream tracking-wide uppercase font-light leading-tight">
                    {campaign.title}
                  </h3>

                  <p className="text-xs tracking-[0.3em] uppercase text-couture-gold font-sans font-medium">
                    {campaign.subtitle}
                  </p>

                  <p className="text-sm sm:text-base text-couture-muted font-sans font-light leading-relaxed">
                    {campaign.description}
                  </p>

                  {/* Palette Swatches */}
                  <div className="pt-2 flex items-center space-x-2">
                    <span className="text-[10px] tracking-widest text-couture-muted uppercase font-sans mr-2">
                      PALETTE:
                    </span>
                    {campaign.palette.map((color, cIdx) => (
                      <div
                        key={cIdx}
                        className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>

                  {/* Action trigger button */}
                  <div className="pt-4">
                    <button
                      onClick={() => onSelectMedia && onSelectMedia(campaign.media)}
                      className="inline-flex items-center space-x-3 text-xs tracking-[0.3em] uppercase text-couture-cream hover:text-couture-gold transition-colors font-medium border-b border-couture-gold/40 pb-1 group"
                      data-cursor="EXPAND"
                    >
                      <span>VIEW FULL EDITORIAL</span>
                      <ArrowUpRight className="w-4 h-4 text-couture-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
