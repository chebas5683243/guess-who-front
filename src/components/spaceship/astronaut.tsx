import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import { useGLTF, useAnimations, Html } from '@react-three/drei'
import { SkeletonUtils } from 'three/examples/jsm/Addons.js'
import { useGraph } from '@react-three/fiber'
import * as THREE from "three"
import { ROOM_HEIGHT, ROOM_WIDTH } from './main-room'
import { TallGlow } from '../effects/glow'

interface PlayerProps {
  id: string,
  order: number,
  isDead: boolean,
  isCaptain: boolean,
  name: string,
  nPlayers: number,
}

const GAP_BETWEEN_PLAYERS = 0.6

const gltfPath = "/models/little_astronaut/scene.gltf"

function PlayerModelComponent({ id, order, isDead, isCaptain, name, nPlayers }: PlayerProps) {
  const group = useRef(null)
  const { scene, materials, animations } = useGLTF(gltfPath)
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes } = useGraph(clone)
  const { mixer } = useAnimations(clone.animations, group)
  const [isHovered, setIsHovered] = useState(false)

  const position: [number, number, number] = useMemo(() => (
    [-GAP_BETWEEN_PLAYERS * (order - (nPlayers + 1) / 2), -ROOM_HEIGHT / 2, -ROOM_WIDTH / 4]
  ), [order, nPlayers])

  const xRotation = useMemo(() => (
    isDead ? -Math.PI : -Math.PI / 2
  ), [isDead])

  useEffect(() => {
    if (animations.length === 0 || isDead) return;
    const fullClip = animations[0]
    // const falling = THREE.AnimationUtils.subclip(fullClip, 'Falling', 0, 30)
    const standing = THREE.AnimationUtils.subclip(fullClip, 'Standing', 31, 150)
    // const running = THREE.AnimationUtils.subclip(fullClip, 'Running', 151, 180)
    // const carrying = THREE.AnimationUtils.subclip(fullClip, 'Carrying', 181, 210)
    // const jumping = THREE.AnimationUtils.subclip(fullClip, 'Jumping', 211, 250)
    // const idle = THREE.AnimationUtils.subclip(fullClip, 'Idle', 251, 400)
    const standingAction = mixer.clipAction(standing)
    const random = Math.random() * 0.5 + 0.5
    standingAction.setEffectiveTimeScale(random)
    standingAction.play()

    return () => { standingAction.reset() }
  }, [animations, mixer, isDead])

  function handleClick(e: Event) {
    alert(id)
    e.stopPropagation()
  }

  return (
    <group
      ref={group}
      position={position}
      dispose={null}
      scale={0.5}
      onClick={handleClick}
      onPointerOver={(e) => { e.stopPropagation(); setIsHovered(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setIsHovered(false); }}
    >
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[xRotation, 0, 0]} scale={0.011}>
          <group name="17f9d1b3a83741e2a2981db7241c686efbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Astronaut"
                  position={[0, 76.083, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
                <group name="Armature" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                  <group name="Object_6">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_9"
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      geometry={(nodes.Object_9 as any).geometry}
                      material={materials.Astronaut}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      skeleton={(nodes.Object_9 as any).skeleton}
                    />
                    <group
                      name="Object_8"
                      position={[0, 76.083, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* Player name and status */}
      <Html position={[0, 1.8, 0]} style={{ pointerEvents: 'none', width: '100%', textAlign: 'center' }}>
        <div className="flex flex-col items-center gap-1">
          <h3 className="text-sm text-white [text-shadow:_0_0_2px_black,0_0_2px_black,0_0_2px_black,0_0_2px_black] whitespace-nowrap">
            {name}
          </h3>
          <div className={`text-xs px-1 rounded ${isDead ? 'bg-red-500' : 'bg-green-500'} text-white whitespace-nowrap`}>
            {isDead ? 'DEAD' : 'ALIVE'}
          </div>
        </div>
      </Html>

      {/* Captain tag */}
      {isCaptain && (
        <Html position={[0, -0.1, 0]} style={{ pointerEvents: 'none', width: '100%', textAlign: 'center' }}>
          <div className="flex items-center justify-center">
            <h3 className="text-xs px-1 rounded-full bg-orange-500 text-white whitespace-nowrap">
              Captain
            </h3>
          </div>
        </Html>
      )}

      {/* Hover effects */}
      {isHovered && (
        <TallGlow color="#00ffff" height={1.25} width={0.5} intensity={0.5} />
      )}
    </group>
  )
}

export const PlayerModel = memo(PlayerModelComponent)

useGLTF.preload(gltfPath)