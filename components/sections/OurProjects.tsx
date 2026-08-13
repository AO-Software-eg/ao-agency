import React from 'react'
import {motion} from 'framer-motion'
import { fadeUpBlur, staggerContainer } from '../ui/motion/variants';

function OurProjects() {
  return (
          <motion.div
            className='w-[90%] sm:w-[85%] lg:w-[75%] mx-auto my-10 py-10 rounded-xl flex flex-col overflow-hidden bg-background light:bg-white gap-4'
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
        >
            <motion.p variants={fadeUpBlur}> {"{ Our Projects.. }"} </motion.p>
     
        </motion.div>
  )
}

export default OurProjects
