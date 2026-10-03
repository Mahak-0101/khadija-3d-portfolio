"use client";

import React, { useState } from "react";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import ModelExperience from "@/components/ModelExperience";
import FeaturedWork from "@/components/FeaturedWork";
import VideoSection from "@/components/VideoSection";
import Gallery from "@/components/Gallery";
import ModelDetails from "@/components/ModelDetails";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import AmbientAudio from "@/components/AmbientAudio";
import { PORTFOLIO_MEDIA, MediaItem } from "@/data/portfolioData";

export default function Home() {
  const [preloaderFinished, setPreloaderFinished] = useState<boolean>(false);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  const handleSelectMedia = (item: MediaItem) => {
    const idx = PORTFOLIO_MEDIA.findIndex((m) => m.id === item.id);
    if (idx !== -1) {
      setLightboxIndex(idx);
    } else {
      setLightboxIndex(0);
    }
    setLightboxOpen(true);
  };

  const handlePreloaderComplete = React.useCallback(() => {
    setPreloaderFinished(true);
  }, []);

  return (
    <>
      {/* Editorial Preloader */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Interactive Magnetic Cursor (Desktop only) */}
      <CustomCursor />

      {/* Aesthetic Ambient Soundtrack System */}
      <AmbientAudio />

      {/* Smooth Scroll Container */}
      <SmoothScroll>
        <Navigation />

        <main className="relative min-h-screen bg-couture-950 text-couture-cream overflow-hidden">
          {/* Hero Section */}
          <Hero />

          {/* Intro & Editorial Statement */}
          <Intro />

          {/* 3D WebGL Spatial Experience */}
          <ModelExperience />

          {/* Featured Campaigns */}
          <FeaturedWork onSelectMedia={handleSelectMedia} />

          {/* Dedicated Motion Video Section */}
          <VideoSection />

          {/* Full Visual Gallery */}
          <Gallery onSelectMedia={handleSelectMedia} />

          {/* Editorial Specifications & Capabilities */}
          <ModelDetails />

          {/* About Biography */}
          <About />

          {/* Booking & Contact Section */}
          <Contact />

          {/* Minimalist Luxury Footer */}
          <Footer />
        </main>
      </SmoothScroll>

      {/* Full-Screen Interactive Lightbox */}
      <Lightbox
        items={PORTFOLIO_MEDIA}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </>
  );
}
