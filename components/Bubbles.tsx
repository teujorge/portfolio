/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useState, useEffect, UIEvent } from "react";

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

type BubblesProps = {
  quantity?: number;
  blur?: number;
  minSpeed?: number;
  maxSpeed?: number;
  minSize?: number;
  maxSize?: number;
};

const Bubbles = ({
  quantity = 5,
  blur = 90, // px
  minSpeed = 10, // px/s
  maxSpeed = 20, // px/s
  minSize = 5, // window width %
  maxSize = 50, // window width %,
}: BubblesProps) => {
  // BUBBlE
  const Bubble = ({ screenSize }: { screenSize: Position }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [isFirstTime, setIsFirstTime] = useState(true);

    const [initialPosition, setInitialPosition] = useState<Position>({
      x: -maxSize - blur,
      y: -maxSize - blur,
    });

    const [finalPosition, setFinalPosition] = useState<Position>({
      x: -maxSize - blur,
      y: -maxSize - blur,
    });

    const [color, setColor] = useState<ColorRGBA>({
      r: 0,
      g: 0,
      b: 0,
      a: 0,
    });

    const [size, setSize] = useState<number>(-1);
    const [speed, setSpeed] = useState<number>(-1);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }

      if (size === -1 || speed === -1) {
        resetBubble(true);
        return;
      }

      let position = { ...initialPosition };
      const direction = {
        x: finalPosition.x - initialPosition.x,
        y: finalPosition.y - initialPosition.y,
      };
      const directionLength = Math.sqrt(direction.x ** 2 + direction.y ** 2);
      direction.x /= directionLength;
      direction.y /= directionLength;

      if (Number.isNaN(direction.x)) {
        direction.x = 1;
      }
      if (Number.isNaN(direction.y)) {
        direction.y = 1;
      }

      const animId = window.requestAnimationFrame(function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 60 fps
        position.x += (direction.x * speed) / 60;
        position.y += (direction.y * speed) / 60;

        if (position.y + size < 0) {
          resetBubble();
          return;
        }

        ctx.beginPath();
        ctx.arc(position.x, position.y, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
        ctx.filter = `blur(${blur}px)`;
        ctx.fill();

        window.requestAnimationFrame(animate);
      });

      return () => {
        window.cancelAnimationFrame(animId);
      };
    }, [initialPosition, finalPosition, size, color, speed]);

    function resetBubble(firstReset = false) {
      setSize(randSize());
      setSpeed(randSpeed());
      setColor(randColor());

      const firstTimeResetting = firstReset && isFirstTime;
      const newInitialPosition = randInitialPosition(firstTimeResetting);
      setInitialPosition({ ...newInitialPosition });

      const newFinalPosition = randFinalPosition(newInitialPosition);
      setFinalPosition({ ...newFinalPosition });

      if (!firstReset && isFirstTime) setIsFirstTime(false);
    }

    function widthPercentageToPixels(p: number): number {
      return (window.innerWidth * p) / 100;
    }

    function randInitialPosition(firstTime: boolean): Position {
      const pos = {
        x:
          Math.random() * window.innerWidth -
          widthPercentageToPixels(maxSize) / 2,
        y: window.innerHeight + blur + widthPercentageToPixels(maxSize) / 2,
      };
      if (firstTime) pos.y = Math.random() * window.innerHeight;

      return pos;
    }

    function randFinalPosition(origin: Position): Position {
      const pos = {
        x:
          Math.random() * window.innerWidth -
          widthPercentageToPixels(maxSize) / 2 -
          origin.x,
        y:
          -1 *
          (origin.y +
            Math.random() * widthPercentageToPixels(maxSize) +
            widthPercentageToPixels(maxSize) +
            blur),
      };
      return pos;
    }

    function randSpeed(): number {
      const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
      return speed > 0 ? speed : 1;
    }

    function randSize(): number {
      const percentage = Math.random() * (maxSize - minSize) + minSize;
      const size = (window.innerWidth * percentage) / 100;
      return size >= 0 ? size : 0;
    }

    function randColor(): ColorRGBA {
      const minOpacity = 0.3;
      const maxOpacity = 0.7;

      return {
        r: Math.random() * 200,
        g: Math.random() * 200,
        b: Math.random() * 200,
        a: Math.random() * (maxOpacity - minOpacity) + minOpacity,
      };
    }

    return (
      <canvas
        ref={canvasRef}
        width={screenSize.x}
        height={screenSize.y}
        css={css`
          z-index: -5;
          position: fixed;
          top: 0;
          left: 0;
        `}
      />
    );
  };

  // BUBBLE

  const [screenSize, setScreenSize] = useState({ x: 0, y: 0 });
  useEffect(() => {
    handleResize();

    function handleResize() {
      setScreenSize({ x: window.innerWidth, y: window.innerHeight });
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let bubbles: JSX.Element[] = [];

  for (let i = 0; i < quantity; i++) {
    bubbles.push(
      <Bubble key={`floating-bubble-${i}`} screenSize={screenSize} />
    );
  }

  return <>{bubbles.map((b) => b)}</>;
};

export default Bubbles;
