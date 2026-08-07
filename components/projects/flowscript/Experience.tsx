"use client";

import type { ExperienceProps } from "@/types/projects";
import Terminal from "./components/Terminal";

export default function Experience({ progress, active }: ExperienceProps) {
    void progress;
    void active;

    return (
        <div className="flex h-full w-full items-center justify-center p-4 sm:p-6 md:p-8"
            style={{ background: "radial-gradient(ellipse at top, #0f172a 0%, #0b1020 55%, #070b18 100%)" }}
        >
            <div className="h-full w-full max-w-[1200px]">
                <Terminal />
            </div>
        </div>
    );
}
