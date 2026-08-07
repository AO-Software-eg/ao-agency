import type { ProjectStory } from "@/types/projects";
import { raydebugTheme } from "./theme";
import Experience from "./Experience";
import Details from "./Details";

const story: ProjectStory = {
    id: "raydebug",
    slug: "raydebug",
    windowTitle: "RayDebug Overlay",
    title: "RayDebug",
    subtitle: "Debug Library",
    description:
        "Structured logging + distributed tracing with flamegraphs, PII redaction, and a <3kb zero-dependency runtime.",
    technologies: ["TypeScript", "Node", "WebSocket", "D3"],
    features: [
        "Structured Logs",
        "Distributed Trace",
        "PII Redaction",
        "Flamegraph",
        "<3kb Runtime",
    ],
    theme: raydebugTheme,
    Experience,
    Details,
    ctas: [
        {
            label: "npm i raydebug",
            href: "#",
            variant: "primary",
        },
        {
            label: "Docs",
            href: "#",
            variant: "secondary",
        },
    ],
};

export default story;
