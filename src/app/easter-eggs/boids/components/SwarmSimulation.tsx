"use client";

import { useRef } from "react";
import { useSwarmSimulation } from "../hooks/useSwarmSimulation";
import { SwarmControls } from "./SwarmControls";
import { Boid } from "../types";

export function SwarmSimulation() {
  const boidsRef = useRef<Boid[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    dimensions,
    separationCoef,
    setSeparationCoef,
    alignmentCoef,
    setAlignmentCoef,
    cohesionCoef,
    setCohesionCoef,
  } = useSwarmSimulation({ canvasRef, boidsRef });

  return (
    <>
      <SwarmControls
        separationCoef={separationCoef}
        setSeparationCoef={setSeparationCoef}
        alignmentCoef={alignmentCoef}
        setAlignmentCoef={setAlignmentCoef}
        cohesionCoef={cohesionCoef}
        setCohesionCoef={setCohesionCoef}
      />
      <canvas
        className="bg-blue-200"
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
      />
    </>
  );
}
