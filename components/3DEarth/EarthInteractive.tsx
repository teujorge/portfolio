import EarthScene from "./EarthScene";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

const EarthInteractive = () => {
  return (
    <>
      <Suspense fallback={null}>
        <Canvas shadows flat linear>
          <EarthScene />
          <OrbitControls enablePan={false} />
        </Canvas>
      </Suspense>
    </>
  );
};

export default EarthInteractive;
