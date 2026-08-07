import { cn } from "@/lib/utils";
import type { ProjectTheme } from "@/types/projects";

interface StoryBackgroundProps {
    theme: ProjectTheme;
    progress: number;
    className?: string;
}

/** A theme-only atmosphere layer. It deliberately contains no project identity logic. */
function StoryBackground({ theme, progress, className }: StoryBackgroundProps) {
    return (
        <div
            aria-hidden="true"
            data-slot="story-background"
            className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
            style={{ background: theme.background }}
        >
            <div
                className="absolute inset-0 opacity-70 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(circle at ${24 + progress * 48}% ${25 + progress * 22}%, ${theme.glow} 0%, transparent 42%), ${theme.gradient}`,
                    opacity: 0.46 + progress * 0.2,
                }}
            />
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage: `linear-gradient(${theme.grid}22 1px, transparent 1px), linear-gradient(90deg, ${theme.grid}22 1px, transparent 1px)`,
                    backgroundSize: "42px 42px",
                    maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
                }}
            />
            <div
                className="absolute -inset-[25%] blur-3xl transition-transform duration-700"
                style={{
                    background: `radial-gradient(circle, ${theme.glow} 0%, transparent 58%)`,
                    transform: `translate(${(progress - 0.5) * 12}%, ${(progress - 0.5) * -8}%)`,
                }}
            />
        </div>
    );
}

export { StoryBackground };
