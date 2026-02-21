"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Cloud,
    CloudLightning,
    CloudRain,
    Zap,
    Server,
    CheckCircle2,
    AlertTriangle,
    RefreshCw,
    HardDrive,
    Network,
    ArrowUpRight,
    Search,
    ChevronDown,
    ChevronRight,
    Activity,
    Info,
    Check,
    Target
} from "lucide-react";
import { getProjects } from "@/lib/api";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid } from "recharts";

const mockScalabilityData = [
    { name: 'Mon', capacity: 4000, stress: 2400 },
    { name: 'Tue', capacity: 3000, stress: 1398 },
    { name: 'Wed', capacity: 2000, stress: 9800 },
    { name: 'Thu', capacity: 2780, stress: 3908 },
    { name: 'Fri', capacity: 1890, stress: 4800 },
    { name: 'Sat', capacity: 2390, stress: 3800 },
    { name: 'Sun', capacity: 3490, stress: 4300 },
];

export default function CloudReadinessConsole() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedVector, setSelectedVector] = useState<any>(null);

    useEffect(() => {
        getProjects().then(data => {
            setProjects(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const allVectors = projects.flatMap(p => {
        const history = p.history || [];
        const latest = history[0] || {};
        const vectors = latest.analysis?.cloud_readiness?.scaling_vectors || [];
        return vectors.map((v: any) => ({ ...v, projectName: p.name, projectId: p.id }));
    });

    const averageScore = projects.length > 0
        ? projects.reduce((acc, p) => acc + (p.history?.[0]?.analysis?.cloud_readiness?.readiness_score || 0), 0) / projects.length
        : 0;

    const allBlockers = projects.flatMap(p => {
        const history = p.history || [];
        const latest = history[0] || {};
        return (latest.analysis?.cloud_readiness?.blockers || []).map((b: string) => ({ blocker: b, projectName: p.name }));
    });

    return (
        <div className="flex flex-col min-h-screen bg-[#02040a] p-10 space-y-12">
            <header className="flex justify-between items-end">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-cyan-400 text-[10px] font-black uppercase tracking-[.4em] mb-2">
                        <CloudLightning className="w-4 h-4" />
                        Infrastructure Elasticity
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter italic uppercase flex items-center gap-6">
                        Cloud <span className="text-slate-800">/</span> <span className="text-white font-display">Readiness</span>
                    </h1>
                </div>
                <div className="flex items-center gap-6">
                    <button suppressHydrationWarning className="flex items-center gap-2 px-6 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                        <RefreshCw className="w-4 h-4" /> Resync Fleet Topology
                    </button>
                </div>
            </header>

            <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-10">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="premium-card p-8 bg-cyan-500/5 border-cyan-500/10">
                            <div className="text-[10px] font-black text-cyan-500 uppercase tracking-[.4em] mb-4">Fleet Readiness Score</div>
                            <div className="text-5xl font-black italic tracking-tighter text-cyan-400">{Math.round(averageScore)}%</div>
                            <div className="mt-2 text-[10px] font-black text-slate-500 uppercase">Operational Threshold: 85%</div>
                        </div>
                        <div className="premium-card p-8 bg-purple-500/5 border-purple-500/10">
                            <div className="text-[10px] font-black text-purple-500 uppercase tracking-[.4em] mb-4">Scalability Vectors</div>
                            <div className="text-5xl font-black italic tracking-tighter text-purple-400">{allVectors.length}</div>
                            <div className="mt-2 text-[10px] font-black text-slate-500 uppercase">Identified Growth Paths</div>
                        </div>
                        <div className="premium-card p-8 bg-amber-500/5 border-amber-500/10">
                            <div className="text-[10px] font-black text-amber-500 uppercase tracking-[.4em] mb-4">Structural Blockers</div>
                            <div className="text-5xl font-black italic tracking-tighter text-amber-400">{allBlockers.length}</div>
                            <div className="mt-2 text-[10px] font-black text-slate-500 uppercase">Impeding Horizontal Scale</div>
                        </div>
                    </div>

                    <div className="premium-card p-12 relative overflow-hidden">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[.3em] mb-10">Simulated Load Distribution</h3>
                        <div className="h-[300px] min-w-0">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                                <AreaChart data={mockScalabilityData}>
                                    <defs>
                                        <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1d2433" vertical={false} strokeOpacity={0.1} />
                                    <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} fontStyle="italic" />
                                    <Tooltip contentStyle={{ backgroundColor: '#0d1117', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }} />
                                    <Area type="monotone" dataKey="capacity" stroke="#06b6d4" strokeWidth={4} fillOpacity={1} fill="url(#cyanGrad)" />
                                    <Area type="monotone" dataKey="stress" stroke="#a855f7" strokeWidth={4} fillOpacity={1} fill="url(#purpleGrad)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-black italic tracking-tighter uppercase flex items-center gap-4">
                            <Network className="w-6 h-6 text-cyan-500" /> Structural Blockers
                        </h3>
                        <div className="space-y-4">
                            {allBlockers.length > 0 ? allBlockers.map((blocker: any, i: number) => (
                                <div key={i} className="group p-8 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between hover:bg-white/10 transition-all cursor-default">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-amber-500/20 text-amber-500">
                                            <AlertTriangle className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-white uppercase tracking-tight">{blocker.blocker}</h4>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Impact Node: <span className="text-amber-400/80">{blocker.projectName}</span></p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full font-black uppercase tracking-widest border border-amber-500/20">Refactor Advised</span>
                                </div>
                            )) : (
                                <div className="py-20 flex flex-col items-center justify-center text-center space-y-6 border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.02]">
                                    <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-400">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black italic uppercase tracking-tighter">Zero Elasticity Blockers</h4>
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Architecture relies on stateless communication and horizontal scalability paradigms.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-10">
                    <div className="premium-card p-10 bg-gradient-to-br from-cyan-500/5 to-transparent border-white/5 relative overflow-hidden">
                        <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[80px] pointer-events-none" />
                        <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-[.4em] mb-8">Discovered Vectors</h3>

                        <div className="space-y-4">
                            {allVectors.length > 0 ? allVectors.map((v: any, i: number) => (
                                <div key={i} className="flex p-4 bg-white/[0.02] border border-white/5 rounded-2xl gap-4 items-start cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setSelectedVector(v)}>
                                    <div className="mt-1">
                                        <Activity className="w-4 h-4 text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black uppercase text-slate-300">{v.vector}</h4>
                                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-1 line-clamp-2">{v.description}</p>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest text-center py-6 border border-dashed border-white/10 rounded-xl">No specific scaling vectors cataloged.</p>
                            )}
                        </div>
                    </div>

                    <div className="premium-card p-10 space-y-8 min-h-[300px] flex flex-col justify-center items-center text-center bg-white/[0.01]">
                        <Server className="w-12 h-12 text-slate-600 mb-2 opacity-50" />
                        <div>
                            <h4 className="text-lg font-black italic tracking-tighter text-slate-400">Target Environment Settings</h4>
                            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-2">Kubernetes / Lambda mappings currently inherit from base configuration. Container registries standard.</p>
                        </div>
                        <button className="px-6 py-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest mt-4 hover:bg-indigo-500/20 transition-colors">
                            Configure Cloud Bindings
                        </button>
                    </div>
                </div>
            </div>

            {/* Vector Detail Modal */}
            <AnimatePresence>
                {selectedVector && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-10 bg-[#02040a]/90 backdrop-blur-3xl"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            className="premium-card w-full max-w-2xl bg-[#0d1117] p-12 shadow-[0_0_100px_rgba(0,0,0,0.8)] relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-cyan-500" />

                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                                    <Activity className="w-8 h-8 text-purple-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white">{selectedVector.vector}</h2>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Source Node: {selectedVector.projectName}</p>
                                </div>
                            </div>

                            <div className="p-6 bg-white/5 border border-white/5 rounded-2xl mb-8">
                                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                                    {selectedVector.description}
                                </p>
                            </div>

                            <div className="flex items-center gap-4 p-5 border border-cyan-500/20 bg-cyan-500/5 rounded-2xl">
                                <Info className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                                <p className="text-[10px] text-cyan-400/80 font-black uppercase tracking-widest">
                                    Neural recommendation: Implement horizontal sharding patterns to capitalize on this vector's architectural readiness.
                                </p>
                            </div>

                            <button onClick={() => setSelectedVector(null)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
                                <Target className="w-5 h-5 rotate-45" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
