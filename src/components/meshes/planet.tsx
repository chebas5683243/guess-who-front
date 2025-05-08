import { Html, Sphere, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { createContext, PropsWithChildren, useContext, useRef } from "react";
import * as THREE from "three";

const DEFAULT_PLANET_RADIUS = 10;
const DEFAULT_ROTATION_SPEED = 0.00005;
const COLOR_RED = new THREE.Color("#f00000");
const COLOR_DARK_RED = new THREE.Color("#800000");

type PlanetContextType = {
  radius: number;
  scale: number;
};
const PlanetContext = createContext<PlanetContextType | null>(null);

type PlanetProps = PropsWithChildren<{
  radius?: number;
  color?: THREE.Color;
  scale?: number;
  position: [number, number, number];
  rotationSpeed?: number;

  onPointerOver?: () => void;
  onPointerOut?: () => void;
}>;

const usePlanetContext = () => {
  const context = useContext(PlanetContext);
  if (!context)
    throw new Error("usePlanetContext must be used within <Planet>");
  return context;
};

function Planet({
  radius = DEFAULT_PLANET_RADIUS,
  color = COLOR_RED,
  scale = 1,
  position = [0, 0, 0],
  rotationSpeed = DEFAULT_ROTATION_SPEED,

  onPointerOut,
  onPointerOver,

  children,
}: PlanetProps) {
  const planetRef = useRef<THREE.Group>(null);
  const sporesRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const texture = useTexture("/mars.jpg");

  useFrame(({ clock }) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed;
    }

    if (sporesRef.current) {
      sporesRef.current.scale.setScalar(
        1 + Math.sin(clock.getElapsedTime() * 0.5) * 0.02
      );
    }

    if (materialRef.current) {
      materialRef.current.color.lerp(color, 0.1);
      materialRef.current.emissive.lerp(color, 0.1);
    }
  });

  function handlePointerOver(e: Event) {
    e.stopPropagation();
    onPointerOver?.();
  }

  function handlePointerOut(e: Event) {
    e.stopPropagation();
    onPointerOut?.();
  }

  return (
    <PlanetContext value={{ radius, scale }}>
      <group ref={planetRef} position={position}>
        {/* Base sphere */}
        <Sphere
          args={[radius, 128, 128]}
          scale={scale}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <meshStandardMaterial map={texture} />
        </Sphere>

        {/* Spore clouds */}
        <group ref={sporesRef}>
          <Sphere args={[radius * 1.05, 64, 64]} scale={scale}>
            <meshPhysicalMaterial
              ref={materialRef}
              color={COLOR_DARK_RED}
              transparent
              opacity={0.1}
              emissive={COLOR_DARK_RED}
              emissiveIntensity={1}
            />
          </Sphere>
        </group>

        {children}
      </group>
    </PlanetContext>
  );
}

type PlanetHTMLContentProps = PropsWithChildren;
function PlanetHTMLContent({ children }: PlanetHTMLContentProps) {
  const { radius, scale } = usePlanetContext();
  return (
    <Html
      position={[radius * scale, (radius * scale) / 1.25, 0]}
      className="pointer-events-none select-none"
    >
      {children}
    </Html>
  );
}

Planet.COLOR_RED = COLOR_RED;
Planet.COLOR_DARK_RED = COLOR_DARK_RED;
Planet.Html = PlanetHTMLContent;

export { Planet as PlanetModel };
