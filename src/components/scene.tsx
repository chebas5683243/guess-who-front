import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { RefObject, Suspense, useState } from "react";
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { Planet } from "./spaceship/planet";
import { MainRoom } from "./spaceship/main-room";
import { CenterDot } from "./center-dot";
import { PanelModal } from "./spaceship/panel-modal";
interface SceneProps {
  cameraRef: RefObject<OrbitControlsImpl | null>
  isCaptain: boolean;
}

type PanelState = 'active' | 'hover' | 'completed' | 'disabled' | 'disabled-completed'

export function Scene({ cameraRef, isCaptain }: SceneProps) {
  const [panelStates, setPanelStates] = useState<{
    panel1: PanelState
    panel2: PanelState
    panel3: PanelState
  }>({
    panel1: isCaptain ? 'active' : 'disabled',
    panel2: isCaptain ? 'active' : 'disabled',
    panel3: isCaptain ? 'active' : 'disabled'
  })

  const [activeModal, setActiveModal] = useState<'panel1' | 'panel2' | 'panel3' | null>(null)

  const handleModalComplete = (panelId: 'panel1' | 'panel2' | 'panel3', selectedOption: string) => {
    setPanelStates(prev => ({
      ...prev,
      [panelId]: isCaptain ? 'completed' : 'disabled-completed'
    }))
    // Here you would handle the selected option for each panel
    console.log(`Panel ${panelId} selected:`, selectedOption)
  }

  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ position: [0, 0, 1.5], fov: 75 }}>
        <color attach="background" args={['#040404']} />
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 4, -2]} intensity={20} distance={50} color="red" />
        <OrbitControls ref={cameraRef} enableRotate={true} enableZoom={true} minDistance={0.001} />

        <CenterDot />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={1} />
        <MainRoom />
        <Suspense fallback={null}>
          <Planet />
        </Suspense>
      </Canvas>

      {/* Modals */}
      {activeModal && (
        <PanelModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onComplete={(selectedOption) => handleModalComplete(activeModal, selectedOption)}
          title={`Panel ${activeModal.replace('panel', '')}`}
          options={['Option A', 'Option B', 'Option C']}
          isCompleted={panelStates[activeModal] === 'completed'}
        />
      )}
    </div>
  )
}