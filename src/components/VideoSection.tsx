"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, Film } from "lucide-react";
import Image from "next/image";

interface VideoFilm {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  src: string;
  poster: string;
  durationText: string;
}

const VIDEO_FILMS: VideoFilm[] = [
  {
    id: "film-01",
    title: "CHAMPAGNE LUMINESCENCE",
    subtitle: "Fluid drape & illuminated movement",
    category: "CAMPAIGN MOTION",
    src: "/videos/khadija/khadija-motion-champagne.mp4",
    poster: "/videos/khadija/khadija-motion-champagne-poster.jpg",
    durationText: "00:07",
  },
  {
    id: "film-02",
    title: "GILDED PORTRAITURE",
    subtitle: "High-fashion hair & makeup choreography",
    category: "BEAUTY MOTION",
    src: "/videos/khadija/khadija-motion-beauty-reel.mp4",
    poster: "/videos/khadija/khadija-motion-beauty-reel-poster.jpg",
    durationText: "00:10",
  },
  {
    id: "film-03",
    title: "THE EMERALD SILHOUETTE",
    subtitle: "Regal stance in mirror illumination",
    category: "STUDIO FILM",
    src: "/videos/khadija/khadija-motion-emerald-studio.mp4",
    poster: "/videos/khadija/khadija-motion-emerald-studio-poster.jpg",
    durationText: "00:08",
  },
  {
    id: "film-04",
    title: "COUTURE IN MOTION",
    subtitle: "Runway poise and bridal symmetry",
    category: "MOTION REEL",
    src: "/videos/khadija/khadija-motion-campaign-shoot.mp4",
    poster: "/videos/khadija/khadija-motion-campaign-shoot-poster.jpg",
    durationText: "00:10",
  },
];

