/**
 * shaders.ts
 *
 * Assembles the final vertex and fragment shader source strings from the
 * reusable chunks in shader-chunks.ts. Keeping assembly here (rather than
 * inline in the component) means the shader can be unit-visualized or
 * swapped independently of the React/OGL wiring.
 */

import { sharedShaderChunks } from "./shader-chunks";

export const vertexShader = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;
  precision highp int;

  uniform sampler2D tFlow;
  uniform float uTime;
  uniform vec2 uResolution;

  uniform float uIntensity;
  uniform float uBloomIntensity;
  uniform float uVignette;
  uniform float uGrainAmount;
  uniform float uIdleSpeed;

  uniform vec3 uColorBackground;
  uniform vec3 uColorSurface;
  uniform vec3 uColorAccent1;
  uniform vec3 uColorAccent2;
  uniform vec3 uColorAccent3;
  uniform vec3 uColorAccent4;

  varying vec2 vUv;

  ${sharedShaderChunks}

  void main() {
    // Correct for non-square viewports so noise shapes stay round, not stretched.
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 centeredUv = (vUv - 0.5) * aspect + 0.5;

    vec3 flow = texture2D(tFlow, vUv).rgb;
    float flowSpeed = length(flow.xy);

    float idleTime = uTime * uIdleSpeed;

    // The flowmap only ever nudges sampling coordinates — it never
    // replaces the noise field itself, per the "interaction input only" rule.
    vec2 warpedUv = centeredUv * 1.6 + flow.xy * uIntensity;
    float warpedField = domainWarpedField(warpedUv, idleTime);

    // Three explicit scales: large ambient shapes, mid detail, fine grain.
    float largeShapes = fbm(centeredUv * 0.8 + idleTime * 0.6);
    float mediumShapes = fbm(centeredUv * 2.4 - idleTime * 0.9 + flow.xy * 0.6);
    float fineDetail = fbm(centeredUv * 6.0 + idleTime * 1.4);

    float combinedField =
      warpedField * 0.5 +
      largeShapes * 0.25 +
      mediumShapes * 0.2 +
      fineDetail * 0.05;

    // Base tone: mostly background, with surface tone easing in on raised areas.
    vec3 baseColor = mix(
      uColorBackground,
      uColorSurface,
      smoothstep(0.25, 0.8, combinedField)
    );

    // Subtle radial illumination toward the center of the hero.
    float radialLight = 1.0 - smoothstep(0.0, 0.9, distance(vUv, vec2(0.5)));
    baseColor += uColorSurface * radialLight * 0.05;

    // Accent color only appears where the field is active or the cursor is near —
    // the rest of the frame stays dark, per the "green only on interaction" rule.
    vec3 accentBlend = mix(uColorAccent1, uColorAccent2, smoothstep(0.15, 0.85, mediumShapes));
    accentBlend = mix(accentBlend, uColorAccent3, smoothstep(0.35, 1.0, fineDetail));

    float interactionMask = smoothstep(0.05, 0.65, flowSpeed * 5.0);
    float ambientAccentMask = smoothstep(0.55, 0.95, combinedField) * 0.15;

    vec3 color = baseColor;
    color += accentBlend * (interactionMask * 0.55 + ambientAccentMask);

    // Cursor glow: soft, slow-dissipating bloom rather than a hard streak.
    float glowIntensity = bloomFromIntensity(flowSpeed * 2.2, uBloomIntensity);
    color += uColorAccent4 * glowIntensity;

    // Vignette and grain, applied last so they sit on top of everything.
    color *= vignetteMask(vUv, uVignette);
    color += filmGrain(gl_FragCoord.xy, uTime) * uGrainAmount;

    float alpha = clamp(0.5 + interactionMask * 0.35 + glowIntensity * 0.25, 0.0, 1.0);

    gl_FragColor = vec4(color, alpha);
  }
`;