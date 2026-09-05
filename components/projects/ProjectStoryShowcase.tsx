"use client";

import Image from "next/image";
import { memo, useId, useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/github";

gsap.registerPlugin(ScrollTrigger);

type HeaderData = {
  projectName: string;
  projectType: string;
  projectNumber: string;
  projectDescription: string;
  projectTechStack: string;
};

type FeatureData = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: readonly string[];
  image: string;
  alt: string;
};

type ProjectLinks = {
  github?: string;
  liveDemo?: string;
};

type ShowcaseTheme = {
  section: string;
  background: ReactNode;
  headerBorder: string;
  accentText: string;
  mutedText: string;
  bodyText: string;
  titleText: string;
  inactiveNumber: string;
  accentColor: string;
  accentBg: string;
  border: string;
  progressTrack: string;
  imageFrame: string;
  imageOuterBorder: string;
  imageBackground: string;
  action: string;
  actionDisabled: string;
  focusRing: string;
  transitionOverlay?: ReactNode;
};

type ProjectStoryShowcaseProps = {
  header: HeaderData;
  features: readonly FeatureData[];
  projectLinks: ProjectLinks;
  theme: ShowcaseTheme;
  layout?: "left" | "right";
  priorityFirstImage?: boolean;
};

type ActionLinkProps = {
  href?: string;
  label: string;
  icon: ReactNode;
  theme: ShowcaseTheme;
};

