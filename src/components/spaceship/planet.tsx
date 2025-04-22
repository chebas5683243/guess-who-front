import { useGameStore } from "@/stores/use-game-store";
import { Html, Sphere, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from 'three'

const PLANET_RADIUS = 10
const DELTA_FROM_CENTER = {
  x: { start: 90, end: -50 },
  y: { start: 60, end: 0 },
  z: { start: 2000, end: 160 },
}

const DARK_RED = new THREE.Color('#800000');
const RED = new THREE.Color('#f00000');

function calculatePlanetScale(currentDay: number, totalDays: number) {
  const distancePerDay = (DELTA_FROM_CENTER.z.start - DELTA_FROM_CENTER.z.end) / (totalDays - 1)
  return DELTA_FROM_CENTER.z.start / (DELTA_FROM_CENTER.z.start - distancePerDay * (currentDay - 1))
}

function calculatePlanetXYPosition(currentDay: number, totalDays: number) {
  const slopeX = (DELTA_FROM_CENTER.x.end - DELTA_FROM_CENTER.x.start) / (totalDays - 1)
  const slopeY = (DELTA_FROM_CENTER.y.end - DELTA_FROM_CENTER.y.start) / (totalDays - 1)

  const interceptX = DELTA_FROM_CENTER.x.start - (DELTA_FROM_CENTER.x.end - DELTA_FROM_CENTER.x.start) / (totalDays - 1)
  const interceptY = DELTA_FROM_CENTER.y.start - (DELTA_FROM_CENTER.y.end - DELTA_FROM_CENTER.y.start) / (totalDays - 1)

  return {
    x: slopeX * currentDay + interceptX,
    y: slopeY * currentDay + interceptY,
  }
}

export const Planet = () => {
  const currentDay = useGameStore(state => state.currentDay)
  const totalDays = useGameStore(state => state.nPlayers)

  const planetRef = useRef<THREE.Group>(null)
  const sporesRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null)
  const [isHovered, setIsHovered] = useState(false)
  const texture = useTexture('/mars.jpg')

  const scale = calculatePlanetScale(currentDay, totalDays);
  const { x: xPos, y: yPos } = calculatePlanetXYPosition(currentDay, totalDays)
  const zPos = -DELTA_FROM_CENTER.z.end

  useFrame(({ clock }) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.00005
    }

    if (sporesRef.current) {
      sporesRef.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 0.5) * 0.02)
    }

    if (materialRef.current) {
      materialRef.current.color.lerp(isHovered ? RED : DARK_RED, 0.1);
      materialRef.current.emissive.lerp(isHovered ? RED : DARK_RED, 0.1);
    }

  })

  return (
    <group ref={planetRef} position={[xPos, yPos, zPos]}>
      {/* Base sphere */}
      <Sphere
        args={[PLANET_RADIUS, 128, 128]}
        scale={scale}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <meshStandardMaterial
          map={texture}
        />
      </Sphere>


      {/* Spore clouds */}
      <group ref={sporesRef}>
        <Sphere args={[PLANET_RADIUS * 1.05, 64, 64]} scale={scale}>
          <meshPhysicalMaterial
            ref={materialRef}
            color={DARK_RED}
            transparent
            opacity={0.15}
            emissive={DARK_RED}
            emissiveIntensity={1}
          />
        </Sphere>
      </group>

      {/* Hover glow effect */}
      {isHovered && (
        <>
          <Html position={[PLANET_RADIUS * scale, PLANET_RADIUS * scale / 1.25, 0]} style={{ pointerEvents: 'none' }}>
            <div className="w-fit">
              <h3 className="text-sm font-bold mb-2 text-white [text-shadow:_0_0_2px_black,0_0_2px_black,0_0_2px_black,0_0_2px_black]">
                Zerus
              </h3>
            </div>
          </Html>
        </>
      )}
    </group>
  )
}