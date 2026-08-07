"use client";

import { FileCode, X, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TabItem {
    id: string;
    label: string;
    icon?: typeof FileCode;
}

interface TabsProps {
    tabs: readonly TabItem[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

const dotColors = ["bg-rose-500", "bg-amber-400", "bg-emerald-400"];

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
    return (
        <div className="flex items-stretch border-b border-[#1e293b] bg-[#0b1020]">
            <div className="flex items-center gap-1.5 px-3">
                {dotColors.map((color, idx) => (
                    <span
                        key={idx}
                        className={cn("size-3 rounded-full", color)}
                    />
                ))}
            </div>

            <div className="flex items-end gap-0.5 overflow-x-auto">
                {tabs.map((tab) => {
                    const Icon = tab.icon ?? FileCode;
                    const isActive = tab.id === activeTab;
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => onTabChange(tab.id)}
                            className={cn(
                                "group flex min-w-[120px] items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-mono transition-colors duration-200",
                                isActive
                                    ? "border-emerald-400 bg-[#111827] text-[#e5e7eb]"
                                    : "border-transparent text-[#94a3b8] hover:bg-[#111827]/50 hover:text-[#e5e7eb]",
                            )}
                        >
                            <Icon
                                className={cn(
                                    "size-3.5 shrink-0 transition-colors",
                                    isActive
                                        ? "text-emerald-400"
                                        : "text-[#64748b]",
                                )}
                            />
                            <span className="truncate">{tab.label}</span>
                            {isActive ? (
                                <Circle className="size-1.5 fill-emerald-400 text-emerald-400" />
                            ) : (
                                <X className="size-3 shrink-0 text-transparent opacity-0 transition-opacity group-hover:text-[#64748b] group-hover:opacity-100" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
