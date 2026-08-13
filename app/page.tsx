"use client";
import Hero from "../components/sections/Hero";
import InfoCard from "../components/sections/InfoCard";
import { Features } from "@/components/sections/Features";
import Elearning from "@/components/projects/Elearning/Elearning";
import Contact from "../components/sections/Contact";
import OurProjects from "@/components/sections/OurProjects";
export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-10" >
      <Hero />
      <InfoCard />
      <Features />
      <Elearning />
      <OurProjects />


      
      <Contact />

    </div>
  );
}