export default function VideoSection() {
  const [selectedFilmIndex, setSelectedFilmIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const activeFilm = VIDEO_FILMS[selectedFilmIndex];

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

  const toggleSoundtrack = () => {
    window.dispatchEvent(new CustomEvent("toggle-ambient-audio"));
  };

  // When changing video, play cleanly
  useEffect(() => {
    if (mainVideoRef.current) {
      mainVideoRef.current.load();
      mainVideoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  }, [selectedFilmIndex]);

  const togglePlay = () => {
    if (!mainVideoRef.current) return;
    if (mainVideoRef.current.paused) {
      mainVideoRef.current.play();
      setIsPlaying(true);
    } else {
      mainVideoRef.current.pause();
      setIsPlaying(false);
    }
  };


  const handleTimeUpdate = () => {
    if (mainVideoRef.current && mainVideoRef.current.duration) {
      const p = (mainVideoRef.current.currentTime / mainVideoRef.current.duration) * 100;
      setProgress(p);
    }
  };

  const handleFullscreen = () => {
    if (!mainVideoRef.current) return;
    if (mainVideoRef.current.requestFullscreen) {
      mainVideoRef.current.requestFullscreen();
    }
  };

  return (
    <section id="motion" className="relative w-full py-28 sm:py-36 bg-couture-900 border-t border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center space-x-4 mb-3">
              <span className="font-mono text-xs text-couture-gold tracking-widest">
                04 / MOTION
              </span>
              <div className="h-[1px] w-12 bg-couture-gold/40" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-couture-muted font-sans">
                CINEMATIC REELS
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl text-couture-cream tracking-wide uppercase font-light">
              MOTION <span className="text-couture-gold">STUDIES</span>
            </h2>
          </div>

          <div className="flex items-center space-x-2 text-xs tracking-widest text-couture-muted uppercase font-sans mt-4 sm:mt-0">
            <Film className="w-4 h-4 text-couture-gold" />
            <span>4 CAMPAIGN REELS</span>
          </div>
        </div>

        {/* Cinematic Theater Canvas Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Cinematic Video Player (Center Spotlight) */}
          <div className="lg:col-span-8 relative">
            <div
              className="relative w-full aspect-[9/16] sm:aspect-[4/3] lg:aspect-[16/10] max-h-[680px] rounded-sm overflow-hidden bg-black border border-white/10 shadow-2xl group flex items-center justify-center"
              data-cursor="VIDEO"
            >
              <video
                ref={mainVideoRef}
                src={activeFilm.src}
                poster={activeFilm.poster}
                autoPlay
                loop
                muted
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="w-full h-full object-contain sm:object-cover bg-black cursor-pointer"
              />

              {/* Top Film Metadata Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] tracking-[0.25em] text-couture-champagne font-mono pointer-events-none bg-gradient-to-b from-black/80 to-transparent p-3">
                <span className="text-couture-gold font-semibold uppercase">{activeFilm.category}</span>
                <span>SILENT VISUAL REEL • {activeFilm.durationText}</span>
              </div>

              {/* Big Centered Play/Pause on Hover */}
              <div
                onClick={togglePlay}
                className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 cursor-pointer ${
                  isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                }`}
              >
                <div className="w-16 h-16 rounded-full border border-couture-gold bg-couture-950/80 text-couture-gold flex items-center justify-center shadow-xl backdrop-blur-md hover:scale-110 transition-transform">
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </div>
              </div>

              {/* Bottom Custom Playback Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col space-y-2">
                {/* Scrub line indicator */}
                <div className="w-full h-[2px] bg-white/20 relative overflow-hidden rounded-full">
                  <div
                    className="h-full bg-couture-gold transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-couture-cream">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={togglePlay}
                      className="p-1 hover:text-couture-gold transition-colors focus:outline-none"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={toggleSoundtrack}
                      className="p-1 hover:text-couture-gold transition-colors focus:outline-none flex items-center space-x-1"
                      aria-label={isAudioPlaying ? "Mute Ambient Soundtrack" : "Play Ambient Soundtrack"}
                      data-cursor="SOUND"
                    >
                      {isAudioPlaying ? <Volume2 className="w-4 h-4 text-couture-gold" /> : <VolumeX className="w-4 h-4 text-couture-muted" />}
                    </button>
                    <span className="text-[10px] tracking-widest text-couture-champagne font-sans uppercase">
                      {activeFilm.title}
                    </span>
                  </div>

                  <button
                    onClick={handleFullscreen}
                    className="p-1 hover:text-couture-gold transition-colors focus:outline-none"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Reel Playlist / Selector Sidebar */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <span className="text-xs font-mono tracking-widest uppercase text-couture-gold">
              MOTION PLAYLIST
            </span>

            {VIDEO_FILMS.map((film, idx) => {
              const isActive = idx === selectedFilmIndex;
              return (
                <div
                  key={film.id}
                  onClick={() => setSelectedFilmIndex(idx)}
                  className={`flex items-center space-x-4 p-3 rounded border transition-all cursor-pointer ${
                    isActive
                      ? "bg-couture-800 border-couture-gold/60 shadow-lg"
                      : "bg-couture-950/40 border-white/5 hover:border-white/20 hover:bg-couture-950/80"
                  }`}
                  data-cursor="SELECT"
                >
                  {/* Thumbnail Poster */}
                  <div className="relative w-16 h-20 rounded overflow-hidden flex-shrink-0 border border-white/10">
                    <Image
                      src={film.poster}
                      alt={film.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-couture-gold/20 flex items-center justify-center">
                        <Play className="w-4 h-4 text-couture-gold fill-current" />
                      </div>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-col space-y-1">
                    <span className="text-[9px] tracking-[0.25em] font-mono text-couture-gold uppercase">
                      REEL 0{idx + 1}
                    </span>
                    <h4
                      className={`font-display text-sm tracking-wider uppercase ${
                        isActive ? "text-couture-gold font-medium" : "text-couture-cream"
                      }`}
                    >
                      {film.title}
                    </h4>
                    <span className="text-[11px] text-couture-muted font-sans font-light line-clamp-1">
                      {film.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
