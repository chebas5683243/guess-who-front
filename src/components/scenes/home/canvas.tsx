import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { CameraMotion } from "./camera-motion";

export function HomeCanvas() {
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

        <CameraMotion />

        <Stars
          radius={100}
          depth={50}
          count={10000}
          factor={4}
          saturation={1}
          fade
          speed={0}
        />
      </Canvas>
    </div>
  );
}
