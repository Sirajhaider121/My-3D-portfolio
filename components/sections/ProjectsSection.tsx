"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, FolderGit2, ArrowUpRight, Eye } from "lucide-react";
import ProjectModal, { ProjectData } from "../ui/ProjectModal";

import { projects } from "../data";

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "embedded", label: "Embedded & IoT" },
    { id: "software", label: "Software & Systems" },
    { id: "web", label: "Web & DevOps" },
  ];

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p: any) => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald text-xs font-mono">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>03. FEATURED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Selected <span className="text-gradient-cyan-purple">Engineering Projects</span>
          </h2>
          <p className="text-slate-400 font-mono text-sm sm:text-base">
            Explore a curated selection of embedded systems, IoT trackers, low-level OS builds, and DevOps deployments.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                activeFilter === f.id
                  ? "bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 border border-cyber-cyan/50 text-white shadow-cyanGlow"
                  : "glass-panel text-slate-400 hover:text-white hover:border-white/20"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: any, idx: number) => (
              <motion.div
                key={idx}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="glass-panel glass-panel-hover rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between group"
              >
                {/* Visual Header Banner */}
                <div
                  className="h-48 p-6 relative flex flex-col justify-between overflow-hidden"
                  style={{
                    background: `radial-gradient(circle at top right, rgba(0, 240, 255, 0.15), rgba(13,14,23,0.95) 70%)`,
                  }}
                >
                  <div className="absolute inset-0 cyber-grid opacity-20" />

                  <div className="flex justify-between items-start z-10">
                    <span className="px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[10px] font-mono text-white backdrop-blur-md uppercase">
                      {project.category || "Engineering"}
                    </span>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl bg-black/40 border border-white/10 text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-colors"
                          title="GitHub Repo"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl bg-black/40 border border-white/10 text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-colors"
                          title="Live Site"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="z-10">
                    <h3 className="text-2xl font-black text-white font-mono drop-shadow-[0_2px_10px_rgba(0,240,255,0.3)] group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-300 mt-1">{project.subtitle}</p>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-slate-300 text-xs leading-relaxed font-sans">
                    {project.description}
                  </p>

                  <div className="space-y-4 pt-2">
                    {/* Tech Badges */}
                    {project.tags && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((t: string) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* View Details Button */}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full py-2.5 rounded-xl border border-cyan-400 text-cyan-400 text-xs font-mono hover:bg-cyan-400 hover:text-black hover:font-black hover:shadow-[0_0_25px_rgba(0,240,255,0.8)] flex items-center justify-center gap-2 transition-all duration-300 group"
                    >
                      <Eye className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      Inspect Technical Specs
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Modal Popup for inspection */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}