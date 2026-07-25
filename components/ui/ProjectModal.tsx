"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, CheckCircle2, Layers, Sparkles, Terminal, ArrowLeft } from "lucide-react";

export interface ProjectData {
  id?: string;
  title?: string;
  category?: string;
  subtitle?: string;
  description?: string;
  architecture?: string;
  features?: string[];
  tags?: string[];
  liveUrl?: string;
  githubUrl?: string;
  accentColor?: string;
  metrics?: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Add listeners for Escape key and navigation (hashchange)
  useEffect(() => {
    if (!project) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    const handleHashChange = () => {
      onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [project, onClose]);

  if (!project) return null;

  const title       = project.title       || "Project Details";
  const category    = project.category    || "Engineering";
  const subtitle    = project.subtitle    || "";
  const description = project.description || "No description available.";
  const architecture= project.architecture|| "Architecture details coming soon.";
  const features    = project.features    || [];
  const tags        = project.tags        || [];
  const liveUrl     = project.liveUrl     || "#";
  const githubUrl   = project.githubUrl   || "#";
  const accentColor = project.accentColor || "#00f0ff";
  const metrics     = project.metrics     || "—";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto pt-24 sm:pt-32 pb-16 px-4 sm:px-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#06070b]/90 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl mx-auto glass-panel rounded-3xl border border-white/15 overflow-hidden z-10 shadow-2xl shadow-cyber-cyan/20"
        >
          {/* Explicit Top-Right Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-xl bg-[#0a0b12]/80 border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-black hover:font-black hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] transition-all duration-300 backdrop-blur-md flex items-center justify-center"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Banner */}
          <div
            className="p-8 relative border-b border-white/10"
            style={{
              background: `linear-gradient(135deg, rgba(17,19,31,0.95), ${accentColor}20)`,
            }}
          >
            {/* Back to Projects (Top) */}
            <button 
              onClick={onClose}
              className="mb-6 flex items-center gap-2 px-4 py-2 rounded-xl border border-purple-500 text-purple-400 text-xs font-mono hover:bg-purple-500 hover:text-black hover:font-black hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] transition-all duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              ← Back to Projects
            </button>

            <div className="space-y-2 pr-8">
              <span className="px-3 py-1 rounded-full bg-white/10 text-cyber-cyan text-xs font-mono border border-white/10">
                {category.toUpperCase()}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-mono tracking-tight pt-1">
                {title}
              </h2>
              {subtitle && (
                <p className="text-slate-300 font-mono text-sm">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Body Content */}
          <div className="p-8 space-y-6 bg-[#0a0b12]">

            {/* Overview */}
            <div className="space-y-2">
              <h3 className="text-sm font-mono font-bold text-cyber-cyan flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                PROJECT OVERVIEW
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
            </div>

            {/* Key Metrics Pill */}
            <div className="p-4 rounded-xl glass-panel border border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Impact Metric:</span>
              <span className="text-sm font-mono font-bold text-cyber-emerald text-right">{metrics}</span>
            </div>

            {/* Architecture Highlights */}
            <div className="space-y-2">
              <h3 className="text-sm font-mono font-bold text-cyber-purple flex items-center gap-2">
                <Layers className="w-4 h-4" />
                TECHNICAL ARCHITECTURE
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed font-mono bg-white/5 p-4 rounded-xl border border-white/10">
                {architecture}
              </p>
            </div>

            {/* Core Features */}
            {features.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-mono font-bold text-cyber-emerald flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  KEY FEATURES
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyber-cyan shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Tags */}
            {tags.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-xs font-mono text-slate-400">Technologies Used:</span>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-cyber-cyan"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer Action Links */}
          <div className="p-6 bg-[#0c0e18] border-t border-white/10 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {githubUrl !== "#" ? (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-purple-500 text-purple-400 font-mono text-xs hover:bg-purple-500 hover:text-black hover:font-black hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] transition-all duration-300 flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              ) : (
                <span className="px-4 py-2.5 rounded-xl border border-white/10 text-slate-500 font-mono text-xs flex items-center gap-2 cursor-not-allowed">
                  <Github className="w-4 h-4" />
                  Private Repository
                </span>
              )}

              {liveUrl !== "#" ? (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl border border-cyan-400 text-cyan-400 font-mono text-xs hover:bg-cyan-400 hover:text-black hover:font-black hover:shadow-[0_0_25px_rgba(0,240,255,0.8)] transition-all duration-300 flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Launch Live App
                </a>
              ) : (
                <span className="px-6 py-2.5 rounded-xl border border-white/10 text-slate-400 font-bold font-mono text-xs flex items-center gap-2 cursor-not-allowed">
                  <ExternalLink className="w-4 h-4" />
                  No Live Demo
                </span>
              )}
            </div>
            
            {/* Back to Projects (Bottom) */}
            <button 
              onClick={onClose}
              className="w-full py-3 rounded-xl border border-purple-500 text-purple-400 font-mono text-xs hover:bg-purple-500 hover:text-black hover:font-black hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] transition-all duration-300 flex items-center justify-center gap-2 mt-2"
            >
              ← Back to Projects
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
