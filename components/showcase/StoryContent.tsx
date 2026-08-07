import * as React from "react";
import { cn } from "@/lib/utils";
import type { ProjectStory } from "@/types/projects";
import { StoryInfo } from "./StoryInfo";
import { StoryExperience } from "./StoryExperience";
import { StoryLayout } from "./StoryLayout";

interface StoryContentProps {
    story: ProjectStory;
    progress: number;
    active: boolean;
    className?: string;
}

function StoryContent({ story, progress, active, className }: StoryContentProps) {
    return (
        <div
            data-slot="story-content"
            data-story-id={story.id}
            className={cn("h-full w-full", className)}
        >
            <StoryLayout
                info={<StoryInfo story={story} progress={progress} />}
                experience={<StoryExperience story={story} progress={progress} active={active} />}
            />
        </div>
    );
}

export { StoryContent };
