import { Plane } from '@react-three/drei'
import { Color } from 'three'
import * as THREE from 'three';

export const SpaceshipWall = ({ position, rotation, size, color }: {
  position: [number, number, number],
  rotation: [number, number, number],
  size: [number, number],
  color: string
}) => {
  return (
    <Plane
      position={position}
      rotation={rotation}
      args={size}
      onClick={(e) => { e.stopPropagation() }}
      onPointerOver={(e) => { e.stopPropagation() }}
      onPointerOut={(e) => { e.stopPropagation() }}
    >
      <meshStandardMaterial
        color={color ?? Color.NAMES.aliceblue}
        side={THREE.DoubleSide}
      />
    </Plane>
  )
}