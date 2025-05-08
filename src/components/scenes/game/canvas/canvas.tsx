import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Spaceship } from "./spaceship";
import { Zerus } from "./zerus";
import { useCanvasLoad } from "@/hooks/use-canvas-load";
import { FirstRenderHandler } from "@/components/common/first-render-handler";
import { cn } from "@/lib/utils";

export function GameCanvas() {
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

        <Suspense fallback={null}>
          <FirstRenderHandler onLoad={onCanvasLoad} />
          <Spaceship />
          <Zerus />
        </Suspense>
      </Canvas>
    </div>
  );
}
