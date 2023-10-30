"use client";

import delay from "@/utils/delay";
import { useRef, useState } from "react";
import { Bar } from "./Bar";

type SimulationData = {
  isRunning: boolean;
  totalIterations: number;
  currentIteration: number;
  withSwitchWins: number;
  withoutSwitchWins: number;
};

export function MontyHallSimulation() {
  const isStoppingRef = useRef(false); // whether the simulation should stop
  const [inputIterations, setInputIterations] = useState(1000); // for the input field [not used]
  const [data, setData] = useState<SimulationData>({
    isRunning: false,
    totalIterations: 1000,
    currentIteration: 0,
    withSwitchWins: 0,
    withoutSwitchWins: 0,
  });

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

    if (newIterations > 10000) {
      setInputIterations(10000);
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
      withSwitchWins: 0,
      withoutSwitchWins: 0,
    }));

    for (let i = 0; i < inputIterations; i++) {
      if (isStoppingRef.current) {
        break;
      }

      const winningDoor = Math.round(Math.random() * 2 + 1);
      let chosenDoor = Math.round(Math.random() * 2 + 1);

      if (winningDoor === chosenDoor) {
        setData((prev) => ({
          ...prev,
          withoutSwitchWins: prev.withoutSwitchWins + 1,
        }));
      } else {
        // the host opens a door that is not the winning door and not the chosen door
        let openedDoor = Math.round(Math.random() * 2 + 1);
        while (openedDoor === winningDoor || openedDoor === chosenDoor) {
          openedDoor = Math.round(Math.random() * 2 + 1);
        }

        // the player switches their door
        let switchedDoor = Math.round(Math.random() * 2 + 1);
        while (switchedDoor === chosenDoor || switchedDoor === openedDoor) {
          switchedDoor = Math.round(Math.random() * 2 + 1);
        }

        if (switchedDoor === winningDoor) {
          setData((prev) => ({
            ...prev,
            withSwitchWins: prev.withSwitchWins + 1,
          }));
        }
      }

      setData((prev) => ({
        ...prev,
        currentIteration: prev.currentIteration + 1,
      }));

      await delay(1 / inputIterations);
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
    setData((prev) => ({
      ...prev,
      isRunning: false,
      totalIterations: inputIterations,
      currentIteration: 0,
      withSwitchWins: 0,
      withoutSwitchWins: 0,
    }));
  }

  const withSwitchWinPercentage = Math.round(
    (data.withSwitchWins / data.totalIterations) * 100
  );

  const withoutSwitchWinPercentage = Math.round(
    (data.withoutSwitchWins / data.totalIterations) * 100
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-10" />

      {/* data */}
      <div className="flex flex-col lg:flex-row">
        {/* percentages */}
        <div className="p-2">
          <p className="font-bold">Wins</p>
          <div className="flex flex-row">
            <p className="w-36">With Switch</p>
            <p className="w-20">{data.withSwitchWins}</p>
          </div>
          <div className="flex flex-row">
            <p className="w-36">Without Switch</p>
            <p className="w-20">{data.withoutSwitchWins}</p>
          </div>
        </div>
        {/* iterations */}
        <div className="p-2">
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
      </div>

      <div className="h-6" />

      {/* graph */}
      <div className="w-full flex-col">
        <Bar
          percentage={withSwitchWinPercentage}
          label="switching"
          className="bg-green-700 dark:bg-green-300"
          style={{
            borderTopRightRadius: "8px",
            borderBottomRightRadius: `${Math.min(
              8,
              Math.max(0, withSwitchWinPercentage - withoutSwitchWinPercentage)
            )}px`,
            borderTopLeftRadius: "8px",
          }}
        />
        <Bar
          percentage={withoutSwitchWinPercentage}
          label="no switching"
          className="bg-blue-700 dark:bg-blue-300"
          style={{
            borderTopRightRadius: `${Math.min(
              8,
              Math.max(0, withoutSwitchWinPercentage - withSwitchWinPercentage)
            )}px`,
            borderBottomRightRadius: "8px",
            borderBottomLeftRadius: "8px",
          }}
        />
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
