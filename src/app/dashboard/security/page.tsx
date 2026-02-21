"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Shield,
    ShieldAlert,
    Lock,
    Unlock,
    Activity,
    AlertTriangle,
    CheckCircle2,
    RefreshCw,
    Search,
    ChevronRight,
    Target,
    X
} from "lucide-react";
import { getProjects, getProjectHistory } from "@/lib/api";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const mockThreatVolume = [
    { name: 'Mon', critical: 1, moderate: 4 },
    { name: 'Tue', critical: 0, moderate: 2 },
    { name: 'Wed', critical: 2, moderate: 5 },
    { name: 'Thu', critical: 0, moderate: 1 },
    { name: 'Fri', critical: 1, moderate: 3 },
    { name: 'Sat', critical: 0, moderate: 0 },
    { name: 'Sun', critical: 0, moderate: 1 },
];

export default function SecurityConsole() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedThreat, setSelectedThreat] = useState<any>(null);

    useEffect(() => {
        getProjects().then(data => {
            setProjects(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const allThreats = projects.flatMap(p => {
        const history = p.history || [];
        const latest = history[0] || {};
        const threats = latest.analysis?.security_perimeter?.threats || [];
        return threats.map((t: any) => ({ ...t, projectName: p.name, projectId: p.id }));
    });

    const criticalThreats = allThreats.filter(t => t.severity === 'Critical');
    const moderateThreats = allThreats.filter(t => t.severity !== 'Critical');

    return (
        <div className="flex flex-col min-h-screen bg-[#02040a] p-10 space-y-12">
            <header className="flex justify-between items-end">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-rose-500 text-[10px] font-black uppercase tracking-[.4em] mb-2">
                        <ShieldAlert className="w-4 h-4" />
                        Global Threat Command
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter italic uppercase flex items-center gap-6">
                        Security <span className="text-slate-800">/</span> <span className="text-white font-display">Console</span>
                    </h1>
                </div>
                <div className="flex items-center gap-6">
                    <button suppressHydrationWarning className="flex items-center gap-2 px-6 py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                        <RefreshCw className="w-4 h-4" /> Run Global Audit
                    </button>
                </div>
            </header>

            <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-10">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="premium-card p-8 bg-rose-500/5 border-rose-500/10">
                            <div className="text-[10px] font-black text-rose-500 uppercase tracking-[.4em] mb-4">Critical Vulnerabilities</div>
                            <div className="text-5xl font-black italic tracking-tighter text-rose-500">{criticalThreats.length}</div>
                        </div>
                        <div className="premium-card p-8 bg-orange-500/5 border-orange-500/10">
                            <div className="text-[10px] font-black text-orange-500 uppercase tracking-[.4em] mb-4">Moderate Risks</div>
                            <div className="text-5xl font-black italic tracking-tighter text-orange-400">{moderateThreats.length}</div>
                        </div>
                        <div className="premium-card p-8 bg-emerald-500/5 border-emerald-500/10">
                            <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[.4em] mb-4">Secured Nodes</div>
                            <div className="text-5xl font-black italic tracking-tighter text-emerald-400">{projects.length - (criticalThreats.length > 0 ? 1 : 0)}</div>
                        </div>
                    </div>

                    <div className="premium-card p-12 relative overflow-hidden">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[.3em] mb-10">Threat Volume Telemetry</h3>
                        <div className="h-[300px] min-w-0">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                                <AreaChart data={mockThreatVolume}>
                                    <defs>
                                        <linearGradient id="roseGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="orangeGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1d2433" vertical={false} strokeOpacity={0.1} />
                                    <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} fontStyle="italic" />
                                    <Tooltip contentStyle={{ backgroundColor: '#0d1117', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }} />
                                    <Area type="step" dataKey="critical" stroke="#f43f5e" strokeWidth={4} fillOpacity={1} fill="url(#roseGrad)" />
                                    <Area type="step" dataKey="moderate" stroke="#f97316" strokeWidth={4} fillOpacity={1} fill="url(#orangeGrad)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-black italic tracking-tighter uppercase flex items-center gap-4">
                            <Target className="w-6 h-6 text-indigo-500" /> Active Threat Vectors
                        </h3>
                        <div className="space-y-4">
                            {allThreats.length > 0 ? allThreats.map((threat: any, i: number) => (
                                <div key={i} className="group p-8 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer" onClick={() => setSelectedThreat(threat)}>
                                    <div className="flex items-center gap-8">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${threat.severity === 'Critical' ? 'bg-rose-500/20 text-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.2)]' : 'bg-orange-500/20 text-orange-500'}`}>
                                            <Lock className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-4 mb-2">
                                                <span className="text-sm font-black text-white uppercase tracking-tight">{threat.vector}</span>
                                                <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${threat.severity === 'Critical' ? 'bg-rose-500 text-white' : 'bg-orange-500 text-white'}`}>
                                                    {threat.severity}
                                                </span>
                                            </div>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Target Node: <span className="text-indigo-400">{threat.projectName}</span></p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
                                </div>
                            )) : (
                                <div className="py-20 flex flex-col items-center justify-center text-center space-y-6 border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.02]">
                                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black italic uppercase tracking-tighter">Zero Zero-Days Active</h4>
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Global perimeter is currently secured and fortified against registered signatures.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-10">
                    <div className="premium-card p-10 bg-gradient-to-br from-rose-500/5 to-transparent border-white/5 relative overflow-hidden">
                        <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] bg-rose-500/10 blur-[80px] pointer-events-none" />
                        <h3 className="text-[10px] font-black text-rose-400 uppercase tracking-[.4em] mb-8">System Defcon Level</h3>

                        <div className="flex items-center justify-center py-10">
                            <div className="relative flex items-center justify-center">
                                <div className={`absolute inset-0 rounded-full blur-[40px] ${criticalThreats.length > 0 ? 'bg-rose-500/20 animate-pulse' : 'bg-emerald-500/20'}`} />
                                <div className={`w-40 h-40 rounded-full border-[8px] flex items-center justify-center relative z-10 shadow-2xl ${criticalThreats.length > 0 ? 'border-rose-500 bg-rose-500/10 text-rose-500' : 'border-emerald-500 bg-emerald-500/10 text-emerald-500'}`}>
                                    <span className="text-6xl font-black italic tracking-tighter">{criticalThreats.length > 0 ? '2' : '4'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-6 space-y-2 relative z-10">
                            <h4 className="text-xl font-black italic tracking-tighter uppercase">{criticalThreats.length > 0 ? 'Elevated Risk' : 'Standard Operations'}</h4>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{criticalThreats.length > 0 ? 'Critical intervention recommended.' : 'Fleet architecture is stable.'}</p>
                        </div>
                    </div>

                    <div className="premium-card p-10 space-y-8">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[.4em] mb-4">Recent Security Audits</h3>
                        <div className="space-y-6">
                            {projects.slice(0, 4).map((p: any, i: number) => {
                                const hasCritical = p.history?.[0]?.analysis?.security_perimeter?.threats?.some((t: any) => t.severity === 'Critical');
                                return (
                                    <div key={i} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-2 h-2 rounded-full ${hasCritical ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]' : 'bg-emerald-500 shadow-[0_0_10px_#10b981]'}`} />
                                            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest group-hover:text-white transition-colors">{p.name}</span>
                                        </div>
                                        <span className="text-[10px] text-slate-600 font-mono tracking-tighter">T-2HR</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Threat Detail Modal */}
            <AnimatePresence>
                {selectedThreat && (
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
                            className="premium-card w-full max-w-4xl bg-[#0d1117] p-16 shadow-[0_0_100px_rgba(0,0,0,0.8)] relative overflow-hidden"
                        >
                            <div className={`absolute top-0 left-0 w-full h-2 ${selectedThreat.severity === 'Critical' ? 'bg-gradient-to-r from-rose-500 to-orange-500' : 'bg-gradient-to-r from-orange-500 to-amber-500'}`} />

                            <div className="flex justify-between items-start mb-12">
                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`p-4 rounded-2xl flex items-center justify-center ${selectedThreat.severity === 'Critical' ? 'bg-rose-500/20 text-rose-500 shadow-xl shadow-rose-500/10' : 'bg-orange-500/20 text-orange-500'}`}>
                                            <AlertTriangle className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h2 className="text-4xl font-black italic tracking-tighter uppercase">{selectedThreat.vector}</h2>
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[.4em]">Target Node: {selectedThreat.projectName}</span>
                                        </div>
                                    </div>
                                </div>
                                <button suppressHydrationWarning onClick={() => setSelectedThreat(null)} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-slate-500 hover:text-white">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-12">
                                <div className="p-8 bg-white/5 rounded-[2rem] border border-white/5">
                                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Threat Signature Description</h4>
                                    <p className="text-sm text-white font-medium leading-relaxed">
                                        {selectedThreat.description}
                                    </p>
                                </div>

                                <div className="p-8 bg-indigo-500/5 rounded-[2rem] border border-indigo-500/10 relative overflow-hidden">
                                    <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[80px] pointer-events-none" />
                                    <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-3">
                                        <Activity className="w-4 h-4" /> Neural Remediation Strategy
                                    </h4>
                                    <p className="text-sm text-slate-300 font-medium italic">
                                        {selectedThreat.remediation}
                                    </p>

                                    <div className="mt-8 pt-6 border-t border-indigo-500/10 flex justify-end">
                                        <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 shadow-xl shadow-indigo-600/20 flex items-center gap-2">
                                            <RefreshCw className="w-4 h-4" /> Autonomously Apply Patch
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ArrowUpRight(props: any) { return <ChevronRight {...props} /> }
