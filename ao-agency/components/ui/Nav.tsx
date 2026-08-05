"use client";

import { useState, useEffect, type ComponentType, type SVGProps } from "react";
import ThemeToggle from './ThemeToggle'
import Link from "next/link";
import { GithubIcon } from './github'
import { Menu, X } from 'lucide-react'
import {
  FaInstagram,
  FaTiktok,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

type SocialIcon = IconType | ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

type SocialLink = {
  href: string;
  label: string;
  Icon: SocialIcon;
};

const SOCIAL: SocialLink[] = [
  { href: "#", label: "GitHub", Icon: GithubIcon as unknown as SocialIcon },
  { href: "#", label: "LinkedIn", Icon: FaLinkedin },
  { href: "#", label: "X / Twitter", Icon: FaXTwitter },
  { href: "#", label: "Instagram", Icon: FaInstagram },
  { href: "#", label: "TikTok", Icon: FaTiktok },
];

const socialBtnBase =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground-secondary transition-all duration-200 hover:border-primary hover:text-primary hover:shadow-[0_0_0_3px_var(--ring)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95";

function SocialButton({ href, label, Icon }: SocialLink & { style?: React.CSSProperties }) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target="_blank"
      rel="noreferrer"
      className={socialBtnBase}
    >
      <Icon size={18} />
    </a>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="absolute top-0 z-50 backdrop-blur-lg border-b border-border/60 w-[80%] mx-auto right-0 left-0 mt-[3vh] rounded-2xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              <span className="text-foreground text-xl font-semibold uppercase">ao</span>{'   '}
            </span>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground-secondary transition-all hover:border-primary hover:text-primary hover:shadow-[0_0_0_3px_var(--ring)]"
          >
            <Menu size={24} fill="currentColor" stroke="currentColor" strokeWidth={2} />
          </button>

          <nav className="hidden lg:flex items-center gap-8 text-sm text-foreground-secondary">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2.5 ">
            <div className="flex items-center gap-2 pr-2 mr-1 border-r border-border/70">
              {SOCIAL.map((s) => (
                <SocialButton key={s.label} {...s} />
              ))}
            </div>
          
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div
        className={[
          "fixed inset-0 z-60 flex flex-col transition-all duration-300",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
        style={{
          background:
            "linear-gradient(160deg, var(--background) 0%, var(--background-secondary) 100%)",
          backdropFilter: "blur(20px)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="w-[80%] mx-auto px-6 h-16 flex items-center justify-between">
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            <span className="text-foreground font-semibold uppercase">ao</span>{'   '}
            <span className="font-thin text-sm"> -agency</span>
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground-secondary transition-all hover:border-primary hover:text-primary hover:shadow-[0_0_0_3px_var(--ring)]"
          >
            <X size={24} fill="currentColor" stroke="currentColor" strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 w-[80%] mx-auto flex flex-col items-center justify-center gap-10 py-8">
          <nav className="flex flex-col items-center gap-6">
            {LINKS.map((l, idx) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={[
                  "group relative text-4xl md:text-6xl font-semibold tracking-tight",
                  "text-foreground-secondary transition-colors duration-300 hover:text-foreground",
                ].join(" ")}
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(16px)",
                  transitionProperty: "opacity, transform, color",
                  transitionDuration: "400ms, 400ms, 300ms",
                  transitionTimingFunction: "ease, ease, ease",
                  transitionDelay: open
                    ? `${idx * 60 + 80}ms, ${idx * 60 + 80}ms, 0ms`
                    : "0ms, 0ms, 0ms",
                }}
              >
                <span
                  className="absolute inset-0 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundImage: "var(--gradient-primary)" }}
                >
                  {l.label}
                </span>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="w-[80%] mx-auto px-6 pb-12 pt-4 flex flex-col items-center gap-6 border-t border-border/60">
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4 text-sm text-foreground-muted">
              <span>Appearance</span>
              <ThemeToggle />
            </div>
    
          </div>

          <div className="w-full flex flex-col items-center gap-3 pt-2">
            <p className="text-xs uppercase tracking-[0.18em] text-foreground-disabled">
              Follow us
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL.map((s, idx) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  title={s.label}
                  target="_blank"
                  rel="noreferrer"
                  className={socialBtnBase}
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(10px)",
                    transitionProperty: "opacity, transform, all",
                    transitionDuration: "400ms, 400ms, 200ms",
                    transitionDelay: open
                      ? `${idx * 50 + 260}ms, ${idx * 50 + 260}ms, 0ms`
                      : "0ms, 0ms, 0ms",
                  }}
                >
                  <s.Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
