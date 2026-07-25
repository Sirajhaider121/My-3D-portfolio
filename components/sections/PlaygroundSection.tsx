"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Play, Copy, Check, Sparkles, Sliders, RefreshCw, Terminal } from "lucide-react";

// This section is deprecated and not used in Siraj Haider's portfolio.
export default function PlaygroundSection() {
  return null;

  const [activeTab, setActiveTab] = useState<"r3f" | "gsap" | "shader">("r3f");
  const [copied, setCopied] = useState(false);

  // Live sandbox controls
  const [meshSpeed, setMeshSpeed] = useState(2.0);
  const [wireframe, setWireframe] = useState(true);
  const [accentGlow, setAccentGlow] = useState("#00f0ff");

  const snippets = {
    r3f: `// React Three Fiber - Custom Distorted Mesh Component
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';

export function CyberMesh({ speed = ${meshSpeed}, wireframe = ${wireframe} }) {
  const meshRef = useRef(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.8}>
      <icosahedronGeometry args={[1, 2]} />
      <MeshDistortMaterial
        color="${accentGlow}"
        distort={0.4}
        speed={speed}
        wireframe={wireframe}
        roughness={0.15}
        metalness={0.9}
      />
    </mesh>
  );
}`,
    gsap: `// GSAP ScrollTrigger Camera Sequence
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimation(camera, scene) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#portfolio-root",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
    }
  });

  tl.to(camera.position, { z: 4, y: -2, ease: "power2.inOut" })
    .to(scene.rotation, { y: Math.PI * 2, ease: "none" }, 0);
}`,
    shader: `// Custom GLSL Fragment Shader - Cyber Glow
uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;

void main() {
  vec2 uv = vUv - 0.5;
  float dist = length(uv);
  float pulse = sin(uTime * 3.0) * 0.15 + 0.85;
  float glow = 0.05 / (dist * pulse);
  
  vec3 finalColor = uColor * glow;
  gl_FragColor = vec4(finalColor, clamp(glow, 0.0, 1.0));
}`,
  };

  const copyCode = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" className="relative py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-pink/10 border border-cyber-pink/30 text-cyber-pink text-xs font-mono">
            <Code2 className="w-3.5 h-3.5" />
            <span>04. INTERACTIVE SANDBOX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Code & <span className="text-gradient-cyan-purple">Shader Playground</span>
          </h2>
          <p className="text-slate-400 font-mono text-sm sm:text-base">
            Test interactive 3D parameters live and inspect real source code snippets.
          </p>
        </div>

        {/* Playground Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column - Live Parameter Controls & Canvas Preview */}
          <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <span className="text-xs font-mono text-white flex items-center gap-2 font-bold">
                  <Sliders className="w-4 h-4 text-cyber-cyan" />
                  Live Shader Parameters
                </span>
                <button
                  onClick={() => {
                    setMeshSpeed(2.0);
                    setWireframe(true);
                    setAccentGlow("#00f0ff");
                  }}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-mono flex items-center gap-1 transition-colors"
                  title="Reset Controls"
                >
                  <RefreshCw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Controls Form */}
              <div className="space-y-5">
                {/* Speed Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-slate-300">
                    <span>Distortion Speed</span>
                    <span className="text-cyber-cyan font-bold">{meshSpeed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5.0"
                    step="0.1"
                    value={meshSpeed}
                    onChange={(e) => setMeshSpeed(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyber-cyan"
                  />
                </div>

                {/* Wireframe Toggle */}
                <div className="flex items-center justify-between text-xs font-mono text-slate-300 pt-2">
                  <span>Wireframe Mesh Material</span>
                  <button
                    onClick={() => setWireframe(!wireframe)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      wireframe
                        ? "bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan shadow-cyanGlow"
                        : "bg-white/5 border border-white/10 text-slate-500"
                    }`}
                  >
                    {wireframe ? "ENABLED" : "SOLID"}
                  </button>
                </div>

                {/* Accent Color Palette Selector */}
                <div className="space-y-2 pt-2">
                  <span className="block text-xs font-mono text-slate-300">Color Palette</span>
                  <div className="flex items-center gap-3">
                    {[
                      { hex: "#00f0ff", label: "Cyan" },
                      { hex: "#7000ff", label: "Purple" },
                      { hex: "#00ff9d", label: "Emerald" },
                      { hex: "#ff007f", label: "Pink" },
                    ].map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => setAccentGlow(c.hex)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          accentGlow === c.hex
                            ? "scale-125 border-white shadow-lg"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Preview Box */}
            <div
              className="p-6 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col items-center justify-center min-h-[160px]"
              style={{
                background: `radial-gradient(circle at center, ${accentGlow}20, #0d0e17)`,
              }}
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300"
                style={{
                  border: `2px solid ${accentGlow}`,
                  boxShadow: `0 0 30px ${accentGlow}60`,
                  transform: `rotate(${meshSpeed * 45}deg)`,
                }}
              >
                <Code2 className="w-8 h-8" style={{ color: accentGlow }} />
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-3">
                Live 3D Shader Response Active
              </span>
            </div>

          </div>

          {/* Right Column - Code Snippet Display */}
          <div className="lg:col-span-7 glass-panel rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between">
            {/* Snippet Tabs */}
            <div className="bg-[#0e101a] px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("r3f")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    activeTab === "r3f"
                      ? "bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  CyberMesh.tsx
                </button>
                <button
                  onClick={() => setActiveTab("gsap")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    activeTab === "gsap"
                      ? "bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  ScrollTrigger.ts
                </button>
                <button
                  onClick={() => setActiveTab("shader")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    activeTab === "shader"
                      ? "bg-cyber-pink/20 text-cyber-pink border border-cyber-pink/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  FragmentShader.glsl
                </button>
              </div>

              {/* Copy Code button */}
              <button
                onClick={copyCode}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-cyber-emerald" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>

            {/* Code Block Display */}
            <div className="p-6 bg-[#0a0b12] font-mono text-xs overflow-x-auto text-slate-200 leading-relaxed min-h-[320px]">
              <pre>{snippets[activeTab]}</pre>
            </div>

            {/* Footer indicator */}
            <div className="px-6 py-3 bg-[#0c0e18] border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>UTF-8 // TypeScript React Component</span>
              <span className="text-cyber-cyan">Ready to integrate</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
