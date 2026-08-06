"use client";

import CtaBtn from '../ui/CtaBtn'
import Button from '../ui/Button'
import Nav from '../layout/Nav'
import BackGround from '../ui/GradientBg/FlowMap/BackGround';



function Hero() {
  return (
    <div
      className="relative w-[90%] sm:w-[85%] lg:w-[95%] mx-auto my-10 min-h-[90vh] lg:h-[95vh] rounded-xl flex flex-col overflow-hidden bg-background light:bg-white"

    >

    <BackGround />

      <div
        className='relative w-[90%] sm:w-[85%] lg:w-[95%] mx-auto my-10 min-h-[90vh] rounded-xl flex flex-col z-3'

      >
        {/* text content */}
        <Nav />
        <div className='w-full flex-1 flex items-center justify-center py-30 md:py-25 sm:py-10'>
          <div className='w-full text-center px-4 sm:p-4 rounded-xl flex flex-col gap-4'>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight">
              From idea to{" "}
             <span className='text-primary'>production.</span>
            </h1>

            <p className='text-foreground text-base sm:text-lg md:text-xl font-thin px-2'>
              AO - We design and build modern web platforms, SaaS products, and enterprise applications that are fast, scalable.
            </p>
            <div className='flex flex-wrap gap-4 justify-center mt-4'>
              <CtaBtn />
              <Button text="github" primary={false} />
            </div>
            <p className='group text-foreground text-sm font-thin mt-4 cursor-pointer hover:text-primary transition-all duration-200 hover:underline text-balance text-center'>
              see our work <span className='inline-block group-hover:translate-x-5 group-hover:scale-95 transition-all duration-200'>{'-->'}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero



