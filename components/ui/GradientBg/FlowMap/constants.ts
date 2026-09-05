/**
 * constants.ts
 *
 * Default values for every configurable prop, plus the default palette.
 * Centralized here so there are no magic numbers scattered through the
 * component or shader-assembly code.
 */

import type { FlowmapPalette } from "./types";

export const DEFAULT_PALETTE: FlowmapPalette = {
  background: "#3e8530",
  surface: "#639772",
  accent1: "var(--neon)",
  accent2: "var(--primary)",
  accent3: "var(--primary-dark)",
  accent4: "var(--primary-light)",
};

export const DEFAULT_PROPS = {
  intensity: 0.35,
  dissipation: 0.965,
  falloff: 0.28,
  blend: 0.4,
  speed: 0,
  idleSpeed: 0.06,
  bloomIntensity: 0.8,
  vignette: 0.45,
  grainAmount: 0.035,
} as const;

/** Flowmap resolution — a small offscreen target is plenty for a soft trail. */
export const FLOWMAP_SIZE = 512;

/** Cap on device pixel ratio to keep retina displays from tanking frame time. */
export const MAX_DPR = 2;

/**
 * How much the raw pointer velocity is smoothed each frame before being
 * written into the flowmap. Higher = softer, more elegant trail;
 * lower = snappier, more literal cursor tracking.
 */
export const VELOCITY_SMOOTHING = 0.12;

/** Minimum ms between velocity samples, avoids division blow-ups on fast events. */
export const MIN_FRAME_DELTA_MS = 8;
