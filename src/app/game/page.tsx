'use client'

import { useRef, useState } from 'react'
import { Scene } from '@/components/scene'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

export default function GamePage() {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const [currentDay, setCurrentDay] = useState(10)
  const totalDays = 10

  function handleReset() {
    setCurrentDay(1)
  }

  function handleNextDay() {
    setCurrentDay(prev => Math.min(prev + 1, totalDays))
  }

  function handlePreviousDay() {
    setCurrentDay(prev => Math.max(prev - 1, 1))
  }

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

      <Scene currentDay={currentDay} totalDays={totalDays} cameraRef={controlsRef} />

      {/* Game UI Overlay */}
      <div className="absolute top-4 left-4 text-cyan-300 bg-black/30 p-4 rounded-lg backdrop-blur-sm border border-cyan-500/30 z-20">
        <h2 className="text-xl font-bold mb-2">
          Day {currentDay} of {totalDays}
        </h2>
        <p className="text-cyan-400/80">
          Distance to Alien Planet: {Math.round((1 - (currentDay - 1) / totalDays) * 100)}%
        </p>
      </div>

      <div className="absolute bottom-4 left-4 flex gap-2 z-20">
        <button
          className="px-4 py-2 bg-cyan-900/50 text-cyan-300 rounded border border-cyan-500/30 backdrop-blur-sm 
                     hover:bg-cyan-800/50 transition-colors cursor-pointer"
          onClick={handleNextDay}
        >
          Next Day
        </button>
        <button
          className="px-4 py-2 bg-cyan-900/50 text-cyan-300 rounded border border-cyan-500/30 backdrop-blur-sm 
                     hover:bg-cyan-800/50 transition-colors cursor-pointer"
          onClick={handlePreviousDay}
        >
          Previous Day
        </button>
        <button
          className="px-4 py-2 bg-cyan-900/50 text-cyan-300 rounded border border-cyan-500/30 backdrop-blur-sm 
                     hover:bg-cyan-800/50 transition-colors cursor-pointer"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className="px-4 py-2 bg-cyan-900/50 text-cyan-300 rounded border border-cyan-500/30 backdrop-blur-sm 
                     hover:bg-cyan-800/50 transition-colors cursor-pointer"
          onClick={handleResetCamera}
        >
          Reset Camera
        </button>
      </div>
    </div>
  )
} 