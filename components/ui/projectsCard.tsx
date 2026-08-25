"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "./card";
import Link from "next/link";
import { projectsCardProps } from "@/app/data/projects";

function ProjectsCard({ title, description, imageUrl, link }: projectsCardProps) {
  return (
    <Link href={link} target="_blank" rel="noopener noreferrer" className="w-full">
    <Card className="group relative bg-background border border-foreground/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
      <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
        <Image
          src={imageUrl}
          alt={title || "Project image"}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-medium tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-foreground/60 font-thin text-sm truncate">
          {description}
        </p>

        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className=" inline-flex items-center gap-1 text-sm font-thin text-foreground/80 mt-2 w-fit cursor-pointer transition-all duration-200 group-hover:text-primary group-hover:underline"
        >
          view project
          <span className="inline-block transition-all duration-200 group-hover:translate-x-1">
            {"-->"}
          </span>
        </Link>
      </div>
    </Card>
    </Link>
  );
}

export default ProjectsCard;