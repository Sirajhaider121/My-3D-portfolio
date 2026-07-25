"use client";

import { motion } from "framer-motion";
import { Cpu, CheckCircle2 } from "lucide-react";

import { skills } from "../data";

export default function SkillsSection() {
  return (
    <section id="tech-stack" className="relative py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>02. TECHNICAL MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Engineering & <span className="text-gradient-emerald-cyan">Core Competencies</span>
          </h2>
          <p className="text-slate-400 font-mono text-sm sm:text-base">
            Comprehensive tech stack spanning software development, embedded hardware, industrial automation, and DevOps tools.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((cat: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 relative overflow-hidden group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
                  <CheckCircle2 className="w-4 h-4 text-cyber-cyan" />
                  <h3 className="text-base font-bold text-white font-mono group-hover:text-cyber-cyan transition-colors">
                    {cat.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {cat.items?.map((item: string, i: number) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:border-cyber-cyan/40 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}