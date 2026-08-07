"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Play, Clock, Award } from "lucide-react";

export interface VideoCourse {
    title: string;
    instructor: string;
    chapters: number;
    duration: string;
    progress: number;
    thumbnailGradient: string;
    category: string;
    rating: number;
}

interface VideoCardProps {
    course: VideoCourse;
}

export function VideoCard({ course }: VideoCardProps) {
    const [progress, setProgress] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const id = window.setTimeout(() => setProgress(course.progress), 250);
        return () => window.clearTimeout(id);
    }, [course.progress]);

    useEffect(() => {
        const id = window.setInterval(() => {
            setProgress((p) => {
                const delta = (Math.random() - 0.4) * 0.6;
                const next = p + delta;
                if (next < Math.max(0, course.progress - 4)) return p;
                if (next > Math.min(100, course.progress + 4)) return p;
                return next;
            });
        }, 2200 + Math.random() * 1500);
        return () => window.clearInterval(id);
    }, [course.progress]);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/10"
        >
            <div
                className={cn(
                    "relative aspect-[16/10] w-full overflow-hidden",
                    course.thumbnailGradient,
                )}
            >
                <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                    <div className="absolute -left-10 -top-10 size-40 rounded-full bg-white blur-3xl" />
                    <div className="absolute -bottom-10 -right-10 size-40 rounded-full bg-white/40 blur-3xl" />
                </div>

                <div className="absolute left-3 top-3 flex items-center gap-2">
                    <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
                        {course.category}
                    </span>
                </div>

                <button
                    className={cn(
                        "absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-xl transition-all duration-300",
                        isHovered
                            ? "scale-110 opacity-100"
                            : "scale-90 opacity-0",
                    )}
                >
                    <Play className="ml-0.5 size-6 text-indigo-600" fill="currentColor" />
                </button>

                <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-md bg-black/45 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    <Clock className="size-3" />
                    {course.duration}
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 p-4">
                <div>
                    <h3 className="line-clamp-1 text-sm font-bold text-[var(--foreground)] transition-colors group-hover:text-indigo-600">
                        {course.title}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                        by {course.instructor}
                    </p>
                </div>

                <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                    <span className="flex items-center gap-1">
                        <Award className="size-3.5 text-amber-500" />
                        <span className="font-semibold text-[var(--foreground)]">
                            {course.rating}
                        </span>
                    </span>
                    <span className="text-[var(--border)]">•</span>
                    <span>{course.chapters} chapters</span>
                </div>

                <div>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span className="font-medium text-[var(--muted)]">
                            Progress
                        </span>
                        <span className="font-bold text-indigo-600 tabular-nums">
                            {progress.toFixed(0)}%
                        </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--background-secondary)]">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 transition-[width] duration-[1400ms] ease-out animate-pulse"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
