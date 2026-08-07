"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
    label: string;
    value: string;
    prefix?: string;
    change: string;
    changePositive?: boolean;
    bars: number[];
    gradient: string;
}

function SparklineBars({ bars, gradient }: { bars: number[]; gradient: string }) {
    return (
        <div className="flex h-10 items-end gap-1">
            {bars.map((h, i) => (
                <div
                    key={i}
                    className={cn(
                        "w-2 flex-1 rounded-t-sm transition-all duration-500",
                        gradient
                    )}
                    style={{
                        height: `${h}%`,
                        animationDelay: `${i * 60}ms`,
                    }}
                />
            ))}
        </div>
    );
}

function KpiCard({ label, value, prefix, change, changePositive = true, bars, gradient }: KpiCardProps) {
    return (
        <div className="rounded-xl border border-amber-100 bg-white p-3.5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 dark:border-slate-700/50 dark:bg-slate-800/50">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-medium text-stone-500 dark:text-stone-400">{label}</p>
                    <p className="mt-1.5 text-xl font-bold tabular-nums text-stone-800 dark:text-stone-100">
                        {prefix}
                        {value}
                    </p>
                </div>
                <span
                    className={cn(
                        "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                        changePositive
                            ? "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400"
                            : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                    )}
                >
                    <TrendingUp className={cn("size-3", !changePositive && "rotate-180")} />
                    {change}
                </span>
            </div>
            <div className="mt-3">
                <SparklineBars bars={bars} gradient={gradient} />
            </div>
        </div>
    );
}

function generateBars(seed: number): number[] {
    const bars: number[] = [];
    let s = seed;
    for (let i = 0; i < 10; i++) {
        s = (s * 9301 + 49297) % 233280;
        bars.push(35 + (s / 233280) * 65);
    }
    return bars;
}

interface SalesSummaryProps {
    revenue: number;
    orders: number;
}

export default function SalesSummary({ revenue, orders }: SalesSummaryProps) {
    const [bars, setBars] = useState({
        revenue: generateBars(42),
        orders: generateBars(87),
        aov: generateBars(123),
        returns: generateBars(234),
    });

    useEffect(() => {
        const id = setInterval(() => {
            setBars({
                revenue: generateBars(Math.floor(Math.random() * 1000)),
                orders: generateBars(Math.floor(Math.random() * 1000)),
                aov: generateBars(Math.floor(Math.random() * 1000)),
                returns: generateBars(Math.floor(Math.random() * 1000)),
            });
        }, 2200);
        return () => clearInterval(id);
    }, []);

    const aov = orders > 0 ? revenue / orders : 0;
    const returns = Math.floor(orders * 0.038);

    return (
        <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50/50 to-white p-4 shadow-sm dark:border-slate-800 dark:from-slate-800/30 dark:to-slate-800/60">
            <div className="mb-3 flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-stone-800 dark:text-stone-100">
                        Sales Overview
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                        Today&apos;s performance snapshot
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <KpiCard
                    label="Revenue"
                    value={revenue.toLocaleString()}
                    prefix="$"
                    change="+12.4%"
                    bars={bars.revenue}
                    gradient="bg-gradient-to-t from-teal-500 to-teal-300 dark:from-teal-400 dark:to-teal-600"
                />
                <KpiCard
                    label="Orders"
                    value={orders.toLocaleString()}
                    change="+8.1%"
                    bars={bars.orders}
                    gradient="bg-gradient-to-t from-amber-500 to-amber-300 dark:from-amber-400 dark:to-amber-600"
                />
                <KpiCard
                    label="AOV"
                    value={aov.toFixed(0)}
                    prefix="$"
                    change="+3.2%"
                    bars={bars.aov}
                    gradient="bg-gradient-to-t from-orange-500 to-orange-300 dark:from-orange-400 dark:to-orange-600"
                />
                <KpiCard
                    label="Returns"
                    value={returns.toString()}
                    change="-1.8%"
                    changePositive={true}
                    bars={bars.returns}
                    gradient="bg-gradient-to-t from-stone-500 to-stone-300 dark:from-stone-400 dark:to-stone-600"
                />
            </div>
        </div>
    );
}
