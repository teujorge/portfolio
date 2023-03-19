/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useState, useEffect, UIEvent } from "react";

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
};

class Bubble {
  blur: number;
  size!: number;
  speed!: number;

  minSize: number;
  maxSize: number;

  minSpeed: number;
  maxSpeed: number;

  color!: ColorRGBA;

  position!: Vector;
  destination!: Vector;

  constructor({ blur, minSpeed, maxSpeed, minSize, maxSize }: BubbleParams) {
    this.blur = blur;
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
    return (window.innerWidth * p) / 100;
  }

  randInitialPosition(firstTime: boolean): Vector {
    const pos = {
      x: Math.random() * window.innerWidth,
      y:
        window.innerHeight +
        this.blur +
        this.widthPercentageToPixels(this.maxSize) / 2,
    };
    if (firstTime) pos.y = Math.random() * window.innerHeight;

    return pos;
  }

  randFinalPosition(origin: Vector): Vector {
    const pos = {
      x: Math.random() * window.innerWidth,
      y:
        -1 *
        (origin.y +
          Math.random() * this.widthPercentageToPixels(this.maxSize) +
          this.widthPercentageToPixels(this.maxSize) +
          this.blur),
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
    const size = (window.innerWidth * percentage) / 100;
    return size >= 0 ? size : 0;
  }

  randColor(): ColorRGBA {
    const minOpacity = 0.3;
    const maxOpacity = 0.7;

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
};

const Bubbles = ({
  quantity = 6,
  blur = 90, // px
  minSpeed = 5, // px/s
  maxSpeed = 20, // px/s
  minSize = 5, // window width %
  maxSize = 50, // window width %,
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

    const floatAnimId = window.requestAnimationFrame(function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((bubble) => {
        // check if in view
        if (bubble.position.y + bubble.size < 0) {
          bubble.resetBubble();
          return;
        }

        // move bubble up
        const fps = 60;
        const direction = bubble.getMoveDirection();
        bubble.position.x += (direction.x * bubble.speed) / fps;
        bubble.position.y += (direction.y * bubble.speed) / fps;

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
        // ctx.filter = `blur(${blur}px)`;
        ctx.fill();
      });

      window.requestAnimationFrame(animate);
    });

    handleResize();
    function handleResize() {
      setScreenSize({ x: window.innerWidth, y: window.innerHeight });
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(floatAnimId);
      window.removeEventListener("resize", handleResize);
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
