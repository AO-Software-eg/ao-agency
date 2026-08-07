"use client";

import { cn } from "@/lib/utils";
import {
    CheckCircle,
    Play,
    Clock,
    Users,
    Award,
    MessageSquare,
} from "lucide-react";
import type { ComponentType } from "react";

interface ActivityItem {
    id: string;
    user: string;
    userInitials: string;
    action: string;
    detail: string;
    time: string;
    icon: ComponentType<{ className?: string }>;
    iconTone: string;
    userGradient: string;
}

const activities: ActivityItem[] = [
    {
        id: "1",
        user: "Olivia Martinez",
        userInitials: "OM",
        action: "completed",
        detail: "Chapter 14 — Distributed Systems",
        time: "2 min ago",
        icon: CheckCircle,
        iconTone: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
        userGradient: "from-rose-400 to-pink-500",
    },
    {
        id: "2",
        user: "James Chen",
        userInitials: "JC",
        action: "started watching",
        detail: "Module 5 — React Server Components",
        time: "7 min ago",
        icon: Play,
        iconTone: "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400",
        userGradient: "from-sky-400 to-blue-500",
    },
    {
        id: "3",
        user: "Sophia Williams",
        userInitials: "SW",
        action: "earned certificate",
        detail: "Intro to Machine Learning",
        time: "18 min ago",
        icon: Award,
        iconTone: "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
        userGradient: "from-violet-400 to-purple-500",
    },
    {
        id: "4",
        user: "Liam Johnson",
        userInitials: "LJ",
        action: "spent 2h studying",
        detail: "Data Structures & Algorithms",
        time: "34 min ago",
        icon: Clock,
        iconTone: "bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400",
        userGradient: "from-emerald-400 to-teal-500",
    },
    {
        id: "5",
        user: "Ava Thompson",
        userInitials: "AT",
        action: "enrolled in",
        detail: "Cloud Architecture Pro",
        time: "1 hr ago",
        icon: Users,
        iconTone: "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
        userGradient: "from-amber-400 to-orange-500",
    },
    {
        id: "6",
        user: "Noah Davis",
        userInitials: "ND",
        action: "asked a question in",
        detail: "Q&A — Advanced TypeScript",
        time: "2 hr ago",
        icon: MessageSquare,
        iconTone: "bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400",
        userGradient: "from-indigo-400 to-violet-500",
    },
];

export function RecentActivity() {
    return (
        <section className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)]">
            <div className="border-b border-[var(--border)] px-5 py-4">
                <h2 className="text-base font-bold text-[var(--foreground)]">
                    Recent Activity
                </h2>
                <p className="mt-0.5 text-xs text-[var(--muted)]">
                    Live updates from your students
                </p>
            </div>
            <ul className="flex-1 divide-y divide-[var(--border)] overflow-y-auto">
                {activities.map((a) => {
                    const Icon = a.icon;
                    return (
                        <li
                            key={a.id}
                            className="group flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-[var(--background-secondary)]/60"
                        >
                            <div className="relative shrink-0">
                                <div
                                    className={cn(
                                        "flex size-9 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white shadow-sm",
                                        a.userGradient,
                                    )}
                                >
                                    {a.userInitials}
                                </div>
                                <div
                                    className={cn(
                                        "absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full border-2 border-[var(--card)]",
                                        a.iconTone,
                                    )}
                                >
                                    <Icon className="size-2.5" />
                                </div>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm text-[var(--foreground)]">
                                    <span className="font-semibold">
                                        {a.user}
                                    </span>
                                    <span className="text-[var(--muted)]">
                                        {" "}{a.action}{" "}
                                    </span>
                                    <span className="font-medium">{a.detail}</span>
                                </p>
                                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-[var(--muted)]">
                                    <span className="relative flex size-1.5">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                                    </span>
                                    {a.time}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
