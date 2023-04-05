/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export enum DescPos {
  top = "top",
  bot = "bottom",
  left = "left",
  right = "right",
}

export const IconButton = ({
  src,
  href,
  size = 50,
  desc,
  descPos = DescPos.bot,
}: {
  src: JSX.Element;
  href: string | Function;
  size?: number;
  desc: string;
  descPos?: DescPos;
}) => {
  // size = padding + width
  // |---- size ----|
  // |--|        |--| paddings
  //    |--------|    width

  // let, w = .5 size
  const width = size * 0.5;
  // thus, p = .25 size
  const padding = size * 0.25;

  let descriptionPositionStyle = css``;

  switch (descPos) {
    case DescPos.top:
      descriptionPositionStyle = css`
        bottom: ${size + 10}px;
        left: ${-size / 2}px;
      `;
      break;

    case DescPos.bot:
      descriptionPositionStyle = css`
        top: ${size + 10}px;
        left: ${-size / 2}px;
      `;
      break;

    case DescPos.left:
      descriptionPositionStyle = css`
        top: 0px;
        right: ${size + 10}px;
      `;
      break;

    case DescPos.right:
      descriptionPositionStyle = css`
        top: 0px;
        left: ${size + 10}px;
      `;
      break;
  }

  const iconElement = (
    <div
      css={css`
        position: relative;

        display: flex;
        justify-content: center;
        align-items: center;

        margin: 4px !important;
        padding: ${padding}px;
        width: ${size}px;
        height: ${size}px;

        border-radius: 50%;
        background-color: black;

        transition: background-color 0.2s ease;

        svg {
          z-index: 2;
          width: ${width}px;
          height: ${width}px;
          fill: white;
          transition: fill 0.2s ease;
        }

        :hover {
          background-color: white;

          svg {
            fill: black;
          }

          div {
            opacity: 1;
          }
        }

        @media (prefers-color-scheme: light) {
          background-color: white;

          svg {
            fill: black;
          }

          :hover {
            background-color: black;

            svg {
              fill: white;
            }
          }
        }
      `}
    >
      {/* icon */}
      {src}

      {/* label */}
      <div
        css={css`
          pointer-events: none;
          position: absolute;
          text-align: center;

          padding: 8px;
          width: 100px;

          opacity: 0;
          border-radius: var(--border-radius);
          color: var(--background-color);
          background-color: var(--foreground-color);
          transition: opacity 0.2s ease;

          box-shadow: 0px 0px 8px var(--shadow-color);

          ${descriptionPositionStyle}
        `}
      >
        {desc}
      </div>
    </div>
  );

  if (typeof href === "string") {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {iconElement}
      </a>
    );
  }

  return (
    <div
      css={css`
        cursor: pointer;
      `}
      onClick={() => href()}
    >
      {iconElement}
    </div>
  );
};
