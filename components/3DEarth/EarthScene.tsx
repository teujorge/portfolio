import useSpline from "@splinetool/r3f-spline";
import { PerspectiveCamera } from "@react-three/drei";

const EarthScene = () => {
  const { nodes, materials } = useSpline(
    "https://prod.spline.design/EOYcoIx73NMJFG13/scene.splinecode"
  );
  return (
    <>
      {/* <color attach="background" args={["#eaeaea"]} /> */}
      <group dispose={null}>
        <mesh
          name="Sphere"
          geometry={nodes.Sphere.geometry}
          material={materials["Sphere Material"]}
          castShadow
          receiveShadow
          rotation={[Math.PI, -1.1, Math.PI]}
          scale={1}
        />
        <directionalLight
          name="Directional Light"
          castShadow
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={-10000}
          shadow-camera-far={100000}
          shadow-camera-left={-1250}
          shadow-camera-right={1250}
          shadow-camera-top={1250}
          shadow-camera-bottom={-1250}
          position={[-811.97, 87.31, 300]}
        />
        <PerspectiveCamera
          name="1"
          makeDefault={true}
          far={100000}
          near={5}
          fov={45}
          position={[-1150.25, 854.37, 1763.32]}
          rotation={[-0.45, -0.53, -0.24]}
          // position={[camera.position.x, camera.position.y, camera.position.z]}
          // rotation={[camera.rotation.x, camera.rotation.y, camera.rotation.z]}
        />
        <hemisphereLight
          name="Default Ambient Light"
          intensity={0.5}
          color="#cdcccc"
        />
      </group>
    </>
  );
};

export default EarthScene;
