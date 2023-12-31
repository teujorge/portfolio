"use client";

import { WindowSizeProvider } from "@/contexts/WindowSize";
import { BoidSimulation } from "./BoidSimulation";
import { useState } from "react";

export default function BoidsPage() {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <main className="h-svh w-svw">
      {isRunning ? (
        <WindowSizeProvider>
          <BoidSimulation onStop={() => setIsRunning(false)} />
        </WindowSizeProvider>
      ) : (
        <>
          <h2>Boids</h2>
          <p className="w-3/4">
            What are boid? Boids are a type of artificial life that simulate the
            flocking behavior of birds. The simulation is based on the{" "}
            <a
              className="underline transition-colors hover:text-[var(--primary-color)]"
              href="https://en.wikipedia.org/wiki/Boids"
            >
              Boids Algorithm.
            </a>
          </p>
          <button
            className="mt-4"
            onClick={() => {
              setIsRunning(!isRunning);
            }}
          >
            Run Simulation
          </button>
        </>
      )}
    </main>
  );
}
