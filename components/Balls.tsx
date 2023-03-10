import { useRef, useEffect } from "react";
import * as THREE from "three";

interface Props {
  numBalls: number;
}

interface BallBody extends THREE.Mesh {
  velocity?: THREE.Vector3;
}

const Balls: React.FC<Props> = ({ numBalls }) => {
  numBalls = 10;
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    // const camera = new THREE.OrthographicCamera();
    const renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // create balls
    const balls: BallBody[] = [];
    for (let i = 0; i < numBalls; i++) {
      const geometry = new THREE.SphereGeometry(0.1, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(`hsl(${Math.random() * 360}, 100%, 50%)`),
        metalness: 0.75,
        roughness: 0.75,
      });
      const ball = new THREE.Mesh(geometry, material);
      ball.position.set(
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * (20 - 15) + 15
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

      for (let i = 0; i < balls.length; i++) {
        let cumulativeForce = new THREE.Vector3(0, 0, 0);

        // calculate force from other balls and prevent collisions
        for (let j = 0; j < balls.length; j++) {
          // ignore "this" ball
          if (i === j) continue;

          const distance = balls[i].position.distanceTo(balls[j].position);
          const radiusSum = 0.25;

          if (distance < radiusSum) {
            // balls are colliding, adjust their velocities to push them apart
            const direction = new THREE.Vector3()
              .subVectors(balls[i].position, balls[j].position)
              .normalize();
            const adjustment = direction.multiplyScalar(
              (radiusSum - distance) / 2
            );

            balls[i].position.add(adjustment);
            balls[j].position.sub(adjustment);
          }
        }

        // calculate force from mouse
        const mousePos = new THREE.Vector3(mouse.x, mouse.y, 18.75);
        const distanceToMouse = balls[i].position.distanceTo(mousePos);
        const directionToMouse = new THREE.Vector3()
          .subVectors(mousePos, balls[i].position)
          .normalize();
        const mouseForce = directionToMouse
          .multiplyScalar(1 / (distanceToMouse * distanceToMouse))
          .clampLength(0, 0.01);
        cumulativeForce.add(mouseForce);

        // calculate force perpendicular to direction towards mouse
        const perpendicularDirection = new THREE.Vector3(
          -directionToMouse.y,
          directionToMouse.x,
          0
        );
        const perpendicularForce = perpendicularDirection.clampLength(0, 0.001);
        cumulativeForce.add(perpendicularForce);

        balls[i].velocity = cumulativeForce.clampLength(0.01, 1);
        balls[i].position.add(balls[i].velocity!);
      }

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
