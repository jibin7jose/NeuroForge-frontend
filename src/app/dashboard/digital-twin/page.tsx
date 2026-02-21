"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dna,
    Shield,
    Cloud,
    Brain,
    Zap,
    Target,
    Activity,
    ChevronLeft,
    ChevronRight,
    Share2,
    Download,
    MessageSquare,
    Send,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Fingerprint,
    Cpu,
    Target as TargetIcon,
    RefreshCw,
    Info,
    ChevronDown,
    Sparkles,
    CircleDot,
    X,
    Lock
} from "lucide-react";
import {
    ResponsiveContainer,
    AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";
import Link from "next/link";
import { getInterviewFeedback, getAssistantProfile } from "@/lib/api";

const mockPerformanceData = [
    { name: 'Mon', score: 65, complexity: 40 },
    { name: 'Tue', score: 72, complexity: 45 },
    { name: 'Wed', score: 68, complexity: 50 },
    { name: 'Thu', score: 85, complexity: 55 },
    { name: 'Fri', score: 92, complexity: 60 },
    { name: 'Sat', score: 88, complexity: 58 },
    { name: 'Sun', score: 95, complexity: 62 },
];

function DigitalTwinContent() {
    const [isClient, setIsClient] = useState(false);
    const [scanResults, setScanResults] = useState<any>(null);
    const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [questionEventMap, setQuestionEventMap] = useState<Record<string, string>>({});
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState<any>(null);
    const [submitting, setSubmitting] = useState(false);
    const [assistantProfile, setAssistantProfile] = useState<any>(null);

    useEffect(() => {
        const stored = localStorage.getItem('lastScan');
        setIsClient(true);
        getAssistantProfile().then(setAssistantProfile).catch(() => setAssistantProfile(null));
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setScanResults(parsed);
                const telemetry = parsed?.telemetry;
                setSessionId(telemetry?.session_id || null);
                const mapping: Record<string, string> = {};
                (telemetry?.question_events || []).forEach((event: any) => {
                    if (event?.question && event?.id) {
                        mapping[event.question] = event.id;
                    }
                });
                setQuestionEventMap(mapping);
            } catch (e) {
                console.error("Failed to parse stored scan", e);
            }
        }
    }, []);

    const handleAnswerSubmit = async () => {
        if (!selectedQuestion || !answer.trim()) return;
        setSubmitting(true);
        try {
            const result = await getInterviewFeedback(selectedQuestion, answer, {
                sessionId: sessionId || undefined,
                questionEventId: questionEventMap[selectedQuestion],
            });
            setFeedback(result);
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#02040a]">
            {/* Cinematic Header */}
            <header className="bg-[#02040a]/80 backdrop-blur-2xl border-b border-white/5 px-10 pt-10 pb-2 relative overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[150%] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 relative z-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-purple-400 text-[10px] font-black uppercase tracking-[.4em] mb-2 animate-pulse">
                            <Fingerprint className="w-4 h-4" />
                            Behavioral Identity Matrix v4.2
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter italic flex items-center gap-6">
                            {assistantProfile?.name || 'Developer'} <span className="text-slate-700">#4290</span>
                            <span className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-purple-500/20 transition-all text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                                <Share2 className="w-3.5 h-3.5" /> Share Identity
                            </span>
                        </h1>
                        <div className="flex items-center gap-5 text-slate-500 font-mono text-[10px] tracking-tight">
                            <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">arn:neuroforge::identity/active-node-prime</span>
                            <span className="flex items-center gap-1.5"><CircleDot className="w-2.5 h-2.5 text-purple-500" /> IDENTITY_LOCKED</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pb-2">
                        <button suppressHydrationWarning className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-slate-300">
                            <Download className="w-4 h-4" /> Export DNA
                        </button>
                    </div>
                </div>

                {/* Identity Quick Stats */}
                <div className="flex flex-wrap items-center gap-12 py-6 border-t border-white/5 relative z-10">
                    <QuickStat label="Trust Score" value="98%" trend="OPTIMAL" color="text-emerald-400" />
                    <QuickStat label="Engineering Tier" value="Elite Architect" trend="LVL_82" color="text-indigo-400" />
                    <QuickStat label="Neural Consistency" value="94.2%" trend="+1.2%" color="text-purple-400" />
                    <div className="ml-auto hidden xl:flex items-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                        <RefreshCw className="w-3 h-3 text-purple-500" /> Last Synthesis: 124s ago
                    </div>
                </div>
            </header>

            {/* Main Content Grid */}
            <main className="p-10 grid lg:grid-cols-12 gap-10">
                {/* Profile Sidebar */}
                <div className="lg:col-span-4 space-y-10">
                    <div className="premium-card p-12 flex flex-col items-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-500 bg-size-200 animate-gradient-x" />

                        <div className="relative mb-10">
                            <div className="absolute inset-0 bg-indigo-500/20 blur-[30px] rounded-full scale-110 group-hover:scale-150 transition-transform duration-700" />
                            <div className="w-32 h-32 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-[40px] flex items-center justify-center shadow-2xl relative z-10">
                                <Dna className="w-16 h-16 text-white" />
                            </div>
                        </div>

                        <h2 className="text-3xl font-black italic tracking-tighter text-white mb-2">{assistantProfile?.name || 'Developer Node'}</h2>
                        <div className="px-5 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black text-indigo-400 uppercase tracking-[.3em] mb-12 animate-pulse">
                            {scanResults?.behavioral_analysis?.dominant_trait || 'Neural Architect'}
                        </div>

                        <div className="w-full space-y-8">
                            <IdentityTrait label="Evolution Velocity" value={scanResults?.dna_fingerprint?.maturity_score || 82} color="bg-emerald-500" />
                            <IdentityTrait label="Structural Discipline" value={scanResults?.dna_fingerprint?.discipline_index || 75} color="bg-indigo-500" />
                            <IdentityTrait label="Computational Optimality" value={scanResults?.behavioral_analysis?.behavioral_profile?.logic_efficiency || 85} color="bg-purple-500" />
                            <IdentityTrait label="Semantic Clarity" value={scanResults?.metrics?.semantic_density || 64} color="bg-amber-500" />
                        </div>

                        <div className="mt-12 pt-10 border-t border-white/5 w-full flex flex-wrap gap-2 justify-center">
                            {(scanResults?.behavioral_analysis?.traits || ["Arch Strategist", "Optimizer", "DefensiveCoder"]).map((trait: string, i: number) => (
                                <span key={i} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-white hover:border-white/10 transition-all cursor-default">
                                    {trait}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="premium-card p-10 relative overflow-hidden">
                        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[80px] pointer-events-none" />
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[.3em] mb-10">Neural Velocity Index</h3>
                        <div className="h-[250px] min-w-0">
                            {isClient && (
                                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={180}>
                                    <AreaChart data={mockPerformanceData}>
                                        <defs>
                                            <linearGradient id="valGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1d2433" vertical={false} strokeOpacity={0.1} />
                                        <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} fontStyle="italic" />
                                        <Tooltip contentStyle={{ backgroundColor: '#0d1117', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', backdropFilter: 'blur(10px)' }} />
                                        <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#valGrad)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>
                </div>

                {/* Simulation and Detailed Metrics */}
                <div className="lg:col-span-8 space-y-10">
                    {/* Simulation Console */}
                    <div className="premium-card p-12 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent">
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h3 className="text-3xl font-black italic tracking-tighter uppercase flex items-center gap-4">
                                    <Brain className="w-8 h-8 text-indigo-500 animate-pulse" /> Neural Interview Simulation
                                </h3>
                                <p className="text-[11px] text-slate-600 font-black uppercase tracking-[.3em] mt-2">Simulating stakeholder response based on architectural DNA</p>
                            </div>
                            <button suppressHydrationWarning className="p-3 bg-indigo-500/10 rounded-2xl hover:bg-indigo-500/20 transition-all text-indigo-400 shadow-xl shadow-indigo-500/5">
                                <RefreshCw className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid gap-5">
                            {(scanResults?.interview_readiness?.suggested_questions || [
                                "How do you handle state distribution in high-latency meshes?",
                                "Explain the choice of radial optimization over linear scaling.",
                                "Analyze the potential for memory leakage in deep recursive logic."
                            ]).map((q: string, i: number) => (
                                <button
                                    suppressHydrationWarning
                                    key={i}
                                    onClick={() => {
                                        setSelectedQuestion(q);
                                        setAnswer("");
                                        setFeedback(null);
                                    }}
                                    className="text-left p-6 bg-[#02040a]/50 border border-white/5 rounded-3xl hover:bg-white/5 transition-all flex justify-between items-center group relative overflow-hidden"
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors pr-10">{q}</span>
                                    <ArrowUpRight className="w-5 h-5 text-slate-700 group-hover:text-indigo-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Defense & Cloud Cards */}
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="premium-card p-10 group overflow-hidden relative">
                            <div className="absolute right-[-10%] bottom-[-10%] p-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                <Shield className="w-32 h-32" />
                            </div>
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[.4em] mb-8">Security Perimeter</h3>
                            <div className="flex items-center gap-8 mb-10">
                                <div className="p-5 bg-indigo-500/10 rounded-[28px] shadow-inner">
                                    <Shield className="w-10 h-10 text-indigo-500" />
                                </div>
                                <div>
                                    <div className="text-3xl font-black italic tracking-tighter text-white uppercase group-hover:text-indigo-400 transition-colors">{scanResults?.security?.maturity_level || "Fortified"}</div>
                                    <div className="text-[10px] text-slate-500 font-bold tracking-widest mt-1 uppercase">{scanResults?.security?.security_score || 100}% Stability Index</div>
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                Behavioral pattern indicates high focus on input validation and defensive programming structures. Zero critical patterns detected in identity snapshot.
                            </p>
                        </div>

                        <div className="premium-card p-10 group overflow-hidden relative">
                            <div className="absolute right-[-10%] bottom-[-10%] p-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                <Cloud className="w-32 h-32" />
                            </div>
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[.4em] mb-8">Cloud Elasticity</h3>
                            <div className="flex items-center gap-8 mb-10">
                                <div className="p-5 bg-purple-500/10 rounded-[28px] shadow-inner">
                                    <Cloud className="w-10 h-10 text-purple-500" />
                                </div>
                                <div>
                                    <div className="text-3xl font-black italic tracking-tighter text-white uppercase group-hover:text-purple-400 transition-colors">{(scanResults?.cloud_readiness?.cloud_score || 94.2)}%</div>
                                    <div className="text-[10px] text-slate-500 font-bold tracking-widest mt-1 uppercase">Readiness Quotient</div>
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                Highly optimized for distributed execution. Logic structures favor stateless horizontal scaling and low-coupling associations.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Simulation Modal Overlay */}
            <AnimatePresence>
                {selectedQuestion && (
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
                            className="premium-card w-full max-w-4xl bg-[#0d1117]/90 p-16 shadow-[0_0_100px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col items-center"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-600" />

                            <button
                                onClick={() => setSelectedQuestion(null)}
                                className="absolute top-10 right-10 p-3 hover:bg-white/5 rounded-2xl transition-all text-slate-600 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="w-full max-w-2xl space-y-12">
                                <div className="flex items-center gap-5">
                                    <div className="p-4 bg-indigo-500/10 rounded-[30px] border border-indigo-500/20 shadow-xl shadow-indigo-500/5">
                                        <Brain className="w-8 h-8 text-indigo-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black italic tracking-tighter">Identity Validation</h2>
                                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-[.4em]">Simulated Architectural Verification</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[.4em]">Current Challenge</p>
                                    <p className="text-2xl font-black italic text-white leading-tight tracking-tighter">"{selectedQuestion}"</p>
                                </div>

                                {!feedback ? (
                                    <div className="space-y-10">
                                        <div className="relative">
                                            <textarea
                                                value={answer}
                                                onChange={(e) => setAnswer(e.target.value)}
                                                placeholder="Synthesize your architectural response..."
                                                className="w-full h-64 bg-[#02040a] border border-white/5 rounded-[40px] p-10 text-sm font-medium text-slate-300 focus:outline-none focus:border-indigo-500/30 transition-all resize-none shadow-inner"
                                            />
                                            <div className="absolute right-10 bottom-10 p-4 opacity-10 pointer-events-none">
                                                <TargetIcon className="w-12 h-12" />
                                            </div>
                                        </div>
                                        <button
                                            suppressHydrationWarning
                                            onClick={handleAnswerSubmit}
                                            disabled={submitting || !answer.trim()}
                                            className="w-full py-6 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-[30px] font-black text-[11px] uppercase tracking-[.5em] text-white flex items-center justify-center gap-4 transition-all shadow-2xl shadow-indigo-600/20"
                                        >
                                            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-4 h-4 fill-current" />}
                                            Submit for Synthesis
                                        </button>
                                    </div>
                                ) : (
                                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10">
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="premium-card p-10 border-white/5 bg-white/2 text-center group">
                                                <div className="text-6xl font-black italic tracking-tighter text-indigo-400 group-hover:scale-110 transition-transform">{feedback.score}</div>
                                                <div className="text-[10px] font-black text-slate-600 uppercase tracking-[.4em] mt-4">Identity Alignment</div>
                                            </div>
                                            <div className="premium-card p-10 border-white/5 bg-white/2 text-center flex flex-col items-center justify-center group">
                                                {feedback.status === 'Strong' ? <CheckCircle2 className="w-12 h-12 text-emerald-500 group-hover:scale-110 transition-transform" /> : <AlertCircle className="w-12 h-12 text-amber-500 group-hover:scale-110 transition-transform" />}
                                                <div className="text-[10px] font-black text-slate-600 uppercase tracking-[.4em] mt-4">Synthesis Result: {feedback.status}</div>
                                            </div>
                                        </div>

                                        <div className="p-10 bg-indigo-500/5 border border-indigo-500/10 rounded-[40px] relative overflow-hidden min-h-[160px] flex items-center justify-center">
                                            <div className="absolute top-[-20%] left-[-10%] p-10 opacity-[0.03]">
                                                <Sparkles className="w-32 h-32" />
                                            </div>
                                            <p className="text-sm text-slate-300 leading-relaxed italic font-medium text-center relative z-10">"{feedback.critique}"</p>
                                        </div>

                                        <button
                                            onClick={() => { setFeedback(null); setAnswer(""); }}
                                            className="w-full py-6 bg-white/5 border border-white/10 rounded-[30px] font-black text-[11px] uppercase tracking-[.5em] text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                                        >
                                            Try Different Logic Path
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function QuickStat({ label, value, trend, color }: any) {
    return (
        <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-[.3em]">{label}</span>
            <div className="flex items-center gap-3">
                <span className={`text-xl font-black italic tracking-tighter ${color}`}>{value}</span>
                <span className="px-2 py-0.5 bg-white/5 border border-white/5 rounded text-[9px] font-black tracking-widest text-slate-500">{trend}</span>
            </div>
        </div>
    );
}

function IdentityTrait({ label, value, color }: any) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[.3em]">
                <span className="text-slate-600">{label}</span>
                <span className="text-white italic">{value}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    className={`h-full ${color} shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
                />
            </div>
        </div>
    );
}

function ArrowUpRight(props: any) { return <Activity {...props} /> } // Rough mock for now

export default function DigitalTwinPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-[600px] bg-[#02040a]">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin shadow-[0_0_20px_rgba(168,85,247,0.2)]" />
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[.4em] animate-pulse">Forging Digital Identity...</p>
                </div>
            </div>
        }>
            <DigitalTwinContent />
        </Suspense>
    );
}
