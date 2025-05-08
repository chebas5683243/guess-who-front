import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { PlanetModel } from "@/components/meshes/planet";
import { AstronautModel } from "@/components/meshes/astronaut";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { CameraMotion } from "./camera-motion";
import { useCanvasLoad } from "@/hooks/use-canvas-load";
import { FirstRenderHandler } from "@/components/common/first-render-handler";

export function LobbyCanvas() {
  const { isCanvasReady, hideOverlay, onCanvasLoad } = useCanvasLoad();

  return (
    <div className="w-screen h-screen">
      {!hideOverlay && (
        <div
          className={cn(
            "w-screen h-screen bg-[#040404] z-1000 absolute top-0 left-0 transition-opacity duration-1000",
            isCanvasReady ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        />
      )}
      <Canvas camera={{ position: [0, 0, 0], fov: 75 }}>
        <color attach="background" args={["#040404"]} />
        <ambientLight intensity={0.4} />
        <pointLight
          position={[0, 2, 4]}
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

        <Suspense fallback={null}>
          <FirstRenderHandler onLoad={onCanvasLoad} />
          <PlanetModel
            position={[0, 0, -20]}
            color={PlanetModel.COLOR_RED}
            scale={1}
          />
          <AstronautModel
            animate
            animationSpeed={0.25}
            // position={[-0.5, -0.5, -0.4]}
            // rotation={[-Math.PI / 2, 0, (Math.PI * 2.2) / 3]}
            position={[-0, -0.6, -0.5]}
            rotation={[Math.PI / 2, Math.PI, 0]}
            color="#ffffff"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
