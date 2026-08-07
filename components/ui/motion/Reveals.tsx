// components/ui/motion/Reveal.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

export function Reveal({
  children,
  variants,
  className,
  as = "div",
}: {
  children: ReactNode;
  variants: Variants;
  className?: string;
  as?: "div" | "section";
}) {
  const MotionTag = as === "section" ? motion.section : motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}