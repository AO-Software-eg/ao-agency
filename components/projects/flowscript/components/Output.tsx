"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

const outputRows = [
    "Hello, FlowScript! 1+2=3",
    "one",
    "",
    "[process exited with code 0]",
];

export default function Output() {
    const [visible, setVisible] = useState(0);

    useEffect(() => {
        const timers: number[] = [];
        outputRows.forEach((_, idx) => {
            const t = window.setTimeout(() => {
                setVisible(idx + 1);
            }, 3600 + idx * 260);
            timers.push(t);
        });
        return () => timers.forEach((t) => window.clearTimeout(t));
    }, []);

    return (
        <div className="flex min-h-0 w-[34%] shrink-0 flex-col border-l border-[#1e293b] bg-[#0b1020]">
            <div className="flex items-center justify-between border-b border-[#1e293b] px-4 py-1.5">
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#94a3b8]">
                    <Play className="size-3 text-amber-400" />
                    Program Output
                </div>
                <div className="text-[11px] font-mono text-[#64748b]">
                    stdout
                </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-5 text-[#e5e7eb]">
                {outputRows.slice(0, visible).map((row, i) => (
                    <div
                        key={i}
                        className={cn(
                            "whitespace-pre",
                            row.startsWith("[process exited") ? "text-emerald-400" : undefined,
                        )}
                    >
                        {row || "\u00A0"}
                    </div>
                ))}
            </div>
        </div>
    );
}
