"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Volume2, VolumeX, Menu, X, Code2, Sparkles, Send } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "// Home", href: "#home" },
    { name: "// Experience", href: "#experience" },
    { name: "// Projects", href: "#projects" },
    { name: "// Tech Stack", href: "#tech-stack" },
    { name: "// Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[999] pointer-events-auto transition-all duration-300 ${
        scrolled
          ? "py-3 bg-[#08090e]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 group-hover:scale-105 transition-transform">
              <img 
                src="/profile.jpg" 
                alt="Siraj Haider" 
                className="w-9 h-9 rounded-full object-cover border border-cyan-400/50 shadow-[0_0_10px_rgba(0,240,255,0.3)] z-10 bg-[#0d0e17]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.fallback-icon');
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="fallback-icon hidden absolute inset-0 w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-cyan to-cyber-purple p-[1px] shadow-cyanGlow">
                <div className="w-full h-full bg-[#0d0e17] rounded-[11px] flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-cyber-cyan group-hover:rotate-12 transition-transform" />
                </div>
              </div>
            </div>
            <div>
              <span className="font-mono font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                Siraj Haider<span className="text-cyber-cyan">.dev</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-pulse"></span>
              </span>
              <span className="block text-[10px] font-mono text-slate-400">Computer Engineer</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-cyber-cyan hover:bg-white/5 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Audio Toggle button */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title="Toggle Audio Ambience"
              className="p-2 rounded-xl glass-panel text-slate-400 hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-colors"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-cyber-cyan animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Hire Me CTA Button */}
            <a
              href="#contact"  
              className="px-4 py-2 rounded-xl border border-cyan-400 text-cyan-400 text-xs font-mono hover:bg-cyan-400 hover:text-black hover:font-black hover:shadow-[0_0_25px_rgba(0,240,255,0.8)] transition-all duration-300 flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Let's Talk
            </a>
          </div>

          {/* Mobile menu icon */}
          <div className="flex md:hidden items-center gap-2 pointer-events-auto z-[1000]">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl glass-panel text-slate-200 hover:text-cyber-cyan cursor-pointer pointer-events-auto"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden relative z-[1000] glass-panel border-b border-white/10 mt-3 px-6 py-5 bg-[#0a0b12]/95 backdrop-blur-2xl pointer-events-auto"
          >
            <div className="flex flex-col gap-3 font-mono text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg text-slate-300 hover:text-cyber-cyan hover:bg-white/5 transition-colors flex items-center justify-between cursor-pointer pointer-events-auto"
                >
                  {link.name}
                  <span className="text-xs text-slate-600">→</span>
                </a>
              ))}

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-ping" />
                  Available for contracts
                </span>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-lg border border-cyan-400 text-cyan-400 text-xs font-mono hover:bg-cyan-400 hover:text-black hover:font-black hover:shadow-[0_0_25px_rgba(0,240,255,0.8)] transition-all duration-300 flex items-center gap-1.5 cursor-pointer pointer-events-auto"
                >
                  <Send className="w-3.5 h-3.5" /> Hire Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
