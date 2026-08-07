"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface StockStatusProps {
    inStock: number;
    low: number;
    out: number;
}

export default function StockStatus({ inStock, low, out }: StockStatusProps) {
    const total = inStock + low + out;
    const pctIn = total > 0 ? (inStock / total) * 100 : 0;
    const pctLow = total > 0 ? (low / total) * 100 : 0;
    const pctOut = total > 0 ? (out / total) * 100 : 0;

    const [pulse, setPulse] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setPulse((p) => (p + 1) % 100), 2500);
        return () => clearInterval(id);
    }, []);

    const barSegments = [
        {
            width: `${pctIn}%`,
            className:
                "bg-gradient-to-r from-teal-400 to-teal-500 dark:from-teal-400 dark:to-teal-600",
            pulse: pulse % 3 === 0,
        },
        {
            width: `${pctLow}%`,
            className:
                "bg-gradient-to-r from-amber-400 to-amber-500 dark:from-amber-400 dark:to-amber-600",
            pulse: pulse % 3 === 1,
        },
        {
            width: `${pctOut}%`,
            className:
                "bg-gradient-to-r from-rose-400 to-rose-500 dark:from-rose-400 dark:to-rose-600",
            pulse: pulse % 3 === 2,
        },
    ];

    return (
        <div className="rounded-2xl border border-amber-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-800/50">
            <div className="mb-3 flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-amber-500 text-white shadow-md shadow-teal-500/20">
                    <Package className="size-3.5" />
                </div>
                <div>
                    <h3 className="font-semibold text-stone-800 dark:text-stone-100">
                        Stock Health
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                        {total.toLocaleString()} SKUs tracked
                    </p>
                </div>
            </div>

            <div className="relative mb-4 mt-3">
                <div className="h-4 w-full overflow-hidden rounded-full bg-stone-100 shadow-inner dark:bg-slate-700/50">
                    <div className="flex h-full w-full">
                        {barSegments.map((seg, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "h-full transition-all duration-700 ease-out",
                                    seg.className,
                                    seg.pulse && "brightness-110 saturate-125"
                                )}
                                style={{
                                    width: seg.width,
                                    boxShadow: seg.pulse
                                        ? "0 0 12px currentColor"
                                        : undefined,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-teal-50/70 p-2.5 dark:bg-teal-500/10">
                    <div className="mb-1 flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-teal-500 shadow-sm shadow-teal-500/50" />
                        <span className="text-[11px] font-semibold text-teal-700 dark:text-teal-400">
                            In Stock
                        </span>
                    </div>
                    <p className="text-lg font-bold tabular-nums text-teal-800 dark:text-teal-300">
                        {inStock.toLocaleString()}
                    </p>
                    <p className="text-[11px] text-teal-600/80 dark:text-teal-400/70">
                        {pctIn.toFixed(0)}% of total
                    </p>
                </div>

                <div className="rounded-xl bg-amber-50/70 p-2.5 dark:bg-amber-500/10">
                    <div className="mb-1 flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
                        <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                            Low
                        </span>
                    </div>
                    <p className="text-lg font-bold tabular-nums text-amber-800 dark:text-amber-300">
                        {low.toLocaleString()}
                    </p>
                    <p className="text-[11px] text-amber-600/80 dark:text-amber-400/70">
                        {pctLow.toFixed(0)}% of total
                    </p>
                </div>

                <div className="rounded-xl bg-rose-50/70 p-2.5 dark:bg-rose-500/10">
                    <div className="mb-1 flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
                        <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-400">
                            Out
                        </span>
                    </div>
                    <p className="text-lg font-bold tabular-nums text-rose-800 dark:text-rose-300">
                        {out.toLocaleString()}
                    </p>
                    <p className="text-[11px] text-rose-600/80 dark:text-rose-400/70">
                        {pctOut.toFixed(0)}% of total
                    </p>
                </div>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-xl border border-amber-100/70 bg-gradient-to-r from-amber-50/50 to-teal-50/50 px-3 py-2 text-xs dark:border-slate-700/50 dark:from-amber-500/5 dark:to-teal-500/5">
                <div className="flex items-center gap-1.5">
                    {out > 0 ? (
                        <AlertTriangle className="size-3.5 text-amber-600 dark:text-amber-400" />
                    ) : (
                        <CheckCircle2 className="size-3.5 text-teal-600 dark:text-teal-400" />
                    )}
                    <span className="font-medium text-stone-700 dark:text-stone-200">
                        {out > 0 ? `${out} SKU needs restock` : "All SKUs stocked"}
                    </span>
                </div>
                <span className="font-semibold text-teal-700 dark:text-teal-400">
                    {(pctIn + pctLow * 0.5).toFixed(0)}% score
                </span>
            </div>
        </div>
    );
}
