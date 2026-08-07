"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { BookOpen, Users, TrendingUp, Clock } from "lucide-react";

interface StatCardProps {
    label: string;
    value: number;
    suffix?: string;
    icon: typeof BookOpen;
    trend: string;
    trendUp?: boolean;
    gradient: string;
}

function StatCard({
    label,
    value,
    suffix,
    icon: Icon,
    trend,
    trendUp,
    gradient,
}: StatCardProps) {
    const [display, setDisplay] = useState(value);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setDisplay(0);
        const duration = 1200;
        const start = performance.now();
        const id = window.setInterval(() => {
            const t = Math.min(1, (performance.now() - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(eased * value));
            if (t >= 1) {
                window.clearInterval(id);
                setLoaded(true);
            }
        }, 16);
        return () => window.clearInterval(id);
    }, [value]);

    useEffect(() => {
        if (!loaded) return;
        const id = window.setInterval(() => {
            const delta =
                (Math.random() - 0.5) * (value < 100 ? 0.4 : value < 1000 ? 2 : 4);
            setDisplay((d) => {
                const next = d + delta;
                if (next < value * 0.94 || next > value * 1.06) return d;
                return Math.round(next);
            });
        }, 1800 + Math.random() * 1200);
        return () => window.clearInterval(id);
    }, [loaded, value]);

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5">
            <div
                className={cn(
                    "pointer-events-none absolute -right-10 -top-10 size-32 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60",
                    gradient,
                )}
            />
            <div className="relative flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-[var(--muted)]">{label}</p>
                    <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-3xl font-bold tracking-tight text-[var(--foreground)] tabular-nums">
                            {display.toLocaleString()}
                        </span>
                        {suffix && (
                            <span className="text-lg font-semibold text-[var(--muted)]">
                                {suffix}
                            </span>
                        )}
                    </div>
                </div>
                <div
                    className={cn(
                        "flex size-11 items-center justify-center rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-110",
                        gradient,
                    )}
                >
                    <Icon className="size-5 text-white" />
                </div>
            </div>
            <div
                className={cn(
                    "relative mt-4 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
                    trendUp
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
                )}
            >
                <TrendingUp
                    className={cn(
                        "size-3",
                        !trendUp && "rotate-180",
                    )}
                />
                {trend}
                <span className="text-[var(--muted)] font-normal"> vs last wk</span>
            </div>
        </div>
    );
}

const stats: readonly StatCardProps[] = [
    {
        label: "Active Courses",
        value: 184,
        icon: BookOpen,
        trend: "+12.4%",
        trendUp: true,
        gradient: "bg-gradient-to-br from-indigo-500 to-violet-600",
    },
    {
        label: "Total Students",
        value: 8429,
        icon: Users,
        trend: "+8.2%",
        trendUp: true,
        gradient: "bg-gradient-to-br from-sky-500 to-cyan-600",
    },
    {
        label: "Completion Rate",
        value: 87,
        suffix: "%",
        icon: TrendingUp,
        trend: "+3.1%",
        trendUp: true,
        gradient: "bg-gradient-to-br from-emerald-500 to-teal-600",
    },
    {
        label: "Avg Study Time",
        value: 26,
        suffix: "h",
        icon: Clock,
        trend: "-1.2%",
        trendUp: false,
        gradient: "bg-gradient-to-br from-amber-500 to-orange-600",
    },
];

export function Statistics() {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((s) => (
                <StatCard key={s.label} {...s} />
            ))}
        </div>
    );
}
