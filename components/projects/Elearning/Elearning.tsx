"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const features = [
    {
        number: "01",
        eyebrow: "Understand your progress",
        title: "Know exactly where you stand",
        description:
            "Track your academic progress and understand which areas need more attention.",
        bullets: [
            "Track your learning progress",
            "Understand your performance",
            "Identify areas that need improvement",
        ],
        image:
            "https://ty574q8ip7.ufs.sh/f/E45AsRPZALlHdc9sFMBDJi72Vcpg91X4WUyeaulEsATCfbxS",
        alt: "Student dashboard showing class schedule, progress, and learning statistics",
    },
    {
        number: "02",
        eyebrow: "Test your knowledge",
        title: "Test yourself with real exams",
        description:
            "Take structured exams designed to measure your understanding, not just your ability to memorize.",
        bullets: [
            "Timed examination experience",
            "Track your answers while testing",
            "Review your performance",
        ],
        image:
            "https://ty574q8ip7.ufs.sh/f/E45AsRPZALlHMZ9eWBjfRDOmZTzarUuNBLF5cwC7isIlqe36",
        alt: "Quiz interface showing timed questions and answer options",
    },
    {
        number: "03",
        eyebrow: "Turn results into progress",
        title: "Your grades tell a story",
        description:
            "See how your performance changes over time and discover exactly where you can improve.",
        bullets: [
            "Keep track of your exam results",
            "See your progress over time",
            "Identify your weakest areas",
        ],
        image:
            "https://ty574q8ip7.ufs.sh/f/E45AsRPZALlHUjr6ChvYwWeSiKVqNhsr8yvpBd5J9EUnAGTu",
        alt: "Grades screen showing exam results and performance details",
    },
] as const;

gsap.registerPlugin(ScrollTrigger);

