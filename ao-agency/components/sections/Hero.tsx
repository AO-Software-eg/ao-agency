import CtaBtn from '../ui/CtaBtn'
import Button from '../ui/Button'
import Nav from '../ui/Nav'



function Hero() {
  return (
    <div className='relative w-[80%] mx-auto  my-[5vh] h-[80vh] rounded-xl' style={{ background: "var(--gradient-hero)" }}>
      {/* text content */}
      <Nav />
      <div className='w-full h-full flex items-center justify-center'>
        <div className='w-[80%] text-center p-2 rounded-xl flex flex-col gap-4'>
          <h1 className='text-foreground-secondary text-4xl font-medium'>
            From idea to production.
          </h1>
          <p className='text-foreground-secondary text-xl font-thin '>
            AO - We design and build modern web platforms, SaaS products, and enterprise applications that are fast, scalable.
          </p>
          <div className='flex gap-4 justify-center mt-4'>
            <CtaBtn />
            <Button text="github" primary={false} />
          </div>
        </div>

      </div>

    </div>
  )
}

export default Hero