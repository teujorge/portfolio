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
          <p className="w-3/4">
            <strong>Discover the Dynamics of Boids:</strong> Boids are simulated
            agents that exemplify the collective behavior of birds or fish. This
            captivating simulation, rooted in the{" "}
            <a
              className="underline transition-colors hover:text-[var(--primary-color)]"
              href="https://en.wikipedia.org/wiki/Boids"
              rel="noopener noreferrer"
              target="_blank"
            >
              Boids Algorithm
            </a>
            , demonstrates how complex patterns emerge from simple rules. Each
            boid independently follows three basic principles: alignment,
            cohesion, and separation. Alignment ensures boids steer in the same
            direction, cohesion brings them closer together, and separation
            prevents overcrowding. Together, these rules result in a mesmerizing
            display of synchronized movement, reflecting the profound
            interconnectedness found in natural systems.
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
