/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";

import { useState, useEffect, useRef } from "react";

const outerEyeSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 192c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
  </svg>
);

const sizeEye = 200;
const sizeInnerEye = sizeEye / 2.5;
const borderInnerEye = 10;
const posInnerEye = sizeEye / 2 - sizeInnerEye / 2;
const maxInnerMovement = sizeInnerEye / 6;

const EyeFollows = () => {
  const innerEyeRef = useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  function moveEye(): SerializedStyles {
    const innerEyeRect = innerEyeRef.current?.getBoundingClientRect();
    if (!innerEyeRect) return css``;

    const eyePosition = {
      x: innerEyeRect.left + innerEyeRect.width / 2,
      y: innerEyeRect.top + innerEyeRect.height / 2,
    };

    const directionToLook = {
      x: mousePosition.x - eyePosition.x,
      y: mousePosition.y - eyePosition.y,
    };

    if (directionToLook.x > 0) {
      directionToLook.x = Math.min(directionToLook.x, maxInnerMovement);
    } else {
      directionToLook.x = Math.max(directionToLook.x, -maxInnerMovement);
    }

    if (directionToLook.y > 0) {
      directionToLook.y = Math.min(directionToLook.y, maxInnerMovement);
    } else {
      directionToLook.y = Math.max(directionToLook.y, -maxInnerMovement);
    }

    return css`
      transform: translate(${directionToLook.x}px, ${directionToLook.y}px);
    `;
  }

  return (
    <div
      css={css`
        position: relative;

        width: ${sizeEye}px;
        height: ${sizeEye}px;

        border-radius: 50%;

        :hover > div {
          transform: translate(0px, 0px);
        }

        @media (prefers-color-scheme: dark) {
          svg {
            fill: white;

            width: ${sizeEye}px;
            height: ${sizeEye}px;
          }
        }
      `}
    >
      {outerEyeSvg}

      <div
        ref={innerEyeRef}
        css={css`
          position: absolute;

          top: ${posInnerEye}px;
          left: ${posInnerEye}px;

          width: ${sizeInnerEye}px;
          height: ${sizeInnerEye}px;

          border: ${borderInnerEye}px solid;
          border-color: white;
          border-radius: 50%;

          ${moveEye()}
          transition: transform 1s ease;

          @media (prefers-color-scheme: dark) {
            border-color: black;
          }
        `}
      />
    </div>
  );
};

export default EyeFollows;
