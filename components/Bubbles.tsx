/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";

export function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

enum ScreenCorner {
  tl = "top left",
  tr = "top right",
  bl = "bottom left",
  br = "bottom right",
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
  from = ScreenCorner.bl,
  to = ScreenCorner.tr,
  quantity = 5,
  blur = 50, // px
  timeInterval = 100, // ms
  maxSpeed = 50,
  minSpeed = 2,
  minSize = 50, // px
  maxSize = 200, // px
}: {
  from?: ScreenCorner;
  to?: ScreenCorner;
  quantity?: number;
  blur?: number;
  timeInterval?: number;
  maxSpeed?: number;
  minSpeed?: number;
  minSize?: number;
  maxSize?: number;
}) => {
  // a single bubble
  const Bubble = ({ bubbleId }: { bubbleId: string }) => {
    const [origin, setOrigin] = useState<Position>({
      x: -maxSize,
      y: -maxSize,
    });
    const [speed, setSpeed] = useState<number>(0);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [angle, setAngle] = useState<number>(45);
    const [size, setSize] = useState<number>(0);
    const [color, setColor] = useState<ColorRGBA>({ r: 0, g: 0, b: 0, a: 0 });

    const [reseting, setReseting] = useState(true);

    useEffect(() => {
      handleBallReset();
    }, [reseting]);

    useEffect(() => {
      handlePositionChange();
    }, [position]);

    function handleBallReset() {
      if (!reseting) return;

      setSize(randSize());
      setSpeed(randSpeed());
      setColor(randColor());
      setOrigin({ ...randOrigin() });
      setPosition({ ...resetPosition() });

      setReseting(false);
    }

    function handlePositionChange() {
      if (reseting) return;

      // reset ball
      if (!ballIsInView()) setReseting(true);
      // move ball
      else {
        delay(timeInterval).then(() => {
          let _position = position;
          _position.x += Math.cos(angle * (Math.PI / 180)) * speed;
          _position.y -= Math.sin(angle * (Math.PI / 180)) * speed;
          setPosition({ ..._position });

          let _angle = angle + (Math.random() - 0.5) * 5;
          if (_angle > 90) setAngle(90);
          else if (_angle < 0) setAngle(0);
          else setAngle(_angle);
        });
      }
    }

    function ballIsInView(): boolean {
      //   console.log(
      //     "X:",
      //     position.x + origin.x,
      //     window.innerWidth + maxSize * 4,
      //     "Y:",
      //     -position.y,
      //     window.innerHeight + maxSize * 4
      //   );

      // check X
      if (position.x + origin.x > window.innerWidth + maxSize * 4) {
        console.log("ball is outside X");
        return false;
      }
      // check Y
      else if (-position.y > window.innerHeight + maxSize * 4) {
        console.log("ball is outside Y");
        return false;
      }
      return true;
    }

    function randOrigin(): Position {
      return {
        x: Math.round(
          Math.random() * (window.innerWidth * 3) - window.innerWidth
        ),
        y: 0,
      };
    }

    function resetPosition(): Position {
      return {
        x: -maxSize,
        y: maxSize,
      };
    }

    function randSize(): number {
      return Math.round(Math.random() * maxSize + minSize);
    }

    function randColor(): ColorRGBA {
      return {
        r: Math.round(Math.random() * 255),
        g: Math.round(Math.random() * 255),
        b: Math.round(Math.random() * 255),
        a: Math.random() - 0.25,
      };
    }

    function randSpeed(): number {
      return Math.round(Math.random() * maxSpeed + minSpeed);
    }

    return (
      <div
        id={bubbleId}
        css={css`
          z-index: -5;
          position: fixed;
          bottom: ${origin.x}px;
          left: ${origin.y}px;

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

          transform: translate(${position.x}px, ${position.y}px);
          transition: transform ${timeInterval}ms linear;
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
