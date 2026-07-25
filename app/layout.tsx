import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alex Rivera | Creative Developer & 3D Web Engineer",
  description: "Portfolio of Alex Rivera - Senior Full-Stack Engineer, Creative Technologist, and 3D Web Developer specializing in React, Next.js, Three.js, WebGL, and high-performance applications.",
  keywords: ["Developer Portfolio", "Next.js", "React Three Fiber", "Three.js", "Creative Developer", "Tailwind CSS", "Framer Motion", "GSAP"],
  authors: [{ name: "Alex Rivera" }],
  openGraph: {
    title: "Alex Rivera | Creative Developer & 3D Web Engineer",
    description: "Modern, interactive 3D developer portfolio showcasing cutting-edge web applications, interactive shaders, and full-stack projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${jetbrains.variable} bg-[#08090e] text-slate-100 antialiased relative min-h-screen selection:bg-cyber-cyan/30 selection:text-cyber-cyan`}>
        {children}
      </body>
    </html>
  );
}
