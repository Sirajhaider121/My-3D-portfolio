"use client";

import { useState, useEffect } from "react";
import { ArrowUp, Code2, Heart, Sparkles } from "lucide-react";

export default function Footer() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZoneName: "short",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 border-t border-white/10 bg-[#06070b]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Copyright */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-cyber-cyan" />
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-white block">
                Siraj Haider .dev © {new Date().getFullYear()} | Computer Engineer
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                Built with Next.js App Router, R3F & Tailwind CSS
              </span>
            </div>
          </div>

          {/* Real-time Clock */}
          <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-full border border-white/10 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-ping" />
            <span>SYS_TIME: {timeStr || "12:00:00 PM PST"}</span>
          </div>

          {/* Back to Top button */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-2xl glass-panel text-slate-400 hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-all flex items-center gap-2 font-mono text-xs group"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>

        </div>
      </div>
    </footer>
  );
}
