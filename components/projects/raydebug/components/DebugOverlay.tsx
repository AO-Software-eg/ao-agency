"use client";

import { Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import FPSCounter from "./FPSCounter";
import MemoryGraph from "./MemoryGraph";
import DrawCalls from "./DrawCalls";
import FrameTime from "./FrameTime";
import PerformancePanel from "./PerformancePanel";

export default function DebugOverlay() {
    return (
        <div
            className={cn(
                "relative flex h-full w-full items-center justify-center overflow-hidden",
                "bg-[#030712]",
            )}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.08]"
                style={{
                    backgroundImage:
                        "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                    maskImage:
                        "radial-gradient(ellipse at center, black 40%, transparent 85%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse at center, black 40%, transparent 85%)",
                }}
            />

            <div
                className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[50rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
                style={{
                    background:
                        "radial-gradient(circle, rgba(244,63,94,.22) 0%, rgba(34,211,238,.15) 40%, transparent 70%)",
                }}
            />
            <div
                className="pointer-events-none absolute -bottom-40 right-0 h-96 w-[30rem] rounded-full opacity-30 blur-3xl"
                style={{
                    background:
                        "radial-gradient(circle, rgba(34,211,238,.22) 0%, transparent 70%)",
                }}
            />

            <div className="relative z-10 w-full max-w-5xl p-4 md:p-6 lg:p-8">
                <div className="mx-auto mb-5 flex max-w-[360px] items-center justify-between rounded-full border border-slate-700/60 bg-slate-900/60 px-3.5 py-1.5 shadow-[0_0_30px_-5px_rgba(244,63,94,.35)] backdrop-blur-md">
                    <div className="flex items-center gap-2">
                        <span
                            className="relative flex size-2 items-center justify-center"
                            aria-hidden
                        >
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75" />
                            <span className="relative inline-flex size-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,.9)]" />
                        </span>
                        <Radio className="size-3.5 text-rose-400" />
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] tracking-wide">
                        <span className="text-slate-400">raydebug</span>
                        <span className="text-slate-600">v1.4.0</span>
                        <span className="text-slate-600">●</span>
                        <span className="text-emerald-400">connected</span>
                    </div>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <span
                                key={i}
                                className="size-1.5 rounded-full bg-cyan-400/80"
                                style={{
                                    animation: `raydebug-pulse 1.6s ease-in-out ${
                                        i * 0.18
                                    }s infinite`,
                                    opacity: 0.85 - i * 0.2,
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    <div className="xl:col-span-1">
                        <FPSCounter />
                    </div>
                    <div className="xl:col-span-1">
                        <FrameTime />
                    </div>
                    <div className="xl:col-span-1">
                        <DrawCalls />
                    </div>

                    <div className="md:col-span-2 xl:col-span-2">
                        <MemoryGraph />
                    </div>
                    <div className="md:col-span-2 xl:col-span-1 md:row-span-2">
                        <PerformancePanel />
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-slate-600">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-lime-400" />
                            session: srv-0x4a1f
                        </span>
                        <span>uptime 00:14:28</span>
                        <span>pid 38219</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span>region: eu-west-2</span>
                        <span className="flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            ws latency 12ms
                        </span>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes raydebug-pulse {
                    0%, 100% { transform: scale(1); opacity: 0.9; }
                    50% { transform: scale(1.65); opacity: 0.3; }
                }
            `}</style>
        </div>
    );
}
