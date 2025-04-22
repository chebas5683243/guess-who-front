import React, { PropsWithChildren, useEffect, useMemo, useRef } from 'react'
import { useGLTF, useAnimations, Html } from '@react-three/drei'
import { SkeletonUtils } from 'three/examples/jsm/Addons.js'
import { useGraph } from '@react-three/fiber'
import * as THREE from "three"
import { TallGlow } from '../effects/glow'

const gltfPath = "/models/little_astronaut/scene.gltf"

type AstronautModelProps = PropsWithChildren<{
  position: [number, number, number];
  xRotation: number;
  animate: boolean;
  onClick: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
}>
function Astronaut({ position, xRotation, animate, onClick, children, onPointerOver, onPointerOut }: AstronautModelProps) {
  const group = useRef(null)
  const { scene, materials, animations } = useGLTF(gltfPath)
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes } = useGraph(clone)
  const { mixer } = useAnimations(clone.animations, group)

  useEffect(() => {
    if (animations.length === 0 || !animate) return;
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
  }, [animations, mixer, animate])

  function handleClick(e: Event) {
    e.stopPropagation();
    onClick();
  }

  function handlePointerOver(e: Event) {
    e.stopPropagation();
    onPointerOver();
  }

  function handlePointerOut(e: Event) {
    e.stopPropagation();
    onPointerOut();
  }

  return (
    <group
      ref={group}
      position={position}
      dispose={null}
      scale={0.5}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
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
      {children}
    </group>
  )
}

type AstronautGlowProps = {
  color: string
  active: boolean
}
function AstronautGlow({ active, color }: AstronautGlowProps) {
  if (!active) return null;
  return (
    <TallGlow color={color} height={1.25} width={0.5} intensity={0.5} />
  )
}

type AstronautHTMLContentProps = PropsWithChildren<{
  position: "top" | "bottom";
}>
function AstronautHTMLContent({ position, children }: AstronautHTMLContentProps) {
  const positionVector: [number, number, number] = useMemo(() => {
    if (position === "bottom") return [0, -0.1, 0]
    if (position === "top") return [0, 1.8, 0]
    return [0, 0, 0]
  }, [position])

  return (
    <Html position={positionVector} className="pointer-events-none select-none w-full text-center">
      {children}
    </Html>
  )
}

Astronaut.Html = AstronautHTMLContent
Astronaut.Glow = AstronautGlow
export { Astronaut as AstronautModel }

useGLTF.preload(gltfPath)