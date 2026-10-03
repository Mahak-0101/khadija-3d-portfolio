"use client";

import React from "react";
import Image from "next/image";
import { MODEL_PROFILE } from "@/data/portfolioData";
import { Compass, Sparkles, Feather } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative w-full py-28 sm:py-36 bg-couture-950 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute right-0 top-1/3 w-[500px] h-[500px] bg-couture-gold/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-16 border-b border-white/10 pb-6">
          <span className="font-mono text-xs text-couture-gold tracking-widest">
            06 / PROFILE
          </span>
          <div className="h-[1px] w-12 bg-couture-gold/40" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-couture-muted font-sans">
            EDITORIAL BIOGRAPHY
          </span>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Portrait Image Column */}
          <div className="lg:col-span-5 relative group" data-cursor="PORTRAIT">
            <div className="relative w-full aspect-[3/4] rounded-sm overflow-hidden border border-white/10 bg-couture-900 shadow-2xl">
              <Image
                src="/images/khadija/khadija-emerald-dupatta-portrait.jpg"
                alt="Khadija Farhat Editorial Portrait"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-top filter contrast-[1.08] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-couture-950/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Editorial Floating Frame Card */}
            <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-couture-900/90 border border-couture-gold/30 p-5 rounded shadow-2xl backdrop-blur-md max-w-xs">
              <span className="text-[10px] tracking-[0.25em] font-mono text-couture-gold uppercase block mb-1">
                AESTHETIC ESSENCE
              </span>
              <p className="text-xs text-couture-cream font-serif italic leading-relaxed">
                Poise, architectural drapery, and evocative motion expression.
              </p>
            </div>
          </div>

          {/* Typography & Bio Column */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div>
              <span className="text-xs font-mono tracking-widest text-couture-gold uppercase block mb-2">
                ABOUT
              </span>
              <h2 className="font-display text-4xl sm:text-6xl text-couture-cream uppercase font-light tracking-wide leading-tight">
                KHADIJA <span className="text-couture-gold">FARHAT</span>
              </h2>
              <p className="text-sm font-sans tracking-[0.3em] uppercase text-couture-champagne mt-2">
                {MODEL_PROFILE.title}
              </p>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-couture-muted font-sans font-light leading-relaxed">
              <p>
                Khadija Farhat is a fashion and editorial model recognized for her commanding
                presence across haute couture drapes, intricate bridal ensembles, and dynamic
                motion cinematography.
              </p>
              <p>
                With a visual signature rooted in traditional grandeur and contemporary editorial
                restraint, she translates complex textile architecture—from deep velvet bullion
                embroidery to gossamer crimson silks—into striking, evocative compositions.
              </p>
              <p>
                Her collaborative approach across runway, studio lookbooks, and cinematic motion
                reels emphasizes authenticity, sculptural silhouettes, and seamless camera poise.
              </p>
            </div>

            {/* Key Editorial Capabilities */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Compass className="w-5 h-5 text-couture-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-sans tracking-[0.2em] uppercase text-couture-cream font-semibold">
                    HAUTE COUTURE DRAPERY
                  </h4>
                  <p className="text-xs text-couture-muted font-sans font-light mt-1">
                    Fluid understanding of sarees, lehengas, and structural ceremonial drapes.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Feather className="w-5 h-5 text-couture-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-sans tracking-[0.2em] uppercase text-couture-cream font-semibold">
                    MOTION CHOREOGRAPHY
                  </h4>
                  <p className="text-xs text-couture-muted font-sans font-light mt-1">
                    Precise posture modulation tailored for cinematic high-definition motion reels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
