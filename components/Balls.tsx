import { useRef, useEffect } from "react";
import * as THREE from "three";

interface Props {
  numBalls: number;
}

const Balls: React.FC<Props> = ({ numBalls }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const pixelRatio = window.devicePixelRatio;
    canvas.width = canvas.clientWidth * pixelRatio;
    canvas.height = canvas.clientHeight * pixelRatio;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const balls: THREE.Mesh[] = [];

    for (let i = 0; i < numBalls; i++) {
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(`hsl(${Math.random() * 360}, 100%, 50%)`),
        metalness: 0.5,
        roughness: 0.5,
      });
      const ball = new THREE.Mesh(geometry, material);
      ball.position.set(
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 20 - 10
      );
      balls.push(ball);
      scene.add(ball);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const mouse = new THREE.Vector2();

    function onMouseMove(event: MouseEvent) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    window.addEventListener("mousemove", onMouseMove, false);

    function onWindowResize() {
      canvas.width = canvas.clientWidth * pixelRatio;
      canvas.height = canvas.clientHeight * pixelRatio;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }

    window.addEventListener("resize", onWindowResize, false);

    function animate() {
      requestAnimationFrame(animate);

      balls.forEach((ball) => {
        ball.position.x += (mouse.x * 5 - ball.position.x) * 0.02;
        ball.position.y += (-mouse.y * 5 - ball.position.y) * 0.02;
        ball.rotation.x += 0.01;
        ball.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    }

    camera.position.z = 20;

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default Balls;
