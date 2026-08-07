"use client";

import type { ExperienceProps } from "@/types/projects";
import { ScrollVideo } from "@/components/showcase/ScrollVideo";

const productVideo = "/ao-learning-platform.mp4";

interface LearningChapter {
    label: string;
    detail: string;
    at: number;
    placement: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const chapters: readonly LearningChapter[] = [
    { label: "Student Progress Tracking", detail: "A learning path built around every student.", at: 0.08, placement: "top-left" },
    { label: "Adaptive Video Streaming", detail: "Resume lessons exactly where learning paused.", at: 0.27, placement: "bottom-right" },
    { label: "Assignment Submission", detail: "Homework, feedback, and due dates in one flow.", at: 0.46, placement: "top-right" },
    { label: "Secure Assessments", detail: "Mini exams that keep progress measurable.", at: 0.62, placement: "bottom-left" },
    { label: "Certificate Generation", detail: "Turn completed learning into proof of achievement.", at: 0.78, placement: "top-right" },
    { label: "Learning Analytics", detail: "See the next opportunity in every cohort.", at: 0.91, placement: "bottom-right" },
];

const placementClasses: Record<LearningChapter["placement"], string> = {
    "top-left": "left-[4%] top-[5%]",
    "top-right": "right-[4%] top-[5%]",
    "bottom-left": "bottom-[5%] left-[4%]",
    "bottom-right": "bottom-[5%] right-[4%]",
};

function chapterVisibility(progress: number, marker: number) {
    const distance = Math.abs(progress - marker);
    return Math.max(0, 1 - distance / 0.14);
}

export default function Experience({ progress, active }: ExperienceProps) {
    const focus = Math.sin(Math.min(1, Math.max(0, progress)) * Math.PI);

    return (
        <div
            data-slot="elearning-video-experience"
            data-active={active}
            className="relative h-full w-full overflow-hidden bg-[#021f1c]"
            style={{
                background: `radial-gradient(circle at ${30 + progress * 35}% ${25 + progress * 20}%, rgba(52,211,153,${0.08 + focus * 0.16}), transparent 46%), #021f1c`,
            }}
        >
            <div
                className="absolute inset-0 transition-transform duration-200 ease-out"
                style={{ transform: `scale(${1 + focus * 0.018})` }}
            >
                <ScrollVideo mp4={productVideo} progress={progress} />
            </div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#021f1c]/30 via-transparent to-black/10" />

            {chapters.map((chapter) => {
                const visibility = chapterVisibility(progress, chapter.at);
                return (
                    <div
                        key={chapter.label}
                        data-slot="learning-video-callout"
                        className={`pointer-events-none absolute max-w-[12rem] rounded-xl border border-emerald-100/20 bg-[#052e2b]/70 px-3 py-2.5 shadow-[0_12px_35px_-16px_rgba(16,185,129,0.8)] backdrop-blur-md transition-[opacity,transform] duration-200 sm:max-w-[15rem] sm:px-4 sm:py-3 ${placementClasses[chapter.placement]}`}
                        style={{
                            opacity: visibility,
                            transform: `translateY(${(1 - visibility) * 10}px) scale(${0.96 + visibility * 0.04})`,
                        }}
                    >
                        <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.16em] text-emerald-300">AO Learning</span>
                        <p className="text-xs font-semibold text-emerald-50 sm:text-sm">{chapter.label}</p>
                        <p className="mt-1 hidden text-[11px] leading-relaxed text-emerald-100/70 sm:block">{chapter.detail}</p>
                    </div>
                );
            })}
        </div>
    );
}
