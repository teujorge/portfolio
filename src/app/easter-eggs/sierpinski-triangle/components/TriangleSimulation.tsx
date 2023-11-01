"use client";

import delay from "@/utils/delay";
import { useEffect, useRef, useState } from "react";

class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const VERTICES = [
  new Point(0.5, 0.05),
  new Point(0.05, 0.95),
  new Point(0.95, 0.95),
];

type SimulationData = {
  isRunning: boolean; // whether the simulation is running
  totalIterations: number; // total number of iterations
  currentIteration: number; // current iteration
  points: Point[]; // points to draw
  vertices: Point[]; // vertices of the triangle
};

export function TriangleSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null); // canvas element
  const isStoppingRef = useRef(false); // whether the simulation should stop
  const [inputIterations, setInputIterations] = useState(1000); // for the input field [not used]
  const [data, setData] = useState<SimulationData>({
    isRunning: false,
    totalIterations: 1000,
    currentIteration: 0,
    points: [],
    vertices: VERTICES,
  });

  // resize canvas
  useEffect(() => {
    console.log("reset canvas");

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let vertex of data.vertices) {
      ctx.beginPath();
      ctx.arc(
        vertex.x * canvas.width,
        vertex.y * canvas.height,
        4,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = "red";
      ctx.fill();
    }
  }, [data.vertices]);

  // draw triangle on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // draw last point
    if (data.points.length > 0) {
      const lastPoint = data.points[data.points.length - 1];

      ctx.beginPath();
      ctx.arc(
        lastPoint.x * canvas.width,
        lastPoint.y * canvas.height,
        1,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = "red";
      ctx.fill();
    }
  }, [data]);

  function changeIterations(event: React.ChangeEvent<HTMLInputElement>): void {
    const newIterations = parseInt(event.target.value);

    if (isNaN(newIterations)) {
      setInputIterations(0);
      return;
    }

    if (newIterations < 0) {
      setInputIterations(0);
      return;
    }

    if (newIterations > 100000) {
      setInputIterations(100000);
      return;
    }

    setInputIterations(newIterations);
  }

  async function startSimulation(): Promise<void> {
    if (inputIterations <= 0) return;

    setData((prev) => ({
      ...prev,
      isRunning: true,
      totalIterations: inputIterations,
      currentIteration: 0,
    }));

    // choose a random starting point
    let currentPoint = new Point(Math.random(), Math.random());

    for (let i = 0; i < inputIterations; i++) {
      if (isStoppingRef.current) {
        break;
      }

      // choose a random vertex
      const vertex = data.vertices[Math.floor(Math.random() * 3)];

      // calculate the midpoint between the current point and the vertex
      const newPoint = new Point(
        (currentPoint.x + vertex.x) / 2,
        (currentPoint.y + vertex.y) / 2
      );

      setData((prev) => ({
        ...prev,
        points:
          i === 0
            ? [...prev.points, currentPoint, newPoint]
            : [...prev.points, newPoint],
        currentIteration: i + 1,
      }));

      currentPoint = newPoint;
      await delay(10 / inputIterations);
    }

    isStoppingRef.current = false;
    setData((prev) => ({
      ...prev,
      isRunning: false,
    }));
  }

  function stopSimulation(): void {
    isStoppingRef.current = true;
  }

  function resetSimulation(): void {
    // reset data
    setData((prev) => ({
      ...prev,
      isRunning: false,
      totalIterations: inputIterations,
      currentIteration: 0,
      vertices: [...VERTICES],
    }));
    isStoppingRef.current = false;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen max-h-[100svh]">
      <div className="h-10" />

      {/* triangle canvas */}
      <div className="flex w-full h-full p-2 rounded-[var(--border-radius)] bg-[var(--off-background-color)] shadow-md">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="h-6" />

      {/* iterations */}
      <div className="flex flex-col p-2">
        <p className="font-bold">Iterations</p>
        <div className="flex flex-row">
          <p className="w-36 lg:w-20">Current</p>
          <p className="w-20 px-1">{data.currentIteration}</p>
        </div>
        <div className="flex flex-row">
          <p className="w-36 lg:w-20">Total</p>
          <input
            className="w-20 px-1 rounded-lg text-lg"
            style={{
              opacity: data.isRunning ? 0.5 : 1,
            }}
            onChange={changeIterations}
            value={inputIterations}
            disabled={data.isRunning}
          />
        </div>
      </div>

      <div className="h-6" />

      {/* user interaction */}
      <button
        onClick={
          data.isRunning
            ? stopSimulation
            : data.currentIteration > 0
            ? resetSimulation
            : startSimulation
        }
      >
        {data.isRunning
          ? "Stop"
          : data.currentIteration > 0
          ? "Reset"
          : "Start"}{" "}
        Simulation
      </button>
    </div>
  );
}
