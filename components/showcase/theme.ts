import type { CSSProperties } from "react";
import type { ProjectTheme } from "@/types/projects";

export type StoryThemeStyle = CSSProperties & Record<`--story-${string}`, string>;

export function storyThemeStyle(theme: ProjectTheme): StoryThemeStyle {
    return {
        "--story-background": theme.background,
        "--story-surface": theme.surface,
        "--story-card": theme.card,
        "--story-primary": theme.primary,
        "--story-secondary": theme.secondary,
        "--story-foreground": theme.foreground,
        "--story-muted": theme.muted,
        "--story-border": theme.border,
        "--story-glow": theme.glow,
        "--story-gradient": theme.gradient,
        "--story-grid": theme.grid,
        "--story-cursor": theme.cursor,
    };
}
