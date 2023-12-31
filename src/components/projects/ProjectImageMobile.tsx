import Image from "next/image";
import React from "react";

import { ProjectMediaProps } from "./ProjectImage";

export const ProjectImageMobile = ({ media }: ProjectMediaProps) => {
  return (
    <Image
      className="reveal mt-4 w-fit h-fit object-contain rounded-[var(--border-radius)] shadow-md"
      style={{
        boxShadow: "0px 0px 10px var(--shadow-color)",
      }}
      src={media.src}
      alt={media.alt}
      priority
    />
  );
};
