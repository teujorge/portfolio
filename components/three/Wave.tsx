import { useRef, useState } from "react";
import { Canvas, RootState, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Sphere = ({
  pos,
  minY,
  maxY,
}: {
  pos: THREE.Vector3;
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
    const newY = minY + ((maxY - minY) * (wave + 1)) / 2;

    // update position
    const newPosition = new THREE.Vector3(position.x, newY, position.z);
    setPosition(newPosition);
  }

  return (
    <mesh
      ref={ref}
      position={new THREE.Vector3(position.x, position.y, position.z)}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial roughness={0.75} metalness={0.5} />
    </mesh>
  );
};

const Wave = () => {
  const allPositions: THREE.Vector3[] = [];

  const maxX = 20;
  const maxZ = 20;
  const spacing = 5;

  const minY = 0;
  const maxY = 1.2;

  for (let x = 0; x < maxX; x++) {
    for (let z = 0; z < maxZ; z++) {
      allPositions.push(new THREE.Vector3(spacing * x, 0, spacing * z));
    }
  }

  return (
    <Canvas
      gl={{ powerPreference: "high-performance" }}
      camera={{
        fov: 55,
        position: [(spacing * maxZ) / 2, 50, 200],
      }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {allPositions.map((pos, index) => (
        <Sphere key={index} minY={minY} maxY={maxY} pos={pos} />
      ))}
    </Canvas>
  );
};

export default Wave;