function Elearning() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRefs = useRef<HTMLElement[]>([]);
    const imageRefs = useRef<HTMLDivElement[]>([]);
    const progressRefs = useRef<HTMLSpanElement[]>([]);

    useLayoutEffect(() => {
        const section = sectionRef.current;

        if (!section) {
            return;
        }

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        const context = gsap.context(() => {
            const contents = contentRefs.current.filter(Boolean);
            const images = imageRefs.current.filter(Boolean);
            const progressBars = progressRefs.current.filter(Boolean);

            if (reducedMotion) {
                gsap.set(contents, { autoAlpha: 0 });
                gsap.set(images, { autoAlpha: 0 });
                gsap.set(progressBars, { scaleX: 1 });
                gsap.set(contents[0], { autoAlpha: 1 });
                gsap.set(images[0], { autoAlpha: 1 });
                return;
            }

            gsap.set(contents, { autoAlpha: 0, y: 34 });
            gsap.set(contents[0], { autoAlpha: 1, y: 0 });
            gsap.set(images, { autoAlpha: 0, y: 28, scale: 1.02 });
            gsap.set(images[0], { autoAlpha: 1, y: 0, scale: 1 });
            gsap.set(progressBars, { scaleX: 0, transformOrigin: "left center" });

            const timeline = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.45,
                    invalidateOnRefresh: true,
                },
            });

            features.forEach((_, index) => {
                const content = contents[index];
                const image = images[index];
                const progressBar = progressBars[index];
                const bullets = gsap.utils.toArray<HTMLElement>(
                    content?.querySelectorAll("[data-showcase-bullet]") ?? [],
                );
                const textItems = gsap.utils.toArray<HTMLElement>(
                    content?.querySelectorAll("[data-showcase-copy]") ?? [],
                );
                const start = index;

                if (!content || !image || !progressBar) {
                    return;
                }

                if (index > 0) {
                    timeline
                        .to(
                            contents[index - 1],
                            { autoAlpha: 0, y: -30, duration: 0.22 },
                            start,
                        )
                        .to(
                            images[index - 1],
                            { autoAlpha: 0, y: -18, scale: 0.97, duration: 0.26 },
                            start,
                        )
                        .fromTo(
                            content,
                            { autoAlpha: 0, y: 34 },
                            { autoAlpha: 1, y: 0, duration: 0.24 },
                            start + 0.06,
                        )
                        .fromTo(
                            image,
                            { autoAlpha: 0, y: 22, scale: 1.02 },
                            { autoAlpha: 1, y: 0, scale: 1, duration: 0.28 },
                            start + 0.04,
                        );
                }

                timeline.fromTo(
                    progressBar,
                    { scaleX: 0 },
                    { scaleX: 1, duration: 0.86 },
                    start + 0.08,
                );

                textItems.forEach((item, itemIndex) => {
                    timeline.fromTo(
                        item,
                        { autoAlpha: itemIndex === 0 && index === 0 ? 1 : 0.2, y: 12 },
                        { autoAlpha: 1, y: 0, duration: 0.12 },
                        start + 0.08 + itemIndex * 0.08,
                    );
                });

                bullets.forEach((bullet, bulletIndex) => {
                    timeline.fromTo(
                        bullet,
                        { autoAlpha: 0.22, y: 16 },
                        { autoAlpha: 1, y: 0, duration: 0.16 },
                        start + 0.38 + bulletIndex * 0.14,
                    );
                });

                timeline.to(
                    image,
                    { y: -10, scale: 1.005, duration: 0.7 },
                    start + 0.18,
                );
            });
        }, section);

        return () => context.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative isolate w-full overflow-x-clip bg-[#080706] py-20 text-stone-100 sm:py-24 lg:min-h-[300vh] lg:py-0 motion-reduce:lg:min-h-0 motion-reduce:lg:py-24"
            aria-labelledby="elearning-showcase-title"
        >
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-80 [background:radial-gradient(circle_at_72%_22%,rgba(214,181,109,0.12),transparent_32%),radial-gradient(circle_at_18%_78%,rgba(255,246,221,0.06),transparent_28%)]" />
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.75)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.75)_1px,transparent_1px)] [background-size:42px_42px]" />

            <div className="mx-auto hidden w-[90%] max-w-6xl gap-12 lg:sticky lg:top-0 lg:grid lg:min-h-screen lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-14 lg:py-16 motion-reduce:lg:hidden">
                <div className="max-w-xl">
                    <p className="mb-5 text-xs font-medium uppercase tracking-[0.34em] text-[#d8bd7a]">
                        E-learning platform
                    </p>
                    <h2
                        id="elearning-showcase-title"
                        className="mb-8 text-4xl font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl"
                    >
                        Dashboard to exams to results, in one guided learning flow.
                    </h2>

                    <div className="relative lg:min-h-[390px]">
                        {features.map((feature, featureIndex) => (
                            <article
                                key={feature.number}
                                ref={(node) => {
                                    if (node) contentRefs.current[featureIndex] = node;
                                }}
                                className="mb-14 border-l border-white/10 pl-6 last:mb-0 lg:absolute lg:inset-x-0 lg:top-0 lg:mb-0"
                            >
                                <div className="mb-5 flex items-center gap-4">
                                    <span className="text-sm font-medium text-[#d8bd7a]">
                                        {feature.number}
                                    </span>
                                    <span className="text-sm text-stone-400">{feature.eyebrow}</span>
                                </div>

                                <div className="mb-8 flex gap-3" aria-hidden="true">
                                    {features.map((indicatorFeature, indicatorIndex) => (
                                        <div
                                            key={indicatorFeature.number}
                                            className="h-px flex-1 overflow-hidden rounded-full bg-white/12"
                                        >
                                            {indicatorIndex === featureIndex ? (
                                                <span
                                                    ref={(node) => {
                                                        if (node) {
                                                            progressRefs.current[featureIndex] = node;
                                                        }
                                                    }}
                                                    className="block h-full w-full origin-left bg-[#d8bd7a]"
                                                />
                                            ) : null}
                                        </div>
                                    ))}
                                </div>

                                <h3
                                    data-showcase-copy
                                    className="mb-4 text-3xl font-medium tracking-tight text-balance text-stone-50 sm:text-4xl"
                                >
                                    {feature.title}
                                </h3>
                                <p
                                    data-showcase-copy
                                    className="mb-7 max-w-lg text-base leading-7 text-stone-300 sm:text-lg"
                                >
                                    {feature.description}
                                </p>
                                <ul className="space-y-3 text-sm text-stone-300 sm:text-base">
                                    {feature.bullets.map((bullet) => (
                                        <li
                                            key={bullet}
                                            data-showcase-bullet
                                            className="flex items-start gap-3"
                                        >
                                            <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full border border-[#d8bd7a]/45 text-[10px] text-[#d8bd7a]">
                                                ✓
                                            </span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="relative lg:min-h-[620px]">
                    <div className="absolute -inset-6 hidden rounded-[2rem] border border-[#d8bd7a]/10 lg:block" />
                    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#11100e] shadow-[0_36px_100px_rgba(0,0,0,0.45)] lg:sticky lg:top-[18vh]">
                        <div className="pointer-events-none absolute inset-0 z-20 rounded-[1.75rem] ring-1 ring-inset ring-white/10" />
                        {features.map((feature, index) => (
                            <div
                                key={feature.number}
                                ref={(node) => {
                                    if (node) imageRefs.current[index] = node;
                                }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={feature.image}
                                    alt={feature.alt}
                                    fill
                                    sizes="(min-width: 1024px) 56vw, 90vw"
                                    priority={index === 0}
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-12 grid w-[90%] max-w-7xl gap-10 lg:hidden motion-reduce:lg:grid">
                {features.map((feature) => (
                    <article key={feature.number} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                        <div className="p-6 sm:p-8">
                            <p className="mb-3 text-sm text-[#d8bd7a]">
                                {feature.number} — {feature.eyebrow}
                            </p>
                            <h3 className="mb-3 text-3xl font-medium tracking-tight">
                                {feature.title}
                            </h3>
                            <p className="mb-6 text-stone-300">{feature.description}</p>
                            <ul className="space-y-3 text-sm text-stone-300">
                                {feature.bullets.map((bullet) => (
                                    <li key={bullet} className="flex gap-3">
                                        <span className="text-[#d8bd7a]">✓</span>
                                        {bullet}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative aspect-[16/11] border-t border-white/10">
                            <Image
                                src={feature.image}
                                alt={feature.alt}
                                fill
                                sizes="90vw"
                                className="object-cover"
                            />
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Elearning;
