"use client";

import { motion } from "framer-motion";
import { fadeUpBlur, staggerContainer } from '../ui/motion/variants';

function InfoCard() {
    return (
        <motion.div
            className='w-[90%] sm:w-[85%] lg:w-[75%] mx-auto my-10 py-10 rounded-xl flex flex-col overflow-hidden bg-background light:bg-white gap-4'
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
        >
            <motion.p variants={fadeUpBlur}> {"{ What does AO do ? }"} </motion.p>
            <div className='flex flex-row items-start justify-between gap-6 text-left'>
                <motion.h1 variants={fadeUpBlur} className="text-4xl font-bold leading-11">
                    AO designs and builds modern digital products that help businesses launch faster, scale confidently.
                </motion.h1>
                <motion.p variants={fadeUpBlur} className="text-lg font-thin leading-8 text-left w-[150%] lg:w-full">
                    {"{ - From high performance websites and SaaS platforms to AI-powered solutions and custom software, we turn ambitious ideas into reliable, production-ready products. }"}
                </motion.p>
            </div>
        </motion.div>
    )
}

export default InfoCard