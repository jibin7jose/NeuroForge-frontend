"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Code2,
    Cpu,
    Zap,
    CheckCircle2,
    AlertCircle,
    Play,
    Target,
    ShieldCheck,
    Cloud,
    Activity,
    Dna
} from "lucide-react";





import Link from "next/link";
import { getProjects, analyzeCode } from "@/lib/api";

export default function DashboardPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const [analyzing, setAnalyzing] = useState(false);

    useEffect(() => {
        getProjects().then(data => {
            setProjects(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const handleQuickAnalyze = async () => {
        setAnalyzing(true);
        const demoCode = `def slow_function(items):\n    for i in items:\n        for j in items:\n            for k in items:\n                print(i, j, k)`;
        try {
            const result = await analyzeCode(demoCode, 'python');
            setAnalysisResult(result);
        } catch (error) {
            console.error(error);
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-2">Project Intelligence</h1>
                        <p className="text-gray-400">Manage and analyze your synchronized codebases.</p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/dashboard/intelligence">
                            <button className="flex items-center gap-2 px-6 py-3 glass border border-blue-500/30 text-blue-400 rounded-xl font-semibold hover:bg-blue-500/10 transition-all">
                                <Cpu className="w-5 h-5" /> Intelligence Center
                            </button>
                        </Link>
                        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-xl font-semibold hover:bg-blue-700 transition-all">
                            <Plus className="w-5 h-5" /> Import Project
                        </button>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <StatCard label="Global Rank" value="#1,240" delta="+12" trend="up" />
                    <StatCard label="Avg. Code Quality" value="84/100" delta="+4.2%" trend="up" />
                    <StatCard label="Skills Analyzed" value="24" delta="+2" trend="up" />
                </div>

                {/* Intelligence Actions */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Project List */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Code2 className="w-5 h-5 text-blue-500" /> Active Repositories
                            </h2>
                            <div className="flex gap-2">
                                <div className="relative">
                                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Search projects..."
                                        className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className="h-64 flex items-center justify-center glass rounded-2xl">
                                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
                            </div>
                        ) : (
                            projects.map((project: any) => (
                                <ProjectCard key={project.id} project={project} />
                            ))
                        )}
                    </div>

                    {/* Quick Analysis Sidebar */}
                    <div className="space-y-6">
                        <div className="glass rounded-2xl p-6 border border-white/5">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Cpu className="w-5 h-5 text-purple-500" /> Dynamic Code Scan
                            </h3>
                            <p className="text-sm text-gray-400 mb-6">
                                Paste a snippet or run a quick scan on your latest changes to see intelligence metrics.
                            </p>

                            <button
                                onClick={handleQuickAnalyze}
                                disabled={analyzing}
                                className="w-full py-4 glass border border-blue-500/30 text-blue-400 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-500/10 transition-all disabled:opacity-50"
                            >
                                {analyzing ? (
                                    <div className="animate-spin w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full" />
                                ) : (
                                    <><Zap className="w-5 h-5" /> Run Intelligence Scan</>
                                )}
                            </button>

                            {analysisResult && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 pt-6 border-t border-white/10"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-xs font-semibold text-gray-500 uppercase">Analysis Results</span>
                                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-[10px] font-bold">LATEST</span>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-400">Clean Code Score</span>
                                            <span className="text-sm font-bold text-emerald-400">{analysisResult.metrics?.clean_code_score}/100</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-400">DNA Signature</span>
                                            <span className="text-[10px] font-bold text-purple-400 truncate max-w-[120px]">
                                                {analysisResult.dna_fingerprint?.style_signature}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-400">Interview Score</span>
                                            <span className="text-sm font-bold text-blue-400">
                                                {analysisResult.interview_readiness?.overall_score}%
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-400">Security Maturity</span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${analysisResult.security?.security_score > 80 ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'
                                                }`}>
                                                {analysisResult.security?.maturity_level}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-400">Cloud Readiness</span>
                                            <span className="text-sm font-bold text-amber-500">
                                                {analysisResult.cloud_readiness?.cloud_score}%
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-400">Behavioral Trait</span>
                                            <span className="text-[10px] font-bold text-emerald-400">
                                                {analysisResult.behavioral_analysis?.dominant_trait}
                                            </span>
                                        </div>



                                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                            <h4 className="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-1">
                                                <Target className="w-3 h-3" /> Role Fit Probabilities
                                            </h4>

                                            <div className="space-y-2">
                                                {analysisResult.interview_readiness?.role_fit?.map((role: any, i: number) => (
                                                    <div key={i} className="flex justify-between items-center">
                                                        <span className="text-[10px] text-gray-400">{role.role}</span>
                                                        <span className="text-[10px] font-bold text-white">{role.probability}%</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                            <h4 className="text-xs font-bold text-blue-400 mb-2 flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" /> AI Recommendations
                                            </h4>
                                            <ul className="text-[11px] text-gray-400 space-y-2">
                                                {analysisResult.recommendations?.map((rec: string, i: number) => (
                                                    <li key={i} className="flex gap-2">
                                                        <span className="text-blue-500">•</span> {rec}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                </motion.div>
                            )}
                        </div>

                        <div className="glass rounded-2xl p-6 border border-white/10 bg-gradient-to-br from-blue-600/10 to-transparent">
                            <h3 className="font-bold mb-2 flex items-center gap-2">
                                <Dna className="w-4 h-4 text-blue-400" /> Digital Twin Alpha
                            </h3>
                            <p className="text-sm text-gray-400 mb-4">You are 82% ready for Backend Architect roles based on your DNA profile.</p>
                            <Link href="/dashboard/digital-twin">
                                <button className="w-full py-3 bg-white text-black text-xs font-bold rounded-lg hover:bg-gray-200 transition-all">
                                    Access Digital Twin
                                </button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, delta, trend }: any) {
    return (
        <div className="glass p-6 rounded-2xl border border-white/5">
            <p className="text-sm text-gray-500 mb-1">{label}</p>
            <div className="flex items-end gap-3">
                <span className="text-3xl font-bold">{value}</span>
                <span className={`text-xs mb-1 font-bold ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                    {delta}
                </span>
            </div>
        </div>
    );
}

function ProjectCard({ project }: any) {
    return (
        <div className="glass p-6 rounded-2xl border border-white/5 flex items-center justify-between hover:border-white/20 transition-all group cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-blue-500/10 transition-all">
                    <Code2 className="w-6 h-6 text-gray-400 group-hover:text-blue-400" />
                </div>
                <div>
                    <h3 className="font-bold mb-0.5">{project.name}</h3>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" /> synchronized
                        </span>
                        <span className="text-xs text-gray-400 px-2 py-0.5 bg-white/5 rounded">main</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-8">
                <div className="text-right">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Health Score</p>
                    <div className="text-lg font-bold text-emerald-400">{project.score}%</div>
                </div>
                <button className="p-2 hover:bg-white/5 rounded-lg transition-all">
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>
            </div>
        </div>
    );
}
