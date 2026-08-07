"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, Target, BookOpen, Award } from "lucide-react";

interface ProgressRingProps {
    value: number;
    size?: number;
    stroke?: number;
}

function ProgressRing({ value, size = 140, stroke = 10 }: ProgressRingProps) {
    const [display, setDisplay] = useState(0);
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (display / 100) * circumference;

    useEffect(() => {
        const id = window.setTimeout(() => {
            const duration = 1400;
            const start = performance.now();
            const tick = window.setInterval(() => {
                const t = Math.min(1, (performance.now() - start) / duration);
                const eased = 1 - Math.pow(1 - t, 3);
                setDisplay(eased * value);
                if (t >= 1) window.clearInterval(tick);
            }, 16);
        }, 200);
        return () => window.clearTimeout(id);
    }, [value]);

    useEffect(() => {
        const id = window.setInterval(() => {
            setDisplay((d) => {
                const delta = (Math.random() - 0.4) * 0.35;
                const next = d + delta;
                if (next < value - 2 || next > value + 2) return d;
                return next;
            });
        }, 2400);
        return () => window.clearInterval(id);
    }, [value]);

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <defs>
                    <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                </defs>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={stroke}
                    className="fill-none stroke-[var(--background-secondary)]"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    stroke="url(#progressGrad)"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="transition-[stroke-dashoffset] duration-1000 ease-out"
                    style={{ filter: "drop-shadow(0 0 6px rgba(99,102,241,0.35))" }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold tracking-tight text-[var(--foreground)] tabular-nums">
                    {display.toFixed(0)}%
                </span>
                <span className="mt-0.5 text-[11px] font-medium text-[var(--muted)]">
                    Goal Progress
                </span>
            </div>
        </div>
    );
}

interface BarItem {
    label: string;
    value: number;
    icon: typeof BookOpen;
    tone: string;
}

const bars: BarItem[] = [
    { label: "Videos Watched", value: 78, icon: BookOpen, tone: "from-indigo-500 to-violet-500" },
    { label: "Quizzes Passed", value: 91, icon: Target, tone: "from-emerald-500 to-teal-500" },
    { label: "Assignments", value: 64, icon: Award, tone: "from-sky-500 to-cyan-500" },
];

export function ProgressWidget() {
    const [widths, setWidths] = useState<number[]>([0, 0, 0]);

    useEffect(() => {
        const id = window.setTimeout(() => setWidths(bars.map((b) => b.value)), 400);
        return () => window.clearTimeout(id);
    }, []);

    useEffect(() => {
        const id = window.setInterval(() => {
            setWidths((ws) =>
                ws.map((w, i) => {
                    const target = bars[i].value;
                    const delta = (Math.random() - 0.45) * 0.7;
                    const next = w + delta;
                    if (next < target - 2 || next > target + 2) return w;
                    return next;
                }),
            );
        }, 2000);
        return () => window.clearInterval(id);
    }, []);

    return (
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
            <div className="mb-5 flex items-start justify-between">
                <div>
                    <h2 className="text-base font-bold text-[var(--foreground)]">
                        Learning Progress
                    </h2>
                    <p className="mt-0.5 text-xs text-[var(--muted)]">
                        Weekly performance overview
                    </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <TrendingUp className="size-3" />
                    +14%
                </span>
            </div>

            <div className="flex flex-col items-center gap-5 md:flex-row">
                <div className="shrink-0">
                    <ProgressRing value={82} />
                </div>
                <div className="w-full flex-1 space-y-4">
                    {bars.map((b, i) => {
                        const Icon = b.icon;
                        return (
                            <div key={b.label}>
                                <div className="mb-1.5 flex items-center justify-between text-xs">
                                    <span className="flex items-center gap-1.5 font-medium text-[var(--foreground)]">
                                        <Icon className={cn("size-3.5", `text-transparent bg-clip-text bg-gradient-to-r ${b.tone}`)} />
                                        {b.label}
                                    </span>
                                    <span className="font-bold tabular-nums text-[var(--foreground)]">
                                        {widths[i].toFixed(0)}%
                                    </span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--background-secondary)]">
                                    <div
                                        className={cn(
                                            "h-full rounded-full bg-gradient-to-r transition-[width] duration-[1200ms] ease-out animate-pulse",
                                            b.tone,
                                        )}
                                        style={{ width: `${widths[i]}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
