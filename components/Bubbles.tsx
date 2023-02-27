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
  minSpeed = 50, // px/s
  maxSpeed = 100, // px/s
  minSize = 100, // px
  maxSize = 500, // px
}: {
  quantity?: number;
  blur?: number;
  minSpeed?: number;
  maxSpeed?: number;
  minSize?: number;
  maxSize?: number;
}) => {
  // a single bubble
  const Bubble = ({ bubbleId }: { bubbleId: string }) => {
    const [origin, setOrigin] = useState<Position>({
      x: -maxSize - blur,
      y: -maxSize - blur,
    });
    const [finalPosition, setFinalPosition] = useState<Position>({
      x: -maxSize - blur,
      y: -maxSize - blur,
    });

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

      const newOrigin = randOrigin();
      setOrigin({ ...newOrigin });

      const newFinalPosition = randFinalPosition(newOrigin);
      setFinalPosition({ ...newFinalPosition });
    }

    // using top pos
    function randOrigin(): Position {
      return {
        x: Math.round(Math.random() * window.innerWidth - maxSize / 2),
        y: window.innerHeight + blur,
      };
    }

    // using translate
    function randFinalPosition(origin: Position): Position {
      return {
        x: Math.round(Math.random() * window.innerWidth),
        y:
          -1 *
          (origin.y + Math.round(Math.random() * maxSize) + maxSize + blur),
      };
    }

    function randSpeed() {
      return Math.round(Math.random() * maxSpeed) + minSpeed + 1;
    }

    function randSize(): number {
      const _size = Math.round(Math.random() * maxSize + minSize);
      return _size > 0 ? _size : 1;
    }

    function randColor(): ColorRGBA {
      return {
        r: Math.round(Math.random() * 200),
        g: Math.round(Math.random() * 200),
        b: Math.round(Math.random() * 200),
        a: Math.random() - 0.25,
      };
    }

    function calcAnimTime() {
      if (size === 0) return 10;

      const dx = finalPosition.x - origin.x;
      const dy = finalPosition.y - origin.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const sToMs = 1000;
      // time = distance / speed
      const time = sToMs * (distance / randSpeed());
      console.log(time);
      return time;
    }

    const floatAnim = keyframes`
    0% {
        opacity: 1;
        transform: translate(0px, 0px);
    }

    98% {
        opacity: 1;
    }

    100% {
        opacity: 0;
        transform: translate(
          ${finalPosition.x - origin.x}px,
          ${finalPosition.y}px
        );
    }
    `;

    return (
      <div
        id={bubbleId}
        ref={bubbleRef}
        css={css`
          z-index: -5;
          position: fixed;
          top: ${origin.y}px;
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
          animation: ${floatAnim} ${calcAnimTime()}ms linear infinite;
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
