"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(true);

  const TARGET_VOLUME = 0.42;

  // Smooth volume fading to avoid audio pops
  const fadeTo = useCallback((targetVol: number, durationMs: number = 800, onDone?: () => void) => {
    if (!audioRef.current) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const audio = audioRef.current;
    const stepTime = 40;
    const steps = Math.max(1, durationMs / stepTime);
    const stepAmount = (targetVol - audio.volume) / steps;

    fadeIntervalRef.current = setInterval(() => {
      if (!audio) return;
      const nextVol = audio.volume + stepAmount;
      if (
        (stepAmount > 0 && nextVol >= targetVol) ||
        (stepAmount < 0 && nextVol <= targetVol)
      ) {
        audio.volume = Math.max(0, Math.min(1, targetVol));
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        if (onDone) onDone();
      } else {
        audio.volume = Math.max(0, Math.min(1, nextVol));
      }
    }, stepTime);
  }, []);

  const playAudio = useCallback(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    audio.volume = 0;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setShowTooltip(false);
          setHasInteracted(true);
          fadeTo(TARGET_VOLUME, 1200);
          window.dispatchEvent(
            new CustomEvent("ambient-audio-state-changed", { detail: { isPlaying: true } })
          );
        })
        .catch((err) => {
          console.warn("Autoplay blocked or audio interrupted:", err);
          setIsPlaying(false);
        });
    }
  }, [fadeTo, TARGET_VOLUME]);

  const pauseAudio = useCallback(() => {
    if (!audioRef.current) return;
    fadeTo(0, 600, () => {
      audioRef.current?.pause();
      setIsPlaying(false);
      window.dispatchEvent(
        new CustomEvent("ambient-audio-state-changed", { detail: { isPlaying: false } })
      );
    });
  }, [fadeTo]);

  const toggleAudio = useCallback(() => {
    setHasInteracted(true);
    setShowTooltip(false);
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }, [isPlaying, pauseAudio, playAudio]);

  // Global event listener for external triggers (e.g. from Hero or Navigation)
  useEffect(() => {
    const handleGlobalToggle = () => {
      toggleAudio();
    };

    const handleForcePause = () => {
      if (isPlaying) pauseAudio();
    };

    const handleForcePlay = () => {
      if (!isPlaying) playAudio();
    };

    window.addEventListener("toggle-ambient-audio", handleGlobalToggle);
    window.addEventListener("pause-ambient-audio", handleForcePause);
    window.addEventListener("resume-ambient-audio", handleForcePlay);

    return () => {
      window.removeEventListener("toggle-ambient-audio", handleGlobalToggle);
      window.removeEventListener("pause-ambient-audio", handleForcePause);
      window.removeEventListener("resume-ambient-audio", handleForcePlay);
    };
  }, [toggleAudio, isPlaying, pauseAudio, playAudio]);

  // Auto-pause when user leaves tab, resume when returning (if it was playing)
  const wasPlayingBeforeBlur = useRef(false);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (isPlaying) {
          wasPlayingBeforeBlur.current = true;
          pauseAudio();
        }
      } else {
        if (wasPlayingBeforeBlur.current) {
          wasPlayingBeforeBlur.current = false;
          playAudio();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isPlaying, pauseAudio, playAudio]);

  // Auto-hide the initial prompt tooltip after 9 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Hidden Loopable Background Audio */}
      <audio
        ref={audioRef}
        src="/audio/aesthetic-ambient.mp3"
        loop
        preload="auto"
        className="hidden"
      />

      {/* Floating Aesthetic Sound Widget */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center space-x-3 select-none">
        <button
          onClick={toggleAudio}
          data-cursor="SOUND"
          aria-label={isPlaying ? "Mute Ambient Soundtrack" : "Play Ambient Soundtrack"}
          className={`group relative flex items-center space-x-3 px-3.5 py-2 rounded-full border backdrop-blur-xl transition-all duration-500 shadow-2xl focus:outline-none ${
            isPlaying
              ? "bg-couture-950/90 border-couture-gold/50 shadow-couture-gold/10"
              : "bg-couture-950/70 border-white/10 hover:border-couture-gold/40"
          }`}
        >
          {/* Animated luxury equalizer bars */}
          <div className="flex items-end space-x-[2.5px] h-4 w-4 justify-center">
            <span
              className={`w-[2px] bg-couture-gold rounded-full transition-all duration-300 ${
                isPlaying ? "animate-bar-1" : "h-1 opacity-40"
              }`}
            />
            <span
              className={`w-[2px] bg-couture-gold rounded-full transition-all duration-300 ${
                isPlaying ? "animate-bar-2" : "h-1 opacity-40"
              }`}
            />
            <span
              className={`w-[2px] bg-couture-gold rounded-full transition-all duration-300 ${
                isPlaying ? "animate-bar-3" : "h-1 opacity-40"
              }`}
            />
            <span
              className={`w-[2px] bg-couture-gold rounded-full transition-all duration-300 ${
                isPlaying ? "animate-bar-4" : "h-1 opacity-40"
              }`}
            />
          </div>

          {/* Sound State & Track details */}
          <div className="flex flex-col text-left">
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-couture-cream">
                SOUND
              </span>
              <span
                className={`text-[9px] font-mono tracking-wider font-semibold ${
                  isPlaying ? "text-couture-gold" : "text-couture-muted"
                }`}
              >
                {isPlaying ? "ON" : "OFF"}
              </span>
            </div>
            <span className="text-[9px] text-couture-muted/80 tracking-wider truncate max-w-[120px] font-serif italic hidden sm:block">
              Satie • Gymnopédie
            </span>
          </div>

          {/* Golden glow halo on play */}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full bg-couture-gold/10 blur-sm pointer-events-none animate-pulse-subtle" />
          )}
        </button>

        {/* Initial First-Visit Invitation Pill */}
        {showTooltip && !hasInteracted && (
          <div
            onClick={toggleAudio}
            data-cursor="PLAY"
            className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-couture-900/90 border border-couture-gold/30 backdrop-blur-md text-[10px] tracking-[0.2em] font-sans uppercase text-couture-champagne cursor-pointer animate-fade-in hover:border-couture-gold transition-colors"
          >
            <Music className="w-3 h-3 text-couture-gold" />
            <span>PLAY AMBIENCE</span>
          </div>
        )}
      </div>
    </>
  );
}
