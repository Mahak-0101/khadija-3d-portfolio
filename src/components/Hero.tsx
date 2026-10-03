"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [videoError, setVideoError] = useState<boolean>(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Subtle mouse parallax tilt on desktop
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);


  const handleScrollDown = () => {
    const nextSection = document.getElementById("intro") || document.getElementById("work");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-couture-950 select-none"
      data-cursor="EXPLORE"
    >
      {/* Background Cinematic Media */}
      <div
        className="absolute inset-0 w-full h-full transform transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `scale(1.04) translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0)`,
        }}
      >
        {!videoError ? (
          <video
            ref={videoRef}
            src="/videos/khadija/khadija-motion-champagne.mp4"
            poster="/videos/khadija/khadija-motion-champagne-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover object-center brightness-[0.78] contrast-[1.08] filter"
          />
        ) : (
          <Image
            src="/images/khadija/khadija-red-saree-runway.jpg"
            alt="Khadija Farhat — Model Hero"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top brightness-[0.75] contrast-[1.1]"
          />
        )}

        {/* Cinematic Vignettes & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-couture-950 via-couture-950/40 to-couture-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-couture-950/60 via-transparent to-couture-950/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-couture-950/30 to-couture-950/80" />
      </div>

      {/* Main Center Editorial Composition */}
      <div
        className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center pointer-events-none"
        style={{
          transform: `translate3d(${-mouseOffset.x * 0.6}px, ${-mouseOffset.y * 0.6}px, 0)`,
        }}
      >
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full border border-couture-gold/30 bg-couture-950/60 backdrop-blur-md mb-6 sm:mb-8 animate-fade-in pointer-events-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-couture-gold animate-ping" />
          <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.35em] uppercase text-couture-champagne font-medium">
            OFFICIAL PORTFOLIO 2026
          </span>
        </div>

        {/* Oversized Cinematic Typography */}
        <h1 className="font-display font-light text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.16em] sm:tracking-[0.2em] text-couture-cream leading-[0.95] uppercase drop-shadow-2xl">
          <span className="block transition-transform duration-700 hover:scale-[1.02]">
            KHADIJA
          </span>
          <span className="block text-couture-gold transition-transform duration-700 hover:scale-[1.02] mt-1 sm:mt-2">
            FARHAT
          </span>
        </h1>

        {/* Editorial Sub-disciplines */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 mt-6 sm:mt-8 text-xs sm:text-sm tracking-[0.35em] uppercase font-sans text-couture-champagne/90">
          <span>MODEL</span>
          <span className="text-couture-gold/60">•</span>
          <span>HAUTE COUTURE</span>
          <span className="text-couture-gold/60">•</span>
          <span>EDITORIAL</span>
          <span className="text-couture-gold/60">•</span>
          <span>MOTION</span>
        </div>

        {/* Minimalist Statement Quote */}
        <p className="max-w-xl mx-auto mt-6 text-xs sm:text-sm text-couture-muted font-serif italic tracking-wider leading-relaxed hidden sm:block">
          &ldquo;An evolving visual presence shaped through movement, architectural silhouetting, and contemporary couture expression.&rdquo;
        </p>
      </div>

      {/* Bottom Controls & Scroll Down Indicator */}
      <div className="absolute bottom-8 sm:bottom-12 left-0 right-0 z-20 px-6 sm:px-12 flex items-end justify-between pointer-events-auto">
        {/* Invisible Spacer to keep center Explore button balanced */}
        <div className="hidden sm:block w-36" aria-hidden="true" />


        {/* Center Scroll Indicator */}
        <button
          onClick={handleScrollDown}
          className="group mx-auto flex flex-col items-center space-y-2 text-center text-couture-muted hover:text-couture-gold transition-colors focus:outline-none"
          data-cursor="SCROLL"
        >
          <span className="text-[10px] tracking-[0.4em] font-sans uppercase">
            EXPLORE
          </span>
          <div className="w-5 h-8 rounded-full border border-couture-muted/40 group-hover:border-couture-gold flex items-start justify-center p-1 transition-colors">
            <div className="w-1 h-2 rounded-full bg-couture-gold animate-bounce" />
          </div>
        </button>

        {/* Right Corner Coordinates / Year */}
        <div className="hidden sm:flex flex-col items-end text-right text-[10px] tracking-[0.25em] font-mono text-couture-muted/80">
          <span>PORTFOLIO EDIT</span>
          <span className="text-couture-champagne">2026 ARCHIVE</span>
        </div>
      </div>
    </section>
  );
}
