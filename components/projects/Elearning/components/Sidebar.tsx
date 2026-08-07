"use client";

import { cn } from "@/lib/utils";
import {
    BookOpen,
    Home,
    Users,
    BarChart3,
    Calendar,
    Settings,
    ChevronRight,
} from "lucide-react";

interface NavItem {
    label: string;
    icon: typeof Home;
    active?: boolean;
    badge?: string;
}

const navItems: NavItem[] = [
    { label: "Dashboard", icon: Home, active: true },
    { label: "My Courses", icon: BookOpen, badge: "12" },
    { label: "Students", icon: Users },
    { label: "Analytics", icon: BarChart3 },
    { label: "Schedule", icon: Calendar },
    { label: "Settings", icon: Settings },
];

export function Sidebar() {
    return (
        <aside className="flex h-full w-64 flex-col border-r border-[var(--border)] bg-[var(--background-secondary)]">
            <div className="flex items-center gap-3 border-b border-[var(--border)] px-6 py-5">
                <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25">
                    <BookOpen className="size-5 text-white" />
                </div>
                <div>
                    <h1 className="text-base font-bold tracking-tight text-[var(--foreground)]">
                        AO Learning
                    </h1>
                    <p className="text-xs text-[var(--muted)]">Instructor Portal</p>
                </div>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.label}
                            className={cn(
                                "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                item.active
                                    ? "bg-gradient-to-r from-indigo-500/10 to-violet-500/10 text-indigo-600 dark:text-indigo-400"
                                    : "text-[var(--muted)] hover:bg-[var(--background-tertiary)] hover:text-[var(--foreground)]",
                            )}
                        >
                            <Icon
                                className={cn(
                                    "size-5 transition-colors",
                                    item.active
                                        ? "text-indigo-500"
                                        : "group-hover:text-indigo-500",
                                )}
                            />
                            <span className="flex-1 text-left">{item.label}</span>
                            {item.badge && (
                                <span className="rounded-full bg-indigo-500/15 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                                    {item.badge}
                                </span>
                            )}
                            {item.active && (
                                <ChevronRight className="size-4 text-indigo-500" />
                            )}
                        </button>
                    );
                })}
            </nav>

            <div className="border-t border-[var(--border)] p-4">
                <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 p-4 text-white shadow-lg shadow-indigo-500/20">
                    <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
                        Pro Plan
                    </p>
                    <p className="mt-1 text-sm font-medium">
                        Unlock advanced analytics
                    </p>
                    <button className="mt-3 w-full rounded-lg bg-white/15 px-3 py-2 text-xs font-semibold backdrop-blur transition-colors hover:bg-white/25">
                        Upgrade Now
                    </button>
                </div>
            </div>
        </aside>
    );
}
