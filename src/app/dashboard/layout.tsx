"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Brain,
    Dna,
    Database,
    Shield,
    Cloud,
    Settings,
    Search,
    Bell,
    User,
    Menu,
    X,
    ChevronRight,
    ChevronDown,
    ExternalLink,
    HelpCircle
} from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [assistantProfile, setAssistantProfile] = useState<any>(null);
    const pathname = usePathname();

    useEffect(() => {
        import("@/lib/api").then(api => {
            api.getAssistantProfile().then(setAssistantProfile).catch(() => { });
        });
    }, []);

    const navItems = [
        { name: "Fleet Overview", icon: LayoutDashboard, href: "/dashboard" },
        { name: "Intelligence Center", icon: Brain, href: "/dashboard/intelligence" },
        { name: "Digital Twin", icon: Dna, href: "/dashboard/digital-twin" },
        { name: "Neural Deployment", icon: Cloud, href: "/dashboard/deployment" },
    ];

    const secondaryItems = [
        { name: "Infrastructure", icon: Database, href: "/dashboard/infrastructure" },
        { name: "Security Console", icon: Shield, href: "/dashboard/security" },
        { name: "Cloud Readiness", icon: Cloud, href: "/dashboard/cloud" },
    ];

    return (
        <div className="flex h-screen bg-[#02040a] text-slate-100 overflow-hidden selection:bg-indigo-500/30">
            {/* Sidebar */}
            <aside
                className={`flex-shrink-0 bg-[#0d1117]/40 backdrop-blur-3xl border-r border-white/5 transition-all duration-500 ease-out ${isSidebarOpen ? "w-72" : "w-24"
                    } flex flex-col relative z-[50]`}
            >
                {/* Logo */}
                <div className="h-20 flex items-center px-8">
                    <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                            <span className="font-black text-white text-2xl tracking-tighter italic">N</span>
                        </div>
                        {isSidebarOpen && (
                            <span className="font-black text-xl tracking-tighter italic bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">NeuroForge</span>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-10 custom-scrollbar">
                    <div>
                        {isSidebarOpen && <p className="text-[10px] font-black text-slate-600 uppercase tracking-[.4em] mb-6 px-4">Core Console</p>}
                        <ul className="space-y-2">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={`premium-sidebar-item ${isActive ? "premium-sidebar-item-active" : ""} ${!isSidebarOpen ? "justify-center px-0" : ""}`}
                                        >
                                            <item.icon className={`w-5 h-5 ${isActive ? "text-indigo-400" : "text-slate-500"}`} />
                                            {isSidebarOpen && <span className="tracking-tight">{item.name}</span>}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div>
                        {isSidebarOpen && <p className="text-[10px] font-black text-slate-600 uppercase tracking-[.4em] mb-6 px-4">Global Governance</p>}
                        <ul className="space-y-2">
                            {secondaryItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={`premium-sidebar-item ${!isSidebarOpen ? "justify-center px-0" : ""}`}
                                    >
                                        <item.icon className="w-5 h-5 text-slate-500" />
                                        {isSidebarOpen && <span className="tracking-tight">{item.name}</span>}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                {/* Footer Actions */}
                <div className="p-6 border-t border-white/5 space-y-2">
                    <Link href="/dashboard/settings" className="premium-sidebar-item">
                        <Settings className="w-5 h-5 text-slate-500" />
                        {isSidebarOpen && <span className="tracking-tight">System Settings</span>}
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="premium-sidebar-item w-full"
                    >
                        {isSidebarOpen ? <X className="w-5 h-5 text-slate-500" /> : <Menu className="w-5 h-5 text-slate-500" />}
                        {isSidebarOpen && <span className="tracking-tight">Collapse Network</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Background Ambient Glows */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                {/* Topbar */}
                <header className="h-20 flex-shrink-0 bg-[#02040a]/40 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-10 relative z-20">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 text-slate-500 font-black uppercase tracking-[.3em] text-[10px]">
                            <span className="text-indigo-400">Node</span> / <span className="text-white">Forge</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-800" />
                        <div className="flex items-center gap-2">
                            {pathname.split('/').filter(p => p).map((part, i, arr) => (
                                <React.Fragment key={part}>
                                    <span className={`text-[11px] font-black italic tracking-tighter ${i === arr.length - 1 ? 'text-white' : 'text-slate-500'}`}>
                                        {part.toUpperCase()}
                                    </span>
                                    {i < arr.length - 1 && <ChevronRight className="w-3 h-3 text-slate-800" />}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        {/* Service Health indicator */}
                        <div className="hidden xl:flex items-center gap-3 px-4 py-1.5 bg-indigo-500/5 border border-indigo-500/10 rounded-full shadow-[inset_0_0_10px_rgba(99,102,241,0.05)]">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Network_Latency: 12ms</span>
                        </div>

                        <div className="relative hidden md:block">
                            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                            <input
                                type="text"
                                placeholder="Search the machine..."
                                className="bg-white/5 border border-white/5 rounded-xl pl-11 pr-4 py-2 text-xs w-72 focus:outline-none focus:border-indigo-500/30 transition-all text-slate-100 placeholder:text-slate-600"
                            />
                        </div>

                        <div className="flex items-center gap-4 border-l border-white/5 pl-8">
                            <button className="p-2 text-slate-500 hover:text-white transition-all relative group">
                                <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#02040a]"></span>
                            </button>

                            <div className="flex items-center gap-4 ml-2 bg-white/5 hover:bg-white/10 p-1.5 pr-4 rounded-2xl transition-all cursor-pointer group border border-white/5">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-500 bg-size-200 animate-gradient-x flex items-center justify-center font-black text-xs text-white shadow-lg group-hover:shadow-indigo-500/20 translate-z-0">
                                    {assistantProfile?.name?.charAt(0) || 'JJ'}
                                </div>
                                <div className="hidden lg:block text-left">
                                    <p className="text-[11px] font-black text-white leading-none flex items-center gap-2 group-hover:text-indigo-400 transition-colors">
                                        {assistantProfile?.name || 'Jibin Jose'} <ChevronDown className="w-3 h-3 text-slate-600" />
                                    </p>
                                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1">Prime_User</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
