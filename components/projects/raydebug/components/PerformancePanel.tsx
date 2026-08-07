"use client";

import { useEffect, useState } from "react";
import { Cpu, Zap, HardDrive, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

type TabKey = "CPU" | "GPU" | "IO";

interface TimingEntry {
    name: string;
    base: number;
    children?: { name: string; base: number }[];
}

const entries: Record<TabKey, TimingEntry[]> = {
    CPU: [
        {
            name: "MainScene",
            base: 2.1,
            children: [
                { name: "CullingPass", base: 0.35 },
                { name: "AnimationTick", base: 0.82 },
                { name: "SkinningCompute", base: 0.55 },
            ],
        },
        {
            name: "PhysicsStep",
            base: 1.35,
            children: [
                { name: "BroadPhase", base: 0.41 },
                { name: "NarrowPhase", base: 0.62 },
                { name: "Solver", base: 0.28 },
            ],
        },
        {
            name: "AudioMixer",
            base: 0.48,
        },
        {
            name: "InputDispatch",
            base: 0.12,
        },
    ],
    GPU: [
        {
            name: "ShadowPass",
            base: 0.72,
            children: [
                { name: "Cascade 0", base: 0.28 },
                { name: "Cascade 1", base: 0.22 },
                { name: "Cascade 2", base: 0.18 },
            ],
        },
        {
            name: "GBuffer",
            base: 1.24,
            children: [
                { name: "DepthPrepass", base: 0.31 },
                { name: "MRT Fill", base: 0.82 },
            ],
        },
        {
            name: "DeferredLight",
            base: 1.68,
            children: [
                { name: "SSAO", base: 0.42 },
                { name: "PBR Shade", base: 0.91 },
                { name: "Volumetric", base: 0.29 },
            ],
        },
        {
            name: "PostFX",
            base: 0.4,
            children: [
                { name: "Bloom", base: 0.18 },
                { name: "ToneMap", base: 0.09 },
                { name: "FXAA", base: 0.11 },
            ],
        },
    ],
    IO: [
        {
            name: "TextureStream",
            base: 0.82,
            children: [
                { name: "Async Read", base: 0.55 },
                { name: "Upload Queue", base: 0.22 },
            ],
        },
        {
            name: "MeshCache",
            base: 0.34,
        },
        {
            name: "ShaderCompile",
            base: 0.18,
        },
        {
            name: "SaveGame I/O",
            base: 0.09,
        },
    ],
};

function jitter(base: number, amp = 0.18): number {
    return Math.max(0.04, base + (Math.random() - 0.5) * 2 * amp * base);
}

export default function PerformancePanel() {
    const [tab, setTab] = useState<TabKey>("GPU");
    const [expanded, setExpanded] = useState<Set<string>>(
        new Set(["ShadowPass", "GBuffer", "MainScene"]),
    );
    const [tick, setTick] = useState<number>(0);

    useEffect(() => {
        const iv = setInterval(() => setTick((t) => t + 1), 350);
        return () => clearInterval(iv);
    }, []);

    const tabData = entries[tab];
    const totals = tabData.map((e) => {
        const t = jitter(e.base, 0.15);
        const ch = (e.children ?? []).map((c) => ({
            name: c.name,
            ms: jitter(c.base, 0.2),
        }));
        return { name: e.name, ms: t, children: ch };
    });
    const frameTotal = totals.reduce((s, x) => s + x.ms, 0);

    const TabIcon = tab === "CPU" ? Cpu : tab === "GPU" ? Zap : HardDrive;

    const toggle = (name: string) => {
        setExpanded((prev) => {
            const nxt = new Set(prev);
            if (nxt.has(name)) nxt.delete(name);
            else nxt.add(name);
            return nxt;
        });
    };

    const barColor = (frac: number): string => {
        if (frac < 0.2) return "#22d3ee";
        if (frac < 0.45) return "#a3e635";
        if (frac < 0.7) return "#f59e0b";
        return "#f43f5e";
    };

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-lg border",
                "bg-slate-900/60 backdrop-blur-md border-slate-700/60",
            )}
        >
            <div className="flex items-center justify-between border-b border-slate-700/60 px-3 py-2">
                <div className="flex items-center gap-1.5">
                    {(["CPU", "GPU", "IO"] as TabKey[]).map((k) => {
                        const Ic = k === "CPU" ? Cpu : k === "GPU" ? Zap : HardDrive;
                        const active = tab === k;
                        return (
                            <button
                                key={k}
                                type="button"
                                onClick={() => setTab(k)}
                                className={cn(
                                    "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium transition-all",
                                    active
                                        ? "bg-slate-800 text-slate-100 ring-1 ring-slate-600 shadow-inner"
                                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50",
                                )}
                            >
                                <Ic className="size-3" />
                                <span className="font-mono tracking-wide">{k}</span>
                            </button>
                        );
                    })}
                </div>
                <div className="flex items-center gap-1.5">
                    <TabIcon className="size-3 text-slate-500" />
                    <span className="text-[10px] font-mono tabular-nums text-slate-500">
                        frame{" "}
                        <span className="text-slate-300">{frameTotal.toFixed(2)}ms</span>
                    </span>
                </div>
            </div>

            <div className="p-2.5 space-y-1.5">
                {totals.map((entry, idx) => {
                    const frac = entry.ms / Math.max(frameTotal, 0.01);
                    const isOpen = expanded.has(entry.name);
                    const childTotal = entry.children.reduce(
                        (s, c) => s + c.ms,
                        0,
                    );
                    return (
                        <div key={entry.name}>
                            <button
                                type="button"
                                onClick={() => toggle(entry.name)}
                                className="group flex w-full items-center gap-2 rounded-md px-2 py-1.5 hover:bg-slate-800/40 transition-colors"
                                aria-expanded={isOpen}
                            >
                                <div
                                    className={cn(
                                        "flex size-4 items-center justify-center rounded text-slate-500 transition-transform",
                                        isOpen && "text-rose-400",
                                    )}
                                    style={{
                                        transform: isOpen
                                            ? "rotate(0deg)"
                                            : "rotate(-90deg)",
                                    }}
                                >
                                    {isOpen ? (
                                        <ChevronDown className="size-3" />
                                    ) : (
                                        <ChevronUp className="size-3" />
                                    )}
                                </div>
                                <span className="w-1 truncate text-[11px] font-medium text-slate-200 grow text-left">
                                    {entry.name}
                                </span>
                                <span className="text-[10px] font-mono tabular-nums text-slate-500">
                                    {(frac * 100).toFixed(0)}%
                                </span>
                                <span
                                    className="w-20 text-right font-mono text-[11px] tabular-nums font-semibold"
                                    style={{ color: barColor(frac) }}
                                >
                                    {entry.ms.toFixed(2)}ms
                                </span>
                            </button>
                            <div className="mx-2 mb-0.5 h-1 overflow-hidden rounded-full bg-slate-800/80">
                                <div
                                    className="h-full rounded-full transition-all duration-300"
                                    style={{
                                        width: `${Math.min(100, frac * 100)}%`,
                                        background: `linear-gradient(90deg, ${barColor(
                                            frac,
                                        )}, #ffffff44)`,
                                        boxShadow: `0 0 6px ${barColor(frac)}88`,
                                    }}
                                />
                            </div>
                            {isOpen && entry.children.length > 0 && (
                                <div className="ml-7 mt-1.5 space-y-1 border-l border-slate-700/60 pl-3">
                                    {entry.children.map((ch) => {
                                        const chFrac =
                                            ch.ms / Math.max(childTotal, 0.01);
                                        return (
                                            <div
                                                key={ch.name}
                                                className="flex items-center gap-2 rounded px-2 py-1 hover:bg-slate-800/30"
                                            >
                                                <span className="w-1 truncate text-[10px] text-slate-400 grow">
                                                    {ch.name}
                                                </span>
                                                <span className="text-[9px] font-mono tabular-nums text-slate-600">
                                                    {(chFrac * 100).toFixed(0)}%
                                                </span>
                                                <span className="w-20 text-right font-mono text-[10px] tabular-nums text-cyan-400">
                                                    {ch.ms.toFixed(2)}ms
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            {idx < totals.length - 1 && (
                                <div className="my-1 h-px bg-slate-800/50" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
