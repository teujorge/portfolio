import { useRef, useEffect } from "react";
import * as THREE from "three";

interface BallBody extends THREE.Mesh {
  velocity?: THREE.Vector3;
}

const BallOrbit = ({ numBalls }: { numBalls: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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
    // const camera = new THREE.OrthographicCamera();
    const renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // create balls
    const balls: BallBody[] = [];
    for (let i = 0; i < numBalls; i++) {
      const geometry = new THREE.SphereGeometry(0.05, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(`hsl(${Math.random() * 360}, 100%, 50%)`),
        metalness: 0.25,
        roughness: 0.25,
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

        // calculate force from mouse
        const mousePos = new THREE.Vector3(mouse.x, mouse.y, 18.75);
        const distanceToMouse = balls[i].position.distanceTo(mousePos);
        const directionToMouse = new THREE.Vector3()
          .subVectors(mousePos, balls[i].position)
          .normalize();

        const minMouseDistance = 0.2;
        let mouseForce: THREE.Vector3;
        // balls too close are repelled
        if (distanceToMouse < minMouseDistance) {
          mouseForce = directionToMouse.multiplyScalar(-1 * distanceToMouse);
        }
        // far balls are attracted to mouse
        else {
          mouseForce = directionToMouse.multiplyScalar(
            distanceToMouse * distanceToMouse
          );
        }
        cumulativeForce.add(mouseForce.clampLength(0, 0.0002));

        if (!balls[i].velocity) balls[i].velocity = new THREE.Vector3(0, 0, 0);
        balls[i].velocity!.add(cumulativeForce).clampLength(0.001, 0.01);
        balls[i].position.add(balls[i].velocity!);

        // calculate force from other balls and prevent collisions
        for (let j = 0; j < balls.length; j++) {
          // ignore "this" ball
          if (i === j) continue;

          const distanceBetweenBalls = balls[i].position.distanceTo(
            balls[j].position
          );
          const radiusSum = 0.1;

          if (distanceBetweenBalls < radiusSum) {
            // balls are colliding, adjust their velocities to push them apart
            const direction = new THREE.Vector3()
              .subVectors(balls[i].position, balls[j].position)
              .normalize();
            const adjustment = direction.multiplyScalar(
              (radiusSum - distanceBetweenBalls) / 2
            );

            balls[i].position.add(adjustment);
            balls[j].position.sub(adjustment);
          }
        }
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

export default BallOrbit;
