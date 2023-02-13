import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

export const IconButton = ({
  src,
  href,
  size = 50,
}: {
  src: JSX.Element;
  href: string;
  size?: number;
}) => {
  // size = padding + width
  // |---- size ----|
  // |--|        |--| paddings
  //    |--------|    width

  // let, w = .5 size
  const width = size * 0.5;
  // thus, p = .25 size
  const padding = size * 0.25;

  return (
    <a href={href} target="_blank" rel="noreferrer">
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;

          margin: 4px !important;
          padding: ${padding}px;
          width: ${size}px;
          height: ${size}px;

          border-radius: 50%;
          background-color: white;
          filter: invert(1);
          transition: filter 0.2s ease;

          svg {
            z-index: 100;
            width: ${width}px;
            height: ${width}px;
          }

          :hover {
            filter: invert(0);
          }

          @media (prefers-color-scheme: light) {
            filter: invert(0);

            :hover {
              filter: invert(1);
            }
          }
        `}
      >
        {src}
      </div>
    </a>
  );
};
