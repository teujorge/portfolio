"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const BOID_COUNT = 100;
const MAX_VELOCITY = 100;
const MAX_ACCELERATION = 2;
const BOID_VISION_DISTANCE = 10;
const MOUSE_COEFFICIENT = 0.00000001;
const RANDOM_PERTURBATION = 10;

export function useSwarmSimulation({
  canvasRef,
  boidsRef,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  boidsRef: React.MutableRefObject<Boid[]>;
}) {
  // separation: steer to avoid crowding local flock mates
  const [separationCoef, setSeparationCoef] = useState(100000);

  // alignment: steer towards the average heading of local flock mates
  const [alignmentCoef, setAlignmentCoef] = useState(10);

  // cohesion: steer to move toward the average position of local flock mates
  const [cohesionCoef, setCohesionCoef] = useState(10);

  const lastFrameTimestampRef = useRef<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mousePositionRef = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const drawBoids = useCallback(() => {
    const canvasContext = canvasRef.current?.getContext("2d");
    if (!canvasContext) return;

    canvasContext.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let boid of boidsRef.current) {
      canvasContext.beginPath();
      canvasContext.arc(boid.position.x, boid.position.y, 5, 0, 2 * Math.PI);
      canvasContext.fillStyle = "white";
      canvasContext.fill();
    }
  }, [boidsRef, canvasRef]);

  useEffect(() => {
    // --- initialize boids ---
    const initialBoids: Boid[] = [];
    for (let i = 0; i < BOID_COUNT; i++) {
      initialBoids.push({
        id: i,
        position: {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
        velocity: {
          x: (Math.random() - 0.5) * 3,
          y: (Math.random() - 0.5) * 3,
        },
        acceleration: { x: 0, y: 0 },
      });
    }
    boidsRef.current = initialBoids;

    // --- track mouse position ---
    function handleMouseMove(event?: MouseEvent) {
      if (event) {
        mousePositionRef.current = {
          x: event.clientX,
          y: event.clientY,
        };
      } else {
        mousePositionRef.current = {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        };
      }
    }
    handleMouseMove();

    // --- track window size ---
    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    handleResize();

    // --- listeners ---
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [boidsRef]);

  useEffect(() => {
    function moveBoids(dt: number) {
      const newBoids = boidsRef.current.map((boid, i) => {
        let separation = { x: 0, y: 0 };
        let alignment = { x: 0, y: 0 };
        let cohesion = { x: 0, y: 0 };
        let neighbors = 0;

        boidsRef.current.forEach((otherBoid, j) => {
          if (i === j) return;

          const dx = boid.position.x - otherBoid.position.x;
          const dy = boid.position.y - otherBoid.position.y;
          const boidDistance = Math.sqrt(dx * dx + dy * dy);

          if (boidDistance > BOID_VISION_DISTANCE) return;
          if (boidDistance <= 0) return;
          neighbors++;

          // separation
          const separationStrength = boidDistance * boidDistance;
          separation.x += dx * separationStrength;
          separation.y += dy * separationStrength;

          // alignment
          if (boidDistance < BOID_VISION_DISTANCE / 2) {
            alignment.x += otherBoid.velocity.x;
            alignment.y += otherBoid.velocity.y;
          }

          // cohesion
          if (boidDistance < BOID_VISION_DISTANCE / 2) {
            cohesion.x += otherBoid.position.x;
            cohesion.y += otherBoid.position.y;
          }
        });

        // normalize based on neighbor count
        if (neighbors > 0) {
          separation.x /= neighbors;
          separation.y /= neighbors;
          alignment.x /= neighbors;
          alignment.y /= neighbors;
          cohesion.x = cohesion.x / neighbors - boid.position.x;
          cohesion.y = cohesion.y / neighbors - boid.position.y;
        }

        // apply coefficients and add to boid's acceleration
        boid.acceleration.x += separation.x * separationCoef;
        boid.acceleration.y += separation.y * separationCoef;
        boid.acceleration.x += alignment.x * alignmentCoef;
        boid.acceleration.y += alignment.y * alignmentCoef;
        boid.acceleration.x += cohesion.x * cohesionCoef;
        boid.acceleration.y += cohesion.y * cohesionCoef;

        // random perturbation
        boid.velocity.x += (Math.random() - 0.5) * RANDOM_PERTURBATION;
        boid.velocity.y += (Math.random() - 0.5) * RANDOM_PERTURBATION;

        const mouseVector = {
          x: mousePositionRef.current.x - boid.position.x,
          y: mousePositionRef.current.y - boid.position.y,
        };

        const mouseDistance = Math.sqrt(
          mouseVector.x * mouseVector.x + mouseVector.y * mouseVector.y
        );
        const mouseDistanceSquared = mouseDistance * mouseDistance;
        mouseVector.x *= mouseDistanceSquared;
        mouseVector.y *= mouseDistanceSquared;
        boid.acceleration.x += mouseVector.x * MOUSE_COEFFICIENT;
        boid.acceleration.y += mouseVector.y * MOUSE_COEFFICIENT;

        const accelerationUpdate = {
          x: clamp(boid.acceleration.x, -MAX_ACCELERATION, MAX_ACCELERATION),
          y: clamp(boid.acceleration.y, -MAX_ACCELERATION, MAX_ACCELERATION),
        };

        const velocityUpdate = {
          x: clamp(
            boid.velocity.x + accelerationUpdate.x, // * dt,
            -MAX_VELOCITY,
            MAX_VELOCITY
          ),
          y: clamp(
            boid.velocity.y + accelerationUpdate.y, // * dt,
            -MAX_VELOCITY,
            MAX_VELOCITY
          ),
        };

        const positionUpdate = {
          x: boid.position.x + velocityUpdate.x * dt,
          y: boid.position.y + velocityUpdate.y * dt,
        };

        // Wrap boids around screen instead of bouncing
        if (positionUpdate.x < 0) {
          positionUpdate.x += window.innerWidth;
        } else if (positionUpdate.x > window.innerWidth) {
          positionUpdate.x -= window.innerWidth;
        }
        if (positionUpdate.y < 0) {
          positionUpdate.y += window.innerHeight;
        } else if (positionUpdate.y > window.innerHeight) {
          positionUpdate.y -= window.innerHeight;
        }

        return {
          ...boid,
          acceleration: accelerationUpdate,
          velocity: velocityUpdate,
          position: positionUpdate,
        };
      });

      boidsRef.current = newBoids;
      drawBoids();
    }

    const animate = (timestamp: number) => {
      if (lastFrameTimestampRef.current) {
        const dt = (timestamp - lastFrameTimestampRef.current) / 1000; // convert from ms to seconds
        moveBoids(dt);
      }
      lastFrameTimestampRef.current = timestamp;

      requestAnimationFrame(animate);
    };
    const animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [separationCoef, alignmentCoef, cohesionCoef, boidsRef, drawBoids]);

  function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  return {
    dimensions,
    separationCoef,
    setSeparationCoef,
    alignmentCoef,
    setAlignmentCoef,
    cohesionCoef,
    setCohesionCoef,
  };
}
