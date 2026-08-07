"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FPSCounter() {
    const [fps, setFps] = useState<number>(152);
    const [peak, setPeak] = useState<number>(165);
    const [avg, setAvg] = useState<number>(154);
    const [history, setHistory] = useState<number[]>(
        Array.from({ length: 20 }, () => 150 + Math.random() * 15),
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const base = 145 + Math.random() * 20;
            const jitter = (Math.random() - 0.5) * 4;
            const next = Math.max(140, Math.min(165, base + jitter));
            setFps(Math.round(next * 10) / 10);

            setHistory((prev) => {
                const nextHist = [...prev.slice(1), next];
                const mean = nextHist.reduce((a, b) => a + b, 0) / nextHist.length;
                setAvg(Math.round(mean * 10) / 10);
                const mx = Math.max(...nextHist);
                setPeak(Math.round(mx * 10) / 10);
                return nextHist;
            });
        }, 250);
        return () => clearInterval(interval);
    }, []);

    const pct = Math.min(100, Math.max(0, ((fps - 120) / (170 - 120)) * 100));

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-lg border p-3",
                "bg-slate-900/60 backdrop-blur-md border-slate-700/60",
            )}
        >
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-md bg-rose-500/10 ring-1 ring-rose-500/30">
                        <Activity className="size-3.5 text-rose-400" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400">
                            Frame Rate
                        </p>
                        <p className="font-mono text-xs font-semibold text-slate-200">
                            FPS
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-mono text-2xl font-bold tabular-nums text-rose-400">
                        {fps.toFixed(1)}
                    </p>
                    <p className="text-[10px] text-slate-500">Hz</p>
                </div>
            </div>

            <div className="mt-3">
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800/80 ring-1 ring-slate-700/50">
                    <div
                        className="h-full rounded-full transition-all duration-200 ease-out"
                        style={{
                            width: `${pct}%`,
                            background:
                                "linear-gradient(90deg,#f43f5e,#fb7185,#fda4af)",
                            boxShadow: "0 0 12px rgba(244,63,94,.55)",
                        }}
                    />
                </div>
                <div className="mt-1.5 flex justify-between text-[10px] font-mono tabular-nums">
                    <span className="text-slate-500">
                        avg <span className="text-cyan-400">{avg.toFixed(1)}</span>
                    </span>
                    <span className="text-slate-500">
                        peak <span className="text-rose-400">{peak.toFixed(1)}</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
