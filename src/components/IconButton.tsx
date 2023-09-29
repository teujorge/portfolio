"use client";

import { Position } from "@/utils/position";
import Link from "next/link";

export const IconButton = ({
  src,
  href,
  size = 50,
  desc,
  descPos = Position.bot,
}: {
  src: JSX.Element;
  href: string;
  size?: number;
  desc: string;
  descPos?: Position;
}) => {
  // size = padding + width
  // |---- size ----|
  // |--|        |--| paddings
  //    |--------|    width

  // let, w = .5 size
  const width = size * 0.5;
  // thus, p = .25 size
  const padding = size * 0.25;

  let descriptionPositionStyle = {};

  switch (descPos) {
    case Position.top:
      descriptionPositionStyle = {
        bottom: size + 10,
        left: -size / 2,
      };
      break;

    case Position.bot:
      descriptionPositionStyle = {
        top: size + 10,
        left: -size / 2,
      };
      break;

    case Position.left:
      descriptionPositionStyle = { top: 0, right: size + 10 };
      break;

    case Position.right:
      descriptionPositionStyle = { top: 0, left: size + 10 };
      break;
  }

  const iconElement = (
    <div
      className="relative flex justify-center items-center m-1 bg-white transition-colors duration-300 hover:bg-black dark:bg-black dark:hover:bg-white rounded-full"
      style={{
        padding: padding,
        width: size,
        height: size,
      }}
    >
      {/* icon */}
      <div
        className="fill-current text-black transition-colors duration-300 hover:text-white dark:text-white dark:hover:text-black"
        style={{ width: width, height: width }}
      >
        {src}
      </div>

      {/* label */}
      <div
        className="pointer-events-none absolute text-center px-2 w-24 opacity-0 rounded-[var(--border-radius)] text-[var(--background-color)] bg-[var(--foreground-color)] transition-opacity duration-300 shadow-md"
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
