"use client";

import dynamic from "next/dynamic";

import Hero from "../components/sections/Hero";
import Philosophy from "../components/sections/Philosophy";
import Contact from "../components/sections/Contact";
import TechStack from "@/components/sections/TechStack";

const Projects = dynamic(() => import("@/components/projects/Projects"));
const OurProjects = dynamic(() => import("@/components/sections/OurProjects"));

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-10">
      <Hero />
      <Philosophy />
      <Projects />
      <OurProjects />
      <TechStack />

      <Contact />
    </div>
  );
}
