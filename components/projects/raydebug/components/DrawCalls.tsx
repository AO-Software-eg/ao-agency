"use client";

import { useEffect, useState } from "react";
import { Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DrawCalls() {
    const [calls, setCalls] = useState<number>(2214);
    const [tris, setTris] = useState<number>(1_482_910);
    const [batches, setBatches] = useState<number>(184);

    useEffect(() => {
        const interval = setInterval(() => {
            setCalls((c) => {
                const jitter = Math.round((Math.random() - 0.5) * 160);
                return Math.max(2147, Math.min(2301, c + jitter));
            });
            setTris((t) => {
                const jitter = Math.round((Math.random() - 0.5) * 120_000);
                return Math.max(1_300_000, Math.min(1_700_000, t + jitter));
            });
            setBatches((b) => {
                const jitter = Math.round((Math.random() - 0.5) * 14);
                return Math.max(160, Math.min(210, b + jitter));
            });
        }, 400);
        return () => clearInterval(interval);
    }, []);

    const trisFormatted = tris.toLocaleString();
    const trisM = (tris / 1_000_000).toFixed(2);

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-lg border p-3",
                "bg-slate-900/60 backdrop-blur-md border-slate-700/60",
            )}
        >
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-md bg-amber-500/10 ring-1 ring-amber-500/30">
                        <Layers className="size-3.5 text-amber-400" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400">
                            Render Queue
                        </p>
                        <p className="font-mono text-xs font-semibold text-slate-200">
                            Draw Calls
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-3 space-y-2">
                <div className="flex items-end justify-between">
                    <span className="text-[10px] text-slate-500">draws</span>
                    <span className="font-mono text-lg font-bold tabular-nums text-amber-400">
                        {calls}
                    </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800/80">
                    <div
                        className="h-full rounded-full"
                        style={{
                            width: `${((calls - 2100) / 250) * 100}%`,
                            background: "linear-gradient(90deg,#f59e0b,#fbbf24)",
                            boxShadow: "0 0 8px rgba(245,158,11,.45)",
                        }}
                    />
                </div>

                <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
                    <div className="rounded-md bg-slate-950/50 p-2 ring-1 ring-slate-800">
                        <p className="text-[9px] uppercase tracking-wider text-slate-500">
                            Triangles
                        </p>
                        <p className="mt-0.5 font-mono text-xs font-semibold tabular-nums text-slate-200">
                            {trisM}M
                        </p>
                        <p className="text-[9px] font-mono text-slate-500 tabular-nums">
                            {trisFormatted}
                        </p>
                    </div>
                    <div className="rounded-md bg-slate-950/50 p-2 ring-1 ring-slate-800">
                        <p className="text-[9px] uppercase tracking-wider text-slate-500">
                            Batch Swaps
                        </p>
                        <p className="mt-0.5 font-mono text-xs font-semibold tabular-nums text-slate-200">
                            {batches}
                        </p>
                        <p className="text-[9px] font-mono text-slate-500 tabular-nums">
                            state changes
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
