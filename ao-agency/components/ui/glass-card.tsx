"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = React.ComponentProps<"div"> & {
  size?: "default" | "sm";
  asChild?: boolean;
};

function GlassCard({
  className,
  size = "default",
  ...props
}: GlassCardProps) {
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const target = React.useRef({ x: 50, y: 50, opacity: 0 });
  const current = React.useRef({ x: 50, y: 50, opacity: 0 });

  const applyVars = React.useCallback((el: HTMLElement) => {
    el.style.setProperty("--spot-x", `${current.current.x}%`);
    el.style.setProperty("--spot-y", `${current.current.y}%`);
    el.style.setProperty("--border-x", `${current.current.x}%`);
    el.style.setProperty("--border-y", `${current.current.y}%`);
  }, []);

  React.useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const rect = () => el.getBoundingClientRect();

    const setTargetFromEvent = (clientX: number, clientY: number) => {
      const r = rect();
      const x = ((clientX - r.left) / r.width) * 100;
      const y = ((clientY - r.top) / r.height) * 100;
      target.current.x = Math.min(100, Math.max(0, x));
      target.current.y = Math.min(100, Math.max(0, y));
      target.current.opacity = 1;
    };

    const onMove = (e: MouseEvent) => setTargetFromEvent(e.clientX, e.clientY);

    const onLeave = () => {
      target.current.opacity = 0;
    };

    const onEnter = (e: MouseEvent) => {
      const r = rect();
      current.current.x = ((e.clientX - r.left) / r.width) * 100;
      current.current.y = ((e.clientY - r.top) / r.height) * 100;
      target.current.opacity = 1;
      applyVars(el);
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setTargetFromEvent(t.clientX, t.clientY);
    };

    const loop = () => {
      const easing = 0.14;
      current.current.x += (target.current.x - current.current.x) * easing;
      current.current.y += (target.current.y - current.current.y) * easing;
      current.current.opacity +=
        (target.current.opacity - current.current.opacity) * easing;
      applyVars(el);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onLeave);
    };
  }, [applyVars]);

  return (
    <div
      ref={cardRef}
      data-slot="card"
      data-size={size}
      className={cn(
        "glass-card group/card relative flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl",
        "bg-white/55 dark:bg-[#101012]/52",
        "border border-[rgba(228,228,231,0.65)] dark:border-[rgba(63,63,70,0.45)]",
        "ring-0 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_1px_1px_rgba(0,0,0,0.03)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4)]",
        "text-card-foreground",
        "py-(--card-spacing) text-sm",
        "[--card-spacing:--spacing(4)]",
        "opacity-70 hover:opacity-100",
        "has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0",
        "data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0",
        "*:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        "transition-[transform,box-shadow,backdrop-filter,background-color,border-color] duration-300 ease-out will-change-transform",
        "hover:-translate-y-0.5",
        "hover:border-[rgba(212,212,216,0.85)] dark:hover:border-[rgba(82,82,91,0.7)]",
        "hover:bg-white/68 dark:hover:bg-[#151518]/68",
        "hover:shadow-[0_8px_24px_-10px_rgba(0,0,0,0.25),0_2px_6px_-2px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.55),0_2px_6px_-2px_rgba(0,0,0,0.35)]",
        className
      )}
      {...props}
    >
      <div
        aria-hidden
        className="glass-card__spotlight rounded-xl"
      />
      <div aria-hidden className="glass-card__border-glow" />
      {props.children}
    </div>
  );
}

export { GlassCard };
