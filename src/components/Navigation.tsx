"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  useEffect(() => {
    const handleAudioState = (e: Event) => {
      const customEvent = e as CustomEvent<{ isPlaying: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.isPlaying === "boolean") {
        setIsAudioPlaying(customEvent.detail.isPlaying);
      }
    };

    window.addEventListener("ambient-audio-state-changed", handleAudioState);
    return () => window.removeEventListener("ambient-audio-state-changed", handleAudioState);
  }, []);

  const toggleGlobalAudio = () => {
    window.dispatchEvent(new CustomEvent("toggle-ambient-audio"));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const navLinks = [
    { label: "WORK", href: "#work" },
    { label: "3D EXPERIENCE", href: "#experience" },
    { label: "MOTION", href: "#motion" },
    { label: "GALLERY", href: "#gallery" },
    { label: "ABOUT", href: "#about" },
    { label: "CONTACT", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-couture-950/80 backdrop-blur-md border-b border-white/5 shadow-2xl"
            : "py-6 sm:py-8 bg-gradient-to-b from-black/70 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#"
            className="group flex items-center space-x-2.5 text-left focus:outline-none"
            data-cursor="TOP"
          >
            <span className="w-2 h-2 rounded-full bg-couture-gold transition-transform duration-300 group-hover:scale-150" />
            <span className="font-display text-base sm:text-lg tracking-[0.25em] text-couture-cream uppercase font-medium group-hover:text-couture-gold transition-colors">
              KHADIJA FARHAT
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                data-cursor="LINK"
                className="relative text-[11px] tracking-[0.25em] uppercase text-couture-cream/80 hover:text-couture-gold transition-colors font-medium py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-couture-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* Global Ambient Audio Toggle */}
            <button
              onClick={toggleGlobalAudio}
              data-cursor="SOUND"
              aria-label={isAudioPlaying ? "Mute Soundtrack" : "Play Ambient Soundtrack"}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-couture-gold/40 text-[10px] tracking-[0.2em] font-mono text-couture-cream hover:text-couture-gold transition-all duration-300 focus:outline-none"
            >
              <div className="flex items-end space-x-[2px] h-3 w-3">
                <span className={`w-[1.5px] bg-couture-gold rounded-full transition-all ${isAudioPlaying ? "animate-bar-1" : "h-1 opacity-50"}`} />
                <span className={`w-[1.5px] bg-couture-gold rounded-full transition-all ${isAudioPlaying ? "animate-bar-2" : "h-1 opacity-50"}`} />
                <span className={`w-[1.5px] bg-couture-gold rounded-full transition-all ${isAudioPlaying ? "animate-bar-3" : "h-1 opacity-50"}`} />
              </div>
              <span>{isAudioPlaying ? "SOUND ON" : "SOUND OFF"}</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              data-cursor="BOOK"
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 border border-couture-gold/40 rounded-full text-[10px] tracking-[0.25em] uppercase text-couture-gold hover:bg-couture-gold hover:text-couture-950 transition-all duration-300 font-medium"
            >
              <span>BOOKING</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={toggleGlobalAudio}
              className="p-2 text-couture-cream hover:text-couture-gold transition-colors focus:outline-none"
              aria-label="Toggle Soundtrack"
            >
              <div className="flex items-end space-x-[2px] h-3.5 w-3.5">
                <span className={`w-[1.5px] bg-couture-gold rounded-full transition-all ${isAudioPlaying ? "animate-bar-1" : "h-1 opacity-50"}`} />
                <span className={`w-[1.5px] bg-couture-gold rounded-full transition-all ${isAudioPlaying ? "animate-bar-2" : "h-1 opacity-50"}`} />
                <span className={`w-[1.5px] bg-couture-gold rounded-full transition-all ${isAudioPlaying ? "animate-bar-3" : "h-1 opacity-50"}`} />
              </div>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-couture-cream hover:text-couture-gold transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
              data-cursor="MENU"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-couture-950/98 backdrop-blur-xl md:hidden transition-all duration-500 flex flex-col justify-between p-8 sm:p-12 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-lg tracking-[0.2em] text-couture-cream">
            KHADIJA FARHAT
          </span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-couture-cream hover:text-couture-gold transition-colors"
            aria-label="Close Navigation"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        <nav className="flex flex-col space-y-6 my-auto">
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="group flex items-baseline space-x-4 text-left"
            >
              <span className="text-xs font-mono text-couture-gold/60">0{idx + 1}</span>
              <span className="font-display text-3xl sm:text-4xl tracking-[0.15em] uppercase text-couture-cream group-hover:text-couture-gold transition-colors">
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="border-t border-white/10 pt-6 flex flex-col space-y-3">
          <button
            onClick={toggleGlobalAudio}
            className="flex items-center justify-between px-4 py-2.5 rounded-full border border-white/15 bg-white/5 text-xs font-mono tracking-widest text-couture-cream"
          >
            <span>AMBIENT SOUNDTRACK</span>
            <span className="text-couture-gold font-bold">{isAudioPlaying ? "ON" : "OFF"}</span>
          </button>
          <span className="text-[10px] tracking-[0.3em] uppercase text-couture-muted">
            EDITORIAL & FASHION MODEL
          </span>
          <span className="text-xs text-couture-champagne tracking-wider">
            Available Worldwide for Editorial, Runway & Campaigns
          </span>
        </div>
      </div>
    </>
  );
}
