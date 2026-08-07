import * as React from "react";
import { cn } from "@/lib/utils";

interface StoryViewportProps {
    children: React.ReactNode;
    className?: string;
}

function StoryViewport({ children, className }: StoryViewportProps) {
    return (
        <div
            data-slot="story-viewport"
            className={cn(
                "sticky top-0 h-screen w-full overflow-hidden",
                className
            )}
        >
            {children}
        </div>
    );
}

export { StoryViewport };
