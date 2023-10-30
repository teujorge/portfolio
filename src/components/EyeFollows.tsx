"use client";

import Link from "next/link";
import { CSSProperties, useEffect, useRef } from "react";

const outerEyeSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 192c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
  </svg>
);

type Vector = { x: number; y: number };

const EyeFollows = ({ size }: { size: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const SF = 2;

  useEffect(() => {
    const canvasContext = canvasRef.current?.getContext("2d");
    if (!canvasContext) return;

    const _size = size * SF;

    // eye part sizes
    const eye = {
      radius: _size / 3,
      iris: _size / 7,
      pupil: _size / 10,
      reflection: _size / 23,
    };

    const origin = { x: _size / 2, y: _size / 2 };

    const maxDistance = _size / 7;
    const limMinX = origin.x - maxDistance;
    const limMaxX = origin.x + maxDistance;
    const limMinY = origin.y - maxDistance;
    const limMaxY = origin.y + maxDistance;

    const eyePos: Vector = { ...origin };
    const mousePos: Vector = { ...origin };

    // add mouse move listener to whole page
    addEventListener("mousemove", (e) => {
      if (!canvasRef || !canvasRef.current) return;

      // make mouse coords relative to the canvas  ignoring scroll in this case
      const bounds = canvasRef.current.getBoundingClientRect();
      const x = (e.pageX - bounds.left - scrollX) * SF;
      const y = (e.pageY - bounds.top - scrollY) * SF;

      mousePos.x = x;
      mousePos.y = y;
    });

    let startTime = 0;
    const eyeAnimId = requestAnimationFrame(function animate(currentTime) {
      if (!canvasRef || !canvasRef.current) return;

      const dt = (currentTime - startTime) / 100;

      canvasContext.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      // direction and distance between
      // where we need to be and where we are
      const move: Vector = {
        x: mousePos.x - eyePos.x,
        y: mousePos.y - eyePos.y,
      };
      let distance: number = Math.sqrt(move.x ** 2 + move.y ** 2);
      if (distance <= 0) distance = 1;
      const direction: Vector = {
        x: move.x / distance,
        y: move.y / distance,
      };

      if (distance > maxDistance * 2) {
        distance = maxDistance;
      }

      // move
      const speed = distance * 1.25;
      const dx = direction.x * speed * dt;
      const dy = direction.y * speed * dt;
      const newX = eyePos.x + dx;
      const newY = eyePos.y + dy;

      // x limit
      if (newX < limMinX) {
        eyePos.x = limMinX;
      } else if (newX > limMaxX) {
        eyePos.x = limMaxX;
      } else {
        eyePos.x = newX;
      }

      // y limit
      if (newY < limMinY) {
        eyePos.y = limMinY;
      } else if (newY > limMaxY) {
        eyePos.y = limMaxY;
      } else {
        eyePos.y = newY;
      }

      // css color vars
      const colorBg = getComputedStyle(canvasContext.canvas).getPropertyValue(
        "--background-color"
      );
      const colorFg = getComputedStyle(canvasContext.canvas).getPropertyValue(
        "--foreground-color"
      );

      // draw iris
      canvasContext.fillStyle = colorBg;
      canvasContext.beginPath();
      canvasContext.arc(eyePos.x, eyePos.y, eye.iris, 0, Math.PI * 2, false);
      canvasContext.fill();

      // draw pupil
      canvasContext.fillStyle = colorFg;
      canvasContext.beginPath();
      canvasContext.arc(eyePos.x, eyePos.y, eye.pupil, 0, Math.PI * 2, false);
      canvasContext.fill();

      // draw reflection
      canvasContext.fillStyle = colorBg;
      canvasContext.beginPath();
      canvasContext.arc(
        eyePos.x + eye.pupil - eye.iris - _size / 40,
        eyePos.y + eye.pupil - eye.iris - _size / 40,
        eye.reflection,
        0,
        Math.PI * 2,
        false
      );
      canvasContext.fill();

      // turn the clip off by restoring canvas state
      // canvasContext.restore();

      startTime = currentTime;
      requestAnimationFrame(animate);
    });

    return () => {
      cancelAnimationFrame(eyeAnimId);
    };
  }, [size]);

  const widthLash = 12;
  const heightLash = 32;
  const spacingLash = size / 5;

  const EYE_LASH_STYLE: CSSProperties = {
    zIndex: 0,
    position: "absolute",
    top: 0,
    left: 0,
    width: `${widthLash}px`,
    height: `${heightLash}px`,
    borderRadius: "var(--border-radius)",
    backgroundColor: "var(--foreground-color)",
    transformOrigin: "center",
  };

  return (
    <Link
      href="/easter-eggs"
      style={{
        position: "relative",
        width: size,
        height: size,
        transform: `translateY(${size / 3}px)`,
      }}
    >
      <div className="fill-[var(--foreground-color)] translate-y-2">
        {outerEyeSvg}
      </div>

      {/* eye lashes */}
      <>
        <div
          style={{
            ...EYE_LASH_STYLE,
            transform: `translateX(${
              (1 / 2) * spacingLash - widthLash / 2
            }px) translateY(1px) rotate(-45deg)`,
          }}
        />
        <div
          style={{
            ...EYE_LASH_STYLE,
            transform: `translateX(${
              (3 / 2) * spacingLash - widthLash / 2
            }px) translateY(-14px) rotate(-22deg)`,
          }}
        />
        <div
          style={{
            ...EYE_LASH_STYLE,
            transform: `translateX(${
              (5 / 2) * spacingLash - widthLash / 2
            }px) translateY(-20px) rotate(0deg)`,
          }}
        />
        <div
          style={{
            ...EYE_LASH_STYLE,
            transform: `translateX(${
              (7 / 2) * spacingLash - widthLash / 2
            }px) translateY(-14px) rotate(22deg)`,
          }}
        />
        <div
          style={{
            ...EYE_LASH_STYLE,
            transform: `translateX(${
              (9 / 2) * spacingLash - widthLash / 2
            }px) translateY(1px) rotate(45deg)`,
          }}
        />
      </>

      <canvas
        className="absolute top-0 left-0 w-full h-full"
        ref={canvasRef}
        id="canvas"
        width={`${size * SF}`}
        height={`${size * SF}`}
      />
    </Link>
  );
};

export default EyeFollows;
