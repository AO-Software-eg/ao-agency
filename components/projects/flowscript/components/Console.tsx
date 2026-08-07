"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConsoleLine {
    kind: "cmd" | "out" | "ok" | "err" | "info";
    text: string;
}

const scheduledLines: ConsoleLine[] = [
    { kind: "cmd", text: "flow build --release" },
    { kind: "info", text: "compiling main.fs..." },
    { kind: "info", text: "parsing flowscript syntax tree" },
    { kind: "ok", text: "type-check 42 modules \u2713" },
    { kind: "info", text: "resolving dependencies" },
    { kind: "ok", text: "serde v1.0 \u2713" },
    { kind: "ok", text: "tokio v1.0 \u2713" },
    { kind: "info", text: "lowering MIR -> LLVM IR" },
    { kind: "info", text: "running optimization passes (O3)" },
    { kind: "info", text: "inlining generics (128 monomorphs)" },
    { kind: "info", text: "linking native binary" },
    { kind: "ok", text: "output: hello-flow v0.1.0 \u2713" },
    { kind: "info", text: "binary size: 4.2MB" },
    { kind: "ok", text: "ready in 128ms" },
];

export default function Console() {
    const [lines, setLines] = useState<ConsoleLine[]>([]);
    const idxRef = useRef(0);
    const scrollerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLines([]);
        idxRef.current = 0;

        const tick = () => {
            if (idxRef.current >= scheduledLines.length) {
                return;
            }
            const next = scheduledLines[idxRef.current];
            idxRef.current += 1;
            setLines((prev) => [...prev, next]);
        };

        const initial = window.setTimeout(tick, 300);
        const id = window.setInterval(tick, 520);

        const cleanup = window.setTimeout(() => {
            window.clearInterval(id);
        }, 520 * scheduledLines.length + 800);

        return () => {
            window.clearTimeout(initial);
            window.clearTimeout(id);
            window.clearTimeout(cleanup);
        };
    }, []);

    useEffect(() => {
        const el = scrollerRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [lines]);

    const done = lines.length >= scheduledLines.length;

    return (
        <div className="flex min-h-0 flex-1 flex-col border-t border-[#1e293b] bg-[#0b1020]">
            <div className="flex items-center justify-between border-b border-[#1e293b] px-4 py-1.5">
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#94a3b8]">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    Build Console
                </div>
                <div className="flex items-center gap-3 text-[11px] font-mono text-[#64748b]">
                    <span>zsh</span>
                    <span className={cn("h-1.5 w-1.5 rounded-full", done ? "bg-emerald-400" : "bg-amber-400 animate-pulse")} />
                </div>
            </div>

            <div
                ref={scrollerRef}
                className="min-h-0 flex-1 overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-5"
            >
                {lines.map((ln, i) => {
                    const isCmd = ln.kind === "cmd";
                    const isOk = ln.kind === "ok";
                    const isErr = ln.kind === "err";
                    return (
                        <div
                            key={i}
                            className={cn(
                                "flex items-start gap-2 whitespace-pre",
                                isOk ? "text-emerald-300" : isErr ? "text-rose-400" : "text-[#cbd5e1]",
                            )}
                        >
                            {isCmd ? (
                                <ChevronRight className="mt-[3px] size-3 shrink-0 text-emerald-400" />
                            ) : isOk ? (
                                <Check className="mt-[3px] size-3 shrink-0 text-emerald-400" />
                            ) : isErr ? (
                                <AlertCircle className="mt-[3px] size-3 shrink-0 text-rose-400" />
                            ) : (
                                <span className="w-3 shrink-0" />
                            )}
                            <span>{ln.text}</span>
                        </div>
                    );
                })}

                {!done && (
                    <div className="mt-1 flex items-center gap-2 text-[#cbd5e1]">
                        <span className="ml-5 h-4 w-2 translate-y-[2px] rounded-sm bg-emerald-400/80 animate-pulse" />
                    </div>
                )}
            </div>
        </div>
    );
}
