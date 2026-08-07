import * as React from "react";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectStory, ProjectCta } from "@/types/projects";

interface StoryInfoProps {
    story: ProjectStory;
    progress: number;
    className?: string;
}

function StoryInfoBadge({
    technologies,
    className,
}: {
    technologies: readonly string[];
    className?: string;
}) {
    if (technologies.length === 0) return null;

    return (
        <div
            data-slot="story-info-badge"
            className={cn(
                "inline-flex items-center gap-2 rounded-full border border-[var(--story-border)] bg-black/10 px-3 py-1 backdrop-blur-sm",
                className
            )}
        >
            <span className="size-1.5 rounded-full bg-[var(--story-primary)]" />
            <span className="text-xs font-medium text-[var(--story-muted)]">
                {technologies[0]}
                {technologies.length > 1 && (
                    <span className="ml-1 opacity-60">
                        +{technologies.length - 1}
                    </span>
                )}
            </span>
        </div>
    );
}

function StoryInfoTechnologies({
    technologies,
    className,
}: {
    technologies: readonly string[];
    className?: string;
}) {
    if (technologies.length === 0) return null;

    return (
        <div
            data-slot="story-info-technologies"
            className={cn("flex flex-wrap gap-2", className)}
        >
            {technologies.map((tech) => (
                <span
                    key={tech}
                    className="rounded-md border border-[var(--story-border)] bg-black/10 px-2.5 py-1 text-xs font-medium text-[var(--story-muted)]"
                >
                    {tech}
                </span>
            ))}
        </div>
    );
}

function StoryInfoFeatures({
    features,
    className,
}: {
    features: readonly string[];
    className?: string;
}) {
    if (features.length === 0) return null;

    return (
        <ul
            data-slot="story-info-features"
            className={cn("space-y-3", className)}
        >
            {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--story-primary)]/15 text-[var(--story-primary)]">
                        <Check className="size-3" strokeWidth={2.5} />
                    </span>
                    <span className="text-sm leading-relaxed text-[var(--story-muted)]">
                        {feature}
                    </span>
                </li>
            ))}
        </ul>
    );
}

function StoryInfoCtas({
    ctas,
    className,
}: {
    ctas: readonly ProjectCta[];
    className?: string;
}) {
    if (ctas.length === 0) return null;

    return (
        <div
            data-slot="story-info-ctas"
            className={cn("flex flex-wrap gap-3", className)}
        >
            {ctas.map((cta) => {
                const variant = cta.variant ?? "primary";
                return (
                    <a
                        key={`${cta.label}-${cta.href}`}
                        href={cta.href}
                        className={cn(
                            "inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200",
                            variant === "primary" &&
                                "bg-[var(--story-primary)] text-[var(--story-background)] hover:scale-[0.98]",
                            variant === "secondary" &&
                                "border border-[var(--story-border)] bg-black/10 text-[var(--story-foreground)] hover:bg-black/20 hover:scale-[0.98]",
                            variant === "ghost" &&
                                "text-[var(--story-muted)] hover:bg-black/10 hover:text-[var(--story-foreground)]"
                        )}
                    >
                        {cta.label}
                        {variant === "primary" && (
                            <ArrowRight className="size-4" strokeWidth={2} />
                        )}
                    </a>
                );
            })}
        </div>
    );
}

function StoryHeader({ story }: Pick<StoryInfoProps, "story">) {
    return (
        <div data-slot="story-header" className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--story-primary)]">
                {story.subtitle}
            </p>
            <h2 className="text-4xl font-semibold leading-[0.95] tracking-tight text-[var(--story-foreground)] md:text-5xl xl:text-6xl">
                {story.title}
            </h2>
        </div>
    );
}

function StoryDescription({ children }: { children: React.ReactNode }) {
    return <p data-slot="story-description" className="max-w-md text-base leading-relaxed text-[var(--story-muted)]">{children}</p>;
}

function StoryActions({ ctas }: { ctas?: readonly ProjectCta[] }) {
    return ctas && ctas.length > 0 ? <StoryInfoCtas ctas={ctas} /> : null;
}

function StoryInfo({ story, progress, className }: StoryInfoProps) {
    return (
        <div
            data-slot="story-info"
            data-story-id={story.id}
            className={cn(
                "flex h-full flex-col justify-center gap-6",
                className
            )}
            style={{
                opacity: 0.4 + Math.min(1, progress * 3) * 0.6,
                transform: `translateY(${Math.max(0, 1 - progress * 3) * 16}px)`,
            }}
        >
            <StoryInfoBadge technologies={story.technologies} />

            <StoryHeader story={story} />

            <StoryDescription>{story.description}</StoryDescription>

            <StoryInfoTechnologies technologies={story.technologies} />

            <StoryInfoFeatures features={story.features} />

            <StoryActions ctas={story.ctas} />
        </div>
    );
}

export {
    StoryInfo,
    StoryHeader,
    StoryDescription,
    StoryActions,
    StoryInfoBadge,
    StoryInfoTechnologies,
    StoryInfoFeatures,
    StoryInfoCtas,
};
