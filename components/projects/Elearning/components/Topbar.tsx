"use client";

import { Search, Bell } from "lucide-react";

export function Topbar() {
    return (
        <header className="flex h-16 items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-6">
            <div className="flex items-center gap-4">
                <div>
                    <h2 className="text-lg font-bold text-[var(--foreground)]">
                        Welcome back, Dr. Sarah
                    </h2>
                    <p className="text-xs text-[var(--muted)]">
                        Here is what is happening with your courses today
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" />
                    <input
                        type="text"
                        placeholder="Search courses, students..."
                        className="h-10 w-72 rounded-xl border border-[var(--border)] bg-[var(--background-secondary)] pl-9 pr-4 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                    />
                </div>

                <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--background-secondary)] text-[var(--muted)] transition-all duration-200 hover:border-indigo-300 hover:text-indigo-500 hover:shadow-md hover:shadow-indigo-500/10">
                    <Bell className="size-5" />
                    <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-[10px] font-bold text-white shadow-sm">
                        5
                    </span>
                </button>

                <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--background-secondary)] px-3 py-1.5 transition-all duration-200 hover:border-indigo-200">
                    <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 via-violet-500 to-purple-600 text-sm font-bold text-white shadow-md shadow-indigo-500/20">
                        SC
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm font-semibold text-[var(--foreground)]">
                            Dr. Chen
                        </p>
                        <p className="text-xs text-[var(--muted)]">Admin</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