const ActionLink = memo(function ActionLink({
  href,
  label,
  icon,
  theme,
}: ActionLinkProps) {
  const className = `${theme.action} ${theme.focusRing}`;

  if (!href) {
    return (
      <span
        aria-disabled="true"
        className={`${className} ${theme.actionDisabled}`}
      >
        {icon}
        {label}
      </span>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {icon}
      {label}
    </a>
  );
});

function ProjectStoryShowcase({
  header,
  features,
  projectLinks,
  theme,
  layout = "left",
  priorityFirstImage = false,
}: ProjectStoryShowcaseProps) {
  const titleId = useId();
  const storyRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<HTMLElement[]>([]);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const numberRefs = useRef<HTMLSpanElement[]>([]);
  const progressRefs = useRef<HTMLSpanElement[]>([]);

  useLayoutEffect(() => {
    const story = storyRef.current;

    if (!story) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      const contents = contentRefs.current.filter(Boolean);
      const images = imageRefs.current.filter(Boolean);
      const numbers = numberRefs.current.filter(Boolean);
      const progressBars = progressRefs.current.filter(Boolean);

      if (reducedMotion) {
        gsap.set(contents, { autoAlpha: 0, y: 0 });
        gsap.set(images, { autoAlpha: 0, y: 0, scale: 1 });
        gsap.set(progressBars, { scaleX: 1, transformOrigin: "left center" });
        gsap.set([contents[0], images[0]], { autoAlpha: 1 });
        gsap.set(numbers[0], { color: theme.accentColor });
        return;
      }

      gsap.set(contents, { autoAlpha: 0, y: 30 });
      gsap.set(images, { autoAlpha: 0, y: 24, scale: 1.02 });
      gsap.set(numbers, { color: theme.inactiveNumber });
      gsap.set(progressBars, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(images[0], { autoAlpha: 1, y: 0, scale: 1 });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: story,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      });

      features.forEach((_, index) => {
        const content = contents[index];
        const image = images[index];
        const number = numbers[index];
        const progressBar = progressBars[index];
        const items = gsap.utils.toArray<HTMLElement>(
          content?.querySelectorAll("[data-stage-item]") ?? [],
        );
        const start = index;

        if (!content || !image || !number || !progressBar) {
          return;
        }

        if (index > 0) {
          timeline
            .to(
              contents[index - 1],
              { autoAlpha: 0, y: -26, duration: 0.24 },
              start,
            )
            .to(
              images[index - 1],
              { autoAlpha: 0, y: -18, scale: 0.97, duration: 0.28 },
              start,
            )
            .to(
              numbers[index - 1],
              { color: theme.inactiveNumber, duration: 0.18 },
              start,
            )
            .fromTo(
              image,
              { autoAlpha: 0, y: 20, scale: 1.02 },
              { autoAlpha: 1, y: 0, scale: 1, duration: 0.3 },
              start + 0.03,
            );
        }

        timeline
          .to(
            number,
            { color: theme.accentColor, duration: 0.16 },
            start + 0.02,
          )
          .fromTo(
            content,
            { autoAlpha: 0, y: index === 0 ? 18 : 30 },
            { autoAlpha: 1, y: 0, duration: 0.2 },
            start + 0.04,
          )
          .fromTo(
            progressBar,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.78 },
            start + 0.1,
          );

        items.forEach((item, itemIndex) => {
          timeline.fromTo(
            item,
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.14 },
            start + 0.08 + itemIndex * 0.08,
          );
        });

        timeline.to(
          image,
          { y: -8, scale: 1.006, duration: 0.62 },
          start + 0.24,
        );
      });
    }, story);

    return () => context.revert();
  }, [features, theme.accentColor, theme.inactiveNumber]);

  const visual = (
    <div
      className={`relative flex items-center min-h-[clamp(230px,44vh,360px)] lg:block lg:min-h-[620px] ${
        layout === "left" ? "order-first lg:order-none" : ""
      }`}
    >
      <div
        className={`absolute -inset-4 hidden rounded-[2rem] border lg:block ${theme.imageOuterBorder}`}
      />
      <div
        className={`relative mx-auto aspect-[16/11] w-full max-w-full sm:max-w-[min(100%,560px)] overflow-hidden rounded-[1.35rem] border shadow-[0_36px_100px_rgba(0,0,0,0.18)] sm:rounded-[1.75rem] lg:max-w-none ${theme.imageFrame} ${theme.imageBackground}`}
      >
        <div className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] ring-1 ring-inset ring-white/10" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-16 bg-gradient-to-b from-black/10 to-transparent" />
        {features.map((feature, index) => (
          <div
            key={feature.number}
            ref={(node) => {
              if (node) imageRefs.current[index] = node;
            }}
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src={feature.image}
              alt={feature.alt}
              fill
              sizes="(min-width: 1280px) 640px, (min-width: 1024px) 50vw, 92vw"
              priority={priorityFirstImage && index === 0}
              loading={priorityFirstImage && index === 0 ? undefined : "lazy"}
              decoding="async"
              draggable={false}
              className="object-contain object-top"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const content = (
    <div className="flex flex-col justify-between lg:min-h-[calc(100vh-8rem)]">
      <div className="mb-7 flex items-center gap-3" aria-hidden="true">
        {features.map((feature, index) => (
          <div
            key={feature.number}
            className="flex min-w-0 flex-1 items-center gap-3"
          >
            <span
              ref={(node) => {
                if (node) numberRefs.current[index] = node;
              }}
              className="shrink-0 text-sm font-medium transition-colors"
            >
              {feature.number}
            </span>
            <span
              className={`h-px min-w-0 flex-1 overflow-hidden rounded-full ${theme.progressTrack}`}
            >
              <span
                ref={(node) => {
                  if (node) progressRefs.current[index] = node;
                }}
                className={`block h-full w-full origin-left ${theme.accentBg}`}
              />
            </span>
          </div>
        ))}
      </div>

      <div className="relative min-h-[280px] sm:min-h-[350px] lg:min-h-[430px]">
        {features.map((feature, featureIndex) => (
          <article
            key={feature.number}
            ref={(node) => {
              if (node) contentRefs.current[featureIndex] = node;
            }}
            className={`absolute inset-x-0 top-0 ${
              layout === "right"
                ? "border-r pr-5 sm:pr-6"
                : "border-l pl-5 sm:pl-6"
            } ${theme.border}`}
          >
            <p
              data-stage-item
              className={`mb-5 text-xs font-medium uppercase tracking-[0.28em] ${theme.accentText}`}
            >
              {feature.number} / {feature.eyebrow}
            </p>
            <h3
              data-stage-item
              className={`mb-4 max-w-lg text-3xl font-medium tracking-tight text-balance sm:text-4xl lg:text-5xl ${theme.titleText}`}
            >
              {feature.title}
            </h3>
            <p
              data-stage-item
              className={`mb-8 max-w-lg text-base leading-7 sm:text-lg ${theme.bodyText}`}
            >
              {feature.description}
            </p>
            <ul className={`space-y-4 text-sm sm:text-base ${theme.bodyText}`}>
              {feature.bullets.map((bullet) => (
                <li
                  key={bullet}
                  data-stage-item
                  className="flex items-start gap-3"
                >
                  <span
                    className={`mt-1 text-sm leading-none ${theme.accentText}`}
                  >
                    ✓
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div
        className={`mt-8 border-t pt-5 lg:sticky lg:bottom-8 ${theme.border}`}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ActionLink
            href={projectLinks.github}
            label="GitHub"
            icon={<GithubIcon size={18} className="size-[18px]" />}
            theme={theme}
          />
          <ActionLink
            href={projectLinks.liveDemo}
            label="Live Demo"
            icon={<ExternalLink size={17} strokeWidth={1.8} />}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );

  return (
    <section
      className={`relative isolate w-full overflow-x-clip py-18 sm:py-24 ${theme.section}`}
      aria-labelledby={titleId}
    >
      {theme.background}
      {theme.transitionOverlay}

      <header className="mx-auto mb-14 w-[90%] max-w-6xl lg:mb-0 lg:pt-20">
        <div
          className={`max-w-3xl border-b pb-8 ${theme.headerBorder} ${layout === "right" ? "lg:ml-auto" : ""}`}
        >
          <p className={`mb-5 text-sm font-medium ${theme.accentText}`}>
            {header.projectNumber}
          </p>
          <h2
            id={titleId}
            className={`mb-3 text-4xl font-medium tracking-tight text-balance sm:text-5xl ${theme.titleText}`}
          >
            {header.projectName}
          </h2>
          <p
            className={`mb-5 text-sm uppercase tracking-[0.3em] ${theme.mutedText}`}
          >
            {header.projectType}
          </p>
          <p
            className={`max-w-2xl text-base leading-7 sm:text-lg ${theme.bodyText}`}
          >
            {header.projectDescription}
          </p>
          <p
            className={`mt-6 text-xs font-medium uppercase tracking-[0.24em] ${theme.mutedText}`}
          >
            {header.projectTechStack}
          </p>
        </div>
      </header>

      <div
        ref={storyRef}
        className="relative mx-auto min-h-[285vh] w-[90%] max-w-6xl lg:min-h-[320vh] motion-reduce:min-h-0"
      >
        <div className="sticky top-4 grid min-h-[calc(100vh-2rem)] items-center gap-6 py-6 sm:top-8 sm:gap-8 lg:top-0 lg:min-h-screen lg:grid-cols-[0.86fr_1.14fr] lg:gap-14 lg:py-16 motion-reduce:relative motion-reduce:top-0">
          {/*
                        Mobile: the visual is always rendered first so the screenshot
                        stays pinned at the top of the viewport and never gets pushed
                        below the fold by the taller text column.
                        Desktop (lg): order follows the `layout` prop — "left" puts
                        content in the left column, "right" mirrors it.
                    */}
          {layout === "right" ? (
            <>
              <div className="order-last lg:order-2">{content}</div>
              <div className="order-first lg:order-1">{visual}</div>
            </>
          ) : (
            <>
              {content}
              {visual}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export {
  ProjectStoryShowcase,
  type FeatureData,
  type HeaderData,
  type ProjectLinks,
  type ShowcaseTheme,
};
