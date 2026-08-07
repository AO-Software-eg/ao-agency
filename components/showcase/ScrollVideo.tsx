"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollVideoProps {
    /** Optional preferred source. Browsers fall back to MP4 when WebM is unavailable. */
    webm?: string;
    mp4?: string;
    poster?: string;
    progress: number;
    className?: string;
}

/**
 * A timeline-controlled video surface. It does not autoplay: scroll progress is
 * the only playback clock, leaving it ready for chapters and multiple clips.
 */
function ScrollVideo({ webm, mp4, poster, progress, className }: ScrollVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const frameRef = useRef<number | null>(null);
    const [metadataVersion, setMetadataVersion] = useState(0);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;

        const targetTime = Math.min(1, Math.max(0, progress)) * video.duration;
        frameRef.current = requestAnimationFrame(() => {
            // Avoid tiny seeks that can make lower-powered devices work unnecessarily.
            if (Math.abs(video.currentTime - targetTime) > 0.016) {
                video.currentTime = targetTime;
            }
        });

        return () => {
            if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
        };
    }, [progress, metadataVersion]);

    return (
        <video
            ref={videoRef}
            data-slot="scroll-video"
            className={cn("h-full w-full bg-black object-contain [transform:translateZ(0)]", className)}
            muted
            playsInline
            preload="metadata"
            poster={poster}
            onLoadedMetadata={() => setMetadataVersion((version) => version + 1)}
            aria-label="AO Learning Platform product walkthrough"
        >
            {webm && <source src={webm} type="video/webm" />}
            {mp4 && <source src={mp4} type="video/mp4" />}
        </video>
    );
}

export { ScrollVideo };
export type { ScrollVideoProps };
