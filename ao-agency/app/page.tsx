import Hero from "../components/sections/Hero";
import InfoCard from "../components/sections/InfoCard";
import Contact from "../components/sections/Contact";
import { Features } from "@/components/sections/Features";
import ProjectsGrid from "@/components/sections/ProjectsGrid";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-10" >
      <Hero />
      <InfoCard />
      <Features />
      <ProjectsGrid />
    </div>
  );
}
