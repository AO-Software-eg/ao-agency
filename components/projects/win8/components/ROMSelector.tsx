"use client";

import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ROMEntry {
    id: string;
    name: string;
    year: string;
    size: string;
    accent: "cyan" | "fuchsia" | "orange";
    span?: "wide" | "tall" | "square";
}

interface ROMSelectorProps {
    roms: readonly ROMEntry[];
    activeId: string;
    onSelect: (id: string) => void;
}

const accentMap: Record<ROMEntry["accent"], { bg: string; ring: string; shadow: string; label: string }> = {
    cyan: {
        bg: "bg-cyan-500",
        ring: "ring-cyan-300/80",
        shadow: "shadow-[0_0_22px_rgba(6,182,212,.55)]",
        label: "text-cyan-50",
    },
    fuchsia: {
        bg: "bg-fuchsia-500",
        ring: "ring-fuchsia-300/80",
        shadow: "shadow-[0_0_22px_rgba(217,70,239,.55)]",
        label: "text-fuchsia-50",
    },
    orange: {
        bg: "bg-orange-500",
        ring: "ring-orange-300/80",
        shadow: "shadow-[0_0_22px_rgba(249,115,22,.55)]",
        label: "text-orange-50",
    },
};

export function ROMSelector({ roms, activeId, onSelect }: ROMSelectorProps) {
    return (
        <div className="flex h-full flex-col gap-3">
            <div className="flex items-center justify-between rounded-md bg-slate-900/50 px-3 py-2 ring-1 ring-cyan-500/20">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-200/80">
                    ROM Library
                </span>
                <span className="rounded bg-cyan-500/15 px-2 py-0.5 text-[10px] font-mono font-semibold text-cyan-300 ring-1 ring-cyan-400/30">
                    {roms.length} files
                </span>
            </div>

            <div
                className="grid grid-cols-3 grid-rows-2 gap-2 rounded-md bg-slate-900/60 p-3 ring-1 ring-cyan-500/15"
                style={{ minHeight: 0, flex: 1 }}
            >
                {roms.map((rom, idx) => {
                    const accent = accentMap[rom.accent];
                    const isActive = rom.id === activeId;
                    const isWide = idx === 0 || idx === 3;
                    return (
                        <button
                            key={rom.id}
                            onClick={() => onSelect(rom.id)}
                            className={cn(
                                "group relative flex flex-col justify-between overflow-hidden rounded-sm p-3 text-left transition-all duration-150",
                                accent.bg,
                                accent.label,
                                isActive ? cn("ring-2", accent.ring, accent.shadow, "scale-[1.02]") : "ring-1 ring-black/10 opacity-85 hover:opacity-100",
                                isWide ? "col-span-2" : "",
                            )}
                        >
                            <div className="flex items-start justify-between">
                                <span className="text-[11px] font-bold uppercase tracking-[0.15em] opacity-90">
                                    {rom.accent === "cyan" && "Arcade"}
                                    {rom.accent === "fuchsia" && "Classic"}
                                    {rom.accent === "orange" && "Demo"}
                                </span>
                                <ChevronRight
                                    className={cn(
                                        "size-4 transition-transform duration-150",
                                        isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                                    )}
                                    strokeWidth={2.5}
                                />
                            </div>
                            <div>
                                <div className="text-base font-black leading-tight tracking-tight">
                                    {rom.name}
                                </div>
                                <div className="mt-1 flex items-center gap-2 text-[10px] font-mono opacity-90">
                                    <span>{rom.year}</span>
                                    <span className="opacity-60">•</span>
                                    <span>{rom.size}</span>
                                </div>
                            </div>
                            <div
                                className="pointer-events-none absolute inset-0 opacity-[0.08]"
                                style={{
                                    backgroundImage:
                                        "repeating-linear-gradient(45deg, #000 0 1px, transparent 1px 10px)",
                                }}
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
