import { DemoContext } from "@/pages/demo";
import { useRef, useEffect, useState, useContext } from "react";
import * as THREE from "three";

type BallBody = {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
};

const BallGrid = () => {
  const { mousePosition, scrollPosition } = useContext(DemoContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ballGrid, setBallGrid] = useState<BallBody[][]>([]);

  const FLOOR_Y = -1;

  // init
  useEffect(() => {
    if (ballGrid.length === 0) {
      createBallGrid();
      return;
    }

    const canvas = canvasRef.current!;
    const pixelRatio = window.devicePixelRatio;
    canvas.width = canvas.clientWidth * pixelRatio;
    canvas.height = canvas.clientHeight * pixelRatio;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    for (let x = 0; x < ballGrid.length; x++) {
      for (let z = 1; z < ballGrid[x].length; z++) {
        scene.add(ballGrid[x][z].mesh);
      }
    }

    function animate() {
      requestAnimationFrame(animate);

      // update position of each ball, based prev ball
      for (let x = 0; x < ballGrid.length; x++) {
        const noise = new THREE.Vector3(0, (Math.random() - 0.5) / 10, 0);

        pushBall({
          ball: ballGrid[x][0],
          finalPosition: ballGrid[x][0].mesh.position.add(noise),
          options: {
            x: false,
            y: true,
            z: false,
            maxVel: 0.01,
          },
        });

        // ignore head, it is controlled by mouse
        for (let z = 1; z < ballGrid[x].length; z++) {
          pushBall({
            ball: ballGrid[x][z],
            finalPosition: ballGrid[x][z - 1].mesh.position,
            options: {
              x: true,
              y: true,
              z: false,
              maxVel: 0.1,
            },
          });
        }
      }

      renderer.render(scene, camera);
    }
    animate();
  }, [ballGrid]);

  // on scroll
  useEffect(() => {
    handleScrolling();
  }, [scrollPosition]);

  // on move mouse
  useEffect(() => {
    handleMouseHover();
  }, [mousePosition]);

  // create initial grid layout
  function createBallGrid() {
    const xBallCount = 50;
    const zBallCount = 70;

    // ball config
    const geometry = new THREE.SphereGeometry(0.1, 32, 32);
    const colors = [0xfafafa, 0xff0000];

    // create balls
    const balls: BallBody[][] = [];
    for (let x = 0; x < xBallCount; x++) {
      const line: BallBody[] = [];
      for (let z = 0; z < zBallCount; z++) {
        const material = new THREE.MeshStandardMaterial({
          color: colors[Math.round(Math.random())],
          roughness: 0.5,
          metalness: 0.5,
        });
        const ball = new THREE.Mesh(geometry, material);
        ball.position.set(x - xBallCount / 2, FLOOR_Y, z);
        line.push({
          mesh: ball,
          velocity: new THREE.Vector3(0, 0, 0),
        });
      }
      balls.push(line);
    }

    setBallGrid(balls);

    return balls;
  }

  // control camera / grid position
  function handleScrolling() {
    for (let x = 0; x < ballGrid.length; x++) {
      for (let z = 0; z < ballGrid[x].length; z++) {
        ballGrid[x][z].mesh.position.set(
          ballGrid[x][z].mesh.position.x,
          scrollPosition / 100 - 5,
          ballGrid[x][z].mesh.position.z
        );
      }
    }
  }

  // control the first ball in each line (via mouse)
  function handleMouseHover() {
    let count = 0;

    const mouseMovementScale = 25;

    ballGrid.forEach((balls) => {
      let finalPosition = new THREE.Vector3(
        balls[0].mesh.position.x,
        balls[0].mesh.position.y,
        balls[0].mesh.position.z
      );
      finalPosition.y = FLOOR_Y;

      if (
        mousePosition * mouseMovementScale < balls[0].mesh.position.x + 0.5 &&
        mousePosition * mouseMovementScale > balls[0].mesh.position.x - 0.5
      ) {
        finalPosition.y = 10;
        count++;
      }

      pushBall({ ball: balls[0], finalPosition: finalPosition });
    });
  }

  function pushBall({
    ball,
    finalPosition,
    options = {
      x: true,
      y: true,
      z: true,
      maxVel: 0.1,
    },
  }: {
    ball: BallBody;
    finalPosition: THREE.Vector3;
    options?: {
      x?: boolean;
      y?: boolean;
      z?: boolean;
      maxVel?: number;
    };
  }) {
    const moveDistance = ball.mesh.position.distanceTo(finalPosition);
    const moveDirection = new THREE.Vector3()
      .subVectors(finalPosition, ball.mesh.position)
      .normalize();

    const moveForce = moveDirection.multiplyScalar(moveDistance);
    ball.velocity.add(moveForce).clampLength(0, options.maxVel!);

    if (options.x === false) ball.velocity.x = 0;
    if (options.y === false) ball.velocity.y = 0;
    if (options.z === false) ball.velocity.z = 0;

    ball.mesh.position.add(ball.velocity);
  }

  return (
    <canvas
      onMouseMove={() => {}}
      ref={canvasRef}
      style={{ width: "100%", height: "99%" }}
    />
  );
};

export default BallGrid;
