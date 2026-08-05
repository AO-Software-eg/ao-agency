"use client";

import CtaBtn from '../ui/CtaBtn'
import Button from '../ui/Button'
import Nav from '../ui/Nav'
import FlowmapBackground from "@/components/ui/FlowMap/FlowMapBg";
import Grainient from '../ui/Grainent';


function Hero() {
  return (
    <div
      className="relative w-[90%] sm:w-[85%] lg:w-[95%] mx-auto my-[2vh] min-h-[90vh] lg:h-[95vh] rounded-xl flex flex-col overflow-hidden bg-background light:bg-white"

    >



      <FlowmapBackground
        className='z-2'
        intensity={0.35}
        bloomIntensity={0.8}
        vignette={0.45}
        grainAmount={0.03}
        idleSpeed={0.06}
      />


      <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center overflow-hidden z-1 opacity-70'>
        <Grainient
          color1="var(--neon)"
          color2="var(--primary)"
          color3="var(--primary-dark)"
          timeSpeed={1.5}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>
      <div
        className='relative w-[90%] sm:w-[85%] lg:w-[95%] mx-auto my-[2vh] min-h-[90vh] rounded-xl flex flex-col z-3'

      >
        {/* text content */}
        <Nav />
        <div className='w-full flex-1 flex items-center justify-center py-25 sm:py-10'>
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



