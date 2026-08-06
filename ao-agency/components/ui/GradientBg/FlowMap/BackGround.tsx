import FlowmapBackground from "@/components/ui/FlowMap/FlowMapBg";
import Grainient from '../../ui/Grainent';

function BackGround() {
  return (
 

      <><FlowmapBackground
          className='z-2'
          intensity={0.35}
          bloomIntensity={0.8}
          vignette={0.45}
          grainAmount={0.03}
          idleSpeed={0.06} /><div className='w-full h-full absolute top-0 left-0 flex items-center justify-center overflow-hidden z-1 opacity-70'>
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
                  zoom={0.9} />
          </div></>

  )
}

export default BackGround