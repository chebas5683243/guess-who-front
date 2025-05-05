import { useGame } from "@/stores/use-game-store"

interface DevToolsHUDProps {
  onResetCamera: () => void;
}

export function DevToolsHUD({ onResetCamera: resetCamera }: DevToolsHUDProps) {
  const goToNextDay = useGame(state => state.goToNextDay)
  const goToPreviousDay = useGame(state => state.goToPreviousDay)
  const resetCurrentDay = useGame(state => state.goToFirstDay)

  return (
    <div className="absolute top-4 right-4 flex gap-2 z-20">
      <button
        className="px-4 py-2 bg-cyan-900/50 text-cyan-300 rounded border border-cyan-500/30 backdrop-blur-sm 
                     hover:bg-cyan-800/50 transition-colors cursor-pointer"
        onClick={goToNextDay}
      >
        Next Day
      </button>
      <button
        className="px-4 py-2 bg-cyan-900/50 text-cyan-300 rounded border border-cyan-500/30 backdrop-blur-sm 
                     hover:bg-cyan-800/50 transition-colors cursor-pointer"
        onClick={goToPreviousDay}
      >
        Previous Day
      </button>
      <button
        className="px-4 py-2 bg-cyan-900/50 text-cyan-300 rounded border border-cyan-500/30 backdrop-blur-sm 
                     hover:bg-cyan-800/50 transition-colors cursor-pointer"
        onClick={resetCurrentDay}
      >
        Reset
      </button>
      <button
        className="px-4 py-2 bg-cyan-900/50 text-cyan-300 rounded border border-cyan-500/30 backdrop-blur-sm 
                     hover:bg-cyan-800/50 transition-colors cursor-pointer"
        onClick={resetCamera}
      >
        Reset Camera
      </button>
    </div>
  )
}