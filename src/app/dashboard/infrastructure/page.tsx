"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Database,
    Server,
    HardDrive,
    Network,
    RefreshCw,
    Activity,
    Cpu,
    MemoryStick,
    ChevronRight,
    Search,
    Info,
    CheckCircle2
} from "lucide-react";
import { getProjects } from "@/lib/api";
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid } from "recharts";

const mockInfraLoad = [
    { name: 'Mon', compute: 45, memory: 60, network: 30 },
    { name: 'Tue', compute: 55, memory: 65, network: 40 },
    { name: 'Wed', compute: 85, memory: 90, network: 75 },
    { name: 'Thu', compute: 60, memory: 70, network: 45 },
    { name: 'Fri', compute: 50, memory: 60, network: 35 },
    { name: 'Sat', compute: 40, memory: 55, network: 25 },
    { name: 'Sun', compute: 35, memory: 50, network: 20 },
];

export default function InfrastructureConsole() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProjects().then(data => {
            setProjects(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const totalNodes = projects.length;
    const computeIndex = projects.reduce((acc, p) => acc + (p.history?.[0]?.analysis?.thermal_map?.length || 0) * 10, 0) || 45;

    return (
        <div className="flex flex-col min-h-screen bg-[#02040a] p-10 space-y-12">
            <header className="flex justify-between items-end">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-emerald-400 text-[10px] font-black uppercase tracking-[.4em] mb-2">
                        <Database className="w-4 h-4" />
                        Mesh Configuration
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter italic uppercase flex items-center gap-6">
                        Neural <span className="text-slate-800">/</span> <span className="text-white font-display">Infrastructure</span>
                    </h1>
                </div>
                <div className="flex items-center gap-6">
                    <button suppressHydrationWarning className="flex items-center gap-2 px-6 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                        <RefreshCw className="w-4 h-4" /> Ping Nodes
                    </button>
                </div>
            </header>

            <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-10">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="premium-card p-8 bg-emerald-500/5 border-emerald-500/10">
                            <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[.4em] mb-4">Active Nodes</div>
                            <div className="text-5xl font-black italic tracking-tighter text-emerald-400">{totalNodes}</div>
                            <div className="mt-2 text-[10px] font-black text-slate-500 uppercase">Synchronized with core registry</div>
                        </div>
                        <div className="premium-card p-8 bg-indigo-500/5 border-indigo-500/10">
                            <div className="text-[10px] font-black text-indigo-500 uppercase tracking-[.4em] mb-4">Global Compute Load</div>
                            <div className="text-5xl font-black italic tracking-tighter text-indigo-400">{computeIndex}%</div>
                            <div className="mt-2 text-[10px] font-black text-slate-500 uppercase">Averaged across cluster</div>
                        </div>
                        <div className="premium-card p-8 bg-purple-500/5 border-purple-500/10">
                            <div className="text-[10px] font-black text-purple-500 uppercase tracking-[.4em] mb-4">Network Entropy</div>
                            <div className="text-5xl font-black italic tracking-tighter text-purple-400">Low</div>
                            <div className="mt-2 text-[10px] font-black text-slate-500 uppercase">Data streams optimal</div>
                        </div>
                    </div>

                    <div className="premium-card p-12 relative overflow-hidden">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[.3em] mb-10">Distributed Resource Utilization (7D)</h3>
                        <div className="h-[300px] min-w-0">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                                <AreaChart data={mockInfraLoad}>
                                    <defs>
                                        <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="indigoGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1d2433" vertical={false} strokeOpacity={0.1} />
                                    <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} fontStyle="italic" />
                                    <Tooltip contentStyle={{ backgroundColor: '#0d1117', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }} />
                                    <Area type="monotone" dataKey="compute" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#emeraldGrad)" />
                                    <Area type="monotone" dataKey="memory" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#indigoGrad)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-black italic tracking-tighter uppercase flex items-center gap-4">
                            <Server className="w-6 h-6 text-emerald-500" /> Monitored Architectures
                        </h3>
                        <div className="space-y-4">
                            {projects.length > 0 ? projects.map((p: any, i: number) => {
                                const analysis = p.history?.[0]?.analysis;
                                const style = analysis?.dna_fingerprint?.architecture_bias || "Unknown";

                                return (
                                    <div key={i} className="group p-8 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between hover:bg-white/10 transition-all cursor-default">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-indigo-500/20 text-indigo-400">
                                                <Network className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black text-white uppercase tracking-tight">{p.name}</h4>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Topology: <span className="text-indigo-400/80">{style}</span></p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full font-black uppercase tracking-widest border border-emerald-500/20">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Healthy
                                            </span>
                                        </div>
                                    </div>
                                )
                            }) : (
                                <div className="py-20 flex flex-col items-center justify-center text-center space-y-6 border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.02]">
                                    <div className="w-20 h-20 bg-slate-500/10 rounded-full flex items-center justify-center text-slate-400">
                                        <Server className="w-10 h-10" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black italic uppercase tracking-tighter">No Active Nodes</h4>
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Waiting for initial target repository connection.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-10">
                    <div className="premium-card p-10 bg-gradient-to-br from-emerald-500/5 to-transparent border-white/5 relative overflow-hidden">
                        <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[80px] pointer-events-none" />
                        <h3 className="text-[10px] font-black text-emerald-400 uppercase tracking-[.4em] mb-8">Hardware Allocation</h3>

                        <div className="space-y-6 relative z-10">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                <span className="text-slate-500 flex items-center gap-2"><Cpu className="w-3 h-3 text-emerald-400" /> Dedicated Compute</span>
                                <span className="text-emerald-400">Active</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                <span className="text-slate-500 flex items-center gap-2"><MemoryStick className="w-3 h-3 text-purple-400" /> Neural Memory</span>
                                <span className="text-purple-400">74%</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                <span className="text-slate-500 flex items-center gap-2"><HardDrive className="w-3 h-3 text-indigo-400" /> Core Storage</span>
                                <span className="text-indigo-400">Nominal</span>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3">
                            <Info className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <p className="text-[9px] text-emerald-400/80 font-black uppercase tracking-widest leading-relaxed">
                                Current host environment supports localized AI simulation up to 5 concurrent nodes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
