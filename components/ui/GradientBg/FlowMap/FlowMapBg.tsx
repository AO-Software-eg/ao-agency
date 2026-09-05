"use client";

/**
 * FlowmapBackground.tsx
 *
 * A quiet, premium ambient background: a domain-warped FBM noise field,
 * rendered in near-darkness, that only reveals color where the cursor has
 * recently moved. Modeled after the restraint of nextjs.org / vercel.com /
 * linear.app hero treatments rather than a typical colorful shader demo.
 *
 * Architecture:
 *  - types.ts           prop / uniform typings
 *  - constants.ts        default palette + tunable defaults, no magic numbers
 *  - utils.ts             pure helpers (color conversion, clamping, DPR)
 *  - shader-chunks.ts     reusable GLSL building blocks (noise, fbm, warp, fx)
 *  - shaders.ts            assembled vertex / fragment shader strings
 *  - FlowmapBackground.tsx  this file — React + OGL wiring only
 */

import { useEffect, useRef } from "react";
import {
  Renderer,
  Camera,
  Triangle,
  Program,
  Mesh,
  Vec2,
  Flowmap,
  type OGLRenderingContext,
} from "ogl";
import { cn } from "@/lib/utils";
import { fragmentShader, vertexShader } from "./shaders";
import {
  DEFAULT_PALETTE,
  DEFAULT_PROPS,
  FLOWMAP_SIZE,
  MAX_DPR,
  MIN_FRAME_DELTA_MS,
  VELOCITY_SMOOTHING,
} from "./constants";
import {
  getPointerClientPosition,
  getSafeDpr,
  hexToRgb,
  prefersReducedMotion,
} from "./utils";
import type { FlowmapBackgroundProps } from "./types";

