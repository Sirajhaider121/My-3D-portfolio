"use client";

import { motion } from "framer-motion";
import { Sparkles, FolderGit2, Cpu, Mail } from "lucide-react";

interface StationIndicatorProps {
  scrollProgress: number;
}

export default function StationIndicator({ scrollProgress }: StationIndicatorProps) {
  const stations = [
    { id: 0, label: "01. HOME", icon: <Sparkles className="w-3 h-3" />, href: "#home" },
    { id: 1, label: "02. PROJECTS", icon: <FolderGit2 className="w-3 h-3" />, href: "#projects" },
    { id: 2, label: "03. TECH STACK", icon: <Cpu className="w-3 h-3" />, href: "#tech-stack" },
    { id: 3, label: "04. CONTACT", icon: <Mail className="w-3 h-3" />, href: "#contact" },
  ];

  const activeId = Math.min(
    stations.length - 1,
    Math.floor(scrollProgress * stations.length)
  );

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-4 pointer-events-auto">
      {stations.map((st) => {
        const isActive = activeId === st.id;
        return (
          <a
            key={st.id}
            href={st.href}
            className="group flex items-center gap-3 transition-all"
          >
            {/* Label Tooltip */}
            <span
              className={`font-mono text-[10px] px-2.5 py-1 rounded-full backdrop-blur-md transition-all ${
                isActive
                  ? "bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan shadow-cyanGlow"
                  : "bg-black/40 border border-white/10 text-slate-400 opacity-0 group-hover:opacity-100"
              }`}
            >
              {st.label}
            </span>

            {/* Station Dot */}
            <div
              className={`w-3 h-3 rounded-full flex items-center justify-center transition-all ${
                isActive
                  ? "bg-cyber-cyan scale-125 shadow-cyanGlow ring-4 ring-cyber-cyan/30"
                  : "bg-white/20 hover:bg-white/40 border border-white/10"
              }`}
            />
          </a>
        );
      })}
    </div>
  );
}
