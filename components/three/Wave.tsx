import { useRef, useState } from "react";
import { Canvas, RootState, Vector3, useFrame } from "@react-three/fiber";

type Point = {
  x: number;
  y: number;
  z: number;
};

const Sphere = ({
  pos,
  minY,
  maxY,
}: {
  pos: Point;
  minY: number;
  maxY: number;
}) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<any>();

  const [position, setPosition] = useState(pos);

  // subscribe this component to the render-loop
  useFrame((state, delta) => {
    handlePosition(state);
  });

  function handlePosition(state: RootState) {
    // calculate y position based on x and z position using a sine wave
    const wave = Math.sin(
      (position.x + position.z) / 10 + state.clock.elapsedTime
    );
    const y = minY + ((maxY - minY) * (wave + 1)) / 2;

    // update position
    setPosition({
      ...position,
      //   x,
      y,
    });
  }

  function pointToVector(p: Point): Vector3 {
    return [p.x, p.y, p.z];
  }

  // return the view, these are regular Three.js elements expressed in JSX
  return (
    <mesh ref={ref} position={pointToVector(position)}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial roughness={0.75} metalness={0.5} />
    </mesh>
  );
};

const Wave = () => {
  const allPositions: Point[] = [];

  const maxX = 50;
  const maxZ = 50;
  const spacing = 5;

  const minY = 0;
  const maxY = 1.2;

  for (let x = 0; x < maxX; x++) {
    for (let z = 0; z < maxZ; z++) {
      allPositions.push({ x: spacing * x, y: 0, z: spacing * z });
    }
  }

  return (
    <Canvas
      camera={{
        fov: 55,
        position: [(spacing * maxZ) / 2, 50, 200],
      }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {allPositions.map((pos) => (
        <Sphere minY={minY} maxY={maxY} pos={pos} />
      ))}
    </Canvas>
  );
};

export default Wave;
