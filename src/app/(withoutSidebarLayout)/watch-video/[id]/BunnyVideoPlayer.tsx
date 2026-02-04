"use client";

import { useEffect, useRef } from "react";

interface BunnyVidoePlayerProps {
  videoUrl: string;
  lessonId: string;
  lastPosition: number;
  handleUpdateProgress: (updateData: {
    lessonId: string;
    lastPosition: number;
    progressValue: number;
    isFinished: boolean;
  }) => void;
  width?: string;
  height?: string;
}

export default function BunnyVidoePlayer({
  videoUrl,
  lessonId,
  lastPosition,
  handleUpdateProgress,
  width = "100%",
  height = "100%",
}: BunnyVidoePlayerProps) {
  const iframeRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef({
    lessonId: null as string | null,
    duration: 0,
    currentTime: 0,
    progressValue: 0,
    hasEnded: false,
    isSeeking: false,
    src: "",
  });

  useEffect(() => {
    progressRef.current = {
      lessonId: lessonId,
      duration: 0,
      currentTime: 0,
      progressValue: 0,
      hasEnded: false,
      isSeeking: false,
      src: videoUrl,
    };
    const script = document.createElement("script");
    script.src = "//assets.mediadelivery.net/playerjs/playerjs-latest.min.js";
    script.async = true;

    const currentRef = iframeRef.current;
    // const progress = progressRef.current;

    // if (progress.src === videoUrl && progress.lessonId !== lessonId) return;

    script.onload = () => {
      if (!currentRef) return;

      const iframe = document.createElement("iframe");
      iframe.src = videoUrl;
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.allow = "autoplay; fullscreen; picture-in-picture";
      iframe.style.border = "0";

      currentRef.appendChild(iframe);

      const player = new (window as any).playerjs.Player(iframe);

      player.on("ready", () => {
        player.on("timeupdate", (timeValue: { seconds: number; duration: number }) => {
          if (progressRef.current.isSeeking || timeValue.seconds < lastPosition) return;
          progressRef.current.currentTime = timeValue.seconds;
          if (progressRef.current.duration > 0) {
            progressRef.current.progressValue =
              (timeValue.seconds / progressRef.current.duration) * 100;
          }
        });

        player.getDuration((duration: number) => {
          progressRef.current.duration = duration;

          if (!lastPosition) {
            player.setCurrentTime(0);
          }

          if (lastPosition >= duration * 0.95) {
            progressRef.current.progressValue = 100;
          } else if (lastPosition > 0 && lastPosition < duration * 0.9) {
            progressRef.current.isSeeking = true;
            player.setCurrentTime(Number(lastPosition));
            setTimeout(() => {
              progressRef.current.isSeeking = false;
            }, 3000);
          }
        });

        player.on("ended", () => {
          if (!progressRef.current.hasEnded) {
            progressRef.current.hasEnded = true;
            handleUpdateProgress({
              lessonId: progressRef.current.lessonId as string,
              lastPosition: 0,
              progressValue: 100,
              isFinished: true,
            });
            player.setCurrentTime(player.getDuration());
          }
        });

        if (player.supports("method", "mute")) {
          player.mute();
        }
      });
    };

    document.body.appendChild(script);

    return () => {
      const handleVideoSwitch = () => {
        if (
          !progressRef.current.lessonId ||
          progressRef.current.progressValue <= 0 ||
          progressRef.current.currentTime <= 0
        )
          return;

        const finalPercent = progressRef.current.progressValue;

        if (progressRef.current.progressValue <= 0) return;

        if (finalPercent === 100) return;

        if (finalPercent >= 90) {
          // console.log(
          //   "inside 90 percent : ",
          //   {
          //     lessonId: progressRef.current.lessonId,
          //     lastPosition: 0,
          //     progressValue: 100,
          //     isFinished: true,
          //   },
          //   progressRef.current.lessonId === lessonId,
          //   {
          //     current: lessonId,
          //     progress: progressRef.current.lessonId,
          //   }
          // );
          handleUpdateProgress({
            lessonId: progressRef.current.lessonId as string,
            lastPosition: 0,
            progressValue: 100,
            isFinished: true,
          });
        } else {
          // console.log(
          //   "inside else log : ",
          //   {
          //     lessonId: progressRef.current.lessonId,
          //     lastPosition: Math.floor((finalPercent / 100) * progressRef.current.duration),
          //     progressValue: finalPercent,
          //     isFinished: false,
          //   },
          //   progressRef.current.lessonId === lessonId,
          //   {
          //     current: lessonId,
          //     progress: progressRef.current.lessonId,
          //   }
          // );
          handleUpdateProgress({
            lessonId: progressRef.current.lessonId as string,
            lastPosition: Math.floor((finalPercent / 100) * progressRef.current.duration),
            progressValue: finalPercent,
            isFinished: false,
          });
        }
      };
      handleVideoSwitch();
      document.body.removeChild(script);
      if (currentRef) currentRef.innerHTML = "";
    };
  }, [videoUrl, handleUpdateProgress, lessonId, lastPosition]);

  return (
    <div
      ref={iframeRef}
      style={{ width, height }}
    />
  );
}
