/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useState, useEffect } from "react";

type Vector = {
  x: number;
  y: number;
};

type ColorRGBA = {
  r: number;
  g: number;
  b: number;
  a: number;
};

type BubbleParams = {
  blur: number;
  minSpeed: number;
  maxSpeed: number;
  minSize: number;
  maxSize: number;
  colors?: ColorRGBA[];
};

class Bubble {
  blur: number; // px
  size!: number; // px
  speed!: number; // p/s
  colors?: ColorRGBA[]; // list of rgba

  minSize: number; // % of width
  maxSize: number; // % of width

  minSpeed: number; // px/s
  maxSpeed: number; // px/s

  color!: ColorRGBA; // rgba

  position!: Vector; // spawn point
  destination!: Vector; // move vector

  constructor({
    blur,
    minSpeed,
    maxSpeed,
    minSize,
    maxSize,
    colors,
  }: BubbleParams) {
    this.blur = blur;
    this.colors = colors;

    this.minSize = minSize;
    this.maxSize = maxSize;

    this.minSpeed = minSpeed;
    this.maxSpeed = maxSpeed;

    this.resetBubble(true);
  }

  resetBubble(firstReset = false) {
    this.size = this.randSize();
    this.speed = this.randSpeed();
    this.color = this.randColor();

    const newInitialPosition = this.randInitialPosition(firstReset);
    this.position = newInitialPosition;

    const newFinalPosition = this.randFinalPosition(newInitialPosition);
    this.destination = newFinalPosition;
  }

  widthPercentageToPixels(p: number): number {
    const pixels = (innerWidth * p) / 100;
    return pixels;
  }

  randInitialPosition(firstTime: boolean): Vector {
    const pos = {
      x: Math.random() * innerWidth,
      y: innerHeight + (this.size + this.blur) / 2,
    };

    if (firstTime) pos.y = Math.random() * innerHeight;

    return pos;
  }

  randFinalPosition(origin: Vector): Vector {
    const pos = {
      x: Math.random() * innerWidth,
      y: -origin.y,
    };

    return pos;
  }

  randSpeed(): number {
    const speed =
      Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed;
    return speed > 0 ? speed : 1;
  }

  randSize(): number {
    const percentage =
      Math.random() * (this.maxSize - this.minSize) + this.minSize;
    return percentage >= 0 ? this.widthPercentageToPixels(percentage) : 0;
  }

  randColor(): ColorRGBA {
    if (this.colors) {
      let randIndex = Math.round(Math.random() * this.colors.length - 1);
      if (randIndex < 0) randIndex = 0;
      return this.colors[randIndex];
    }

    const minOpacity = 0.4;
    const maxOpacity = 0.8;

    return {
      r: Math.random() * 200,
      g: Math.random() * 200,
      b: Math.random() * 200,
      a: Math.random() * (maxOpacity - minOpacity) + minOpacity,
    };
  }

  getMoveDirection(): Vector {
    const direction = {
      x: this.destination.x - this.position.x,
      y: this.destination.y - this.position.y,
    };

    const directionLength = Math.sqrt(direction.x ** 2 + direction.y ** 2);
    direction.x /= directionLength;
    direction.y /= directionLength;

    return direction;
  }
}

type BubblesProps = {
  quantity?: number;
  blur?: number;
  minSpeed?: number;
  maxSpeed?: number;
  minSize?: number;
  maxSize?: number;
  colors?: ColorRGBA[];
};

const Bubbles = ({
  quantity = 5,
  blur = 100, // px
  minSpeed = 5, // px/s
  maxSpeed = 25, // px/s
  minSize = 15, // window width %
  maxSize = 55, // window width %,
  colors,
}: BubblesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [screenSize, setScreenSize] = useState({ x: 0, y: 0 });
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    let bubbles: Bubble[] = [];
    for (let i = 0; i < quantity; i++) {
      bubbles.push(
        new Bubble({
          blur: blur,
          minSpeed: minSpeed,
          maxSpeed: maxSpeed,
          minSize: minSize,
          maxSize: maxSize,
          colors: colors,
        })
      );
    }

    setBubbles([...bubbles]);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let startTime = 0;
    const floatAnimId = requestAnimationFrame(function animate(currentTime) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dt = (currentTime - startTime) / 1000;

      bubbles.forEach((bubble) => {
        // check if in view
        const bubbleY = bubble.position.y + (bubble.size + bubble.blur) / 2;
        if (bubbleY < 0) {
          bubble.resetBubble();
          return;
        }

        // move bubble up
        const direction = bubble.getMoveDirection();
        bubble.position.x += direction.x * bubble.speed * dt;
        bubble.position.y += direction.y * bubble.speed * dt;

        // draw bubble
        ctx.beginPath();
        ctx.arc(
          bubble.position.x,
          bubble.position.y,
          bubble.size / 2,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(${bubble.color.r}, ${bubble.color.g}, ${bubble.color.b}, ${bubble.color.a})`;
        ctx.fill();
      });

      startTime = currentTime;
      requestAnimationFrame(animate);
    });

    handleResize();
    function handleResize() {
      setScreenSize({ x: innerWidth, y: innerHeight });
    }
    addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(floatAnimId);
      removeEventListener("resize", handleResize);
    };
  }, [bubbles]);

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
        filter: blur(${blur}px);
      `}
    />
  );
};

export default Bubbles;
