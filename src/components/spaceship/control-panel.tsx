import { useRef, useState } from 'react'
import * as THREE from 'three'
import { ThreeEvent } from '@react-three/fiber'

interface ControlPanelProps {
  isCaptain: boolean
  onModalOpen: () => void
  state: 'active' | 'hover' | 'completed' | 'disabled' | 'disabled-completed'
}

const PANEL_WIDTH = 0.5
const PANEL_HEIGHT = 0.15
const PANEL_DEPTH = 0.01
const PANEL_PADDING = 0.01
const PANEL_ROTATION = -Math.PI / 4

export function ControlPanel({ isCaptain, onModalOpen, state }: ControlPanelProps) {
  const [, setIsHovered] = useState(false)
  const panelRef = useRef<THREE.Group>(null)

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    if (!isCaptain || state === 'disabled' || state === 'disabled-completed') return
    e.stopPropagation()
    onModalOpen()
  }

  return (
    <group position={[0, -0.12, 0.75]}>
      <group
        ref={panelRef}
        rotation={[PANEL_ROTATION, 0, 0]}
        onClick={handleClick}
        onPointerOver={(e) => { e.stopPropagation(); setIsHovered(true); }}
        onPointerOut={(e) => { e.stopPropagation(); setIsHovered(false); }}
      >
        {/* Base panel */}
        <mesh>
          <boxGeometry args={[PANEL_WIDTH, PANEL_HEIGHT, PANEL_DEPTH]} />
          <meshStandardMaterial
            color="#164e63"
            metalness={0.3}
            roughness={0.4}
            transparent={true}
            opacity={0.4}
          />
        </mesh>

        {/* Border */}
        <mesh>
          <boxGeometry args={[PANEL_WIDTH + PANEL_PADDING, PANEL_HEIGHT + PANEL_PADDING, PANEL_DEPTH + PANEL_PADDING / 2]} />
          <meshStandardMaterial
            color="#22d3ee"
            metalness={0.5}
            roughness={0.3}
            transparent={true}
            opacity={0.3}
          />
        </mesh>

        {/* Control buttons */}
        <group position={[0, -0.0, 0.026]}>
          {[-0.15, 0, 0.15].map((x, i) => (
            <mesh key={i} position={[x, -0.05, 0]}>
              <cylinderGeometry args={[0.01, 0.01, 0.005, 16]} />
              <meshStandardMaterial
                color={state === 'completed' ? '#22d3ee' : '#155e75'}
                metalness={0.5}
                roughness={0.3}
                transparent={true}
                opacity={0.8}
              />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  )
}