"use client";

import { Search, RefreshCw, Bell, Plus, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
    onRefresh?: () => void;
    refreshing?: boolean;
}

export default function SearchBar({ onRefresh, refreshing }: SearchBarProps) {
    return (
        <div className="flex items-center gap-3 border-b border-amber-100 bg-white/80 px-5 py-3 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
                <input
                    type="text"
                    placeholder="Search products, SKUs, orders..."
                    className="w-full rounded-lg border border-amber-100 bg-amber-50/50 py-2 pl-10 pr-4 text-sm text-stone-800 placeholder-stone-400 outline-none transition-all duration-200 focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-800/50 dark:text-stone-100 dark:placeholder-stone-500 dark:focus:bg-slate-800"
                />
            </div>

            <button className="flex items-center gap-2 rounded-lg border border-amber-100 bg-white px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-amber-50 dark:border-slate-700 dark:bg-slate-800 dark:text-stone-200 dark:hover:bg-slate-700">
                Filter
                <ChevronDown className="size-3.5 text-stone-400" />
            </button>

            <div className="ml-auto flex items-center gap-2">
                <button
                    onClick={onRefresh}
                    className={cn(
                        "flex size-9 items-center justify-center rounded-lg border border-amber-100 bg-white text-stone-600 transition-all duration-200 hover:bg-amber-50 dark:border-slate-700 dark:bg-slate-800 dark:text-stone-300 dark:hover:bg-slate-700",
                        refreshing && "animate-spin"
                    )}
                    title="Refresh data"
                >
                    <RefreshCw className="size-4" />
                </button>

                <button
                    className="relative flex size-9 items-center justify-center rounded-lg border border-amber-100 bg-white text-stone-600 transition-all duration-200 hover:bg-amber-50 dark:border-slate-700 dark:bg-slate-800 dark:text-stone-300 dark:hover:bg-slate-700"
                    title="Notifications"
                >
                    <Bell className="size-4" />
                    <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                        3
                    </span>
                </button>

                <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-all duration-200 hover:from-teal-600 hover:to-teal-700 hover:shadow-xl hover:shadow-teal-500/30">
                    <Plus className="size-4" />
                    Create Invoice
                </button>
            </div>
        </div>
    );
}
