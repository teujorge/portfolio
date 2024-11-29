import assert from "assert";
import { StaticImageData } from "next/image";
import { RefObject } from "react";
import { ProjectImageDesktop } from "./ProjectImageDesktop";
import { ProjectImageMobile } from "./ProjectImageMobile";

export type ProjectMediaProps = {
  media: { src: StaticImageData; alt: string } | undefined;
  children: React.ReactNode | undefined;
};

export type ProjectImageProps = ProjectMediaProps & {
  descRef: RefObject<HTMLDivElement | null>;
  wrapperRef: RefObject<HTMLDivElement | null>;
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
