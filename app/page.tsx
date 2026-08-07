"use client";
import Hero from "../components/sections/Hero";
import InfoCard from "../components/sections/InfoCard";
import { Features } from "@/components/sections/Features";
import { Showcase } from "@/components/showcase/ShowCase";
import { projects } from "@/app/data/projects";
import Contact from "../components/sections/Contact";
export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-10" >
      <Hero />
      <InfoCard />
      <Features />
      <Showcase  projects={projects} />
      <Contact />
    </div>
  );
}
