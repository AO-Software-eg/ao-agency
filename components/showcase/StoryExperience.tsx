import * as React from "react";
import { cn } from "@/lib/utils";
import type { ProjectStory } from "@/types/projects";
import { BrowserWindow } from "./BrowserWindow";
import { ExperienceFrame } from "./ExperienceFrame";

interface StoryExperienceProps {
    story: ProjectStory;
    progress: number;
    active: boolean;
    className?: string;
}

function StoryExperience({ story, progress, active, className }: StoryExperienceProps) {
    const ExperienceComponent = story.Experience;

    return (
        <div
            data-slot="story-experience"
            data-story-id={story.id}
            className={cn(
                "flex h-full w-full items-center justify-center",
                className
            )}
        >
            <ExperienceFrame progress={progress} active={active} config={story.frame}>
                <BrowserWindow title={story.windowTitle} className="h-full w-full">
                    <ExperienceComponent progress={progress} active={active} />
                </BrowserWindow>
            </ExperienceFrame>
        </div>
    );
}

export { StoryExperience };
