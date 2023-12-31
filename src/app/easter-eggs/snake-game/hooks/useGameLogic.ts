"use client";

import { useState, useEffect, useRef } from "react";
import { Direction, BOARD_SIZE } from "../types";

type Point = {
  x: number;
  y: number;
};

const INITIAL_DIRECTION: Direction = "RIGHT";

export function useGameLogic() {
  const [snake, setSnake] = useState<Point[]>([{ x: 5, y: 5 }]);
  const [food, setFood] = useState<Point>({ x: 10, y: 10 });
  const [isGameOver, setIsGameOver] = useState(false);
  const directionRef = useRef<Direction>(INITIAL_DIRECTION);
  const nextDirectionRef = useRef<Direction>(INITIAL_DIRECTION);

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (directionRef.current !== nextDirectionRef.current) return;

      switch (event.key) {
        case "ArrowUp":
          if (directionRef.current !== "DOWN") {
            nextDirectionRef.current = "UP";
          }
          break;
        case "ArrowRight":
          if (directionRef.current !== "LEFT") {
            nextDirectionRef.current = "RIGHT";
          }
          break;
        case "ArrowDown":
          if (directionRef.current !== "UP") {
            nextDirectionRef.current = "DOWN";
          }
          break;
        case "ArrowLeft":
          if (directionRef.current !== "RIGHT") {
            nextDirectionRef.current = "LEFT";
          }
          break;
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    if (isGameOver) return;

    function spawnFood() {
      let newFood: Point;
      while (true) {
        newFood = {
          x: Math.floor(Math.random() * BOARD_SIZE),
          y: Math.floor(Math.random() * BOARD_SIZE),
        };
        if (
          !snake.some(
            (segment) => segment.x === newFood.x && segment.y === newFood.y
          )
        )
          break;
      }
      setFood(newFood);
    }

    const timer = setInterval(() => {
      // update direction
      directionRef.current = nextDirectionRef.current;

      // move the snake
      let head = { ...snake[0] };
      switch (directionRef.current) {
        case "UP":
          head.y -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
      }

      // check for collisions
      if (
        head.x < 0 ||
        head.x >= BOARD_SIZE ||
        head.y < 0 ||
        head.y >= BOARD_SIZE ||
        snake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setIsGameOver(true);
        return;
      }

      let newSnake = [head, ...snake];
      // check for food
      if (head.x === food.x && head.y === food.y) {
        // grow snake
        newSnake = [head, ...snake];
        spawnFood();
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    }, 300);

    return () => clearInterval(timer);
  }, [snake, isGameOver, food]);

  function restart() {
    directionRef.current = INITIAL_DIRECTION;
    nextDirectionRef.current = INITIAL_DIRECTION;
    setSnake([{ x: 5, y: 5 }]);
    setFood({ x: 10, y: 10 });
    setIsGameOver(false);
  }

  return {
    snake,
    food,
    isGameOver,
    restart,
  };
}
