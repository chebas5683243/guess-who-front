import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import React from 'react'

const GlowMaterial = shaderMaterial(
  {
    color: new THREE.Color(0.1, 0.3, 1.0),
    viewVector: new THREE.Vector3(0, 0, 1),
    glowIntensity: 0.5,
  },
  // Vertex shader
  `
    uniform vec3 viewVector;
    varying float intensity;
    void main() {
      vec3 vNormal = normalize(normalMatrix * normal);
      vec3 vNormel = normalize(normalMatrix * viewVector);
      intensity = pow(0.6 - dot(vNormal, vNormel), 2.0);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform vec3 color;
    uniform float glowIntensity;
    varying float intensity;
    void main() {
      vec3 glow = color * intensity * glowIntensity;
      gl_FragColor = vec4(glow, intensity);
    }
  `
)

extend({ GlowMaterial })

// Add type support for the custom shader material
declare module '@react-three/fiber' {
  interface ThreeElements {
    glowMaterial: {
      color?: THREE.Color | string
      viewVector?: THREE.Vector3
      glowIntensity?: number
      transparent?: boolean
      depthWrite?: boolean
      side?: THREE.Side
      blending?: THREE.Blending
    }
  }
}

interface GlowProps {
  color?: THREE.Color | string
  scale?: number
  intensity?: number
}

export function Glow({ color = '#00ffff', scale = 1.2, intensity = 0.5 }: GlowProps) {
  return (
    <mesh scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <glowMaterial
        color={new THREE.Color(color)}
        glowIntensity={intensity}
        viewVector={new THREE.Vector3(0, 0, 1)}
        transparent
        depthWrite={false}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

export function TallGlow({ color = '#00ffff', height = 1.5, width = 0.8, intensity = 0.5 }: GlowProps & { height?: number, width?: number }) {
  return (
    <group scale={[width, height, width]}>
      <Glow color={color} scale={1} intensity={intensity} />
    </group>
  )
} 