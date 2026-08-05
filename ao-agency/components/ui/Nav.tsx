import ThemeToggle from './ThemeToggle'

function Nav() {
  return (

    <header className="absolute top-0 z-50 backdrop-blur-xl border-b border-border/60 w-[80%] mx-auto right-0 left-0 mt-[3vh] rounded-2xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="  bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            <span className="text-foreground font-semibold uppercase">ao</span>{'   '}
            <span className="font-thin text-sm  "> -agency</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-foreground-secondary">
          <a href="#services" className="hover:text-foreground transition-colors">Services</a>
          <a href="#work" className="hover:text-foreground transition-colors">Work</a>
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            className="hidden sm:inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-primary border border-primary/40 hover:border-primary hover:shadow-[0_0_0_3px_var(--ring)] transition-all"
          >
            Sign in
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Nav