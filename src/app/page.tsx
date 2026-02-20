"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Zap,
    Target,
    TrendingUp,
    Code2,
    Cpu,
    BrainCircuit,
    ChevronRight,
    Github
} from "lucide-react";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    ResponsiveContainer,
    AreaChart,
    Area,
} from "recharts";

import Link from "next/link";

const skillData = [

    { subject: 'Algorithms', A: 120, fullMark: 150 },
    { subject: 'System Design', A: 98, fullMark: 150 },
    { subject: 'Clean Code', A: 86, fullMark: 150 },
    { subject: 'Security', A: 99, fullMark: 150 },
    { subject: 'Testing', A: 85, fullMark: 150 },
    { subject: 'Concurrency', A: 65, fullMark: 150 },
];

const growthData = [
    { month: 'Jan', score: 40 },
    { month: 'Feb', score: 45 },
    { month: 'Mar', score: 55 },
    { month: 'Apr', score: 62 },
    { month: 'May', score: 78 },
    { month: 'Jun', score: 85 },
];

export default function LandingPage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
            {/* Hero Section */}
            <nav className="flex justify-between items-center p-6 border-b border-white/5 glass sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Cpu className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tighter">JibinForge AI</span>
                </div>
                <div className="flex items-center gap-6">
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Documentation</a>
                    <Link href="/dashboard/intelligence" className="text-sm text-gray-400 hover:text-white transition-colors">Intelligence</Link>
                    <Link href="/dashboard">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-sm font-medium transition-all shadow-lg shadow-blue-600/20">
                            Get Started
                        </button>
                    </Link>
                </div>

            </nav>

            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6">
                            <Zap className="w-3 h-3" />
                            <span>Next Gen Code Intelligence</span>
                        </div>
                        <h1 className="text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                            Evolve Your <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400">
                                Coding DNA
                            </span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-8 max-w-xl leading-relaxed">
                            JibinForge AI analyzes your codebase to predict technical gaps, track skill evolution, and generate your unique developer fingerprint.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all">
                                Connect GitHub <Github className="w-5 h-5" />
                            </button>
                            <button className="flex items-center gap-2 px-8 py-4 glass font-bold rounded-xl hover:bg-white/5 transition-all">
                                Explore Demo <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Visualization Preview */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative glass rounded-3xl p-8 border border-white/10 shadow-2xl"
                    >
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2 h-[300px] glass rounded-2xl p-4 border border-white/5">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Skill Intelligence Graph</h3>
                                    <Target className="w-4 h-4 text-blue-500" />
                                </div>
                                {isClient ? (
                                    <ResponsiveContainer width="100%" height="85%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                                            <PolarGrid stroke="#333" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10 }} />
                                            <Radar
                                                name="Developer"
                                                dataKey="A"
                                                stroke="#3b82f6"
                                                fill="#3b82f6"
                                                fillOpacity={0.6}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-[85%]" />
                                )}
                            </div>

                            <div className="glass rounded-2xl p-6 border border-white/5">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Evolution</h3>
                                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                                </div>
                                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">+42%</div>
                                <p className="text-[10px] text-gray-500 mt-1">Growth since last PR</p>
                                <div className="h-[100px] mt-4">
                                    {isClient ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={growthData}>
                                                <defs>
                                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <Area type="monotone" dataKey="score" stroke="#10b981" fillOpacity={1} fill="url(#colorScore)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="h-full" />
                                    )}
                                </div>
                            </div>

                            <div className="glass rounded-2xl p-6 border border-white/5">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Weakness Prediction</h3>
                                    <Zap className="w-4 h-4 text-purple-500" />
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                                        <span className="text-[11px] text-gray-300">System Design Maturity</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                        <span className="text-[11px] text-gray-300">Concurrency Safety</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                                        <span className="text-[11px] text-gray-300">Test Coverage Depth</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Code2 className="w-6 h-6 text-blue-500" />}
                        title="Static Intelligence"
                        description="Deep analysis of AST, complexity metrics, and semantic structures to evaluate code quality."
                    />
                    <FeatureCard
                        icon={<BrainCircuit className="w-6 h-6 text-purple-500" />}
                        title="Skill Dependency Graph"
                        description="Map your knowledge across DSA, System Design, and Cloud using Neo4j graph intelligence."
                    />
                    <FeatureCard
                        icon={<Target className="w-6 h-6 text-emerald-500" />}
                        title="Interview Readiness"
                        description="AI-driven simulations based on your coding style and predicted technical weaknesses."
                    />
                </div>
            </section>
        </main>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="glass p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all group">
            <div className="mb-6 p-3 bg-white/5 rounded-xl w-fit group-hover:bg-white/10 transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
    );
}
