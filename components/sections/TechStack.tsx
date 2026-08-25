"use client";

import React from "react";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiC,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiShadcnui,
  SiExpress,
  SiNestjs,
  SiDotnet,
  SiTrpc,
  SiPostgresql,
  SiDrizzle,
  SiZod,
  SiNpm,
  SiPnpm,
  SiAxios,
  SiScalar,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { fadeUpBlur } from "../ui/motion/variants";

type Technology = {
  name: string;
  icon: IconType;
  brandColor: string;
  category?: string;
};

const technologies: Technology[] = [
  {
    name: "TypeScript",
    icon: SiTypescript,
    brandColor: "#3178C6",
    category: "Languages",
  },
  { name: "React", icon: SiReact, brandColor: "#61DAFB", category: "Frontend" },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    brandColor: "#4169E1",
    category: "Database",
  },
  {
    name: "C++",
    icon: SiCplusplus,
    brandColor: "#00599C",
    category: "Languages",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    brandColor: "#FFFFFF",
    category: "Frontend",
  },

  {
    name: "Express.js",
    icon: SiExpress,
    brandColor: "#EEEEEE",
    category: "Backend",
  },
  {
    name: "Drizzle ORM",
    icon: SiDrizzle,
    brandColor: "#C5F74F",
    category: "Database",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    brandColor: "#F7DF1E",
    category: "Languages",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    brandColor: "#06B6D4",
    category: "Frontend",
  },
  {
    name: "NestJS",
    icon: SiNestjs,
    brandColor: "#E0234E",
    category: "Backend",
  },

  { name: "npm", icon: SiNpm, brandColor: "#CB3837", category: "Tools" },
  {
    name: "ASP.NET",
    icon: SiDotnet,
    brandColor: "#512BD4",
    category: "Backend",
  },
  {
    name: "shadcn/ui",
    icon: SiShadcnui,
    brandColor: "#FAFAFA",
    category: "Frontend",
  },
  { name: "tRPC", icon: SiTrpc, brandColor: "#2596BE", category: "Backend" },
  { name: "pnpm", icon: SiPnpm, brandColor: "#F9AD00", category: "Tools" },

  {
    name: "C#",
    icon: TbBrandCSharp,
    brandColor: "#68217A",
    category: "Languages",
  },
  { name: "Zod", icon: SiZod, brandColor: "#3E67B1", category: "Database" },
  { name: "Axios", icon: SiAxios, brandColor: "#5A29E4", category: "Tools" },
  { name: "C", icon: SiC, brandColor: "#A8B9CC", category: "Languages" },
  {
    name: "Scalar API",
    icon: SiScalar,
    brandColor: "#E24FB1",
    category: "Tools",
  },
];

const cellStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.05,
    },
  },
};

const cellRise = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function TechStack() {
  return (
    <section className="relative py-32">
      <div className="w-[90%] sm:w-[85%] lg:w-[85%] mx-auto my-10 flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
        {/* Left content */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={cellStagger}
          className="lg:w-[28%] shrink-0"
        >
          <motion.h2
            variants={fadeUpBlur}
            className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05]"
          >
            {"{"}What We
            <br />
            <span className="text-primary">Use</span>{"}"}
          </motion.h2>
          <motion.p
            variants={fadeUpBlur}
            className="mt-6 text-sm text-foreground-muted max-w-xs"
          >
            The technologies and tools behind every product we ship.
          </motion.p>
        </motion.div>

        {/* Technology grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={cellStagger}
          className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-border/40 border border-border/40 rounded-xl overflow-hidden"
        >
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                variants={cellRise}
                className="bg-background-secondary"
              >
                <div
                  className="group relative flex aspect-square items-center justify-center outline-none transition-colors duration-300 hover:bg-background-tertiary focus-visible:bg-background-tertiary"
                  style={{ "--brand": tech.brandColor } as React.CSSProperties}
                  tabIndex={0}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Icon
                      aria-hidden="true"
                      className="size-8 sm:size-9 text-foreground-muted opacity-50 grayscale
                                 transition-all duration-300 ease-out will-change-transform
                                 group-hover:text-(--brand) group-hover:opacity-100 group-hover:grayscale-0
                                 group-hover:scale-105 group-hover:[filter:drop-shadow(0_0_10px_color-mix(in_oklab,var(--brand)_45%,transparent))]
                                 group-focus-visible:text-(--brand) group-focus-visible:opacity-100 group-focus-visible:grayscale-0
                                 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <span
                      className="text-[11px] sm:text-xs text-foreground-muted/60 transition-colors duration-300
                                 group-hover:text-foreground group-focus-visible:text-foreground
                                 motion-reduce:transition-none"
                    >
                      {tech.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default TechStack;
