import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { RefObject, Suspense } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { Lobby } from "./spaceship/lobby";
import { Zerus } from "./spaceship/zerus";
interface SceneProps {
  cameraRef: RefObject<OrbitControlsImpl | null>;
}

export function Scene({ cameraRef }: SceneProps) {
  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ position: [0, 0, 1.5], fov: 75 }}>
        <color attach="background" args={["#040404"]} />
        <ambientLight intensity={0.4} />
        <pointLight
          position={[0, 4, -2]}
          intensity={20}
          distance={50}
          color="#ff0000"
        />
        <OrbitControls
          ref={cameraRef}
          enableRotate={true}
          enableZoom={true}
          minDistance={0.001}
        />

        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={1}
          fade
          speed={1}
        />
        <Lobby />
        <Suspense fallback={null}>
          <Zerus />
        </Suspense>
      </Canvas>
    </div>
  );
}
