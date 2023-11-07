"use client";

import { useRef, useState } from "react";

export function useSwarmControls() {
  const boidsRef = useRef<Boid[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // separation: steer to avoid crowding local flock mates
  const [separationCoef, setSeparationCoef] = useState(10000);

  // alignment: steer towards the average heading of local flock mates
  const [alignmentCoef, setAlignmentCoef] = useState(0.5);

  // cohesion: steer to move toward the average position of local flock mates
  const [cohesionCoef, setCohesionCoef] = useState(1);

  return {
    boidsRef,
    canvasRef,
    separationCoef,
    setSeparationCoef,
    alignmentCoef,
    setAlignmentCoef,
    cohesionCoef,
    setCohesionCoef,
  };
}
