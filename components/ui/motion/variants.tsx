// components/ui/motion/variants.ts
import { Variants } from "framer-motion";

// Text: rises up + unblurs
export const fadeUpBlur: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // gentle "expo out" feel
    },
  },
};

// Cards: soft rise + scale, no blur (keeps it calmer/heavier feeling)
export const cardRise: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.97,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Wrap a group of children with this to stagger them
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};