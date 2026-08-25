
const projectLinks = {
    github: "https://github.com/AO-Software-eg/alameed",
    liveDemo: "https://alameed.vercel.app/",
} as const;

const Header = {
    projectName: "العَميد",
    projectType: "Product Management System",
    projectNumber: "02",
    projectDescription:
        "A centralized product management system that brings projects, tasks, teams, and product progress together in one organized workspace.",
    projectTechStack: "NEXT.JS · TYPESCRIPT · DRIZZLEORM · ELECTRON.JS",
};

const features = [
    {
        number: "01",
        eyebrow: "Organize your work",
        title: "Keep every project under control",
        stage: 3,
        description:
            "Manage projects, organize tasks, and keep your entire product workflow structured from one centralized workspace.",
        bullets: [
            "Organize projects and tasks",
            "Track work across different stages",
            "Keep product information in one place",
        ],
        image:
            "https://ty574q8ip7.ufs.sh/f/E45AsRPZALlHUjr6ChvYwWeSiKVqNhsr8yvpBd5J9EUnAGTu",
        alt: "Product management dashboard showing projects, tasks, and overall product progress",
    },
    {
        number: "02",
        eyebrow: "Manage your workflow",
        title: "Turn ideas into organized work",
        stage: 3,
        description:
            "Break product work into clear tasks and follow each item from planning to completion.",
        bullets: [
            "Create and assign tasks",
            "Track task status and progress",
            "Keep teams aligned on priorities",
        ],
        image:
            "https://ty574q8ip7.ufs.sh/f/E45AsRPZALlHUjr6ChvYwWeSiKVqNhsr8yvpBd5J9EUnAGTu",
        alt: "Task management interface showing product tasks, statuses, and assignments",
    },
    {
        number: "03",
        eyebrow: "Understand your product",
        title: "See progress at a glance",
        stage: 3,
        description:
            "Turn your product activity into clear insights so you can understand progress, identify bottlenecks, and make better decisions.",
        bullets: [
            "Monitor project progress",
            "Identify bottlenecks and priorities",
            "Understand team and product performance",
        ],
        image:
            "https://ty574q8ip7.ufs.sh/f/E45AsRPZALlHUjr6ChvYwWeSiKVqNhsr8yvpBd5J9EUnAGTu",
        alt: "Product analytics dashboard showing project progress and performance insights",
    },
] as const;

export { projectLinks, Header, features };

