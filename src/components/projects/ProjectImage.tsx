import assert from "assert";
import { RefObject } from "react";
import { StaticImageData } from "next/image";
import { ProjectImageMobile } from "./ProjectImageMobile";
import { ProjectImageDesktop } from "./ProjectImageDesktop";

export type ProjectMediaProps = {
  media: { src: StaticImageData; alt: string } | undefined;
  children: React.ReactNode | undefined;
};

export type ProjectImageProps = ProjectMediaProps & {
  descRef: RefObject<HTMLDivElement>;
  wrapperRef: RefObject<HTMLDivElement>;
  className?: string;
};

export const ProjectImage = ({
  descRef,
  wrapperRef,
  media,
  children,
  isMobile,
  className,
}: ProjectImageProps & { isMobile: boolean }) => {
  assert(media || children, "media or children must be provided");

  if (isMobile)
    return <ProjectImageMobile media={media}>{children}</ProjectImageMobile>;

  return (
    <ProjectImageDesktop
      media={media}
      descRef={descRef}
      wrapperRef={wrapperRef}
      className={className}
    >
      {children}
    </ProjectImageDesktop>
  );
};
