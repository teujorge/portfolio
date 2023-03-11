import { useRef, useState } from "react";
import { Canvas, Vector3, useFrame } from "@react-three/fiber";

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

  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState(pos);
  const [velocity, setVelocity] = useState({
    x: 0,
    y: 1,
    z: 0,
  });

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    handleScale(delta);
    handlePosition(delta);
  });

  function handleScale(delta: number) {
    // scale up
    if (hovered && scale < 1.5) {
      setScale(scale + delta);
    }
    // scale down
    else if (scale > 1) {
      setScale(scale - delta);
    }
  }

  function handlePosition(delta: number) {
    // need to go down
    if (position.y > maxY) {
      velocity.y -= delta;
    }

    // need to go up
    else if (position.y < minY) {
      velocity.y += delta;
    }

    setVelocity({ ...velocity });

    // move
    position.y += velocity.y * delta;
    setPosition({ ...position });
  }

  function pointToVector(p: Point): Vector3 {
    return [p.x, p.y, p.z];
  }

  // Return the view, these are regular Three.js elements expressed in JSX
  return (
    <mesh
      ref={ref}
      position={pointToVector(position)}
      scale={scale}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={hovered ? "hotpink" : "orange"}
        roughness={0.75}
        metalness={0.5}
      />
    </mesh>
  );
};

const Wave = () => {
  const allPositions: Point[] = [];

  const maxX = 50;
  const maxZ = 50;
  const spacing = 4;

  const minY = 0;
  const maxY = 1.2;

  for (let x = 1; x < maxX; x++) {
    for (let z = 1; z < maxZ; z++) {
      allPositions.push({ x: spacing * x, y: (x + z) / 10, z: spacing * z });
    }
  }

  return (
    <Canvas
      camera={{
        fov: 55,
        position: [(spacing * maxZ) / 2, 10, 100],
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
