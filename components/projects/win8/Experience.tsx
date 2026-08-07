"use client";

import type { ExperienceProps } from "@/types/projects";
import { Emulator } from "./components/Emulator";

export default function Experience({ progress, active }: ExperienceProps) {
    void progress;
    void active;

    return (
        <div
            className="flex h-full w-full items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8"
            style={{
                background:
                    "radial-gradient(ellipse at top, #0c4a6e 0%, #082f49 50%, #1e1b4b 100%)",
            }}
        >
            <div className="h-full w-full max-w-[1100px]">
                <Emulator />
            </div>
        </div>
    );
}
