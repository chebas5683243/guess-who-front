import { useGameStore } from "@/stores/use-game-store"
import { StarcraftButton } from "../ui/starcraft-button"
import { useModal } from "@/stores/use-modal-store"
import { useMemo } from "react"
import { generateChallenges } from "@/models/challenge"

export function ControlPanel() {
  const currentDay = useGameStore(state => state.currentDay)
  const totalDays = useGameStore(state => state.nPlayers)
  const selectedPlayers = useGameStore(state => state.selectedPlayers)
  const isGameStarted = useGameStore(state => state.isGameStarted)
  const selectedChallenge = useGameStore(state => state.selectedChallenge)

  const challenge = useMemo(() => {
    return generateChallenges().find(c => c.id === selectedChallenge)
  }, [selectedChallenge])

  const { onOpen } = useModal()

  const handleSelectChallenge = () => {
    onOpen({ modalType: "selectChallenge" })
  }

  return (
    <div className="absolute w-full bottom-0 left-0 p-4 select-none">
      <div className="flex flex-col gap-4 p-4 rounded-lg backdrop-blur-sm bg-black/80 border-2 border-cyan-500/20 z-20">
        {/* Header */}
        <div className="flex gap-2 items-end border-b-2 border-cyan-500/20 pb-2">
          <h2 className="text-2xl font-starcraft tracking-wider text-cyan-300">
            CAPTAIN:
          </h2>
          <h2 className="text-2xl font-starcraft tracking-wider text-cyan-400/80">
            TESTING
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-4">
          {/* Challenge Section */}
          <div className="flex flex-col gap-2 p-3 rounded-lg border-2 border-cyan-500/20 bg-black/60">
            <h3 className="text-lg font-starcraft tracking-wider text-cyan-300">CURRENT CHALLENGE</h3>
            <div className="flex flex-col flex-1 justify-between">
              {challenge ?
                <div className="flex flex-col gap-1">
                  <p className="text-cyan-400/80 font-starcraft tracking-wider">
                    {challenge ? challenge.name : "NO CHALLENGE SELECTED YET"}
                  </p>
                  <p className="text-sm text-cyan-500/60 font-starcraft tracking-wider">
                    {challenge ? challenge.tagline : "-"}
                  </p>
                </div>
                :
                <p className="text-sm text-cyan-500/60 font-starcraft tracking-wider">
                  NO CHALLENGE SELECTED
                </p>
              }
              <StarcraftButton
                size="sm"
                variant="secondary"
                onClick={handleSelectChallenge}
                className="mt-2"
              >
                {challenge ? "MODIFY CHALLENGE" : "SELECT CHALLENGE"}
              </StarcraftButton>
            </div>
          </div>

          {/* Selected Players Section */}
          <div className="flex flex-col gap-2 p-3 rounded-lg border-2 border-cyan-500/20 bg-black/60">
            <h3 className="text-lg font-starcraft tracking-wider text-cyan-300">SELECTED UNITS</h3>
            <div className="flex flex-col gap-1">
              {selectedPlayers.length > 0 ? (
                selectedPlayers.map((player: string) => (
                  <p key={player} className="text-cyan-400/80 font-starcraft tracking-wider">
                    {player.toUpperCase()}
                  </p>
                ))
              ) : (
                <p className="text-sm text-cyan-500/60 font-starcraft tracking-wider">
                  NO UNITS SELECTED
                </p>
              )}
            </div>
          </div>

          {/* Start Game Section */}
          <div className="flex flex-col gap-2 p-3 rounded-lg border-2 border-cyan-500/20 bg-black/60">
            <h3 className="text-lg font-starcraft tracking-wider text-cyan-300">MISSION STATUS</h3>
            <div className="flex flex-col gap-2">
              <p className="text-cyan-400/80 font-starcraft tracking-wider">
                DISTANCE TO TARGET: {Math.round((1 - (currentDay - 1) / totalDays) * 100)}%
              </p>
              <StarcraftButton
                size="lg"
                variant={isGameStarted ? "secondary" : "primary"}
                className="w-full"
              >
                {isGameStarted ? "MISSION IN PROGRESS" : "LAUNCH MISSION"}
              </StarcraftButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}