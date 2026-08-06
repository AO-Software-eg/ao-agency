import { TextHoverEffect } from "./text-hover-effect"

function Footer() {
    return (

            <footer className="border-t border-border bg-background-secondary/60 relative min-h-90 lg:min-h-150 flex items-end justify-center">
                <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground-muted">
                    <p>© {new Date().getFullYear()} ao agency. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                        <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                        <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
                    </div>

               

                </div>
                     <div className="flex items-center justify-center absolute bottom-0 left-0 right-0">
                        <TextHoverEffect text="ao agency"  />

                    </div>
            </footer>
    )
}

export default Footer