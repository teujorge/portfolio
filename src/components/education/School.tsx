"use client";

import { useExpansion } from "@/utils/useExpansion";
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

  const toggleExpansion = useExpansion(descriptionRef.current!);

  useEffect(() => {
    const descElem = descriptionRef.current!;
    gsap.set(descElem, { height: 0, opacity: 0 });
  }, []);

  return (
    <div
      onMouseEnter={toggleExpansion}
      onMouseLeave={toggleExpansion}
      ref={descriptionContainerRef}
      className="reveal flex flex-row items-center justify-center border-[var(--primary-color)] md:m-4 md:p-2 md:border-r-2"
    >
      <div className="flex flex-col justify-center items-start my-2.5 md:mx-7.5">
        <h4 className="reveal font-black text-right w-full">
          {degree}, {school}, {city}, {country}
        </h4>
        <p className="reveal text-xs text-right w-full">
          {date ? date : "current"}
        </p>
        <p ref={descriptionRef} className="md:reveal m-2.5">
          {description}
        </p>
      </div>
    </div>
  );
};
