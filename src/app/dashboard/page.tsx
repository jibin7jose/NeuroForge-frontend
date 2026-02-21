"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    MoreVertical,
    Code2,
    Cpu,
    Zap,
    CheckCircle2,
    AlertCircle,
    Target,
    Dna,
    X,
    Github,
    Filter,
    RefreshCw,
    ExternalLink,
    ChevronRight,
    Link2,
    Copy,
    Info,
    Activity,
    Shield,
    ShieldAlert,
    Globe,
    ArrowUpRight,
    Layout
} from "lucide-react";
import Link from "next/link";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    AreaChart, Area, PieChart, Pie, Cell
} from "recharts";
import { getProjects, importProject, getBackendHealth, getAssistantProfile, getSkills, getWeaknesses, getTrends } from "@/lib/api";

export default function DashboardPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showImportModal, setShowImportModal] = useState(false);
    const [repoUrl, setRepoUrl] = useState('');
    const [importing, setImporting] = useState(false);
    const [backendHealth, setBackendHealth] = useState<any>(null);
    const [assistantProfile, setAssistantProfile] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [skills, setSkills] = useState<any[]>([]);
    const [weaknesses, setWeaknesses] = useState<any[]>([]);
    const [trends, setTrends] = useState<any[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const filteredProjects = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return projects;
        return projects.filter((p) =>
            (p.name || "").toLowerCase().includes(q) ||
            (p.description || "").toLowerCase().includes(q) ||
            (p.repositoryUrl || "").toLowerCase().includes(q)
        );
    }, [projects, searchQuery]);

    const avgHealth = useMemo(() => {
        if (!projects.length) return 0;
        const total = projects.reduce((sum, p) => sum + (p.healthScore || 0), 0);
        return Math.round(total / projects.length);
    }, [projects]);

    const chartData = useMemo(() => {
        if (trends.length === 0) {
            return [
                { name: '00:00', val: 65 }, { name: '04:00', val: 78 },
                { name: '08:00', val: 72 }, { name: '12:00', val: 85 },
                { name: '16:00', val: 92 }, { name: '20:00', val: 88 }
            ];
        }
        return trends.map((t, idx) => ({
            name: t.scannedAt ? new Date(t.scannedAt).toLocaleDateString() : `T${idx + 1}`,
            val: t.score ?? 0
        }));
    }, [trends]);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [projData, healthData, profileData, skillsData, weaknessData, trendData] = await Promise.all([
                getProjects(),
                getBackendHealth(),
                getAssistantProfile(),
                getSkills(selectedProjectId || undefined),
                getWeaknesses(selectedProjectId || undefined),
                getTrends(selectedProjectId || undefined)
            ]);
            setProjects(projData);
            setBackendHealth(healthData);
            setAssistantProfile(profileData);
            setSkills(skillsData);
            setWeaknesses(weaknessData);
            setTrends(trendData);
            if (!selectedProjectId && projData.length) {
                setSelectedProjectId(projData[0].id);
            }
        } catch (error) {
            console.error("Dashboard fetch failed", error);
            setBackendHealth({ status: 'degraded' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedProjectId]);

    const handleImport = async () => {
        setImporting(true);
        try {
            const result = await importProject(repoUrl);
            if (result.status === 'success') {
                const updated = await getProjects();
                setProjects(updated);
                setShowImportModal(false);
                setRepoUrl('');
            }
        } catch (error) { } finally { setImporting(false); }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#02040a] p-8 space-y-12 relative overflow-hidden bg-neural-matrix">
            {/* Cinematic Background Accents */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Header / Hero Row */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 relative z-10">
                <div className="space-y-2">
                    <h1 className="text-5xl font-black tracking-tighter italic flex items-center gap-6 font-display">
                        COMMAND <span className="text-gradient-vibrant">CENTER</span>
                        <span className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-transparent rounded-full" />
                    </h1>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-[.2em] font-sans">Monitoring {projects.length} neural nodes in the global fleet.</p>
                </div>

                <div className="flex items-center gap-6">
                    <div className="premium-card px-8 py-3 flex items-center gap-8 bg-white/[0.02]">
                        <div className="flex items-center gap-4">
                            <div className={`w-2.5 h-2.5 rounded-full ${backendHealth?.status === 'ok' ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]`} />
                            <span className="text-[11px] font-black uppercase tracking-[.3em] text-slate-500">System_Status</span>
                        </div>
                        <div className="h-5 w-px bg-white/10" />
                        <span className="text-xs font-black text-white italic tracking-tighter">{backendHealth?.status === 'ok' ? 'OPERATIONAL' : 'DEGRADED'}</span>
                    </div>

                    <button
                        suppressHydrationWarning
                        onClick={() => setShowImportModal(true)}
                        className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-[11px] font-black tracking-[.2em] transition-all shadow-2xl shadow-indigo-600/30 active:scale-95 flex items-center gap-3 uppercase"
                    >
                        <Plus className="w-4 h-4" /> Integrate Source
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatWidget label="AVG_FLEET_HEALTH" value={`${avgHealth}%`} trend="+4.2%" icon={<Activity className="text-indigo-400" />} />
                <StatWidget label="SYNC_LATENCY" value="12ms" trend="-2ms" icon={<Zap className="text-amber-400" />} />
                <StatWidget label="SECURITY_VULN" value="0" trend="STABLE" icon={<Shield className="text-emerald-400" />} color="text-emerald-400" />
                <StatWidget label="COMPLEXITY_BIAS" value="LOW" trend="O(1)" icon={<Dna className="text-purple-400" />} />
            </div>

            {/* Project Nodes */}
            <div className="premium-card p-10 relative overflow-hidden bg-white/[0.01]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] -translate-y-1/2 translate-x-1/2" />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 font-display italic">
                            <Code2 className="w-6 h-6 text-indigo-400" /> ACTIVE_RESOURCE_NODES
                        </h2>
                        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Neural mesh deployment status and health telemetry.</p>
                    </div>
                    <div className="relative w-full lg:w-96">
                        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="FILTER_BY_HASH_OR_NAME..."
                            className="w-full bg-[#02040a]/50 border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-indigo-500/30 transition-all placeholder:text-slate-800"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="h-64 flex flex-col items-center justify-center gap-4 border border-dashed border-white/5 rounded-[2rem] bg-white/[0.01]">
                        <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-[.4em]">Resyncing Nodes...</span>
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="border border-dashed border-white/5 rounded-[2rem] p-16 text-center space-y-6 bg-white/[0.01]">
                        <p className="font-black text-xl italic text-slate-500">NO_REPOSITORIES_MAPPED</p>
                        <button
                            onClick={() => setShowImportModal(true)}
                            className="inline-flex items-center gap-3 px-8 py-3 bg-white text-black hover:bg-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
                        >
                            <Plus className="w-4 h-4" /> Initialize Hub
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                whileHover={{ y: -5, scale: 1.02 }}
                                onClick={() => setSelectedProjectId(project.id)}
                                className={`premium-card p-6 !rounded-3xl cursor-pointer group relative overflow-hidden transition-all duration-500 ${selectedProjectId === project.id ? 'border-indigo-500/40 bg-indigo-500/[0.03] shadow-[0_0_40px_rgba(99,102,241,0.1)]' : 'border-white/5 hover:border-white/10'}`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <span className="px-2.5 py-1 bg-white/5 rounded-lg text-[9px] font-black uppercase tracking-widest text-indigo-400 border border-white/5">0x{project.id.toString(16).padStart(4, '0')}</span>
                                            <span className="text-[9px] text-slate-600 uppercase font-black tracking-widest">{project.repositoryUrl ? 'EXTERNAL_SYNC' : 'LOCAL_VOL'}</span>
                                        </div>
                                        <h3 className="text-lg font-black italic tracking-tighter truncate max-w-[200px]">{project.name}</h3>
                                        <p className="text-[11px] text-slate-500 font-medium line-clamp-2 leading-relaxed">{project.description || 'Autonomous structural analysis segment.'}</p>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded-xl border border-white/5 group-hover:bg-indigo-500/10 transition-colors">
                                        <MoreVertical className="w-4 h-4 text-slate-600" />
                                    </div>
                                </div>

                                <div className="mt-8 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">INTEGRITY_INDEX</span>
                                        <span className={`text-sm font-black italic ${project.healthScore > 80 ? 'text-emerald-400' : 'text-amber-400'}`}>{project.healthScore}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden p-[1px]">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${project.healthScore}%` }}
                                            transition={{ duration: 1, ease: 'easeOut' }}
                                            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                        <span className="text-[9px] text-slate-600 font-mono truncate max-w-[150px]">{project.repositoryUrl || 'LOCAL_RESOURCES'}</span>
                                        <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-indigo-400 transition-colors" />
                                    </div>
                                </div>

                                {selectedProjectId === project.id && (
                                    <div className="absolute top-0 right-0 px-3 py-1 bg-indigo-500 text-white text-[8px] font-black uppercase tracking-widest rounded-bl-xl shadow-lg">ACTIVE</div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Skills & Weaknesses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                <div className="premium-card p-10 group overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/40 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center justify-between mb-10">
                        <div className="space-y-1">
                            <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3 font-display italic">
                                <Zap className="w-5 h-5 text-purple-400" /> NEURAL_SKILL_SIGNALS
                            </h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Autonomous mapping of technical proficiency.</p>
                        </div>
                        <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg text-[9px] font-black text-purple-400 uppercase tracking-widest">
                            {selectedProjectId ? `NODE_0x${selectedProjectId.toString(16).toUpperCase()}` : 'LIVE_FLEET'}
                        </div>
                    </div>

                    {skills.length === 0 ? (
                        <div className="h-48 flex items-center justify-center border border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[.4em]">Awaiting Telemetry...</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {skills.slice(0, 4).map((s) => (
                                <motion.div
                                    key={s.id}
                                    whileHover={{ x: 5 }}
                                    className="p-5 bg-white/[0.02] border border-white/5 rounded-[1.5rem] hover:bg-white/[0.04] hover:border-white/10 transition-all cursor-default"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                                <Cpu className="w-4 h-4 text-purple-400" />
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Resource Segment</p>
                                                <p className="text-sm font-black italic tracking-tighter">{s.project?.name}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] text-slate-600 uppercase font-black tracking-widest">Cycle_ID</p>
                                            <p className="text-[10px] font-mono text-purple-400 font-bold">#{s.lastRun?.id?.toString().padStart(3, '0') ?? '---'}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
                                        <div className="space-y-1">
                                            <p className="text-[8px] text-slate-600 uppercase font-black tracking-[.2em]">Languages</p>
                                            <div className="flex flex-wrap gap-1">
                                                {Object.keys(s.languageScores || {}).map(l => (
                                                    <span key={l} className="text-[10px] font-black text-slate-300">{l}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[8px] text-slate-600 uppercase font-black tracking-[.2em]">Frameworks</p>
                                            <div className="flex flex-wrap gap-1">
                                                {Object.keys(s.frameworkScores || {}).map(f => (
                                                    <span key={f} className="text-[10px] font-black text-slate-400">{f}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[8px] text-slate-600 uppercase font-black tracking-[.2em]">Confidence</p>
                                            <p className="text-xs font-black text-emerald-500 italic">OPTIMAL</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="premium-card p-10 group overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500/0 via-amber-500/40 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center justify-between mb-10">
                        <div className="space-y-1">
                            <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3 font-display italic">
                                <ShieldAlert className="w-5 h-5 text-amber-400" /> CRITICAL_WEAK_AREAS
                            </h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Predictive debt and architectural risk detection.</p>
                        </div>
                        <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg text-[9px] font-black text-amber-400 uppercase tracking-widest">
                            LEVEL_4_ALERT
                        </div>
                    </div>

                    {weaknesses.length === 0 ? (
                        <div className="h-48 flex items-center justify-center border border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
                            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[.4em]">System Integrity Nominal</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {weaknesses.slice(0, 5).map((w, idx) => (
                                <motion.div
                                    key={w.id}
                                    whileHover={{ x: -5 }}
                                    className="p-5 bg-white/[0.02] border border-white/5 rounded-[1.5rem] hover:bg-white/[0.04] hover:border-amber-500/10 transition-all cursor-default flex items-start gap-4"
                                >
                                    <div className={`mt-1 w-2 h-2 rounded-full ${idx === 0 ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]' : 'bg-amber-500 animate-pulse'}`} />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest">{w.category}</p>
                                            <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">Project #{w.project?.id}</span>
                                        </div>
                                        <p className="text-sm font-bold text-slate-200 leading-tight mb-2 tracking-tight">{w.description}</p>
                                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-amber-500/20 w-[45%]" />
                                        </div>
                                    </div>
                                    <button className="p-2 hover:bg-white/5 rounded-lg transition-all text-slate-600 hover:text-white">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Visualization Card */}
                <div className="lg:col-span-2 premium-card p-10 group overflow-hidden relative">
                    <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[100px] pointer-events-none" />
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-xl font-black italic tracking-tight uppercase">FLEET_EVOLUTION_METRICS</h3>
                            <p className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-widest">
                                {selectedProjectId ? `Project #${selectedProjectId} Trend` : 'Global Intelligence Flow'}
                            </p>
                        </div>
                        <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[10px] font-black uppercase text-indigo-400 focus:outline-none">
                            <option>Realtime Feed</option>
                            <option>Historial Data</option>
                        </select>
                    </div>

                    <div className="h-[350px] w-full min-w-0">
                        {mounted ? (
                            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', background: '#0d1117', border: '1px solid rgba(255,255,255,0.1)' }}
                                        itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
                                    />
                                    <Area type="monotone" dataKey="val" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full w-full shimmer rounded-2xl bg-white/5" />
                        )}
                    </div>
                </div>

                {/* Side Info Cards */}
                <div className="space-y-8">
                    <div className="premium-card p-8 bg-gradient-to-br from-indigo-600/10 to-transparent">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
                                <Cpu className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div>
                                <h4 className="text-sm font-black uppercase tracking-tight">AI Engine v3.0</h4>
                                <p className="text-[11px] text-slate-500 font-bold">Neural Mapping Active</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <p className="text-xs text-slate-400 leading-relaxed font-medium capitalize">
                                "The engine has identified significant modularity improvements in the latest sync cycle."
                            </p>
                            <Link href="/dashboard/intelligence">
                                <button className="w-full py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                                    Analyze DNA Profile <ArrowUpRight className="w-3.5 h-3.5" />
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="premium-card p-8">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[.2em] mb-6">Active Resource Nodes</h4>
                        <div className="space-y-4">
                            {projects.slice(0, 3).map((p) => (
                                <div key={p.id} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                            <Globe className="w-4 h-4 text-indigo-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold group-hover:text-indigo-400 transition-colors uppercase">{p.name}</div>
                                            <div className="text-[9px] text-slate-500 font-mono tracking-tighter">ID: {p.id.toString(16).toUpperCase()}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs font-black text-emerald-400">{p.healthScore}%</div>
                                        <div className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Health</div>
                                    </div>
                                </div>
                            ))}
                            <Link href="/dashboard/intelligence" className="block text-center pt-4 text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors">
                                View Entire Fleet (50 Nodes)
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row - More Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10 pb-12">
                <div className="lg:col-span-1 premium-card p-10 flex flex-col items-center justify-center text-center group relative overflow-hidden bg-white/[0.01]">
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[.3em] mb-10">CAPACITY_UTILIZATION</h4>
                    <div className="relative w-40 h-40 flex items-center justify-center mb-10">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                            <motion.circle
                                initial={{ strokeDashoffset: 452.4 }}
                                animate={{ strokeDashoffset: 452.4 * (1 - projects.length / 50) }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="12" fill="transparent"
                                strokeDasharray={452.4}
                                className="text-indigo-500 drop-shadow-[0_0_20px_rgba(99,102,241,0.6)]"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black italic tracking-tighter text-white">{projects.length}</span>
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">/ 50 NODES</span>
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-[.2em] opacity-60">Fleet Threshold: Nominal</p>
                </div>

                <div className="lg:col-span-3 premium-card p-0 overflow-hidden relative bg-white/[0.01]">
                    <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center">
                                <Activity className="w-5 h-5 text-indigo-400" />
                            </div>
                            <div>
                                <h4 className="text-lg font-black italic uppercase tracking-tighter">System Intelligence_Stream</h4>
                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Real-time neural event telemetry</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                            <span className="text-[10px] font-black text-emerald-400 tracking-widest uppercase">Live_Pulse</span>
                        </div>
                    </div>
                    <div className="p-8 space-y-2">
                        <EventEntry icon={<RefreshCw className="text-indigo-400" />} text="NeuroSync Multi-Node Deployment: Fleet Alpha successfully re-indexed across 14 computational segments." time="2m ago" />
                        <EventEntry icon={<ShieldAlert className="text-rose-500" />} text="High-Latency Detection: Structural drift identified in project segment 'X-Prime_Core'. Immediate re-scan recommended." time="15m ago" />
                        <EventEntry icon={<Link2 className="text-emerald-400" />} text="Source Connectivity Established: Secure tunnel verified for repository 'NeuralForge-V3/kernel-bridge'." time="1h ago" />
                    </div>
                </div>
            </div>

            {/* Import Modal */}
            <AnimatePresence>
                {showImportModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#02040a]/90 backdrop-blur-2xl"
                            onClick={() => setShowImportModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className="relative bg-[#0d1117] border border-white/10 max-w-2xl w-full rounded-[3rem] p-12 shadow-[0_0_150px_rgba(99,102,241,0.2)] overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-size-200 animate-gradient-x" />
                            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-500/10 blur-[100px] pointer-events-none" />

                            <div className="flex items-center justify-between mb-16 relative z-10">
                                <div className="flex items-center gap-6">
                                    <div className="p-4 bg-white/5 rounded-3xl border border-white/10 shadow-inner">
                                        <Github className="w-10 h-10 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-4xl font-black italic uppercase tracking-tighter">SOURCE_INTEGRATION</h2>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[.4em] mt-1">MAPPING EXTERNAL DIGITAL NODES</p>
                                    </div>
                                </div>
                                <button onClick={() => setShowImportModal(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5 group">
                                    <X className="w-6 h-6 text-slate-500 group-hover:text-white transition-colors" />
                                </button>
                            </div>

                            <AnimatePresence mode="wait">
                                {!importing ? (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-12 relative z-10"
                                    >
                                        <div className="space-y-4">
                                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[.4em] block pl-1">Target Repository Fingerprint (URL)</label>
                                            <input
                                                type="text"
                                                value={repoUrl}
                                                onChange={(e) => setRepoUrl(e.target.value)}
                                                placeholder="https://github.com/organization/project-segment"
                                                className="w-full bg-[#02040a]/80 border border-white/5 rounded-3xl px-8 py-6 focus:outline-none focus:border-indigo-500/30 transition-all text-sm font-mono placeholder:text-slate-800 shadow-inner"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <button className="py-5 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-slate-400 italic">Advanced Config</button>
                                            <button className="py-5 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-slate-400 italic">Auth Settings</button>
                                        </div>

                                        <button
                                            onClick={handleImport}
                                            disabled={!repoUrl}
                                            className="w-full py-8 bg-white text-black rounded-3xl text-sm font-black transition-all disabled:opacity-50 flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(255,255,255,0.1)] active:scale-95 group"
                                        >
                                            INITIALIZE_NEURAL_MAPPING
                                            <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <VisualAnalysisConsole url={repoUrl} />
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function VisualAnalysisConsole({ url }: { url: string }) {
    const [logs, setLogs] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);
    const logPool = [
        "ESTABLISHING_SECURE_TUNNEL...",
        "CLONING_RECURSIVE_DEPENDENCIES...",
        "INITIALIZING_AST_MESH_PARSER...",
        "EXTRACTING_BEHAVIORAL_DNA_SEQUENCES...",
        "MAPPING_SEMANTIC_NODES TO_KNOWLEDGE_GRAPH...",
        "EXECUTING_BENCHMARK_CORRELATION...",
        "CALCULATING_EVOLUTION_VELOCITY...",
        "SYNTHESIZING_INTELLIGENCE_PROFILE...",
        "DEPLOING_NEURAL_MONITORING_AGENTS..."
    ];

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < logPool.length) {
                setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${logPool[i]}`]);
                setProgress(Math.round(((i + 1) / logPool.length) * 100));
                i++;
            } else {
                setLogs(prev => [...prev, "SYNC_COMPLETE. FINALIZING PERSISTENCE..."]);
                clearInterval(interval);
            }
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8 relative z-10"
        >
            <div className="bg-[#02040a] rounded-3xl border border-white/5 p-8 font-mono text-[10px] h-64 overflow-y-auto custom-scrollbar flex flex-col gap-2 shadow-inner">
                {logs.map((log, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={i === logs.length - 1 ? "text-indigo-400 font-bold" : "text-slate-600"}
                    >
                        <span className="opacity-40">{">>"}</span> {log}
                    </motion.div>
                ))}
                <div className="animate-pulse text-indigo-500/50">_</div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Neural Sync Status</span>
                        <div className="text-xl font-black italic tracking-tighter text-white">
                            {progress < 100 ? `SYNCING_SOURCE: ${progress}%` : 'NODES_SYNCHRONIZED'}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-400">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Active_Mesh</span>
                    </div>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden p-[1px] border border-white/5">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                    />
                </div>
            </div>
        </motion.div>
    );
}

function StatWidget({ label, value, trend, icon, color = "text-white" }: any) {
    return (
        <motion.div whileHover={{ y: -5 }} className="premium-card p-8 group relative overflow-hidden bg-white/[0.01]">
            <div className="absolute right-[-10%] bottom-[-10%] p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                {icon}
            </div>
            <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-[.3em]">{label}</span>
                <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 group-hover:bg-indigo-500/10 transition-colors shadow-inner">
                    {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { className: "w-4.5 h-4.5" })}
                </div>
            </div>
            <div className="flex items-end justify-between">
                <span className={`text-5xl font-black italic tracking-tighter ${color}`}>{value}</span>
                <div className="flex flex-col items-end mb-1">
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Delta</span>
                    <span className="text-[10px] font-black text-indigo-400 tracking-widest uppercase">{trend}</span>
                </div>
            </div>
        </motion.div>
    );
}

function EventEntry({ icon, text, time }: any) {
    return (
        <div className="flex items-start justify-between group p-3 hover:bg-white/[0.02] rounded-2xl transition-all border border-transparent hover:border-white/5">
            <div className="flex items-start gap-4">
                <div className="p-2.5 bg-[#02040a] rounded-xl border border-white/5 group-hover:border-indigo-500/30 transition-all shadow-inner mt-1">
                    {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { className: "w-4 h-4" })}
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-slate-300 font-bold leading-tight tracking-tight group-hover:text-white transition-colors">{text}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{time}</span>
                        <div className="w-1 h-1 bg-slate-800 rounded-full" />
                        <span className="text-[9px] font-black text-indigo-500/50 uppercase tracking-widest">Verified_Log</span>
                    </div>
                </div>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-700 opacity-0 group-hover:opacity-100 transition-all" />
        </div>
    );
}
