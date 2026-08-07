"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const COLS = 32;
const ROWS = 16;

interface DisplayProps {
    running: boolean;
    tickRef: { current: number };
}

export function Display({ running, tickRef }: DisplayProps) {
    const gridRef = useRef<HTMLDivElement>(null);
    const spriteXRef = useRef(0);
    const spriteYRef = useRef(4);
    const dirRef = useRef(1);

    const sprite = [
        0b01111100,
        0b10000010,
        0b10100101,
        0b10000001,
        0b10011001,
        0b10000010,
        0b01111100,
    ];

    useEffect(() => {
        const cells = gridRef.current?.querySelectorAll<HTMLDivElement>("[data-cell]");
        if (!cells) return;

        const interval = setInterval(() => {
            tickRef.current += 1;

            for (let i = 0; i < cells.length; i++) {
                const col = i % COLS;
                const row = Math.floor(i / COLS);
                let on = false;

                const flickerRow = (tickRef.current + row) % 17;
                if (flickerRow === 0) {
                    on = (col + tickRef.current) % 5 === 0;
                }

                if (running) {
                    const sx = spriteXRef.current;
                    const sy = spriteYRef.current;
                    if (row >= sy && row < sy + sprite.length) {
                        const spriteRow = sprite[row - sy];
                        const bitIndex = col - sx;
                        if (bitIndex >= 0 && bitIndex < 8) {
                            if ((spriteRow & (1 << (7 - bitIndex))) !== 0) {
                                on = true;
                            }
                        }
                    }

                    const ballCol = (tickRef.current * 2) % COLS;
                    const ballRow = 12;
                    if (col === ballCol && row === ballRow) on = true;
                    if (col >= COLS - 6 && col < COLS - 2 && row === ballRow) on = true;

                    if (row >= 1 && row <= 3 && col >= 28 && col <= 30) on = true;
                    if (row >= 5 && row <= 7 && col >= 28 && col <= 30) on = true;
                    if (row === 4 && col === 29) on = true;
                }

                cells[i].dataset.on = on ? "1" : "0";
            }

            if (running) {
                spriteXRef.current += dirRef.current;
                if (spriteXRef.current >= COLS - 9) {
                    spriteXRef.current = COLS - 9;
                    dirRef.current = -1;
                    spriteYRef.current = (spriteYRef.current + 1) % (ROWS - sprite.length);
                } else if (spriteXRef.current <= 0) {
                    spriteXRef.current = 0;
                    dirRef.current = 1;
                    spriteYRef.current = (spriteYRef.current + 1) % (ROWS - sprite.length);
                }
            }
        }, 90);

        return () => clearInterval(interval);
    }, [running, tickRef, sprite]);

    return (
        <div
            className="relative flex h-full w-full items-center justify-center rounded-md p-3"
            style={{
                background:
                    "radial-gradient(ellipse at center, #030712 0%, #000814 60%, #000 100%)",
                boxShadow:
                    "inset 0 0 60px rgba(6,182,212,.12), inset 0 0 4px rgba(6,182,212,.35)",
            }}
        >
            <div
                className="absolute inset-3 rounded-sm pointer-events-none"
                style={{
                    background:
                        "repeating-linear-gradient(to bottom, rgba(255,255,255,.04) 0 1px, transparent 1px 3px)",
                    mixBlendMode: "overlay",
                }}
            />
            <div
                ref={gridRef}
                className={cn(
                    "relative grid gap-[1px]",
                )}
                style={{
                    gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
                    aspectRatio: `${COLS} / ${ROWS}`,
                    width: "100%",
                }}
            >
                {Array.from({ length: COLS * ROWS }).map((_, i) => (
                    <div
                        key={i}
                        data-cell
                        data-on="0"
                        className="transition-colors duration-75"
                        style={{
                            borderRadius: 1,
                            background: "rgba(6,182,212,.05)",
                        }}
                        ref={(el) => {
                            if (!el) return;
                            if (el.dataset.on === "1") {
                                el.style.background = "#67e8f9";
                                el.style.boxShadow =
                                    "0 0 4px rgba(103,232,249,.95), 0 0 10px rgba(6,182,212,.6)";
                            } else {
                                el.style.background = "rgba(6,182,212,.05)";
                                el.style.boxShadow = "none";
                            }
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
