"use client";

import { useState } from "react";
import {
    Play,
    Pause,
    RotateCcw,
    FastForward,
    Grid3x3,
    Gamepad2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ControlsProps {
    running: boolean;
    onToggleRun: () => void;
    onReset: () => void;
    onStep: () => void;
    speed: number;
    onSpeedChange: (speed: number) => void;
}

const KEYPAD_LAYOUT = [
    ["1", "2", "3", "C"],
    ["4", "5", "6", "D"],
    ["7", "8", "9", "E"],
    ["A", "0", "B", "F"],
];

export function Controls({
    running,
    onToggleRun,
    onReset,
    onStep,
    speed,
    onSpeedChange,
}: ControlsProps) {
    const [pressed, setPressed] = useState<Set<string>>(new Set());

    const handleKeyDown = (key: string) => {
        setPressed((prev) => {
            const next = new Set(prev);
            next.add(key);
            return next;
        });
        setTimeout(() => {
            setPressed((prev) => {
                const next = new Set(prev);
                next.delete(key);
                return next;
            });
        }, 160);
    };

    const sidebarBtns = [
        {
            label: running ? "Pause" : "Run",
            Icon: running ? Pause : Play,
            onClick: onToggleRun,
            tone: "primary",
        },
        {
            label: "Reset",
            Icon: RotateCcw,
            onClick: onReset,
            tone: "surface",
        },
        {
            label: "Step",
            Icon: Grid3x3,
            onClick: onStep,
            tone: "surface",
        },
    ];

    const speedSteps = [1, 2, 4, 8];

    return (
        <div className="grid h-full grid-cols-[auto_1fr] gap-4">
            <div className="flex flex-col gap-2">
                {sidebarBtns.map(({ label, Icon, onClick, tone }) => (
                    <button
                        key={label}
                        onClick={onClick}
                        className={cn(
                            "group flex min-w-[110px] flex-col items-center justify-center gap-1 rounded-md px-3 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-150 active:scale-[.96]",
                            tone === "primary"
                                ? "bg-cyan-500/90 text-slate-900 shadow-[0_0_20px_rgba(6,182,212,.35)] hover:bg-cyan-400"
                                : "bg-slate-800/80 text-cyan-200 ring-1 ring-cyan-500/25 hover:bg-slate-700/80 hover:text-cyan-100 hover:ring-cyan-400/60",
                        )}
                    >
                        <Icon className="size-5" strokeWidth={2} />
                        <span>{label}</span>
                    </button>
                ))}

                <div className="mt-2 rounded-md bg-slate-900/70 p-3 ring-1 ring-fuchsia-500/25">
                    <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-fuchsia-300/80">
                        <FastForward className="size-3.5" strokeWidth={2.2} />
                        Speed
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                        {speedSteps.map((step) => (
                            <button
                                key={step}
                                onClick={() => onSpeedChange(step)}
                                className={cn(
                                    "rounded px-1.5 py-1.5 text-xs font-bold transition-all duration-150 active:scale-95",
                                    speed === step
                                        ? "bg-fuchsia-500 text-slate-900 shadow-[0_0_12px_rgba(217,70,239,.55)]"
                                        : "bg-slate-800 text-fuchsia-200/80 ring-1 ring-fuchsia-500/20 hover:bg-slate-700 hover:text-fuchsia-100",
                                )}
                            >
                                {step}x
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 rounded-md bg-slate-900/50 px-3 py-2 ring-1 ring-cyan-500/20">
                    <Gamepad2 className="size-4 text-cyan-400" strokeWidth={2} />
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-200/80">
                        Keypad
                    </span>
                </div>
                <div
                    className="grid flex-1 grid-cols-4 gap-2 rounded-md bg-slate-900/70 p-3 ring-1 ring-cyan-500/20"
                    style={{ minHeight: 0 }}
                >
                    {KEYPAD_LAYOUT.flat().map((key) => {
                        const isPressed = pressed.has(key);
                        return (
                            <button
                                key={key}
                                onMouseDown={() => handleKeyDown(key)}
                                onTouchStart={(e) => {
                                    e.preventDefault();
                                    handleKeyDown(key);
                                }}
                                className={cn(
                                    "relative flex items-center justify-center rounded-md font-mono text-lg font-bold transition-all duration-100 select-none",
                                    isPressed
                                        ? "bg-cyan-400 text-slate-900 scale-[.92] shadow-[0_0_18px_rgba(103,232,249,.75)] ring-2 ring-cyan-200/60"
                                        : "bg-slate-800/90 text-cyan-200 ring-1 ring-cyan-500/30 hover:bg-slate-700 hover:ring-cyan-400/60 active:scale-95",
                                )}
                            >
                                {key}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
