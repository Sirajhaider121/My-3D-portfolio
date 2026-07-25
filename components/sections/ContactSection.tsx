"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Send, 
  Mail, 
  Check, 
  Copy, 
  MapPin, 
  Clock, 
  Sparkles, 
  MessageSquare, 
  Github, 
  Linkedin, 
  Twitter 
} from "lucide-react";
import { personalInfo, achievements } from "../data"; // Siraj Haider data
export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Project Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  
const emailAddress = personalInfo.email;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        access_key: "ba38e22d-02e7-495b-bcd7-b1f2c6c4b997",
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 200) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "Project Inquiry", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setError("Something went wrong. Please try again or email directly.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again or email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono">
            <Mail className="w-3.5 h-3.5" />
            <span>05. GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Let's Build Something <span className="text-gradient-cyan-purple">Extraordinary</span>
          </h2>
          <p className="text-slate-400 font-mono text-sm sm:text-base">
            Have a new project, remote role opportunity, or architectural question? Send a message below.
          </p>
        </div>

        {/* Contact Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Information & Copy Pill */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Email Pill */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
              <span className="text-xs font-mono text-slate-400 block">Direct Contact Email</span>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs sm:text-sm font-mono text-cyber-cyan font-bold truncate">
                  {emailAddress}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl glass-panel text-slate-300 hover:text-white hover:border-cyber-cyan/50 transition-colors shrink-0 ml-2"
                  title="Copy Email Address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-cyber-emerald" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copiedEmail && (
                <p className="text-[10px] font-mono text-cyber-emerald animate-pulse">
                  ✓ Email copied to clipboard!
                </p>
              )}
            </div>

            {/* Response Time & Location Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-1">
                <Clock className="w-5 h-5 text-cyber-cyan mb-2" />
                <span className="block text-xs font-mono text-slate-400">Turnaround</span>
                <span className="text-xs font-bold text-white font-mono">&lt; 4 Hours Response</span>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-1">
                <MapPin className="w-5 h-5 text-cyber-purple mb-2" />
                <span className="block text-xs font-mono text-slate-400">Location</span>
                <span className="text-xs font-bold text-white font-mono">{personalInfo.location}</span>
              </div>
            </div>

            {/* Achievements */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-2">
              <span className="text-xs font-mono text-slate-400 block">Achievements</span>
              <ul className="text-slate-300 text-xs list-disc pl-5">
                {achievements.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
            {/* Social Links Grid */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
              <span className="text-xs font-mono text-slate-400 block">Connect Across Platforms</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/Sirajhaider121"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl glass-panel text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan/40 text-xs font-mono flex items-center justify-center gap-2 transition-all"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/siraj-haider-96418627a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl glass-panel text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan/40 text-xs font-mono flex items-center justify-center gap-2 transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="flex-1 py-3 px-4 rounded-xl glass-panel text-slate-300 hover:text-cyber-cyan hover:border-cyber-cyan/40 text-xs font-mono flex items-center justify-center gap-2 transition-all"
                >
                  <Twitter className="w-4 h-4" />
                  Twitter
                </a>
              </div>
            </div>

          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl">
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-cyber-emerald/20 border border-cyber-emerald text-cyber-emerald flex items-center justify-center mx-auto shadow-emeraldGlow">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white font-mono">Message Transmitted!</h3>
                  <p className="text-slate-300 text-sm font-mono max-w-md mx-auto">
                    Message sent successfully! I'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 rounded-xl border border-red-500/50 bg-red-500/10 text-red-400 text-xs font-mono text-center">
                      {error}
                    </div>
                  )}
                  <input type="hidden" name="access_key" value="ba38e22d-02e7-495b-bcd7-b1f2c6c4b997" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-300 block">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs focus:border-cyber-cyan focus:outline-none focus:ring-1 focus:ring-cyber-cyan transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-slate-300 block">Your Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs focus:border-cyber-cyan focus:outline-none focus:ring-1 focus:ring-cyber-cyan transition-colors"
                      />
                    </div>

                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-300 block">Inquiry Type</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0e101a] border border-white/10 text-white font-mono text-xs focus:border-cyber-cyan focus:outline-none focus:ring-1 focus:ring-cyber-cyan"
                    >
                      <option value="Project Inquiry">New Project / Freelance Contract</option>
                      <option value="Full-Time Role">Full-Time / Engineering Role</option>
                      <option value="Technical Consulting">3D / WebGL Architectural Advisory</option>
                      <option value="General Hello">General Connect & Chat</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-300 block">Message Details *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project, target timeline, or tech stack requirements..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs focus:border-cyber-cyan focus:outline-none focus:ring-1 focus:ring-cyber-cyan transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl border border-emerald-400 text-emerald-400 font-mono text-xs transition-all duration-300 flex items-center justify-center gap-2 group ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-emerald-400 hover:text-black hover:font-black hover:shadow-[0_0_25px_rgba(52,211,153,0.8)]'}`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2 text-emerald-400">
                        <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="animate-pulse">Sending...</span>
                      </div>
                    ) : (
                      <>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        Transmit Message
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
