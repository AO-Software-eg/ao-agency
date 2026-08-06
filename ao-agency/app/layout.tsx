import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "./providers/SmoothScroll";
import { ThemeProvider } from "./providers/ThemeProvider";
import Footer from "@/components/layout/Footer";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "ao agency",
  description: "ao agency is a digital marketing agency that helps clients grow their business online.",
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('ao-agency-theme');
    var theme;
    if (stored === 'light' || stored === 'dark') {
      theme = stored;
    } else {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          <SmoothScroll >
            {children}
            <Footer />
        </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
