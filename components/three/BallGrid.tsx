import { DemoContext } from "@/pages/demo";
import { useRef, useEffect, useState, useContext } from "react";
import * as THREE from "three";

const BallGrid = () => {
  const { scrollPosition } = useContext(DemoContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [ballGrid, setBallGrid] = useState<THREE.Mesh[]>([]);

  function createBallGrid() {
    const xBallCount = 20;
    const zBallCount = 50;

    // ball config
    const geometry = new THREE.SphereGeometry(0.1, 12, 12);
    const colors = [0xfafafa, 0xff0000];

    // create balls
    const balls: THREE.Mesh[] = [];
    for (let x = 0; x < xBallCount; x++) {
      for (let z = 0; z < zBallCount; z++) {
        const material = new THREE.MeshBasicMaterial({
          color: colors[Math.round(Math.random())],
        });
        const ball = new THREE.Mesh(geometry, material);
        ball.position.set(x - 5, -1, z - 20);
        balls.push(ball);
      }
    }

    setBallGrid(balls);

    return balls;
  }

  // init
  useEffect(() => {
    const canvas = canvasRef.current!;
    const pixelRatio = window.devicePixelRatio;
    canvas.width = canvas.clientWidth * pixelRatio;
    canvas.height = canvas.clientHeight * pixelRatio;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    if (ballGrid.length === 0) {
      createBallGrid();
    } else {
      ballGrid.forEach((ball) => scene.add(ball));
    }

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    camera.position.z = 20;

    animate();
  }, [ballGrid]);

  // scroll changed
  useEffect(() => {
    if (ballGrid.length === 0) return;

    for (let i = 0; i < ballGrid.length; i++) {
      ballGrid[i].position.set(
        ballGrid[i].position.x,
        scrollPosition / 5 - 5,
        ballGrid[i].position.z
      );
    }
  }, [scrollPosition]);

  return <canvas ref={canvasRef} style={{ width: "50%", height: "50%" }} />;
};

export default BallGrid;
