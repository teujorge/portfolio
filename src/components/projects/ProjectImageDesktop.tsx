"use client";

import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { inViewPercentage } from "@/utils/inView";
import { useEffect, useRef } from "react";
import { ProjectImageProps } from "./ProjectImage";

export const ProjectImageDesktop = ({
  descRef,
  wrapperRef,
  media,
  children,
  className: _className,
}: ProjectImageProps) => {
  const imageWrapperRef = useRef<HTMLDivElement>(null);

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
    }

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.observe({
      target: window,
      type: "scroll",
      onChangeY: handleScroll,
    });
  }, [descRef, wrapperRef]);

  const className = `object-cover ml-2.5 w-full h-full rounded-[var(--border-radius)] overflow-hidden shadow-md transition-none ${_className}`;
  const style: React.CSSProperties = {
    maxWidth: "90%",
    maxHeight: "90%",
    boxShadow: "0px 0px 10px var(--shadow-color)",
  };

  return (
    <div
      ref={imageWrapperRef}
      className="absolute top-0 right-0 bottom-0 overflow-hidden w-full"
    >
      <div className="flex items-center w-full h-screen">
        {media && children ? (
          <div className={className} style={style}>
            {children}
          </div>
        ) : media ? (
          <Image
            className={className}
            style={style}
            src={media.src}
            alt={media.alt}
          />
        ) : (
          <div className={className} style={style}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
