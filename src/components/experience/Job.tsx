"use client";

import { useExpansion } from "@/utils/useExpansion";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export const Job = ({
  title,
  employer,
  start,
  end,
  city,
  desc,
}: {
  title: string;
  employer?: string;
  start?: string;
  end?: string;
  city?: string;
  desc: string[];
}) => {
  const descriptionRef = useRef<HTMLUListElement>(null);
  const descriptionContainerRef = useRef<HTMLDivElement>(null);

  const toggleExpansion = useExpansion(descriptionRef.current!);

  useEffect(() => {
    const descElem = descriptionRef.current!;
    gsap.set(descElem, { height: 0, opacity: 0 });
  }, []);

  const date = start
    ? end
      ? `${start} - ${end}`
      : `${start}`
    : end
    ? `${end}`
    : "current";

  return (
    <div
      onMouseEnter={toggleExpansion}
      onMouseLeave={toggleExpansion}
      ref={descriptionContainerRef}
      className="reveal flex items-center justify-center border-l-0 border-[var(--primary-color)] md:m-4 md:p-2 md:border-l-2"
    >
      <div className="reveal flex flex-col items-start text-left mt-2.5 mb-2.5 md:ml-7.5 md:mr-7.5">
        <h4 className="font-black">
          {title}
          {employer ? `, ${employer}` : ""}
          {city ? `, ${city}` : ""}
        </h4>
        <p className="text-xs mt-1">{date ? date : "current"}</p>
        <ul ref={descriptionRef}>
          {desc.map((description, index) => (
            <div
              key={`description-${title}-${index}`}
              className="mt-5 ml-6 md:reveal"
            >
              <li className="list-disc">
                <p>{description}</p>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
