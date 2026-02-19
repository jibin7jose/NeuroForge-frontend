"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Dna,
    Brain,
    Target,
    TrendingUp,
    ShieldAlert,
    Shield,
    Fingerprint,
    ChevronLeft,
    Cloud
} from "lucide-react";



import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";
import { getEvolutionHistory, getProjects, getProjectHistory, getReadinessDelta } from "@/lib/api";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const dnaData = [
    { subject: 'Modular Thinking', A: 85, fullMark: 100 },
    { subject: 'Error Resilience', A: 40, fullMark: 100 },
    { subject: 'Optimization', A: 75, fullMark: 100 },
    { subject: 'Consistency', A: 90, fullMark: 100 },
    { subject: 'Documentation', A: 55, fullMark: 100 },
];

export default function IntelligencePage() {
    const [evolutionData, setEvolutionData] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [scanResults, setScanResults] = useState<any>(null);
    const [selectedSnapshot, setSelectedSnapshot] = useState<any>(null);
    const [selectedNode, setSelectedNode] = useState<any>(null);
    const [readinessDelta, setReadinessDelta] = useState<any>(null);

    const activeAnalysis = selectedSnapshot ? selectedSnapshot.analysis : scanResults;



    useEffect(() => {
        const loadHistory = async () => {
            const data = selectedProjectId
                ? await getProjectHistory(selectedProjectId)
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
        };

        loadHistory();
    }, [selectedProjectId]);

    useEffect(() => {
        getProjects().then(setProjects);
        getReadinessDelta().then(setReadinessDelta).catch(() => setReadinessDelta(null));

        const stored = localStorage.getItem('lastScan');
        if (stored) {
            try {
                setScanResults(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse stored scan", e);
            }
        }
    }, []);



    const dynamicDnaData = activeAnalysis?.metrics ? [
        { subject: 'Modularity', A: Math.min(100, (activeAnalysis.metrics.function_count * 10)), fullMark: 100 },
        { subject: 'Resilience', A: activeAnalysis.behavioral_analysis?.behavioral_profile?.debugging_resilience || 40, fullMark: 100 },
        { subject: 'Optimization', A: activeAnalysis.behavioral_analysis?.behavioral_profile?.logic_efficiency || 75, fullMark: 100 },
        { subject: 'Doc Coverage', A: activeAnalysis.metrics.docstring_coverage || 0, fullMark: 100 },
        { subject: 'Clean Code', A: activeAnalysis.metrics.clean_code_score || 0, fullMark: 100 },
    ] : dnaData;


    return (
        <div className="min-h-screen bg-[#050505] text-white p-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-white transition-all mb-8 w-fit text-sm">
                    <ChevronLeft className="w-4 h-4" /> Back to Fleet
                </Link>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl font-bold tracking-tight">Intelligence Center</h1>
                            <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold rounded-full">BETA</span>
                        </div>
                        <p className="text-gray-400 text-sm">Deep-dive into your architectural DNA and predicted growth trajectory.</p>
                    </div>

                    <div className="relative group">
                        <select
                            value={selectedProjectId || ""}
                            onChange={(e) => setSelectedProjectId(e.target.value ? Number(e.target.value) : null)}
                            className="appearance-none bg-white/5 border border-white/10 rounded-2xl px-6 py-3 pr-12 text-sm font-bold text-white focus:outline-none focus:border-blue-500/50 transition-all cursor-pointer hover:bg-white/10"
                        >
                            <option value="">Global Fleet Trajectory</option>
                            {projects.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none group-hover:text-white transition-colors" />
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
                            <div className={`p-3 rounded-2xl transition-colors ${selectedSnapshot ? 'bg-purple-600/20' : 'bg-blue-600/20'}`}>
                                <Fingerprint className={`w-6 h-6 ${selectedSnapshot ? 'text-purple-400' : 'text-blue-400'}`} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{selectedSnapshot ? 'Snapshot DNA' : 'Developer DNA'}</h2>
                                <p className="text-xs text-gray-500">
                                    {selectedSnapshot ? `Analyzed: ${selectedSnapshot.date}` : 'Showing live profile'}
                                </p>
                            </div>
                        </div>

                        <div className="h-[250px] mb-8">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dynamicDnaData}>
                                    <PolarGrid stroke="#222" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10 }} />
                                    <Radar
                                        name="Level"
                                        dataKey="A"
                                        stroke={selectedSnapshot ? "#a855f7" : "#3b82f6"}
                                        fill={selectedSnapshot ? "#a855f7" : "#3b82f6"}
                                        fillOpacity={0.6}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-4">
                            <DNAAttribute label="Architectural Bias" value={activeAnalysis?.dna_fingerprint?.style_signature || "Wait for scan"} />
                            <DNAAttribute label="Dominant Trait" value={activeAnalysis?.behavioral_analysis?.dominant_trait || "Scanning..."} />
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Competitive Standing</span>
                                <span className="text-sm font-bold text-emerald-400">{activeAnalysis?.benchmarks?.standing || "Elite Standing"}</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${activeAnalysis?.benchmarks?.percentile || 90}%` }}
                                    className="h-full bg-emerald-500"
                                />
                            </div>
                            <p className="text-[10px] text-gray-500">Top {100 - (activeAnalysis?.benchmarks?.percentile || 90)}% of analyzed developers globally.</p>
                        </div>


                        {selectedSnapshot && (
                            <button
                                onClick={() => setSelectedSnapshot(null)}
                                className="w-full mt-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all text-blue-400"
                            >
                                Reset to Live Data
                            </button>
                        )}

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
                                        <LineChart
                                            data={evolutionData}
                                            onClick={(data: any) => {
                                                if (data && data.activePayload && data.activePayload.length > 0) {
                                                    setSelectedSnapshot(data.activePayload[0].payload);
                                                }
                                            }}


                                            style={{ cursor: 'pointer' }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                                            <XAxis dataKey="date" hide />
                                            <YAxis hide />
                                            <Tooltip
                                                content={({ active, payload }: any) => {
                                                    if (active && payload && payload.length) {
                                                        const d = payload[0].payload;
                                                        return (
                                                            <div className="glass p-4 border border-white/10 rounded-2xl">
                                                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{d.name}</p>
                                                                <p className="text-sm font-bold text-white mb-2">{d.date}</p>
                                                                <div className="space-y-1">
                                                                    <div className="flex justify-between gap-4 text-xs">
                                                                        <span className="text-gray-500">Score:</span>
                                                                        <span className="text-blue-400 font-bold">{d.score}</span>
                                                                    </div>
                                                                    <div className="flex justify-between gap-4 text-xs">
                                                                        <span className="text-gray-500">Complexity:</span>
                                                                        <span className="text-purple-400 font-bold">{d.complexity}</span>
                                                                    </div>
                                                                </div>
                                                                <p className="text-[8px] text-gray-600 mt-2 uppercase font-bold">Click to view snapshot</p>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }}
                                            />
                                            <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }} />
                                            <Line type="monotone" dataKey="complexity" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7', r: 3 }} activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }} />
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
                                <h3 className="text-sm font-bold text-gray-500 mb-6 uppercase tracking-widest">Readiness Delta</h3>
                                <div className="text-center py-4">
                                    <div className="text-5xl font-bold mb-2">{readinessDelta?.current?.readiness_avg_score ?? 0}</div>
                                    <div className="text-xs text-emerald-400 font-bold uppercase tracking-widest">Current 7d Readiness</div>
                                </div>
                                <div className="space-y-6 mt-6">
                                    <div>
                                        <div className="flex justify-between text-[10px] mb-2 font-bold uppercase text-gray-500">
                                            <span>Readiness Score Delta</span>
                                            <span className={`${(readinessDelta?.delta?.readiness_score_delta ?? 0) >= 0 ? 'text-emerald-500' : 'text-red-400'}`}>
                                                {(readinessDelta?.delta?.readiness_score_delta ?? 0) >= 0 ? '+' : ''}{readinessDelta?.delta?.readiness_score_delta ?? 0}
                                            </span>
                                        </div>
                                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-emerald-500 h-full" style={{ width: `${Math.min(100, Math.max(0, readinessDelta?.current?.readiness_avg_score ?? 0))}%` }} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-[10px] mb-2 font-bold uppercase text-gray-500">
                                            <span>Vulnerability Count Delta</span>
                                            <span className={`${(readinessDelta?.delta?.vulnerability_count_delta ?? 0) <= 0 ? 'text-emerald-500' : 'text-amber-500'}`}>
                                                {(readinessDelta?.delta?.vulnerability_count_delta ?? 0) > 0 ? '+' : ''}{readinessDelta?.delta?.vulnerability_count_delta ?? 0}
                                            </span>
                                        </div>
                                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                            <div
                                                className={`${(readinessDelta?.delta?.vulnerability_count_delta ?? 0) <= 0 ? 'bg-emerald-500' : 'bg-amber-500'} h-full`}
                                                style={{ width: `${Math.min(100, Math.abs((readinessDelta?.delta?.vulnerability_count_delta ?? 0) * 15))}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                                        Previous 7d Readiness: {readinessDelta?.previous?.readiness_avg_score ?? 0}
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="glass rounded-3xl p-8 border border-white/5 overflow-hidden relative">
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <Brain className="w-5 h-5 text-purple-500" /> Skill Dependency Graph
                                </h3>
                                <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-gray-500">
                                    Visualizing {activeAnalysis?.knowledge_graph?.nodes?.length || 0} Knowledge Nodes
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-8 min-h-[400px]">
                                <div className="flex-1 relative flex items-center justify-center">
                                    <KnowledgeGraph
                                        data={activeAnalysis?.knowledge_graph}
                                        onNodeClick={setSelectedNode}
                                        selectedId={selectedNode?.id}
                                    />

                                    <div className="absolute bottom-4 right-4 flex gap-4">
                                        <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                            <div className="w-2 h-2 rounded-full bg-blue-500" /> Class
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500" /> Function
                                        </div>
                                    </div>
                                </div>

                                {selectedNode && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="w-full lg:w-80 glass bg-white/5 rounded-2xl p-6 border border-white/10"
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h4 className="text-xl font-bold text-white">{selectedNode.label}</h4>
                                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{selectedNode.type}</span>
                                            </div>
                                            <button onClick={() => setSelectedNode(null)} className="text-gray-500 hover:text-white">×</button>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Intent & Purpose</h5>
                                                <p className="text-xs text-gray-400 leading-relaxed italic">
                                                    "{selectedNode.doc}"
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                                    <div className="text-[10px] text-gray-500 uppercase mb-1">Scale</div>
                                                    <div className="text-sm font-bold text-blue-400">{selectedNode.metrics?.lines || 0} Lines</div>
                                                </div>
                                                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                                    <div className="text-[10px] text-gray-500 uppercase mb-1">Complexity</div>
                                                    <div className="text-sm font-bold text-purple-400">{selectedNode.metrics?.complexity || 1} Blocks</div>
                                                </div>
                                                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                                    <div className="text-[10px] text-gray-500 uppercase mb-1">Coupling</div>
                                                    <div className="text-sm font-bold text-emerald-400">
                                                        {activeAnalysis?.knowledge_graph?.edges?.filter((e: any) => e.source === selectedNode.id || e.target === selectedNode.id).length || 0} Nodes
                                                    </div>
                                                </div>
                                                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                                    <div className="text-[10px] text-gray-500 uppercase mb-1">Cognitive Load</div>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        {[1, 2, 3, 4, 5].map(step => (
                                                            <div
                                                                key={step}
                                                                className={`h-1.5 flex-1 rounded-full ${(selectedNode.metrics?.complexity || 1) / 3 >= step ? 'bg-purple-500' : 'bg-white/10'
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                )}
                            </div>
                        </div>



                        {/* Security & Cloud Cards */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass rounded-3xl p-8 border border-white/5 bg-blue-500/5"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-blue-400" /> Security Maturity
                                    </h3>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${activeAnalysis?.security?.security_score > 80 ? 'bg-emerald-400/10 text-emerald-400' :
                                        activeAnalysis?.security?.security_score > 60 ? 'bg-amber-400/10 text-amber-400' : 'bg-red-400/10 text-red-400'
                                        }`}>
                                        {activeAnalysis?.security?.maturity_level || "UNKNOWN"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="text-4xl font-bold">{activeAnalysis?.security?.security_score ?? 0}</div>
                                    <div className="text-xs text-gray-500 uppercase font-medium">Safety <br />Index</div>
                                </div>

                                <p className="text-xs text-gray-500 leading-relaxed">
                                    {activeAnalysis?.security?.vulnerabilities?.length === 0 ?
                                        "Static analysis confirms zero critical injection points and secure credential management patterns." :
                                        `Detected ${activeAnalysis?.security?.vulnerabilities?.length} points of interest matching potential OWASP patterns.`}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass rounded-3xl p-8 border border-white/5"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        <Cloud className="w-4 h-4 text-purple-400" /> Cloud Readiness
                                    </h3>
                                </div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="text-4xl font-bold">{activeAnalysis?.cloud_readiness?.readiness_level || "N/A"}</div>
                                    <div className="text-xs text-gray-400 uppercase font-medium">Readiness <br />Score: {activeAnalysis?.cloud_readiness?.cloud_score}%</div>
                                </div>

                                <p className="text-xs text-gray-500 leading-relaxed">
                                    {activeAnalysis?.cloud_readiness?.cloud_score > 80 ?
                                        "Optimized for stateless lambda execution and horizontal scale-out." :
                                        "Architecture shows legacy coupling patterns that may hinder cloud-native scaling."}
                                </p>
                            </motion.div>
                        </div>

                        {/* Weakness Deep Dive */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {activeAnalysis?.weaknesses?.map((w: any, i: number) => (
                                <WeaknessCard
                                    key={i}

                                    icon={w.risk === 'High' ? <ShieldAlert className="w-5 h-5 text-red-400" /> : <Brain className="w-5 h-5 text-amber-400" />}
                                    title={`${w.area || "Architecture"}: ${w.label || "Analysis Area"}`}
                                    risk={w.risk + " Risk"}
                                    message={w.message}
                                />

                            )) || (
                                    <>
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
                                    </>
                                )}
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

function SkillNode({ x, y, label, color, type, isSelected, onClick }: any) {
    return (
        <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="cursor-pointer group"
            onClick={onClick}
        >
            <circle
                cx={x} cy={y}
                r={type === 'class' ? "12" : "8"}
                fill={color}
                className={`transition-all duration-300 ${isSelected ? 'opacity-100' : 'opacity-20 group-hover:opacity-60'}`}
            />
            {isSelected && (
                <motion.circle
                    cx={x} cy={y}
                    r={type === 'class' ? "18" : "14"}
                    fill="none"
                    stroke={color}
                    strokeWidth="1"
                    strokeDasharray="4 2"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                />
            )}
            <circle cx={x} cy={y} r={type === 'class' ? "6" : "4"} fill={color} />
            <text x={x} y={y} dy={type === 'class' ? "-24" : "-18"} textAnchor="middle" fill={isSelected ? "white" : "#666"} fontSize="8" fontWeight="bold" className="group-hover:fill-white uppercase tracking-tighter transition-all">
                {label}
            </text>
        </motion.g>
    );
}

function KnowledgeGraph({ data, onNodeClick, selectedId }: { data: any, onNodeClick: (node: any) => void, selectedId?: string }) {
    if (!data || !data.nodes || data.nodes.length === 0) {
        // Fallback mock for empty state
        return (
            <svg width="100%" height="300" className="max-w-[600px] opacity-80">
                <circle cx="50%" cy="50%" r="40" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" />
                <text x="50%" y="50%" textAnchor="middle" fill="#444" fontSize="10">No dependencies scanned</text>
            </svg>
        );
    }

    const width = 600;
    const height = 400;

    // Simple layout: spread nodes in a circle or grid
    const nodes = data.nodes.map((node: any, i: number) => {
        const angle = (i / data.nodes.length) * 2 * Math.PI;
        const radius = 130;
        return {
            ...node,
            x: (width / 2) + radius * Math.cos(angle),
            y: (height / 2) + radius * Math.sin(angle)
        };
    });

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="opacity-90">
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Edges */}
            {data.edges.map((edge: any, i: number) => {
                const source = nodes.find(n => n.id === edge.source);
                const target = nodes.find(n => n.id === edge.target);
                if (!source || !target) return null;
                const isHighlighted = selectedId === source.id || selectedId === target.id;
                return (
                    <motion.line
                        key={i}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        x1={source.x} y1={source.y}
                        x2={target.x} y2={target.y}
                        stroke={isHighlighted ? "#3b82f6" : "#222"}
                        strokeWidth={isHighlighted ? "2" : "1"}
                        strokeOpacity={isHighlighted ? 0.8 : 0.4}
                    />
                );
            })}

            {/* Nodes */}
            {nodes.map((node: any, i: number) => (
                <SkillNode
                    key={i}
                    x={node.x} y={node.y}
                    label={node.label}
                    color={node.type === 'class' ? '#3b82f6' : '#10b981'}
                    type={node.type}
                    isSelected={selectedId === node.id}
                    onClick={() => onNodeClick(node)}
                />
            ))}
        </svg>
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
