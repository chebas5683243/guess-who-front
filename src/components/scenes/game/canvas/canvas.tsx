import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Spaceship } from "./spaceship";
import { Zerus } from "./zerus";

export function GameCanvas() {
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
        <OrbitControls minDistance={0.001} />

        <Stars
          radius={100}
          depth={50}
          count={10000}
          factor={4}
          saturation={1}
          fade
          speed={1}
        />

        <Spaceship />

        <Suspense fallback={null}>
          <Zerus />
        </Suspense>
      </Canvas>
    </div>
  );
}
