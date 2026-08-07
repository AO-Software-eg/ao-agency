/**
 * types.ts
 *
 * Shared type definitions for the FlowmapBackground component.
 * Kept isolated so shader helpers, utils, and the component can all
 * import from one place without circular dependencies.
 */

/** A color expressed as normalized [r, g, b] floats in the 0–1 range. */
export type RgbColor = [number, number, number];

/** The hex-string palette the component accepts from consumers. */
export interface FlowmapPalette {
  /** Base page background. Almost the entire canvas rests here. */
  background: string;
  /** Slightly lighter surface tone used for large ambient shapes. */
  surface: string;
  /** Primary accent — the color interaction leans on the most. */
  accent1: string;
  /** Secondary accent — mixed in for mid-frequency detail. */
  accent2: string;
  /** Tertiary accent — reserved for fine detail / highlights. */
  accent3: string;
  /** Bloom accent — used only for the soft glow around the cursor. */
  accent4: string;
}

/** Public configuration surface for <FlowmapBackground />. */
export interface FlowmapBackgroundProps {
  /** Extra classes applied to the wrapping container (e.g. for rounding/clipping). */
  className?: string;

  /**
   * How strongly cursor movement distorts the underlying noise field.
   * 0 disables distortion entirely. Typical range: 0.1–1.
   * @default 0.35
   */
  intensity?: number;

  /**
   * How quickly the flowmap trail fades after the cursor stops moving.
   * Closer to 1 = long, slow fade. Closer to 0 = snaps back instantly.
   * @default 0.965
   */
  dissipation?: number;

  /**
   * Radius (in flowmap-space) of the soft cursor glow footprint.
   * Typical range: 0.1–0.5.
   * @default 0.28
   */
  falloff?: number;

  /**
   * Opacity applied when writing new cursor velocity into the flowmap.
   * Lower values make the trail feel softer / less immediate.
   * @default 0.4
   */
  blend?: number;

  /**
   * Global animation speed multiplier for the idle drift.
   * @default 1
   */
  speed?: number;

  /**
   * Speed of the slow, ambient idle motion when the cursor is inactive.
   * Kept intentionally tiny — the scene should feel almost static.
   * @default 0.06
   */
  idleSpeed?: number;

  /**
   * Strength of the fake (shader-side) bloom around bright / active regions.
   * @default 0.8
   */
  bloomIntensity?: number;

  /**
   * Strength of the corner vignette. 0 disables it.
   * @default 0.45
   */
  vignette?: number;

  /**
   * Strength of the procedural film grain overlay. Keep very low.
   * @default 0.035
   */
  grainAmount?: number;

  /** Partial color overrides merged on top of the default palette. */
  colors?: Partial<FlowmapPalette>;
}

/** Resolved numeric uniforms passed into the GL program every frame. */
export interface FlowmapUniformValues {
  uTime: number;
  uResolution: [number, number];
  uIntensity: number;
  uBloomIntensity: number;
  uVignette: number;
  uGrainAmount: number;
  uIdleSpeed: number;
  uColorBackground: RgbColor;
  uColorSurface: RgbColor;
  uColorAccent1: RgbColor;
  uColorAccent2: RgbColor;
  uColorAccent3: RgbColor;
  uColorAccent4: RgbColor;
}