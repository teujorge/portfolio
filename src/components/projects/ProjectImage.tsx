import { StaticImageData } from "next/image";
import { RefObject } from "react";
import { ProjectImageMobile } from "./ProjectImageMobile";
import { ProjectImageDesktop } from "./ProjectImageDesktop";

export type ProjectMediaProps = {
  media: { src: StaticImageData; alt: string };
};

export type ProjectImageProps = ProjectMediaProps & {
  descRef: RefObject<HTMLDivElement>;
  wrapperRef: RefObject<HTMLDivElement>;
};

export const ProjectImage = ({
  descRef,
  wrapperRef,
  media,
  isMobile,
}: ProjectImageProps & { isMobile: boolean }) => {
  if (isMobile) return <ProjectImageMobile media={media} />;
  return (
    <ProjectImageDesktop
      media={media}
      descRef={descRef}
      wrapperRef={wrapperRef}
    />
  );
};
