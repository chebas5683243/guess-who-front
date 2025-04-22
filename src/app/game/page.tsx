'use client'

import { useRef } from 'react'
import { Scene } from '@/components/scene/scene'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { ControlPanel } from '@/components/hud/captain-panel/captain-panel';
import { DevToolsHUD } from '@/components/hud/testing/dev-tools';
import { DaysIndicator } from '@/components/hud/days-indicator';

export default function GamePage() {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  function handleResetCamera() {
    controlsRef.current?.reset();
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Ambient overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent" />
      </div>

      <Scene cameraRef={controlsRef} />

      {/* Game HUD */}
      <ControlPanel />
      <DevToolsHUD onResetCamera={handleResetCamera} />
      <DaysIndicator />
    </div>
  )
} 