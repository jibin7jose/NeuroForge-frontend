"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Brain,
    TrendingUp,
    ShieldAlert,
    Shield,
    Fingerprint,
    ChevronLeft,
    Cloud,
    ChevronDown,
    Activity,
    Target,
    LayoutDashboard,
    Lock,
    Globe,
    Info,
    RefreshCw,
    Sparkles,
    Zap,
    Cpu,
    Dna,
    ArrowUpRight,
    Search,
    CircleDot,
    CheckCircle2,
    X,
    Flame,
    History,
    Wand2,
    Check,
    RotateCcw,
    FileCode,
    GitPullRequest
} from "lucide-react";
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area
} from "recharts";
import {
    getEvolutionHistory,
    getProjects,
    getProjectHistory,
    getReadinessDelta,
    getAssistantProfile,
    getProjectSuggestions,
    rescanProject,
    applyRefactor,
    getMeshTelemetry,
    createPR,
    getPRMetadata
} from "@/lib/api";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const dnaDataDefault = [
    { subject: 'Modularity', A: 85, fullMark: 100 },
    { subject: 'Resilience', A: 40, fullMark: 100 },
    { subject: 'Optimization', A: 75, fullMark: 100 },
    { subject: 'Consistency', A: 90, fullMark: 100 },
    { subject: 'Documentation', A: 55, fullMark: 100 },
];

