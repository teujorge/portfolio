import Image from "next/image";
import React from "react";
import { ProjectMediaProps } from "./ProjectImage";

export const ProjectImageMobile = ({ media, children }: ProjectMediaProps) => {
  const className =
    "reveal mt-4 w-fit h-fit object-contain overflow-hidden rounded-[var(--border-radius)] shadow-md";
  const style: React.CSSProperties = {
    boxShadow: "0px 0px 10px var(--shadow-color)",
  };

  return media ? (
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
  );
};
