import { Sphere, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three'

interface PlanetProps {
  currentDay: number;
  totalDays: number;
}

const PLANET_RADIUS = 10
const DELTA_FROM_CENTER = {
  x: { start: 90, end: -50 },
  y: { start: 60, end: 0 },
  z: { start: 2000, end: 160 },
}

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

export const Planet = ({ currentDay, totalDays }: PlanetProps) => {
  const texture = useTexture('/mars.jpg');
  const planetRef = useRef<THREE.Group>(null)

  const scale = calculatePlanetScale(currentDay, totalDays);

  // const xPos = -50
  // const yPos = 0
  // const xPos = 90
  // const yPos = 60
  const { x: xPos, y: yPos } = calculatePlanetXYPosition(currentDay, totalDays)
  const zPos = -DELTA_FROM_CENTER.z.end

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.00005
    }
  })

  return (
    <group ref={planetRef} position={[xPos, yPos, zPos]} onClick={() => alert('clicked')}>
      <Sphere args={[PLANET_RADIUS, 128, 128]} scale={scale}>
        <meshStandardMaterial
          map={texture}
        />
      </Sphere>
    </group>
  )
}