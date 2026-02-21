"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
    Zap,
    Target,
    TrendingUp,
    Code2,
    Cpu,
    BrainCircuit,
    ChevronRight,
    Github,
    Activity,
    Shield,
    Dna,
    ArrowRight,
    Globe,
    Layers,
    Terminal,
    Sparkles,
    ExternalLink
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
    const [isClient, setIsClient] = useState(false);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <main className="min-h-screen bg-[#02040a] text-white selection:bg-indigo-500/30 overflow-x-hidden">
            <NeuralBackground />

            {/* Cinematic Overlay Gradients */}
            <div className="fixed inset-0 pointer-events-none z-[1]">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-[#02040a]/40 backdrop-blur-xl transition-all duration-500">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Cpu className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                            NeuroForge
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-10">
                        <NavLink href="#features">Intelligence</NavLink>
                        <NavLink href="#analysis">Architectural DNA</NavLink>
                        <NavLink href="#about">Enterprise</NavLink>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/dashboard" className="hidden sm:block">
                            <button className="text-sm font-bold text-slate-400 hover:text-white transition-colors">
                                Sign In
                            </button>
                        </Link>
                        <Link href="/dashboard">
                            <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-sm font-black transition-all shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center gap-2">
                                Start Free <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-48 pb-32 px-6 overflow-hidden min-h-screen flex flex-col items-center justify-center bg-mesh-prime">
                <div className="absolute inset-0 bg-neural-matrix opacity-20 pointer-events-none" />

                <motion.div style={{ y: y1, opacity }} className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-black uppercase tracking-[0.2em] mb-12 shadow-[0_0_30px_rgba(99,102,241,0.1)] backdrop-blur-md"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        AIEngine v3.0 Powered • Neural Architecture
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-7xl md:text-[130px] font-black tracking-tighter leading-[0.8] mb-12 font-display italic"
                    >
                        AI-POWERED <br />
                        <span className="text-gradient-vibrant drop-shadow-[0_0_50px_rgba(129,140,248,0.3)]">
                            SKILL EVOLUTION
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-400 max-w-5xl mx-auto mb-20 font-medium leading-relaxed font-sans"
                    >
                        NeuroForge extracts structural and semantic patterns from real-world code, transforming raw source into measurable skill intelligence using AST parsing and behavioral analytics.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col sm:flex-row justify-center gap-8"
                    >
                        <button className="group flex items-center justify-center gap-3 px-12 py-6 bg-white text-black font-black rounded-3xl hover:bg-slate-200 transition-all active:scale-95 shadow-2xl shadow-white/10 text-base">
                            Begin Evolution <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <Link href="/dashboard">
                            <button className="flex items-center justify-center gap-3 px-12 py-6 bg-white/5 border border-white/10 hover:bg-white/10 font-black rounded-3xl transition-all backdrop-blur-xl text-base">
                                <Activity className="w-5 h-5" /> Analyze Repository
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Animated Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] font-mono">NEURAL_DEEP_LINK</span>
                    <div className="w-px h-12 bg-gradient-to-b from-indigo-500 to-transparent shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                </motion.div>
            </section>

            {/* Innovation Section */}
            <section id="features" className="py-40 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.5em] mb-4">Core Capacities</h2>
                        <h3 className="text-5xl md:text-6xl font-black tracking-tighter italic uppercase">The Intelligence Matrix</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                        <FeatureCard
                            icon={<Terminal className="w-8 h-8 text-indigo-500" />}
                            title="STRUCTURAL PARSING"
                            description="Leverages static analysis and AST parsing to extract structural and semantic patterns, identifying technical weaknesses and architecture maturity."
                        />
                        <FeatureCard
                            icon={<Dna className="w-8 h-8 text-purple-500" />}
                            title="SKILL ANALYTICS"
                            description="Track progression using behavioral and time-series analytics, converting raw code into a dynamic skill profile for strategic improvement."
                        />
                        <FeatureCard
                            icon={<BrainCircuit className="w-8 h-8 text-pink-500" />}
                            title="PREDICTIVE GROWTH"
                            description="Estimates interview readiness and predicts growth trends through knowledge graph reasoning and data-driven insight modeling."
                        />
                    </div>
                </div>
            </section>

            {/* Visual Teaser */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto relative group">
                    <div className="absolute inset-0 bg-indigo-600/20 blur-[150px] opacity-30 group-hover:opacity-50 transition-opacity" />
                    <motion.div
                        whileHover={{ rotateY: -2, rotateX: 2 }}
                        className="relative bg-[#0d1117] border border-white/5 rounded-[40px] p-6 shadow-2xl overflow-hidden"
                    >
                        <div className="flex items-center gap-2 mb-8 px-4">
                            <div className="w-3.5 h-3.5 rounded-full bg-red-500/30" />
                            <div className="w-3.5 h-3.5 rounded-full bg-amber-500/30" />
                            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/30" />
                            <div className="flex-1" />
                            <div className="px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-[10px] text-indigo-400 font-black tracking-widest uppercase">
                                PRO_CONSOLE_V3.0
                            </div>
                        </div>
                        <img
                            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070"
                            alt="Dashboard Preview"
                            className="rounded-3xl shadow-2xl filter brightness-90 group-hover:brightness-100 transition-all duration-700"
                        />
                        {/* Interactive Sparkle Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent mix-blend-overlay pointer-events-none" />
                    </motion.div>
                </div>
            </section>
            {/* Final CTA */}
            <section className="py-40 px-6 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-6xl md:text-8xl font-black tracking-tighter italic font-display"
                    >
                        READY TO <span className="text-gradient-vibrant">EVOLVE?</span>
                    </motion.h2>
                    <p className="text-slate-400 text-xl font-bold uppercase tracking-[.3em] max-w-2xl mx-auto leading-relaxed">
                        Join the global fleet of high-intelligence engineering systems.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-10">
                        <Link href="/dashboard">
                            <button className="px-12 py-6 bg-white text-black rounded-2xl text-sm font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.2)] active:scale-95 flex items-center gap-4">
                                Enter Console <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                        <button className="px-12 py-6 bg-white/5 border border-white/10 text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-4">
                            View Documentation <ExternalLink className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-32 border-t border-white/5 bg-[#010206] relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <Cpu className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-black tracking-tighter uppercase italic text-xl">NeuroForge</span>
                    </div>
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.3em] mb-4">
                        DESIGNED BY JIBIN JOSE • POWERED BY NEURAL LOGIC
                    </p>
                    <p className="text-slate-700 text-[10px] font-medium tracking-widest uppercase">
                        © 2026 NEUROFORGE INTELLIGENCE SYSTEMS. ALL RIGHTS RESERVED.
                    </p>
                </div>
            </footer>
        </main>
    );
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <a href={href} className="text-sm font-black text-slate-400 hover:text-indigo-400 transition-all tracking-widest uppercase">
            {children}
        </a>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="premium-card p-12 group overflow-hidden relative"
        >
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                {icon}
            </div>
            <div className="mb-10 p-5 bg-white/5 rounded-2xl w-fit group-hover:bg-indigo-600/20 transition-all group-hover:scale-110">
                {icon}
            </div>
            <h3 className="text-2xl font-black mb-6 tracking-tighter uppercase italic group-hover:text-indigo-400 transition-colors">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-bold tracking-tight">{description}</p>

            <div className="mt-10 flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                Discovery Path <ArrowRight className="w-3.5 h-3.5" />
            </div>
        </motion.div>
    );
}

function NeuralBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const particles: any[] = [];
        const particleCount = 100;

        class Particle {
            x: number; y: number; vx: number; vy: number; size: number; color: string;
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.size = Math.random() * 1.5 + 0.5;
                this.color = Math.random() > 0.5 ? "rgba(99, 102, 241, 0.4)" : "rgba(168, 85, 247, 0.4)";
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p, i) => {
                p.update();
                p.draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (dist < 180) {
                        ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - dist / 180)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-[#02040a]" />;
}

