import { VideoCard, type VideoCourse } from "./VideoCard";
import { ChevronRight } from "lucide-react";

const courses: VideoCourse[] = [
    {
        title: "Advanced Systems Design & Architecture",
        instructor: "Dr. Marcus Webb",
        chapters: 24,
        duration: "12h 48m",
        progress: 68,
        thumbnailGradient:
            "bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600",
        category: "Computer Science",
        rating: 4.9,
    },
    {
        title: "Modern React Patterns 2026",
        instructor: "Elena Rodriguez",
        chapters: 18,
        duration: "9h 15m",
        progress: 42,
        thumbnailGradient:
            "bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600",
        category: "Web Development",
        rating: 4.8,
    },
    {
        title: "Data Science Masterclass",
        instructor: "Prof. Amit Patel",
        chapters: 32,
        duration: "18h 02m",
        progress: 89,
        thumbnailGradient:
            "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600",
        category: "Data Science",
        rating: 4.9,
    },
];

export function CourseList() {
    return (
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h2 className="text-base font-bold text-[var(--foreground)]">
                        Continue Learning
                    </h2>
                    <p className="mt-0.5 text-xs text-[var(--muted)]">
                        Pick up where you left off
                    </p>
                </div>
                <button className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-indigo-600 transition-colors hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-500/10">
                    View All
                    <ChevronRight className="size-3.5" />
                </button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {courses.map((c) => (
                    <VideoCard key={c.title} course={c} />
                ))}
            </div>
        </section>
    );
}
