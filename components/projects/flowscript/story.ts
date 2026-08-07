import type { ProjectStory } from "@/types/projects";
import Experience from "./Experience";
import Details from "./Details";
import { flowScriptTheme } from "./theme";

const story: ProjectStory = {
    id: "flowscript",
    slug: "flowscript",
    windowTitle: "FlowScript Terminal",
    title: "FlowScript",
    subtitle: "Programming Language",
    description:
        "A type-safe systems language with zero-cost abstractions, pattern matching, and native + WASM backends.",
    technologies: ["Rust", "LLVM", "TypeScript", "WASM"],
    features: [
        "Memory Safety",
        "Pattern Match",
        "Async Runtime",
        "Package Manager",
        "WASM Backend",
    ],
    theme: flowScriptTheme,
    Experience,
    Details,
    ctas: [
        {
            label: "View Docs",
            href: "#",
            variant: "primary",
        },
        {
            label: "GitHub",
            href: "#",
            variant: "secondary",
        },
    ],
};

export default story;
