/**
 * utils.ts
 *
 * Small, dependency-free helpers used by the flowmap component.
 * Nothing here touches the DOM or WebGL directly except the DPR getter,
 * which just reads a browser global defensively.
 */

import type { RgbColor } from "./types";

/** Clamp a number between min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Linear interpolation between a and b by t (0–1). */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Convert a "#RRGGBB" (or "#RGB") hex string into normalized [0–1] RGB floats
 * suitable for a GLSL uniform. Falls back to black on malformed input rather
 * than throwing, so a typo in a color prop never crashes the scene.
 */
export function hexToRgb(hex: string): RgbColor {
  let normalized = hex.trim().replace("#", "");

  if (normalized.length === 3) {
    normalized = normalized
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (normalized.length !== 6) {
    return [0, 0, 0];
  }

  const intVal = parseInt(normalized, 16);
  if (Number.isNaN(intVal)) {
    return [0, 0, 0];
  }

  const r = ((intVal >> 16) & 255) / 255;
  const g = ((intVal >> 8) & 255) / 255;
  const b = (intVal & 255) / 255;

  return [r, g, b];
}

/** Device pixel ratio, capped so retina displays don't tank performance. */
export function getSafeDpr(container: HTMLDivElement): number {
  if (typeof window === "undefined") return 1;

  const rect = container.getBoundingClientRect();
  const w = Math.max(1, rect.width);
  const h = Math.max(1, rect.height);
  const screenDPR = window.devicePixelRatio || 1;
  const maxDPR = 320 / w;

  return Math.min(screenDPR, maxDPR);
}

/**
 * Returns true when the user has requested reduced motion at the OS level.
 * The component uses this to fall back to a static, non-animated frame.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Reads the pointer position from either a mouse or a single-touch event. */
export function getPointerClientPosition(
  event: MouseEvent | TouchEvent,
): { x: number; y: number } | null {
  if ("changedTouches" in event) {
    const touch = event.changedTouches[0];
    if (!touch) return null;
    return { x: touch.clientX, y: touch.clientY };
  }
  return { x: event.clientX, y: event.clientY };
}
