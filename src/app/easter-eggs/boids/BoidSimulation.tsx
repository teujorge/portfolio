"use client";

import { useWindowSize } from "@/contexts/WindowSize";
import { useEffect, useRef, useState } from "react";
import { Boid, Vector } from "./boid";

export function BoidSimulation() {
  const windowSize = useWindowSize();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [flock, setFlock] = useState<Boid[]>([]);

  const [coefficients, setCoefficients] = useState({
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

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      canvasContext?.clearRect(
        0,
        0,
        canvasRef.current?.width ?? 0,
        canvasRef.current?.height ?? 0
      );
      flock.forEach((boid) => {
        boid.flock(flock);
        boid.update();
        boid.draw();
      });
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [windowSize, flock, coefficients]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={windowSize.width * 0.8}
        height={windowSize.height * 0.8}
        className="rounded-2xl border-2 border-red-500"
      />
      <div className="flex flex-wrap items-center gap-3">
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
      </div>
    </>
  );
}
