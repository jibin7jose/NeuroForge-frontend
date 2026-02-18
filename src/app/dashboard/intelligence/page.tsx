"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Dna,
    Brain,
    Target,
    TrendingUp,
    ShieldAlert,
    Fingerprint,
    ChevronLeft
} from "lucide-react";
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";
import { getEvolutionHistory } from "@/lib/api";
import Link from "next/link";

const dnaData = [
    { subject: 'Modular Thinking', A: 85, fullMark: 100 },
    { subject: 'Error Resilience', A: 40, fullMark: 100 },
    { subject: 'Optimization', A: 75, fullMark: 100 },
    { subject: 'Consistency', A: 90, fullMark: 100 },
    { subject: 'Documentation', A: 55, fullMark: 100 },
];

export default function IntelligencePage() {
    const [evolutionData, setEvolutionData] = useState([]);

    useEffect(() => {
        getEvolutionHistory().then(setEvolutionData);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-white transition-all mb-8 w-fit text-sm">
                    <ChevronLeft className="w-4 h-4" /> Back to Fleet
                </Link>

                <div className="flex justify-between items-end mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl font-bold tracking-tight">Intelligence Center</h1>
                            <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold rounded-full">BETA</span>
                        </div>
                        <p className="text-gray-400">Deep-dive into your architectural DNA and predicted growth trajectory.</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* DNA Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1 glass rounded-3xl p-8 border border-white/5 bg-gradient-to-b from-blue-600/5 to-transparent"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-blue-600/20 rounded-2xl">
                                <Fingerprint className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Developer DNA</h2>
                                <p className="text-xs text-gray-500">Last updated: 2 hours ago</p>
                            </div>
                        </div>

                        <div className="h-[250px] mb-8">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dnaData}>
                                    <PolarGrid stroke="#222" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10 }} />
                                    <Radar
                                        name="Level"
                                        dataKey="A"
                                        stroke="#3b82f6"
                                        fill="#3b82f6"
                                        fillOpacity={0.6}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-4">
                            <DNAAttribute label="Architectural Bias" value="OOP / Modular" />
                            <DNAAttribute label="Risk Tolerance" value="Aggressive" />
                            <DNAAttribute label="Stylistic Profile" value="Snake Case" />
                        </div>
                    </motion.div>

                    {/* Skill Knowledge Graph (Digital Twin Style) */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Evolution Chart */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="md:col-span-2 glass rounded-3xl p-8 border border-white/5"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-lg font-bold flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-emerald-500" /> Skill Evolution Curve
                                    </h3>
                                    <div className="flex gap-4 text-[10px] uppercase font-bold tracking-widest text-gray-500">
                                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500" /> Quality</span>
                                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500" /> Complexity</span>
                                    </div>
                                </div>
                                <div className="h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={evolutionData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                                            <XAxis dataKey="date" hide />
                                            <YAxis hide />
                                            <Tooltip
                                                contentStyle={{ background: '#111', border: '1px solid #333' }}
                                                itemStyle={{ color: '#fff' }}
                                            />
                                            <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6' }} />
                                            <Line type="monotone" dataKey="complexity" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7' }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>

                            {/* Global Benchmarking */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass rounded-3xl p-8 border border-white/5 bg-emerald-500/5"
                            >
                                <h3 className="text-sm font-bold text-gray-500 mb-6 uppercase tracking-widest">Benchmarking</h3>
                                <div className="text-center py-4">
                                    <div className="text-5xl font-bold mb-2">95th</div>
                                    <div className="text-xs text-emerald-400 font-bold uppercase tracking-widest">Percentile</div>
                                </div>
                                <div className="space-y-6 mt-6">
                                    <div>
                                        <div className="flex justify-between text-[10px] mb-2 font-bold uppercase text-gray-500">
                                            <span>Clean Code vs Top 10%</span>
                                            <span className="text-emerald-500">+4.2%</span>
                                        </div>
                                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-emerald-500 h-full w-[85%]" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-[10px] mb-2 font-bold uppercase text-gray-500">
                                            <span>Fault Tolerance Gap</span>
                                            <span className="text-amber-500">-12%</span>
                                        </div>
                                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-amber-500 h-full w-[45%]" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Skill Knowledge Graph (Node Map Preview) */}
                        <div className="glass rounded-3xl p-8 border border-white/5 overflow-hidden relative">
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <Brain className="w-5 h-5 text-purple-500" /> Skill Dependency Graph (Neo4j)
                                </h3>
                                <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-gray-500">Visualizing 14 Knowledge Nodes</div>
                            </div>

                            <div className="h-[300px] flex items-center justify-center relative">
                                {/* SVG Skill Node Map */}
                                <svg width="100%" height="100%" className="max-w-[600px] opacity-80">
                                    {/* Lines */}
                                    <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="#333" strokeWidth="1" />
                                    <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="#333" strokeWidth="1" />
                                    <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="#333" strokeWidth="1" />
                                    <line x1="20%" y1="20%" x2="80%" y2="20%" stroke="#333" strokeWidth="1" />

                                    {/* Central Node */}
                                    <circle cx="50%" cy="50%" r="40" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" className="animate-pulse" />
                                    <text x="50%" y="50%" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" dy=".3em">DSA CORE</text>

                                    {/* Child Nodes */}
                                    <SkillNode x="20%" y="20%" label="Patterns" color="#10b981" />
                                    <SkillNode x="80%" y="20%" label="Concurrency" color="#a855f7" />
                                    <SkillNode x="50%" y="85%" label="Scale" color="#f59e0b" />
                                </svg>

                                <div className="absolute bottom-4 right-4 flex gap-4">
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                        <div className="w-2 h-2 rounded-full bg-blue-500" /> Strong Path
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                        <div className="w-2 h-2 rounded-full bg-amber-500" /> Weak Link
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Weakness Deep Dive */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <WeaknessCard
                                icon={<ShieldAlert className="w-5 h-5 text-red-400" />}
                                title="Error Boundaries"
                                risk="High Risk"
                                message="Low try-except coverage across modules. High probability of runtime crashes in production scenarios."
                            />
                            <WeaknessCard
                                icon={<Brain className="w-5 h-5 text-amber-400" />}
                                title="Algorithmic Depth"
                                risk="Medium Risk"
                                message="Detected O(n³) patterns in data processing modules. Suggests optimization gap in heavy scaling."
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

function DNAAttribute({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
            <span className="text-sm text-gray-500 font-medium">{label}</span>
            <span className="text-sm text-gray-200 font-bold">{value}</span>
        </div>
    );
}

function SkillNode({ x, y, label, color }: { x: string, y: string, label: string, color: string }) {
    return (
        <g className="cursor-pointer group">
            <circle cx={x} cy={y} r="8" fill={color} className="group-hover:r-10 transition-all opacity-40" />
            <circle cx={x} cy={y} r="4" fill={color} />
            <text x={x} y={y} dy="-15" textAnchor="middle" fill="#666" fontSize="8" fontWeight="bold" className="group-hover:fill-white uppercase tracking-tighter transition-all">
                {label}
            </text>
        </g>
    );
}


function WeaknessCard({ icon, title, risk, message }: any) {
    return (
        <div className="glass p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all">
            <div className="flex justify-between items-center mb-4">
                <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${risk.includes('High') ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                    {risk}
                </span>
            </div>
            <h4 className="font-bold mb-2">{title}</h4>
            <p className="text-sm text-gray-500 leading-relaxed">{message}</p>
        </div>
    );
}
