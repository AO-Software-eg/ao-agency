import * as React from "react";
import { cn } from "@/lib/utils";

interface BrowserWindowProps extends React.ComponentProps<"div"> {
    title?: string;
}

function BrowserWindow({
    title,
    className,
    children,
    ...props
}: BrowserWindowProps) {
    return (
        <div
            data-slot="browser-window"
            className={cn(
                "glass-card relative flex flex-col overflow-hidden rounded-2xl",
                "bg-white/55 dark:bg-[#101012]/52",
                "border border-[rgba(228,228,231,0.65)] dark:border-[rgba(63,63,70,0.45)]",
                "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_1px_1px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.55),0_2px_6px_-2px_rgba(0,0,0,0.35)]",
                "backdrop-blur-xl backdrop-saturate-150",
                className
            )}
            {...props}
        >
            <div
                data-slot="browser-window-header"
                className="flex items-center gap-3 border-b border-[rgba(228,228,231,0.5)] dark:border-[rgba(63,63,70,0.4)] px-4 py-3"
            >
                <div
                    data-slot="browser-window-traffic"
                    className="flex items-center gap-2"
                    aria-hidden="true"
                >
                    <span className="block size-3 rounded-full bg-[#ff5f57] ring-1 ring-inset ring-black/10" />
                    <span className="block size-3 rounded-full bg-[#febc2e] ring-1 ring-inset ring-black/10" />
                    <span className="block size-3 rounded-full bg-[#28c840] ring-1 ring-inset ring-black/10" />
                </div>

                {title ? (
                    <div
                        data-slot="browser-window-title"
                        className="flex-1 text-center text-xs font-medium text-foreground-muted"
                    >
                        {title}
                    </div>
                ) : (
                    <div className="flex-1" />
                )}

                <div className="w-[52px]" aria-hidden="true" />
            </div>

            <div
                data-slot="browser-window-body"
                className="relative flex-1 overflow-hidden"
            >
                {children}
            </div>
        </div>
    );
}

export { BrowserWindow };
