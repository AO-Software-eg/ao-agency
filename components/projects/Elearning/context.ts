const projectLinks = {
    github: "https://github.com/AO-Software-eg/manasa",
    liveDemo: "https://alsultan-landingpagee.vercel.app/",
} as const;

const Header = {
    projectName: "منصة السلطان",
    projectType: "E-learning Platform",
    projectNumber: "01",
    projectDescription:
        "A focused learning platform that connects student progress, structured exams, and performance insights in one continuous academic experience.",
    projectTechStack: "NEXT.JS · TYPESCRIPT · POSTGRESQL · EXPRESS.JS",
} 


const features = [
    {
        number: "01",
        eyebrow: "Understand your progress",
        title: "Know exactly where you stand",
        stage: 3,
        description:
            "Track your academic progress and understand which areas need more attention.",
        bullets: [
            "Track your learning progress",
            "Understand your performance",
            "Identify areas that need improvement",
        ],
        image:
            "https://ty574q8ip7.ufs.sh/f/E45AsRPZALlHdc9sFMBDJi72Vcpg91X4WUyeaulEsATCfbxS",
        alt: "Student dashboard showing class schedule, progress, and learning statistics",
    },
    {
        number: "02",
        eyebrow: "Test your knowledge",
        title: "Test yourself with real exams",
        stage: 3,
        description:
            "Take structured exams designed to measure your understanding, not just your ability to memorize.",
        bullets: [
            "Timed examination experience",
            "Track your answers while testing",
            "Review your performance",
        ],
        image:
            "https://ty574q8ip7.ufs.sh/f/E45AsRPZALlHMZ9eWBjfRDOmZTzarUuNBLF5cwC7isIlqe36",
        alt: "Quiz interface showing timed questions and answer options",
    },
    {
        number: "03",
        eyebrow: "Turn results into progress",
        title: "Your grades tell a story",
        stage: 3,
        description:
            "See how your performance changes over time and discover exactly where you can improve.",
        bullets: [
            "Keep track of your exam results",
            "See your progress over time",
            "Identify your weakest areas",
        ],
        image:
            "https://ty574q8ip7.ufs.sh/f/E45AsRPZALlHUjr6ChvYwWeSiKVqNhsr8yvpBd5J9EUnAGTu",
        alt: "Grades screen showing exam results and performance details",
    },
] as const;

export { projectLinks, Header, features };