import type { ComponentType } from "react";

export interface ProjectTheme {
    background: string;
    surface: string;
    card: string;

    primary: string;
    secondary: string;

    foreground: string;
    muted: string;

    border: string;

    glow: string;

    gradient: string;

    /** Theme-engine tokens: rendered by StoryBackground, interpolated in a later phase. */
    grid: string;
    cursor: string;
}

export interface ProjectCta {
    label: string;
    href: string;
    variant?: "primary" | "secondary" | "ghost";
}

export interface ExperienceProps {
    progress: number;
    active: boolean;
}

/** Optional, data-driven camera treatment for an experience frame. */
export interface ExperienceFrameConfig {
    maxZoom?: number;
    maxBrightness?: number;
    maxGlowOpacity?: number;
}

export interface ProjectStory {
    id: string;
    slug: string;
    windowTitle: string;
    title: string;
    subtitle: string;
    description: string;
    technologies: readonly string[];
    features: readonly string[];
    theme: ProjectTheme;
    Experience: ComponentType<ExperienceProps>;
    Details: ComponentType;
    frame?: ExperienceFrameConfig;
    ctas?: readonly ProjectCta[];
}
