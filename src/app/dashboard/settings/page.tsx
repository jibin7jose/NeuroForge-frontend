"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Settings,
    User,
    Shield,
    Bell,
    Cpu,
    Dna,
    Save,
    RefreshCw,
    Lock,
    Eye,
    EyeOff,
    Zap,
    Brain,
    Activity,
    Fingerprint
} from "lucide-react";
import { getAssistantProfile, updateAssistantProfile } from "@/lib/api";

export default function SettingsPage() {
    const [profile, setProfile] = useState<any>({ name: "", identity: "Neural Architect", autoScan: true });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showApiKey, setShowApiKey] = useState(false);
    const [activeSection, setActiveSection] = useState("profile");

    useEffect(() => {
        getAssistantProfile().then(data => {
            setProfile(data || { name: "NeuroForge Prime", identity: "System Architect", autoScan: true });
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            // Simulated save for assistant profile identity
            await updateAssistantProfile(profile);
            setTimeout(() => setSaving(false), 1000);
        } catch (e) {
            setSaving(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#02040a] p-10 space-y-12">
            <header className="space-y-4">
                <div className="flex items-center gap-3 text-indigo-400 text-[10px] font-black uppercase tracking-[.4em] mb-2">
                    <Settings className="w-4 h-4" />
                    System Configuration_Environment
                </div>
                <h1 className="text-5xl font-black tracking-tighter italic uppercase flex items-center gap-6">
                    Settings <span className="text-slate-800">/</span> <span className="text-indigo-500 font-display">Console</span>
                </h1>
            </header>

            <div className="grid lg:grid-cols-12 gap-10">
                {/* Navbar */}
                <div className="lg:col-span-3 space-y-4">
                    <NavBtn active={activeSection === 'profile'} onClick={() => setActiveSection('profile')} icon={<User />} label="Neural Identity" />
                    <NavBtn active={activeSection === 'intelligence'} onClick={() => setActiveSection('intelligence')} icon={<Brain />} label="AI Constraints" />
                    <NavBtn active={activeSection === 'security'} onClick={() => setActiveSection('security')} icon={<Shield />} label="Guardrails" />
                    <NavBtn active={activeSection === 'connectivity'} onClick={() => setActiveSection('connectivity')} icon={<Fingerprint />} label="API Mesh" />
                </div>

                {/* Content Area */}
                <div className="lg:col-span-9">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="premium-card p-12 bg-white/[0.01] border-white/5 space-y-12"
                    >
                        {activeSection === 'profile' && (
                            <div className="space-y-10">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black italic tracking-tighter uppercase">Neural Identity Matrix</h3>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Configure your primary developer avatar and behavioral bias.</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-1">Avatar Designation</label>
                                        <input
                                            type="text"
                                            value={profile?.name || ""}
                                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                            className="w-full bg-[#02040a] border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:border-indigo-500/30 transition-all shadow-inner"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-1">Behavioral Archetype</label>
                                        <select
                                            value={profile?.identity || "System Architect"}
                                            onChange={(e) => setProfile({ ...profile, identity: e.target.value })}
                                            className="w-full bg-[#02040a] border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:border-indigo-500/30 transition-all shadow-inner uppercase italic"
                                        >
                                            <option>System Architect</option>
                                            <option>Performance Optimizer</option>
                                            <option>Security Guardian</option>
                                            <option>Semantic Engineer</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-6 pt-10 border-t border-white/5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-sm font-black uppercase tracking-widest">Autonomous Intelligence Sync</h4>
                                            <p className="text-[10px] text-slate-500 font-medium">Allow NeuroForge Prime to trigger scans based on git push events.</p>
                                        </div>
                                        <button
                                            onClick={() => setProfile({ ...profile, autoScan: !profile.autoScan })}
                                            className={`w-14 h-8 rounded-full transition-all flex items-center px-1 ${profile.autoScan ? 'bg-indigo-600' : 'bg-slate-800'}`}
                                        >
                                            <motion.div animate={{ x: profile.autoScan ? 24 : 0 }} className="w-6 h-6 bg-white rounded-full shadow-lg" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'connectivity' && (
                            <div className="space-y-10">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black italic tracking-tighter uppercase">API Mesh Connectivity</h3>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Manage authentication tokens and external service bridges.</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-1">Neural Core API Key</label>
                                        <div className="relative">
                                            <input
                                                type={showApiKey ? "text" : "password"}
                                                readOnly
                                                value="nf_live_8290x_structural_identity_key_9281"
                                                className="w-full bg-[#02040a] border border-white/5 rounded-2xl px-6 py-4 text-sm font-mono text-indigo-400 focus:outline-none"
                                            />
                                            <button
                                                onClick={() => setShowApiKey(!showApiKey)}
                                                className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                                            >
                                                {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 bg-indigo-500/5 border border-indigo-500/10 rounded-3xl flex items-center gap-6">
                                    <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black uppercase tracking-widest italic">High Performance Gateway</h4>
                                        <p className="text-[10px] text-slate-500 font-medium">Your current API plan is optimized for O(1) intelligence retrieval.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'intelligence' && (
                            <div className="space-y-10">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black italic tracking-tighter uppercase">AI Constraints Engine</h3>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Tune limits on swarm refactoring and behavioral boundary modeling.</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div className="p-6 bg-[#02040a] border border-white/5 rounded-2xl space-y-4 shadow-inner">
                                        <label className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block">Aggression Index</label>
                                        <input type="range" className="w-full accent-emerald-500" defaultValue="4" max="10" />
                                        <div className="flex justify-between text-[8px] text-slate-500 uppercase font-bold">
                                            <span>Conservative</span>
                                            <span>Catastrophic</span>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-[#02040a] border border-white/5 rounded-2xl space-y-4 shadow-inner">
                                        <label className="text-[10px] font-black text-purple-400 uppercase tracking-widest block">Semantic Tolerance</label>
                                        <input type="range" className="w-full accent-purple-500" defaultValue="8" max="10" />
                                        <div className="flex justify-between text-[8px] text-slate-500 uppercase font-bold">
                                            <span>Rigid</span>
                                            <span>Fluid</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'security' && (
                            <div className="space-y-10">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black italic tracking-tighter uppercase">Action Guardrails</h3>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Determine scope and permissions for real-time GitHub PR operations.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl">
                                        <div>
                                            <h4 className="text-sm font-black uppercase tracking-widest text-slate-300">Auto-Apply ReDoS Fixes</h4>
                                            <p className="text-[10px] text-rose-400/80 font-medium">Bypass approval pipeline if catastrophic backtracking is detected.</p>
                                        </div>
                                        <button className="w-14 h-8 rounded-full transition-all flex items-center px-1 bg-rose-600">
                                            <motion.div className="w-6 h-6 bg-white rounded-full shadow-lg" animate={{ x: 24 }} />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-2xl">
                                        <div>
                                            <h4 className="text-sm font-black uppercase tracking-widest text-slate-300">Require Peer-Node Approval</h4>
                                            <p className="text-[10px] text-slate-500 font-medium">Always request human or secondary AI validation before committing patches.</p>
                                        </div>
                                        <button className="w-14 h-8 rounded-full transition-all flex items-center px-1 bg-slate-800">
                                            <motion.div className="w-6 h-6 bg-slate-400 rounded-full shadow-lg" animate={{ x: 0 }} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="pt-10 border-t border-white/5 flex justify-end gap-4">
                            <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 transition-all">Discard Changes</button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-10 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 shadow-xl shadow-indigo-600/20"
                            >
                                {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Save Blueprint
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function NavBtn({ active, onClick, icon, label }: any) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl border transition-all group ${active
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/20'
                : 'bg-white/[0.01] border-white/5 text-slate-500 hover:bg-white/5 hover:border-white/10'}`}
        >
            <div className={`p-2 rounded-lg ${active ? 'bg-white/10 text-white' : 'bg-white/5 text-slate-600 group-hover:text-indigo-400'} transition-all`}>
                {React.cloneElement(icon, { className: "w-4 h-4" })}
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
        </button>
    );
}
