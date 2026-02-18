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

                <div className="grid lg:grid-cols-3 gap-8">
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

                        <div className="h-[300px] mb-8">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dnaData}>
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
                            <DNAAttribute label="Stylistic Profile" value="Snake Case (Pythonic)" />
                        </div>
                    </motion.div>

                    {/* Skill Evolution & Weakness Prediction */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Evolution Chart */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass rounded-3xl p-8 border border-white/5"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-emerald-500" /> Skill Evolution Curve
                                </h3>
                                <div className="flex gap-4 text-xs">
                                    <span className="flex items-center gap-1 text-gray-500"><div className="w-2 h-2 rounded-full bg-blue-500" /> Quality</span>
                                    <span className="flex items-center gap-1 text-gray-500"><div className="w-2 h-2 rounded-full bg-purple-500" /> Complexity</span>
                                </div>
                            </div>
                            <div className="h-[300px]">
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
