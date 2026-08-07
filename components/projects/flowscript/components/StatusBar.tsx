"use client";

import { useEffect, useState } from "react";
import { GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";

type IndicatorState = "idle" | "compiling" | "ready";

export default function StatusBar() {
    const [tick, setTick] = useState(0);
    const [state, setState] = useState<IndicatorState>("idle");

    useEffect(() => {
        const id = window.setInterval(() => {
            setTick((t) => (t + 1) % 1000);
        }, 1500);

        const s1 = window.setTimeout(() => setState("compiling"), 400);
        const s2 = window.setTimeout(() => setState("ready"), 6400);

        return () => {
            window.clearInterval(id);
            window.clearTimeout(s1);
            window.clearTimeout(s2);
        };
    }, []);

    void tick;

    const indicatorLabel =
        state === "idle"
            ? "idle"
            : state === "compiling"
              ? "compiling..."
              : "build ok";

    const indicatorColor =
        state === "idle"
            ? "text-[#64748b] bg-[#1e293b]"
            : state === "compiling"
              ? "text-amber-300 bg-amber-500/10 ring-1 ring-amber-500/30"
              : "text-emerald-300 bg-emerald-500/10 ring-1 ring-emerald-500/30";

    const spinnerDot = state === "compiling";

    return (
        <div className="flex shrink-0 items-center justify-between border-t border-[#1e293b] bg-[#111827] px-3 py-1.5 text-[11px] font-mono text-[#94a3b8]">
            <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                    <GitBranch className="size-3 text-emerald-400" />
                    main
                </span>
                <span
                    className={cn(
                        "flex items-center gap-1.5 rounded px-1.5 py-0.5",
                        indicatorColor,
                    )}
                >
                    {spinnerDot && (
                        <span className="size-1.5 animate-pulse rounded-full bg-current" />
                    )}
                    {indicatorLabel}
                </span>
                <span className="hidden sm:inline text-[#64748b]">
                    FlowScript 0.1.0
                </span>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-[#64748b]">UTF-8</span>
                <span className="text-[#64748b]">LF</span>
                <span>FlowScript</span>
                <span>Ln 12, Col 8</span>
            </div>
        </div>
    );
}
