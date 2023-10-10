"use client";

import { toggleExpansion } from "@/utils/expansion";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export const School = ({
  school,
  degree,
  city,
  country,
  date,
  description,
}: {
  school: string;
  degree: string;
  city: string;
  country: string;
  date: string;
  description: string;
}) => {
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const descriptionContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const descElem = descriptionRef.current!;
    const descContainerElem = descriptionContainerRef.current!;

    gsap.set(descElem, { height: 0, opacity: 0 });

    function toggleDescription() {
      toggleExpansion(descriptionRef);
    }

    descContainerElem.addEventListener("mouseenter", toggleDescription);
    descContainerElem.addEventListener("mouseleave", toggleDescription);

    return () => {
      descContainerElem.removeEventListener("mouseenter", toggleDescription);
      descContainerElem.removeEventListener("mouseleave", toggleDescription);
    };
  }, []);

  return (
    <div
      ref={descriptionContainerRef}
      className="reveal flex flex-row items-center justify-center border-[var(--primary-color)] md:m-6 md:p-4 md:border-r-2"
    >
      <div className="flex flex-col justify-center items-start my-2.5 md:mx-7.5">
        <h4 className="reveal">
          {degree}, {school}, {city}, {country}
        </h4>
        <p className="reveal text-xs">{date ? date : "current"}</p>
        <p ref={descriptionRef} className="md:reveal m-2.5">
          {description}
        </p>
      </div>
    </div>
  );
};
