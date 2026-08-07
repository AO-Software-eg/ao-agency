import type { ProjectStory } from "@/types/projects";
import Experience from "./Experience";
import Details from "./Details";
import { elearningTheme } from "./theme";

const story: ProjectStory = {
    id: "elearning",
    slug: "elearning-platform",
    windowTitle: "AO Learning Platform",
    title: "AO Learning",
    subtitle: "Education SaaS",
    description:
        "Build modern learning experiences with adaptive video, secure assessments, progress tracking, and powerful analytics.",
    technologies: ["Next.js", "tRPC", "Mux", "Stripe", "PostgreSQL"],
    features: [
        "Adaptive Video",
        "Live Classes",
        "Progress Tracking",
        "Online Exams",
        "Certificates",
    ],
    theme: elearningTheme,
    frame: {
        maxZoom: 0.02,
        maxBrightness: 0.06,
        maxGlowOpacity: 0.4,
    },
    Experience,
    Details,
    ctas: [
        {
            label: "Request Demo",
            href: "#",
            variant: "primary",
        },
        {
            label: "View Catalog",
            href: "#",
            variant: "secondary",
        },
    ],
};

export default story;
