"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import PlaygroundSection from "@/components/sections/PlaygroundSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import StationIndicator from "@/components/ui/StationIndicator";
import LoadingScreen from "@/components/ui/LoadingScreen";

// Dynamically import 3D Canvas to prevent SSR window issues
const BackgroundCanvas = dynamic(
  () => import("@/components/canvas/BackgroundCanvas"),
  { ssr: false }
);

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const handleSceneLoaded = useCallback(() => {
    setSceneLoaded(true);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: rootRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <>
      {/* Loading Screen — covers everything until 3D scene is ready */}
      <LoadingScreen isLoaded={sceneLoaded} />

      {/*
        Full-Screen Fixed 3D Canvas in Background
        CRITICAL: fixed inset-0 z-0 pointer-events-none so it NEVER blocks clicks
      */}
      <BackgroundCanvas
        scrollProgress={scrollProgress}
        onLoaded={handleSceneLoaded}
      />

      {/* Fixed Station Navigation Pills (Right Sidebar) — pointer-events-auto */}
      <StationIndicator scrollProgress={scrollProgress} />

      {/* Fixed Glassmorphic Navbar — z-50, pointer-events-auto */}
      <Navbar />

      {/*
        Scrollable HTML Overlay — relative z-10 pointer-events-auto
        Sections flow in normal document order — NO blank gaps, NO station wrappers
        Each section has its exact ID matching Navbar hrefs
      */}
      <div
        id="portfolio-scroll-root"
        ref={rootRef}
        className="relative z-10 pointer-events-auto"
      >
        {/* SECTION 1: Hero / Home */}
        <HeroSection />

        {/* SECTION 2: Experience / About */}
        <AboutSection />

        {/* SECTION 3: Featured Projects */}
        <ProjectsSection />

        {/* SECTION 4: Tech Stack & Skills */}
        <SkillsSection />

        {/* SECTION 5: Interactive Sandbox */}
        <PlaygroundSection />

        {/* SECTION 6: Contact */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
