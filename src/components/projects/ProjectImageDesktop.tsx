"use client";

import { inViewPercentage } from "@/utils/inView";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { ProjectImageProps } from "./ProjectImage";
import { useWindowSize } from "@/contexts/WindowSize";

export const ProjectImageDesktop = ({
  descRef,
  wrapperRef,
  media,
}: ProjectImageProps) => {
  const projectImageOutWrapperRef = useRef<HTMLDivElement>(null);
  const projectImageInWrapperRef = useRef<HTMLDivElement>(null);

  const windowSize = useWindowSize();

  useEffect(() => {
    const wrapperElement = wrapperRef.current;
    const projectDescElement = descRef.current;

    if (!wrapperElement || !projectDescElement) return;

    const projectImageOutWrapperElement = projectImageOutWrapperRef.current;
    const projectImageInWrapperElement = projectImageInWrapperRef.current;

    const ANIM_DURATION = 0;
    async function handleScroll() {
      let percentageInView = inViewPercentage(projectDescElement!);

      // determine height
      let height = 0;
      if (percentageInView > -100 && percentageInView < 200) {
        height = Math.max(0, percentageInView); // handle < 0 percentage
        height = Math.min(100, percentageInView); // handle > 100 percentage
      }

      // determine brightness
      let brightness = 1;
      if (percentageInView > 100) {
        brightness = Math.min(1, 1 - (percentageInView / 100 - 1) / 2); // handle > 100 percentage
      }

      // animate
      gsap.to(projectImageOutWrapperElement, {
        height: `${height}vh`,
        filter: `brightness(${brightness})`,
        duration: ANIM_DURATION,
      });

      // for sticky effect
      const wrapperRect = wrapperElement!.getBoundingClientRect();

      // move top when projects section is scrolling into view
      if (wrapperRect.top > 0) {
        gsap.to(projectImageOutWrapperElement, {
          top: wrapperRect.top,
          duration: ANIM_DURATION,
        });
      }

      // move bottom when projects section is scrolling out of view
      else if (wrapperRect.bottom <= windowSize.height) {
        gsap.to(projectImageOutWrapperElement, {
          top: wrapperRect.bottom - windowSize.height,
          duration: ANIM_DURATION,
        });
      }

      // stay on top 0px
      else {
        gsap.to(projectImageOutWrapperElement, {
          top: 0,
          duration: ANIM_DURATION,
        });
      }
    }

    // scroll listener
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.observe({
      target: window,
      type: "scroll",
      onChangeY: handleScroll,
    });
  }, [descRef, wrapperRef, windowSize]);

  return (
    <div
      ref={projectImageOutWrapperRef}
      className="fixed right-0 overflow-hidden w-1/2 h-screen"
    >
      <div
        ref={projectImageInWrapperRef}
        className="flex items-center w-full h-screen"
      >
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
