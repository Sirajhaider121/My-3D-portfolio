"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import Scene3D from "./Scene3D";

interface BackgroundCanvasProps {
  scrollProgress?: number;
  onLoaded?: () => void;
}

function SceneLoadNotifier({ onLoaded }: { onLoaded?: () => void }) {
  // Signal ready once the component mounts inside the Canvas (scene is initialized)
  useEffect(() => {
    // Small delay to let the first frame render
    const timer = setTimeout(() => {
      onLoaded?.();
    }, 800);
    return () => clearTimeout(timer);
  }, [onLoaded]);

  return <Preload all />;
}

export default function BackgroundCanvas({ scrollProgress = 0, onLoaded }: BackgroundCanvasProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7], fov: isMobile ? 75 : 60 }}
        gl={{
          alpha: true,
          antialias: !isMobile,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        style={{ touchAction: "auto" }}
      >
        <Scene3D scrollProgress={scrollProgress} isMobile={isMobile} />
        <SceneLoadNotifier onLoaded={onLoaded} />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
