"use client";

import dynamic from "next/dynamic";

import Hero from "../components/sections/Hero";
import InfoCard from "../components/sections/InfoCard";
import Contact from "../components/sections/Contact";
import TechStack from "@/components/sections/TechStack";

const Features = dynamic(() => import("@/components/sections/Features"));
const Projects = dynamic(() => import("@/components/projects/Projects"));
const OurProjects = dynamic(() => import("@/components/sections/OurProjects"));

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-10">
      <Hero />
      <InfoCard />
      <Features />
      <Projects />
      <OurProjects />
      <TechStack />

      <Contact />
    </div>
  );
}
