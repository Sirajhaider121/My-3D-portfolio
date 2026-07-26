"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Terminal, 
  ArrowRight, 
  Sparkles, 
  Github, 
  Linkedin, 
  Twitter 
} from "lucide-react";

import { personalInfo } from "../data";

export default function HeroSection() {
  const roles = [
    "Electrical Engineer (Computer Engineering)",
    "Embedded Systems & IoT",
    "Industrial Automation (PLCs, DCS)",
    "DevOps & Software Engineering",
  ];
  
  const [roleIndex, setRoleIndex] = useState(0);

  // Terminal interactive state
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string }>>([
    { cmd: "status", output: "🟢 Open for high-impact projects & engineering roles" },
    { cmd: "help", output: "Available commands: skills, projects, contact, clear, matrix" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === "clear") {
      setTerminalHistory([]);
      setTerminalInput("");
      return;
    }

    let output = "";
    switch (trimmed) {
      case "skills":
        output = "Programming: C++, Java, Python, MySQL | DevOps: Docker, Git, Linux | Embedded: ATmega32, LoRa, Microcontrollers | Automation: PLC, DCS, Panel Design";
        break;
      case "projects":
        output = "1. IoT Tracker (LoRa GPS) | 2. Custom Mini OS (C) | 3. Dockerized Web App | 4. Water Turbidity Checker | 5. Adaptive Traffic System";
        break;
      case "contact":
        output = "Email: sirajhaider880@gmail.com | Phone: +92-3263981248 | Karachi, Pakistan";
        break;
      case "matrix":
        output = "🟢 ENTERING MATRIX MODE... 01000001 01001100 01000101 01011000";
        break;
      case "whoami":
        output = "Siraj Haider — Electrical Engineer (Computer Engineering), FAST-NUCES Karachi, Class of 2026.";
        break;
      case "status":
        output = "🟢 Open for high-impact projects & engineering roles";
        break;
      case "help":
        output = "Available commands: skills, projects, contact, clear, matrix";
        break;
      default:
        output = `Command not recognized: '${trimmed}'. Type 'help' for available commands.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: trimmed, output }]);
    setTerminalInput("");
  };

  return (
    <section id="home" className="relative min-h-screen pt-40 pb-16 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Main Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono backdrop-blur-md shadow-cyanGlow"
            >
              <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-ping" />
              <span>Available for new projects & remote engineering</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              <img 
                src="/profile.png" 
                alt="Siraj Haider" 
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)] mb-4" 
              />
              <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
                {personalInfo.name}<br />
                <span className="text-gradient-cyan-purple">{personalInfo.title}</span>
              </h1>

              {/* Dynamic Role Badge */}
              <div className="h-8 flex items-center gap-2 text-lg sm:text-xl font-mono text-slate-300">
                <span className="text-cyber-cyan font-bold">&gt;</span>
                <span className="text-slate-400">Specializing in</span>
                <motion.span
                  key={roles[roleIndex]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="font-semibold text-cyber-cyan underline decoration-cyber-purple decoration-2 underline-offset-4"
                >
                  {roles[roleIndex]}
                </motion.span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed"
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTAs & Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl border border-cyan-400 text-cyan-400 font-bold font-mono text-sm hover:bg-cyan-400 hover:text-black hover:font-black hover:shadow-[0_0_25px_rgba(0,240,255,0.8)] transition-all duration-300 flex items-center gap-2 group"
              >
                Explore Selected Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl border border-purple-500 text-purple-400 font-mono text-sm hover:bg-purple-500 hover:text-black hover:font-black hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] transition-all duration-300 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Get in Touch
              </a>

              {/* Social Icons */}
              <div className="flex items-center gap-2 pl-2">
                <a
                  href="https://github.com/Sirajhaider121"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass-panel text-slate-400 hover:text-cyber-cyan hover:border-cyber-cyan/40 transition-colors"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/siraj-haider-96418627a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass-panel text-slate-400 hover:text-cyber-cyan hover:border-cyber-cyan/40 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter/X"
                  className="p-3 rounded-xl glass-panel text-slate-400 hover:text-cyber-cyan hover:border-cyber-cyan/40 transition-colors"
                  title="Twitter/X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 mt-12 pt-6 border-t border-white/10"
            >
              <div>
                <span className="block text-2xl font-extrabold font-mono text-[#00f0ff]">4+</span>
                <span className="text-xs text-slate-400 font-mono">Years Engineering</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold font-mono text-[#00ff9d]">15+</span>
                <span className="text-xs text-slate-400 font-mono">Projects Built</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold font-mono text-[#7000ff]">100%</span>
                <span className="text-xs text-slate-400 font-mono">Hardware &amp; Code</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column - Interactive Terminal Widget */}
          <div className="lg:col-span-5 mt-8 sm:mt-12 lg:mt-0 lg:transform lg:translate-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-panel rounded-2xl border border-white/15 overflow-hidden shadow-2xl shadow-cyber-cyan/10"
            >
              {/* Terminal Window Header */}
              <div className="bg-[#0e101a] px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyber-cyan" />
                    siraj-cli v1.0.0
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  ONLINE
                </span>
              </div>

              {/* Terminal Body */}
              <div className="p-5 font-mono text-xs space-y-3 min-h-[300px] max-h-[380px] overflow-y-auto bg-[#0a0b12]/90">
                <p className="text-slate-500">
                  // Interactive Terminal. Type 'help', 'skills', 'projects', 'contact', or 'clear'.
                </p>

                {terminalHistory.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center gap-2 text-cyber-cyan">
                      <span>&gt;</span>
                      <span className="text-white font-semibold">{item.cmd}</span>
                    </div>
                    <div className="text-slate-300 pl-4 border-l-2 border-cyber-purple/50 leading-relaxed">
                      {item.output}
                    </div>
                  </div>
                ))}

                {/* Input Prompt */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCommand(terminalInput);
                  }}
                  className="flex items-center gap-2 pt-2"
                >
                  <span className="text-cyber-cyan font-bold">&gt;</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Type command here..."
                    className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs focus:ring-0 placeholder:text-slate-600"
                  />
                </form>
              </div>

              {/* Terminal Quick Command Chips */}
              <div className="bg-[#0c0e18] px-4 py-3 border-t border-white/10 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono text-slate-500">Quick run:</span>
                {["skills", "projects", "contact", "whoami"].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => handleCommand(cmd)}
                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-cyber-cyan/20 border border-white/10 hover:border-cyber-cyan/40 text-[10px] font-mono text-slate-300 hover:text-cyber-cyan transition-colors"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}