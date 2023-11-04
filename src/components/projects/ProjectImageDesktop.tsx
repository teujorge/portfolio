"use client";

import { useWindowSize } from "@/contexts/WindowSize";
import { inViewPercentage } from "@/utils/inView";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { ProjectImageProps } from "./ProjectImage";

export const ProjectImageDesktop = ({
  descRef,
  wrapperRef,
  media,
}: ProjectImageProps) => {
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  const windowSize = useWindowSize();

  useEffect(() => {
    // component wrapper (whole projects section)
    const wrapperElement = wrapperRef.current;

    // project description
    const projectDescElement = descRef.current;

    // project image wrapper
    const imageWrapperElement = imageWrapperRef.current;

    if (!wrapperElement || !projectDescElement || !imageWrapperElement) {
      return;
    }

    const ANIM_DURATION = 0; // seconds

    async function handleScroll() {
      let percentageDescInView = inViewPercentage(projectDescElement!);

      let imageWrapperHeight = 0;
      if (percentageDescInView > -100 && percentageDescInView < 200) {
        imageWrapperHeight = Math.max(0, percentageDescInView);
        imageWrapperHeight = Math.min(100, percentageDescInView);
        imageWrapperHeight += 10;
      }

      let imageBrightness = 1;
      if (percentageDescInView > 100) {
        imageBrightness = Math.min(1, 1 - (percentageDescInView / 100 - 1) / 2);
      }

      gsap.to(imageWrapperElement, {
        height: `${imageWrapperHeight}vh`,
        filter: `brightness(${imageBrightness})`,
        duration: ANIM_DURATION,
      });

      console.log(imageWrapperHeight);
    }

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.observe({
      target: window,
      type: "scroll",
      onChangeY: handleScroll,
    });
  }, [descRef, wrapperRef, windowSize]);

  return (
    <div
      ref={imageWrapperRef}
      className="absolute top-0 right-0 bottom-0 overflow-hidden w-full"
    >
      <div className="flex items-center w-full h-screen">
        <Image
          className="object-contain ml-2.5 w-fit h-fit rounded-[var(--border-radius)] shadow-md transition-none"
          style={{
            maxWidth: "90%",
            maxHeight: "90%",
            boxShadow: "0px 0px 10px var(--shadow-color)",
          }}
          src={media.src}
          alt={media.alt}
          priority
        />
      </div>
    </div>
  );
};
