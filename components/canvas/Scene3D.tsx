"use client";

import FloatingGeometries from "./FloatingGeometries";
import ParticleField from "./ParticleField";
import GlowingRibbon from "./GlowingRibbon";
import CinematicCamera from "./CinematicCamera";
import PathParticles from "./PathParticles";
import PostProcessingEffects from "./PostProcessingEffects";

interface Scene3DProps {
  scrollProgress?: number;
  isMobile?: boolean;
}

export default function Scene3D({ scrollProgress = 0, isMobile = false }: Scene3DProps) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 15, 8]} intensity={1.8} color="#00f0ff" />
      <directionalLight position={[-10, -15, -8]} intensity={1.5} color="#7000ff" />
      <pointLight position={[0, 0, 5]} intensity={1.0} color="#00ff9d" />

      {/* Cinematic Camera Flight along 3D CatmullRom Curve */}
      <CinematicCamera scrollProgress={scrollProgress} />

      {/* Glowing 3D Ribbon Path & Stations */}
      <GlowingRibbon scrollProgress={scrollProgress} />

      {/* Galactic Path Particles — reduced on mobile */}
      <PathParticles count={isMobile ? 300 : 800} />

      {/* Floating Low-Poly Geometries */}
      <FloatingGeometries scrollProgress={scrollProgress} />

      {/* Ambient Background Starfield — reduced on mobile */}
      <ParticleField count={isMobile ? 200 : 500} />

      {/* Bloom Post-Processing — skip on mobile for performance */}
      {!isMobile && <PostProcessingEffects />}
    </>
  );
}
