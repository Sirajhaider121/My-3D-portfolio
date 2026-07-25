"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Loader2 } from "lucide-react";

interface LoadingScreenProps {
  isLoaded: boolean;
}

export default function LoadingScreen({ isLoaded }: LoadingScreenProps) {
  const [showScreen, setShowScreen] = useState(true);
  const [progress, setProgress] = useState(0);

  // Simulated progress that accelerates when scene is actually loaded
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (isLoaded) {
          // Quickly ramp to 100 once the scene is ready
          const next = prev + (100 - prev) * 0.15;
          return next >= 99.5 ? 100 : next;
        }
        // Slow crawl while loading
        const next = prev + (85 - prev) * 0.02;
        return Math.min(next, 85);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isLoaded]);

  // Dismiss after progress reaches 100
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setShowScreen(false), 600);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {showScreen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#06070b]"
        >
          {/* Subtle radial gradient background */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.08) 0%, rgba(112, 0, 255, 0.04) 40%, transparent 70%)",
            }}
          />

          {/* Cyber grid underlay */}
          <div className="absolute inset-0 cyber-grid opacity-10" />

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo & Spinner */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyber-cyan to-cyber-purple p-[2px] shadow-cyanGlow animate-pulse-slow">
                <div className="w-full h-full bg-[#0b0c14] rounded-[15px] flex items-center justify-center">
                  <Code2 className="w-8 h-8 text-cyber-cyan" />
                </div>
              </div>

              {/* Orbiting Ring */}
              <div className="absolute inset-[-12px] border-2 border-cyber-cyan/20 rounded-full animate-glow-spin" />
              <div className="absolute inset-[-20px] border border-cyber-purple/10 rounded-full animate-glow-spin" style={{ animationDirection: "reverse", animationDuration: "15s" }} />
            </div>

            {/* Brand Name */}
            <div className="text-center space-y-1">
              <h1 className="font-mono text-xl font-black tracking-tight text-white">
                Siraj Haider<span className="text-cyber-cyan">.dev</span>
              </h1>
              <p className="font-mono text-[11px] text-slate-500 tracking-wider">
                INITIALIZING 3D ENGINE
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-56 space-y-2">
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #00f0ff, #7000ff, #ff007f)",
                    width: `${progress}%`,
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] text-slate-500 flex items-center gap-1.5">
                  <Loader2 className="w-3 h-3 animate-spin text-cyber-cyan" />
                  Loading assets...
                </span>
                <span className="font-mono text-[10px] text-cyber-cyan font-bold">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
