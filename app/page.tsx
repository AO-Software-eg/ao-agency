"use client";
import Hero from "../components/sections/Hero";
import InfoCard from "../components/sections/InfoCard";
import { Features } from "@/components/sections/Features";
import Projects from "@/components/projects/Projects";
import Contact from "../components/sections/Contact";
import OurProjects from "@/components/sections/OurProjects";
import TechStack from "@/components/sections/TechStack";
export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-10" >
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
