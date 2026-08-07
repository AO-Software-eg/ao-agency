import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StoryLayoutProps {
    info: ReactNode;
    experience: ReactNode;
    className?: string;
}

function StoryLayout({ info, experience, className }: StoryLayoutProps) {
    return (
        <div
            data-slot="story-layout"
            className={cn(
                "mx-auto grid min-h-full w-full max-w-[1600px] items-center gap-8 px-5 py-12 sm:px-8 lg:h-full lg:grid-cols-10 lg:gap-14 lg:px-16",
                className,
            )}
        >
            <div data-slot="story-left-column" className="order-2 lg:order-1 lg:col-span-4">
                {info}
            </div>
            <div data-slot="story-right-column" className="order-1 min-h-[360px] lg:order-2 lg:col-span-6 lg:h-[78vh] lg:min-h-0">
                {experience}
            </div>
        </div>
    );
}

export { StoryLayout };
