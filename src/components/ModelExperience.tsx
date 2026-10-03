"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { Layers, RotateCcw, ChevronLeft, ChevronRight, Eye } from "lucide-react";

interface TextureItem {
  id: string;
  title: string;
  category: string;
  src: string;
}

const CAROUSEL_ITEMS: TextureItem[] = [
  {
    id: "red-saree",
    title: "Crimson Zari Saree",
    category: "Haute Couture",
    src: "/images/khadija/khadija-red-saree-runway.jpg",
  },
  {
    id: "maroon-velvet",
    title: "Imperial Velvet",
    category: "Bridal Couture",
    src: "/images/khadija/khadija-maroon-velvet-couture.jpg",
  },
  {
    id: "emerald-dupatta",
    title: "Emerald & Gold Zari",
    category: "Couture Adornment",
    src: "/images/khadija/khadija-emerald-dupatta-portrait.jpg",
  },
  {
    id: "scarlet-veil",
    title: "Scarlet Veil Study",
    category: "Bridal Editorial",
    src: "/images/khadija/khadija-bridal-red-veil.jpg",
  },
  {
    id: "olive-silk",
    title: "Moss Silk Draping",
    category: "Editorial Silk",
    src: "/images/khadija/khadija-olive-silk-portrait.jpg",
  },
  {
    id: "beauty-close",
    title: "Radiance & Heirloom",
    category: "Beauty Focus",
    src: "/images/khadija/khadija-beauty-portrait-close.jpg",
  },
];

