"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Play, Maximize } from "lucide-react";
import { MediaItem } from "@/data/portfolioData";

interface LightboxProps {
  items: MediaItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation & Esc to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handlePrev, handleNext, onClose]);

  // Touch swipe support
  const touchStartX = React.useRef(0);
  const touchEndX = React.useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
  };

  if (!isOpen || !currentItem) return null;

  return (
    <div
      className="fixed inset-0 z-[100000] bg-couture-950/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 animate-fade-in select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox"
    >
      {/* Top Bar: Title & Close Button */}
      <div className="flex items-center justify-between text-couture-cream z-10">
        <div className="flex items-center space-x-3">
          <span className="font-mono text-xs text-couture-gold tracking-widest">
            {currentIndex + 1 < 10 ? `0${currentIndex + 1}` : currentIndex + 1} /{" "}
            {items.length < 10 ? `0${items.length}` : items.length}
          </span>
          <div className="h-3 w-[1px] bg-white/20" />
          <span className="text-[11px] tracking-[0.25em] uppercase text-couture-muted font-sans">
            {currentItem.categoryLabel}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full border border-white/10 hover:border-couture-gold text-couture-cream hover:text-couture-gold transition-colors focus:outline-none"
          aria-label="Close Lightbox"
          data-cursor="CLOSE"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Center Media Display */}
      <div className="relative flex-1 w-full max-h-[85vh] flex items-center justify-center my-4 overflow-hidden">
        {currentItem.type === "video" ? (
          <div className="relative max-h-full max-w-full aspect-[9/16] rounded overflow-hidden shadow-2xl bg-black">
            <video
              src={currentItem.src}
              poster={currentItem.poster}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="relative max-h-full max-w-full aspect-[3/4] sm:aspect-[4/5] rounded overflow-hidden shadow-2xl flex items-center justify-center">
            <Image
              src={currentItem.src}
              alt={currentItem.title}
              fill
              sizes="90vw"
              priority
              className="object-contain"
            />
          </div>
        )}

        {/* Prev / Next Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-couture-950/70 border border-white/15 text-couture-cream hover:text-couture-gold hover:border-couture-gold transition-all backdrop-blur-md focus:outline-none"
          aria-label="Previous Media"
          data-cursor="PREV"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-couture-950/70 border border-white/15 text-couture-cream hover:text-couture-gold hover:border-couture-gold transition-all backdrop-blur-md focus:outline-none"
          aria-label="Next Media"
          data-cursor="NEXT"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Bar: Title, Tagline & Keyboard Shortcuts hint */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left text-xs text-couture-muted z-10 border-t border-white/10 pt-4">
        <div>
          <h3 className="font-display text-lg sm:text-xl text-couture-cream tracking-wider uppercase">
            {currentItem.title}
          </h3>
          {currentItem.tagline && (
            <p className="text-xs text-couture-champagne/80 font-serif italic mt-0.5">
              {currentItem.tagline}
            </p>
          )}
        </div>

        <div className="hidden sm:flex items-center space-x-3 text-[10px] tracking-widest font-mono text-couture-muted mt-2 sm:mt-0">
          <span>[← PREV]</span>
          <span>[→ NEXT]</span>
          <span>[ESC TO CLOSE]</span>
        </div>
      </div>
    </div>
  );
}
