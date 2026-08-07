"use client";

import { useState } from "react";
import { FileCode, Terminal as TerminalIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Tabs, { type TabItem } from "./Tabs";
import Editor from "./Editor";
import Console from "./Console";
import Output from "./Output";
import StatusBar from "./StatusBar";

const TABS: readonly TabItem[] = [
    { id: "main.fs", label: "main.fs", icon: FileCode },
    { id: "lib.fs", label: "lib.fs", icon: FileCode },
    { id: "flow.toml", label: "Flow.toml", icon: TerminalIcon },
];

export default function Terminal() {
    const [activeTab, setActiveTab] = useState<string>("main.fs");

    return (
        <div
            className={cn(
                "flex h-full w-full flex-col overflow-hidden rounded-lg border text-[13px]",
            )}
            style={{
                borderColor: "#1e293b",
                boxShadow:
                    "0 18px 60px -18px rgba(52,211,153,.25), 0 4px 18px -6px rgba(0,0,0,.5)",
                background: "#0b1020",
            }}
        >
            <Tabs
                tabs={TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="flex min-h-0 flex-1">
                <div className="flex min-w-0 flex-1 flex-col">
                    <Editor activeTab={activeTab} />
                    <Console />
                </div>
                <Output />
            </div>

            <StatusBar />
        </div>
    );
}
