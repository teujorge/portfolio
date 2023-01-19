/** @jsxImportSource @emotion/react */

import Image from "next/image";
import { css } from "@emotion/react";

export const IconButton = ({
  src,
  alt,
  href,
  size = 50,
}: {
  src: any;
  alt: string;
  href: string;
  size?: number;
}) => {
  // size = padding + width
  const width = size / 2;
  const padding = size / 4;

  return (
    <a
      css={css({
        margin: "4px",
        padding: `${padding}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        backgroundColor: "transparent",
        transition: "background-color 0.2s ease",

        "&:hover": {
          backgroundColor: "white",
        },

        "@media (prefers-color-scheme: dark)": {
          filter: "invert()",
        },
      })}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <Image src={src} alt={alt} width={width} height={width} />
    </a>
  );
};
