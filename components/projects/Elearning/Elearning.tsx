import {
    ProjectStoryShowcase,
    type ShowcaseTheme,
} from "@/components/projects/ProjectStoryShowcase";
import { projectLinks, Header, features } from "./context";

const elearningTheme: ShowcaseTheme = {
    section: "bg-[#080706] text-stone-100",
    background: (
        <>
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-80 [background:radial-gradient(circle_at_74%_18%,rgba(214,181,109,0.11),transparent_32%),radial-gradient(circle_at_18%_76%,rgba(255,246,221,0.055),transparent_30%)]" />
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.75)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.75)_1px,transparent_1px)] [background-size:44px_44px]" />
        </>
    ),
    transitionOverlay: (
        <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-10 h-[28rem] bg-[radial-gradient(circle_at_78%_10%,rgba(59,130,246,0.14),transparent_36%),linear-gradient(to_bottom,rgba(8,7,6,0)_4%,rgba(8,7,6,0.35)_22%,rgba(244,247,251,0.35)_52%,rgba(248,250,253,0.82)_76%,#f8fafd_100%)]" />
    ),
    headerBorder: "border-white/10",
    accentText: "text-[#d8bd7a]",
    mutedText: "text-stone-400",
    bodyText: "text-stone-300",
    titleText: "text-stone-50",
    inactiveNumber: "rgba(214,211,209,0.42)",
    accentColor: "#d8bd7a",
    accentBg: "bg-[#d8bd7a]",
    border: "border-white/10",
    progressTrack: "bg-white/12",
    imageFrame: "border-white/12",
    imageOuterBorder: "border-[#d8bd7a]/10",
    imageBackground: "bg-[#11100e]",
    action:
        "inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-5 text-sm font-medium text-stone-100 transition duration-200 hover:border-[#d8bd7a]/55 hover:bg-[#d8bd7a]/10 hover:text-[#f2d78f]",
    actionDisabled:
        "cursor-not-allowed opacity-45 hover:border-white/12 hover:bg-white/[0.035] hover:text-stone-100",
    focusRing:
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8bd7a]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080706]",
};

function Elearning() {
    return (
        <ProjectStoryShowcase
            header={Header}
            features={features}
            projectLinks={projectLinks}
            theme={elearningTheme}
            layout="left"
            priorityFirstImage
        />
    );
}

export default Elearning;
