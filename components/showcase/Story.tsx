"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { ProjectStory } from "@/types/projects";
import { StoryViewport } from "./StoryViewPort";
import { StoryContent } from "./StoryContent";
import { StoryBackground } from "./StoryBackground";
import { storyThemeStyle } from "./theme";

interface StoryProps {
    story: ProjectStory;
    index: number;
    className?: string;
}

function Story({ story, index, className }: StoryProps) {
    const sectionRef = React.useRef<HTMLElement>(null);
    const [progress, setProgress] = React.useState(0);
    const [active, setActive] = React.useState(false);

    React.useEffect(() => {
        const update = () => {
            const element = sectionRef.current;
            if (!element) return;
            const rect = element.getBoundingClientRect();
            const travel = Math.max(1, rect.height - window.innerHeight);
            setProgress(Math.min(1, Math.max(0, -rect.top / travel)));
            setActive(rect.top < window.innerHeight * 0.55 && rect.bottom > window.innerHeight * 0.45);
        };

        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            data-slot="story"
            data-story-id={story.id}
            data-story-index={index}
            className={cn(
                "relative h-[300vh] w-full",
                className
            )}
            style={storyThemeStyle(story.theme)}
        >
            <StoryViewport>
                <StoryBackground theme={story.theme} progress={progress} />
                <StoryContent story={story} progress={progress} active={active} />
            </StoryViewport>
        </section>
    );
}

export { Story };
