"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouch, setIsTouch] = useState<boolean>(true);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrame = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch capability
    const touchCheck =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (touchCheck) {
      setIsTouch(true);
      return;
    }

    setIsTouch(false);
    document.body.classList.add("custom-cursor-enabled");

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering over an element with data-cursor or interactive elements
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorEl = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorEl) {
        setCursorText(cursorEl.dataset.cursor || "");
        setIsHovered(true);
      } else if (target.closest("button, a, input, [role='button']")) {
        setCursorText("");
        setIsHovered(true);
      } else {
        setCursorText("");
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Smooth RAF lerping for the trailing ring
    const render = () => {
      // Lerp ring
      const factor = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * factor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * factor;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrame.current = requestAnimationFrame(render);
    };

    animFrame.current = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [isVisible]);

  if (isTouch) return null;

  return (
    <div
      className={`hidden lg:block pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Precision inner dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full bg-couture-gold transition-all duration-150 ${
          isHovered ? "w-1.5 h-1.5 opacity-60" : "w-2 h-2 opacity-90"
        }`}
        style={{ willChange: "transform" }}
      />

      {/* Trailing editorial ring / indicator */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-couture-gold/40 flex items-center justify-center transition-all duration-200 backdrop-blur-[1px] ${
          cursorText
            ? "w-20 h-20 bg-couture-950/85 border-couture-gold scale-100 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            : isHovered
            ? "w-12 h-12 bg-couture-gold/10 border-couture-gold scale-100"
            : "w-8 h-8 scale-90 border-couture-cream/20"
        }`}
        style={{ willChange: "transform" }}
      >
        {cursorText && (
          <span className="text-[9px] tracking-widest font-sans font-semibold uppercase text-couture-gold px-1 select-none animate-fade-in text-center leading-tight">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
