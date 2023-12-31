"use client";

import { useWindowSize } from "@/contexts/WindowSize";
import { useEffect, useRef, useState } from "react";
import { Boid } from "./boid";

type Coefficients = {
  alignment: number;
  cohesion: number;
  separation: number;
};

export function BoidSimulation({ onStop }: { onStop: () => void }) {
  const windowSize = useWindowSize();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [flock, setFlock] = useState<Boid[]>([]);

  const [coefficients, setCoefficients] = useState<Coefficients>({
    alignment: 1,
    cohesion: 1,
    separation: 1.25,
  });

  // === SETUP
  useEffect(() => {
    if (!canvasRef.current) return;
    if (flock.length > 0) return;
    if (windowSize.width === 0 || windowSize.height === 0) return;

    const _flock: Boid[] = [];
    for (let i = 0; i < 200; i++) {
      _flock.push(new Boid(canvasRef.current));
    }

    setFlock(_flock);
  }, [windowSize]);

  // === DRAW
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvasContext = canvasRef.current.getContext("2d");

    if (!canvasContext) return;

    // inject coefficients
    flock.forEach((boid) => {
      boid.alignmentCoefficient = coefficients.alignment;
      boid.cohesionCoefficient = coefficients.cohesion;
      boid.separationCoefficient = coefficients.separation;
    });

    // animation loop

    let animationFrameId: number;
    let lastRenderTime = performance.now();

    function animate(currentTime: number) {
      animationFrameId = requestAnimationFrame(animate);

      const dt = (currentTime - lastRenderTime) / 1000; // seconds
      if (dt <= 0) return;
      lastRenderTime = currentTime;

      canvasContext?.clearRect(
        0,
        0,
        canvasRef.current?.width ?? 0,
        canvasRef.current?.height ?? 0
      );

      flock.forEach((boid) => {
        boid.flock(flock);
        boid.update(dt);
        boid.draw();
      });
    }

    animate(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [windowSize, flock, coefficients]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={windowSize.width * 0.8}
        height={windowSize.height * 0.8 - 80}
        className="rounded-2xl border-2 border-black dark:border-white bg-black bg-opacity-50 dark:bg-white dark:bg-opacity-10"
      />
      <div className="h-20 flex flex-wrap items-center justify-center gap-3 w-3/4">
        <div className="flex flex-row items-center">
          <label className="mr-1">Alignment</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={coefficients.alignment}
            onChange={(e) =>
              setCoefficients({
                ...coefficients,
                alignment: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="flex flex-row items-center">
          <label className="mr-1">Cohesion</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={coefficients.cohesion}
            onChange={(e) =>
              setCoefficients({
                ...coefficients,
                cohesion: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="flex flex-row items-center">
          <label className="mr-1">Separation</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={coefficients.separation}
            onChange={(e) =>
              setCoefficients({
                ...coefficients,
                separation: Number(e.target.value),
              })
            }
          />
        </div>
        <button onClick={() => onStop()}>Stop Simulation</button>
      </div>
    </>
  );
}
