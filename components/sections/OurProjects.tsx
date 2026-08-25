import React from 'react'
import { motion } from 'framer-motion'
import { fadeUpBlur, staggerContainer } from '../ui/motion/variants';
import projects from '@/app/data/projects';
import ProjectsCard from '../ui/projectsCard';

function OurProjects() {
  return (
    <section className="relative overflow-hidden py-32">
  {/* Left brace */}
  <span
    aria-hidden="true"
    className="pointer-events-none absolute left-[2%] top-1/2 -translate-y-1/2
               font-mono text-[25rem] font-extralight leading-none
               text-foreground/10"
  >
    {"{"}
  </span>

  {/* Right brace */}
  <span
    aria-hidden="true"
    className="pointer-events-none absolute right-[2%] top-1/2 -translate-y-1/2
               font-mono text-[25rem] font-extralight leading-none
               text-foreground/10"
  >
    {"}"}
  </span>
    <motion.div
      className='w-[90%] sm:w-[85%] lg:w-[75%] mx-auto my-10 py-10 rounded-xl flex flex-col overflow-hidden bg-background light:bg-white gap-4'
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      <motion.p variants={fadeUpBlur} className='text-4xl mb-5'> {"{ Our Projects.. }"} </motion.p>

      {/* grid */}
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <motion.div key={project.title ?? index} variants={fadeUpBlur}>
            <ProjectsCard {...project} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
    </section>
  )
}

export default OurProjects
