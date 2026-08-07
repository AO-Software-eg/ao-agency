import type { ProjectStory } from "@/types/projects";
import Experience from "./Experience";
import Details from "./Details";
import { alameedTheme } from "./theme";

const story: ProjectStory = {
    id: "alameed",
    slug: "alameed-inventory",
    windowTitle: "Alameed Inventory",
    title: "Alameed Inventory",
    subtitle: "Enterprise ERP",
    description:
        "Multi-warehouse inventory, demand forecasting, barcode workflows, and full purchase-to-sales order lifecycle for distribution operations.",
    technologies: ["Next.js", "PostgreSQL", "Redis", "Prisma"],
    features: [
        "Real-time Stock",
        "Demand Forecasting",
        "Barcode / RFID",
        "Order Lifecycle",
        "KPI Reports",
    ],
    theme: alameedTheme,
    Experience,
    Details,
    ctas: [
        {
            label: "Case Study",
            href: "#",
            variant: "primary",
        },
        {
            label: "See Features",
            href: "#",
            variant: "secondary",
        },
    ],
};

export default story;
