import { PanelSection } from "./panel-section";
import { useGameStore } from "@/stores/use-game-store";
import { StarcraftCheckbox } from "@/components/ui/starcraft-checkbox";

export function SummarySection() {
  const selectedChallenge = useGameStore(state => state.selectedChallenge)
  const selectedPlayers = useGameStore(state => state.selectedPlayers)
  const maxPlayersPerChallenge = useGameStore(state => state.maxPlayersPerChallenge)

  const isChallengeSelected = !!selectedChallenge
  const arePlayersSelected = maxPlayersPerChallenge === selectedPlayers.length
  const canStartChallenge = isChallengeSelected && arePlayersSelected

  return (
    <PanelSection>
      <div className="flex flex-col flex-1 justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <StarcraftCheckbox checked={isChallengeSelected} />
            <PanelSection.Subtitle text="Challenge" className="capitalize" />
          </div>
          <div className="flex items-center gap-2">
            <StarcraftCheckbox checked={arePlayersSelected} />
            <PanelSection.Subtitle text="Players" className="capitalize" />
          </div>
        </div>
        <PanelSection.Button
          variant="primary"
          text="Launch challenge"
          onClick={() => { }}
          disabled={!canStartChallenge}
        />
      </div>
    </PanelSection>
  )
}