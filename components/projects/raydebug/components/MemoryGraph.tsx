"use client";

import { useEffect, useMemo, useState } from "react";
import { HardDrive } from "lucide-react";
import { cn } from "@/lib/utils";

const POINTS = 40;
const MIN_MB = 1200;
const MAX_MB = 2800;

export default function MemoryGraph() {
    const [values, setValues] = useState<number[]>(() =>
        Array.from({ length: POINTS }, (_, i) => {
            const wave = Math.sin(i * 0.35) * 400;
            const base = 1900 + wave;
            const noise = (Math.random() - 0.5) * 120;
            return Math.max(MIN_MB, Math.min(MAX_MB, base + noise));
        }),
    );
    const [current, setCurrent] = useState<number>(1920);

    useEffect(() => {
        const interval = setInterval(() => {
            setValues((prev) => {
                const last = prev[prev.length - 1];
                const drift = (Math.random() - 0.48) * 90;
                let next = last + drift;
                const centerPull = (1900 - next) * 0.05;
                next += centerPull;
                next = Math.max(MIN_MB, Math.min(MAX_MB, next));
                const out = [...prev.slice(1), next];
                setCurrent(Math.round(out[out.length - 1]));
                return out;
            });
        }, 300);
        return () => clearInterval(interval);
    }, []);

    const { polylineStr, areaStr, peak, avg } = useMemo(() => {
        const W = 280;
        const H = 72;
        const padL = 4;
        const padR = 4;
        const padT = 4;
        const padB = 4;
        const innerW = W - padL - padR;
        const innerH = H - padT - padB;
        const range = MAX_MB - MIN_MB;

        const pts = values.map((v, i) => {
            const x = padL + (i / (POINTS - 1)) * innerW;
            const y = padT + innerH - ((v - MIN_MB) / range) * innerH;
            return [x, y] as const;
        });

        const poly = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
        const firstX = pts[0][0];
        const lastX = pts[pts.length - 1][0];
        const bottomY = H - padB;
        const area =
            `M ${firstX} ${bottomY} ` +
            pts.map(([x, y]) => `L ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ") +
            ` L ${lastX} ${bottomY} Z`;

        const pk = Math.max(...values);
        const ag = values.reduce((a, b) => a + b, 0) / values.length;
        return { polylineStr: poly, areaStr: area, peak: pk, avg: ag };
    }, [values]);

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-lg border p-3",
                "bg-slate-900/60 backdrop-blur-md border-slate-700/60",
            )}
        >
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-md bg-cyan-500/10 ring-1 ring-cyan-500/30">
                        <HardDrive className="size-3.5 text-cyan-400" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400">
                            Heap Allocation
                        </p>
                        <p className="font-mono text-xs font-semibold text-slate-200">
                            Memory
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-mono text-xl font-bold tabular-nums text-cyan-400">
                        {(current / 1024).toFixed(2)}
                    </p>
                    <p className="text-[10px] text-slate-500">GB</p>
                </div>
            </div>

            <div className="mt-3 rounded-md bg-slate-950/70 p-2 ring-1 ring-slate-800/80">
                <svg
                    viewBox="0 0 280 72"
                    className="h-[72px] w-full"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient
                            id="raydebug-mem-area"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.35" />
                            <stop
                                offset="100%"
                                stopColor="#f43f5e"
                                stopOpacity="0"
                            />
                        </linearGradient>
                        <linearGradient
                            id="raydebug-mem-line"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="0"
                        >
                            <stop offset="0%" stopColor="#22d3ee" />
                            <stop offset="50%" stopColor="#f43f5e" />
                            <stop offset="100%" stopColor="#fb7185" />
                        </linearGradient>
                    </defs>

                    {[0.25, 0.5, 0.75].map((t, i) => (
                        <line
                            key={i}
                            x1="0"
                            y1={4 + t * 64}
                            x2="280"
                            y2={4 + t * 64}
                            stroke="#1e293b"
                            strokeDasharray="2 3"
                            strokeWidth="1"
                        />
                    ))}

                    <path d={areaStr} fill="url(#raydebug-mem-area)" />
                    <polyline
                        points={polylineStr}
                        fill="none"
                        stroke="url(#raydebug-mem-line)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ filter: "drop-shadow(0 0 4px rgba(244,63,94,.5))" }}
                    />
                </svg>
            </div>

            <div className="mt-1.5 flex justify-between text-[10px] font-mono tabular-nums">
                <span className="text-slate-500">
                    avg <span className="text-slate-300">{(avg / 1024).toFixed(2)}G</span>
                </span>
                <span className="text-slate-500">
                    peak{" "}
                    <span className="text-rose-400">{(peak / 1024).toFixed(2)}G</span>
                </span>
            </div>
        </div>
    );
}
