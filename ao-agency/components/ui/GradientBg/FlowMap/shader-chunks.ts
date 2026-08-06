/**
 * shader-chunks.ts
 *
 * Reusable GLSL fragments. Each export is a standalone block of functions
 * that the fragment shader concatenates together. Splitting them up keeps
 * any single piece of shader math readable and independently tweakable,
 * instead of one unreadable 200-line `void main()`.
 *
 * All chunks target GLSL ES 1.00 (WebGL1) for the broadest compatibility,
 * matching what OGL's default Renderer produces.
 */

/** Cheap 2D → 1D hash used as the entropy source for value noise and grain. */
export const hashChunk = /* glsl */ `
  float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }
`;

/** Smooth value noise (Perlin-style interpolation over a hashed lattice). */
export const noiseChunk = /* glsl */ `
  float valueNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
`;

/**
 * Fractal Brownian Motion: 6 octaves of value noise, each rotated slightly
 * and stacked at decreasing amplitude / increasing frequency. This is what
 * turns flat lattice noise into believable organic cloud-like shapes.
 */
export const fbmChunk = /* glsl */ `
  float fbm(vec2 p) {
    float sum = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    // Rotating each octave avoids axis-aligned grid artifacts.
    mat2 octaveRotation = mat2(0.80, 0.60, -0.60, 0.80);

    for (int i = 0; i < 6; i++) {
      sum += amplitude * valueNoise(p * frequency);
      p = octaveRotation * p;
      frequency *= 2.02;
      amplitude *= 0.5;
    }

    return sum;
  }
`;

/**
 * Domain warping: feeds FBM back into itself twice, offsetting the sampling
 * coordinates by the previous layer's output. This is the single biggest
 * contributor to the "organic, premium" look — it breaks up the regularity
 * that plain layered noise always has.
 */
export const domainWarpChunk = /* glsl */ `
  float domainWarpedField(vec2 p, float time) {
    vec2 warpA = vec2(
      fbm(p + vec2(0.0, 0.0) + time * 0.02),
      fbm(p + vec2(5.2, 1.3) - time * 0.015)
    );

    vec2 warpB = vec2(
      fbm(p + 4.0 * warpA + vec2(1.7, 9.2) + time * 0.01),
      fbm(p + 4.0 * warpA + vec2(8.3, 2.8) - time * 0.01)
    );

    return fbm(p + 4.0 * warpB);
  }
`;

/**
 * Cheap single-pass "bloom": rather than a real blur pass, brightness is
 * pushed through a steep power curve so intense regions spread their
 * contribution smoothly into their surroundings via the mask itself.
 * This intentionally has no hard falloff, which reads as a soft glow.
 */
export const bloomChunk = /* glsl */ `
  float bloomFromIntensity(float value, float strength) {
    float boosted = clamp(value, 0.0, 1.0);
    return pow(boosted, 1.6) * strength;
  }
`;

/** Soft radial vignette — darkens corners without a hard-edged circle. */
export const vignetteChunk = /* glsl */ `
  float vignetteMask(vec2 uv, float strength) {
    float dist = distance(uv, vec2(0.5));
    float vig = smoothstep(0.85, 0.25, dist);
    return mix(1.0 - strength * 0.65, 1.0, vig);
  }
`;

/** Per-pixel, per-frame procedural film grain. Cheap and dependency-free. */
export const grainChunk = /* glsl */ `
  float filmGrain(vec2 fragCoord, float time) {
    return hash21(fragCoord + fract(time) * 137.0) - 0.5;
  }
`;

/** All chunks concatenated in dependency order (hash → noise → fbm → warp → fx). */
export const sharedShaderChunks = [
  hashChunk,
  noiseChunk,
  fbmChunk,
  domainWarpChunk,
  bloomChunk,
  vignetteChunk,
  grainChunk,
].join("\n");