"use client";

import { useRef, useState } from "react";
import { Display } from "./Display";
import { Controls } from "./Controls";
import { ROMSelector, type ROMEntry } from "./ROMSelector";
import { StatusBar } from "./StatusBar";
import { cn } from "@/lib/utils";

const ROMS: readonly ROMEntry[] = [
    {
        id: "tetris",
        name: "Tetris",
        year: "1990",
        size: "3.2 KB",
        accent: "cyan",
        span: "wide",
    },
    {
        id: "pong",
        name: "Pong",
        year: "1977",
        size: "0.3 KB",
        accent: "fuchsia",
    },
    {
        id: "space",
        name: "Space Invaders",
        year: "1978",
        size: "2.1 KB",
        accent: "orange",
    },
    {
        id: "brix",
        name: "Brix",
        year: "1991",
        size: "1.7 KB",
        accent: "cyan",
        span: "wide",
    },
    {
        id: "ibm",
        name: "IBM Logo",
        year: "1978",
        size: "0.1 KB",
        accent: "fuchsia",
    },
    {
        id: "trip8",
        name: "Trip-8",
        year: "2004",
        size: "4.6 KB",
        accent: "orange",
    },
];

export function Emulator() {
    const [running, setRunning] = useState(true);
    const [speed, setSpeed] = useState(1);
    const [activeRomId, setActiveRomId] = useState<string>(ROMS[0].id);
    const tickRef = useRef(0);
    const [, setResetCount] = useState(0);

    const activeRom = ROMS.find((r) => r.id === activeRomId) ?? ROMS[0];

    return (
        <div
            className="relative flex h-full w-full flex-col overflow-hidden rounded-md p-4"
            style={{
                background:
                    "linear-gradient(135deg,#0c4a6e 0%,#082f49 45%,#1e1b4b 100%)",
            }}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(6,182,212,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,.8) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />
            <div
                className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full opacity-30 blur-3xl"
                style={{ background: "#06b6d4" }}
            />
            <div
                className="pointer-events-none absolute -bottom-40 -left-24 size-96 rounded-full opacity-25 blur-3xl"
                style={{ background: "#d946ef" }}
            />

            <div className="relative flex items-center gap-3 pb-3">
                <div
                    className="flex size-10 items-center justify-center rounded-md"
                    style={{
                        background:
                            "linear-gradient(135deg,#06b6d4 0%,#8b5cf6 100%)",
                        boxShadow: "0 0 24px rgba(6,182,212,.45)",
                    }}
                >
                    <span className="font-mono text-sm font-black text-white tracking-tight">
                        C8
                    </span>
                </div>
                <div className="flex-1">
                    <h1 className="text-base font-black tracking-tight text-cyan-50">
                        Win-8 CHIP-8
                    </h1>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300/70">
                        Retro Emulator — S-CHIP Debug Suite
                    </p>
                </div>
                <div className="flex items-center gap-1 rounded-md bg-slate-900/60 px-2.5 py-1 ring-1 ring-cyan-500/25">
                    <span className="h-2 w-2 rounded-full bg-rose-500/80" />
                    <span className="h-2 w-2 rounded-full bg-amber-400/80" />
                    <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300/70">
                        v2.4.1
                    </span>
                </div>
            </div>

            <div
                className={cn(
                    "relative grid flex-1 gap-3",
                    "grid-rows-[1fr_auto_1fr]",
                )}
                style={{ minHeight: 0 }}
            >
                <div
                    key={"display-" + tickRef.current % 1000 + setResetCount}
                    className="min-h-0"
                >
                    <Display running={running} tickRef={tickRef} />
                </div>

                <div className="shrink-0">
                    <StatusBar
                        running={running}
                        romName={activeRom.name}
                        tickRef={tickRef}
                    />
                </div>

                <div
                    className="grid min-h-0 gap-3"
                    style={{ gridTemplateColumns: "1.15fr 1fr" }}
                >
                    <Controls
                        running={running}
                        onToggleRun={() => setRunning((r) => !r)}
                        onReset={() => {
                            tickRef.current = 0;
                            setResetCount((c) => c + 1);
                        }}
                        onStep={() => {
                            tickRef.current += 1;
                        }}
                        speed={speed}
                        onSpeedChange={setSpeed}
                    />
                    <ROMSelector
                        roms={ROMS}
                        activeId={activeRomId}
                        onSelect={(id) => {
                            setActiveRomId(id);
                            tickRef.current = 0;
                            setResetCount((c) => c + 1);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
