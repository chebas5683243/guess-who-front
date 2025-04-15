import React, { memo, useEffect, useMemo, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three/examples/jsm/Addons.js'
import { useGraph } from '@react-three/fiber'
import * as THREE from "three"

interface ModelProps {
  position: [number, number, number]
}

const gltfPath = "/models/little_astronaut/scene.gltf"

function AstronautComponent(props: ModelProps) {
  const group = useRef(null)
  const { scene, materials, animations } = useGLTF(gltfPath)
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes } = useGraph(clone)
  const { mixer } = useAnimations(clone.animations, group)

  useEffect(() => {
    console.log("effect")
    if (animations.length === 0) return;
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
  }, [animations, mixer])

  return (
    <group ref={group} {...props} dispose={null} scale={0.5}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.011}>
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
    </group>
  )
}

export const Astronaut = memo(AstronautComponent)

useGLTF.preload(gltfPath)