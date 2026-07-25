"use client";

import { motion } from "framer-motion";
import { 
  Briefcase, 
  Sparkles, 
  Terminal, 
  Zap, 
  Layers, 
  Cpu, 
  Globe 
} from "lucide-react";

import { experience, personalInfo } from "../data";

export default function AboutSection() {
  const highlights = [
    {
      icon: <Zap className="w-5 h-5 text-cyber-cyan" />,
      title: "Performance First",
      desc: "Optimized embedded systems and low-level code pipelines for maximum efficiency and real-time execution.",
    },
    {
      icon: <Layers className="w-5 h-5 text-cyber-purple" />,
      title: "Modular Architecture",
      desc: "Clean software engineering hierarchies, containerized Docker environments, and robust system designs.",
    },
    {
      icon: <Cpu className="w-5 h-5 text-cyber-emerald" />,
      title: "Industrial & IoT Focus",
      desc: "Hands-on expertise with ATmega32, LoRa modules, Distributed Control Systems (DCS), and PLC automation.",
    },
    {
      icon: <Globe className="w-5 h-5 text-cyber-pink" />,
      title: "End-to-End Solutions",
      desc: "Bridging hardware interfacing with full-stack web dashboards for comprehensive real-world monitoring.",
    },
  ];

  return (
    <section id="experience" className="relative py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>01. ABOUT & JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Bridging Hardware, <span className="text-gradient-cyan-purple">Code & Automation</span>
          </h2>
          <p className="text-slate-400 font-mono text-sm sm:text-base">
            Passionately crafting real-world engineering solutions that connect embedded systems with modern web technologies.
          </p>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white font-mono mb-2">{item.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-sans">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Career Experience Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Bio Story */}
          <div className="lg:col-span-5 space-y-6 glass-panel p-8 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-black text-white font-mono flex items-center gap-3">
              <Terminal className="w-6 h-6 text-cyber-cyan" />
              The Engineer's Story
            </h3>
            
            <p className="text-slate-300 text-sm leading-relaxed">
              As an Electrical Engineer specializing in Computer Engineering at FAST-NUCES Karachi, I thrive at the intersection of hardware and software. My journey involves everything from bare-metal OS development in C to industrial PLC panel design.
            </p>

            <p className="text-slate-300 text-sm leading-relaxed">
              Whether building LoRa-based IoT tracking networks or containerizing full-stack web applications with Docker, my focus is always on reliability, scalability, and real-world impact.
            </p>

            <div className="pt-4 border-t border-white/10 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Location:</span>
                <span className="text-cyber-cyan">Karachi, Pakistan</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Education:</span>
                <span className="text-white">BS Computer Engineering (FAST-NUCES)</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Graduation:</span>
                <span className="text-cyber-emerald">June 2026</span>
              </div>
            </div>
          </div>

          {/* Timeline Cards */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-black text-white font-mono flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-cyber-purple" />
              Work History & Leadership
            </h3>

            <div className="space-y-6">
              {experience.map((exp: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 relative overflow-hidden group"
                >
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                    <div>
                      <h4 className="text-lg font-bold text-white font-mono group-hover:text-cyber-cyan transition-colors">
                        {exp.role}
                      </h4>
                      <span className="text-xs font-mono text-cyber-purple font-semibold">{exp.company}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/5 text-slate-400 text-xs font-mono border border-white/10">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="text-slate-300 text-xs leading-relaxed mb-4 list-disc pl-5">
                    {exp.details?.map((d: string, i: number) => <li key={i}>{d}</li>)}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}