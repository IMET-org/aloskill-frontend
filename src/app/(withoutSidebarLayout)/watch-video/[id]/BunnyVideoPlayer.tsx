"use client";

import { useEffect, useRef } from "react";

interface BunnyVidoePlayerProps {
  videoUrl: string;
  setIsCompleted: React.Dispatch<
    React.SetStateAction<{ progressValue: number; isFinished: boolean } | null>
  >;
  width?: string;
  height?: string;
}

export default function BunnyVidoePlayer({
  videoUrl,
  setIsCompleted,
  width = "100%",
  height = "100%",
}: BunnyVidoePlayerProps) {
  const iframeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load script dynamically
    const script = document.createElement("script");
    script.src = "//assets.mediadelivery.net/playerjs/playerjs-latest.min.js";
    script.async = true;

    script.onload = () => {
      if (!iframeRef.current) return;

      // Create iframe inside the div
      const iframe = document.createElement("iframe");
      iframe.src = videoUrl;
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.allow = "autoplay; fullscreen; picture-in-picture";
      iframe.style.border = "0";

      iframeRef.current.appendChild(iframe);

      // Initialize playerjs
      const player = new (window as any).playerjs.Player(iframe);

      player.on("ready", () => {
        console.log("Player ready");

        // Example events
        player.on("play", () => console.log("Play started"));
        player.on("ended", () => setIsCompleted({ progressValue: 100, isFinished: true }));
        player.getDuration((duration: number) => console.log("Duration:", duration));

        if (player.supports("method", "mute")) {
          player.mute();
        }
      });
    };

    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(script);
      if (iframeRef.current) iframeRef.current.innerHTML = "";
    };
  }, [videoUrl]);

  return (
    <div
      ref={iframeRef}
      style={{ width, height }}
    />
  );
}
