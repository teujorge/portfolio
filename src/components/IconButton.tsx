"use client";

import { Position } from "@/utils/position";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const IconButton = ({
  src,
  href,
  desc,
  descPos = Position.bot,
}: {
  src: JSX.Element;
  href: string;
  desc: string;
  descPos?: Position;
}) => {
  const [descriptionPositionStyle, setDescriptionPositionStyle] = useState({});

  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (iconRef.current) {
      const { offsetWidth, offsetHeight } = iconRef.current;

      let newStyle = {};
      const labelPadding = 4;

      switch (descPos) {
        case Position.top:
          newStyle = {
            bottom: offsetHeight,
            left: -offsetWidth / 2,
          };
          break;
        case Position.bot:
          newStyle = {
            top: offsetHeight,
            left: -offsetWidth / 2,
          };
          break;
        case Position.left:
          newStyle = {
            top: `calc(50% - ${offsetHeight / 2}px)`,
            right: offsetWidth + labelPadding,
          };
          break;
        case Position.right:
          newStyle = {
            top: `calc(50% - ${offsetHeight / 2}px)`,
            left: offsetWidth + labelPadding,
          };
          break;
        default:
          throw new Error(`Invalid position: ${descPos}`);
      }
      setDescriptionPositionStyle(newStyle);
    }
  }, [descPos]);

  const iconElement = (
    <div
      ref={iconRef}
      className="icon-button relative flex justify-center items-center m-1 p-3 bg-white duration-300 dark:bg-black rounded-full transition-all"
    >
      {/* icon */}
      <div className="fill-current text-black duration-300 dark:text-white">
        {src}
      </div>

      {/* label */}
      <div
        className="z-50 icon-button-label pointer-events-none absolute text-center my-1 p-2 w-24 rounded-[var(--border-radius)] text-white bg-black"
        style={descriptionPositionStyle}
      >
        {desc}
      </div>
    </div>
  );

  if (href.includes("#")) {
    return <Link href={href}>{iconElement}</Link>;
  }

  if (href.includes("resume") || href.includes("#")) {
    return (
      <Link href={href} target="_blank" rel="noreferrer">
        {iconElement}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer">
      {iconElement}
    </a>
  );
};
