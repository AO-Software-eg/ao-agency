"use client";

import {
    ProjectStoryShowcase,
    type ShowcaseTheme,
} from "@/components/projects/ProjectStoryShowcase";
import { projectLinks, Header, features } from "./context";

const alameedTheme: ShowcaseTheme = {
    section: "bg-[#f8fafd] text-[#0f172a]",
    // NOTE: no dark-to-light gradient here on purpose — E-learning's
    // transitionOverlay owns the entire dark→light blend at the section
    // boundary, so this section must start clean and light from its very top.
    background: (
        <>
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background:radial-gradient(circle_at_78%_14%,rgba(37,99,235,0.06),transparent_30%),radial-gradient(circle_at_12%_68%,rgba(147,197,253,0.09),transparent_34%)]" />
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.22] [background-image:linear-gradient(rgba(37,99,235,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.055)_1px,transparent_1px)] [background-size:44px_44px]" />
        </>
    ),
    headerBorder: "border-blue-950/[0.08]",
    accentText: "text-blue-700",
    mutedText: "text-slate-500",
    bodyText: "text-slate-600",
    titleText: "text-[#0f172a]",
    inactiveNumber: "rgba(100,116,139,0.45)",
    accentColor: "#1d4ed8",
    accentBg: "bg-blue-600",
    border: "border-blue-950/[0.08]",
    progressTrack: "bg-blue-500/[0.14]",
    imageFrame: "border-blue-950/[0.09]",
    imageOuterBorder: "border-blue-400/20",
    imageBackground: "bg-white",
    action:
        "inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-blue-200/90 bg-white px-5 text-sm font-medium text-slate-800 shadow-sm shadow-blue-950/[0.04] transition duration-200 hover:border-blue-400 hover:bg-blue-50/80 hover:text-blue-700",
    actionDisabled:
        "cursor-not-allowed opacity-50 hover:border-blue-200/90 hover:bg-white hover:text-slate-800",
    focusRing:
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8fafd]",
};

function Alameed() {
    return (
        <ProjectStoryShowcase
            header={Header}
            features={features}
            projectLinks={projectLinks}
            theme={alameedTheme}
            layout="right"
        />
    );
}

export default Alameed;
