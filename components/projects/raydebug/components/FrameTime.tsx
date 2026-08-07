"use client";

import { useEffect, useState } from "react";
import { Gauge } from "lucide-react";
import { cn } from "@/lib/utils";

const FRAME_MIN = 3.2;
const FRAME_AVG = 5.8;
const FRAME_MAX = 8.1;
const FRAME_CEIL = 12;

export default function FrameTime() {
    const [cur, setCur] = useState<number>(5.6);
    const [min, setMin] = useState<number>(FRAME_MIN);
    const [avg, setAvg] = useState<number>(FRAME_AVG);
    const [max, setMax] = useState<number>(FRAME_MAX);
    const [samples, setSamples] = useState<number[]>(
        Array.from({ length: 15 }, () => FRAME_AVG + (Math.random() - 0.5) * 2),
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const drift = (Math.random() - 0.5) * 2.2;
            const next = Math.max(2.8, Math.min(9.2, FRAME_AVG + drift));
            setCur(Math.round(next * 100) / 100);

            setSamples((prev) => {
                const nxt = [...prev.slice(1), next];
                const mn = Math.min(...nxt);
                const mx = Math.max(...nxt);
                const ag = nxt.reduce((a, b) => a + b, 0) / nxt.length;
                setMin(Math.round(mn * 10) / 10);
                setMax(Math.round(mx * 10) / 10);
                setAvg(Math.round(ag * 10) / 10);
                return nxt;
            });
        }, 300);
        return () => clearInterval(interval);
    }, []);

    const curPct = (cur / FRAME_CEIL) * 100;
    const minPct = (min / FRAME_CEIL) * 100;
    const avgPct = (avg / FRAME_CEIL) * 100;
    const maxPct = (max / FRAME_CEIL) * 100;

    const colorFor = (ms: number): string => {
        if (ms < 5) return "#22d3ee";
        if (ms < 7.5) return "#a3e635";
        return "#f43f5e";
    };
    const curColor = colorFor(cur);

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-lg border p-3",
                "bg-slate-900/60 backdrop-blur-md border-slate-700/60",
            )}
        >
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <div
                        className="flex size-7 items-center justify-center rounded-md ring-1"
                        style={{
                            background: `${curColor}12`,
                            borderColor: `${curColor}30`,
                        }}
                    >
                        <Gauge
                            className="size-3.5"
                            style={{ color: curColor }}
                        />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400">
                            Frame Time
                        </p>
                        <p className="font-mono text-xs font-semibold text-slate-200">
                            GPU Latency
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p
                        className="font-mono text-2xl font-bold tabular-nums"
                        style={{ color: curColor }}
                    >
                        {cur.toFixed(2)}
                    </p>
                    <p className="text-[10px] text-slate-500">ms</p>
                </div>
            </div>

            <div className="mt-3">
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-800/80 ring-1 ring-slate-700/50">
                    <div
                        className="absolute left-0 top-0 h-full rounded-full opacity-30"
                        style={{
                            width: `${maxPct}%`,
                            background: "#f43f5e",
                        }}
                    />
                    <div
                        className="absolute left-0 top-0 h-full rounded-full opacity-40"
                        style={{
                            width: `${avgPct}%`,
                            background: "#a3e635",
                        }}
                    />
                    <div
                        className="absolute left-0 top-0 h-full rounded-full"
                        style={{
                            width: `${curPct}%`,
                            background: `linear-gradient(90deg,${curColor},#ffffff55)`,
                            boxShadow: `0 0 10px ${curColor}99`,
                        }}
                    />
                    <div
                        className="absolute top-0 h-full w-0.5 bg-cyan-300"
                        style={{ left: `${minPct}%`, opacity: 0.8 }}
                    />
                </div>

                <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                    <div>
                        <p className="text-[9px] uppercase tracking-wider text-slate-500">
                            min
                        </p>
                        <p className="font-mono text-xs font-semibold tabular-nums text-cyan-400">
                            {min.toFixed(1)}ms
                        </p>
                    </div>
                    <div>
                        <p className="text-[9px] uppercase tracking-wider text-slate-500">
                            avg
                        </p>
                        <p className="font-mono text-xs font-semibold tabular-nums text-lime-400">
                            {avg.toFixed(1)}ms
                        </p>
                    </div>
                    <div>
                        <p className="text-[9px] uppercase tracking-wider text-slate-500">
                            max
                        </p>
                        <p className="font-mono text-xs font-semibold tabular-nums text-rose-400">
                            {max.toFixed(1)}ms
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
