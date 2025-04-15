import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { RefObject, Suspense } from "react";
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { Planet } from "./spaceship/planet";
import { MainRoom } from "./spaceship/main-room";

interface SceneProps {
  cameraRef: RefObject<OrbitControlsImpl | null>
  currentDay: number;
  totalDays: number;
}

export function Scene({ cameraRef, currentDay, totalDays }: SceneProps) {
  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
        <color attach="background" args={['#02020f']} />
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 10]} intensity={40} distance={50} color="red" />
        <OrbitControls ref={cameraRef} />
        {/* <CenterDot /> */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={1} />
        <MainRoom />
        <Suspense fallback={null}>
          <Planet currentDay={currentDay} totalDays={totalDays} />
        </Suspense>
      </Canvas>
    </div>
  )
}