/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useEffect, useRef, useState } from "react";

export function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

type Position = {
  x: number;
  y: number;
};

type ColorRGBA = {
  r: number;
  g: number;
  b: number;
  a: number;
};

const Bubbles = ({
  quantity = 10,
  blur = 100, // px
  minSize = 100, // px
  maxSize = 500, // px
}: {
  quantity?: number;
  blur?: number;
  minSize?: number;
  maxSize?: number;
}) => {
  // a single bubble
  const Bubble = ({ bubbleId }: { bubbleId: string }) => {
    const [origin, setOrigin] = useState<Position>({
      x: 0,
      y: -maxSize * 2,
    });
    const [finalPosition, setFinalPosition] = useState<Position>({
      x: -maxSize,
      y: -maxSize,
    });
    const [angle, setAngle] = useState<number>(45);
    const [size, setSize] = useState<number>(0);
    const [color, setColor] = useState<ColorRGBA>({ r: 0, g: 0, b: 0, a: 0 });

    const bubbleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      bubbleRef.current!.addEventListener(
        "animationiteration",
        function () {
          resetBubble();
        },
        false
      );
    }, []);

    function resetBubble() {
      setSize(randSize());
      setColor(randColor());
      setAngle(randAngle());
      setOrigin({ ...randOrigin() });
      setFinalPosition({ ...randFinalPosition() });
    }

    // using bottom pos
    function randOrigin(): Position {
      return {
        x: Math.round(Math.random() * window.innerWidth),
        y: Math.round(Math.random() * -maxSize * 5) - maxSize,
      };
    }

    // using translate
    function randFinalPosition(): Position {
      return {
        x: Math.round(
          Math.random() * window.innerWidth - window.innerWidth / 2
        ),
        y: Math.round(Math.random() * maxSize * 3) + window.innerHeight,
      };
    }

    function randSize(): number {
      return Math.round(Math.random() * maxSize + minSize);
    }

    function randColor(): ColorRGBA {
      return {
        r: Math.round(Math.random() * 200),
        g: Math.round(Math.random() * 200),
        b: Math.round(Math.random() * 200),
        a: Math.random() - 0.25,
      };
    }

    function randAngle(): number {
      return Math.round(Math.random() * 90);
    }

    const floatAnim = keyframes`
    0% {
        transform: translateY(0px);
    }
    100% {
        transform: translateY(${-2000 + origin.y}px);
    }
    `;

    // v = d/t
    const animTime =
      size === 0 ? 250 : Math.round(Math.random() * 20 + 75) * 1000;
    console.log(animTime);

    return (
      <div
        id={bubbleId}
        ref={bubbleRef}
        css={css`
          z-index: -5;
          position: fixed;
          bottom: ${origin.y}px;
          left: ${origin.x}px;

          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background-color: rgba(
            ${color.r},
            ${color.g},
            ${color.b},
            ${color.a}
          );

          filter: blur(${blur}px);

          animation: ${floatAnim} ${animTime}ms linear infinite;
        `}
      />
    );
  };

  let bubbles = [];
  for (let i = 0; i < quantity; i++) {
    bubbles.push(
      <Bubble
        key={`floating-bubble-${i}`}
        bubbleId={`floating-bubble-id-${i}`}
      />
    );
  }

  return <>{bubbles.map((b) => b)}</>;
};

export default Bubbles;
