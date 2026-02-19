"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dna,
    Shield,
    Cloud,
    Brain,
    TrendingUp,
    Cpu,
    Zap,
    Target,
    Activity,
    ChevronLeft,
    Share2,
    Download,
    MessageSquare,
    Send,
    Loader2,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
    AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";
import Link from "next/link";
import { getInterviewFeedback } from "@/lib/api";


const mockPerformanceData = [
    { name: 'Mon', score: 65, complexity: 40 },
    { name: 'Tue', score: 72, complexity: 45 },
    { name: 'Wed', score: 68, complexity: 50 },
    { name: 'Thu', score: 85, complexity: 55 },
    { name: 'Fri', score: 92, complexity: 60 },
    { name: 'Sat', score: 88, complexity: 58 },
    { name: 'Sun', score: 95, complexity: 62 },
];

export default function DigitalTwinPage() {
    const [isClient, setIsClient] = useState(false);
    const [scanResults, setScanResults] = useState<any>(null);
    const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [questionEventMap, setQuestionEventMap] = useState<Record<string, string>>({});
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState<any>(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('lastScan');
        setIsClient(true);
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
        <div className="min-h-screen bg-[#050505] text-white p-8">
            <div className="max-w-7xl mx-auto">
                {/* Top Nav */}
                <div className="flex justify-between items-center mb-12">
                    <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-white transition-all text-sm">
                        <ChevronLeft className="w-4 h-4" /> Return to Command
                    </Link>
                    <div className="flex gap-4">
                        <button className="p-2 glass rounded-full hover:bg-white/5 transition-all">
                            <Share2 className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 glass border border-blue-500/30 text-blue-400 rounded-lg text-xs font-bold hover:bg-blue-500/10 transition-all">
                            <Download className="w-4 h-4" /> Export DNA
                        </button>
                    </div>
                </div>


                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Profile & Traits Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass rounded-[2.5rem] p-10 border border-white/5 text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-600/20 to-transparent" />
                            <div className="relative z-10">
                                <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-blue-500/40">
                                    <Dna className="w-12 h-12 text-white" />
                                </div>
                                <h1 className="text-2xl font-bold mb-1">Developer #4290</h1>
                                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">Optimization Guru</p>

                                <div className="grid grid-cols-2 gap-4 mt-8">
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="text-2xl font-bold">98</div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Trust Score</div>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="text-2xl font-bold">A+</div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Tier</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="glass rounded-[2.5rem] p-8 border border-white/5"
                        >
                            <h3 className="text-sm font-bold text-gray-500 mb-6 uppercase tracking-widest">Architectural DNA</h3>
                            <div className="space-y-6">
                                <StatLine label="Statelessness" value={scanResults?.cloud_readiness?.cloud_score || 92} color="bg-emerald-500" />
                                <StatLine label="Clean Code" value={scanResults?.metrics?.clean_code_score || 85} color="bg-blue-500" />
                                <StatLine label="Optimization" value={scanResults?.behavioral_analysis?.behavioral_profile?.logic_efficiency || 85} color="bg-purple-500" />
                                <StatLine label="Doc Coverage" value={scanResults?.metrics?.docstring_coverage || 64} color="bg-amber-500" />
                            </div>
                        </motion.div>

                        {/* Trait Badges */}
                        <motion.div

                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap gap-2"
                        >
                            {scanResults?.behavioral_analysis?.traits?.map((trait: string, i: number) => (
                                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    {trait}
                                </span>
                            )) || (
                                    <>
                                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            Architectural Strategist
                                        </span>
                                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            Optimization Guru
                                        </span>
                                    </>
                                )}
                        </motion.div>
                    </div>


                    {/* Performance & Charts Main */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Performance Area */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass rounded-[2.5rem] p-8 border border-white/5"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-500/10 rounded-xl">
                                        <Activity className="w-5 h-5 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">Execution Velocity</h3>
                                        <p className="text-xs text-gray-500">Weekly performance variance</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-emerald-400">
                                        {scanResults?.interview_readiness?.overall_score || 85}%
                                    </div>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">Readiness Score</p>
                                </div>
                            </div>

                            <div className="h-[300px]">
                                {isClient ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={mockPerformanceData}>
                                            <defs>
                                                <linearGradient id="colorScore2" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                                            <XAxis dataKey="name" hide />
                                            <YAxis hide />
                                            <Tooltip
                                                contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '12px' }}
                                            />
                                            <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorScore2)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-full" />
                                )}
                            </div>
                        </motion.div>

                        {/* Feature Cards Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <FeatureStat
                                icon={<Shield className="w-5 h-5 text-blue-500" />}
                                title="Security Perimeter"
                                value={scanResults?.security?.maturity_level || "Fortified"}
                                desc={`${scanResults?.security?.security_score || 100}% Health. ${scanResults?.security?.vulnerabilities?.length || 0} Critical vulnerabilities detected.`}
                            />
                            <FeatureStat
                                icon={<Cloud className="w-5 h-5 text-purple-500" />}
                                title="Cloud Elasticity"
                                value={(scanResults?.cloud_readiness?.cloud_score || 94.2) + "%"}
                                desc="Optimized for distributed lambda execution and horizontal scaling."
                            />
                        </div>

                        {/* Simulated Interview Questions Preview */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass rounded-[2.5rem] p-8 border border-white/5 bg-gradient-to-r from-blue-600/5 to-transparent"
                        >
                            <h3 className="text-sm font-bold text-gray-500 mb-6 uppercase tracking-widest flex items-center gap-2">
                                <Brain className="w-4 h-4 text-blue-400" /> Deep Interview Simulation
                            </h3>
                            <div className="space-y-4">
                                {scanResults?.interview_readiness?.suggested_questions?.map((q: string, i: number) => (
                                    <QuestionCard
                                        key={i}
                                        text={q}
                                        onClick={() => {
                                            setSelectedQuestion(q);
                                            setAnswer("");
                                            setFeedback(null);
                                        }}
                                    />
                                )) || (
                                        <>
                                            <QuestionCard text="How would you optimize the current O(n²) pattern in your data parser?" onClick={() => setSelectedQuestion("How would you optimize the current O(n²) pattern in your data parser?")} />
                                            <QuestionCard text="Explain your strategy for maintaining statelessness in a distributed environment." onClick={() => setSelectedQuestion("Explain your strategy for maintaining statelessness in a distributed environment.")} />
                                        </>
                                    )}
                            </div>

                            <AnimatePresence>
                                {selectedQuestion && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 100 }}
                                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                                    >
                                        <motion.div className="glass w-full max-w-2xl rounded-[2.5rem] border border-white/10 p-10 overflow-hidden relative">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600" />
                                            <button
                                                onClick={() => setSelectedQuestion(null)}
                                                className="absolute top-6 right-8 text-gray-500 hover:text-white transition-colors"
                                            >
                                                Close
                                            </button>

                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="p-3 bg-blue-500/10 rounded-2xl">
                                                    <MessageSquare className="w-6 h-6 text-blue-500" />
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-bold">Behavioral Analysis</h2>
                                                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Simulated Interviewer</p>
                                                </div>
                                            </div>

                                            <div className="mb-8">
                                                <p className="text-gray-400 text-xs mb-2 uppercase font-bold tracking-widest">Question</p>
                                                <p className="text-lg font-medium text-white">{selectedQuestion}</p>
                                            </div>

                                            {!feedback ? (
                                                <div className="space-y-6">
                                                    <textarea
                                                        value={answer}
                                                        onChange={(e) => setAnswer(e.target.value)}
                                                        placeholder="Explain your approach..."
                                                        className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                                                    />
                                                    <button
                                                        onClick={handleAnswerSubmit}
                                                        disabled={submitting || !answer.trim()}
                                                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-bold flex items-center justify-center gap-3 transition-all group"
                                                    >
                                                        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                                        Analyze Answer
                                                    </button>
                                                </div>
                                            ) : (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="space-y-8"
                                                >
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                                                            <div className="text-3xl font-bold text-blue-400">{feedback.score}</div>
                                                            <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Logic Accuracy</div>
                                                        </div>
                                                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center">
                                                            {feedback.status === 'Strong' ? <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-1" /> : <AlertCircle className="w-6 h-6 text-amber-500 mb-1" />}
                                                            <div className="text-[10px] text-gray-500 uppercase tracking-widest">{feedback.status}</div>
                                                        </div>
                                                    </div>

                                                    <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                                                        <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                            <Zap className="w-4 h-4" /> AI Critique
                                                        </h4>
                                                        <p className="text-sm text-gray-300 leading-relaxed italic">"{feedback.critique}"</p>
                                                    </div>

                                                    <button
                                                        onClick={() => {
                                                            setFeedback(null);
                                                            setAnswer("");
                                                        }}
                                                        className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all"
                                                    >
                                                        Try Another Answer
                                                    </button>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>


                    </div>
                </div>
            </div>
        </div>
    );

}

function StatLine({ label, value, color }: any) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                <span className="text-gray-500">{label}</span>
                <span className="text-white">{value}%</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    className={`h-full ${color}`}
                />
            </div>
        </div>
    );
}

function FeatureStat({ icon, title, value, desc }: any) {
    return (
        <div className="glass p-8 rounded-[2rem] border border-white/5 hover:border-white/20 transition-all">
            <div className="p-3 bg-white/5 rounded-2xl w-fit mb-6">
                {icon}
            </div>
            <h4 className="text-lg font-bold mb-1">{title}</h4>
            <div className="text-sm font-bold text-blue-400 mb-4">{value}</div>
            <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
        </div>
    );
}

function QuestionCard({ text, onClick }: { text: string; onClick?: () => void }) {
    return (
        <div
            onClick={onClick}
            className="p-5 bg-white/5 rounded-2xl border border-white/5 flex items-start gap-4 hover:bg-white/10 transition-all group cursor-pointer"
        >
            <div className="mt-1">
                <Target className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
            </div>
            <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{text}</p>
        </div>
    );
}

