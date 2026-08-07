import type { ProjectStory } from "@/types/projects";
import Experience from "./Experience";
import Details from "./Details";
import { win8Theme } from "./theme";

const story: ProjectStory = {
    id: "win8",
    slug: "win8-chip8",
    windowTitle: "Win-8 Emulator",
    title: "Win-8 CHIP-8",
    subtitle: "Retro Emulator",
    description:
        "Cycle-accurate CHIP-8 / S-CHIP emulator with disassembler, memory debugger, savestates, curated ROM library, and CRT post-processing shaders.",
    technologies: ["TypeScript", "Canvas API", "Web Audio", "Motion"],
    features: [
        "Cycle Accurate",
        "Disassembler",
        "ROM Library",
        "Savestates",
        "CRT Shaders",
    ],
    theme: win8Theme,
    Experience,
    Details,
    ctas: [
        {
            label: "Try it Live",
            href: "#",
            variant: "primary",
        },
        {
            label: "Source Code",
            href: "#",
            variant: "secondary",
        },
    ],
};

export default story;