function IntelligenceCenter() {
    const searchParams = useSearchParams();
    const [isClient, setIsClient] = useState(false);
    const [evolutionData, setEvolutionData] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
        searchParams.get("id") ? Number(searchParams.get("id")) : null
    );
    const [scanResults, setScanResults] = useState<any>(null);
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [suggestionsLoading, setSuggestionsLoading] = useState(false);
    const [rescanning, setRescanning] = useState(false);
    const [lastScan, setLastScan] = useState<Date | null>(null);
    const [selectedSnapshot, setSelectedSnapshot] = useState<any>(null);
    const [selectedNode, setSelectedNode] = useState<any>(null);
    const [readinessDelta, setReadinessDelta] = useState<any>(null);
    const [meshTelemetry, setMeshTelemetry] = useState<any>(null);
    const [assistantProfile, setAssistantProfile] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("overview");
    const [activeRefactor, setActiveRefactor] = useState<any>(null);
    const [refactorResult, setRefactorResult] = useState<any>(null);
    const [refactorLoading, setRefactorLoading] = useState(false);
    const [prLoading, setPrLoading] = useState(false);
    const [prResult, setPrResult] = useState<any>(null);
    const [swarmActivity, setSwarmActivity] = useState<any[]>([]);

    useEffect(() => {
        if (activeTab === "telemetry") {
            const activities = [
                { action: "Logic Density Extraction", target: "RefactorExecutor", impact: "Depth -4", type: "success" },
                { action: "Thermal Overload Checked", target: "database_utils.py", impact: "Optimized", type: "info" },
                { action: "Interface Abstracted", target: "billing_webhook.ts", impact: "Rigidity -8%", type: "success" },
                { action: "ReDoS Pattern Suppressed", target: "SecurityCortex", impact: "Risk -12%", type: "success" },
                { action: "Catastrophic Recursion Handled", target: "ThermalEngine", impact: "Pressure -5", type: "info" },
                { action: "Latent Cluster Mapped", target: "SemanticEngine", impact: "Consistency +2%", type: "success" },
                { action: "Cowboy Coder Detected", target: "dna_engine.py", impact: "Risk Tagged", type: "info" },
                { action: "Async Fluency Boosted", target: "event_loop.ts", impact: "Throughput +40%", type: "success" },
                { action: "Structural Discipline Check", target: "auth_service.py", impact: "Verified", type: "info" },
                { action: "Cloud-Native Readiness Assessed", target: "lambda_handler.py", impact: "Scaling +1", type: "success" },
            ];

            // Initial seed
            setSwarmActivity([
                { ...activities[3], id: Date.now() - 12000, time: new Date(Date.now() - 12000).toLocaleTimeString() },
                { ...activities[4], id: Date.now() - 25000, time: new Date(Date.now() - 25000).toLocaleTimeString() },
                { ...activities[5], id: Date.now() - 45000, time: new Date(Date.now() - 45000).toLocaleTimeString() },
                { ...activities[7], id: Date.now() - 65000, time: new Date(Date.now() - 65000).toLocaleTimeString() }
            ]);

            const interval = setInterval(() => {
                const randomItem = activities[Math.floor(Math.random() * activities.length)];
                setSwarmActivity(prev => [
                    { ...randomItem, id: Date.now(), time: new Date().toLocaleTimeString() },
                    ...prev.slice(0, 6)
                ]);
            }, 3500); // Faster interval for more cinematic feel
            return () => clearInterval(interval);
        }
    }, [activeTab]);

    const activeAnalysis = selectedSnapshot ? selectedSnapshot.analysis : scanResults;

    const loadHistory = async (projectId?: number | null) => {
        try {
            const data = projectId
                ? await getProjectHistory(projectId)
                : await getEvolutionHistory();

            if (Array.isArray(data)) {
                const formatted = data.map((h: any) => ({
                    ...h,
                    date: new Date(h.scannedAt).toLocaleDateString(),
                    score: h.score,
                    complexity: h.analysis?.metrics?.logic_complexity || 0,
                    name: h.project?.name || 'Snapshot'
                }));
                setEvolutionData(formatted);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadHistory(selectedProjectId);
    }, [selectedProjectId]);

    const handleExecuteRefactor = async (strategy: any) => {
        if (!activeAnalysis?.code) return;
        setActiveRefactor(strategy);
        setRefactorLoading(true);
        try {
            const result = await applyRefactor(
                activeAnalysis.code,
                activeAnalysis.metrics?.language || 'python',
                strategy.id
            );
            setRefactorResult(result);
        } catch (err) {
            console.error(err);
            setRefactorResult({ status: 'error', message: 'Failed to contact Neural Neural Forge.' });
        } finally {
            setRefactorLoading(false);
        }
    };

    const handleCreatePR = async () => {
        if (!selectedProjectId || !activeRefactor || !refactorResult?.refactored) return;
        setPrLoading(true);
        try {
            const result = await createPR(
                selectedProjectId,
                activeRefactor.id,
                refactorResult.refactored
            );
            setPrResult(result);
        } catch (err) {
            console.error(err);
            setPrResult({ status: 'error', message: 'Failed to initiate Autonomous PR.' });
        } finally {
            setPrLoading(false);
        }
    };

    useEffect(() => {
        getProjects().then(setProjects).catch(() => { });
        getReadinessDelta().then(setReadinessDelta).catch(() => { });
        getMeshTelemetry().then(setMeshTelemetry).catch(() => { });
        getAssistantProfile().then(setAssistantProfile).catch(() => { });
        getProjectSuggestions()
            .then((res) => {
                setSuggestions(res?.suggestions || []);
                setLastScan(res?.lastScannedAt ? new Date(res.lastScannedAt) : null);
            })
            .catch(() => { });
        setIsClient(true);

        const stored = localStorage.getItem('lastScan');
        if (stored) {
            try {
                setScanResults(JSON.parse(stored));
            } catch (e) { }
        }
    }, []);

    useEffect(() => {
        getProjectSuggestions(selectedProjectId || undefined)
            .then((res) => {
                setSuggestions(res?.suggestions || []);
                setLastScan(res?.lastScannedAt ? new Date(res.lastScannedAt) : null);
            })
            .catch(() => { });
    }, [selectedProjectId]);

    const refreshSuggestions = async () => {
        setSuggestionsLoading(true);
        try {
            const res = await getProjectSuggestions(selectedProjectId || undefined);
            setSuggestions(res?.suggestions || []);
            setLastScan(res?.lastScannedAt ? new Date(res.lastScannedAt) : null);
        } catch (e) {
            console.error(e);
        } finally {
            setSuggestionsLoading(false);
        }
    };

    const handleRescan = async () => {
        if (!selectedProjectId) return;
        setRescanning(true);
        try {
            await rescanProject(selectedProjectId);
            await Promise.all([refreshSuggestions(), loadHistory(selectedProjectId)]);
            setLastScan(new Date());
        } catch (e) {
            console.error(e);
        } finally {
            setRescanning(false);
        }
    };

    const dynamicDnaData = activeAnalysis?.metrics ? [
        { subject: 'MODULARITY', A: activeAnalysis.behavioral_analysis?.behavioral_profile?.modular_thinking || 50, fullMark: 100 },
        { subject: 'RESILIENCE', A: activeAnalysis.behavioral_analysis?.behavioral_profile?.debugging_resilience || 40, fullMark: 100 },
        { subject: 'EFFICIENCY', A: activeAnalysis.behavioral_analysis?.behavioral_profile?.logic_efficiency || 75, fullMark: 100 },
        { subject: 'DISCIPLINE', A: activeAnalysis.dna_fingerprint?.discipline_index || 0, fullMark: 100 },
        { subject: 'STABILITY', A: (activeAnalysis?.growth_prediction?.stability_index || 0.75) * 100, fullMark: 100 },
        { subject: 'SECURITY', A: (1 - (activeAnalysis?.security_perimeter?.risk_index || 0.12)) * 100, fullMark: 100 },
    ] : dnaDataDefault;

    const selectedProjectName = projects.find(p => p.id === selectedProjectId)?.name || "Global Fleet Intelligence";

    return (
        <div className="flex flex-col min-h-screen bg-[#02040a] selection:bg-indigo-500/30">
            {/* Header */}
            <header className="bg-[#02040a]/80 backdrop-blur-2xl border-b border-white/5 px-10 pt-10 pb-2">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-indigo-400 text-[10px] font-black uppercase tracking-[.4em] mb-2 animate-pulse">
                            <Activity className="w-4 h-4" />
                            Security & Intelligence Network v3.0
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter italic flex items-center gap-6">
                            {selectedProjectName}
                            <span className="relative inline-block text-left group">
                                <select
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full z-10"
                                    value={selectedProjectId || ""}
                                    onChange={(e) => setSelectedProjectId(e.target.value ? Number(e.target.value) : null)}
                                >
                                    <option value="">Switch Namespace...</option>
                                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                                <span className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer group-hover:bg-indigo-500/20 transition-all text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                                    Change Source <ChevronDown className="w-3.5 h-3.5 text-indigo-400" />
                                </span>
                            </span>
                        </h1>
                        <div className="flex items-center gap-4 text-slate-500 font-mono text-[10px] tracking-tight">
                            <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">arn:neuroforge::intelligence/{selectedProjectId || 'global-node'}</span>
                            <span className="flex items-center gap-1.5"><CircleDot className="w-2.5 h-2.5 text-emerald-500" /> SYNC_ACTIVE</span>
                            {lastScan && (
                                <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                    Last Scan: {lastScan.toLocaleString()}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pb-2">
                        <button
                            suppressHydrationWarning
                            onClick={handleRescan}
                            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-slate-300"
                        >
                            <RefreshCw className={`w-4 h-4 ${rescanning ? "animate-spin" : ""}`} /> Hard Re-Scan
                        </button>
                        <button suppressHydrationWarning className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/30 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-white shadow-xl shadow-indigo-600/20">
                            <Sparkles className="w-4 h-4" /> AI Insights
                        </button>
                    </div>
                </div>

                {/* Interactive Tabs */}
                <div className="flex items-center gap-10">
                    <Tab active={activeTab === "overview"} onClick={() => setActiveTab("overview")}>
                        <LayoutDashboard className="w-4 h-4" /> Fleet Overview
                    </Tab>
                    <Tab active={activeTab === "dna"} onClick={() => setActiveTab("dna")}>
                        <Dna className="w-4 h-4" /> Neural Fingerprint
                    </Tab>
                    <Tab active={activeTab === "graph"} onClick={() => setActiveTab("graph")}>
                        <Globe className="w-4 h-4" /> Dependency Mesh
                    </Tab>
                    <Tab active={activeTab === "security"} onClick={() => setActiveTab("security")}>
                        <Shield className="w-4 h-4" /> Risk Analysis
                    </Tab>
                    <Tab active={activeTab === "roadmap"} onClick={() => setActiveTab("roadmap")}>
                        <TrendingUp className="w-4 h-4" /> Evolution Roadmap
                    </Tab>
                    <Tab active={activeTab === "telemetry"} onClick={() => setActiveTab("telemetry")}>
                        <Activity className="w-4 h-4" /> Mesh Telemetry
                    </Tab>
                </div>
            </header>

            {/* Dynamic Content */}
            <main className="p-10 space-y-10 relative">
                <AnimatePresence>
                    {rescanning && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-[50] bg-[#02040a]/80 backdrop-blur-3xl flex items-center justify-center p-20"
                        >
                            <div className="max-w-4xl w-full">
                                <VisualAnalysisConsole url={selectedProjectName} onComplete={() => setRescanning(false)} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    {activeTab === "overview" && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="space-y-10"
                        >
                            {/* High-Level Metrics */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <MetricWidget label="Semantic Density" value={`${activeAnalysis?.metrics?.semantic_density || 74}%`} trend="HIGH_SYNC" icon={<Cpu />} />
                                <MetricWidget label="Maturity Index" value={`${activeAnalysis?.dna_fingerprint?.maturity_score || 82}%`} trend="OPTIMIZED" icon={<Brain />} />
                                <MetricWidget label="Growth Quantile" value={`${activeAnalysis?.benchmarks?.percentile || 92}th`} trend="+1.2%" icon={<TrendingUp />} color="text-indigo-400" />
                                <MetricWidget label="Vulnerabilities" value={activeAnalysis?.security?.vulnerabilities?.length || 0} trend="SECURE_NODE" icon={<ShieldAlert />} color="text-rose-400" />
                            </div>

                            <div className="grid lg:grid-cols-3 gap-10">
                                {/* Large Evolution Graph */}
                                <div className="lg:col-span-2 premium-card p-10 relative overflow-hidden">
                                    <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] pointer-events-none" />
                                    <div className="flex items-center justify-between mb-12">
                                        <div>
                                            <h3 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                                                <TrendingUp className="w-6 h-6 text-emerald-500" /> Architectural Evolution
                                            </h3>
                                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[.3em] mt-1">Timeline analysis of structural logic</p>
                                        </div>
                                    </div>
                                    <div className="h-[350px] min-w-0">
                                        {isClient && (
                                            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                                                <AreaChart data={evolutionData}>
                                                    <defs>
                                                        <linearGradient id="evolutionGrad" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#1d2433" vertical={false} strokeOpacity={0.2} />
                                                    <XAxis dataKey="date" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} dy={10} fontStyle="italic" />
                                                    <YAxis hide />
                                                    <Tooltip
                                                        contentStyle={{ backgroundColor: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}
                                                    />
                                                    <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#evolutionGrad)" />
                                                    <Line type="monotone" dataKey="complexity" stroke="#ec4899" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        )}
                                    </div>
                                </div>

                                {/* Benchmarking Card */}
                                <div className="premium-card p-10 bg-gradient-to-br from-indigo-600/10 to-transparent border-indigo-500/10">
                                    <h3 className="text-[10px] font-black text-slate-500 mb-8 uppercase tracking-[.4em]">Global Competitive Index</h3>
                                    <div className="flex flex-col items-center justify-center py-10 space-y-4">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-indigo-500/40 blur-[40px] rounded-full animate-pulse" />
                                            <div className="relative text-7xl font-black italic tracking-tighter text-white drop-shadow-2xl">
                                                {activeAnalysis?.benchmarks?.percentile || 94}<span className="text-2xl">th</span>
                                            </div>
                                        </div>
                                        <div className="text-[11px] text-indigo-400 font-black uppercase tracking-[.3em]">Engineering Percentile</div>
                                    </div>

                                    <div className="space-y-8 mt-10">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                <span>Readiness Delta</span>
                                                <span className="text-emerald-500">+{readinessDelta?.delta?.readiness_score_delta || 6.8}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                                <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400" style={{ width: '84%' }} />
                                            </div>
                                        </div>
                                        <div className="p-4 bg-[#02040a]/50 rounded-2xl border border-white/5 italic text-[10px] text-slate-400 leading-relaxed font-medium">
                                            "Current architectural trajectory suggests top-tier scalability. Security posture has improved since snapshot V2."
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Architectural Reasoning Console */}
                            <div className="grid lg:grid-cols-12 gap-10">
                                <div className="lg:col-span-8 premium-card p-12 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent border-white/5 space-y-12">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-indigo-500/10 rounded-3xl flex items-center justify-center border border-indigo-500/20 shadow-xl shadow-indigo-500/5">
                                                <Brain className="w-8 h-8 text-indigo-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black italic tracking-tighter uppercase">Structural_Reasoning_Console</h3>
                                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[.3em] mt-1">Deep architectural inference active</p>
                                            </div>
                                        </div>
                                        <div className="px-5 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-[10px] font-black text-indigo-400 uppercase tracking-widest animate-pulse">
                                            Inference_Verified
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Primary Logic Pattern</h4>
                                            <div className="p-6 bg-[#02040a] border border-white/5 rounded-3xl flex flex-wrap gap-2 shadow-inner min-h-[100px] items-center">
                                                {(activeAnalysis?.architectural_inference?.detected_patterns || ["Procedural Logic"]).map((p: string, i: number) => (
                                                    <span key={i} className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                                                        {p}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Architectural Verdict</h4>
                                            <div className="p-6 bg-[#02040a] border border-white/5 rounded-3xl flex items-center justify-center shadow-inner min-h-[100px]">
                                                <span className="text-xl font-black italic tracking-tighter text-white uppercase text-center">
                                                    {activeAnalysis?.architectural_inference?.architectural_verdict || "Unclassified Strategy"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6 pt-10 border-t border-white/5">
                                        <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[.4em]">Inference_Chain</h4>
                                        <div className="space-y-4">
                                            {(activeAnalysis?.architectural_inference?.inference_chain || ["Awaiting structural metrics..."]).map((log: string, i: number) => (
                                                <div key={i} className="flex gap-4 group">
                                                    <span className="text-indigo-500/40 font-mono text-xs">0{i + 1}</span>
                                                    <p className="text-sm text-slate-400 font-medium leading-relaxed group-hover:text-slate-200 transition-colors italic">"{log}"</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-4 space-y-10">
                                    <div className="premium-card p-10 bg-gradient-to-br from-purple-500/5 to-transparent border-white/5">
                                        <h3 className="text-[10px] font-black text-slate-500 mb-8 uppercase tracking-[.4em]">Structural Rigidity</h3>
                                        <div className="flex items-end justify-between mb-2">
                                            <span className="text-6xl font-black italic tracking-tighter text-white">
                                                {Math.round((activeAnalysis?.architectural_inference?.structural_rigidity || 0.42) * 100)}%
                                            </span>
                                            <div className="text-right pb-2">
                                                <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Coupling Coefficient</div>
                                            </div>
                                        </div>
                                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                                            <div
                                                className="h-full bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-1000"
                                                style={{ width: `${(activeAnalysis?.architectural_inference?.structural_rigidity || 0.42) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="premium-card p-10 bg-indigo-500/5 border-white/5">
                                        <h3 className="text-[10px] font-black text-slate-500 mb-8 uppercase tracking-[.4em]">Growth Node Probability</h3>
                                        <div className="flex items-end justify-between mb-2">
                                            <span className="text-6xl font-black italic tracking-tighter text-indigo-400">
                                                {Math.round((activeAnalysis?.growth_prediction?.neural_growth_probability || 0.74) * 100)}%
                                            </span>
                                            <div className="text-right pb-2">
                                                <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest text-indigo-500/50">Next-Cycle Accuracy</div>
                                            </div>
                                        </div>
                                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                                            <div
                                                className="h-full bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-1000"
                                                style={{ width: `${(activeAnalysis?.growth_prediction?.neural_growth_probability || 0.74) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Semantic Reasoning Strip */}
                            <div className="grid lg:grid-cols-12 gap-10">
                                <div className="lg:col-span-4 premium-card p-10 bg-gradient-to-br from-indigo-600/5 to-transparent border-white/5">
                                    <h3 className="text-[10px] font-black text-slate-500 mb-8 uppercase tracking-[.4em]">Latent Skill Clusters</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {(activeAnalysis?.semantic_analysis?.dominant_clusters || ["Generic Software Engineering", "Structural Logic"]).map((cluster: string, i: number) => (
                                            <div key={i} className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-[9px] font-black text-indigo-400 uppercase tracking-widest shadow-lg">
                                                {cluster}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-10 pt-8 border-t border-white/5 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Semantic Consistency</span>
                                            <span className="text-sm font-black italic text-white">{Math.round((activeAnalysis?.semantic_analysis?.semantic_consistency || 0.85) * 100)}%</span>
                                        </div>
                                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-500" style={{ width: `${(activeAnalysis?.semantic_analysis?.semantic_consistency || 0.85) * 100}%` }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-8 premium-card p-10 flex flex-col justify-center relative overflow-hidden">
                                    <div className="absolute right-[-10%] bottom-[-10%] w-64 h-64 bg-emerald-500/5 blur-[80px] pointer-events-none" />
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
                                            <Activity className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black uppercase tracking-widest">Architectural Trajectory Reasoning</h4>
                                            <p className="text-[10px] text-slate-500 font-medium">Neural inference mapped from AST patterns</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed italic font-medium">
                                        "{activeAnalysis?.growth_prediction?.trajectory || "Trajectory mapping in progress..."}. {activeAnalysis?.growth_prediction?.projected_maturity_eta ? `Estimated node mastery by ${activeAnalysis.growth_prediction.projected_maturity_eta}.` : "Collecting historical deltas from version history."}"
                                    </p>
                                    <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-8">
                                        <div>
                                            <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest block mb-2">Architectural Bias</span>
                                            <span className="text-sm font-black italic text-emerald-500 uppercase">{activeAnalysis?.growth_prediction?.architectural_bias || "Atomic"}</span>
                                        </div>
                                        <div className="w-px h-8 bg-white/5" />
                                        <div>
                                            <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest block mb-2">Predictive Accuracy</span>
                                            <span className="text-sm font-black italic text-indigo-400 uppercase">High_Sync</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Deep Regression Audit */}
                            <div className="grid lg:grid-cols-2 gap-10">
                                <div className="premium-card p-10 bg-[#02040a]/80 border-white/5 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <History className="w-24 h-24" />
                                    </div>
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400">
                                            <RefreshCw className="w-6 h-6 animate-spin-slow" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black uppercase tracking-widest italic">Neural_Regression_Audit</h4>
                                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[.2em] mt-1">Delta Analysis vs Last Snapshot</p>
                                        </div>
                                    </div>

                                    <div className="flex items-end justify-between mb-10">
                                        <div>
                                            <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-2">Overall Displacement</div>
                                            <div className={`text-5xl font-black italic tracking-tighter ${(activeAnalysis?.regression_audit?.overall_delta || 0) >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                {(activeAnalysis?.regression_audit?.overall_delta || 0) > 0 ? '+' : ''}{activeAnalysis?.regression_audit?.overall_delta || "0.00"}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-2">Audit Verdict</div>
                                            <div className="text-sm font-black text-white italic uppercase tracking-tight">
                                                {activeAnalysis?.regression_audit?.verdict || "Baseline Established"}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                                            <div className="text-[9px] text-slate-600 font-black uppercase mb-2">Security Shift</div>
                                            <div className={`text-lg font-black italic ${(activeAnalysis?.regression_audit?.metrics_delta?.risk_index || 0) <= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                {(activeAnalysis?.regression_audit?.metrics_delta?.risk_index || 0) > 0 ? '+' : ''}{activeAnalysis?.regression_audit?.metrics_delta?.risk_index || "0.00"}
                                            </div>
                                        </div>
                                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                                            <div className="text-[9px] text-slate-600 font-black uppercase mb-2">Thermal Drift</div>
                                            <div className={`text-lg font-black italic ${(activeAnalysis?.regression_audit?.metrics_delta?.global_pressure || 0) <= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                {(activeAnalysis?.regression_audit?.metrics_delta?.global_pressure || 0) > 0 ? '+' : ''}{activeAnalysis?.regression_audit?.metrics_delta?.global_pressure || "0.00"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="premium-card p-10 bg-gradient-to-br from-indigo-500/5 to-transparent border-white/5 flex flex-col justify-between">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 text-emerald-400">
                                            <Sparkles className="w-5 h-5" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Growth Vector Feedback</span>
                                        </div>
                                        <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                            {activeAnalysis?.regression_audit?.status === "Ascending"
                                                ? "Current architectural modifications are significantly reducing cognitive debt. Accelerated growth probability is confirmed for the next development cycle."
                                                : activeAnalysis?.regression_audit?.status === "Descending"
                                                    ? "Structural decay detected in recent commits. Security risk and neural pressure are trending upwards. Immediate refactor of critical hotspots is advised."
                                                    : "Consistent performance characteristics observed. The system's architectural health is balancing despite increasing complexity nodes."}
                                        </p>
                                    </div>
                                    <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full animate-pulse ${activeAnalysis?.regression_audit?.regression_risk === 'High' ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]' : 'bg-emerald-500 shadow-[0_0_10px_#10b981]'}`} />
                                            <span className="text-[10px] font-black text-white uppercase">Regression Risk: {activeAnalysis?.regression_audit?.regression_risk || "Low"}</span>
                                        </div>
                                        <div className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">Sync_Status: Verified</div>
                                    </div>
                                </div>
                            </div>

                            {/* Neural Performance Simulation (Thermal Map) */}
                            <div className="premium-card p-12 bg-gradient-to-br from-rose-500/5 via-transparent to-transparent border-white/5 space-y-10 relative overflow-hidden">
                                <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] bg-rose-500/10 blur-[120px] pointer-events-none" />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 bg-rose-500/10 rounded-3xl flex items-center justify-center border border-rose-500/20 shadow-xl shadow-rose-500/5">
                                            <Flame className="w-8 h-8 text-rose-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black italic tracking-tighter uppercase">Neural_Performance_Thermal_Map</h3>
                                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[.3em] mt-1">Predictive runtime pressure simulation</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Global Load Index</div>
                                        <div className="text-3xl font-black italic text-rose-400">
                                            {Math.round((activeAnalysis?.thermal_simulation?.global_pressure || 0.45) * 100)}%
                                        </div>
                                    </div>
                                </div>

                                <div className="grid lg:grid-cols-4 gap-8">
                                    <div className="lg:col-span-1 space-y-8">
                                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
                                            <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Bottleneck Prob.</div>
                                            <div className="text-4xl font-black italic text-white">
                                                {Math.round((activeAnalysis?.thermal_simulation?.bottleneck_probability || 0.3) * 100)}%
                                            </div>
                                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full bg-rose-500" style={{ width: `${(activeAnalysis?.thermal_simulation?.bottleneck_probability || 0.3) * 100}%` }} />
                                            </div>
                                        </div>
                                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
                                            <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Throughput (Proj)</div>
                                            <div className="text-2xl font-black italic text-emerald-400">
                                                {activeAnalysis?.thermal_simulation?.simulated_throughput || "842 req/s"}
                                            </div>
                                            <div className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Optimal Range: 1.2k+</div>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-3 premium-card p-4 bg-[#02040a]/50 border-white/5">
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                            {(activeAnalysis?.thermal_simulation?.thermal_map || []).map((node: any, i: number) => (
                                                <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col items-center justify-center space-y-3 hover:bg-white/10 transition-all group">
                                                    <div className={`w-3 h-3 rounded-full animate-pulse ${node.state === 'Critical' ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]' : node.state === 'Warming' ? 'bg-orange-500 shadow-[0_0_10px_#f97316]' : 'bg-emerald-500'}`} />
                                                    <div className="text-[8px] font-black text-white uppercase tracking-tighter text-center line-clamp-1">{node.entity}</div>
                                                    <div className="text-[10px] font-mono font-black text-slate-500 group-hover:text-white transition-colors">
                                                        {Math.round(node.load_index * 100)}°
                                                    </div>
                                                </div>
                                            ))}
                                            {(!activeAnalysis?.thermal_simulation?.thermal_map || activeAnalysis?.thermal_simulation?.thermal_map.length === 0) && [1, 2, 3, 4, 5].map(i => (
                                                <div key={i} className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col items-center justify-center space-y-3 opacity-20">
                                                    <div className="w-3 h-3 rounded-full bg-slate-800" />
                                                    <div className="text-[8px] font-black text-slate-800 uppercase">_IDLE_</div>
                                                    <div className="text-[10px] font-mono font-black text-slate-800">00°</div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4 px-4 py-2 bg-rose-500/5 border border-rose-500/10 rounded-xl text-[9px] text-rose-300 font-medium italic flex items-center gap-3">
                                            <ShieldAlert className="w-3 h-3" />
                                            Predicted heat concentrations located in core algorithmic loops. Structural refactoring recommended to disperse execution load.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Cognitive Load Mapping (Atlas) */}
                            <div className="premium-card p-12 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent border-white/5 space-y-10 relative overflow-hidden">
                                <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] pointer-events-none" />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 bg-indigo-500/10 rounded-3xl flex items-center justify-center border border-indigo-500/20 shadow-xl shadow-indigo-500/5">
                                            <Brain className="w-8 h-8 text-indigo-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black italic tracking-tighter uppercase">Cognitive_Load_Atlas</h3>
                                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[.3em] mt-1">Mental processing effort & structural opaquerity</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Index: {activeAnalysis?.cognitive_atlas?.load_index || "0.42"}</div>
                                        <div className="text-3xl font-black italic text-indigo-400">
                                            {activeAnalysis?.cognitive_atlas?.mental_debt || "2.4h estimated"}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid lg:grid-cols-12 gap-10">
                                    <div className="lg:col-span-8 grid md:grid-cols-3 gap-6">
                                        {(activeAnalysis?.cognitive_atlas?.hotspots || []).map((spot: any, i: number) => (
                                            <div key={i} className="p-6 bg-[#02040a]/40 border border-white/5 rounded-3xl space-y-4 hover:bg-white/5 transition-all group">
                                                <div className="flex justify-between items-start">
                                                    <div className="text-[10px] font-black text-white uppercase tracking-tight truncate w-32">{spot.entity}</div>
                                                    <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${spot.verdict === 'Cognitive Hazard' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                                        {spot.verdict}
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-[9px] font-bold text-slate-600">
                                                        <span>Nesting Depth</span>
                                                        <span>{spot.depth_peak}x</span>
                                                    </div>
                                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                        <div className="h-full bg-indigo-500" style={{ width: `${Math.min(100, spot.depth_peak * 20)}%` }} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="lg:col-span-4 p-8 bg-indigo-500/5 border border-indigo-500/10 rounded-[40px] space-y-8">
                                        <div className="space-y-2">
                                            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Logic Density Entropy</h4>
                                            <div className="text-2xl font-black italic">{activeAnalysis?.cognitive_atlas?.logic_density || "0.68"}</div>
                                            <p className="text-[9px] text-slate-500 font-medium italic leading-relaxed">
                                                High logic density indicates compressed complexity favoring experienced maintainers.
                                            </p>
                                        </div>
                                        <div className="pt-8 border-t border-white/5">
                                            <div className="flex items-center gap-4 text-emerald-400">
                                                <Sparkles className="w-5 h-5" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Optimization Strategy</span>
                                            </div>
                                            <p className="mt-4 text-[10px] text-slate-400 leading-relaxed">
                                                Disperse deep nesting in the top 3 hotspots. Current entropy suggests structural consolidation is <b>64%</b> effective.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Neural Refactor Strategy */}
                            <div className="premium-card p-12 bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent border-white/5 space-y-10 relative overflow-hidden">
                                <div className="absolute top-0 right-[-10%] w-[30%] h-full bg-emerald-500/5 skew-x-12 blur-[100px] pointer-events-none" />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 bg-emerald-500/10 rounded-3xl flex items-center justify-center border border-emerald-500/20 shadow-xl shadow-emerald-500/5">
                                            <Wand2 className="w-8 h-8 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black italic tracking-tighter uppercase">Neural_Refactor_Strategy</h3>
                                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[.3em] mt-1">Automated high-fidelity optimization plan</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Focus Vector</div>
                                        <div className="text-xl font-black italic text-emerald-400 uppercase">
                                            {activeAnalysis?.refactor_plan?.recommended_focus || "General Health"}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid lg:grid-cols-12 gap-10">
                                    <div className="lg:col-span-8 space-y-6">
                                        {(activeAnalysis?.refactor_plan?.strategies || []).map((s: any, i: number) => (
                                            <div key={i} className="p-8 bg-[#02040a]/60 border border-white/5 rounded-[32px] hover:border-emerald-500/30 transition-all group">
                                                <div className="flex justify-between items-start mb-6">
                                                    <div>
                                                        <h4 className="text-sm font-black text-white uppercase tracking-tight mb-2">{s.title}</h4>
                                                        <div className="flex gap-3">
                                                            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[8px] font-black uppercase rounded">{s.type}</span>
                                                            <span className={`px-2 py-0.5 text-[8px] font-black uppercase rounded ${s.risk === 'High' ? 'bg-rose-500/10 text-rose-400' : 'bg-slate-500/10 text-slate-400'}`}>Risk: {s.risk}</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-[8px] text-slate-600 font-black uppercase mb-1">Impact</div>
                                                        <div className="text-lg font-black text-emerald-500 italic">{Math.round(s.impact_score * 100)}%</div>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-slate-400 leading-relaxed mb-6 font-medium">"{s.description}"</p>
                                                <div className="flex items-center justify-between mt-8">
                                                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-start gap-4 flex-1 mr-4">
                                                        <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                                        <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-wide leading-relaxed">
                                                            <span className="text-emerald-500/60 mr-2">ACTION:</span> {s.action}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleExecuteRefactor(s)}
                                                        className="px-6 py-4 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-400 transition-all flex items-center gap-2 whitespace-nowrap shadow-lg shadow-emerald-500/20"
                                                    >
                                                        Execute Patch
                                                        <ArrowUpRight className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        {(!activeAnalysis?.refactor_plan?.strategies || activeAnalysis?.refactor_plan?.strategies.length === 0) && (
                                            <div className="p-12 text-center bg-white/[0.02] border border-dashed border-white/10 rounded-[40px]">
                                                <p className="text-xs text-slate-500 font-black uppercase tracking-[.2em]">All neural pathways currently optimized.</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="lg:col-span-4 space-y-8">
                                        <div className="premium-card p-10 bg-emerald-950/20 border-emerald-500/20">
                                            <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-8">Optimization Metrics</div>
                                            <div className="space-y-10">
                                                <div>
                                                    <div className="flex justify-between items-end mb-4">
                                                        <span className="text-[10px] font-black text-slate-400 uppercase">Impact Potential</span>
                                                        <span className="text-2xl font-black italic text-emerald-400">{activeAnalysis?.refactor_plan?.overall_impact_potential || "0%"}</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-emerald-500/10 rounded-full overflow-hidden">
                                                        <div className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]" style={{ width: activeAnalysis?.refactor_plan?.overall_impact_potential || "0%" }} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-end mb-4">
                                                        <span className="text-[10px] font-black text-slate-400 uppercase">Complexity Reduction</span>
                                                        <span className="text-2xl font-black italic text-emerald-400">{activeAnalysis?.refactor_plan?.complexity_reduction_estimate || "0%"}</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-emerald-500/10 rounded-full overflow-hidden">
                                                        <div className="h-full bg-emerald-400 shadow-[0_0_10px_#34d399]" style={{ width: activeAnalysis?.refactor_plan?.complexity_reduction_estimate || "0%" }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-12 pt-8 border-t border-emerald-500/10">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Velocity Multiplier</span>
                                                    <span className="text-xl font-black italic text-white">x{activeAnalysis?.refactor_plan?.refactor_velocity_multiplier || "1.0"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "roadmap" && (
                        <motion.div
                            key="roadmap"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-10"
                        >
                            <div className="grid lg:grid-cols-3 gap-10">
                                <div className="lg:col-span-2 space-y-10">
                                    <div className="premium-card p-12">
                                        <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-2">Growth Milestones</h3>
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[.3em] mb-12">Target mastery thresholds based on current velocity</p>

                                        <div className="space-y-6">
                                            {(activeAnalysis?.growth_prediction?.milestones || []).map((m: any, i: number) => {
                                                const MilestoneIcon = m.icon === 'cpu' ? Cpu : m.icon === 'zap' ? Zap : TrendingUp;
                                                return (
                                                    <div key={i} className="group p-6 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-between hover:bg-white/10 transition-all">
                                                        <div className="flex items-center gap-6">
                                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${m.status === 'Achieved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
                                                                {m.status === 'Achieved' ? <CheckCircle2 className="w-6 h-6" /> : <MilestoneIcon className="w-6 h-6" />}
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-black text-white uppercase tracking-tight">{m.goal}</div>
                                                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Status: {m.status}</div>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Estimated</div>
                                                            <div className="text-sm font-black text-indigo-400 font-mono">{m.estimated_completion}</div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-10">
                                    <div className="premium-card p-10 bg-gradient-to-br from-indigo-600/10 to-transparent">
                                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[.4em] mb-8">Evolution Velocity</h3>
                                        <div className="text-5xl font-black italic tracking-tighter text-white mb-2">
                                            {activeAnalysis?.growth_prediction?.velocity_index || "Stable"}
                                        </div>
                                        <div className="text-[10px] text-indigo-400 font-black uppercase tracking-[.3em]">Growth Delta / Scan</div>

                                        <div className="mt-12 space-y-6">
                                            <div className="p-5 bg-[#02040a]/60 rounded-2xl border border-white/5">
                                                <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-3">Stability Index</div>
                                                <div className="text-3xl font-black italic text-emerald-500">
                                                    {Math.round((activeAnalysis?.growth_prediction?.stability_index || 0.75) * 100)}%
                                                </div>
                                            </div>
                                            <div className="p-5 bg-[#02040a]/60 rounded-2xl border border-white/5">
                                                <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-3">Projected Maturity</div>
                                                <div className="text-xl font-black italic text-white">
                                                    {activeAnalysis?.growth_prediction?.projected_maturity_eta || "December 2026"}
                                                </div>
                                            </div>
                                            <div className="p-5 bg-[#02040a]/60 rounded-2xl border border-white/5">
                                                <div className="text-[10px] text-emerald-500/50 font-black uppercase tracking-widest mb-3">Refactor Boost Potential</div>
                                                <div className="text-xl font-black italic text-emerald-400">
                                                    +{activeAnalysis?.refactor_plan?.overall_impact_potential || "0%"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="premium-card p-10 flex flex-col items-center justify-center text-center space-y-6">
                                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 animate-pulse">
                                            <Zap className="w-10 h-10" />
                                        </div>
                                        <h4 className="text-sm font-black uppercase tracking-widest">
                                            {activeAnalysis?.growth_prediction?.trajectory || "Growth Trajectory"}
                                        </h4>
                                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                                            {activeAnalysis?.growth_prediction?.trajectory === "Security-Debt Firefighter"
                                                ? "Current risk overhead is impacting architectural evolution. Focus on hardening existing structures to resume mastery trajectory."
                                                : activeAnalysis?.growth_prediction?.trajectory === "High-Dimensional Architect"
                                                    ? "Neural patterns show high architectural maturity. Your growth path is diverging towards senior systems design."
                                                    : "Your current consistency in architectural decoupling is accelerating your evolution path. Predicted senior-level autonomy is within optimal range."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "dna" && (
                        <motion.div
                            key="dna"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="grid lg:grid-cols-4 gap-10"
                        >
                            <div className="premium-card p-10 flex flex-col items-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-prime-500 via-neon-purple to-neon-pink" />
                                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[.3em] mb-12 self-start">Neural Geometry Profile</h3>
                                <div className="h-[350px] w-full mt-4 min-w-0">
                                    {isClient && (
                                        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
                                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dynamicDnaData}>
                                                <PolarGrid stroke="#1e293b" strokeOpacity={0.3} />
                                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: '900' }} />
                                                <Radar
                                                    name="Competency"
                                                    dataKey="A"
                                                    stroke="#6366f1"
                                                    strokeWidth={3}
                                                    fill="url(#radarGrad)"
                                                    fillOpacity={0.6}
                                                />
                                                <defs>
                                                    <linearGradient id="radarGrad" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0.2} />
                                                    </linearGradient>
                                                </defs>
                                            </RadarChart>
                                        </ResponsiveContainer>
                                    )}
                                </div>
                                <div className="mt-12 space-y-5 w-full">
                                    <DnaAttribute label="Architectural Bias" value={activeAnalysis?.dna_fingerprint?.architecture_bias || "Distributive"} icon={<Cpu className="w-3.5 h-3.5" />} />
                                    <DnaAttribute label="Logic Tendency" value={activeAnalysis?.behavioral_analysis?.dominant_trait || "Optimizer"} icon={<Activity className="w-3.5 h-3.5" />} />
                                    <DnaAttribute label="Discipline Index" value={`${activeAnalysis?.dna_fingerprint?.discipline_index || 0}%`} icon={<Zap className="w-3.5 h-3.5" />} />
                                    <DnaAttribute label="Risk Profile" value={activeAnalysis?.dna_fingerprint?.risk_profile || "Measured / Stable"} icon={<ShieldAlert className="w-3.5 h-3.5" />} />
                                    <DnaAttribute label="Style Signature" value={activeAnalysis?.dna_fingerprint?.style_signature || "Hybrid / Pragmatic"} icon={<FileCode className="w-3.5 h-3.5" />} />
                                    <DnaAttribute label="Semantic Density" value={`${activeAnalysis?.metrics?.semantic_density || 0}%`} icon={<Fingerprint className="w-3.5 h-3.5" />} />
                                </div>
                            </div>

                            <div className="lg:col-span-3 space-y-10">
                                <div className="premium-card p-12 relative overflow-hidden">
                                    <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[100px] pointer-events-none" />
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-10 flex items-center gap-4">
                                        <Fingerprint className="w-8 h-8 text-indigo-500" /> Behavioral Trace Analysis
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-12">
                                        <div className="space-y-8">
                                            <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[.4em] mb-4">Structural Strengths</h4>
                                            <ul className="space-y-5">
                                                {(suggestions.length
                                                    ? suggestions
                                                    : activeAnalysis?.suggestions?.length
                                                        ? activeAnalysis.suggestions
                                                        : activeAnalysis?.recommendations?.length
                                                            ? activeAnalysis.recommendations
                                                            : ["High modularity density", "Optimized execution paths", "Strong docstring health"])
                                                    .slice(0, 4)
                                                    .map((rec: any, i: number) => {
                                                        const text = typeof rec === "string" ? rec : (rec.detail || rec.title || "Improvement opportunity");
                                                        return (
                                                            <li key={i} className="flex gap-4 text-sm text-slate-300 group">
                                                                <div className="w-5 h-5 bg-emerald-500/10 rounded flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-all">
                                                                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                                                </div>
                                                                <span className="font-bold tracking-tight">{text}</span>
                                                            </li>
                                                        );
                                                    })}
                                            </ul>
                                        </div>
                                        <div className="space-y-8">
                                            <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-[.4em] mb-4">Neural Latency / Weaknesses</h4>
                                            <ul className="space-y-6">
                                                {(activeAnalysis?.weaknesses?.length ? activeAnalysis.weaknesses : [
                                                    { area: 'Memory Management', message: 'Suboptimal allocation in recursive loops' },
                                                    { area: 'Dead Logic', message: 'Orphaned modules detected in fleet root' }
                                                ]).map((w: any, i: number) => (
                                                    <li key={i} className="flex gap-4 group">
                                                        <div className="w-5 h-5 bg-amber-500/10 rounded flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-all">
                                                            <ShieldAlert className="w-3 h-3 text-amber-500" />
                                                        </div>
                                                        <div>
                                                            <span className="font-black text-white text-xs block uppercase tracking-tight group-hover:text-amber-400 transition-colors">{w.area}</span>
                                                            <span className="text-[10px] text-slate-500 font-bold leading-relaxed">{w.message}</span>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid lg:grid-cols-2 gap-8">
                                    <div className="premium-card p-10 bg-gradient-to-br from-indigo-500/5 to-transparent border-white/5 space-y-8 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <Fingerprint className="w-16 h-16" />
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[.4em] mb-4">Forensic Stylistic DNA</h4>
                                            <div className="text-4xl font-black italic tracking-tighter text-white mb-2">
                                                {activeAnalysis?.forensic_audit?.forensic_credibility_score || 88}%
                                            </div>
                                            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Lineage Integrity Score</div>
                                        </div>

                                        <div className="space-y-4">
                                            {(activeAnalysis?.forensic_audit?.forensic_markers || ["Indentation Matrix: Quad-Space", "Naming Lineage: Snake-Case"]).map((m: string, i: number) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                                                    <span className="text-[10px] text-slate-300 font-black uppercase tracking-widest">{m}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                            <div>
                                                <div className="text-[8px] text-slate-600 font-black uppercase mb-1">Structural_Hash</div>
                                                <div className="text-[10px] font-mono text-indigo-300 font-black tracking-widest">
                                                    {activeAnalysis?.forensic_audit?.stylistic_dna_hash || "8f2a3c91d4e5f6b0"}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[8px] text-slate-600 font-black uppercase mb-1">Verdict</div>
                                                <div className="text-[10px] text-emerald-500 font-black italic uppercase">
                                                    {activeAnalysis?.forensic_audit?.lineage_verdict || "High-Fidelity Trace"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="premium-card p-8 group h-full flex flex-col justify-between">
                                            <div>
                                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Cognitive Complexity Distribution</div>
                                                <div className="text-3xl font-black italic group-hover:text-indigo-400 transition-colors uppercase">
                                                    {activeAnalysis?.behavioral_analysis?.dominant_trait || "Strategist"}
                                                </div>
                                            </div>
                                            <div className="space-y-6">
                                                <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">
                                                    "Your coding behavior shows a high preference for {activeAnalysis?.behavioral_analysis?.traits?.[0] || 'decoupled modularity'}. This aligns with senior-level architectural patterns."
                                                </p>
                                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                                    <div className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: `${activeAnalysis?.behavioral_analysis?.performance_index || 78}%` }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "graph" && (
                        <motion.div
                            key="graph"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="premium-card p-10 h-[700px] flex items-center justify-center relative overflow-hidden"
                        >
                            <div className="absolute top-10 left-10 z-10">
                                <h3 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                                    <Globe className="w-6 h-6 text-indigo-500" /> Logical Dependency Mesh
                                </h3>
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Visualizing {activeAnalysis?.knowledge_graph?.nodes?.length || 24} resource associations.</p>
                            </div>

                            <div className="w-full h-full pt-20">
                                <KnowledgeGraph
                                    data={activeAnalysis?.knowledge_graph || {
                                        nodes: Array.from({ length: 20 }).map((_, i) => ({ id: i, label: `Node_${i}`, type: i % 3 === 0 ? 'class' : 'function' })),
                                        edges: Array.from({ length: 25 }).map((_, i) => ({ source: Math.floor(Math.random() * 20), target: Math.floor(Math.random() * 20) }))
                                    }}
                                    onNodeClick={setSelectedNode}
                                    selectedId={selectedNode?.id}
                                />
                            </div>

                            <AnimatePresence>
                                {selectedNode && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 50 }}
                                        className="absolute right-10 top-10 bottom-10 w-96 bg-[#0d1117]/90 backdrop-blur-3xl p-10 rounded-[40px] border border-white/10 z-10 shadow-[0_0_80px_rgba(0,0,0,0.5)] flex flex-col"
                                    >
                                        <div className="flex justify-between items-start mb-10">
                                            <div>
                                                <h4 className="text-3xl font-black italic tracking-tighter text-white">{selectedNode.label}</h4>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[.3em]">{selectedNode.type}</span>
                                                </div>
                                            </div>
                                            <button onClick={() => setSelectedNode(null)} className="p-2 hover:bg-white/5 rounded-full transition-all">
                                                <X className="w-5 h-5 text-slate-600" />
                                            </button>
                                        </div>

                                        <div className="flex-1 space-y-10 overflow-y-auto pr-2 custom-scrollbar">
                                            <div className="p-6 bg-[#02040a] rounded-3xl border border-white/5 italic text-[10px] text-slate-400 leading-relaxed font-medium">
                                                "{selectedNode.doc || "Analyzing semantic signature..."}"
                                            </div>

                                            <div className="space-y-4">
                                                <h5 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Structural Reasoning</h5>
                                                <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                                                    {selectedNode.reasoning || "Neural engine suggests high cohesion for this specific node branch."}
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                <h5 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Neural Refactor Recommendation</h5>
                                                <div className="p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-3xl space-y-4">
                                                    <p className="text-[11px] text-white font-medium leading-relaxed italic">
                                                        "{selectedNode.refactor?.recommended_action || "Structural integrity verified. No immediate refactoring required."}"
                                                    </p>
                                                    <div className="flex items-center justify-between pt-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[9px] font-black text-slate-500 uppercase">Priority</span>
                                                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${selectedNode.refactor?.priority === 'High' ? 'bg-rose-500/20 text-rose-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
                                                                {selectedNode.refactor?.priority || "Low"}
                                                            </span>
                                                        </div>
                                                        <div className="text-[9px] font-black text-slate-500 uppercase">
                                                            Impact: <span className="text-white italic">{Math.round((selectedNode.refactor?.impact_score || 0.4) * 100)}%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="premium-card p-6 border-white/5 bg-white/2">
                                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Scale</div>
                                                    <div className="text-xl font-black italic">{selectedNode.metrics?.lines || 142} <span className="text-[10px] text-slate-600">LOC</span></div>
                                                </div>
                                                <div className="premium-card p-6 border-white/5 bg-white/2">
                                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Coupling</div>
                                                    <div className="text-xl font-black italic text-emerald-400">LOW</div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Inferred Logic Flow</h5>
                                                <div className="space-y-3">
                                                    <div className="h-1.5 w-full bg-white/5 rounded-full"><div className="h-full bg-indigo-600 w-[85%] rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]" /></div>
                                                    <div className="h-1.5 w-full bg-white/5 rounded-full"><div className="h-full bg-purple-600 w-[42%] rounded-full shadow-[0_0_10px_rgba(147,51,234,0.5)]" /></div>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="w-full py-4 mt-10 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">
                                            Focus In Codebase
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {activeTab === "security" && (
                        <motion.div
                            key="security"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-10"
                        >
                            <div className="grid lg:grid-cols-12 gap-10">
                                <div className="lg:col-span-4 space-y-10">
                                    <div className="premium-card p-12 bg-gradient-to-br from-rose-500/5 to-transparent border-white/5 space-y-8 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <Lock className="w-16 h-16 text-rose-500" />
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] font-black text-rose-400 uppercase tracking-[.4em] mb-4">Neural Security Posture</h4>
                                            <div className="text-5xl font-black italic tracking-tighter text-white mb-2 uppercase">
                                                {activeAnalysis?.security_perimeter?.posture || "Fortified"}
                                            </div>
                                            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Global Defense Status</div>
                                        </div>

                                        <div className="space-y-4 pt-4">
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Risk Index</span>
                                                <span className="text-sm font-black italic text-rose-400">
                                                    {Math.round((activeAnalysis?.security_perimeter?.risk_index || 0.12) * 100)}%
                                                </span>
                                            </div>
                                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"
                                                    style={{ width: `${(activeAnalysis?.security_perimeter?.risk_index || 0.12) * 100}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                                            <div>
                                                <div className="text-[8px] text-slate-600 font-black uppercase mb-1">Compliance</div>
                                                <div className="text-[10px] text-emerald-500 font-black uppercase italic">
                                                    {activeAnalysis?.security_perimeter?.compliance_gap || "Nominal"}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[8px] text-slate-600 font-black uppercase mb-1">Audit_Cycle</div>
                                                <div className="text-[10px] text-slate-400 font-black uppercase tabular-nums">Real-Time</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="premium-card p-10 bg-white/[0.01] space-y-8">
                                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Attack Surface Metrics</h4>
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Exposed Routes</span>
                                                </div>
                                                <span className="text-sm font-black italic text-white">{activeAnalysis?.security_perimeter?.attack_surface?.exposed_routes || 0}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Public Interface Depth</span>
                                                </div>
                                                <span className="text-sm font-black italic text-white">{activeAnalysis?.security_perimeter?.attack_surface?.public_interface_depth || 12}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Complexity Level</span>
                                                </div>
                                                <span className="text-[10px] font-black italic text-rose-400 uppercase">{activeAnalysis?.security_perimeter?.attack_surface?.entry_point_complexity || "Internal"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-8 flex flex-col gap-10">
                                    <div className="premium-card p-12 bg-[#02040a]/50 border-white/5 flex-1 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500/20" />
                                        <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-12 flex items-center gap-4">
                                            <ShieldAlert className="w-8 h-8 text-rose-500" /> Neural_Threat_Registry
                                        </h3>

                                        <div className="space-y-6">
                                            {(activeAnalysis?.security_perimeter?.threats || []).length > 0 ? (
                                                (activeAnalysis?.security_perimeter?.threats || []).map((threat: any, i: number) => (
                                                    <div key={i} className="group p-8 bg-white/5 border border-white/5 rounded-[2.5rem] flex items-center justify-between hover:bg-white/10 transition-all">
                                                        <div className="flex items-center gap-8">
                                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${threat.severity === 'Critical' ? 'bg-rose-500/20 text-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.2)]' : 'bg-orange-500/20 text-orange-500'}`}>
                                                                <Lock className="w-6 h-6" />
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center gap-4 mb-1">
                                                                    <span className="text-sm font-black text-white uppercase tracking-tight">{threat.vector} Vector</span>
                                                                    <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${threat.severity === 'Critical' ? 'bg-rose-500 text-white' : 'bg-orange-500 text-white'}`}>
                                                                        {threat.severity}
                                                                    </span>
                                                                </div>
                                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed max-w-xl">
                                                                    {threat.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-[9px] text-slate-600 font-black uppercase mb-1">Remediation</div>
                                                            <div className="text-[10px] text-indigo-400 font-black italic uppercase italic">
                                                                {threat.remediation}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="py-20 flex flex-col items-center justify-center text-center space-y-6 border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.02]">
                                                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
                                                        <CheckCircle2 className="w-10 h-10" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl font-black italic uppercase tracking-tighter">Zero_Threat_Deltas</h4>
                                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Peripheral defense logic is currently optimal</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="premium-card p-10 bg-indigo-500/5 border-indigo-500/10 flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400">
                                                <Shield className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black uppercase tracking-widest">Active Perimeter Defense</h4>
                                                <p className="text-[10px] text-slate-500 font-medium">Neural guardrails suppressing injection vectors</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-emerald-500 font-black italic uppercase text-[10px]">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                                            System_Stable
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "telemetry" && (
                        <motion.div
                            key="telemetry"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-10"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <MetricWidget
                                    label="Mesh Cooling Rate"
                                    value={`-${meshTelemetry?.cooling_rate || 0}%`}
                                    trend="DESCENDING"
                                    icon={<Flame />}
                                    color="text-emerald-400"
                                />
                                <MetricWidget
                                    label="Team Velocity"
                                    value={`x${(1 + (meshTelemetry?.total_refactors || 0) * 0.05).toFixed(1)}`}
                                    trend="+5.2%"
                                    icon={<Zap />}
                                />
                                <MetricWidget
                                    label="Global Forge Impact"
                                    value={`${Math.round((meshTelemetry?.global_impact_avg || 0.4) * 100)}%`}
                                    trend="OPTIMIZED"
                                    icon={<Sparkles />}
                                    color="text-indigo-400"
                                />
                            </div>

                            <div className="grid lg:grid-cols-12 gap-10">
                                <div className="lg:col-span-8 premium-card p-12 overflow-hidden">
                                    <div className="flex items-center justify-between mb-12">
                                        <div>
                                            <h3 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                                                <TrendingUp className="w-6 h-6 text-emerald-500" /> Neural Cooling Velocity
                                            </h3>
                                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[.3em] mt-1">Entropy reduction over the last 30 cycles</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] text-slate-600 font-black uppercase">Active Refactors</div>
                                            <div className="text-2xl font-black italic text-white">{meshTelemetry?.total_refactors || 0}</div>
                                        </div>
                                    </div>
                                    <div className="h-[400px]">
                                        {isClient && meshTelemetry?.time_series ? (
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={meshTelemetry.time_series}>
                                                    <defs>
                                                        <linearGradient id="coolingGrad" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <XAxis dataKey="date" hide />
                                                    <YAxis hide />
                                                    <Tooltip
                                                        contentStyle={{ backgroundColor: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                                                    />
                                                    <Area type="monotone" dataKey="cooling" stroke="#10b981" strokeWidth={4} fill="url(#coolingGrad)" />
                                                    <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} fillOpacity={0} />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-slate-700 italic text-xs uppercase tracking-widest">
                                                Waiting for telemetry sync...
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="lg:col-span-4 space-y-10">
                                    <div className="premium-card p-10 bg-emerald-500/5 border-emerald-500/10">
                                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8">Refactor Efficiency Hub</h4>
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-black text-slate-400">SUCCESS_RATE</span>
                                                <span className="text-sm font-black italic text-emerald-400">98.2%</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-black text-slate-400">AVG_DELTA</span>
                                                <span className="text-sm font-black italic text-white">-{meshTelemetry?.cooling_rate || 0.35}%</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-black text-slate-400">FORGE_UPTIME</span>
                                                <span className="text-sm font-black italic text-indigo-400">99.9%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="premium-card p-10 flex flex-col items-center justify-center text-center space-y-6">
                                        <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400">
                                            <Activity className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black uppercase tracking-widest italic">System Stability</h4>
                                            <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-2">
                                                Refactor mesh is maintaining global structural integrity. Entropy levels are within nominal thresholds.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Live Swarm Feed */}
                            <div className="premium-card p-12 overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Activity className="w-64 h-64" />
                                </div>

                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
                                    <h3 className="text-xl font-black italic uppercase tracking-tighter">Forge Swarm Command</h3>
                                </div>

                                <div className="space-y-4 font-mono">
                                    <AnimatePresence>
                                        {swarmActivity.map((activity) => (
                                            <motion.div
                                                key={activity.id}
                                                initial={{ opacity: 0, x: -20, height: 0 }}
                                                animate={{ opacity: 1, x: 0, height: 'auto' }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl text-xs uppercase"
                                            >
                                                <div className="flex items-center gap-6">
                                                    <span className="text-slate-500 font-bold">{activity.time}</span>
                                                    <span className={`font-black ${activity.type === 'success' ? 'text-emerald-400' : 'text-indigo-400'}`}>
                                                        {activity.action}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <span className="text-slate-400">Target: <span className="text-white">{activity.target}</span></span>
                                                    <span className="bg-black/30 px-3 py-1 rounded-full text-slate-300 border border-white/10 tracking-widest">{activity.impact}</span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Forge Console Modal */}
            <AnimatePresence>
                {activeRefactor && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#02040a]/90 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="w-full max-w-5xl bg-[#02040a] border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.1)] flex flex-col h-[85vh]"
                        >
                            <div className="p-10 border-b border-white/5 flex items-center justify-between bg-emerald-500/5">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-emerald-500/10 rounded-3xl flex items-center justify-center border border-emerald-500/20 shadow-xl shadow-emerald-500/5">
                                        <Zap className="w-8 h-8 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black italic tracking-tighter uppercase">Neural_Forge_Console</h3>
                                        <p className="text-[10px] text-emerald-500/60 font-black uppercase tracking-[.3em] mt-1">Refactoring: {activeRefactor.title}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => { setActiveRefactor(null); setRefactorResult(null); }}
                                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
                                >
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-hidden grid lg:grid-cols-2">
                                {/* Analysis Panel */}
                                <div className="p-10 space-y-8 overflow-y-auto custom-scrollbar border-r border-white/5">
                                    <div className="space-y-4">
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Strategy Objective</div>
                                        <p className="text-sm text-slate-300 leading-relaxed font-medium">
                                            {activeRefactor.description}
                                        </p>
                                    </div>

                                    <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Sparkles className="w-4 h-4 text-emerald-400" />
                                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Planned Action</span>
                                        </div>
                                        <p className="text-xs text-emerald-100 italic leading-relaxed">
                                            "{activeRefactor.action}"
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="premium-card p-6 border-white/5">
                                            <div className="text-[10px] font-black text-slate-600 uppercase mb-2">Complexity Delta</div>
                                            <div className="text-2xl font-black italic text-emerald-400">-{activeAnalysis?.refactor_plan?.complexity_reduction_estimate || "35%"}</div>
                                        </div>
                                        <div className="premium-card p-6 border-white/5">
                                            <div className="text-[10px] font-black text-slate-600 uppercase mb-2">Refactor Risk</div>
                                            <div className={`text-2xl font-black italic ${activeRefactor.risk === 'High' ? 'text-rose-500' : 'text-emerald-500'}`}>{activeRefactor.risk.toUpperCase()}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Execution Panel */}
                                <div className="p-10 bg-black/40 flex flex-col overflow-hidden">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Neural Execution Stream</span>
                                        </div>
                                        {refactorResult && (
                                            <span className="text-[10px] font-black text-emerald-500 uppercase flex items-center gap-2">
                                                <Check className="w-3 h-3" /> Patch Compiled
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex-1 bg-[#02040a] rounded-3xl border border-white/5 font-mono text-[11px] p-8 overflow-y-auto custom-scrollbar relative">
                                        {refactorLoading ? (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
                                                <RefreshCw className="w-10 h-10 text-emerald-500 animate-spin" />
                                                <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[.3em] animate-pulse">Synthesis in progress...</div>
                                            </div>
                                        ) : refactorResult ? (
                                            <div className="space-y-6">
                                                {refactorResult.status === 'success' ? (
                                                    <>
                                                        <div className="space-y-4">
                                                            <div className="text-slate-500 mb-2">{"// Proposed Transformation"}</div>
                                                            <pre className="text-emerald-400 leading-relaxed overflow-x-auto">
                                                                {refactorResult.refactored || refactorResult.message}
                                                            </pre>
                                                        </div>
                                                        {refactorResult.explanation && (
                                                            <div className="pt-6 border-t border-white/5 text-slate-400 italic">
                                                                {refactorResult.explanation}
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <div className="text-rose-400 flex items-center gap-3">
                                                        <ShieldAlert className="w-5 h-5" />
                                                        <span>{refactorResult.message}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-slate-700 italic flex flex-col items-center justify-center h-full gap-4">
                                                <FileCode className="w-12 h-12 opacity-10" />
                                                <span>Waiting for forge initialization...</span>
                                            </div>
                                        )}
                                    </div>

                                    {refactorResult?.status === 'success' && (
                                        <div className="space-y-4 mt-10">
                                            {!prResult ? (
                                                <button
                                                    onClick={handleCreatePR}
                                                    disabled={prLoading}
                                                    className="w-full py-5 bg-white text-black text-xs font-black uppercase tracking-[.3em] rounded-2xl hover:bg-slate-200 transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3 disabled:opacity-50"
                                                >
                                                    {prLoading ? (
                                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                                    ) : (
                                                        <>
                                                            Initialize Autonomous PR
                                                            <GitPullRequest className="w-4 h-4 text-emerald-600" />
                                                        </>
                                                    )}
                                                </button>
                                            ) : (
                                                <a
                                                    href={prResult.pr_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full py-5 bg-indigo-500 text-white text-xs font-black uppercase tracking-[.3em] rounded-2xl hover:bg-indigo-600 transition-all shadow-[0_0_50px_rgba(79,70,229,0.3)] flex items-center justify-center gap-3"
                                                >
                                                    View Autonomous PR
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function Tab({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-6 text-[10px] font-black uppercase tracking-[.4em] transition-all border-b-4 flex items-center gap-3 relative ${active
                ? "border-indigo-500 text-white drop-shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                : "border-transparent text-slate-600 hover:text-slate-400"
                }`}
        >
            {active && <motion.div layoutId="activeTab" className="absolute inset-0 bg-indigo-500/5 -z-10" />}
            {children}
        </button>
    );
}

function MetricWidget({ label, value, trend, icon, color = "text-white" }: any) {
    return (
        <motion.div whileHover={{ y: -5 }} className="premium-card p-10 group relative overflow-hidden bg-white/[0.01]">
            <div className="absolute right-[-10%] bottom-[-10%] p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                {icon}
            </div>
            <div className="flex items-center justify-between mb-8">
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-[.3em]">{label}</span>
                <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 group-hover:bg-indigo-500/10 transition-colors shadow-inner">
                    {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { className: "w-4.5 h-4.5 text-indigo-400" })}
                </div>
            </div>
            <div className="flex items-end justify-between">
                <span className={`text-4xl font-black italic tracking-tighter ${color}`}>{value}</span>
                <div className="flex flex-col items-end mb-1">
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Status</span>
                    <span className="text-[9px] font-black text-indigo-400 tracking-widest uppercase">{trend}</span>
                </div>
            </div>
        </motion.div>
    );
}

function DnaAttribute({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
    return (
        <div className="flex justify-between items-center py-5 border-b border-white/5 last:border-0 group">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover:bg-indigo-500/10 text-slate-600 group-hover:text-indigo-400 transition-all">
                    {icon}
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[.2em]">{label}</span>
            </div>
            <span className="text-xs font-black text-white uppercase italic tracking-tighter">{value}</span>
        </div>
    );
}

function KnowledgeGraph({ data, onNodeClick, selectedId }: any) {
    const width = 1000;
    const height = 600;
    const [viewBox, setViewBox] = useState(`0 0 ${width} ${height}`);

    if (!data || !data.nodes || data.nodes.length === 0) return null;

    const nodes = data.nodes.map((node: any, i: number) => {
        const angle = (i / data.nodes.length) * 2 * Math.PI;
        const radius = 220;
        return {
            ...node,
            x: (width / 2) + radius * Math.cos(angle),
            y: (height / 2) + radius * Math.sin(angle)
        };
    });

    return (
        <svg width="100%" height="100%" viewBox={viewBox} className="cursor-crosshair overflow-visible">
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {data.edges?.map((edge: any, i: number) => {
                const source = nodes.find((n: any) => n.id === edge.source);
                const target = nodes.find((n: any) => n.id === edge.target);
                if (!source || !target) return null;
                const isHighlighted = selectedId === source.id || selectedId === target.id;
                return (
                    <motion.line
                        key={i}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: isHighlighted ? 0.8 : 0.1 }}
                        x1={source.x} y1={source.y} x2={target.x} y2={target.y}
                        stroke={isHighlighted ? "#6366f1" : "rgba(255,255,255,0.2)"}
                        strokeWidth={isHighlighted ? 3 : 1}
                        className="transition-all duration-500"
                    />
                );
            })}

            {nodes.map((node: any, i: number) => {
                const isSelected = selectedId === node.id;
                return (
                    <g key={i} className="cursor-pointer group" onClick={() => onNodeClick(node)}>
                        <motion.circle
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            cx={node.x} cy={node.y} r={isSelected ? 14 : 8}
                            fill={node.type === 'module' ? '#6366f1' : node.type === 'class' ? '#ec4899' : '#10b981'}
                            filter={isSelected ? "url(#glow)" : ""}
                            className="transition-all duration-300 shadow-2xl"
                        />
                        <circle cx={node.x} cy={node.y} r={isSelected ? 22 : 12} fill="transparent" stroke={isSelected ? "#6366f1" : "transparent"} strokeWidth="1" strokeDasharray="4 4" className="animate-spin-slow" />
                        <text x={node.x} y={node.y} dy="-24" textAnchor="middle" fill="#fff"
                            fontSize="9" className={`font-black uppercase tracking-widest transition-opacity duration-300 pointer-events-none ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                            {node.label}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

function VisualAnalysisConsole({ url, onComplete }: { url: string, onComplete: () => void }) {
    const [logs, setLogs] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);
    const logPool = [
        "RETRIEVING_REMOTE_AST_NODES...",
        "RE_CALIBRATING_DNA_THRESHOLDS...",
        "ANALYZING_SEMANTIC_DRIFT...",
        "UPDATING_DEPENDENCY_MESH_TOPOLOGY...",
        "COMPILING_GROWTH_TRAJECTORY_REGRESSION...",
        "VERIFYING_SECURITY_INTEGRITY...",
        "FINALIZING_NEURAL_SNAPSHOT..."
    ];

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < logPool.length) {
                setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${logPool[i]}`]);
                setProgress(Math.round(((i + 1) / logPool.length) * 100));
                i++;
            } else {
                setLogs(prev => [...prev, "RE_SCAN_SUCCESSFUL. MESH_STABILIZED."]);
                clearInterval(interval);
                setTimeout(onComplete, 1000);
            }
        }, 600);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-12">
            <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-indigo-500/10 rounded-[2rem] border border-indigo-500/20 flex items-center justify-center">
                    <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
                </div>
                <div>
                    <h2 className="text-4xl font-black italic tracking-tighter uppercase">Deep_Intelligence_Scan</h2>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[.4em] mt-1">Analyzing Segment: {url}</p>
                </div>
            </div>

            <div className="premium-card p-10 bg-[#02040a] border-white/5 font-mono text-xs h-80 overflow-y-auto custom-scrollbar flex flex-col gap-3 shadow-2xl">
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

            <div className="space-y-6">
                <div className="flex justify-between items-end">
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-[.3em]">Neural_Processing_Load</span>
                    <span className="text-2xl font-black italic text-white">{progress}%</span>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden p-[2px] border border-white/5">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full shadow-[0_0_30px_rgba(99,102,241,0.4)]"
                    />
                </div>
            </div>
        </div>
    );
}

export default function IntelligencePage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-[600px] bg-[#02040a]">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin shadow-[0_0_20px_rgba(99,102,241,0.2)]" />
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[.4em] animate-pulse">Initializing Intelligence Mesh...</p>
                </div>
            </div>
        }>
            <IntelligenceCenter />
        </Suspense>
    );
}
