"use client";

import React, { useEffect, useState, useRef } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"first" | "last" | "reveal" | "done">("first");
  const [count, setCount] = useState<number>(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 30);

    const timer1 = setTimeout(() => {
      setPhase("last");
    }, 600);

    const timer2 = setTimeout(() => {
      setPhase("reveal");
    }, 1200);

    const timer3 = setTimeout(() => {
      setPhase("done");
      if (onCompleteRef.current) onCompleteRef.current();
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      onClick={() => {
        setPhase("done");
        if (onCompleteRef.current) onCompleteRef.current();
      }}
      data-cursor="SKIP"
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-couture-950 transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] select-none ${
        phase === "reveal"
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100 cursor-pointer pointer-events-auto"
      }`}
    >
      {/* Background radial glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-couture-gold/5 blur-[120px] pointer-events-none" />

      {/* Main typographic transition */}
      <div className="relative flex flex-col items-center justify-center text-center px-6">
        <span className="text-[10px] tracking-[0.4em] uppercase text-couture-muted mb-4 font-sans font-medium">
          PORTFOLIO ARCHIVE / 2026
        </span>

        <div className="h-20 sm:h-28 flex items-center justify-center overflow-hidden">
          {phase === "first" ? (
            <h1 className="font-display text-4xl sm:text-7xl lg:text-8xl tracking-[0.25em] text-couture-cream font-light animate-fade-in flex space-x-2 sm:space-x-4">
              {"KHADIJA".split("").map((letter, idx) => (
                <span
                  key={idx}
                  className="inline-block transition-transform duration-500"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  {letter}
                </span>
              ))}
            </h1>
          ) : (
            <h1 className="font-display text-4xl sm:text-7xl lg:text-8xl tracking-[0.25em] text-couture-gold font-light animate-fade-in flex space-x-2 sm:space-x-4">
              {"FARHAT".split("").map((letter, idx) => (
                <span
                  key={idx}
                  className="inline-block transition-transform duration-500"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {letter}
                </span>
              ))}
            </h1>
          )}
        </div>

        <div className="flex items-center space-x-3 mt-4 text-[10px] tracking-[0.35em] uppercase text-couture-champagne/80 font-sans">
          <span>MODEL</span>
          <span>•</span>
          <span>EDITORIAL</span>
          <span>•</span>
          <span>MOTION</span>
        </div>
      </div>

      {/* Minimal progress tracker at bottom */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 sm:w-64 flex flex-col items-center">
        <div className="w-full h-[1px] bg-white/10 overflow-hidden relative mb-3">
          <div
            className="h-full bg-couture-gold transition-all duration-150 ease-out"
            style={{ width: `${count}%` }}
          />
        </div>
        <div className="w-full flex justify-between text-[9px] font-sans tracking-widest text-couture-muted">
          <span>INITIALIZING</span>
          <span className="text-couture-cream tabular-nums">{count}%</span>
        </div>
      </div>
    </div>
  );
}
