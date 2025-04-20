import { useGameStore } from "@/stores/use-game-store"

export function DaysIndicator() {
  const currentDay = useGameStore(state => state.currentDay)
  const totalDays = useGameStore(state => state.nPlayers)

  return (
    <div className="absolute top-4 left-4 text-cyan-300 bg-black/30 p-4 rounded-lg backdrop-blur-sm border border-cyan-500/30 z-20 select-none">
      <h2 className="text-xl font-bold mb-2">
        Day {currentDay} of {totalDays}
      </h2>
      <p className="text-cyan-400/80">
        Distance to Alien Planet: {Math.round((1 - (currentDay - 1) / totalDays) * 100)}%
      </p>
    </div>
  )
}