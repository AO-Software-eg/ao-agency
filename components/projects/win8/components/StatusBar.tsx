"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface StatusBarProps {
    running: boolean;
    romName: string;
    tickRef: { current: number };
}

export function StatusBar({ running, romName, tickRef }: StatusBarProps) {
    const [fps, setFps] = useState(60);
    const [pc, setPc] = useState(0x023a);
    const [cycles, setCycles] = useState(0);
    const lastTickRef = useRef(tickRef.current);

    useEffect(() => {
        const interval = setInterval(() => {
            setFps((prev) => {
                const target = 58 + Math.floor(Math.random() * 5);
                const delta = target - prev;
                return prev + Math.sign(delta) * Math.min(Math.abs(delta), 1);
            });

            const delta = tickRef.current - lastTickRef.current;
            lastTickRef.current = tickRef.current;

            setPc((prev) => {
                const step = running ? Math.max(2, delta * 2) : 0;
                const next = (prev + step) & 0xffff;
                return next < 0x200 ? 0x023a : next > 0x0fff ? 0x023a : next;
            });

            setCycles((prev) => {
                const next = running ? (prev + 0x07) & 0xff : prev;
                return next;
            });
        }, 220);

        return () => clearInterval(interval);
    }, [running, tickRef]);

    const pcStr = "$" + pc.toString(16).toUpperCase().padStart(4, "0");
    const cyStr = "$" + cycles.toString(16).toUpperCase().padStart(2, "0");

    return (
        <div className="flex h-full w-full items-center gap-3 rounded-md bg-slate-950/90 px-3 py-1.5 font-mono text-[11px] ring-1 ring-cyan-500/30">
            <div className="flex items-center gap-2">
                <span
                    className={cn(
                        "relative flex size-2.5 items-center justify-center",
                    )}
                >
                    <span
                        className={cn(
                            "absolute inline-flex size-full rounded-full",
                            running ? "bg-emerald-400 animate-pulse opacity-60" : "bg-slate-500",
                        )}
                    />
                    <span
                        className={cn(
                            "relative inline-flex size-2 rounded-full",
                            running ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.9)]" : "bg-slate-500",
                        )}
                    />
                </span>
                <span
                    className={cn(
                        "text-[10px] font-bold uppercase tracking-[0.2em]",
                        running ? "text-emerald-300" : "text-slate-400",
                    )}
                >
                    {running ? "RUN" : "IDLE"}
                </span>
            </div>

            <div className="mx-1 h-4 w-px bg-cyan-500/30" />

            <Stat label="FPS" value={fps.toString()} tone="cyan" />
            <Stat label="PC" value={pcStr} tone="fuchsia" />
            <Stat label="CYC" value={cyStr} tone="orange" />

            <div className="mx-1 h-4 w-px bg-cyan-500/30" />

            <div className="flex items-center gap-2">
                <span className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-cyan-300 ring-1 ring-cyan-400/30">
                    ROM
                </span>
                <span className="truncate text-cyan-100 font-semibold tracking-wide">
                    {romName}
                </span>
            </div>

            <div className="ml-auto flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-slate-500">
                    CHIP-8
                </span>
                <div className="flex gap-0.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className={cn(
                                "w-0.5 rounded-full transition-all duration-300",
                                running && i < 4 - Math.floor(Math.random() * 2)
                                    ? "h-3.5 bg-cyan-400/80"
                                    : "h-2 bg-cyan-500/30",
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function Stat({
    label,
    value,
    tone,
}: {
    label: string;
    value: string;
    tone: "cyan" | "fuchsia" | "orange";
}) {
    const toneCls: Record<typeof tone, string> = {
        cyan: "text-cyan-300",
        fuchsia: "text-fuchsia-300",
        orange: "text-orange-300",
    };
    const ringCls: Record<typeof tone, string> = {
        cyan: "ring-cyan-400/20",
        fuchsia: "ring-fuchsia-400/20",
        orange: "ring-orange-400/20",
    };
    const bgCls: Record<typeof tone, string> = {
        cyan: "bg-cyan-500/10",
        fuchsia: "bg-fuchsia-500/10",
        orange: "bg-orange-500/10",
    };
    return (
        <div className="flex items-center gap-1.5">
            <span
                className={cn(
                    "rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em]",
                    toneCls[tone],
                    bgCls[tone],
                    "ring-1",
                    ringCls[tone],
                )}
            >
                {label}
            </span>
            <span className={cn("font-bold", toneCls[tone])}>{value}</span>
        </div>
    );
}
