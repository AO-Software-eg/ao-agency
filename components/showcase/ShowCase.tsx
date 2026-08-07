"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import type { ProjectStory } from "@/types/projects";
import { Story } from "./Story";

interface ShowcaseProps {
    projects: readonly ProjectStory[];
    className?: string;
}

function Showcase({ projects, className }: ShowcaseProps) {
    return (
        <div
            data-slot="showcase"
            className={cn("relative w-full", className)}
        >
            {projects.map((project, index) => (
                <Story
                    key={project.id}
                    story={project}
                    index={index}
                />
            ))}
        </div>
    );
}

export { Showcase };