export default function FlowmapBackground({
  className,
  intensity = DEFAULT_PROPS.intensity,
  dissipation = DEFAULT_PROPS.dissipation,
  falloff = DEFAULT_PROPS.falloff,
  blend = DEFAULT_PROPS.blend,
  speed = DEFAULT_PROPS.speed,
  idleSpeed = DEFAULT_PROPS.idleSpeed,
  bloomIntensity = DEFAULT_PROPS.bloomIntensity,
  vignette = DEFAULT_PROPS.vignette,
  grainAmount = DEFAULT_PROPS.grainAmount,
  colors,
}: FlowmapBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Props are read into a ref on every render so the animation loop (set up
  // once in the effect below) always sees fresh values without needing to
  // tear down and recreate the whole WebGL context on every prop change.
  const liveProps = useRef({
    intensity,
    dissipation,
    falloff,
    blend,
    speed,
    idleSpeed,
    bloomIntensity,
    vignette,
    grainAmount,
    colors,
  });
  liveProps.current = {
    intensity,
    dissipation,
    falloff,
    blend,
    speed,
    idleSpeed,
    bloomIntensity,
    vignette,
    grainAmount,
    colors,
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = prefersReducedMotion();

    // --- Renderer / camera / canvas -----------------------------------
    const renderer = new Renderer({
      dpr: getSafeDpr(container),
      alpha: true,
      antialias: true,
    });
    const gl: OGLRenderingContext = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const camera = new Camera(gl);
    camera.position.z = 1;

    // --- Flowmap (the cursor "memory" texture) --------------------------
    const flowmap = new Flowmap(gl, {
      size: FLOWMAP_SIZE,
      falloff: liveProps.current.falloff,
      alpha: liveProps.current.blend,
      dissipation: liveProps.current.dissipation,
    });

    // --- Program / mesh ---------------------------------------------------
    const palette = { ...DEFAULT_PALETTE, ...liveProps.current.colors };
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      transparent: true,
      uniforms: {
        tFlow: flowmap.uniform,
        uTime: { value: 0 },
        uResolution: {
          value: new Vec2(container.clientWidth, container.clientHeight),
        },
        uIntensity: { value: liveProps.current.intensity },
        uBloomIntensity: { value: liveProps.current.bloomIntensity },
        uVignette: { value: liveProps.current.vignette },
        uGrainAmount: { value: liveProps.current.grainAmount },
        uIdleSpeed: { value: reducedMotion ? 0 : liveProps.current.idleSpeed },
        uColorBackground: { value: hexToRgb(palette.background) },
        uColorSurface: { value: hexToRgb(palette.surface) },
        uColorAccent1: { value: hexToRgb(palette.accent1) },
        uColorAccent2: { value: hexToRgb(palette.accent2) },
        uColorAccent3: { value: hexToRgb(palette.accent3) },
        uColorAccent4: { value: hexToRgb(palette.accent4) },
      },
    });

    const geometry = new Triangle(gl);
    const mesh = new Mesh(gl, { geometry, program });

    // --- Resize handling (observes the container, not the window) -------
    function resize() {
      if (!container) return;
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(width, height);
      const resolutionUniform = program.uniforms.uResolution.value as Vec2;
      resolutionUniform.set(width, height);
      // Keeps the circular cursor stamp circular instead of stretched.
      flowmap.aspect = width / height;
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    // --- Pointer tracking ---------------------------------------------------
    // These are allocated exactly once and mutated in place every frame —
    // no per-frame Vec2 allocation, per the performance requirements.
    const pointerUv = new Vec2(-1, -1);
    const targetVelocity = new Vec2(0, 0);
    const smoothedVelocity = new Vec2(0, 0);
    const previousClientPos = { x: 0, y: 0 };
    let hasPreviousPos = false;
    let lastSampleTime = 0;
    let pointerActive = false;

    function handlePointerMove(event: MouseEvent | TouchEvent) {
      const pos = getPointerClientPosition(event);
      if (!pos || !container) return;

      const rect = container.getBoundingClientRect();
      pointerUv.set(
        (pos.x - rect.left) / rect.width,
        1.0 - (pos.y - rect.top) / rect.height,
      );

      const now = performance.now();
      if (!hasPreviousPos) {
        previousClientPos.x = pos.x;
        previousClientPos.y = pos.y;
        lastSampleTime = now;
        hasPreviousPos = true;
        return;
      }

      const deltaTime = Math.max(MIN_FRAME_DELTA_MS, now - lastSampleTime);
      const deltaX = pos.x - previousClientPos.x;
      const deltaY = pos.y - previousClientPos.y;

      targetVelocity.set(deltaX / deltaTime, -deltaY / deltaTime);

      previousClientPos.x = pos.x;
      previousClientPos.y = pos.y;
      lastSampleTime = now;
      pointerActive = true;
    }

    function handlePointerLeave() {
      pointerActive = false;
      hasPreviousPos = false;
      targetVelocity.set(0, 0);
    }

    // Listening on the parent (the hero section) means the trail keeps
    // working even while the pointer is over content sitting above the
    // canvas, since the canvas itself is pointer-events-none.
    const listenTarget: HTMLElement = container.parentElement ?? container;
    listenTarget.addEventListener("mousemove", handlePointerMove);
    listenTarget.addEventListener("mouseleave", handlePointerLeave);
    listenTarget.addEventListener("touchmove", handlePointerMove, {
      passive: true,
    });
    listenTarget.addEventListener("touchend", handlePointerLeave);

    // --- Pause when off-screen / tab hidden, to save battery on laptops ---
    let isVisible = true;
    const visibilityHandler = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", visibilityHandler);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(container);

    // --- Animation loop -------------------------------------------------------
    let frameId: number;

    function tick(time: number) {
      frameId = requestAnimationFrame(tick);
      if (!isVisible) return;

      const current = liveProps.current;

      // Keep tunable uniforms in sync with the latest props without
      // reallocating anything — just mutate the existing uniform values.
      program.uniforms.uIntensity.value = current.intensity;
      program.uniforms.uBloomIntensity.value = current.bloomIntensity;
      program.uniforms.uVignette.value = current.vignette;
      program.uniforms.uGrainAmount.value = current.grainAmount;
      program.uniforms.uIdleSpeed.value = reducedMotion ? 0 : current.idleSpeed;
      program.uniforms.uTime.value = (time * 0.001 * current.speed) % 1000.0;

      // Flowmap only exposes these as GL uniforms on its internal mesh,
      // not as top-level settable properties, so update them there.
      const flowmapUniforms = flowmap.mesh.program.uniforms;
      flowmapUniforms.uFalloff.value = current.falloff * 0.5;
      flowmapUniforms.uAlpha.value = current.blend;
      flowmapUniforms.uDissipation.value = current.dissipation;

      // Smoothly ease velocity toward its target so the trail never snaps
      // or streaks — this is what keeps the interaction feeling "soft".
      const smoothing = pointerActive
        ? VELOCITY_SMOOTHING
        : VELOCITY_SMOOTHING * 0.5;
      smoothedVelocity.x += (targetVelocity.x - smoothedVelocity.x) * smoothing;
      smoothedVelocity.y += (targetVelocity.y - smoothedVelocity.y) * smoothing;

      if (!pointerActive) {
        // Let the target velocity itself relax to zero so the glow
        // dissipates naturally rather than cutting off abruptly.
        targetVelocity.x *= 0.9;
        targetVelocity.y *= 0.9;
      }

      flowmap.mouse.copy(pointerUv);
      flowmap.velocity.copy(smoothedVelocity);
      flowmap.update();

      renderer.render({ scene: mesh, camera });
    }

    frameId = requestAnimationFrame(tick);

    // --- Cleanup -----------------------------------------------------------------
    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", visibilityHandler);

      listenTarget.removeEventListener("mousemove", handlePointerMove);
      listenTarget.removeEventListener("mouseleave", handlePointerLeave);
      listenTarget.removeEventListener("touchmove", handlePointerMove);
      listenTarget.removeEventListener("touchend", handlePointerLeave);

      canvas.remove();

      // Free the GPU context explicitly rather than waiting on GC.
      const loseContextExt = gl.getExtension("WEBGL_lose_context");
      loseContextExt?.loseContext();
    };
    // Intentionally empty: the effect sets up one long-lived GL context and
    // reads subsequent prop changes through `liveProps.current` each frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className,
      )}
    />
  );
}
