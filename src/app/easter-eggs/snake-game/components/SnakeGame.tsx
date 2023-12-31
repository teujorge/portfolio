"use client";

import { BOARD_SIZE } from "../types";
import { useGameLogic } from "../hooks/useGameLogic";

function SnakeGame() {
  const { snake, food, isGameOver, restart } = useGameLogic();

  return (
    <div
      className="border-2 border-gray-600 w-[40vw] h-[40vw] grid max-w-full"
      style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)` }}
    >
      {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
        const x = index % BOARD_SIZE;
        const y = Math.floor(index / BOARD_SIZE);
        if (snake.some((segment) => segment.x === x && segment.y === y)) {
          return (
            <div key={index} className="bg-green-600 border border-green-700" />
          );
        }
        if (food.x === x && food.y === y) {
          return (
            <div key={index} className="bg-red-600 border border-red-700" />
          );
        }
        return <div key={index} className="border border-gray-500" />;
      })}
      {isGameOver && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 flex flex-col items-center justify-center">
          <div className="text-white text-2xl">Game Over</div>
          <button onClick={restart}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default SnakeGame;