export default function ModelExperience() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [currentMode, setCurrentMode] = useState<"cylinder" | "monolith">("cylinder");

  // Three.js internal refs to communicate with RAF
  const threeState = useRef<{
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    group: THREE.Group | null;
    monolithMesh: THREE.Mesh | null;
    particles: THREE.Points | null;
    targetRotationY: number;
    currentRotationY: number;
    targetRotationX: number;
    currentRotationX: number;
    isDragging: boolean;
    previousMouseX: number;
    previousMouseY: number;
    velocity: number;
    animId: number | null;
  }>({
    renderer: null,
    scene: null,
    camera: null,
    group: null,
    monolithMesh: null,
    particles: null,
    targetRotationY: 0,
    currentRotationY: 0,
    targetRotationX: 0,
    currentRotationX: 0,
    isDragging: false,
    previousMouseX: 0,
    previousMouseY: 0,
    velocity: 0,
    animId: null,
  });

  const itemCount = CAROUSEL_ITEMS.length;
  const angleStep = (Math.PI * 2) / itemCount;

  // Initialize Three.js Scene
  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setWebGlSupported(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    // Test WebGL support
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080a, 0.045);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: window.devicePixelRatio < 2,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      container.appendChild(renderer.domElement);
    } catch {
      setWebGlSupported(false);
      return;
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const spotGold = new THREE.SpotLight(0xd4af37, 3.5, 30, Math.PI / 4, 0.5);
    spotGold.position.set(5, 8, 8);
    scene.add(spotGold);

    const rimBlue = new THREE.DirectionalLight(0xe6d5b8, 1.2);
    rimBlue.position.set(-6, -4, -4);
    scene.add(rimBlue);

    // Group for cylinder carousel
    const carouselGroup = new THREE.Group();
    scene.add(carouselGroup);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const radius = 4.2;

    const planes: THREE.Mesh[] = [];

    CAROUSEL_ITEMS.forEach((item, index) => {
      const angle = index * angleStep;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      // Plane geometry with slight curve
      const planeGeo = new THREE.PlaneGeometry(2.4, 3.6, 16, 16);

      const texture = textureLoader.load(item.src);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;

      const planeMat = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
        roughness: 0.35,
        metalness: 0.15,
      });

      const mesh = new THREE.Mesh(planeGeo, planeMat);
      mesh.position.set(x, 0, z);
      // Face towards center / outward
      mesh.rotation.y = angle;
      mesh.userData = { index, title: item.title, category: item.category };

      carouselGroup.add(mesh);
      planes.push(mesh);
    });

    // Monolith Mesh (for single focal exploration)
    const monolithGeo = new THREE.BoxGeometry(2.8, 4.2, 0.15);
    const heroTex = textureLoader.load(CAROUSEL_ITEMS[0].src);
    const monolithMat = new THREE.MeshStandardMaterial({
      map: heroTex,
      roughness: 0.25,
      metalness: 0.2,
    });
    const monolithMesh = new THREE.Mesh(monolithGeo, monolithMat);
    monolithMesh.visible = false;
    scene.add(monolithMesh);

    // Floating Dust Particles (Champagne / Gold)
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 16;
      posArray[i + 1] = (Math.random() - 0.5) * 12;
      posArray[i + 2] = (Math.random() - 0.5) * 14;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0xd4af37,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Store refs
    threeState.current = {
      renderer,
      scene,
      camera,
      group: carouselGroup,
      monolithMesh,
      particles,
      targetRotationY: 0,
      currentRotationY: 0,
      targetRotationX: 0,
      currentRotationX: 0,
      isDragging: false,
      previousMouseX: 0,
      previousMouseY: 0,
      velocity: 0,
      animId: null,
    };

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      const state = threeState.current;
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Slow idle rotation when not dragging
      if (!state.isDragging) {
        state.targetRotationY += 0.0025;
      }

      // Smooth lerp rotation
      state.currentRotationY += (state.targetRotationY - state.currentRotationY) * 0.08;
      state.currentRotationX += (state.targetRotationX - state.currentRotationX) * 0.08;

      if (state.group) {
        state.group.rotation.y = state.currentRotationY;
        state.group.rotation.x = state.currentRotationX;
      }

      if (state.monolithMesh && state.monolithMesh.visible) {
        state.monolithMesh.rotation.y = state.currentRotationY * 0.5;
        state.monolithMesh.rotation.x = state.currentRotationX;
        state.monolithMesh.position.y = Math.sin(elapsed * 1.5) * 0.1;
      }

      if (state.particles) {
        state.particles.rotation.y = elapsed * 0.03;
      }

      // Calculate which card is currently closest to front (Z axis)
      if (state.group) {
        const normalizedY = ((-state.currentRotationY % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const activeIdx = Math.round(normalizedY / angleStep) % itemCount;
        setActiveIndex(activeIdx);
      }

      renderer.render(scene, camera);
      state.animId = requestAnimationFrame(animate);
    };

    threeState.current.animId = requestAnimationFrame(animate);

    // Resize handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    // Mouse / Touch handlers on container
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const state = threeState.current;
      state.isDragging = true;
      setIsInteracting(true);
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      state.previousMouseX = clientX;
      state.previousMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const state = threeState.current;
      if (!state.isDragging) return;

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - state.previousMouseX;
      const deltaY = clientY - state.previousMouseY;

      state.targetRotationY += deltaX * 0.006;
      state.targetRotationX = Math.max(-0.25, Math.min(0.25, state.targetRotationX + deltaY * 0.003));

      state.previousMouseX = clientX;
      state.previousMouseY = clientY;
    };

    const onPointerUp = () => {
      threeState.current.isDragging = false;
      setIsInteracting(false);
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onPointerDown);
    dom.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("mouseup", onPointerUp);
    window.addEventListener("touchend", onPointerUp);

    return () => {
      if (threeState.current.animId) cancelAnimationFrame(threeState.current.animId);
      window.removeEventListener("resize", handleResize);
      dom.removeEventListener("mousedown", onPointerDown);
      dom.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchend", onPointerUp);

      // Clean up Three.js resources
      planes.forEach((p) => {
        p.geometry.dispose();
        if (Array.isArray(p.material)) p.material.forEach((m) => m.dispose());
        else p.material.dispose();
      });
      monolithGeo.dispose();
      monolithMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (dom && dom.parentNode) dom.parentNode.removeChild(dom);
    };
  }, [angleStep, itemCount]);

  // Navigate to specific index
  const rotateToIndex = useCallback(
    (index: number) => {
      const state = threeState.current;
      state.targetRotationY = -index * angleStep;
      setActiveIndex(index);
    },
    [angleStep]
  );

  const handleNext = () => {
    rotateToIndex((activeIndex + 1) % itemCount);
  };

  const handlePrev = () => {
    rotateToIndex((activeIndex - 1 + itemCount) % itemCount);
  };

  const toggleMode = (mode: "cylinder" | "monolith") => {
    setCurrentMode(mode);
    const state = threeState.current;
    if (state.group && state.monolithMesh) {
      if (mode === "monolith") {
        state.group.visible = false;
        state.monolithMesh.visible = true;
      } else {
        state.group.visible = true;
        state.monolithMesh.visible = false;
      }
    }
  };

  return (
    <section
      id="experience"
      className="relative w-full min-h-[820px] lg:h-screen py-16 bg-couture-950 flex flex-col justify-between overflow-hidden border-b border-white/5 select-none"
    >
      {/* Section Header */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pointer-events-none">
        <div>
          <div className="flex items-center space-x-4 mb-3">
            <span className="font-mono text-xs text-couture-gold tracking-widest">
              02 / INTERACTION
            </span>
            <div className="h-[1px] w-12 bg-couture-gold/40" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-couture-muted font-sans">
              3D MOTION SPATIAL CAROUSEL
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl text-couture-cream tracking-wide uppercase font-light">
            SPATIAL <span className="text-couture-gold">ARCHIVE</span>
          </h2>
        </div>

        {/* View Mode Switcher */}
        <div className="pointer-events-auto flex items-center space-x-2 bg-couture-900/80 border border-white/10 rounded-full p-1 backdrop-blur-md">
          <button
            onClick={() => toggleMode("cylinder")}
            className={`px-4 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-sans font-medium transition-all ${
              currentMode === "cylinder"
                ? "bg-couture-gold text-couture-950 shadow-md"
                : "text-couture-muted hover:text-couture-cream"
            }`}
          >
            3D ORBIT
          </button>
          <button
            onClick={() => toggleMode("monolith")}
            className={`px-4 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-sans font-medium transition-all ${
              currentMode === "monolith"
                ? "bg-couture-gold text-couture-950 shadow-md"
                : "text-couture-muted hover:text-couture-cream"
            }`}
          >
            MONOLITH
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Container */}
      <div
        ref={mountRef}
        className="relative w-full flex-1 min-h-[460px] cursor-grab active:cursor-grabbing flex items-center justify-center"
        data-cursor="DRAG 3D"
      >
        {/* CSS 3D Fallback if WebGL is disabled or on reduced motion */}
        {!webGlSupported && (
          <div className="relative w-full max-w-4xl h-[420px] flex items-center justify-center [perspective:1000px]">
            <div className="relative w-72 h-96 [transform-style:preserve-3d] transition-transform duration-700">
              <div className="absolute inset-0 rounded-lg overflow-hidden border border-couture-gold/30 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={CAROUSEL_ITEMS[activeIndex].src}
                  alt={CAROUSEL_ITEMS[activeIndex].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* Center Drag Hint Overlay */}
        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
            isInteracting ? "opacity-0" : "opacity-40"
          }`}
        >
          <div className="flex items-center space-x-2 bg-couture-950/60 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="text-[10px] tracking-[0.3em] uppercase text-couture-champagne font-sans">
              DRAG TO ROTATE 360°
            </span>
          </div>
        </div>
      </div>

      {/* Footer Info & Orbital Navigation */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Active Item Metadata */}
        <div className="flex flex-col text-center sm:text-left">
          <span className="text-[10px] tracking-[0.3em] uppercase text-couture-gold font-sans font-semibold">
            {CAROUSEL_ITEMS[activeIndex]?.category}
          </span>
          <h3 className="font-display text-xl sm:text-2xl text-couture-cream tracking-wider mt-1">
            {CAROUSEL_ITEMS[activeIndex]?.title}
          </h3>
          <span className="text-[10px] tracking-widest text-couture-muted font-mono mt-0.5">
            0{activeIndex + 1} / 0{itemCount}
          </span>
        </div>

        {/* Carousel Stepper Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-white/15 bg-couture-900/60 hover:border-couture-gold hover:text-couture-gold flex items-center justify-center text-couture-cream transition-all backdrop-blur-md"
            aria-label="Previous Slide"
            data-cursor="PREV"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Bullet Indicators */}
          <div className="flex space-x-2">
            {CAROUSEL_ITEMS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => rotateToIndex(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  activeIndex === idx ? "w-8 bg-couture-gold" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Jump to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-white/15 bg-couture-900/60 hover:border-couture-gold hover:text-couture-gold flex items-center justify-center text-couture-cream transition-all backdrop-blur-md"
            aria-label="Next Slide"
            data-cursor="NEXT"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
