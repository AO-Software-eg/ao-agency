import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ExperienceFrameConfig } from "@/types/projects";

interface ExperienceFrameProps {
    children: ReactNode;
    progress: number;
    active: boolean;
    config?: ExperienceFrameConfig;
    className?: string;
}

/** Owns presentation, sizing and timeline motion; BrowserWindow owns only chrome. */
function ExperienceFrame({ children, progress, active, config, className }: ExperienceFrameProps) {
    const entrance = Math.min(1, progress * 4);
    const exit = Math.max(0, (progress - 0.82) / 0.18);
    const focus = Math.sin(Math.min(1, Math.max(0, progress)) * Math.PI);
    const maxZoom = config?.maxZoom ?? 0;
    const glowOpacity = config
        ? 0.35 + focus * (config.maxGlowOpacity ?? 0.15)
        : 1;

    return (
        <div
            data-slot="experience-frame"
            data-active={active}
            className={cn("relative flex h-full w-full items-center justify-center", className)}
            style={{
                opacity: active ? 1 - exit * 0.35 : 0.72,
                transform: `translateY(${(1 - entrance) * 24 - exit * 16}px) scale(${0.94 + entrance * 0.06 + focus * maxZoom - exit * 0.025})`,
                filter: `brightness(${1 + focus * (config?.maxBrightness ?? 0)})`,
                transition: "opacity 240ms ease-out, transform 240ms ease-out",
            }}
        >
            <div
                className="absolute inset-[7%] rounded-[2rem] bg-[var(--story-glow)] blur-3xl"
                style={{ opacity: glowOpacity }}
            />
            <div className="relative aspect-[16/10] h-auto w-full max-h-full">{children}</div>
        </div>
    );
}

export { ExperienceFrame };
